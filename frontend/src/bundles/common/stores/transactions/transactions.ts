import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { TransactionsApi } from './transactions-api.js';

const transactionsApi = new TransactionsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { transactionsApi };
