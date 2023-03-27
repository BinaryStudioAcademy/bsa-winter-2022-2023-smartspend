import classNames from 'classnames';
import React from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';

import OrangeMurseIcon from '~/assets/img/orange-murse-icon.svg';
import { Input } from '~/bundles/common/components/components';
import { getDaysLeft } from '~/bundles/common/components/transanction-table/helpers/index';
import { InputType } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';

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
    const handleOnChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            if (event.target.checked) {
                // Remove log and do there what you need
                // eslint-disable-next-line no-console
                console.log(`Checkbox ${transaction.id} is checked`);
            }
        },
        [transaction.id],
    );

    return (
        <div key={transaction.id} className={styles.transaction}>
            <div className={classNames(styles.columns, styles.leftColumn)}>
                <Input
                    type={InputType.CHECKBOX}
                    name={`checkbox-${transaction.id}`}
                    control={control}
                    errors={errors}
                    inputClassName={styles.checkbox}
                    onChange={handleOnChange}
                />
                <div>
                    {/* There must be icon from DB */}
                    <img src={OrangeMurseIcon} alt={'murse'} />
                </div>

                <div>{transaction.category}</div>
            </div>
            <div>
                {isFutureTransaction && (
                    <>
                        <div>{transaction.date}</div>
                        <div className={styles.totals}>
                            in {getDaysLeft([transaction])} days
                        </div>
                    </>
                )}
            </div>
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
