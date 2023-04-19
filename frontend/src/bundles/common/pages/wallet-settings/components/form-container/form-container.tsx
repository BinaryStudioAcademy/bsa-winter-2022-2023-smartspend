import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateWallet } from 'shared/build';

import dumpIcon from '~/assets/img/dump-icon.svg';
import {
    BaseModal,
    Button,
    Input,
} from '~/bundles/common/components/components';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { actions as walletsActions } from '~/bundles/wallets/store';
import { type WalletGetAllItemResponseDto } from '~/bundles/wallets/wallets';

import styles from './styles.module.scss';

const FormContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { wallet: currentWallet } = useAppSelector((state) => state.wallets);
    const [isActive, setIsActive] = useState<boolean>(false);
    const { currencies } = useAppSelector((state) => state.currencies);
    const [isModalShown, setIsModalShown] = useState(false);

    const { user } = useAppSelector((state) => state.users);
    const matchingCurrency = currencies.find(
        (currency) => currency.shortName === user?.currency,
    );

    const [fields, setFields] = useState<WalletGetAllItemResponseDto>({
        id: '',
        name: '',
        currencyId: matchingCurrency?.id as string,
        balance: 0,
        ownerId: '',
    });

    const { control, errors } = useAppForm({
        defaultValues: { name: '', balance: 0, currencyId: '' },
        validationSchema: updateWallet,
    });

    const handleNameInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setFields(
                (previousState) =>
                    ({
                        ...previousState,
                        name: value,
                    } as WalletGetAllItemResponseDto),
            );

            if (value.length === 0 || fields.balance === 0) {
                setIsActive(false);
            } else {
                setIsActive(true);
            }
        },
        [setIsActive, fields.balance],
    );

    const handleBalanceInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setFields(
                (previousState) =>
                    ({
                        ...previousState,
                        balance: +value.replace(/\D/g, ''),
                    } as WalletGetAllItemResponseDto),
            );
            setIsActive(true);
            if (fields.name.length === 0 || value === '') {
                setIsActive(false);
            }
        },
        [fields.name.length],
    );

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

    const onClickUpdateWallet = useCallback(
        (id: string, data: WalletGetAllItemResponseDto): void => {
            void dispatch(
                walletsActions.update({
                    id: id,
                    payload: {
                        name: data.name,
                        currencyId: data.currencyId,
                        balance: data.balance,
                    },
                }),
            );
            navigate(`/wallet/${id}/transaction`);
        },
        [dispatch, navigate],
    );

    const handleUpdateWallet = useCallback(
        () => onClickUpdateWallet(id as string, fields),
        [id, onClickUpdateWallet, fields],
    );

    useEffect(() => {
        void dispatch(walletsActions.getOne(id as string));
    }, [dispatch, id]);

    useEffect(() => {
        setFields(currentWallet);
    }, [currentWallet]);

    return (
        <>
            <BaseModal
                isShown={isModalShown}
                onClose={useCallback(() => setIsModalShown(false), [])}
                onSubmit={handleDeleteWalet}
                Header={
                    <h1 className={styles.modalTitle}>
                        Delete wallet &quot;{currentWallet.name}&quot;
                    </h1>
                }
                Body={
                    <div className={styles.modalDetailsContainer}>
                        <p className={styles.modalSubTitle}>
                            Are you sure you want to delete the wallet &quot;
                            {currentWallet.name}&quot;. You will lose all your
                            transactions, budgets and overview inside of this
                            wallet.
                        </p>
                    </div>
                }
                submitButtonName={'Delete Wallet'}
                submitButtonVariant={ButtonVariant.DELETE}
                footerContainerClass={styles.modalFooter}
                buttonsSize={ButtonSize.MEDIUM}
            />
            <div className={styles.inputs_container}>
                <div className={styles.input_name}>
                    <Input
                        value={fields.name}
                        type={InputType.TEXT}
                        label="Wallet Name"
                        name="name"
                        control={control}
                        errors={errors}
                        placeholder="Wallet name"
                        onChange={handleNameInputChange}
                        maxLength={50}
                    />
                </div>
                <div className={styles.input_balance}>
                    <Input
                        value={fields.balance}
                        type={InputType.NUMBER}
                        label="Initial balance"
                        name="balance"
                        control={control}
                        errors={errors}
                        placeholder="Initial balance"
                        onChange={handleBalanceInputChange}
                        maxLength={10}
                    />
                </div>
            </div>
            <div className={styles.buttons_container}>
                <Button
                    variant={ButtonVariant.DELETE}
                    onClick={useCallback(() => setIsModalShown(true), [])}
                >
                    <img
                        src={dumpIcon}
                        alt="icon"
                        className={styles.button_delete_icon}
                    />
                    Delete Wallet
                </Button>
                <Button
                    variant={ButtonVariant.PRIMARY}
                    onClick={handleUpdateWallet}
                    disabled={!isActive}
                >
                    Update Setting
                </Button>
            </div>
        </>
    );
};

export { FormContainer };
