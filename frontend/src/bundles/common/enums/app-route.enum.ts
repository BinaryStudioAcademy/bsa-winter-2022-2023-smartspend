const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    DASHBOARD: '/dashboard',
    UI: '/ui',
    WALLET_DETAILS: '/wallet/:id',
} as const;

export { AppRoute };
