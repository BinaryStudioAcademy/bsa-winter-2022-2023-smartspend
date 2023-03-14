import { type Knex } from 'knex';

const TABLE_NAME = 'currencies';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table.string(ColumnName.NAME).notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
