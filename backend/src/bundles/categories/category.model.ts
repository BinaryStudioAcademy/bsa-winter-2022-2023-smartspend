import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type CategoryType } from './categories';

class CategoryModel extends AbstractModel {
    public 'name': string;

    public 'icon': string;

    public 'color': string;

    public 'type': CategoryType;

    public static override get tableName(): string {
        return DatabaseTableName.CATEGORIES;
    }
}

export { CategoryModel };
