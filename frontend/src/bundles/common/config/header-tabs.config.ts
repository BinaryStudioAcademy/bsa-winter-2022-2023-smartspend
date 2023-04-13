import { AppRoute } from '~/bundles/common/enums/enums.js';

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD, icon: 'DASHBOARD' },
    { title: 'Budgets', to: AppRoute.BUDGETS, icon: 'BUDGET' },
];

const tabsData = [
    { title: 'Transactions', to: AppRoute.TRANSACTION, icon: 'TRANSACTION' },
    { title: 'Budgets', to: AppRoute.BUDGETS, icon: 'BUDGET' },
    {
        title: 'Wallet Settings',
        to: AppRoute.WALLET_SETTINGS,
        icon: 'GEAR',
    },
];

const dataTabs = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

export { dataTabs };
