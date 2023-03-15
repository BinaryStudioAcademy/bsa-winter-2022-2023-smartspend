import { type Knex } from 'knex';

const TABLE_NAME = 'transactions_labels';

const ColumnName = {
    ID: 'id',
    LABEL_ID: 'label_id',
    TRANSACTION_ID: 'transaction_id',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table
            .uuid(ColumnName.LABEL_ID)
            .notNullable()
            .references('id')
            .inTable('labels')
            .onDelete('CASCADE');
        table
            .uuid(ColumnName.TRANSACTION_ID)
            .notNullable()
            .references('id')
            .inTable('transactions')
            .onDelete('CASCADE');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
