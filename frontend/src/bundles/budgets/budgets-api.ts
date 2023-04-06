import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { BudgetsApiPath } from './enums/enums.js';
import {
    type BudgetCreateRequestDto,
    type BudgetSliceResponseDto,
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

    public async getAll(): Promise<BudgetSliceResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(BudgetsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return response.json<BudgetSliceResponseDto[]>();
    }

    public async createBudget(
        payload: BudgetCreateRequestDto,
    ): Promise<BudgetSliceResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(BudgetsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<BudgetSliceResponseDto>();
    }

    public async deleteBudget(id: string): Promise<void> {
        await this.load(
            this.getFullEndpoint(`${BudgetsApiPath.ROOT}${id}`, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                payload: JSON.stringify({ id }),
                hasAuth: true,
            },
        );
    }

    public async updateBudget({
        id,
        payload,
    }: {
        id: string;
        payload: BudgetCreateRequestDto;
    }): Promise<BudgetCreateRequestDto> {
        const response = await this.load(
            this.getFullEndpoint(`${BudgetsApiPath.ROOT}${id}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<BudgetCreateRequestDto>();
    }
}

export { BudgetsApi };
