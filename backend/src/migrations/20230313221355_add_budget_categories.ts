import { type Knex } from 'knex';

const TABLE_NAME = 'budget_categories';

const ColumnName = {
    ID: 'id',
    BUDGET_ID: 'budget_id',
    CATEGORY_ID: 'category_id',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table
            .uuid(ColumnName.BUDGET_ID)
            .references('id')
            .inTable('budgets')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable();
        table
            .uuid(ColumnName.CATEGORY_ID)
            .references('id')
            .inTable('categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
