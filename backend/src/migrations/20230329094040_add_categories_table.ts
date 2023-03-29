import { type Knex } from 'knex';

const CATEGORIES_TABLE_NAME = 'categories';

const CategoriesColumnName = {
    ID: 'id',
    NAME: 'name',
    ICON: 'icon',
    COLOR: 'color',
    TYPE: 'type',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.table(CATEGORIES_TABLE_NAME, (table) => {
        table.string(CategoriesColumnName.NAME).notNullable();
        table
            .dateTime(CategoriesColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(CategoriesColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}
function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(CATEGORIES_TABLE_NAME);
}
export { down, up };
