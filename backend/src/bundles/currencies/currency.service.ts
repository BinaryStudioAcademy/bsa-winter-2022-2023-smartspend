import { type CurrencyRepository } from './currency.repository.js';
import { type CurrencyGetAllResponseDto } from './types/types.js';

class CurrencyService {
    private currencyRepository: CurrencyRepository;

    public constructor(currencyRepository: CurrencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    public async findAllCurrency(): Promise<CurrencyGetAllResponseDto> {
        const items = await this.currencyRepository.findAllCurrency();

        return {
            items: items.map((it) => it.toObject()),
        };
    }
}

export { CurrencyService };
