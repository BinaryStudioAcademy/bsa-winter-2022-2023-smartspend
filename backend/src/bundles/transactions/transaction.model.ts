import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class TransactionModel extends AbstractModel {
    public 'categoryId': string;

    public 'date': Date;

    public 'note': string;

    public 'labelId': string;

    public 'amount': number;

    public 'currencyId': string;

    public 'ownerId': string;

    public 'walletsId': string;

    public static override get tableName(): string {
        return DatabaseTableName.TRANSACTIONS;
    }
}

export { TransactionModel };
