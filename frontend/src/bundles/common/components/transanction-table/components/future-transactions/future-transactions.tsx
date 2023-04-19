import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';

import { FaIcons } from '~/bundles/common/enums/fa-icons.enum';

import { type TransactionType } from '../../types';
import styles from '../styles.module.scss';
import { Transaction } from '../transaction/transaction';

interface FutureTransactionsProperties {
    futureTransactions: TransactionType[];
    futureTotals: number;
    control: Control<FieldValues, null>;
    errors: FieldErrors;
    isFutureTransactionPage?: boolean;
    addIdCheckedTransactions: (id: string) => void;
}
const FutureTransactions: React.FC<FutureTransactionsProperties> = ({
    futureTransactions,
    futureTotals,
    control,
    errors,
    isFutureTransactionPage = false,
    addIdCheckedTransactions,
}) => {
    const sortDate = futureTransactions.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date)),
    );
    const [isShowFutureTransaction, setIsShowFutureTransaction] =
        useState(false);

    const handleToggleShowFutureTransactions = useCallback(() => {
        setIsShowFutureTransaction((previousState) => !previousState);
    }, []);

    useEffect(() => {
        if (isFutureTransactionPage) {
            setIsShowFutureTransaction(true);
        }
    }, [isFutureTransactionPage]);

    return (
        <div className={styles.group}>
            <div className={styles.transaction}>
                <span className={styles.futureTitle}>
                    {isFutureTransactionPage
                        ? 'Non-recurring'
                        : 'Till the end of period'}
                </span>
            </div>
            {isFutureTransactionPage ? null : (
                <div className={classNames(styles.totals, styles.transaction)}>
                    <div className={classNames(styles.columns)}>
                        <FontAwesomeIcon
                            className={styles.chevronIcon}
                            icon={
                                isShowFutureTransaction
                                    ? FaIcons.CHEVRON_UP
                                    : FaIcons.CHEVRON_DOWN
                            }
                            onClick={handleToggleShowFutureTransactions}
                        />
                        <span className={styles.rowTitle}>Scheduled</span>
                    </div>
                    <div className={styles.transactionCount}>
                        {futureTransactions.length}
                        <span className={styles.smHide}>
                            {futureTransactions.length === 1 && ' transaction'}
                            {futureTransactions.length != 1 && ' transactions'}
                        </span>
                    </div>
                    {futureTransactions.length > 0 ? (
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
                    ) : (
                        <div
                            className={classNames(
                                styles.columns,
                                styles.rightColumn,
                            )}
                        >
                            0
                        </div>
                    )}
                </div>
            )}
            <div
                className={
                    isShowFutureTransaction
                        ? styles.futureTransactionsShow
                        : styles.futureTransactionsHide
                }
            >
                {futureTransactions.length > 0 ? (
                    sortDate.map((transaction) => (
                        <Transaction
                            key={transaction.id}
                            transaction={transaction}
                            control={control}
                            errors={errors}
                            isFutureTransaction={true}
                            addIdCheckedTransactions={addIdCheckedTransactions}
                        />
                    ))
                ) : (
                    <div
                        className={classNames(
                            styles.transaction,
                            styles.noTransaction,
                        )}
                    >
                        - - - No transactions yet - - -
                    </div>
                )}
            </div>
        </div>
    );
};

export { FutureTransactions };
