function getSpent<T extends { amount: number }>(transactions: T[]): number {
    let spentResult = 0;
    for (const transaction of transactions) {
        spentResult += transaction.amount;
    }
    return spentResult;
}

export { getSpent };
