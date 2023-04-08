import { AppRoute } from '~/bundles/common/enums/enums.js';

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD, icon: 'DASHBOARD' },
    { title: 'Budgets', to: AppRoute.BUDGETS, icon: 'BUDGET' },
];

const tabsData = [
    { title: 'Transaction', to: AppRoute.TRANSACTION, icon: 'TRANSACTION' },
    { title: 'Budget', to: AppRoute.BUDGETS, icon: 'BUDGET' },
    {
        title: 'Wallet Settings',
        to: AppRoute.WALLET_SETTINGS,
        icon: 'SETTINGS',
    },
];

const dataTabs = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

export { dataTabs };
