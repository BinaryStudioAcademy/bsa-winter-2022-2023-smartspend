import { type Knex } from 'knex';

const WALLETS_TRANSACTIONS_TABLE = 'wallets_transactions';

const WalletsTransactionsColumnName = {
    ID: 'id',
    WALLET_ID: 'wallet_id',
    TRANSACTION_ID: 'transaction_id',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(WALLETS_TRANSACTIONS_TABLE, (table) => {
        table
            .uuid(WalletsTransactionsColumnName.ID)
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table
            .uuid(WalletsTransactionsColumnName.WALLET_ID)
            .notNullable()
            .references('id')
            .inTable('wallets')
            .onDelete('CASCADE');
        table
            .uuid(WalletsTransactionsColumnName.TRANSACTION_ID)
            .notNullable()
            .references('id')
            .inTable('transactions')
            .onDelete('CASCADE');
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(WALLETS_TRANSACTIONS_TABLE);
}

export { down, up };
