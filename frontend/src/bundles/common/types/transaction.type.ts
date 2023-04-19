type Transaction = {
    categoryId: string;
    date: Date;
    note?: string;
    labelId?: string;
    amount: number;
    currencyId: string;
    walletsId: string;
};

export { type Transaction };
