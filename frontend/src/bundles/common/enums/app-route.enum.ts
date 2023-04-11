const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    USER: '/user',
    USER_CATEGORIES: '/user/categories',
    USER_PROFILE: '/user/profile',
    DASHBOARD: '/dashboard',
    BUDGETS: '/budgets',
    WALLETS: '/wallets',
    UI: '/ui',
    WALLET_DETAILS: '/wallet/:id',
    CATEGORIES: '/categories',
    WALLET_DETAILS_TRANSACTION: '/wallet/:id/transaction',
    WALLET_DETAILS_BUDGETS: '/wallet/:id/budgets',
    WALLET_DETAILS_SETTINGS: '/wallet/:id/wallet-settings',
    BUDGETS_DETAILS: '/budgets/:id',
    WALLET_SETTINGS: '/wallet-settings',
    NOT_FOUND: '*',
    WALLET: '/wallet',
    TRANSACTION: '/transaction',
} as const;

export { AppRoute };
