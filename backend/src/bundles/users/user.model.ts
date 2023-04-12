import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserCategoriesModel } from '../user-categories/user-category.model.js';
import { UserProfileModel } from './user-profile.model.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string;

    public 'passwordSalt': string;

    public 'userProfile': UserProfileModel;

    public 'userCategories': UserCategoriesModel[];

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }

    public static override relationMappings = (): RelationMappings => ({
        userProfile: {
            relation: Model.HasOneRelation,
            modelClass: UserProfileModel,
            join: {
                from: 'users.id',
                to: 'user_profile.userId',
            },
        },
        userCategories: {
            relation: Model.HasManyRelation,
            modelClass: UserCategoriesModel,
            join: {
                from: 'users.id',
                to: 'users_categories.userId',
            },
        },
    });
}

export { UserModel };
