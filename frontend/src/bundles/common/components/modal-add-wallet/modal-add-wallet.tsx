import classNames from 'classnames';

import {
    BaseModal,
    Dropdown,
    Input,
} from '~/bundles/common/components/components';
import { currencies } from '~/bundles/common/components/modal-add-wallet/currency-list/currency-list';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';
import { actions as walletsActions } from '~/bundles/wallets/store';
import { type WalletCreateRequestDto } from '~/bundles/wallets/wallets';

import styles from './styles.module.scss';

interface Properties {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const NewWalletModal: React.FC<Properties> = ({
    isShown,
    onClose,
    onSubmit,
}) => {
    const dispatch = useAppDispatch();
    const { control, errors, watch, reset } =
        useAppForm<WalletCreateRequestDto>({
            defaultValues: {
                name: '',
                currencyId: 'e0df152c-86ce-4e24-b1e1-757b0fb79873',
                balance: 0,
            },
        });

    const [currency, setCurrency] = useState<DataType>(currencies[0]);

    const handleChange = useCallback((selectedOption: DataType | null) => {
        if (selectedOption !== null) {
            setCurrency(selectedOption);
        }
    }, []);

    const walletName = watch('name');
    const formReset = reset;

    const walletDataHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.target as HTMLFormElement);
            const formDataEntries = formData.entries();
            onClose();
            formReset && reset();

            const data = Object.fromEntries(
                formDataEntries,
            ) as unknown as WalletCreateRequestDto;

            void dispatch(walletsActions.create(data));
        },
        [dispatch, formReset, onClose, reset],
    );

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
                    />
                    <button
                        className={classNames(
                            walletName && styles.active,
                            styles.button,
                        )}
                        style={{
                            cursor: walletName ? 'pointer' : 'default',
                        }}
                        type="submit"
                        disabled={!walletName}
                    >
                        Create
                    </button>
                </form>
            }
        ></BaseModal>
    );
};

export { NewWalletModal };
