import { type Knex } from 'knex';

const TABLE_NAME = 'transactions';

const ColumnName = {
    ID: 'id',
    CATEGORY_ID: 'category_id',
    DATE: 'date',
    NOTE: 'note',
    LABEL_ID: 'label_id',
    AMOUNT: 'amount',
    CURRENCY_ID: 'currency_id',
    IMAGE: 'image',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary();
        table
            .uuid(ColumnName.CATEGORY_ID)
            .notNullable()
            .references('categories.id')
            .onDelete('CASCADE');
        table.datetime(ColumnName.DATE).notNullable();
        table.text(ColumnName.NOTE);
        table
            .uuid(ColumnName.LABEL_ID)
            .references('labels.id')
            .onDelete('SET NULL');
        table.float(ColumnName.AMOUNT).notNullable();
        table
            .uuid(ColumnName.CURRENCY_ID)
            .notNullable()
            .references('currencies.id')
            .onDelete('CASCADE');
        table.string(ColumnName.IMAGE);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
