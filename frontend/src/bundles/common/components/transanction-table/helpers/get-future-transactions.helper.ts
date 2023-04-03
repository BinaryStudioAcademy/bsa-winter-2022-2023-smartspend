import { dateToShortStringHelper } from '~/bundles/common/helpers/helpers';

import { type ITransaction } from '../types';

const getFutureTransactions = (
    transactions: ITransaction[],
    today: Date,
): ITransaction[] => {
    return dateToShortStringHelper(
        transactions.filter(
            (transaction) => new Date(transaction.date) > today,
        ),
    ) as ITransaction[];
};

export { getFutureTransactions };
