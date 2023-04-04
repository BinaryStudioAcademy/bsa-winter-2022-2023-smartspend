type TransactionCreateRequestDto = {
    categoryId: string;
    date: Date;
    note: string;
    label: string;
    amount: number;
    currencyId: string;
};

export { type TransactionCreateRequestDto };
