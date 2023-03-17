import { type Knex } from 'knex';

enum CategoryType {
    Income = 'income',
    Expense = 'expense',
    Transfer = 'transfer',
}

enum Currency {
    Usd = 'USD',
    Eur = 'EUR',
    Jpy = 'JPY',
    Gbp = 'GBP',
    Aud = 'AUD',
}

enum PageName {
    Overview = 'overview',
}

enum Recurrence {
    Once = 'ONCE',
    Daily = 'DAILY',
    Weekly = 'WEEKLY',
    Biweekly = 'BIWEEKLY',
    Monthly = 'MONTHLY',
    Yearly = 'YEARLY',
}

const CATEGORIES_TABLE_NAME = 'categories';
const USERS_TABLE_NAME = 'users';
const BUDGETS_TABLE_NAME = 'budgets';
const BUDGET_CATEGORIES_TABLE_NAME = 'budget_categories';
const CURRENCIES_TABLE_NAME = 'currencies';
const LABELS_TABLE_NAME = 'labels';
const WALLETS_TABLE_NAME = 'wallets';
const WIDGETS_LAYOUT_TABLE_NAME = 'widgets_layout';
const TRANSACTIONS_TABLE_NAME = 'transactions';
const TRANSACTIONS_LABELS_TABLE_NAME = 'transactions_labels';
const USER_CATEGORIES_TABLE_NAME = 'users_categories';
const WALLETS_USERS_TABLE_NAME = 'wallets_users';

const WalletsUsersColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    WALLET_ID: 'wallet_id',
};

const UsersCategoriesColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    CATEGORY_ID: 'category_id',
};

const TransactionsLabelsColumnName = {
    ID: 'id',
    LABEL_ID: 'label_id',
    TRANSACTION_ID: 'transaction_id',
};

