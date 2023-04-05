import { logger } from '~/common/logger/logger.js';

import { CurrencyModel } from './currency.model.js';
import { CurrencyRepository } from './currency.repository.js';
import { CurrencyService } from './currency.service.js';

const currencyRepository = new CurrencyRepository(CurrencyModel);
const currencyService = new CurrencyService(currencyRepository);
