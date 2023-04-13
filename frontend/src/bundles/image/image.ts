import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { ImageApi } from './image-api';

const imageApi = new ImageApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { imageApi };
