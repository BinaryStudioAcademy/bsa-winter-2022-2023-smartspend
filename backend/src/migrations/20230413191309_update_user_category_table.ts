import { type Knex } from 'knex';

const TABLE_NAME = 'users_categories';
const uuid = 'uuid_generate_v4()';
const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    CATEGORY_ID: 'category_id',
};
async function up(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(TABLE_NAME)
        .createTable(TABLE_NAME, (table) => {
            table.uuid(ColumnName.ID).primary().defaultTo(knex.raw(uuid));
            table
                .uuid(ColumnName.USER_ID)
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table
                .uuid(ColumnName.CATEGORY_ID)
                .references('id')
                .inTable('categories')
                .onDelete('CASCADE');
        });
}
async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}
export { down, up };
