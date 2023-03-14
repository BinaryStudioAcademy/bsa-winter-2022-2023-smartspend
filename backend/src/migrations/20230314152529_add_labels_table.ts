import { type Knex } from 'knex';

const TABLE_NAME = 'labels';

const ColumnName = {
    ID: 'id',
    LABEL: 'label',
    ICON: 'icon',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table.string(ColumnName.LABEL).notNullable();
        table.string(ColumnName.ICON);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
