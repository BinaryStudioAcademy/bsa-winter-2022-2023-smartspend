import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { CurrencyApi } from './currencies-api';

const currencyApi = new CurrencyApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { currencyApi };
