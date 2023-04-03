import { type ITransaction } from '../types';

const getDefaultValues = (
    transactions: ITransaction[],
): Record<string, boolean> => {
    const defaultValues: Record<string, boolean> = {};

    for (const transaction of transactions) {
        defaultValues[`checkbox-${transaction.id}`] = false;
    }

    return defaultValues;
};

export { getDefaultValues };
