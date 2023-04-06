import { CurrencyEntity } from './currency.entity.js';
import { type CurrencyModel } from './currency.model.js';

class CurrencyRepository {
    private currencyModel: typeof CurrencyModel;

    public constructor(currencyModel: typeof CurrencyModel) {
        this.currencyModel = currencyModel;
    }

    public async findAllCurrency(): Promise<CurrencyEntity[]> {
        const currencies = await this.currencyModel
            .query()
            .select('*')
            .execute();

        return currencies.map((it) => CurrencyEntity.initializeNew(it));
    }
}

export { CurrencyRepository };
