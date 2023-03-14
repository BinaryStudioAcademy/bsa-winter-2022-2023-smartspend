import { type Knex } from 'knex';

const TABLE_NAME = 'users_categories';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    CATEGORY_ID: 'category_id',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table.uuid(ColumnName.USER_ID).references('id').inTable('users');
        table
            .uuid(ColumnName.CATEGORY_ID)
            .references('id')
            .inTable('categories');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
