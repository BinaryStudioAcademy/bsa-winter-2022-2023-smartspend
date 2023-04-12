import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserProfileModel } from '../users/user-profile.model.js';

class ImageModel extends AbstractModel {
    public 'path': string;

    public static override get tableName(): string {
        return DatabaseTableName.IMAGES;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            userProfile: {
                relation: Model.HasOneRelation,
                modelClass: UserProfileModel,
                join: {
                    from: 'image.id',
                    to: 'user_profile.imageId',
                },
            },
        };
    }
}

export { ImageModel };
