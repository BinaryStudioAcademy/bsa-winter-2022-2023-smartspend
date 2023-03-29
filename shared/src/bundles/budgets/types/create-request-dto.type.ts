type BudgetCreateRequestDto = {
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    categories: string[];
};

export { type BudgetCreateRequestDto };
