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

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!groupedTransactions[date]) {
            groupedTransactions[date] = [];
        }

        groupedTransactions[date].push(transaction);
    }

    return groupedTransactions;
};

export { groupTransactionsByDate };
