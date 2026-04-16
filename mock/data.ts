/**
 * Mock data for BananaCrystal API
 * Used by the mock server for local development
 */

export const mockData = {
  profile: {
    externalUserId: 'mock-user-123',
    email: 'developer@example.com',
    username: 'mockuser',
    fullName: 'Mock Developer',
    firstName: 'Mock',
    lastName: 'Developer',
    wallets: [
      {
        walletId: 'mock-wallet-1',
        hederaWalletAddress: '0.0.12345',
      },
    ],
    primaryWalletId: 'mock-wallet-1',
    primaryHederaWalletAddress: '0.0.12345',
    mcpKey: {
      keyId: 'mock-key-123',
      scopes: ['read_only', 'transfer', 'swap'],
    },
  },

  balances: [
    {
      token: 'USDC',
      tokenId: '0.0.456',
      amount: '1000.00',
      decimals: 6,
    },
    {
      token: 'NGN',
      tokenId: '0.0.789',
      amount: '50000.00',
      decimals: 2,
    },
    {
      token: 'USD',
      tokenId: '0.0.123',
      amount: '500.00',
      decimals: 2,
    },
    {
      token: 'HBAR',
      tokenId: '0.0.0',
      amount: '100.00',
      decimals: 8,
    },
  ],

  exchangeRates: {
    USD: {
      currency: 'USD',
      buyRate: '1.00',
      sellRate: '1.00',
      updatedAt: new Date().toISOString(),
    },
    NGN: {
      currency: 'NGN',
      buyRate: '1500.00',
      sellRate: '1480.00',
      updatedAt: new Date().toISOString(),
    },
    EUR: {
      currency: 'EUR',
      buyRate: '0.92',
      sellRate: '0.90',
      updatedAt: new Date().toISOString(),
    },
    GBP: {
      currency: 'GBP',
      buyRate: '0.79',
      sellRate: '0.77',
      updatedAt: new Date().toISOString(),
    },
  },

  currencies: [
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      tokenId: '0.0.123',
    },
    {
      code: 'NGN',
      name: 'Nigerian Naira',
      symbol: '₦',
      tokenId: '0.0.789',
    },
    {
      code: 'USDC',
      name: 'USD Coin',
      symbol: 'USDC',
      tokenId: '0.0.456',
    },
    {
      code: 'HBAR',
      name: 'Hedera',
      symbol: 'ℏ',
      tokenId: '0.0.0',
    },
  ],

  tokens: [
    {
      tokenId: '0.0.123',
      symbol: 'USDb',
      name: 'BananaCrystal USD',
      decimals: 2,
    },
    {
      tokenId: '0.0.456',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
    },
    {
      tokenId: '0.0.789',
      symbol: 'NGNb',
      name: 'BananaCrystal NGN',
      decimals: 2,
    },
  ],

  transactions: [
    {
      id: 'tx-1',
      type: 'transfer',
      direction: 'outgoing',
      amount: '100.00',
      currency: 'USDC',
      recipient: '0.0.67890',
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      transactionId: '0.0.123@1234567890.123456789',
    },
    {
      id: 'tx-2',
      type: 'swap',
      direction: 'swap',
      fromAmount: '50.00',
      fromCurrency: 'USD',
      toAmount: '75000.00',
      toCurrency: 'NGN',
      status: 'completed',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      transactionId: '0.0.123@1234567891.123456789',
    },
    {
      id: 'tx-3',
      type: 'transfer',
      direction: 'incoming',
      amount: '200.00',
      currency: 'USDC',
      sender: '0.0.11111',
      status: 'completed',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      transactionId: '0.0.123@1234567892.123456789',
    },
  ],

  limits: {
    key_id: 'mock-key-123',
    configured_limits: {
      per_txn_limit: 10000,
      daily_limit: 50000,
      monthly_limit: 500000,
      rate_limit_rpm: 60,
    },
    current_usage: {
      daily_spent: 1250.5,
      monthly_spent: 15000.0,
      requests_this_minute: 5,
    },
    remaining: {
      daily_remaining: 48749.5,
      monthly_remaining: 485000.0,
    },
    status: {
      is_suspended: false,
      pending_write_count: 0,
    },
    policy: {
      pre_approved_large_txn: false,
    },
    agent_settings: {
      require_human_approval: true,
      has_callback_url: false,
      note: 'Approval requests never expire - you can approve them anytime. No limit on pending approvals.',
    },
  },

  offers: [
    {
      id: 'offer-1',
      offerType: 'buy',
      currency: 'NGN',
      amount: 100,
      totalAmount: 500,
      leverage: '5x',
      prediction: 'up',
      durationHours: 24,
      exchangeRate: '1500.00',
      advertiser: 'Mock Trader',
      status: 'active',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'offer-2',
      offerType: 'sell',
      currency: 'USD',
      amount: 50,
      totalAmount: 250,
      leverage: '5x',
      prediction: 'down',
      durationHours: 48,
      exchangeRate: '1.00',
      advertiser: 'Mock Seller',
      status: 'active',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
};
