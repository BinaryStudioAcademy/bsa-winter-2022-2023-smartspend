import { type Knex } from 'knex';

const CATEGORIES_TABLE = 'categories';

async function seed(knex: Knex): Promise<void> {
    await knex(CATEGORIES_TABLE).del();

    await knex(CATEGORIES_TABLE).insert([
        {
            icon: 'burger',
            color: 'red',
            name: 'Food & Drink',
            type: 'expense',
        },
        { icon: 'money-bill', color: 'green', name: 'Salary', type: 'income' },
        { icon: 'car', color: 'blue', name: 'Car', type: 'expense' },
        { icon: 'plane', color: 'pink', name: 'Travel', type: 'expense' },
        { icon: 'gifts', color: 'green', name: 'Gifts', type: 'income' },
        { icon: 'gifts', color: 'red', name: 'Gifts', type: 'expense' },
        {
            icon: 'money-bills',
            color: 'red',
            name: 'Bills & Fees',
            type: 'expense',
        },
    ]);
}

export { seed };
