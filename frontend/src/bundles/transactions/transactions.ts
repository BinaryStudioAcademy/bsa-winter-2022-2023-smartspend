import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { TransactionApi } from './transactions-api';

const transactionApi = new TransactionApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { transactionApi };
