type BudgetSliceResponseDto = {
    id: string;
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
    endDate?: string;
    ownerId: string;
    categories: {
        id: string;
        name: string;
        icon: string;
        color: string;
        type: string;
    }[];
};

export { type BudgetSliceResponseDto };
