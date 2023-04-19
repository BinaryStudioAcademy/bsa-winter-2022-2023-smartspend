import { ButtonTab } from './components/components.js';
import styles from './styles.module.scss';

type TabsData = {
    title: string;
    isActive: boolean;
    disabled: boolean;
};

type Properties = {
    tabsData: TabsData[];
};

const ButtonTabs: React.FC<Properties> = ({ tabsData }) => {
    return (
        <nav className={styles.tabs}>
            {tabsData.map((item, index) => (
                <ButtonTab
                    key={index}
                    disabled={item.disabled}
                    label={item.title}
                    isActive={item.isActive}
                />
            ))}
        </nav>
    );
};

export { ButtonTabs };
