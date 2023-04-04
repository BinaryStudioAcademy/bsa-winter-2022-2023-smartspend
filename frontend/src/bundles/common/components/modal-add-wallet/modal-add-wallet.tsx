import classNames from 'classnames';

import {
    BaseModal,
    Dropdown,
    Input,
} from '~/bundles/common/components/components';
import { currencies } from '~/bundles/common/components/modal-add-wallet/constants/constants';
import { InputType } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';
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
    const [fields, setFields] = useState<WalletGetAllItemResponseDto>({
        id: '',
        name: '',
        currencyId: '',
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

    const [currency, setCurrency] = useState<DataType>(currencies[0]);
    const findCurrency = currencies.find(
        (currency) => currency.value === fields.currencyId,
    );

    const handleChange = useCallback((selectedOption: DataType | null) => {
        if (selectedOption !== null) {
            setCurrency(selectedOption);
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
        },
        [],
    );

    const handlebalanceInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setFields(
                (previousState) =>
                    ({
                        ...previousState,
                        balance: Number(value),
                    } as WalletGetAllItemResponseDto),
            );
        },
        [],
    );

    const isFieldsChange =
        values?.name === fields.name &&
        values.balance === fields.balance &&
        values.currencyId === currency.value
            ? false
            : true;

    const walletDataHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.target as HTMLFormElement);
            const formDataEntries = formData.entries();
            onClose();

            const data = Object.fromEntries(
                formDataEntries,
            ) as unknown as WalletCreateRequestDto;

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
        [dispatch, fields, onClose, values],
    );

    useEffect(() => {
        values && setFields(values);
        if (findCurrency) {
            setCurrency(findCurrency);
        }
    }, [findCurrency, values]);

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
                    />

                    <Dropdown
                        data={currencies}
                        selectedOption={currency}
                        handleChange={handleChange}
                        label="Currency"
                        labelClassName={styles.label}
                        name="currencyId"
                    />

                    <Input
                        control={control}
                        errors={errors}
                        label="Starting balance (optional)"
                        name="balance"
                        placeholder="0.00"
                        type={InputType.NUMBER}
                        inputClassName={styles.input}
                        labelClassName={styles.label}
                        onChange={handlebalanceInputChange}
                        value={fields.balance}
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
