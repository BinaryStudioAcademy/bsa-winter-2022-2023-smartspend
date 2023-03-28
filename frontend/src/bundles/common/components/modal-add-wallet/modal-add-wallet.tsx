/* eslint-disable @typescript-eslint/no-misused-promises */

import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputType } from '../../enums/input-type.enum';
import { BaseModal, Input } from '../components';
// import { Dropdown } from '../dropdown/dropdown';
import styles from './styles.module.scss';

interface Properties {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
    // dropdownData;
    // dropdownSelected;
}

const ModalAddWallet: React.FC<Properties> = ({
    isShown,
    onClose,
    onSubmit,
    // dropdownData,
    // dropdownSelected,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currency, setCurrency] = useState('');

    // const handleCurrencyChange = useCallback(
    //     (event: React.ChangeEvent<HTMLSelectElement>) => {
    //         setCurrency(event.target.value);
    //     },
    //     [],
    // );

    //   in progress, don't review this part please =)

    // const handleSubmit = useCallback(
    //     // async (event: React.FormEvent) => {
    //     //     event.preventDefault();
    //
    //     // },
    //     [walletName, currency, onClose],
    // );

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
            submitButtonName={'Create'}
        ></BaseModal>
    );
};

export { ModalAddWallet };
