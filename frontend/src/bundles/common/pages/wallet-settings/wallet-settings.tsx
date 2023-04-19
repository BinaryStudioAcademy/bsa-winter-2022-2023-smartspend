import React from 'react';

import { AppDocumentTitles } from '../../enums/app-document-titles.enum';
import { useAppDocumentTitle } from '../../hooks/hooks';
import { FormContainer, Title } from './components/components';
import styles from './styles.module.scss';

const WalletSettings: React.FC = () => {
    useAppDocumentTitle(AppDocumentTitles.WALLET_SETTINGS);
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
