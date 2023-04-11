import { type TransactionType } from '../types';

const getPastTransactions = (
    transactions: TransactionType[],
    today: Date,
): TransactionType[] => {
    return transactions.filter(
        (transaction) => new Date(transaction.date) < today,
    );
};

export { getPastTransactions };
