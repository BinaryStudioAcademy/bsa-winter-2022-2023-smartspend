import { type TransactionType } from '../types';

const getFutureTotals = (futureTransactions: TransactionType[]): number => {
    return futureTransactions.reduce(
        (accumulator: number, { amount }) => accumulator + +amount,
        0,
    );
};

export { getFutureTotals };
