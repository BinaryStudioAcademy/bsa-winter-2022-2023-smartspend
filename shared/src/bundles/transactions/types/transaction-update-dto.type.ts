type TransactionUpdatePayloadDto = {
    categoryId: string;
    date: Date;
    note?: string;
    labelId?: string;
    amount: number;
};
export { type TransactionUpdatePayloadDto };
