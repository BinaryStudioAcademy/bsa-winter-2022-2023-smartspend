import { authController } from '~/bundles/auth/auth.js';
import { budgetController } from '~/bundles/budgets/budgets.js';
import { categoryController } from '~/bundles/categories/categories.js';
import { currencyController } from '~/bundles/currencies/currencies.js';
import { transactionController } from '~/bundles/transactions/transactions.js';
import { userCategoryController } from '~/bundles/user-categories/user-categories.js';
import { userController } from '~/bundles/users/users.js';
import { walletController } from '~/bundles/wallets/wallets.js';
import { config } from '~/common/config/config.js';
import { database } from '~/common/database/database.js';
import { logger } from '~/common/logger/logger.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
    'v1',
    config,
    ...authController.routes,
    ...userController.routes,
    ...categoryController.routes,
    ...walletController.routes,
    ...budgetController.routes,
    ...transactionController.routes,
    ...currencyController.routes,
    ...userCategoryController.routes,
);
const serverApp = new ServerApp({
    config,
    logger,
    database,
    apis: [apiV1],
});

export { serverApp };
export { type ServerAppRouteParameters } from './types/types.js';
