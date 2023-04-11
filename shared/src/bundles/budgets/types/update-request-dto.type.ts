type UpdateBudgetRequestDto = {
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
    endDate?: string;
};

export { type UpdateBudgetRequestDto };
