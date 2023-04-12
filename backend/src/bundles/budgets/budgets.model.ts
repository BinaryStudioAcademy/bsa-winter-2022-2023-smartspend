import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class BudgetModel extends AbstractModel {
    public 'name': string;

    public 'amount': number;

    public 'currency': string;

    public 'recurrence': string;

    public 'startDate': string;

    public 'endDate': string;

    public 'ownerId': string;

    public static override get tableName(): string {
        return DatabaseTableName.BUDGETS;
    }
}

export { BudgetModel };
