/* eslint-disable @typescript-eslint/no-misused-promises */

import classNames from 'classnames';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { InputType } from '../../enums/input-type.enum';
import { BaseModal, Input } from '../components';
import { Dropdown } from '../dropdown/dropdown';
import { addWalletService } from '../modal-add-wallet/add-wallet-service';
import styles from './styles.module.scss';

const currencies = [
    { value: 'USD', name: 'US Dollar' },
    { value: 'EUR', name: 'Euro' },
    { value: 'GBP', name: 'British Pound' },
];

interface Properties {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

interface FormValues {
    walletName: string;
    currency: string;
    startingBalance: string;
}

interface WalletData {
    walletName: string;
    currency: string;
}

const ModalAddWallet: React.FC<Properties> = ({
    isShown,
    onClose,
    onSubmit,
}) => {
    const {
        control,
        formState: { errors },
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            walletName: '',
            currency: '',
            startingBalance: '',
        },
    });

    const walletName = watch('walletName');
    const currency = watch('currency');

    const handleCreateWallet = useCallback(async () => {
        const walletData: WalletData = {
            walletName,
            currency,
        };

        try {
            await addWalletService.add(walletData);
            onSubmit();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }, [walletName, currency, onSubmit]);

    return (
        <BaseModal
            isShown={isShown}
            onClose={onClose}
            hasActionButtons={false}
            onSubmit={handleCreateWallet}
            Header={<span className={styles.title}>Create new Wallet</span>}
            Body={
                <form className={styles.modal} onSubmit={handleCreateWallet}>
                    <Input
                        control={control}
                        errors={errors}
                        label="Wallet Name"
                        name="walletName"
                        placeholder="Enter your wallet name"
                        type={InputType.TEXT}
                        inputClassName={styles.input}
                        labelClassName={styles.label}
                    />

                    <Dropdown
                        data={currencies}
                        selectedOption={currencies[0]}
                        label="Currency"
                        labelClassName={styles.label}
                    ></Dropdown>

                    <Input
                        control={control}
                        errors={errors}
                        label="Starting balance (optional)"
                        name="startingBalance"
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
                    >
                        Create
                    </button>
                </form>
            }
        ></BaseModal>
    );
};

export { ModalAddWallet };
