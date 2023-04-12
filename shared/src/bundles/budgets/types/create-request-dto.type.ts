type BudgetCreateRequestDto = {
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
    endDate?: string;
    categories: string[];
};

export { type BudgetCreateRequestDto };
