type TransactionGetAllItemResponseDto = {
    id: string | null;
    categoryId: string;
    date: Date;
    note?: string;
    labelId?: string;
    amount: number;
    currencyId?: string;
    walletsId: string;
};

export { type TransactionGetAllItemResponseDto };
