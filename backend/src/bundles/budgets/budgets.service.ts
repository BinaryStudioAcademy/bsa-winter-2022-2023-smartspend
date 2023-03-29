import { BudgetEntity } from '~/bundles/budgets/budgets.entity.js';
import { type BudgetRepository } from '~/bundles/budgets/budgets.repository.js';

import {
    type BudgetFindRequestDto,
    type BudgetGetAllResponseDto,
    type BudgetResponseDto,
} from './types/types.js';
import { BudgetValidationMessage } from '~/bundles/budgets/enums/enums.js';

class BudgetService {
    private budgetRepository: BudgetRepository;

    public constructor(budgetRepository: BudgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public async find(
        payload: BudgetFindRequestDto,
    ): Promise<BudgetEntity | undefined> {
        return await this.budgetRepository.find(payload.id);
    }

    public async findAllBudget(
        ownerId: string,
    ): Promise<BudgetGetAllResponseDto> {
        const items = await this.budgetRepository.findAllBudget(ownerId);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async createBudget(
        name: string,
        recurrence: string,
        amount: number,
        currency: string,
        userId: string,
    ): Promise<BudgetResponseDto> {
        const date = Date.now();
        const today = new Date(date);
        const budget = await this.budgetRepository.createBudget(
            BudgetEntity.initializeNew({
                name: name,
                amount: amount,
                currency: currency,
                recurrence: recurrence,
                startDate: today,
                ownerId: userId,
            }),
        );
        return budget.toObject();
    }

    public async updateBudget(
        id: string,
        name: string,
        amount: number,
        currency: string,
        recurrence: string,
        ownerId: string,
    ): Promise<BudgetResponseDto | undefined> {
        const updatedBudget = await this.budgetRepository.updateBudget(
            id,
            name,
            amount,
            currency,
            recurrence,
            ownerId,
        );

        if (!updatedBudget) {
            throw new Error(BudgetValidationMessage.BUDGET_NOT_FOUND);
        }

        return updatedBudget.toObject();
    }

    public async deleteBudget(id: string): Promise<BudgetEntity | undefined> {
        const deletedBudget = await this.budgetRepository.deleteBudget(id);

        if (!deletedBudget) {
            throw new Error(BudgetValidationMessage.BUDGET_NOT_FOUND);
        }
        return deletedBudget;
    }
}

export { BudgetService };
