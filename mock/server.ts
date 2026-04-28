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

  res.json({
    success: true,
    transactionRef: `mock-ref-${Date.now()}`,
    message: 'OTP sent to your email (mock: use "123456")',
    otpHint: "For testing, use OTP: 123456",
  });
});

// Transfer - Execute
app.post("/api/v1/mcp/transfer", (req, res) => {
  const { otpCode, transactionRef } = req.body;

  if (otpCode !== "123456") {
    return res.status(400).json({
      error: "invalid_otp",
      message: "Invalid OTP code. For testing, use: 123456",
    });
  }

  if (!transactionRef || !transactionRef.startsWith("mock-ref-")) {
    return res.status(400).json({
      error: "invalid_transaction_ref",
      message: "Invalid transaction reference",
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
  const { fromTokenId, fromAmount, toTokenId } = req.body;

  if (!fromTokenId || !fromAmount || !toTokenId) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "fromTokenId, fromAmount, and toTokenId are required",
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

  const approvalRequestId = `mock-approval-${Date.now()}`;

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
    executionToken: isApproved ? `mock-exec-${Date.now()}` : undefined,
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
    id: `mock-offer-${Date.now()}`,
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
