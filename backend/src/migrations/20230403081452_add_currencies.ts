import { type Knex } from 'knex';

const CURRENCIES_TABLE = 'currencies';

const CurrenciesColumnName = {
    ID: 'id',
    SYMBOL: 'symbol',
    SHORT_NAME: 'short_name',
    FULL_NAME: 'full_name',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.table(CURRENCIES_TABLE, (table) => {
        table.string(CurrenciesColumnName.SYMBOL);
        table.string(CurrenciesColumnName.SHORT_NAME);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(CURRENCIES_TABLE);
}

export { down, up };
