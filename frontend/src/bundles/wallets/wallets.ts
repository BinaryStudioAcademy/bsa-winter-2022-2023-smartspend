import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { WalletsApi } from './wallets-api';

const walletsApi = new WalletsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { walletsApi };
export {
    type WalletCreateRequestDto,
    type WalletGetAllItemResponseDto,
    type WalletGetAllResponseDto,
} from './types/types.js';
