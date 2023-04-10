const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    USER: '/user',
    DASHBOARD: '/dashboard',
    BUDGETS: '/budgets',
    WALLETS: '/wallets',
    UI: '/ui',
    WALLET_DETAILS_TRANSACTION: '/wallet/:id/transaction',
    WALLET_DETAILS_BUDGETS: '/wallet/:id/budgets',
    WALLET_SETTINGS: '/wallet/:id/wallet-settings',
    BUDGETS_DETAILS: '/budgets/:id',
    NOT_FOUND: '*',
    WALLET: '/wallet',
    TRANSACTION: '/transaction',
    SETTINGS: '/wallet-settings',
} as const;

export { AppRoute };
