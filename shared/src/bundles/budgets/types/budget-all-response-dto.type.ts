type BudgetGetAllCategoriesResponseDto = {
    id: string;
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: Date;
    ownerId: string;
    categoriesId: string[];
};

export { type BudgetGetAllCategoriesResponseDto };
