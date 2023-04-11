type BudgetGetAllCategoriesResponseDto = {
    id: string;
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
    endDate: string;
    ownerId: string;
    categoriesId: string[];
};

export { type BudgetGetAllCategoriesResponseDto };
