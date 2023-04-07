import { type TabsData } from '../../types/types.js';
import { Tab } from './components/components.js';
import styles from './styles.module.scss';

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
