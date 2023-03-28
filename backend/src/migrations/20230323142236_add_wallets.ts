import { type Knex } from 'knex';

const WALLETS_TABLE = 'wallets';

const WalletsColumnName = {
    ID: 'id',
    CURRENCY_ID: 'currency_id',
    NAME: 'name',
    BALANCE: 'balance',
    OWNER_ID: 'owner_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.table(WALLETS_TABLE, (table) => {
        table.string(WalletsColumnName.NAME);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(WALLETS_TABLE);
}

export { down, up };
