import React from 'react';

import { Tab } from './tab';
import styles from './tabs.module.css';

const Tabs: React.FC = () => {
    return (
        <nav>
            <ul className={styles.tabs}>
                {[
                    { title: 'Transaction', to: '/ui/' },
                    { title: 'Overview', to: '/ui/overview' },
                    { title: 'Budget', to: '/ui/budget' },
                    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
                ].map((item, index) => (
                    <Tab key={index} title={item.title} to={item.to} />
                ))}
            </ul>
        </nav>
    );
};

export { Tabs };
