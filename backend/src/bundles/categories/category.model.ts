import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class CategoryModel extends AbstractModel {
    public 'icon': string;

    public 'color': string;

    public 'type': string;

    public static override get tableName(): string {
        return DatabaseTableName.CATEGORIES;
    }
}

export { CategoryModel };
