const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    USER: '/user',
    DASHBOARD: '/dashboard',
    BUDGETS: '/budgets',
    WALLETS: '/wallets',
    UI: '/ui',
    WALLET_DETAILS: '/wallet/:id',
    BUDGETS_DETAILS: '/budgets/:id',
    NOT_FOUND: '*',
    WALLET: '/wallet',
    WALLET_SETTINGS: 'wallet-settings',
} as const;

export { AppRoute };
