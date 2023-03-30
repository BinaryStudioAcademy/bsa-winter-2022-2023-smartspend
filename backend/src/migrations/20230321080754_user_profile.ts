import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';

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
const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};
function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .primary()
            .defaultTo(knex.raw(uuid))
            .notNullable();
        table
            .uuid(ColumnName.USER_ID)
            .unique()
            .unsigned()
            .references(ColumnName.ID)
            .inTable(FOREIGN_TABLE_NAME)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
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
