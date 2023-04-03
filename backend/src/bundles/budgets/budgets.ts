import { logger } from '~/common/logger/logger.js';

import { BudgetController } from './budgets.controller.js';
import { BudgetModel } from './budgets.model.js';
import { BudgetRepository } from './budgets.repository.js';
import { BudgetService } from './budgets.service.js';

const budgetRepository = new BudgetRepository(BudgetModel);
const budgetService = new BudgetService(budgetRepository);
const budgetController = new BudgetController(logger, budgetService);

export { budgetController, budgetService };
export { BudgetModel } from './budgets.model.js';
