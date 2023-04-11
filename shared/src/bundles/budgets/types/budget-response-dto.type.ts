type BudgetResponseDto = {
    id: string;
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
    endDate: string;
    ownerId: string;
};

export { type BudgetResponseDto };
