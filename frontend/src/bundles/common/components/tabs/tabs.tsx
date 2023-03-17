import React from 'react';

import styles from './styles.module.scss';
import { Tab } from './tab';

interface TabsData {
    title: string;
    to: string;
}

interface TabsProperties {
    tabsData: TabsData[];
}

const Tabs: React.FC<TabsProperties> = ({ tabsData }) => {
    return (
        <nav className={styles.tabs}>
            {tabsData.map((item, index) => (
                <Tab key={index} title={item.title} to={item.to} />
            ))}
        </nav>
    );
};

export { Tabs };
