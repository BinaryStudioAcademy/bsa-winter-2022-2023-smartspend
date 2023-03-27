import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useState } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';

import { FaIcons } from '~/bundles/common/enums/fa-icons.enum';

import { type ITransaction } from '../../types';
import styles from '../styles.module.scss';
import { Transaction } from '../transaction/transaction';

interface FutureTransactionsProperties {
    futureTransactions: ITransaction[];
    futureTotals: number;
    control: Control<FieldValues, null>;
    errors: FieldErrors;
}
const FutureTransactions: React.FC<FutureTransactionsProperties> = ({
    futureTransactions,
    futureTotals,
    control,
    errors,
}) => {
    const [isShowFutureTransaction, setIsShowFutureTransaction] =
        useState(false);

    const handleToggleShowFutureTransactions = (): void => {
        setIsShowFutureTransaction((previousState) => !previousState);
    };
    return (
        <div className={styles.group}>
            <div className={styles.transaction}>
                <span className={styles.futureTitle}>
                    Till the end of period
                </span>
            </div>
            <div className={classNames(styles.totals, styles.transaction)}>
                <div className={classNames(styles.columns)}>
                    <FontAwesomeIcon
                        className={styles.chevronIcon}
                        icon={
                            isShowFutureTransaction
                                ? FaIcons.CHEVRON_DOWN
                                : FaIcons.CHEVRON_UP
                        }
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={handleToggleShowFutureTransactions}
                    />
                    <span className={styles.rowTitle}>Scheduled</span>
                </div>
                <div>{futureTransactions.length} transaction(s)</div>
                <div
                    className={classNames(
                        styles.columns,
                        styles.rightColumn,
                        futureTotals < 0 ? styles.minus : styles.plus,
                    )}
                >
                    {futureTotals.toFixed(2)}
                    {futureTransactions[0].currency}
                </div>
            </div>
            <div
                className={
                    isShowFutureTransaction
                        ? styles.futureTransactionsShow
                        : styles.futureTransactionsHide
                }
            >
                {futureTransactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                        control={control}
                        errors={errors}
                        isFutureTransaction={true}
                    />
                ))}
            </div>
        </div>
    );
};

export { FutureTransactions };
