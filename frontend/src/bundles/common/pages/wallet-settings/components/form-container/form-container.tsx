import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import dumpIcon from '~/assets/img/dump-icon.svg';
import {
    BaseModal,
    Button,
    Dropdown,
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
import { type DataType } from '~/bundles/common/types/dropdown.type';
import { actions as walletsActions } from '~/bundles/wallets/store';
import { type WalletGetAllItemResponseDto } from '~/bundles/wallets/wallets';

import styles from './styles.module.scss';

const FormContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { wallets } = useAppSelector((state) => state.wallets);
    const [isActive, setIsActive] = useState<boolean>(false);
    const { currencies } = useAppSelector((state) => state.currencies);
    const [currentWallet, setCurrentWallet] = useState<
        WalletGetAllItemResponseDto | undefined
    >();
    const [isModalShown, setIsModalShown] = useState(false);
    const mutableCurrencies = useMemo(
        () =>
            currencies.map((currency) => ({
                value: currency.id,
                name: currency.name,
            })),
        [currencies],
    );

    const [currency, setCurrency] = useState<DataType>(
        mutableCurrencies[0] ?? { value: '', name: '' },
    );

    const [fields, setFields] = useState<WalletGetAllItemResponseDto>({
        id: '',
        name: '',
        currencyId: '',
        balance: 0,
        ownerId: '',
    });

    const { control, errors } = useAppForm({
        defaultValues: { name: '', balance: '', currencyId: '' },
    });

    const findCurrency = mutableCurrencies.find(
        (currency) => currency.value === fields.currencyId,
    );

    const handleChange = useCallback((selectedOption: DataType | null) => {
        if (selectedOption !== null) {
            setCurrency(selectedOption);
            setIsActive(true);
        }
    }, []);

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
            setIsActive(true);
        },
        [],
    );

    const handleBalanceInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            if (Number.isNaN(Number(value))) {
                return;
            }
            setFields(
                (previousState) =>
                    ({
                        ...previousState,
                        balance: Number(value),
                    } as WalletGetAllItemResponseDto),
            );
            setIsActive(true);
        },
        [],
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
                        currencyId: currency.value,
                        balance: data.balance,
                    },
                }),
            );
            navigate(`/wallet/${id}/transaction`);
        },
        [dispatch, navigate, currency.value],
    );

    const handleUpdateWallet = useCallback(
        () => onClickUpdateWallet(id as string, fields),
        [id, onClickUpdateWallet, fields],
    );

    useEffect(() => {
        setCurrentWallet(wallets.find((wallet) => wallet.id === id));
    }, [id, wallets]);

    useEffect(() => {
        setCurrency(mutableCurrencies[0]);
    }, [mutableCurrencies]);

    useEffect(() => {
        if (findCurrency) {
            setCurrency(findCurrency);
        }
    }, [findCurrency]);

    useEffect(() => {
        currentWallet && setFields(currentWallet);
    }, [currentWallet]);

    return (
        <>
            <BaseModal
                isShown={isModalShown}
                onClose={useCallback(() => setIsModalShown(false), [])}
                onSubmit={handleDeleteWalet}
                Header={
                    <h1 className={styles.modalTitle}>
                        Delete wallet &quot;{currentWallet?.name}&quot;
                    </h1>
                }
                Body={
                    <div className={styles.modalDetailsContainer}>
                        <p className={styles.modalSubTitle}>
                            Are you sure you want to delete the wallet &quot;
                            {currentWallet?.name}&quot;. You will lose all your
                            transactions, budgets and overview inside of this
                            wallet.
                        </p>
                    </div>
                }
                submitButtonName={'Delete Wallet'}
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
                    />
                </div>
                <div className={styles.input_currency}>
                    <Dropdown
                        name="currencyId"
                        placeholder="USD"
                        label="Wallet currency"
                        data={mutableCurrencies}
                        selectedOption={currency}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.buttons_container}>
                <Button
                    variant={ButtonVariant.PRIMARY}
                    onClick={handleUpdateWallet}
                    disabled={!isActive}
                >
                    Update Setting
                </Button>
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
            </div>
        </>
    );
};

export { FormContainer };
