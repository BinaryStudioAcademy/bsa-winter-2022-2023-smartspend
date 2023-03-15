import { type Knex } from 'knex';

const TABLE_NAME = 'wallets';

const ColumnName = {
    ID: 'id',
    CURRENCY_ID: 'currency_id',
    BALANCE: 'balance',
    OWNER_ID: 'owner_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table
            .uuid(ColumnName.CURRENCY_ID)
            .references('id')
            .inTable('currencies')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable();
        table.float(ColumnName.BALANCE).notNullable();
        table
            .uuid(ColumnName.OWNER_ID)
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable();
        table.dateTime(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
        table.dateTime(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
