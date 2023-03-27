import { type Knex } from 'knex';

const WALLETS_TABLE = 'wallets';
const WALLETS_USERS_TABLE = 'wallets_users';
const FOREIGN_TABLE_NAME = 'users';

const uuid = 'uuid_generate_v4()';

const WalletsColumnName = {
    ID: 'id',
    CURRENCY_ID: 'currency_id',
    NAME: 'name',
    BALANCE: 'balance',
    OWNER_ID: 'owner_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const WalletsUsersColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    WALLET_ID: 'wallet_id',
};

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};
function up(knex: Knex): Promise<void> {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .dropTableIfExists(WALLETS_USERS_TABLE)
        .dropTableIfExists(WALLETS_TABLE)
        .createTable(WALLETS_TABLE, (table) => {
            table
                .uuid(WalletsColumnName.ID)
                .primary()
                .defaultTo(knex.raw(uuid))
                .notNullable();
            table
                .uuid(WalletsColumnName.CURRENCY_ID)
                .references('id')
                .inTable('currencies')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable();
            table.string(WalletsColumnName.NAME);
            table.float(WalletsColumnName.BALANCE).notNullable();
            table
                .uuid(WalletsColumnName.OWNER_ID)
                .unsigned()
                .references(WalletsColumnName.ID)
                .inTable(FOREIGN_TABLE_NAME)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
            table
                .dateTime(WalletsColumnName.CREATED_AT)
                .defaultTo(knex.fn.now());
            table
                .dateTime(WalletsColumnName.UPDATED_AT)
                .defaultTo(knex.fn.now());
        })
        .createTable(WALLETS_USERS_TABLE, (table) => {
            table
                .uuid(WalletsUsersColumnName.ID)
                .primary()
                .defaultTo(knex.raw(uuid));
            table
                .uuid(WalletsUsersColumnName.USER_ID)
                .references('id')
                .inTable('users');
            table
                .uuid(WalletsUsersColumnName.WALLET_ID)
                .references('id')
                .inTable('wallets');
        });
}

function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(WALLETS_TABLE)
        .dropTableIfExists(WALLETS_USERS_TABLE);
}

export { down, up };
