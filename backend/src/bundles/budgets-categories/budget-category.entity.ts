import { type IEntity } from '~/common/interfaces/interfaces';

class BudgetCategoryEntity implements IEntity {
    private 'id': string | null;

    private 'categoryId': string;

    private 'budgetId': string;

    private constructor({
        id,
        categoryId,
        budgetId,
    }: {
        id: string | null;
        categoryId: string;
        budgetId: string;
    }) {
        this.id = id;
        this.categoryId = categoryId;
        this.budgetId = budgetId;
    }

    public static initialize({
        id,
        categoryId,
        budgetId,
    }: {
        id: string;
        categoryId: string;
        budgetId: string;
    }): BudgetCategoryEntity {
        return new BudgetCategoryEntity({
            id,
            categoryId,
            budgetId,
        });
    }

    public static initializeNew({
        categoryId,
        budgetId,
    }: {
        categoryId: string;
        budgetId: string;
    }): BudgetCategoryEntity {
        return new BudgetCategoryEntity({
            id: null,
            categoryId,
            budgetId,
        });
    }

    public toObject(): {
        id: string;
        categoryId: string;
        budgetId: string;
    } {
        return {
            id: this.id as string,
            categoryId: this.categoryId,
            budgetId: this.budgetId,
        };
    }

    public toNewObject(): {
        categoryId: string;
        budgetId: string;
    } {
        return {
            categoryId: this.categoryId,
            budgetId: this.budgetId,
        };
    }
}

export { BudgetCategoryEntity };
