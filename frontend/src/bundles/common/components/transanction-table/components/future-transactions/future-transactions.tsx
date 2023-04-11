import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
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
}
const FutureTransactions: React.FC<FutureTransactionsProperties> = ({
    futureTransactions,
    futureTotals,
    control,
    errors,
}) => {
    const sortDate = futureTransactions.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date)),
    );
    const [isShowFutureTransaction, setIsShowFutureTransaction] =
        useState(false);

    const handleToggleShowFutureTransactions = useCallback(() => {
        setIsShowFutureTransaction((previousState) => !previousState);
    }, []);
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
                        onClick={handleToggleShowFutureTransactions}
                    />
                    <span className={styles.rowTitle}>Scheduled</span>
                </div>
                <div>
                    {futureTransactions.length}
                    <span className={styles.smHide}> transaction(s)</span>
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
