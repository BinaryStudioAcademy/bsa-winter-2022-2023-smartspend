import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { BudgetsApiPath } from './enums/enums.js';
import { type BudgetGetAllResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class BudgetsApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.BUDGETS, baseUrl, http, storage });
    }

    public async getAll(): Promise<BudgetGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(BudgetsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<BudgetGetAllResponseDto>();
    }
}

export { BudgetsApi };
