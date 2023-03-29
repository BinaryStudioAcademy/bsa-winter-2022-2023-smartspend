import { AppRoute } from '~/bundles/common/enums/enums.js';

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budgets', to: AppRoute.BUDGETS },
];

const tabsData = [
    { title: 'Transaction', to: '/transaction' },
    { title: 'Overview', to: '/overview' },
    { title: 'Budget', to: '/budget' },
    { title: 'Wallet Settings', to: '/wallet-settings' },
];

const dataTabs = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

export { dataTabs };
