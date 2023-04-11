import { type TransactionType } from '../types';

const getDailyTotals = (
    groupedTransactions: Record<string, TransactionType[]>,
): Record<string, number> => {
    const dailyTotals: Record<string, number> = {};

    for (const date in groupedTransactions) {
        let total = 0;
        for (const transaction of groupedTransactions[date]) {
            total += transaction.amount;
        }
        dailyTotals[date] = total;
    }

    return dailyTotals;
};

export { getDailyTotals };
