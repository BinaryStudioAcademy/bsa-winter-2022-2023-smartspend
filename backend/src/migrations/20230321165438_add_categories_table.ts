import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';

enum CategoryType {
    INCOME = 'income',
    EXPENSE = 'expense',
    TRANSFER = 'transfer',
}

const CATEGORIES_TABLE_NAME = 'categories';
const BUDGET_CATEGORIES_TABLE_NAME = 'budget_categories';
const USER_CATEGORIES_TABLE_NAME = 'users_categories';
const TRANSACTIONS_TABLE_NAME = 'transactions';
const TRANSACTIONS_LABELS_TABLE_NAME = 'transactions_labels';

const UsersCategoriesColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    CATEGORY_ID: 'category_id',
};
const CategoriesColumnName = {
    ID: 'id',
    NAME: 'name',
    ICON: 'icon',
    COLOR: 'color',
    TYPE: 'type',
};
const BudgetCategoriesColumnName = {
    ID: 'id',
    BUDGET_ID: 'budget_id',
    CATEGORY_ID: 'category_id',
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
const TransactionsLabelsColumnName = {
    ID: 'id',
    LABEL_ID: 'label_id',
    TRANSACTION_ID: 'transaction_id',
};

function up(knex: Knex): Promise<void> {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .dropTableIfExists(TRANSACTIONS_LABELS_TABLE_NAME)
        .dropTableIfExists(USER_CATEGORIES_TABLE_NAME)
        .dropTableIfExists(TRANSACTIONS_TABLE_NAME)
        .dropTableIfExists(BUDGET_CATEGORIES_TABLE_NAME)
        .dropTableIfExists(CATEGORIES_TABLE_NAME)
        .createTable(CATEGORIES_TABLE_NAME, (table) => {
            table
                .uuid(CategoriesColumnName.ID)
                .primary()
                .defaultTo(knex.raw(uuid));
            table.string(CategoriesColumnName.NAME).notNullable();
            table.string(CategoriesColumnName.ICON).notNullable();
            table.string(CategoriesColumnName.COLOR).notNullable();
            table
                .enum(CategoriesColumnName.TYPE, Object.values(CategoryType))
                .notNullable();
        })
        .createTable(BUDGET_CATEGORIES_TABLE_NAME, (table) => {
            table
                .uuid(BudgetCategoriesColumnName.ID)
                .primary()
                .defaultTo(knex.raw(uuid));
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
        .createTable(TRANSACTIONS_TABLE_NAME, (table) => {
            table
                .uuid(TransactionsColumnName.ID)
                .primary()
                .defaultTo(knex.raw(uuid));
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
            table
                .uuid(UsersCategoriesColumnName.ID)
                .primary()
                .defaultTo(knex.raw(uuid));
            table
                .uuid(UsersCategoriesColumnName.USER_ID)
                .references('id')
                .inTable('users');
            table
                .uuid(UsersCategoriesColumnName.CATEGORY_ID)
                .references('id')
                .inTable('categories');
        });
}
function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(TRANSACTIONS_LABELS_TABLE_NAME)
        .dropTableIfExists(TRANSACTIONS_TABLE_NAME)
        .dropTableIfExists(USER_CATEGORIES_TABLE_NAME)
        .dropTableIfExists(BUDGET_CATEGORIES_TABLE_NAME)
        .dropTableIfExists(CATEGORIES_TABLE_NAME);
}
export { down, up };
