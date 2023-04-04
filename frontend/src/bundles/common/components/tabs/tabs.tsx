import { Tab } from './components/components.js';
import styles from './styles.module.scss';

type TabsData = {
    title: string;
    to: string;
};

type Properties = {
    tabsData: TabsData[];
};

const Tabs: React.FC<Properties> = ({ tabsData }) => {
    return (
        <nav className={styles.tabs}>
            {tabsData.map((item, index) => (
                <Tab key={index} title={item.title} to={item.to} />
            ))}
        </nav>
    );
};

export { Tabs };
