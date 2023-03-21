import { type Knex } from 'knex';

enum Gender {
    Male = 'male',
    Female = 'female',
}

const TABLE_NAME = 'user_profile';
const FOREIGN_TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    USER_ID: 'userId',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    SEX: 'sex',
    DATE_OF_BIRTH: 'dateOfBirth',
    LANGUAGE: 'language',
    CURRENCY: 'currency',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
};
function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .uuid(ColumnName.USER_ID)
            .unsigned()
            .references(ColumnName.ID)
            .inTable(FOREIGN_TABLE_NAME);
        table.string(ColumnName.FIRST_NAME).nullable();
        table.string(ColumnName.LAST_NAME).nullable();
        table.string(ColumnName.LANGUAGE).nullable();
        table.enum(ColumnName.SEX, Object.values(Gender)).nullable();
        table.date(ColumnName.DATE_OF_BIRTH).nullable();
        table.string(ColumnName.CURRENCY).nullable();
        table.dateTime(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
        table.dateTime(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}

export { down, up };
