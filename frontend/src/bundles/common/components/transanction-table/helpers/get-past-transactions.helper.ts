import { type ITransaction } from '../types';

const getPastTransactions = (
    transactions: ITransaction[],
    today: Date,
): ITransaction[] => {
    return transactions.filter(
        (transaction) => new Date(transaction.date) < today,
    );
};

export { getPastTransactions };
