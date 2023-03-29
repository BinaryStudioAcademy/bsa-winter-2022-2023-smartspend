type BudgetResponseDto = {
    id: string;
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: Date;
    ownerId: string;
};

export { type BudgetResponseDto };
