import { type Knex } from 'knex';

import { Currency } from '~/common/database/enums/migration-currency.enum.js';
import { Recurrence } from '~/common/database/enums/migration-recurrence.enum.js';

const TABLE_NAME = 'budgets';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    AMOUNT: 'amount',
    CURRENCY: 'currency',
    RECURRENCE: 'recurrence',
    START_DATE: 'start_date',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary().notNullable();
        table.string(ColumnName.NAME).notNullable();
        table.float(ColumnName.AMOUNT).notNullable();
        table.enum(ColumnName.CURRENCY, Object.values(Currency)).notNullable();
        table.enum(ColumnName.RECURRENCE, Object.values(Recurrence)).nullable();
        table.dateTime(ColumnName.START_DATE).nullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
