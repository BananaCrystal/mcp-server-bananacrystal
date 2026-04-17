/**
 * HTTP client for BananaCrystal MCP Server
 *
 * Forwards tool calls to the hosted BananaCrystal MCP endpoint
 * using the MCP Streamable HTTP protocol (JSON-RPC over HTTP).
 *
 * Live endpoint:    https://agentic.bananacrystal.com/mcp
 * Sandbox endpoint: https://agentic.bananacrystal.com/mcp/sandbox
 */

export class BananaCrystalClient {
  constructor(
    private readonly apiUrl: string,
    private readonly apiKey: string,
    private readonly debug: boolean = false,
  ) {}

  /**
   * Call a tool on the hosted MCP server.
   * Sends a JSON-RPC tools/call request and returns the parsed result.
   */
  async callTool(
    toolName: string,
    args: Record<string, unknown> = {},
  ): Promise<unknown> {
    if (this.debug) {
      console.error(`[BananaCrystal MCP] → ${toolName}`, JSON.stringify(args));
    }

    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: toolName, arguments: args },
    });

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
        'x-api-key': this.apiKey,
      },
      body,
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

    const contentType = response.headers.get('content-type') || '';

    // Handle SSE (text/event-stream) response
    if (contentType.includes('text/event-stream')) {
      const text = await response.text();
      // Extract the data line from SSE
      const dataLine = text
        .split('\n')
        .find((line) => line.startsWith('data: '));
      if (!dataLine)
        throw new Error('Empty SSE response from BananaCrystal MCP');
      const json = JSON.parse(dataLine.slice(6));
      return this.extractContent(json);
    }

    // Handle plain JSON response
    const json = await response.json();
    return this.extractContent(json);
  }

  /**
   * Extract the text content from an MCP tool response.
   * Returns parsed JSON if the content is valid JSON, otherwise returns the raw string.
   */
  private extractContent(json: any): unknown {
    if (json.error) {
      throw new Error(json.error.message || JSON.stringify(json.error));
    }
    const content = json.result?.content;
    if (!Array.isArray(content) || content.length === 0) {
      return json.result ?? json;
    }
    const text = content[0]?.text;
    if (typeof text !== 'string') return content;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  // ── Utility ────────────────────────────────────────────────────────────────

  async ping() {
    return this.callTool('ping');
  }
  async getServerInfo() {
    return this.callTool('get_server_info');
  }
  async echo(message: string) {
    return this.callTool('echo', { message });
  }

  // ── Profile ────────────────────────────────────────────────────────────────

  async getMyProfile() {
    return this.callTool('get_my_profile');
  }

  // ── Balances ───────────────────────────────────────────────────────────────

  async getBalances(params?: {
    accountId?: string;
    tokenId?: string;
    chainId?: number;
  }) {
    return this.callTool('get_balances', params ?? {});
  }

  // ── Transfers ──────────────────────────────────────────────────────────────

  async requestTransferOtp(params: {
    token_id: string;
    recipient_account_id: string;
    amount: string;
    token_symbol?: string;
    user_id?: string;
    wallet_id?: string;
  }) {
    return this.callTool('request_transfer_otp', params);
  }

  async transferTokens(params: {
    token_id: string;
    recipient_account_id: string;
    amount: string;
    otp_code?: string;
    transaction_ref?: string;
    token_symbol?: string;
    user_id?: string;
    wallet_id?: string;
  }) {
    return this.callTool('transfer_tokens', params);
  }

  // ── Swaps ──────────────────────────────────────────────────────────────────

  async swapCurrency(params: {
    user_id: string;
    from_token_id: string;
    from_amount: string;
    to_token_id: string;
    wallet_id?: string;
    memo?: string;
  }) {
    return this.callTool('swap_currency', params);
  }

  async estimateSwapFees(params: {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
  }) {
    return this.callTool('estimate_swap_fees', params);
  }

  // ── Exchange Rates & Info ──────────────────────────────────────────────────

  async getExchangeRate(currency: string) {
    return this.callTool('get_exchange_rate', { currency });
  }

  async listSupportedCurrencies() {
    return this.callTool('list_supported_currencies');
  }
  async listAvailableTokens() {
    return this.callTool('list_available_tokens');
  }

  // ── Transaction History ────────────────────────────────────────────────────

  async getTransactionHistory(params?: {
    userExtId?: string;
    limit?: number;
    page?: number;
    type?: string;
    direction?: string;
  }) {
    return this.callTool('get_transaction_history', params ?? {});
  }

  // ── Limits & Settings ─────────────────────────────────────────────────────

  async getMyLimits() {
    return this.callTool('get_my_limits');
  }

  async updateMyAgentSettings(params: {
    require_human_approval?: boolean;
    require_otp?: boolean;
    callback_url?: string | null;
  }) {
    return this.callTool('update_my_agent_settings', params);
  }

  // ── KYC ───────────────────────────────────────────────────────────────────

  async initiateKyc(params?: { user_id?: string; ttl_in_secs?: number }) {
    return this.callTool('initiate_kyc', params ?? {});
  }

  async getKycStatus(params?: { user_id?: string }) {
    return this.callTool('get_kyc_status', params ?? {});
  }

  // ── Fiat Operations ───────────────────────────────────────────────────────

  async initiateDeposit(params: {
    amount: number;
    currency: string;
    user_id?: string;
    account_id?: string;
    rail_type?: string;
  }) {
    return this.callTool('initiate_deposit', params);
  }

  async requestWithdrawal(params: {
    amount: number;
    currency: string;
    user_id?: string;
    destination_account?: string;
    rail_type?: string;
  }) {
    return this.callTool('request_withdrawal', params);
  }

  async getDepositStatus(params: { transfer_id: string; user_id?: string }) {
    return this.callTool('get_deposit_status', params);
  }

  async getWithdrawalStatus(params?: { user_id?: string }) {
    return this.callTool('get_withdrawal_status', params ?? {});
  }

  // ── Offers & Trades ───────────────────────────────────────────────────────

  async listOffers(params?: {
    currency?: string;
    offer_type?: string;
    search?: string;
    sort_by?: string;
    limit?: number;
    page?: number;
  }) {
    return this.callTool('list_offers', params ?? {});
  }

  async getOffer(offer_id: string) {
    return this.callTool('get_offer', { offer_id });
  }

  async getMyOffers(params?: { user_id?: string; offer_type?: string }) {
    return this.callTool('get_my_offers', params ?? {});
  }

  async createOffer(params: Record<string, unknown>) {
    return this.callTool('create_offer', params);
  }

  async updateOffer(params: { offer_id: string; [key: string]: unknown }) {
    return this.callTool('update_offer', params);
  }

  async delistOffer(params: { offer_id: string; user_id?: string }) {
    return this.callTool('delist_offer', params);
  }

  async deleteOffer(params: { offer_id: string; user_id?: string }) {
    return this.callTool('delete_offer', params);
  }

  async listTrades(params?: { trade_type?: string; state?: string }) {
    return this.callTool('list_trades', params ?? {});
  }

  async getTrade(trade_id: string) {
    return this.callTool('get_trade', { trade_id });
  }

  async getMyTrades(params?: {
    user_id?: string;
    trade_type?: string;
    state?: string;
  }) {
    return this.callTool('get_my_trades', params ?? {});
  }

  async engageOffer(params: Record<string, unknown>) {
    return this.callTool('engage_offer', params);
  }

  async cancelTrade(params: { trade_id: string; user_id?: string }) {
    return this.callTool('cancel_trade', params);
  }

  async getEscrowBalances(params?: { user_id?: string }) {
    return this.callTool('get_escrow_balances', params ?? {});
  }

  async getEscrowHistory(params?: { user_id?: string }) {
    return this.callTool('get_escrow_history', params ?? {});
  }

  // ── Agent-to-Agent Transactions ───────────────────────────────────────────

  async requestAgentTransaction(params: {
    target_owner_user_ext_id: string;
    transaction_type: string;
    amount: number;
    currency: string;
    transaction_params: Record<string, unknown>;
    reason?: string;
    requester_name?: string;
  }) {
    return this.callTool('request_agent_transaction', params);
  }

  async checkApprovalStatus(approval_request_id: string) {
    return this.callTool('check_approval_status', { approval_request_id });
  }

  async executeApprovedTransaction(params: {
    approval_request_id: string;
    execution_token: string;
  }) {
    return this.callTool('execute_approved_transaction', params);
  }

  async getAgentConfig(target_owner_user_ext_id: string) {
    return this.callTool('get_agent_config', { target_owner_user_ext_id });
  }
}
