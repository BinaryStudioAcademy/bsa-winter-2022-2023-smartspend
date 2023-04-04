import { type Knex } from 'knex';

const BUDGETS_TABLE = 'budgets';

function up(knex: Knex): Promise<void> {
    return knex.schema.table(BUDGETS_TABLE, (table) => {
        table
            .uuid('ownerId')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(BUDGETS_TABLE);
}

export { down, up };
