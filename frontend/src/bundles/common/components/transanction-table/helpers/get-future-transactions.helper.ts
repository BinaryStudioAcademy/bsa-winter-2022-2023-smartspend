import { dateToShortStringHelper } from '~/bundles/common/helpers/helpers';

import { type TransactionType } from '../types';

const getFutureTransactions = (
    transactions: TransactionType[],
    today: Date,
): TransactionType[] => {
    return dateToShortStringHelper(
        transactions.filter(
            (transaction) => new Date(transaction.date) > today,
        ),
    ) as TransactionType[];
};

export { getFutureTransactions };
