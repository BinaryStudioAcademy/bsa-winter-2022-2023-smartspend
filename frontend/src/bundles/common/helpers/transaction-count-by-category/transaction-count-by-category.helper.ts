import { type TransactionGetAllItemResponseDto } from 'shared/build';

const transactionCountsByCategory = (
    transactions: TransactionGetAllItemResponseDto[] | undefined,
    userId: string | undefined,
): Record<string, number> => {
    const counts: Record<string, number> = {};
    if (!transactions || !userId) {
        return {};
    }
    for (const transaction of transactions) {
        if (transaction.ownerId === userId) {
            const categoryId = transaction.categoryId;
            if (categoryId in counts) {
                counts[categoryId]++;
            } else {
                counts[categoryId] = 1;
            }
        }
    }
    return counts;
};

export { transactionCountsByCategory };
