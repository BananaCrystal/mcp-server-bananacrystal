/**
 * Mock BananaCrystal API Server
 *
 * This simulates the BananaCrystal API for local development and testing.
 * Contributors can use this to develop features without needing real API access.
 *
 * Usage:
 *   npm run mock
 *   or
 *   node dist/mock/server.js
 */

import express from "express";
import cors from "cors";
import crypto from "crypto";
import { mockData } from "./data.js";

const app = express();
const PORT = process.env.MOCK_PORT || 3001;

app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[Mock API] ${req.method} ${req.path}`);
  next();
});

// Middleware to validate API key (except for sandbox rate endpoints which are public)
app.use((req, res, next) => {
  // Sandbox rate endpoints don't require authentication
  if (req.path.startsWith("/api/v1/mcp/sandbox/rate")) {
    return next();
  }
  
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || !apiKey.toString().startsWith("bc_mock_")) {
    return res.status(401).json({
      error: "unauthorized",
      message: 'Invalid or missing API key. Use "bc_mock_test" for testing.',
    });
  }
  next();
});

// Profile
app.get("/api/v1/mcp/profile", (req, res) => {
  res.json(mockData.profile);
});

// In-memory store for issued OTP transaction references
interface MockOtpRecord {
  operation: string;
  otp: string;
  used: boolean;
  amount?: string;
  tokenId?: string;
  recipientAccountId?: string;
  token?: string;
  recipient?: string;
  wallet_id?: string;
  user_id?: string;
  createdAt: number;
}
const issuedOtps = new Map<string, MockOtpRecord>();
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes TTL

function cleanupExpiredOtps(): void {
  const now = Date.now();
  for (const [key, record] of issuedOtps.entries()) {
    if (now - record.createdAt > OTP_TTL_MS || record.used) {
      issuedOtps.delete(key);
    }
  }
}

function generateRef(prefix: string): string {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

function isValidOperationAmount(operation: string, amount: unknown): { valid: boolean; error?: string; message?: string } {
  if (typeof amount !== "string" && typeof amount !== "number") {
    return { valid: false, error: "invalid_amount", message: "Amount must be provided as a string" };
  }
  const str = String(amount).trim();
  if (operation === "execute_approved_transaction") {
    if (str === "0" || str === "0.0") return { valid: true };
    return { valid: false, error: "invalid_amount", message: "Amount for execute_approved_transaction must be '0'" };
  }
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(str)) {
    return { valid: false, error: "invalid_amount", message: "Amount must be a valid positive decimal string (no negative numbers, NaN, or scientific notation)" };
  }
  const num = parseFloat(str);
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: "invalid_amount", message: "Amount must be greater than 0" };
  }
  return { valid: true };
}

function validateAndConsumeOtp(
  transactionRef?: string,
  otpCode?: string,
  expectedOperation?: string,
  expectedPayload?: {
    amount?: string | number;
    tokenId?: string;
    fromTokenId?: string;
    toTokenId?: string;
    recipientAccountId?: string;
  },
): { valid: boolean; error?: string; message?: string } {
  cleanupExpiredOtps();

  if (!otpCode || otpCode !== "123456") {
    return {
      valid: false,
      error: "invalid_otp",
      message: 'Invalid or missing OTP code. For testing, use: "123456"',
    };
  }

  if (!transactionRef) {
    return {
      valid: false,
      error: "missing_transaction_ref",
      message: "Transaction reference is required",
    };
  }

  if (!transactionRef.startsWith("mock-ref-") && !transactionRef.startsWith("mock-mcp-ref-")) {
    return {
      valid: false,
      error: "invalid_transaction_ref",
      message: "Invalid transaction reference",
    };
  }
  const record = issuedOtps.get(transactionRef);
  if (!record) {
    return {
      valid: false,
      error: "transaction_ref_not_found",
      message: "Transaction reference not found or expired",
    };
  }
  if (Date.now() - record.createdAt > OTP_TTL_MS) {
    issuedOtps.delete(transactionRef);
    return {
      valid: false,
      error: "otp_expired",
      message: "Transaction reference has expired (TTL: 10 minutes)",
    };
  }
  if (record.used) {
    return {
      valid: false,
      error: "otp_already_used",
      message: "Transaction reference has already been consumed",
    };
  }
  if (expectedOperation && record.operation !== expectedOperation) {
    return {
      valid: false,
      error: "operation_mismatch",
      message: `Transaction reference was issued for '${record.operation}', not '${expectedOperation}'`,
    };
  }

  // Security check: verify transaction details are strictly bound to the issued OTP
  if (expectedPayload) {
    if (record.amount !== undefined && expectedPayload.amount !== undefined && String(record.amount) !== String(expectedPayload.amount)) {
      return {
        valid: false,
        error: "amount_mismatch",
        message: `Transaction amount (${expectedPayload.amount}) does not match authorized OTP amount (${record.amount})`,
      };
    }
    if (record.tokenId && expectedPayload.tokenId && record.tokenId !== expectedPayload.tokenId) {
      return {
        valid: false,
        error: "token_mismatch",
        message: `Token ID (${expectedPayload.tokenId}) does not match authorized OTP token (${record.tokenId})`,
      };
    }
    if (record.recipientAccountId && expectedPayload.recipientAccountId && record.recipientAccountId !== expectedPayload.recipientAccountId) {
      return {
        valid: false,
        error: "recipient_mismatch",
        message: `Recipient account (${expectedPayload.recipientAccountId}) does not match authorized OTP recipient (${record.recipientAccountId})`,
      };
    }
    if (record.token && expectedPayload.fromTokenId && record.token !== expectedPayload.fromTokenId) {
      return {
        valid: false,
        error: "token_mismatch",
        message: `Source token (${expectedPayload.fromTokenId}) does not match authorized OTP token (${record.token})`,
      };
    }
    if (record.recipient && expectedPayload.toTokenId && record.recipient !== expectedPayload.toTokenId) {
      return {
        valid: false,
        error: "token_mismatch",
        message: `Destination token (${expectedPayload.toTokenId}) does not match authorized OTP recipient token (${record.recipient})`,
      };
    }
  }

  record.used = true;
  issuedOtps.delete(transactionRef);
  return { valid: true };
}

// Genesis Wallet Claim
app.post("/api/v1/mcp/genesis/claim", (req, res) => {
  const { confirm } = req.body;
  if (confirm !== true) {
    return res.status(400).json({
      error: "confirmation_required",
      message: 'Explicit boolean confirmation "true" is required to claim Genesis wallet',
    });
  }
  res.json({
    success: true,
    claimed: true,
    accountId: "0.0.10036692",
    vanityAddress: "0.0.GENESIS_BC_CLAIMED",
    bountyDiscoveredUsdc: 25.0,
    message: "Genesis Vanity Wallet successfully claimed",
  });
});

// MCP General OTP Request
app.post("/api/v1/mcp/otp/request", (req, res) => {
  const { operation, amount, token, recipient, wallet_id, user_id } = req.body;
  const allowedOperations = new Set([
    "swap_currency",
    "request_withdrawal",
    "engage_offer",
    "execute_approved_transaction",
  ]);
  if (!allowedOperations.has(operation) || typeof amount !== "string" || amount.length === 0) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "A supported operation and amount are required",
    });
  }

  const amountValidation = isValidOperationAmount(operation, amount);
  if (!amountValidation.valid) {
    return res.status(400).json({
      error: amountValidation.error,
      message: amountValidation.message,
    });
  }

  // Enforce operation-specific required payload fields
  if (operation === "swap_currency") {
    if (!token || !recipient || !amount) {
      return res.status(400).json({
        error: "missing_parameters",
        message: "token (from_token_id), recipient (to_token_id), and amount are required for swap_currency OTP request",
      });
    }
  } else if (operation === "request_withdrawal") {
    if (!token || !recipient || !amount) {
      return res.status(400).json({
        error: "missing_parameters",
        message: "token (currency), recipient (destination_account), and amount are required for request_withdrawal OTP request",
      });
    }
  } else if (operation === "engage_offer") {
    if (!token || !recipient || !amount) {
      return res.status(400).json({
        error: "missing_parameters",
        message: "token (currency), recipient (offer_id), and amount are required for engage_offer OTP request",
      });
    }
  } else if (operation === "execute_approved_transaction") {
    if (!recipient) {
      return res.status(400).json({
        error: "missing_parameters",
        message: "recipient (approval_request_id) is required for execute_approved_transaction OTP request",
      });
    }
  }

  const transactionRef = generateRef("mock-mcp-ref");
  issuedOtps.set(transactionRef, {
    operation,
    otp: "123456",
    used: false,
    amount,
    token,
    recipient,
    wallet_id,
    user_id,
    createdAt: Date.now(),
  });
  res.json({
    success: true,
    operation,
    transactionRef,
    message: `OTP generated for ${operation} (mock: use "123456")`,
    otpHint: "For testing, use OTP: 123456",
  });
});

// Balances
app.get("/api/v1/mcp/balances", (req, res) => {
  const { tokenId } = req.query;

  if (tokenId) {
    const balance = mockData.balances.find((b) => b.tokenId === tokenId);
    if (!balance) {
      return res.status(404).json({
        error: "token_not_found",
        message: `Token ${tokenId} not found`,
      });
    }
    return res.json({ balance });
  }

  res.json({ balances: mockData.balances });
});

// Transfer - Request OTP
app.post("/api/v1/mcp/transfer/request-otp", (req, res) => {
  const { tokenId, recipientAccountId, amount } = req.body;

  // Simulate validation
  if (!tokenId || !recipientAccountId || !amount) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "tokenId, recipientAccountId, and amount are required",
    });
  }

  const amountValidation = isValidOperationAmount("transfer_tokens", amount);
  if (!amountValidation.valid) {
    return res.status(400).json({
      error: amountValidation.error,
      message: amountValidation.message,
    });
  }

  // Simulate insufficient balance
  if (parseFloat(amount) > 10000) {
    return res.status(400).json({
      error: "insufficient_balance",
      message: "Insufficient balance for this transfer",
      details: {
        requested: amount,
        available: "10000.00",
      },
    });
  }

  const transactionRef = generateRef("mock-ref");
  issuedOtps.set(transactionRef, {
    operation: "transfer_tokens",
    otp: "123456",
    used: false,
    amount: String(amount),
    tokenId,
    recipientAccountId,
    createdAt: Date.now(),
  });

  res.json({
    success: true,
    transactionRef,
    message: 'OTP sent to your email (mock: use "123456")',
    otpHint: "For testing, use OTP: 123456",
  });
});

// Transfer - Execute
app.post("/api/v1/mcp/transfer", (req, res) => {
  const { tokenId, recipientAccountId, amount, otpCode, transactionRef } = req.body;

  if (!transactionRef) {
    return res.status(400).json({
      error: "missing_transaction_ref",
      message: "transactionRef is required for transfer execution",
    });
  }

  const validation = validateAndConsumeOtp(transactionRef, otpCode, "transfer_tokens", {
    tokenId,
    recipientAccountId,
    amount,
  });
  if (!validation.valid) {
    return res.status(400).json({
      error: validation.error,
      message: validation.message,
    });
  }

  res.json({
    success: true,
    transactionId: `0.0.${Date.now()}@${Math.random().toString(36).substring(7)}`,
    status: "completed",
    timestamp: new Date().toISOString(),
  });
});

// Swap
app.post("/api/v1/mcp/swap", (req, res) => {
  const { fromTokenId, fromAmount, toTokenId, otpCode, transactionRef } = req.body;

  if (!fromTokenId || !fromAmount || !toTokenId) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "fromTokenId, fromAmount, and toTokenId are required",
    });
  }

  const amountValidation = isValidOperationAmount("swap_currency", fromAmount);
  if (!amountValidation.valid) {
    return res.status(400).json({
      error: amountValidation.error,
      message: amountValidation.message,
    });
  }

  // Validate and consume OTP if provided or required
  const validation = validateAndConsumeOtp(transactionRef, otpCode, "swap_currency", {
    fromTokenId,
    amount: fromAmount,
    toTokenId,
  });
  if (!validation.valid) {
    return res.status(400).json({
      error: validation.error,
      message: validation.message,
    });
  }

  // Simulate exchange rate calculation
  const rate = 1.5; // Mock rate
  const toAmount = (parseFloat(fromAmount) * rate).toFixed(2);

  res.json({
    success: true,
    fromToken: fromTokenId,
    fromAmount,
    toToken: toTokenId,
    toAmount,
    exchangeRate: rate,
    transactionId: `0.0.${Date.now()}@swap`,
    timestamp: new Date().toISOString(),
  });
});

// Exchange Rate
app.get("/api/v1/mcp/exchange-rate/:currency", (req, res) => {
  const { currency } = req.params;
  const rate =
    mockData.exchangeRates[
      currency.toUpperCase() as keyof typeof mockData.exchangeRates
    ];

  if (!rate) {
    return res.status(404).json({
      error: "currency_not_found",
      message: `Exchange rate for ${currency} not found`,
    });
  }

  res.json(rate);
});

// Currencies
app.get("/api/v1/mcp/currencies", (req, res) => {
  res.json({ currencies: mockData.currencies });
});

// Tokens
app.get("/api/v1/mcp/tokens", (req, res) => {
  res.json({ tokens: mockData.tokens });
});

// Transaction History
app.get("/api/v1/mcp/transactions", (req, res) => {
  const { limit = 20, page = 1 } = req.query;
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);

  res.json({
    transactions: mockData.transactions.slice(start, end),
    total: mockData.transactions.length,
    page: Number(page),
    limit: Number(limit),
  });
});

// Limits
app.get("/api/v1/mcp/limits", (req, res) => {
  res.json(mockData.limits);
});

// Agent Settings
app.patch("/api/v1/mcp/agent-settings", (req, res) => {
  const { requireHumanApproval, requireOtp, callbackUrl } = req.body;

  res.json({
    success: true,
    updated_settings: {
      require_human_approval: requireHumanApproval ?? true,
      require_otp: requireOtp ?? true,
      callback_url: callbackUrl ?? null,
    },
  });
});

// Agent - Request Transaction
app.post("/api/v1/mcp/agent/request-transaction", (req, res) => {
  const { targetOwnerUserExtId, transactionType, amount } = req.body;

  if (!targetOwnerUserExtId || !transactionType || !amount) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "targetOwnerUserExtId, transactionType, and amount are required",
    });
  }

  const approvalRequestId = generateRef("mock-approval");

  res.json({
    approvalRequestId,
    status: "pending",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    message: "Approval request created (mock: auto-approve after 5 seconds)",
  });
});

// Agent - Check Approval Status
app.get("/api/v1/mcp/agent/approval/:id", (req, res) => {
  const { id } = req.params;

  if (!id.startsWith("mock-approval-")) {
    return res.status(404).json({
      error: "approval_not_found",
      message: "Approval request not found",
    });
  }

  // Simulate approval after 5 seconds
  const createdAt = parseInt(id.split("-")[2]);
  const isApproved = Date.now() - createdAt > 5000;

  res.json({
    status: isApproved ? "approved" : "pending",
    expiresAt: new Date(createdAt + 24 * 60 * 60 * 1000).toISOString(),
    executionToken: isApproved ? generateRef("mock-exec") : undefined,
  });
});

// Agent - Execute Transaction
app.post("/api/v1/mcp/agent/execute", (req, res) => {
  const { approvalRequestId, executionToken } = req.body;

  if (!executionToken || !executionToken.startsWith("mock-exec-")) {
    return res.status(400).json({
      error: "invalid_execution_token",
      message: "Invalid execution token",
    });
  }

  res.json({
    transactionId: `0.0.${Date.now()}@agent`,
    status: "executed",
    timestamp: new Date().toISOString(),
  });
});

// Agent - Get Config
app.get("/api/v1/mcp/agent/config/:userId", (req, res) => {
  res.json({
    hasActiveKey: true,
    requireHumanApproval: true,
    supportedTransactionTypes: [
      "transfer",
      "swap",
      "create_offer",
      "accept_trade",
    ],
    hasCallbackUrl: false,
    name: "Mock User",
    email: "mock@example.com",
    hederaWalletAddress: "0.0.12345",
  });
});

// KYC
app.post("/api/v1/mcp/kyc/initiate", (req, res) => {
  res.json({
    accessToken: "mock-kyc-token",
    expiresIn: 3600,
    message: "KYC initiated (mock)",
  });
});

app.get("/api/v1/mcp/kyc/status", (req, res) => {
  res.json({
    status: "approved",
    level: "basic",
    message: "KYC approved (mock)",
  });
});

// Offers
app.get("/api/v1/mcp/offers", (req, res) => {
  res.json({ offers: mockData.offers });
});

app.get("/api/v1/mcp/offers/:id", (req, res) => {
  const offer = mockData.offers.find((o) => o.id === req.params.id);
  if (!offer) {
    return res.status(404).json({
      error: "offer_not_found",
      message: "Offer not found",
    });
  }
  res.json(offer);
});

app.post("/api/v1/mcp/offers", (req, res) => {
  res.json({
    id: generateRef("mock-offer"),
    ...req.body,
    status: "active",
    createdAt: new Date().toISOString(),
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Mock BananaCrystal API is running" });
});

// Rate Service - Sandbox endpoints (no auth required)
app.get("/api/v1/mcp/sandbox/rate/currencies", (req, res) => {
  res.json({ 
    currencies: mockData.rateServiceCurrencies,
    message: "Supported currencies for rate service"
  });
});

app.get("/api/v1/mcp/sandbox/rate/current", (req, res) => {
  const { from, to } = req.query;
  
  if (!from || !to) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "from and to currency codes are required"
    });
  }
  
  const pairKey = `${from.toString().toUpperCase()}-${to.toString().toUpperCase()}`;
  const rateData = mockData.rateServiceMockRates[pairKey as keyof typeof mockData.rateServiceMockRates];
  
  if (!rateData) {
    return res.status(404).json({
      error: "currency_pair_not_found",
      message: `Rate data for ${pairKey} not available in sandbox`
    });
  }
  
  res.json(rateData);
});

app.get("/api/v1/mcp/sandbox/rate/convert", (req, res) => {
  const { from, to, amount } = req.query;
  
  if (!from || !to || !amount) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "from, to, and amount are required"
    });
  }
  
  const pairKey = `${from.toString().toUpperCase()}-${to.toString().toUpperCase()}`;
  const rateData = mockData.rateServiceMockRates[pairKey as keyof typeof mockData.rateServiceMockRates];
  
  if (!rateData) {
    return res.status(404).json({
      error: "currency_pair_not_found",
      message: `Cannot convert ${pairKey}`
    });
  }
  
  const fromAmount = parseFloat(amount.toString());
  const toAmount = (fromAmount * rateData.rate).toFixed(2);
  
  res.json({
    from: from.toString().toUpperCase(),
    to: to.toString().toUpperCase(),
    fromAmount: fromAmount.toFixed(2),
    toAmount: toAmount,
    rate: rateData.rate,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/v1/mcp/sandbox/rate/batch-convert", (req, res) => {
  const { conversions } = req.body;
  
  if (!conversions || !Array.isArray(conversions)) {
    return res.status(400).json({
      error: "invalid_input",
      message: "conversions must be an array of {from, to, amount} objects"
    });
  }
  
  const results = conversions.map((conv: any) => {
    const pairKey = `${conv.from.toUpperCase()}-${conv.to.toUpperCase()}`;
    const rateData = mockData.rateServiceMockRates[pairKey as keyof typeof mockData.rateServiceMockRates];
    
    if (!rateData) {
      return {
        from: conv.from,
        to: conv.to,
        error: "currency_pair_not_found"
      };
    }
    
    const toAmount = (conv.amount * rateData.rate).toFixed(2);
    return {
      from: conv.from,
      to: conv.to,
      fromAmount: conv.amount.toFixed(2),
      toAmount: toAmount,
      rate: rateData.rate
    };
  });
  
  res.json({ conversions: results, timestamp: new Date().toISOString() });
});

app.get("/api/v1/mcp/sandbox/rate/history", (req, res) => {
  const { from, to, startDate, endDate } = req.query;
  
  if (!from || !to) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "from and to are required"
    });
  }
  
  const pairKey = `${from.toString().toUpperCase()}-${to.toString().toUpperCase()}`;
  const rateData = mockData.rateServiceMockRates[pairKey as keyof typeof mockData.rateServiceMockRates];
  
  if (!rateData) {
    return res.status(404).json({
      error: "currency_pair_not_found",
      message: `No historical data for ${pairKey}`
    });
  }
  
  // Generate mock historical data (30 days)
  const history = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dailyVariation = (Math.random() - 0.5) * 0.04; // ±2% variation
    const dailyRate = rateData.rate * (1 + dailyVariation);
    
    history.push({
      date: date.toISOString().split('T')[0],
      open: (dailyRate * 0.99).toFixed(4),
      high: (dailyRate * 1.015).toFixed(4),
      low: (dailyRate * 0.985).toFixed(4),
      close: dailyRate.toFixed(4)
    });
  }
  
  res.json({
    from: from.toString().toUpperCase(),
    to: to.toString().toUpperCase(),
    history: history
  });
});

app.get("/api/v1/mcp/sandbox/rate/stats", (req, res) => {
  const { from, to, days } = req.query;
  
  if (!from || !to) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "from and to are required"
    });
  }
  
  const pairKey = `${from.toString().toUpperCase()}-${to.toString().toUpperCase()}`;
  const rateData = mockData.rateServiceMockRates[pairKey as keyof typeof mockData.rateServiceMockRates];
  
  if (!rateData) {
    return res.status(404).json({
      error: "currency_pair_not_found",
      message: `No stats available for ${pairKey}`
    });
  }
  
  const daysPeriod = parseInt(days?.toString() || "30");
  const variance = rateData.rate * (daysPeriod / 100);
  
  res.json({
    from: from.toString().toUpperCase(),
    to: to.toString().toUpperCase(),
    period_days: daysPeriod,
    high: (rateData.rate + variance).toFixed(4),
    low: (rateData.rate - variance).toFixed(4),
    average: rateData.rate.toFixed(4),
    current: rateData.rate.toFixed(4),
    volatility: "2.3%"
  });
});

// Sandbox - Reset Balance
app.post("/api/v1/mcp/sandbox/reset-balance", (req, res) => {
  res.json({
    success: true,
    message: "Sandbox balances reset to defaults",
    balances: [
      { token: "USDb", balance: "10000.00" },
      { token: "NGNb", balance: "5000000.00" },
      { token: "GHSb", balance: "50000.00" },
      { token: "KESb", balance: "1000000.00" },
      { token: "ZARb", balance: "150000.00" },
    ],
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "not_found",
    message: `Endpoint ${req.method} ${req.path} not found in mock API`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log("");
  console.log("🍌 BananaCrystal Mock API Server");
  console.log("================================");
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log("");
  console.log("Test API key: bc_mock_test");
  console.log("Test OTP code: 123456");
  console.log("");
  console.log("Configure your MCP server:");
  console.log(`  BANANACRYSTAL_API_URL=http://localhost:${PORT}`);
  console.log("  BANANACRYSTAL_API_KEY=bc_mock_test");
  console.log("");
  console.log("Press Ctrl+C to stop");
  console.log("");
});

export { app };
