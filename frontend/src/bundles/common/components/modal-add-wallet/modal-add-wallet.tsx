/* eslint-disable @typescript-eslint/no-misused-promises */

import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputType } from '../../enums/input-type.enum';
import { BaseModal, Input } from '../components';
import styles from './styles.module.scss';

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
    } = useForm();

    const [walletName, setWalletName] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currency, setCurrency] = useState('');

    const handleWalletNameChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setWalletName(event.target.value);
        },
        [],
    );

    const handleCurrencyChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setCurrency(event.target.value);
        },
        [],
    );

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
            onSubmit={handleSubmit(onSubmit)}
            Header={<h1>Create new Wallet</h1>}
            Body={
                <form className={styles.modal}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="walletName">
                            Wallet Name
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="walletName"
                            placeholder="Enter your wallet name"
                            onChange={handleWalletNameChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label
                            className={styles.label}
                            htmlFor="walletCurrency"
                        >
                            Currency
                        </label>

                        <select
                            id="walletCurrency"
                            required
                            onChange={handleCurrencyChange}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="CAD">CAD</option>
                        </select>
                    </div>
                    <Input
                        control={control}
                        errors={errors}
                        label="Starting balance (optional)"
                        name="startingBalance"
                        placeholder="0.00"
                        type={InputType.NUMBER}
                    />

                    {/* <div className={styles.inputGroup}>
                        <label
                            className={styles.label}
                            htmlFor="startingBalance"
                        >
                            Starting balance (optional)
                        </label>
                        <input
                            className={styles.input}
                            type="number"
                            id="startingBalance"
                            placeholder="0.00"
                        />
                    </div> */}
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
