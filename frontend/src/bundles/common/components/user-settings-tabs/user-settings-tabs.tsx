import styles from './styles.module.scss';
import { UserSettingsTab } from './user-settings-tab';

interface SettingsTabsData {
    title: string;
    to: string;
}

interface SettingsTabsProperties {
    tabsData: SettingsTabsData[];
}

const UserSettingsTabs: React.FC<SettingsTabsProperties> = ({ tabsData }) => {
    return (
        <nav className={styles.tabs}>
            {tabsData.map((item, index) => (
                <UserSettingsTab key={index} title={item.title} to={item.to} />
            ))}
        </nav>
    );
};

export { UserSettingsTabs };
