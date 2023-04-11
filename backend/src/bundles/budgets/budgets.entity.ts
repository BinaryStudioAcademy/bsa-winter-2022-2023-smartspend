import { type IEntity } from '~/common/interfaces/interfaces.js';

class BudgetEntity implements IEntity {
    private 'id': string | null;

    private 'name': string;

    private 'amount': number;

    private 'currency': string;

    private 'recurrence': string;

    private 'startDate': string;
    private 'endDate': string;

    private 'ownerId': string;

    private constructor({
        id,
        name,
        amount,
        currency,
        recurrence,
        startDate,
        endDate,
        ownerId,
    }: {
        id: string | null;
        name: string;
        amount: number;
        currency: string;
        recurrence: string;
        startDate: string;
        endDate: string;
        ownerId: string;
    }) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.currency = currency;
        this.recurrence = recurrence;
        this.startDate = startDate;
        this.endDate = endDate;
        this.ownerId = ownerId;
    }

    public static initialize({
        id,
        name,
        amount,
        currency,
        recurrence,
        startDate,
        endDate,
        ownerId,
    }: {
        id: string;
        name: string;
        amount: number;
        currency: string;
        recurrence: string;
        startDate: string;
        endDate: string;
        ownerId: string;
    }): BudgetEntity {
        return new BudgetEntity({
            id,
            name,
            amount,
            currency,
            recurrence,
            startDate,
            endDate,
            ownerId,
        });
    }

    public static initializeNew({
        name,
        amount,
        currency,
        recurrence,
        startDate,
        endDate,
        ownerId,
    }: {
        name: string;
        amount: number;
        currency: string;
        recurrence: string;
        startDate: string;
        endDate: string;
        ownerId: string;
    }): BudgetEntity {
        return new BudgetEntity({
            id: null,
            name,
            amount,
            currency,
            recurrence,
            startDate,
            endDate,
            ownerId,
        });
    }

    public toObject(): {
        id: string;
        name: string;
        amount: number;
        currency: string;
        recurrence: string;
        startDate: string;
        endDate: string;
        ownerId: string;
    } {
        return {
            id: this.id as string,
            name: this.name,
            amount: this.amount,
            currency: this.currency,
            recurrence: this.recurrence,
            startDate: this.startDate,
            endDate: this.endDate,
            ownerId: this.ownerId,
        };
    }

    public toNewObject(): {
        name: string;
        amount: number;
        currency: string;
        recurrence: string;
        startDate: string;
        endDate: string;
        ownerId: string;
    } {
        return {
            name: this.name,
            amount: this.amount,
            currency: this.currency,
            recurrence: this.recurrence,
            startDate: this.startDate,
            endDate: this.endDate,
            ownerId: this.ownerId,
        };
    }
}

export { BudgetEntity };
