import { type IEntity } from '~/common/interfaces/entity.interface.js';

class TransactionEntity implements IEntity {
    private 'id': string | null;

    private 'categoryId': string;

    private 'date': Date;

    private 'note'?: string;

    private 'labelId'?: string;

    private 'amount': number;

    private 'currencyId'?: string;

    private 'ownerId': string;

    private 'walletsId': string;

    private constructor({
        id,
        categoryId,
        date,
        note,
        labelId,
        amount,
        currencyId,
        ownerId,
        walletsId,
    }: {
        id: string | null;
        categoryId: string;
        date: Date;
        note?: string;
        labelId?: string;
        amount: number;
        currencyId?: string;
        ownerId: string;
        walletsId: string;
    }) {
        this.id = id;
        this.categoryId = categoryId;
        this.date = date;
        this.note = note;
        this.labelId = labelId;
        this.amount = amount;
        this.currencyId = currencyId;
        this.ownerId = ownerId;
        this.walletsId = walletsId;
    }

    public static initialize({
        id,
        categoryId,
        date,
        note,
        labelId,
        amount,
        currencyId,
        ownerId,
        walletsId,
    }: {
        id: string | null;
        categoryId: string;
        date: Date;
        note?: string;
        labelId?: string;
        amount: number;
        currencyId?: string;
        ownerId: string;
        walletsId: string;
    }): TransactionEntity {
        return new TransactionEntity({
            id,
            categoryId,
            date,
            note,
            labelId,
            amount,
            currencyId,
            ownerId,
            walletsId,
        });
    }

    public static initializeNew({
        categoryId,
        date,
        note,
        labelId,
        amount,
        currencyId,
        ownerId,
        walletsId,
    }: {
        categoryId: string;
        date: Date;
        note?: string;
        labelId?: string;
        amount: number;
        currencyId?: string;
        ownerId: string;
        walletsId: string;
    }): TransactionEntity {
        return new TransactionEntity({
            id: null,
            categoryId,
            date,
            note,
            labelId,
            amount,
            currencyId,
            ownerId,
            walletsId,
        });
    }

    public toObject(): {
        id: string;
        categoryId: string;
        date: Date;
        note?: string;
        labelId?: string;
        amount: number;
        currencyId?: string;
        ownerId: string;
        walletsId: string;
    } {
        return {
            id: this.id as string,
            categoryId: this.categoryId,
            date: this.date,
            note: this.note,
            labelId: this.labelId,
            amount: this.amount,
            currencyId: this.currencyId,
            ownerId: this.ownerId,
            walletsId: this.walletsId,
        };
    }

    public toNewObject(): {
        categoryId: string;
        date: Date;
        note?: string;
        labelId?: string;
        amount: number;
        currencyId?: string;
        ownerId: string;
        walletsId: string;
    } {
        return {
            categoryId: this.categoryId,
            date: this.date,
            note: this.note,
            labelId: this.labelId,
            amount: this.amount,
            currencyId: this.currencyId,
            ownerId: this.ownerId,
            walletsId: this.walletsId,
        };
    }
}

export { TransactionEntity };
