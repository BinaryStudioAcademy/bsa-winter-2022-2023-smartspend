type TransactionGetAllItemResponseDto = {
    id: string | null;
    categoryId: string;
    date: Date;
    note: string;
    label: string;
    amount: number;
    currencyId?: string;
};

export { type TransactionGetAllItemResponseDto };
