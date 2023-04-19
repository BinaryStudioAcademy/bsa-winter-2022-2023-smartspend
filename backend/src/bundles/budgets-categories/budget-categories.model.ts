import { Model } from 'objection';

import { DatabaseTableName } from '~/common/database/enums/database-table-name.enum.js';

class BudgetCategoryModel extends Model {
    public 'id': string;

    public 'budgetId': string;

    public 'categoryId': string;
    public static get tableName(): string {
        return DatabaseTableName.BUDGET_CATEGORIES;
    }
}

export { BudgetCategoryModel };
