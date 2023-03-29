import { type Knex } from 'knex';

const BUDGETS_TABLE = 'budgets';
const BUDGETS_USERS_TABLE = 'budgets_users';
const FOREIGN_TABLE_NAME = 'users';

const uuid = 'uuid_generate_v4()';

const BudgetsUsersColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    BUDGET_ID: 'budget_id',
};

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};
function up(knex: Knex): Promise<void> {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .dropTableIfExists(BUDGETS_USERS_TABLE)
        .createTable(BUDGETS_USERS_TABLE, (table) => {
            table
                .uuid(BudgetsUsersColumnName.ID)
                .primary()
                .defaultTo(knex.raw(uuid));
            table
                .uuid(BudgetsUsersColumnName.USER_ID)
                .references('id')
                .inTable('users');
            table
                .uuid(BudgetsUsersColumnName.BUDGET_ID)
                .references('id')
                .inTable('wallets');
        })
        .table(BUDGETS_TABLE, (table) => {
            table
                .uuid('owner_id')
                .unsigned()
                .references('id')
                .inTable(FOREIGN_TABLE_NAME)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        });
}

function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(BUDGETS_TABLE)
        .dropTableIfExists(BUDGETS_USERS_TABLE);
}

export { down, up };
