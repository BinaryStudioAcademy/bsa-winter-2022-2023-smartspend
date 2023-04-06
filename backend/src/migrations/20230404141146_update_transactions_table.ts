import { type Knex } from 'knex';

const TRANSACTIONS_TABLE_NAME = 'transactions';

function up(knex: Knex): Promise<void> {
    return knex.schema.table(TRANSACTIONS_TABLE_NAME, (table) => {
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
    return knex.schema.dropTableIfExists(TRANSACTIONS_TABLE_NAME);
}

export { down, up };
