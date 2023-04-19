import { type Knex } from 'knex';

const TABLE_NAME = 'transactions';

const ColumnName = {
    WALLETS_ID: 'walletsId',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.WALLETS_ID)
            .references('wallets.id')
            .onDelete('CASCADE');
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}

export { down, up };
