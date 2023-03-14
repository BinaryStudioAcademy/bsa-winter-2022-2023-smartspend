import { type Knex } from 'knex';

const TABLE_NAME = 'wallets_users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    WALLET_ID: 'wallet_id',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table.uuid(ColumnName.USER_ID).references('id').inTable('users');
        table.uuid(ColumnName.WALLET_ID).references('id').inTable('wallets');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
