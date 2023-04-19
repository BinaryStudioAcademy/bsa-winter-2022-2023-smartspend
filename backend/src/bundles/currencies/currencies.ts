import { logger } from '~/common/logger/logger.js';

import { CurrencyController } from './currency.controller.js';
import { CurrencyModel } from './currency.model.js';
import { CurrencyRepository } from './currency.repository.js';
import { CurrencyService } from './currency.service.js';

const currencyRepository = new CurrencyRepository(CurrencyModel);
const currencyService = new CurrencyService(currencyRepository);
const currencyController = new CurrencyController(logger, currencyService);

export { currencyController, currencyService };
export { CurrencyModel } from './currency.model.js';
export {
    type CurrencyGetAllItemResponseDto,
    type CurrencyGetAllResponseDto,
} from './types/types.js';
