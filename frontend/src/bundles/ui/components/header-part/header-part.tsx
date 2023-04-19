import { AppRoute } from '../../enums/enums';
import { CodeHighlight, Header } from '../components';
import styles from './styles.module.scss';

const tabsData = [
    { title: 'Transactions', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budgets', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budgets', to: AppRoute.BUDGETS },
];

const allTabsData = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

const exampleCode = `
const tabsData = [
    { title: 'Transactions', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budgets', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budgets', to: AppRoute.BUDGETS },
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
            <div className={styles.headerContainer}>
                <Header dataTabs={allTabsData} />
            </div>
        </>
    );
};

export { HeaderPart };
