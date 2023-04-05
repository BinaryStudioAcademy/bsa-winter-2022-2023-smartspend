import { type IRepository } from '~/common/interfaces/repository.interface.js';

import { CurrencyEntity } from './currency.entity.js';
import { type CurrencyModel } from './currency.model.js';

class CurrencyRepository implements Partial<IRepository> {
    private currencyModel: typeof CurrencyModel;

    public constructor(currencyModel: typeof CurrencyModel) {
        this.currencyModel = currencyModel;
    }

    // public async find(data: object): Promise<CurrencyEntity | undefined> {
    //     const currency = await this.currencyModel.query().select().where(data).first();
    //     if (!currency) {
    //         return undefined;
    //     }
    //     return CurrencyEntity.initialize(currency);
    // }

    public async findAll(): Promise<CurrencyEntity[]> {
        const users = await this.currencyModel.query().execute();

        return users.map((it) => CurrencyEntity.initialize(it));
    }
}

export { CurrencyRepository };
