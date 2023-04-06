import { Tab } from './components/components.js';
import styles from './styles.module.scss';

type TabsData = {
    title: string;
    to: string;
    prefix?: string;
    icon?: string;
};

type Properties = {
    tabsData: TabsData[];
    prefix?: string;
};

const Tabs: React.FC<Properties> = ({ tabsData, prefix }) => {
    return (
        <nav className={styles.tabs}>
            {tabsData.map((item, index) => (
                <Tab
                    key={index}
                    title={item.title}
                    to={item.to}
                    prefix={prefix}
                    icon={item.icon}
                />
            ))}
        </nav>
    );
};

export { Tabs };
