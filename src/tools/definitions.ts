/**
 * MCP tool definitions for BananaCrystal
 * These define the interface that AI agents see
 */

export function createToolDefinitions() {
  return [
    // Utility & Health
    {
      name: 'ping',
      description: 'Health check tool — returns pong',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'get_server_info',
      description: 'Returns basic server information',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'echo',
      description: 'Echoes the input message back to the caller',
      inputSchema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'The message to echo',
          },
        },
        required: ['message'],
      },
    },

    // Profile & Identity
    {
      name: 'get_my_profile',
      description:
        'Get your BananaCrystal profile including user ID, wallets, and account details',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },

    // Balances
    {
      name: 'get_balances',
      description:
        'Get Hedera account balances for all tokens or a specific token',
      inputSchema: {
        type: 'object',
        properties: {
          accountId: {
            type: 'string',
            description:
              'Hedera account ID (e.g. 0.0.12345). Defaults to your account.',
          },
          tokenId: {
            type: 'string',
            description:
              'Specific token ID to check (e.g. 0.0.67890). Omit for all tokens.',
          },
        },
      },
    },

    // Transfers
    {
      name: 'request_transfer_otp',
      description:
        'Step 1: Request an OTP code to authorize a token transfer. An email will be sent with the code.',
      inputSchema: {
        type: 'object',
        properties: {
          tokenId: {
            type: 'string',
            description: 'Hedera token ID to transfer (e.g. 0.0.67890)',
          },
          recipientAccountId: {
            type: 'string',
            description: 'Recipient Hedera account ID, email, or username',
          },
          amount: {
            type: 'string',
            description: 'Amount to transfer (as string to preserve precision)',
          },
          tokenSymbol: {
            type: 'string',
            description: 'Optional token symbol for the email (e.g. USDC)',
          },
        },
        required: ['tokenId', 'recipientAccountId', 'amount'],
      },
    },
    {
      name: 'transfer_tokens',
      description:
        'Step 2: Execute the token transfer using the OTP code from your email',
      inputSchema: {
        type: 'object',
        properties: {
          tokenId: {
            type: 'string',
            description: 'Hedera token ID (same as request_transfer_otp)',
          },
          recipientAccountId: {
            type: 'string',
            description: 'Recipient identifier (same as request_transfer_otp)',
          },
          amount: {
            type: 'string',
            description: 'Amount to transfer (same as request_transfer_otp)',
          },
          otpCode: {
            type: 'string',
            description: '6-digit OTP code from email',
          },
          transactionRef: {
            type: 'string',
            description:
              'Transaction reference from request_transfer_otp response',
          },
          tokenSymbol: {
            type: 'string',
            description: 'Optional token symbol',
          },
        },
        required: [
          'tokenId',
          'recipientAccountId',
          'amount',
          'otpCode',
          'transactionRef',
        ],
      },
    },

    // Swaps
    {
      name: 'swap_currency',
      description:
        'Swap between two Hedera tokens. Exchange rate calculated automatically.',
      inputSchema: {
        type: 'object',
        properties: {
          fromTokenId: {
            type: 'string',
            description:
              'Token ID or symbol to swap FROM (e.g. "USDb" or "0.0.123")',
          },
          fromAmount: {
            type: 'string',
            description: 'Amount of source token to swap',
          },
          toTokenId: {
            type: 'string',
            description:
              'Token ID or symbol to swap TO (e.g. "NGNb" or "0.0.456")',
          },
          memo: {
            type: 'string',
            description: 'Optional memo for the transaction',
          },
        },
        required: ['fromTokenId', 'fromAmount', 'toTokenId'],
      },
    },
    {
      name: 'estimate_swap_fees',
      description: 'Estimate fees for a currency swap before executing',
      inputSchema: {
        type: 'object',
        properties: {
          fromCurrency: {
            type: 'string',
            description: 'Source currency code (e.g. USD)',
          },
          toCurrency: {
            type: 'string',
            description: 'Target currency code (e.g. NGN)',
          },
          amount: {
            type: 'number',
            description: 'Amount to swap',
          },
        },
        required: ['fromCurrency', 'toCurrency', 'amount'],
      },
    },

    // Exchange Rates & Info
    {
      name: 'get_exchange_rate',
      description: 'Get current buy/sell exchange rates for a currency',
      inputSchema: {
        type: 'object',
        properties: {
          currency: {
            type: 'string',
            description: 'Currency code (e.g. USD, NGN, EUR)',
          },
        },
        required: ['currency'],
      },
    },
    {
      name: 'list_supported_currencies',
      description: 'List all supported currencies and tokens on BananaCrystal',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'list_available_tokens',
      description: 'List all available Hedera tokens for the platform',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },

    // Transaction History
    {
      name: 'get_transaction_history',
      description: 'Get your transaction history with filtering options',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            description: 'Number of transactions to return (default: 20)',
          },
          page: {
            type: 'number',
            description: 'Page number (default: 1)',
          },
          type: {
            type: 'string',
            description: 'Filter by type: swap | transfer',
          },
          direction: {
            type: 'string',
            description: 'Filter by direction: incoming | outgoing | swap',
          },
        },
      },
    },

    // Limits & Settings
    {
      name: 'get_my_limits',
      description: 'Get your API key limits and current usage',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'update_my_agent_settings',
      description:
        'Update agent approval settings (require_human_approval, callback_url)',
      inputSchema: {
        type: 'object',
        properties: {
          requireHumanApproval: {
            type: 'boolean',
            description:
              'Enable/disable email approval for agent-to-agent transactions',
          },
          callbackUrl: {
            type: 'string',
            description:
              'HTTPS webhook URL for approval notifications (or null to disable)',
          },
        },
      },
    },

    // KYC
    {
      name: 'initiate_kyc',
      description:
        'Initiate KYC verification for a user. Returns a Sumsub access token.',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description:
              'External user ID to initiate KYC for. Defaults to your own user ID.',
          },
          ttlInSecs: {
            type: 'number',
            description: 'Token TTL in seconds (default: 3600)',
          },
        },
      },
    },
    {
      name: 'get_kyc_status',
      description: 'Get KYC verification status for a user',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description:
              'External user ID to get KYC status for. Defaults to your own user ID.',
          },
        },
      },
    },

    // Fiat Operations (Brale)
    {
      name: 'initiate_deposit',
      description: 'Initiate a fiat deposit via Brale. Requires verified KYC.',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
          amount: {
            type: 'number',
            description: 'Deposit amount',
          },
          currency: {
            type: 'string',
            description: 'Currency code (e.g. USD, USDC)',
          },
          accountId: {
            type: 'string',
            description: 'Brale account ID to credit',
          },
          railType: {
            type: 'string',
            description: 'Payment rail (e.g. ach, wire)',
          },
        },
        required: ['amount', 'currency'],
      },
    },
    {
      name: 'request_withdrawal',
      description:
        'Request a fiat withdrawal via Brale. Requires verified KYC.',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
          amount: {
            type: 'number',
            description: 'Withdrawal amount',
          },
          currency: {
            type: 'string',
            description: 'Currency code (e.g. USD, USDC)',
          },
          destinationAccount: {
            type: 'string',
            description: 'Destination bank account or address',
          },
          railType: {
            type: 'string',
            description: 'Payment rail (e.g. ach, wire)',
          },
        },
        required: ['amount', 'currency'],
      },
    },
    {
      name: 'get_deposit_status',
      description: 'Get the status of a fiat deposit by transfer ID',
      inputSchema: {
        type: 'object',
        properties: {
          transferId: {
            type: 'string',
            description: 'Brale transfer ID',
          },
          userId: {
            type: 'string',
            description:
              'External user ID (for audit). Defaults to your own user ID.',
          },
        },
        required: ['transferId'],
      },
    },
    {
      name: 'get_withdrawal_status',
      description: 'Get withdrawal requests for a user via Brale',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
        },
      },
    },

    // Offers & Trades (Prediction Market)
    {
      name: 'list_offers',
      description:
        'Browse the prediction market. Returns active offers with trade stats.',
      inputSchema: {
        type: 'object',
        properties: {
          offerType: {
            type: 'string',
            description: 'Filter by offer type (e.g. "buy", "sell")',
          },
          currency: {
            type: 'string',
            description: 'Filter by currency code (e.g. "NGN", "GHS")',
          },
          search: {
            type: 'string',
            description: 'Search by username, email, or advertiser',
          },
          sortBy: {
            type: 'string',
            description: 'Sort order: mostActiveTraders | highestStaked',
          },
          page: {
            type: 'number',
            description: 'Page number (default 1)',
          },
          limit: {
            type: 'number',
            description: 'Items per page (default 10)',
          },
        },
      },
    },
    {
      name: 'get_offer',
      description:
        'Get full details of a single offer including trade stats and time remaining',
      inputSchema: {
        type: 'object',
        properties: {
          offerId: {
            type: 'string',
            description: 'Offer UUID',
          },
        },
        required: ['offerId'],
      },
    },
    {
      name: 'get_my_offers',
      description: 'Get all offers created by a specific user',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
          offerType: {
            type: 'string',
            description: 'Filter by offer type',
          },
        },
      },
    },
    {
      name: 'create_offer',
      description:
        'Create a prediction market offer. The creator locks totalAmount in escrow.',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
          userEmail: {
            type: 'string',
            description: "Creator's email for notifications",
          },
          userName: {
            type: 'string',
            description: "Creator's display name",
          },
          advertiser: {
            type: 'string',
            description: 'Display name shown on the marketplace',
          },
          offerType: {
            type: 'string',
            description: 'Offer type (e.g. "buy", "sell")',
          },
          currency: {
            type: 'string',
            description: 'Currency code (e.g. "NGN", "GHS", "USD")',
          },
          amount: {
            type: 'number',
            description: 'Base amount',
          },
          totalAmount: {
            type: 'number',
            description: 'Total leveraged amount locked in escrow',
          },
          leverage: {
            type: 'string',
            description: 'Leverage multiplier (e.g. "5x")',
          },
          prediction: {
            type: 'string',
            description: 'Price direction prediction: "up" or "down"',
          },
          durationHours: {
            type: 'number',
            description: 'Offer duration in hours (e.g. 24, 48, 72)',
          },
          rateMode: {
            type: 'string',
            description:
              'Rate mode: fixed | market_at_creation | market_at_engagement',
          },
          exchangeRate: {
            type: 'string',
            description: 'Exchange rate (required when rateMode is "fixed")',
          },
          cutoffType: {
            type: 'string',
            description:
              'Engagement cutoff: immediate | duration | specific_date',
          },
          cutoffMinutes: {
            type: 'number',
            description:
              'Minutes after creation to close engagement (for duration cutoff)',
          },
          cutoffDate: {
            type: 'string',
            description:
              'ISO date to close engagement (for specific_date cutoff)',
          },
        },
        required: [
          'advertiser',
          'offerType',
          'currency',
          'amount',
          'totalAmount',
          'leverage',
          'prediction',
          'durationHours',
        ],
      },
    },
    {
      name: 'update_offer',
      description:
        'Edit an existing offer. Only allowed when the offer has no trades yet.',
      inputSchema: {
        type: 'object',
        properties: {
          offerId: {
            type: 'string',
            description: 'Offer UUID',
          },
          userId: {
            type: 'string',
            description:
              "Owner's external user ID (for authorization). Defaults to your own user ID.",
          },
          exchangeRate: {
            type: 'string',
            description: 'New exchange rate',
          },
          isActive: {
            type: 'boolean',
            description: 'Toggle offer active/inactive',
          },
          advertiser: {
            type: 'string',
            description: 'Updated advertiser display name',
          },
          durationHours: {
            type: 'number',
            description: 'Updated duration in hours',
          },
        },
        required: ['offerId'],
      },
    },
    {
      name: 'delist_offer',
      description:
        'Delist (deactivate) your own offer from the marketplace. Releases locked escrow.',
      inputSchema: {
        type: 'object',
        properties: {
          offerId: {
            type: 'string',
            description: 'Offer UUID',
          },
          userId: {
            type: 'string',
            description:
              "Owner's external user ID. Defaults to your own user ID.",
          },
        },
        required: ['offerId'],
      },
    },
    {
      name: 'delete_offer',
      description:
        'Permanently delete your own offer. Blocked if the offer has active trades.',
      inputSchema: {
        type: 'object',
        properties: {
          offerId: {
            type: 'string',
            description: 'Offer UUID',
          },
          userId: {
            type: 'string',
            description:
              "Owner's external user ID. Defaults to your own user ID.",
          },
        },
        required: ['offerId'],
      },
    },
    {
      name: 'list_trades',
      description:
        'List all trades on the platform. Filter by trade type or state.',
      inputSchema: {
        type: 'object',
        properties: {
          tradeType: {
            type: 'string',
            description: 'Filter by trade type: long | short',
          },
          state: {
            type: 'string',
            description:
              'Filter by state: active | cancelled | completed | expired | settled',
          },
        },
      },
    },
    {
      name: 'get_trade',
      description:
        'Get full details of a single trade including the parent offer stats',
      inputSchema: {
        type: 'object',
        properties: {
          tradeId: {
            type: 'string',
            description: 'Trade UUID',
          },
        },
        required: ['tradeId'],
      },
    },
    {
      name: 'get_my_trades',
      description:
        'Get all trades for a user — both trades they created and trades on offers they own',
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
          tradeType: {
            type: 'string',
            description: 'Filter by trade type: long | short',
          },
          state: {
            type: 'string',
            description:
              'Filter by state: active | cancelled | completed | expired | settled',
          },
        },
      },
    },
    {
      name: 'engage_offer',
      description:
        'Engage (trade against) an open offer. The trader locks the same totalAmount in escrow.',
      inputSchema: {
        type: 'object',
        properties: {
          offerId: {
            type: 'string',
            description: 'Offer UUID to engage',
          },
          userId: {
            type: 'string',
            description:
              "Trader's external user ID. Defaults to your own user ID.",
          },
          userEmail: {
            type: 'string',
            description: "Trader's email for settlement notifications",
          },
          userName: {
            type: 'string',
            description: "Trader's display name",
          },
          buyerProfileId: {
            type: 'string',
            description: 'Buyer profile ID',
          },
          sellerProfileId: {
            type: 'string',
            description: 'Seller profile ID',
          },
          amount: {
            type: 'number',
            description: 'Trade amount',
          },
          tradeType: {
            type: 'string',
            description:
              'Your prediction: "long" (price goes up) or "short" (price goes down)',
          },
          currency: {
            type: 'string',
            description: 'Currency code matching the offer (e.g. "NGN")',
          },
        },
        required: [
          'offerId',
          'buyerProfileId',
          'sellerProfileId',
          'amount',
          'tradeType',
          'currency',
        ],
      },
    },
    {
      name: 'cancel_trade',
      description:
        'Cancel an active trade and release your locked escrow. Only possible while trade is active.',
      inputSchema: {
        type: 'object',
        properties: {
          tradeId: {
            type: 'string',
            description: 'Trade UUID',
          },
          userId: {
            type: 'string',
            description:
              "Trader's external user ID (must be the trade owner). Defaults to your own user ID.",
          },
        },
        required: ['tradeId'],
      },
    },
    {
      name: 'get_escrow_balances',
      description:
        "Get a user's escrow balance breakdown: total, available, and locked amounts",
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
        },
      },
    },
    {
      name: 'get_escrow_history',
      description:
        "Get a user's full escrow transaction history — locks, releases, wins, losses, fees",
      inputSchema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'External user ID. Defaults to your own user ID.',
          },
        },
      },
    },

    // Agent-to-Agent Transactions
    {
      name: 'request_agent_transaction',
      description:
        'Request a transaction on behalf of another user. They will receive an email to approve.',
      inputSchema: {
        type: 'object',
        properties: {
          targetOwnerUserExtId: {
            type: 'string',
            description: 'Target user ID or email address',
          },
          transactionType: {
            type: 'string',
            description: 'Type: transfer | swap | create_offer | accept_trade',
          },
          amount: {
            type: 'number',
            description: 'Transaction amount',
          },
          currency: {
            type: 'string',
            description: 'Currency code (e.g. NGN, USD)',
          },
          transactionParams: {
            type: 'object',
            description: 'Transaction-specific parameters',
          },
          reason: {
            type: 'string',
            description: 'Human-readable reason shown in approval email',
          },
          requesterName: {
            type: 'string',
            description: 'Your display name shown in approval email',
          },
        },
        required: [
          'targetOwnerUserExtId',
          'transactionType',
          'amount',
          'currency',
          'transactionParams',
        ],
      },
    },
    {
      name: 'check_approval_status',
      description: 'Check the status of a pending agent transaction approval',
      inputSchema: {
        type: 'object',
        properties: {
          approvalRequestId: {
            type: 'string',
            description: 'Approval request ID from request_agent_transaction',
          },
        },
        required: ['approvalRequestId'],
      },
    },
    {
      name: 'execute_approved_transaction',
      description: 'Execute a transaction after it has been approved',
      inputSchema: {
        type: 'object',
        properties: {
          approvalRequestId: {
            type: 'string',
            description: 'Approval request ID',
          },
          executionToken: {
            type: 'string',
            description: 'Execution token received after approval',
          },
        },
        required: ['approvalRequestId', 'executionToken'],
      },
    },
    {
      name: 'get_agent_config',
      description: "Look up another user's agent configuration",
      inputSchema: {
        type: 'object',
        properties: {
          targetOwnerUserExtId: {
            type: 'string',
            description: 'Target user ID or email address',
          },
        },
        required: ['targetOwnerUserExtId'],
      },
    },
  ];
}
