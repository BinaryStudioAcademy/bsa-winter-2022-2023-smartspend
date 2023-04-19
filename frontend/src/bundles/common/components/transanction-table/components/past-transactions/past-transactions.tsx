import classNames from 'classnames';
import React from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';

import { type TransactionType } from '../../types/transaction.type';
import styles from '../styles.module.scss';
import { Transaction } from '../transaction/transaction';

interface PastTransactionsProperties {
    groupedPastTransactions: Record<string, TransactionType[]>;
    dailyTotals: Record<string, number>;
    control: Control<FieldValues, null>;
    errors: FieldErrors;
    addIdCheckedTransactions: (id: string) => void;
}
const PastTransactions: React.FC<PastTransactionsProperties> = ({
    groupedPastTransactions,
    dailyTotals,
    control,
    errors,
    addIdCheckedTransactions,
}) => {
    const sortedTransactions = Object.entries(groupedPastTransactions).sort(
        (a, b) => Number(new Date(b[0])) - Number(new Date(a[0])),
    );

    return (
        <>
            {sortedTransactions.map(([date, transactions]) => (
                <div key={date} className={styles.group}>
                    <div className={classNames(styles.dateRow)}>
                        <span className={styles.date}>{date}</span>
                        <span
                            className={classNames(
                                dailyTotals[date] > 0
                                    ? styles.plus
                                    : styles.minus,
                            )}
                        >
                            {dailyTotals[date].toFixed(2)}
                            {transactions[0].currency}
                        </span>
                    </div>
                    {transactions.map((transaction) => (
                        <Transaction
                            key={transaction.id}
                            transaction={transaction}
                            control={control}
                            errors={errors}
                            addIdCheckedTransactions={addIdCheckedTransactions}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};

export { PastTransactions };
