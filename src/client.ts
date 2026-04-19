/**
 * HTTP client for BananaCrystal API
 * Makes requests to the hosted BananaCrystal backend
 */

export class BananaCrystalClient {
  constructor(
    private readonly apiUrl: string,
    private readonly apiKey: string,
    private readonly debug: boolean = false,
  ) {}

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;

    if (this.debug) {
      console.error(`[API] ${options.method || 'GET'} ${endpoint}`);
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage: string;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorText;
      } catch {
        errorMessage = errorText || response.statusText;
      }

      throw new Error(
        `BananaCrystal API error (${response.status}): ${errorMessage}`,
      );
    }

    return response.json();
  }

  // Profile & Identity
  async getMyProfile() {
    return this.request('/api/v1/mcp/profile', { method: 'GET' });
  }

  // Utility & Health
  async ping() {
    return this.request('/api/v1/mcp/ping', { method: 'GET' });
  }

  async getServerInfo() {
    return this.request('/api/v1/mcp/server-info', { method: 'GET' });
  }

  async echo(message: string) {
    return this.request('/api/v1/mcp/echo', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Balances
  async getBalances(params?: { accountId?: string; tokenId?: string }) {
    const query = new URLSearchParams();
    if (params?.accountId) query.set('accountId', params.accountId);
    if (params?.tokenId) query.set('tokenId', params.tokenId);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/balances${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  // Transfers
  async requestTransferOtp(params: {
    tokenId: string;
    recipientAccountId: string;
    amount: string;
    tokenSymbol?: string;
  }) {
    return this.request('/api/v1/mcp/transfer/request-otp', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async transferTokens(params: {
    tokenId: string;
    recipientAccountId: string;
    amount: string;
    otpCode: string;
    transactionRef: string;
    tokenSymbol?: string;
  }) {
    return this.request('/api/v1/mcp/transfer', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Swaps
  async swapCurrency(params: {
    fromTokenId: string;
    fromAmount: string;
    toTokenId: string;
    memo?: string;
  }) {
    return this.request('/api/v1/mcp/swap', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async estimateSwapFees(params: {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
  }) {
    return this.request('/api/v1/mcp/swap/estimate-fees', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Exchange Rates
  async getExchangeRate(currency: string) {
    return this.request(`/api/v1/mcp/exchange-rate/${currency}`, {
      method: 'GET',
    });
  }

  // Tokens & Currencies
  async listSupportedCurrencies() {
    return this.request('/api/v1/mcp/currencies', { method: 'GET' });
  }

  async listAvailableTokens() {
    return this.request('/api/v1/mcp/tokens', { method: 'GET' });
  }

  // Transaction History
  async getTransactionHistory(params?: {
    limit?: number;
    page?: number;
    type?: string;
    direction?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.page) query.set('page', params.page.toString());
    if (params?.type) query.set('type', params.type);
    if (params?.direction) query.set('direction', params.direction);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/transactions${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  // Limits & Settings
  async getMyLimits() {
    return this.request('/api/v1/mcp/limits', { method: 'GET' });
  }

  async updateMyAgentSettings(params: {
    requireHumanApproval?: boolean;
    callbackUrl?: string | null;
  }) {
    return this.request('/api/v1/mcp/agent-settings', {
      method: 'PATCH',
      body: JSON.stringify(params),
    });
  }

  // Agent-to-Agent Approvals
  async requestAgentTransaction(params: {
    targetOwnerUserExtId: string;
    transactionType: string;
    amount: number;
    currency: string;
    transactionParams: Record<string, unknown>;
    reason?: string;
    requesterName?: string;
  }) {
    return this.request('/api/v1/mcp/agent/request-transaction', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async checkApprovalStatus(approvalRequestId: string) {
    return this.request(`/api/v1/mcp/agent/approval/${approvalRequestId}`, {
      method: 'GET',
    });
  }

  async executeApprovedTransaction(params: {
    approvalRequestId: string;
    executionToken: string;
  }) {
    return this.request('/api/v1/mcp/agent/execute', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getAgentConfig(targetOwnerUserExtId: string) {
    return this.request(`/api/v1/mcp/agent/config/${targetOwnerUserExtId}`, {
      method: 'GET',
    });
  }

  // KYC (if needed)
  async initiateKyc(params?: { userId?: string; ttlInSecs?: number }) {
    return this.request('/api/v1/mcp/kyc/initiate', {
      method: 'POST',
      body: JSON.stringify(params || {}),
    });
  }

  async getKycStatus(params?: { userId?: string }) {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/kyc/status${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  // Fiat Operations (Brale)
  async initiateDeposit(params: {
    userId?: string;
    amount: number;
    currency: string;
    accountId?: string;
    railType?: string;
  }) {
    return this.request('/api/v1/mcp/brale/deposit', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async requestWithdrawal(params: {
    userId?: string;
    amount: number;
    currency: string;
    destinationAccount?: string;
    railType?: string;
  }) {
    return this.request('/api/v1/mcp/brale/withdrawal', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getDepositStatus(params: { transferId: string; userId?: string }) {
    const query = new URLSearchParams();
    if (params.userId) query.set('userId', params.userId);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/brale/deposit/${params.transferId}${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  async getWithdrawalStatus(params?: { userId?: string }) {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/brale/withdrawal/status${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  // Offers & Trades (prediction market)
  async listOffers(params?: {
    currency?: string;
    offerType?: string;
    search?: string;
    sortBy?: string;
    limit?: number;
    page?: number;
  }) {
    const query = new URLSearchParams();
    if (params?.currency) query.set('currency', params.currency);
    if (params?.offerType) query.set('offerType', params.offerType);
    if (params?.search) query.set('search', params.search);
    if (params?.sortBy) query.set('sortBy', params.sortBy);
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.page) query.set('page', params.page.toString());

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/offers${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  async getOffer(offerId: string) {
    return this.request(`/api/v1/mcp/offers/${offerId}`, { method: 'GET' });
  }

  async getMyOffers(params?: { userId?: string; offerType?: string }) {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);
    if (params?.offerType) query.set('offerType', params.offerType);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/offers/my${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  async createOffer(params: Record<string, unknown>) {
    return this.request('/api/v1/mcp/offers', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async updateOffer(params: {
    offerId: string;
    userId?: string;
    exchangeRate?: string;
    isActive?: boolean;
    advertiser?: string;
    durationHours?: number;
  }) {
    const { offerId, ...body } = params;
    return this.request(`/api/v1/mcp/offers/${offerId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delistOffer(params: { offerId: string; userId?: string }) {
    return this.request(`/api/v1/mcp/offers/${params.offerId}/delist`, {
      method: 'POST',
      body: JSON.stringify({ userId: params.userId }),
    });
  }

  async deleteOffer(params: { offerId: string; userId?: string }) {
    return this.request(`/api/v1/mcp/offers/${params.offerId}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId: params.userId }),
    });
  }

  async listTrades(params?: { tradeType?: string; state?: string }) {
    const query = new URLSearchParams();
    if (params?.tradeType) query.set('tradeType', params.tradeType);
    if (params?.state) query.set('state', params.state);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/trades${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  async getTrade(tradeId: string) {
    return this.request(`/api/v1/mcp/trades/${tradeId}`, { method: 'GET' });
  }

  async getMyTrades(params?: {
    userId?: string;
    tradeType?: string;
    state?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);
    if (params?.tradeType) query.set('tradeType', params.tradeType);
    if (params?.state) query.set('state', params.state);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/trades/my${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  async engageOffer(params: Record<string, unknown>) {
    return this.request('/api/v1/mcp/trades', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async cancelTrade(params: { tradeId: string; userId?: string }) {
    return this.request(`/api/v1/mcp/trades/${params.tradeId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ userId: params.userId }),
    });
  }

  async getEscrowBalances(params?: { userId?: string }) {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/escrow/balances${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  async getEscrowHistory(params?: { userId?: string }) {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);

    const queryString = query.toString();
    const endpoint = `/api/v1/mcp/escrow/history${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }
}
