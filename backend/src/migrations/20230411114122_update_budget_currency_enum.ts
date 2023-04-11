import { type Knex } from 'knex';

enum newCurrency {
    Usd = 'USD',
    Eur = 'EUR',
    Jpy = 'JPY',
    Gbp = 'GBP',
    Aud = 'AUD',
    Cad = 'CAD',
    Chf = 'CHF',
    Cny = 'CNY',
    Hkd = 'HKD',
    Sgd = 'SGD',
    Uah = 'UAH',
}

const BudgetsColumnName = {
    CURRENCY: 'currency',
};

const BUDGETS_TABLE = 'budgets';

function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(BUDGETS_TABLE, (table) => {
            table.dropColumn(BudgetsColumnName.CURRENCY);
        })
        .table(BUDGETS_TABLE, (table) => {
            table
                .enum(BudgetsColumnName.CURRENCY, Object.values(newCurrency))
                .notNullable()
                .defaultTo(newCurrency.Usd);
        });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(BUDGETS_TABLE);
}

export { down, up };
