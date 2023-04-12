import { Model } from 'objection';

import { DatabaseTableName } from '~/common/database/enums/database-table-name.enum.js';

class WalletsTransactionModel extends Model {
    public 'id': string;

    public 'transactionId': string;

    public 'walletId': string;
    public static get tableName(): string {
        return DatabaseTableName.WALLETS_TRANSACTIONS;
    }
}

export { WalletsTransactionModel };
