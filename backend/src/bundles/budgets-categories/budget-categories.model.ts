import { Model } from 'objection';

class BudgetCategoryModel extends Model {
    public 'id': string;

    public 'budgetId': string;

    public 'categoryId': string;
    public static get tableName(): string {
        return 'budget_categories';
    }
}

export { BudgetCategoryModel };
