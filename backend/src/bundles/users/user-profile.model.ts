import { type RelationMappings, Model } from 'objection';
import { type Gender } from 'shared/build';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ImageModel } from '../images/images.model.js';
import { UserModel } from './user.model.js';

class UserProfileModel extends AbstractModel {
    public 'userId': string;

    public 'firstName': string;

    public 'lastName': string;

    public 'sex': Gender;

    public 'dateOfBirth': string;

    public 'language': string;

    public 'currency': string;

    public 'imageId': string;

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
            image: {
                relation: Model.HasOneRelation,
                modelClass: ImageModel,
                join: {
                    from: 'user_profile.imageId',
                    to: 'image.id',
                },
            },
        };
    }
}

export { UserProfileModel };
