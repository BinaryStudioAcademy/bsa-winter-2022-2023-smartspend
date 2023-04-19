import { type TransactionType } from '../types';

const getDaysLeft = (transactions: TransactionType[]): number | undefined => {
    const now = new Date();
    const nextTransaction = transactions.find((transaction) => {
        if (new Date(transaction.date) === now) {
            return 'today';
        }
        return new Date(transaction.date) > now;
    });
    if (nextTransaction) {
        const timeDiff =
            new Date(nextTransaction.date).getTime() - now.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return undefined;
};

export { getDaysLeft };
