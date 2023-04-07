type TransactionCreateRequestDto = {
    categoryId: string;
    date: Date;
    note: string;
    labelId?: string;
    amount: number;
    currencyId: string;
};

export { type TransactionCreateRequestDto };
