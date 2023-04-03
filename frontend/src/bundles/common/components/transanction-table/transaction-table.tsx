import React from 'react';

import { useAppForm } from '../../hooks/hooks';
import { FutureTransactions } from './components/future-transactions/future-transactions';
import { PastTransactions } from './components/past-transactions/past-transactions';
import {
    getDailyTotals,
    getDefaultValues,
    getFutureTotals,
    getFutureTransactions,
    getPastTransactions,
    groupTransactionsByDate,
} from './helpers';
import styles from './styles.module.scss';
import { type ITransaction } from './types';

interface TransactionTableProperties {
    transactions: ITransaction[];
}

const TransactionTable: React.FC<TransactionTableProperties> = ({
    transactions,
}) => {
    const defaultValues = getDefaultValues(transactions);
    const { control, errors } = useAppForm({ defaultValues });
    const today = new Date();
    const pastTransactions = getPastTransactions(transactions, today);
    const futureTransactions = getFutureTransactions(transactions, today);
    const groupedPastTransactions = groupTransactionsByDate(pastTransactions);
    const dailyTotals = getDailyTotals(groupedPastTransactions);
    const futureTotals = getFutureTotals(futureTransactions);

    return (
        <div className={styles.transactionTable}>
            <FutureTransactions
                futureTotals={futureTotals}
                futureTransactions={futureTransactions}
                control={control}
                errors={errors}
            />
            <PastTransactions
                groupedPastTransactions={groupedPastTransactions}
                dailyTotals={dailyTotals}
                control={control}
                errors={errors}
            />
        </div>
    );
};

export { TransactionTable };
