import React from 'react';

import { UserSettingsTabs as SettingsTabs } from '../../components/components';
import {
    ButtonsContainer,
    InputsContainer,
    Title,
} from './components/components';
import styles from './styles.module.scss';

const WalletSettings: React.FC = () => {
    const tabsData = [
        {
            title: 'Main Settings',
            to: '',
            icon: 'SETTINGS',
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
                    <InputsContainer />
                    <ButtonsContainer />
                </main>
            </div>
        </div>
    );
};

export { WalletSettings };
