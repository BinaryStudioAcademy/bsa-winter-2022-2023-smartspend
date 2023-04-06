import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { HttpApi } from '~/framework/api/api';
import { type IHttp } from '~/framework/http/http';
import { type IStorage } from '~/framework/storage/storage';

import { CurrencyApiPath } from './enums/enums';
import { type CurrencyGetAllResponseDto } from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class CurrencyApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CURRENCIES, baseUrl, http, storage });
    }

    public async getAll(): Promise<CurrencyGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(CurrencyApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<CurrencyGetAllResponseDto>();
    }
}

export { CurrencyApi };
