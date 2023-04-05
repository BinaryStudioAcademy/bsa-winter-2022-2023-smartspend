import { Model } from 'objection';

import { DatabaseTableName } from '~/common/database/database.js';

class CurrencyModel extends Model {
    public 'id': string;

    public 'name': string;

    public 'symbol': string;

    public 'shortName': string;

    public static override get tableName(): string {
        return DatabaseTableName.CURRENCIES;
    }
}

export { CurrencyModel };
