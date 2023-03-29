import classNames from 'classnames';
import React, { useState } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';

import OrangeMurseIcon from '~/assets/img/orange-murse-icon.svg';
import { Input } from '~/bundles/common/components/components';
import { getDaysLeft } from '~/bundles/common/components/transanction-table/helpers/index';
import { InputType } from '~/bundles/common/enums/enums';

import { type ITransaction } from '../../types';
import styles from '../styles.module.scss';

interface TransactionProperties {
    transaction: ITransaction;
    control: Control<FieldValues, null>;
    errors: FieldErrors;
    isFutureTransaction?: boolean;
}
const Transaction: React.FC<TransactionProperties> = ({
    transaction,
    control,
    errors,
    isFutureTransaction = false,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: React.FormEvent<HTMLFormElement>): void => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
            // eslint-disable-next-line no-console
            console.log(`Checkbox ${transaction.id} is checked`);
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    };

    return (
        <div
            key={transaction.id}
            className={classNames(
                styles.transaction,
                isChecked ? styles.checked : styles.unchecked,
            )}
        >
            <div className={classNames(styles.columns, styles.leftColumn)}>
                {/* eslint-disable-next-line react/jsx-no-bind  */}
                <form className={styles.form} onChange={handleChange}>
                    <Input
                        type={InputType.CHECKBOX}
                        name={`checkbox-${transaction.id}`}
                        control={control}
                        errors={errors}
                        inputClassName={styles.checkbox}
                    />
                </form>
                <div>
                    {/* There must be icon from DB */}
                    <img src={OrangeMurseIcon} alt={'murse'} />
                </div>
                <div>{transaction.category}</div>
            </div>
            {isFutureTransaction && (
                <div className={styles.inDays}>
                    <span>{transaction.date}</span>
                    <span className={styles.totals}>
                        in {getDaysLeft([transaction])} days
                    </span>
                </div>
            )}
            <div
                className={classNames(
                    styles.columns,
                    styles.rightColumn,
                    transaction.amount < 0 ? styles.minus : styles.plus,
                )}
            >
                {transaction.amount.toFixed(2)}
                {transaction.currency}
            </div>
        </div>
    );
};

export { Transaction };
