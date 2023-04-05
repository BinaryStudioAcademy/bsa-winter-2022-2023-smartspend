import { type IService } from '~/common/interfaces/service.interface.js';

// import { type CurrencyEntity } from './currency.entity.js';
import { type CurrencyRepository } from './currency.repository.js';
import { type CurrencyGetAllResponseDto } from './types/types.js';

class CurrencyService implements Partial<IService> {
    private currencyRepository: CurrencyRepository;

    public constructor(currencyRepository: CurrencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    // private async find(payload: object): Promise<CurrencyEntity | undefined> {
    //     return await this.currencyRepository.find(payload);
    // }

    public async findAll(): Promise<CurrencyGetAllResponseDto> {
        const items = await this.currencyRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }
}

export { CurrencyService };
