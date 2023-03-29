type BudgetCreateRequestDto = {
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
    categories: string[];
};

export { type BudgetCreateRequestDto };
