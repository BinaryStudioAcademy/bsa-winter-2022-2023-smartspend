import { type Knex } from 'knex';

const TABLE_NAME = 'user_profile';

async function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn('avatar_url');
        table
            .uuid('imageId')
            .references('id')
            .inTable('images')
            .onDelete('SET NULL')
            .onUpdate('CASCADE')
            .nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn('imageId');
    });
}

export { down, up };
