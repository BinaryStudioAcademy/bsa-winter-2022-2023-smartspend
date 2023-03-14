import { type Knex } from 'knex';

import { CategoryType } from '~/common/database/enums/migration-category-type-enum.js';

const TABLE_NAME = 'categories';

const ColumnName = {
    ID: 'id',
    ICON: 'icon',
    COLOR: 'color',
    TYPE: 'type',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table.string(ColumnName.ICON).notNullable();
        table.string(ColumnName.COLOR).notNullable();
        table.enum(ColumnName.TYPE, Object.values(CategoryType)).notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
