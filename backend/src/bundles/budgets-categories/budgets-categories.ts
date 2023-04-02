import { BudgetCategoriesRepository } from '~/bundles/budgets-categories/budget-categories.repository.js';
import { BudgetCategoriesService } from '~/bundles/budgets-categories/budget-categories.service.js';

import { BudgetCategoryModel } from './budget-categories.model.js';

const budgetCategoriesRepository = new BudgetCategoriesRepository(
    BudgetCategoryModel,
);

const budgetCategoriesService = new BudgetCategoriesService(
    budgetCategoriesRepository,
);

export { budgetCategoriesService };
