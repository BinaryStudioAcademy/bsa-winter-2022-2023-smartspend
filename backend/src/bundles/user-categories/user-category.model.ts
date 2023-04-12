import { type QueryBuilder, type RelationMappings, Model } from 'objection';

import { DatabaseTableName } from '~/common/database/database.js';

import { CategoryModel } from '../categories/category.model.js';

class UserCategoriesModel extends Model {
    public 'id': string;

    public 'userId': string;

    public 'categoryId': string;

    public 'category': CategoryModel;

    public static get tableName(): string {
        return DatabaseTableName.USERS_CATEGORIES;
    }
    public static override relationMappings = (): RelationMappings => ({
        category: {
            relation: Model.HasOneRelation,
            modelClass: CategoryModel,
            join: {
                from: 'users_categories.categoryId',
                to: 'categories.id',
            },
        },
    });

    public static selectCategory(builder: QueryBuilder<CategoryModel>): void {
        void builder.select('category');
    }
}

export { UserCategoriesModel };
