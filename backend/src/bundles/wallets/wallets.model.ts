import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class WalletModel extends AbstractModel {
    public 'name': string;

    public 'currencyId': string;

    public 'balance': number;

    public 'ownerId': string;

    public static override get tableName(): string {
        return DatabaseTableName.WALLETS;
    }

    public static override relationMappings = (): RelationMappings => ({
        userProfile: {
            relation: Model.HasOneRelation,
            modelClass: WalletModel,
            join: {
                from: 'users.id',
                to: 'wallet.ownerId',
            },
        },
    });
}

export { WalletModel };
