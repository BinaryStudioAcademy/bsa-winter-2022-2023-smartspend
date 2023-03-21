import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserModel } from './user.model.js';

type Gender = 'male' | 'female';

class UserProfileModel extends AbstractModel {
    public 'userId': number;

    public 'firstName': string;

    public 'lastName': string;

    public 'sex': Gender;

    public 'dateOfBirth': string;

    public 'language': string;

    public 'currency': string;

    public static override get tableName(): string {
        return DatabaseTableName.USER_PROFILE;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'user_profile.userId',
                    to: 'users.id',
                },
            },
        };
    }
}

export { UserProfileModel };
