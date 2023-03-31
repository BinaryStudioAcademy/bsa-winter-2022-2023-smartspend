import { CodeHighlight, Tabs } from '../components';
import styles from './styles.module.scss';

const tabsData = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const codeExample = `
const tabsData = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const TabsExample: React.FC = () => {
    return (
        <Tabs tabsData={tabsData} />
    );
};

export { TabsExample };
`;

const TabsPart: React.FC = () => {
    return (
        <>
            <CodeHighlight code={codeExample} />
            <div className={styles.container}>
                <Tabs tabsData={tabsData} />
            </div>
        </>
    );
};

export { TabsPart };
