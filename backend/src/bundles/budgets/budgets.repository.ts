import { BudgetEntity } from '~/bundles/budgets/budgets.entity.js';
import { type BudgetModel } from '~/bundles/budgets/budgets.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import { type BudgetCreateRequestDto } from './types/types.js';

class BudgetRepository implements Partial<IRepository> {
    private budgetModel: typeof BudgetModel;

    public constructor(budgetModel: typeof BudgetModel) {
        this.budgetModel = budgetModel;
    }

    public async find(id: string): Promise<BudgetEntity | undefined> {
        const budget = await this.budgetModel
            .query()
            .select()
            .where({ id })
            .first();
        if (!budget) {
            return undefined;
        }
        return BudgetEntity.initialize(budget);
    }

    public async findAllBudget(ownerId: string): Promise<BudgetEntity[]> {
        const budgets = await this.budgetModel
            .query()
            .select('*')
            .where({ ownerId })
            .execute();

        return budgets.map((it) => BudgetEntity.initialize(it));
    }

    public async createBudget(entity: BudgetEntity): Promise<BudgetEntity> {
        const { name, amount, currency, recurrence, startDate, ownerId } =
            entity.toNewObject();

        const item = await this.budgetModel
            .query()
            .insert({
                name,
                amount,
                currency,
                recurrence,
                startDate,
                ownerId,
            })
            .returning('*')
            .execute();
        return BudgetEntity.initialize(item);
    }

    public async updateBudget(
        id: string,
        name: string,
        amount: number,
        currency: string,
        recurrence: string,
        ownerId: string,
    ): Promise<BudgetEntity | undefined> {
        const item = await this.budgetModel
            .query()
            .where({ id })
            .where({ ownerId })
            .update({ name, amount, currency, recurrence })
            .returning('*')
            .execute();
        return BudgetEntity.initialize(item[0]);
    }

    public async deleteBudget(id: string): Promise<BudgetEntity | undefined> {
        const item = await this.budgetModel
            .query()
            .where({ id })
            .del()
            .returning('id')
            .execute();
        return BudgetEntity.initialize(item[0]);
    }
}

export { BudgetRepository };
