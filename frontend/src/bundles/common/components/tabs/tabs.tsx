import React from 'react';

import styles from './styles.module.scss';
import { Tab } from './tab';

type TabsData = {
    title: string;
    to: string;
    prefix?: string;
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
                />
            ))}
        </nav>
    );
};

export { Tabs };