const TransactionsColumnName = {
    ID: 'id',
    CATEGORY_ID: 'category_id',
    DATE: 'date',
    NOTE: 'note',
    LABEL_ID: 'label_id',
    AMOUNT: 'amount',
    CURRENCY_ID: 'currency_id',
    IMAGE: 'image',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const WidgetsLayoutColumnName = {
    ID: 'id',
    NAME: 'name',
    USER_ID: 'user_id',
    COMPONENT_KEY: 'component_key',
    POS_X: 'pos_x',
    POS_Y: 'pos_y',
    WIDTH: 'width',
    HEIGHT: 'height',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const WalletsColumnName = {
    ID: 'id',
    CURRENCY_ID: 'currency_id',
    BALANCE: 'balance',
    OWNER_ID: 'owner_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const LabelsColumnName = {
    ID: 'id',
    LABEL: 'label',
    ICON: 'icon',
};

const CurrenciesColumnName = {
    ID: 'id',
    NAME: 'name',
};

const BudgetsColumnName = {
    ID: 'id',
    NAME: 'name',
    AMOUNT: 'amount',
    CURRENCY: 'currency',
    RECURRENCE: 'recurrence',
    START_DATE: 'start_date',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const UsersColumnName = {
    ID: 'id',
    EMAIL: 'email',
    PASSWORD_HASH: 'password_hash',
    PASSWORD_SALT: 'password_salt',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const CategoriesColumnName = {
    ID: 'id',
    ICON: 'icon',
    COLOR: 'color',
    TYPE: 'type',
};

const BudgetCategoriesColumnName = {
    ID: 'id',
    BUDGET_ID: 'budget_id',
    CATEGORY_ID: 'category_id',
};

function up(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(USERS_TABLE_NAME)
        .createTable(USERS_TABLE_NAME, (table) => {
            table.uuid(UsersColumnName.ID).primary().notNullable();
            table.string(UsersColumnName.EMAIL).unique().notNullable();
            table.text(UsersColumnName.PASSWORD_HASH).notNullable();
            table.text(UsersColumnName.PASSWORD_SALT).notNullable();
            table
                .dateTime(UsersColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(UsersColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        })
        .createTable(BUDGETS_TABLE_NAME, (table) => {
            table.uuid(BudgetsColumnName.ID).primary().notNullable();
            table.string(BudgetsColumnName.NAME).notNullable();
            table.float(BudgetsColumnName.AMOUNT).notNullable();
            table
                .enum(BudgetsColumnName.CURRENCY, Object.values(Currency))
                .notNullable();
            table
                .enum(BudgetsColumnName.RECURRENCE, Object.values(Recurrence))
                .nullable();
            table.dateTime(BudgetsColumnName.START_DATE).nullable();
            table
                .dateTime(BudgetsColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(BudgetsColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        })
        .createTable(CATEGORIES_TABLE_NAME, (table) => {
            table.uuid(CategoriesColumnName.ID).primary();
            table.string(CategoriesColumnName.ICON).notNullable();
            table.string(CategoriesColumnName.COLOR).notNullable();
            table
                .enum(CategoriesColumnName.TYPE, Object.values(CategoryType))
                .notNullable();
        })
        .createTable(BUDGET_CATEGORIES_TABLE_NAME, (table) => {
            table.uuid(BudgetCategoriesColumnName.ID).primary();
            table
                .uuid(BudgetCategoriesColumnName.BUDGET_ID)
                .references('id')
                .inTable('budgets')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable();
            table
                .uuid(BudgetCategoriesColumnName.CATEGORY_ID)
                .references('id')
                .inTable('categories')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable();
        })
        .createTable(CURRENCIES_TABLE_NAME, (table) => {
            table.uuid(CurrenciesColumnName.ID).primary();
            table.string(CurrenciesColumnName.NAME).notNullable();
        })
        .createTable(LABELS_TABLE_NAME, (table) => {
            table.uuid(LabelsColumnName.ID).primary();
            table.string(LabelsColumnName.LABEL).notNullable();
            table.string(LabelsColumnName.ICON);
        })
        .createTable(WALLETS_TABLE_NAME, (table) => {
            table.uuid(WalletsColumnName.ID).primary();
            table
                .uuid(WalletsColumnName.CURRENCY_ID)
                .references('id')
                .inTable('currencies')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable();
            table.float(WalletsColumnName.BALANCE).notNullable();
            table
                .uuid(WalletsColumnName.OWNER_ID)
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable();
            table
                .dateTime(WalletsColumnName.CREATED_AT)
                .defaultTo(knex.fn.now());
            table
                .dateTime(WalletsColumnName.UPDATED_AT)
                .defaultTo(knex.fn.now());
        })
        .createTable(WIDGETS_LAYOUT_TABLE_NAME, (table) => {
            table.uuid(WidgetsLayoutColumnName.ID).primary();
            table
                .enum(WidgetsLayoutColumnName.NAME, Object.values(PageName))
                .notNullable();
            table
                .uuid(WidgetsLayoutColumnName.USER_ID)
                .references('id')
                .inTable('users')
                .notNullable();
            table.string(WidgetsLayoutColumnName.COMPONENT_KEY).notNullable();
            table.integer(WidgetsLayoutColumnName.POS_X).notNullable();
            table.integer(WidgetsLayoutColumnName.POS_Y).notNullable();
            table.integer(WidgetsLayoutColumnName.WIDTH).notNullable();
            table.integer(WidgetsLayoutColumnName.HEIGHT).notNullable();
            table
                .dateTime(WidgetsLayoutColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(WidgetsLayoutColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        })
        .createTable(TRANSACTIONS_TABLE_NAME, (table) => {
            table.uuid(TransactionsColumnName.ID).primary();
            table
                .uuid(TransactionsColumnName.CATEGORY_ID)
                .notNullable()
                .references('id')
                .inTable('categories')
                .onDelete('CASCADE');
            table.datetime(TransactionsColumnName.DATE).notNullable();
            table.text(TransactionsColumnName.NOTE);
            table
                .uuid(TransactionsColumnName.LABEL_ID)
                .references('id')
                .inTable('labels')
                .onDelete('SET NULL');
            table.float(TransactionsColumnName.AMOUNT).notNullable();
            table
                .uuid(TransactionsColumnName.CURRENCY_ID)
                .notNullable()
                .references('currencies.id')
                .onDelete('CASCADE');
            table.string(TransactionsColumnName.IMAGE);
            table
                .dateTime(TransactionsColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(TransactionsColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        })
        .createTable(TRANSACTIONS_LABELS_TABLE_NAME, (table) => {
            table.uuid(TransactionsLabelsColumnName.ID).primary();
            table
                .uuid(TransactionsLabelsColumnName.LABEL_ID)
                .notNullable()
                .references('id')
                .inTable('labels')
                .onDelete('CASCADE');
            table
                .uuid(TransactionsLabelsColumnName.TRANSACTION_ID)
                .notNullable()
                .references('id')
                .inTable('transactions')
                .onDelete('CASCADE');
        })
        .createTable(USER_CATEGORIES_TABLE_NAME, (table) => {
            table.uuid(UsersCategoriesColumnName.ID).primary();
            table
                .uuid(UsersCategoriesColumnName.USER_ID)
                .references('id')
                .inTable('users');
            table
                .uuid(UsersCategoriesColumnName.CATEGORY_ID)
                .references('id')
                .inTable('categories');
        })
        .createTable(WALLETS_USERS_TABLE_NAME, (table) => {
            table.uuid(WalletsUsersColumnName.ID).primary();
            table
                .uuid(WalletsUsersColumnName.USER_ID)
                .references('id')
                .inTable('users');
            table
                .uuid(WalletsUsersColumnName.WALLET_ID)
                .references('id')
                .inTable('wallets');
        });
}

function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(WALLETS_USERS_TABLE_NAME)
        .dropTableIfExists(USER_CATEGORIES_TABLE_NAME)
        .dropTableIfExists(TRANSACTIONS_LABELS_TABLE_NAME)
        .dropTableIfExists(TRANSACTIONS_TABLE_NAME)
        .dropTableIfExists(WIDGETS_LAYOUT_TABLE_NAME)
        .dropTableIfExists(WALLETS_TABLE_NAME)
        .dropTableIfExists(LABELS_TABLE_NAME)
        .dropTableIfExists(CURRENCIES_TABLE_NAME)
        .dropTableIfExists(BUDGET_CATEGORIES_TABLE_NAME)
        .dropTableIfExists(CATEGORIES_TABLE_NAME)
        .dropTableIfExists(BUDGETS_TABLE_NAME)
        .dropTableIfExists(USERS_TABLE_NAME);
}

export { down, up };
