/**
 * MCP tool handlers for BananaCrystal
 * These implement the actual logic by calling the API client
 */

import { BananaCrystalClient } from "../client.js";

type ToolHandler = (args: any) => Promise<any>;

export function createToolHandlers(
  client: BananaCrystalClient,
): Record<string, ToolHandler> {
  return {
    // Utility & Health
    ping: async () => {
      return await client.ping();
    },

    get_server_info: async () => {
      return await client.getServerInfo();
    },

    echo: async (args) => {
      return await client.echo(args.message);
    },

    // Profile & Identity
    get_my_profile: async () => {
      return await client.getMyProfile();
    },

    // Balances
    get_balances: async (args) => {
      return await client.getBalances(args);
    },

    // Transfers
    request_transfer_otp: async (args) => {
      return await client.requestTransferOtp(args);
    },

    transfer_tokens: async (args) => {
      return await client.transferTokens(args);
    },

    // Swaps
    swap_currency: async (args) => {
      return await client.swapCurrency(args);
    },

    estimate_swap_fees: async (args) => {
      return await client.estimateSwapFees(args);
    },

    // Exchange Rates & Info
    get_exchange_rate: async (args) => {
      return await client.getExchangeRate(args.currency);
    },

    list_supported_currencies: async () => {
      return await client.listSupportedCurrencies();
    },

    list_available_tokens: async () => {
      return await client.listAvailableTokens();
    },

    // Transaction History
    get_transaction_history: async (args) => {
      return await client.getTransactionHistory(args);
    },

    // Limits & Settings
    get_my_limits: async () => {
      return await client.getMyLimits();
    },

    update_my_agent_settings: async (args) => {
      return await client.updateMyAgentSettings(args);
    },

    // KYC
    initiate_kyc: async (args) => {
      return await client.initiateKyc(args);
    },

    get_kyc_status: async (args) => {
      return await client.getKycStatus(args);
    },

    // Fiat Operations (Brale)
    initiate_deposit: async (args) => {
      return await client.initiateDeposit(args);
    },

    request_withdrawal: async (args) => {
      return await client.requestWithdrawal(args);
    },

    get_deposit_status: async (args) => {
      return await client.getDepositStatus(args);
    },

    get_withdrawal_status: async (args) => {
      return await client.getWithdrawalStatus(args);
    },

    // Offers & Trades (Prediction Market)
    list_offers: async (args) => {
      return await client.listOffers(args);
    },

    get_offer: async (args) => {
      return await client.getOffer(args.offerId);
    },

    get_my_offers: async (args) => {
      return await client.getMyOffers(args);
    },

    create_offer: async (args) => {
      return await client.createOffer(args);
    },

    update_offer: async (args) => {
      return await client.updateOffer(args);
    },

    delist_offer: async (args) => {
      return await client.delistOffer(args);
    },

    delete_offer: async (args) => {
      return await client.deleteOffer(args);
    },

    list_trades: async (args) => {
      return await client.listTrades(args);
    },

    get_trade: async (args) => {
      return await client.getTrade(args.tradeId);
    },

    get_my_trades: async (args) => {
      return await client.getMyTrades(args);
    },

    engage_offer: async (args) => {
      return await client.engageOffer(args);
    },

    cancel_trade: async (args) => {
      return await client.cancelTrade(args);
    },

    get_escrow_balances: async (args) => {
      return await client.getEscrowBalances(args);
    },

    get_escrow_history: async (args) => {
      return await client.getEscrowHistory(args);
    },

    // Sandbox-only
    reset_sandbox_balance: async () => {
      return await client.resetSandboxBalance();
    },

    // Agent-to-Agent Transactions
    request_agent_transaction: async (args) => {
      return await client.requestAgentTransaction(args);
    },

    check_approval_status: async (args) => {
      return await client.checkApprovalStatus(args.approvalRequestId);
    },

    execute_approved_transaction: async (args) => {
      return await client.executeApprovedTransaction(args);
    },

    get_agent_config: async (args) => {
      return await client.getAgentConfig(args.targetOwnerUserExtId);
    },
  };
}
