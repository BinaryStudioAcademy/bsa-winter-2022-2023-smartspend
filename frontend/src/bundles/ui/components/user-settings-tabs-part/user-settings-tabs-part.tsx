import { CodeHighlight, UserSettingsTabs } from '../components.js';
import styles from './styles.module.scss';

const userSettingsData = [
    { title: 'Account', to: '/ui/' },
    { title: 'All Categories', to: '/ui/categories' },
    { title: 'Connected bank accounts', to: '/ui/accounts' },
    { title: 'Support', to: '/ui/support' },
    { title: 'Terms and Policies', to: '/ui/terms' },
];

const codeExample = `
const userSettingsData = [
    { title: 'Account', to: '/ui/' },
    { title: 'All Categories', to: '/ui/categories' },
    { title: 'Connected bank accounts', to: '/ui/accounts' },
    { title: 'Support', to: '/ui/support' },
    { title: 'Terms and Policies', to: '/ui/terms' },
];

const UserSettingsTabsExample: React.FC = () => {
    return (
        <UserSettingsTabs tabsData={userSettingsData} />
    );
};

export { UserSettingsTabsExample };
`;

const UserSettingsTabsPart: React.FC = () => {
    return (
        <div className={styles.container}>
            <CodeHighlight code={codeExample} />
            <UserSettingsTabs tabsData={userSettingsData} />
        </div>
    );
};

export { UserSettingsTabsPart };
