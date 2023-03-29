import { AppRoute } from '../../enums/enums';
import { CodeHighlight, Header } from '../components';

const tabsData = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budget', to: AppRoute.BUDGETS },
];

const allTabsData = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

const exampleCode = `
const tabsData = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budget', to: AppRoute.BUDGETS },
];

const allTabsData = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

const HeaderExample: React.FC = () => {
    return (
        <Header dataTabs={allTabsData} />
    );
};

export { HeaderExample };
`;

const HeaderPart: React.FC = () => {
    return (
        <>
            <CodeHighlight code={exampleCode} />
            <Header dataTabs={allTabsData} />
        </>
    );
};

export { HeaderPart };
