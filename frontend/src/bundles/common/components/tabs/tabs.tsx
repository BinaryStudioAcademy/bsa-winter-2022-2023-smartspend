import React from 'react';

import { Tab } from './tab';
import styles from './tabs.module.css';

interface TabsData {
    title: string;
    to: string;
}

interface TabsProperties {
    tabsData: TabsData[];
}

const Tabs: React.FC<TabsProperties> = ({ tabsData }) => {
    return (
        <nav>
            <ul className={styles.tabs}>
                {tabsData.map((item, index) => (
                    <Tab key={index} title={item.title} to={item.to} />
                ))}
            </ul>
        </nav>
    );
};

export { Tabs };
