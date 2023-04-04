import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { BudgetsApiPath } from './enums/enums.js';
import {
    type BudgetCreateRequestDto,
    type BudgetResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class BudgetsApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.BUDGETS, baseUrl, http, storage });
    }

    public async getAll(): Promise<BudgetResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(BudgetsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return response.json<BudgetResponseDto[]>();
    }

    public async createBudget(
        payload: BudgetCreateRequestDto,
    ): Promise<BudgetResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(BudgetsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<BudgetResponseDto>();
    }
}

export { BudgetsApi };
