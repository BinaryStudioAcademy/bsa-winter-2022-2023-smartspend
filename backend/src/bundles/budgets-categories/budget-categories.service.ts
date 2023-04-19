import { type BudgetCategoriesRepository } from '~/bundles/budgets-categories/budget-categories.repository.js';
import { BudgetCategoryEntity } from '~/bundles/budgets-categories/budget-category.entity.js';

import {
    type BudgetCategoryGetAllResponseDto,
    type BudgetCategoryResponseDto,
} from './types/types.js';

class BudgetCategoriesService {
    private budgetRepository: BudgetCategoriesRepository;

    public constructor(budgetRepository: BudgetCategoriesRepository) {
        this.budgetRepository = budgetRepository;
    }

    public async findAllBudgetCategory(
        budgetId: string | undefined,
    ): Promise<BudgetCategoryGetAllResponseDto> {
        const items = await this.budgetRepository.findAllBudgetCategory(
            budgetId,
        );
        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async createBudgetCategory(
        categories: string[],
        budgetId: string,
    ): Promise<BudgetCategoryResponseDto[]> {
        const allCategories: BudgetCategoryResponseDto[] = [];
        for (const category of categories) {
            const budget = await this.budgetRepository.createBudgetCategory(
                BudgetCategoryEntity.initializeNew({
                    budgetId,
                    categoryId: category,
                }),
            );
            allCategories.push(budget.toObject());
        }
        return allCategories;
    }
    public async deleteBudgetCategory(
        budgetId: string,
    ): Promise<BudgetCategoryEntity | undefined> {
        const deletedBudget = await this.budgetRepository.deleteBudgetCategory(
            budgetId,
        );

        if (!deletedBudget) {
            throw new Error('Budget was not found');
        }
        return deletedBudget;
    }
}

export { BudgetCategoriesService };
