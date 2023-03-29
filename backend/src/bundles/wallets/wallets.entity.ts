import { type IEntity } from '~/common/interfaces/interfaces.js';

class WalletEntity implements IEntity {
    private 'id': string | null;

    private 'name': string;

    private 'currencyId': string;

    private 'balance': number;

    private 'ownerId': string | null;

    private constructor({
        id,
        name,
        currencyId,
        balance,
        ownerId,
    }: {
        id: string | null;
        name: string;
        currencyId: string;
        balance: number;
        ownerId: string;
    }) {
        this.id = id;
        this.name = name;
        this.currencyId = currencyId;
        this.balance = balance;
        this.ownerId = ownerId;
    }

    public static initialize({
        id,
        name,
        currencyId,
        balance,
        ownerId,
    }: {
        id: string;
        name: string;
        currencyId: string;
        balance: number;
        ownerId: string;
    }): WalletEntity {
        return new WalletEntity({
            id,
            name,
            currencyId,
            balance,
            ownerId,
        });
    }

    public static initializeNew({
        name,
        currencyId,
        balance,
        ownerId,
    }: {
        name: string;
        currencyId: string;
        balance: number;
        ownerId: string;
    }): WalletEntity {
        return new WalletEntity({
            id: null,
            name,
            currencyId,
            balance,
            ownerId,
        });
    }

    public toObject(): {
        id: string;
        name: string;
        currencyId: string;
        balance: number;
        ownerId: string;
    } {
        return {
            id: this.id as string,
            name: this.name,
            currencyId: this.currencyId,
            balance: this.balance,
            ownerId: this.ownerId as string,
        };
    }

    public toNewObject(): {
        name: string;
        currencyId: string;
        balance: number;
        ownerId: string;
    } {
        return {
            name: this.name,
            currencyId: this.currencyId,
            balance: this.balance,
            ownerId: this.ownerId as string,
        };
    }
}

export { WalletEntity };
