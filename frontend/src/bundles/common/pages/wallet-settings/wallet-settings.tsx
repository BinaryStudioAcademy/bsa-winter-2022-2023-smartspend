import React from 'react';

import { FormContainer, Title } from './components/components';
import styles from './styles.module.scss';

const WalletSettings: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <main className={styles.mainBoard}>
                    <Title>General Information</Title>
                    <FormContainer />
                </main>
            </div>
        </div>
    );
};

export { WalletSettings };
