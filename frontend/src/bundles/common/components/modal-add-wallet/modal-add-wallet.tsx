import classNames from 'classnames';

import { BaseModal, Input } from '~/bundles/common/components/components';
import { InputType } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as walletsActions } from '~/bundles/wallets/store';
import {
    type WalletCreateRequestDto,
    type WalletGetAllItemResponseDto,
} from '~/bundles/wallets/wallets';

import styles from './styles.module.scss';

interface Properties {
    isEdit?: boolean;
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
    values?: WalletGetAllItemResponseDto;
}

const NewWalletModal: React.FC<Properties> = ({
    isEdit = false,
    isShown,
    onClose,
    onSubmit,
    values,
}) => {
    const dispatch = useAppDispatch();
    const { currencies } = useAppSelector((state) => state.currencies);
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

    const { control, errors } = useAppForm<WalletCreateRequestDto>({
        defaultValues: {
            name: '',
            currencyId: '',
            balance: undefined,
        },
    });

    // maybe it will be used in the future
    //
    // const findCurrency = mutableCurrencies.find(
    //     (currency) => currency.value === fields.currencyId,
    // );
    //
    // const handleChange = useCallback((selectedOption: DataType | null) => {
    //     if (selectedOption !== null) {
    //         setCurrency(selectedOption);
    //     }
    // }, []);

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
        },
        [],
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
        },
        [],
    );

    const isFieldsChange = !(
        values?.name === fields.name && values.balance === fields.balance
    );

    const walletDataHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const formDataEntries = formData.entries();
            onClose();

            setFields({
                id: '',
                name: '',
                currencyId: matchingCurrency?.id as string,
                balance: 0,
                ownerId: '',
            });

            const data = Object.fromEntries(
                formDataEntries,
            ) as unknown as WalletCreateRequestDto;

            data.currencyId = matchingCurrency?.id as string;

            if (values) {
                void dispatch(
                    walletsActions.update({
                        id: fields.id,
                        payload: data,
                    }),
                );
            } else {
                void dispatch(walletsActions.create(data));
            }
        },
        [dispatch, fields.id, matchingCurrency?.id, onClose, values],
    );

    // maybe it will be used in the future
    //     useEffect(() => {
    //         setCurrency(mutableCurrencies[0]);
    // }, [mutableCurrencies]);
    //
    // useEffect(() => {
    //     values && setFields(values);
    //     if (findCurrency) {
    //         setCurrency(findCurrency);
    //     }
    // }, [findCurrency, values]);

    return (
        <BaseModal
            isShown={isShown}
            onClose={onClose}
            hasActionButtons={false}
            onSubmit={onSubmit}
            Header={<span className={styles.title}>Create new Wallet</span>}
            Body={
                <form className={styles.modal} onSubmit={walletDataHandler}>
                    <Input
                        control={control}
                        errors={errors}
                        label="Wallet Name"
                        name="name"
                        placeholder="Enter your wallet name"
                        type={InputType.TEXT}
                        inputClassName={styles.input}
                        labelClassName={styles.label}
                        onChange={handleNameInputChange}
                        value={fields.name}
                        maxLength={50}
                    />

                    {/*{maybe we will need this in the future}*/}
                    {/*<Dropdown*/}
                    {/*    data={mutableCurrencies}*/}
                    {/*    selectedOption={currency}*/}
                    {/*    handleChange={handleChange}*/}
                    {/*    label="Currency"*/}
                    {/*    labelClassName={styles.label}*/}
                    {/*    name="currencyId"*/}
                    {/*/>*/}

                    <Input
                        control={control}
                        errors={errors}
                        label="Starting balance (optional)"
                        name="balance"
                        placeholder="0.00"
                        type={InputType.TEXT}
                        inputClassName={styles.input}
                        labelClassName={styles.label}
                        onChange={handleBalanceInputChange}
                        value={fields.balance}
                        maxLength={10}
                    />
                    <button
                        className={classNames(
                            (isEdit ? isFieldsChange : fields.name) &&
                                styles.active,
                            styles.button,
                        )}
                        style={{
                            cursor: (isEdit ? isFieldsChange : fields.name)
                                ? 'pointer'
                                : 'default',
                        }}
                        type="submit"
                        disabled={isEdit ? !isFieldsChange : !fields.name}
                    >
                        {isEdit ? 'Save' : 'Create'}
                    </button>
                </form>
            }
        ></BaseModal>
    );
};

export { NewWalletModal };
