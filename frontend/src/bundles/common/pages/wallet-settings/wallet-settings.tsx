import React from 'react';

import { UserSettingsTabs } from '../../components/components';
import { FormContainer, Title } from './components/components';
import styles from './styles.module.scss';

const WalletSettings: React.FC = () => {
    const dataTabs = [
        {
            title: 'Main Settings',
            to: '',
        },
    ];

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.tabsContainer}>
                    <UserSettingsTabs tabsData={dataTabs} />
                </div>
                <main className={styles.mainBoard}>
                    <Title>General Information</Title>
                    <FormContainer />
                </main>
            </div>
        </div>
    );
};

export { WalletSettings };
