import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { WalletsApiPath } from './enums/enums';
import {
    type WalletCreateRequestDto,
    type WalletGetAllItemResponseDto,
    type WalletGetAllResponseDto,
} from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class WalletsApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.WALLETS, baseUrl, http, storage });
    }

    public async getAll(): Promise<WalletGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(WalletsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<WalletGetAllResponseDto>();
    }

    public async createWallet(
        payload: WalletCreateRequestDto,
    ): Promise<WalletGetAllItemResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(WalletsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<WalletGetAllItemResponseDto>();
    }

    // functionality has not been tested

    public async deleteWallet(id: string): Promise<void> {
        await this.load(this.getFullEndpoint(WalletsApiPath.ID, {}), {
            method: 'DELETE',
            contentType: ContentType.JSON,
            payload: id,
            hasAuth: true,
        });
    }

    // functionality has not been tested

    public async updateWallet(
        payload: WalletCreateRequestDto,
    ): Promise<WalletCreateRequestDto> {
        const response = await this.load(
            this.getFullEndpoint(WalletsApiPath.ID, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<WalletCreateRequestDto>();
    }
}

export { WalletsApi };
