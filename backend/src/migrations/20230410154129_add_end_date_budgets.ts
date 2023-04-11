import { type Knex } from 'knex';

const BUDGETS_TABLE = 'budgets';

function up(knex: Knex): Promise<void> {
    return knex.schema.table(BUDGETS_TABLE, (table) => {
        table.date('end_date');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(BUDGETS_TABLE);
}

export { down, up };
