import { type Knex } from 'knex';

const TABLE_NAME = 'images';

const uuid = 'uuid_generate_v4()';

const ColumnName = {
    ID: 'id',
    PATH: 'path',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.ID).primary().defaultTo(knex.raw(uuid));
        table.string(ColumnName.PATH).nullable();
        table.dateTime(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
        table.dateTime(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}

export { down, up };
