import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { CategoriesApi } from './categories-api.js';

const categoriesApi = new CategoriesApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { categoriesApi };
export {
    type CategoryGetAllItemResponseDto,
    type CategoryIdRequestDto,
    type CategoryRequestDto,
    type CategoryUpdatePayloadDto,
} from './types/types.js';
