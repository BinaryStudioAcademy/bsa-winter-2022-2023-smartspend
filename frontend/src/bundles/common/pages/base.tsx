import React from 'react';

import { Tabs } from '../components/tabs/tabs';

const tabsData = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const Base: React.FC = () => {
    return (
        <div>
            Base Page
            <Tabs tabsData={tabsData} />
        </div>
    );
};

export { Base };
