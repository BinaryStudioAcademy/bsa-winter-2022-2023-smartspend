import { type TransactionType } from '../types';

const getDefaultValues = (
    transactions: TransactionType[],
): Record<string, boolean> => {
    const defaultValues: Record<string, boolean> = {};

    for (const transaction of transactions) {
        defaultValues[`checkbox-${transaction.id}`] = false;
    }

    return defaultValues;
};

export { getDefaultValues };
