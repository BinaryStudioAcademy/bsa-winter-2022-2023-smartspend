import { Tab } from './components/components.js';
import styles from './styles.module.scss';

type TabsData = {
    title: string;
    to: string;
    icon?: string;
};

type Properties = {
    tabsData: TabsData[];
};

const Tabs: React.FC<Properties> = ({ tabsData }) => {
    return (
        <nav className={styles.tabs}>
            {tabsData.map((item, index) => (
                <Tab
                    key={index}
                    title={item.title}
                    to={item.to}
                    icon={item.icon}
                />
            ))}
        </nav>
    );
};

export { Tabs };
