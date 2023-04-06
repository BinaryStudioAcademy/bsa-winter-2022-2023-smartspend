import { type IEntity } from '~/common/interfaces/interfaces.js';

class CurrencyEntity implements IEntity {
    private 'id': string | null;

    private 'name': string;

    private 'symbol': string;

    private 'shortName': string;

    private constructor({
        id,
        name,
        symbol,
        shortName,
    }: {
        id: string | null;
        name: string;
        symbol: string;
        shortName: string;
    }) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.shortName = shortName;
    }

    public static initialize({
        name,
        symbol,
        shortName,
    }: {
        name: string;
        symbol: string;
        shortName: string;
    }): CurrencyEntity {
        return new CurrencyEntity({
            id: null,
            name,
            symbol,
            shortName,
        });
    }

    public static initializeNew({
        id,
        name,
        symbol,
        shortName,
    }: {
        id: string;
        name: string;
        symbol: string;
        shortName: string;
    }): CurrencyEntity {
        return new CurrencyEntity({
            id,
            name,
            symbol,
            shortName,
        });
    }

    public toObject(): {
        id: string;
        name: string;
        symbol: string;
        shortName: string;
    } {
        return {
            id: this.id as string,
            name: this.name,
            symbol: this.symbol,
            shortName: this.shortName,
        };
    }

    public toNewObject(): {
        name: string;
        symbol: string;
        shortName: string;
    } {
        return {
            name: this.name,
            symbol: this.symbol,
            shortName: this.shortName,
        };
    }
}

export { CurrencyEntity };
