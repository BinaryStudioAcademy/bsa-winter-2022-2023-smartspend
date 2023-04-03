import { type ITransaction } from '../types';

const getFutureTotals = (futureTransactions: ITransaction[]): number => {
    return futureTransactions.reduce(
        (accumulator: number, { amount }) => accumulator + +amount,
        0,
    );
};

export { getFutureTotals };
