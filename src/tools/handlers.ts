/**
 * MCP tool handlers for BananaCrystal
 * Delegates each tool call to the BananaCrystalClient which forwards
 * the request to the hosted MCP server at agentic.bananacrystal.com/mcp
 */

import { BananaCrystalClient } from '../client.js';

type ToolHandler = (args: any) => Promise<any>;

export function createToolHandlers(
  client: BananaCrystalClient,
): Record<string, ToolHandler> {
  return {
    // Utility & Health
    ping: async () => client.ping(),
    get_server_info: async () => client.getServerInfo(),
    echo: async (args) => client.echo(args.message),

    // Profile & Identity
    get_my_profile: async () => client.getMyProfile(),

    // Balances
    get_balances: async (args) => client.getBalances(args),

    // Transfers
    request_transfer_otp: async (args) => client.requestTransferOtp(args),
    transfer_tokens: async (args) => client.transferTokens(args),

    // Swaps
    swap_currency: async (args) => client.swapCurrency(args),
    estimate_swap_fees: async (args) => client.estimateSwapFees(args),

    // Exchange Rates & Info
    get_exchange_rate: async (args) => client.getExchangeRate(args.currency),
    list_supported_currencies: async () => client.listSupportedCurrencies(),
    list_available_tokens: async () => client.listAvailableTokens(),

    // Transaction History
    get_transaction_history: async (args) => client.getTransactionHistory(args),

    // Limits & Settings
    get_my_limits: async () => client.getMyLimits(),
    update_my_agent_settings: async (args) =>
      client.updateMyAgentSettings(args),

    // KYC
    initiate_kyc: async (args) => client.initiateKyc(args),
    get_kyc_status: async (args) => client.getKycStatus(args),

    // Fiat Operations
    initiate_deposit: async (args) => client.initiateDeposit(args),
    request_withdrawal: async (args) => client.requestWithdrawal(args),
    get_deposit_status: async (args) => client.getDepositStatus(args),
    get_withdrawal_status: async (args) => client.getWithdrawalStatus(args),

    // Offers & Trades
    list_offers: async (args) => client.listOffers(args),
    get_offer: async (args) => client.getOffer(args.offer_id),
    get_my_offers: async (args) => client.getMyOffers(args),
    create_offer: async (args) => client.createOffer(args),
    update_offer: async (args) => client.updateOffer(args),
    delist_offer: async (args) => client.delistOffer(args),
    delete_offer: async (args) => client.deleteOffer(args),
    list_trades: async (args) => client.listTrades(args),
    get_trade: async (args) => client.getTrade(args.trade_id),
    get_my_trades: async (args) => client.getMyTrades(args),
    engage_offer: async (args) => client.engageOffer(args),
    cancel_trade: async (args) => client.cancelTrade(args),
    get_escrow_balances: async (args) => client.getEscrowBalances(args),
    get_escrow_history: async (args) => client.getEscrowHistory(args),

    // Agent-to-Agent Transactions
    request_agent_transaction: async (args) =>
      client.requestAgentTransaction(args),
    check_approval_status: async (args) =>
      client.checkApprovalStatus(args.approval_request_id),
    execute_approved_transaction: async (args) =>
      client.executeApprovedTransaction(args),
    get_agent_config: async (args) =>
      client.getAgentConfig(args.target_owner_user_ext_id),
  };
}
