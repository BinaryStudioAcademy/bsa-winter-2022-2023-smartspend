/* eslint-disable @typescript-eslint/no-misused-promises */

import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { InputType } from '../../enums/input-type.enum';
import { BaseModal, Input } from '../components';
import { Dropdown } from '../dropdown/dropdown';
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

const ModalAddWallet: React.FC<Properties> = ({
    isShown,
    onClose,
    onSubmit,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            walletName: '',
            startingBalance: '',
        },
    });

    const walletName = watch('walletName');

    return (
        <BaseModal
            isShown={isShown}
            onClose={onClose}
            hasActionButtons={false}
            onSubmit={handleSubmit(onSubmit)}
            Header={<span className={styles.title}>Create new Wallet</span>}
            Body={
                <form className={styles.modal}>
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
                        width="100%"
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
