import { Model } from 'objection';
import { type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class TransactionModel extends AbstractModel {
    public 'categoryId': string;

    public 'date': Date;

    public 'note': string;

    public 'label': string;

    public 'amount': number;

    public 'currencyId': string;

    public static override get tableName(): string {
        return DatabaseTableName.TRANSACTIONS;
    }
    public static override relationMappings = (): RelationMappings => ({
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'CategoryModel',
            join: {
                from: 'transactions.categoryId',
                to: 'categories.id',
            },
        },
        currency: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'CurrencyModel',
            join: {
                from: 'transactions.currencyId',
                to: 'currencies.id',
            },
        },
    });
}

export { TransactionModel };
