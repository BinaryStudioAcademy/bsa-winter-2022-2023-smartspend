import { dateToShortStringHelper } from '~/bundles/common/helpers/helpers';

import { type TransactionType } from '../types';

const groupTransactionsByDate = (
    transactions: TransactionType[],
): Record<string, TransactionType[]> => {
    const groupedTransactions: Record<string, TransactionType[]> = {};

    for (const transaction of dateToShortStringHelper(
        transactions,
    ) as TransactionType[]) {
        const date = transaction.date;
        const groupedTransactionsDate = groupedTransactions[
            date
        ] as unknown as string;
        groupedTransactionsDate
            ? groupedTransactions[date].push(transaction)
            : (groupedTransactions[date] = [transaction]);
    }

    return groupedTransactions;
};

export { groupTransactionsByDate };
