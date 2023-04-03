import { type ITransaction } from '../types';

const getDailyTotals = (
    groupedTransactions: Record<string, ITransaction[]>,
): Record<string, number> => {
    const dailyTotals: Record<string, number> = {};

    for (const date in groupedTransactions) {
        dailyTotals[date] = groupedTransactions[date].reduce(
            (total, transaction) => total + transaction.amount,
            0,
        );
    }

    return dailyTotals;
};

export { getDailyTotals };
