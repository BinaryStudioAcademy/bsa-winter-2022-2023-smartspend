import { type Knex } from 'knex';

import {
    down as downUsers,
    up as upUsers,
} from './20230215152530_add_users_table.js';
import {
    down as downBudgets,
    up as upBudgets,
} from './20230314152022_add_budgets_table.js';
import {
    down as downCategories,
    up as upCategories,
} from './20230314152307_add_categories_table.js';
import {
    down as downBudgetCategories,
    up as upBudgetCategories,
} from './20230314152349_add_budget_categories.js';
import {
    down as downCurrencies,
    up as upCurrencies,
} from './20230314152454_add_currencies_table.js';
import {
    down as downLabels,
    up as upLabels,
} from './20230314152529_add_labels_table.js';
import {
    down as downWallets,
    up as upWallets,
} from './20230314152625_add_wallets_table.js';
import {
    down as downWidgetsLayout,
    up as upWidgetsLayout,
} from './20230314152711_add_widgets_layout_table.js';
import {
    down as downTransactions,
    up as upTransactions,
} from './20230314152753_add_transactions_table.js';
import {
    down as downTransactionsLabels,
    up as upTransactionsLabels,
} from './20230314152845_add_transactions_labels_table.js';
import {
    down as downUsersCategories,
    up as upUsersCategories,
} from './20230314153044_add_users_categories_table.js';
import {
    down as downWalletsUsers,
    up as upWalletsUsers,
} from './20230314153140_add_wallets_users_table.js';

async function up(knex: Knex): Promise<void> {
    await upUsers(knex);
    await upBudgets(knex);
    await upCategories(knex);
    await upBudgetCategories(knex);
    await upCurrencies(knex);
    await upLabels(knex);
    await upWallets(knex);
    await upWidgetsLayout(knex);
    await upTransactions(knex);
    await upTransactionsLabels(knex);
    await upUsersCategories(knex);
    await upWalletsUsers(knex);
}

async function down(knex: Knex): Promise<void> {
    await downUsers(knex);
    await downBudgets(knex);
    await downCategories(knex);
    await downBudgetCategories(knex);
    await downCurrencies(knex);
    await downLabels(knex);
    await downWallets(knex);
    await downWidgetsLayout(knex);
    await downTransactions(knex);
    await downTransactionsLabels(knex);
    await downUsersCategories(knex);
    await downWalletsUsers(knex);
}

export { down, up };
