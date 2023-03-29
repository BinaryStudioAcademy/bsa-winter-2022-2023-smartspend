import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { CategoryModel } from '~/bundles/categories/category.model.js';

class BudgetModel extends AbstractModel {
    public 'name': string;

    public 'amount': number;

    public 'currency': string;

    public 'recurrence': string;

    public 'startDate': Date;

    public 'ownerId': string;

    public static override get tableName(): string {
        return DatabaseTableName.BUDGETS;
    }

    public static override relationMappings = (): RelationMappings => {
        return {
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: CategoryModel,
                join: {
                    from: 'budgets.id',
                    through: {
                        from: 'budget_categories.budgetId',
                        to: 'budget_categories.categoryId',
                    },
                    to: 'categories.id',
                },
            },
        };
    };
}

export { BudgetModel };
