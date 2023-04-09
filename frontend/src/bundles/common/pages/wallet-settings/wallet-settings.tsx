import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    useAppDispatch,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as walletsActions } from '~/bundles/wallets/store';

import { UserSettingsTabs as SettingsTabs } from '../../components/components';
import {
    ButtonsContainer,
    InputsContainer,
    Title,
} from './components/components';
import styles from './styles.module.scss';

const WalletSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const tabsData = [
        {
            title: 'Main Settings',
            to: '',
        },
    ];

    const onClickDeleteWalet = useCallback(
        (id: string): void => {
            void dispatch(walletsActions.remove(id));
            navigate('/dashboard');
        },
        [dispatch, navigate],
    );

    const handleDeleteWalet = useCallback(
        () => onClickDeleteWalet(id as string),
        [id, onClickDeleteWalet],
    );

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.tabs_container}>
                    <SettingsTabs tabsData={tabsData} />
                </div>
                <main className={styles.main_board}>
                    <Title>General Information</Title>
                    <InputsContainer />
                    <ButtonsContainer onDelete={handleDeleteWalet} />
                </main>
            </div>
        </div>
    );
};

export { WalletSettings };
