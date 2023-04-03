import { dateToShortStringHelper } from '~/bundles/common/helpers/helpers';

import { type ITransaction } from '../types';

const groupTransactionsByDate = (
    transactions: ITransaction[],
): Record<string, ITransaction[]> => {
    const groupedTransactions: Record<string, ITransaction[]> = {};

    for (const transaction of dateToShortStringHelper(
        transactions,
    ) as ITransaction[]) {
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
