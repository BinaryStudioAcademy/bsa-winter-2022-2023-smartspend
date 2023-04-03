import { type Knex } from 'knex';

const CURRENCIES_TABLE = 'currencies';

async function seed(knex: Knex): Promise<void> {
    await knex(CURRENCIES_TABLE).del();

    await knex(CURRENCIES_TABLE).insert([
        { symbol: '$', short_name: 'USD', name: 'US Dollar' },
        { symbol: '€', short_name: 'EUR', name: 'Euro' },
        { symbol: '£', short_name: 'GBP', name: 'British Pound' },
        { symbol: '$', short_name: 'AUD', name: 'Australian Dollar' },
        { symbol: '$', short_name: 'CAD', name: 'Canadian Dollar' },
        { symbol: '¥', short_name: 'JPY', name: 'Japanese Yen' },
        { symbol: 'Fr', short_name: 'CHF', name: 'Swiss Franc' },
        { symbol: '¥', short_name: 'CNY', name: 'Chinese Yuan' },
        { symbol: '$', short_name: 'HKD', name: 'Hong Kong Dollar' },
        { symbol: '$', short_name: 'SGD', name: 'Singapore Dollar' },
        { symbol: '₴', short_name: 'UAH', name: 'Ukrainian Hryvnia' },
    ]);
}

export { seed };
