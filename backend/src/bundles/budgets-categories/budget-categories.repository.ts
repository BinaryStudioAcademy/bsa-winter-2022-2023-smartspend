import { type BudgetCategoryModel } from 'backend/src/bundles/budgets-categories/budget-categories.model.js';

import { BudgetCategoryEntity } from '~/bundles/budgets-categories/budget-category.entity.js';

class BudgetCategoriesRepository {
    private budgetCategoriesModel: typeof BudgetCategoryModel;

    public constructor(budgetCategoriesModel: typeof BudgetCategoryModel) {
        this.budgetCategoriesModel = budgetCategoriesModel;
    }

    public async findAllBudgetCategory(
        budgetId: string | undefined,
    ): Promise<BudgetCategoryEntity[]> {
        const users = await this.budgetCategoriesModel
            .query()
            .select('*')
            .where({ budgetId })
            .execute();
        return users.map((it) => BudgetCategoryEntity.initialize(it));
    }

    public async createBudgetCategory(
        entity: BudgetCategoryEntity,
    ): Promise<BudgetCategoryEntity> {
        const { budgetId, categoryId } = entity.toNewObject();

        const item = await this.budgetCategoriesModel
            .query()
            .insert({
                budgetId,
                categoryId,
            })
            .returning('*')
            .execute();
        return BudgetCategoryEntity.initialize(item);
    }
    public async deleteBudgetCategory(
        budgetId: string,
    ): Promise<BudgetCategoryEntity | undefined> {
        const item = await this.budgetCategoriesModel
            .query()
            .where({ budgetId })
            .del()
            .returning('budgetId')
            .execute();
        return BudgetCategoryEntity.initialize(item[0]);
    }
}

export { BudgetCategoriesRepository };
