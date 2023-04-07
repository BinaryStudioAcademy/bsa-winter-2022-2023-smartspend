import { type Knex } from 'knex';

const TABLE_NAME = 'user_profile';

const ColumnName = {
    AVATAR_URL: 'avatarUrl',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.AVATAR_URL).nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}

export { down, up };
