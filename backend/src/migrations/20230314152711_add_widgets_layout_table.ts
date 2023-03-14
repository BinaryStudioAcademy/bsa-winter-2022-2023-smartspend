import { type Knex } from 'knex';

import { PageName } from '~/common/database/enums/migration-page-name-enum.js';

const TABLE_NAME = 'widgets_layout';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    USER_ID: 'user_id',
    COMPONENT_KEY: 'component_key',
    POS_X: 'pos_x',
    POS_Y: 'pos_y',
    WIDTH: 'width',
    HEIGHT: 'height',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table.enum(ColumnName.NAME, Object.values(PageName)).notNullable();
        table
            .uuid(ColumnName.USER_ID)
            .references('id')
            .inTable('users')
            .notNullable();
        table.string(ColumnName.COMPONENT_KEY).notNullable();
        table.integer(ColumnName.POS_X).notNullable();
        table.integer(ColumnName.POS_Y).notNullable();
        table.integer(ColumnName.WIDTH).notNullable();
        table.integer(ColumnName.HEIGHT).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
