import React from 'react';

import { UserSettingsTabs as SettingsTabs } from '../../components/components';
import { FormContainer, Title } from './components/components';
import styles from './styles.module.scss';

const WalletSettings: React.FC = () => {
    const tabsData = [
        {
            title: 'Main Settings',
            to: '',
        },
    ];

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.tabs_container}>
                    <SettingsTabs tabsData={tabsData} />
                </div>
                <main className={styles.main_board}>
                    <Title>General Information</Title>
                    <FormContainer />
                </main>
            </div>
        </div>
    );
};

export { WalletSettings };
