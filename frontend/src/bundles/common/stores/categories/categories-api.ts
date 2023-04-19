import {
    type CategoryGetAllItemResponseDto,
    type CategoryGetAllResponseDto,
    type CategoryRequestDto,
    type CategoryUpdatePayloadDto,
} from 'shared/build/index.js';
import { CategoriesApiPath } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};
class CategoriesApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_CATEGORIES, baseUrl, http, storage });
    }

    public async loadCategories(): Promise<CategoryGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(CategoriesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<CategoryGetAllResponseDto>();
    }

    public async createCategory(
        payload: CategoryRequestDto,
    ): Promise<CategoryGetAllItemResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(CategoriesApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<CategoryGetAllItemResponseDto>();
    }

    public async updateCategory({
        id,
        payload,
    }: {
        id: string;
        payload: CategoryUpdatePayloadDto;
    }): Promise<CategoryUpdatePayloadDto> {
        const response = await this.load(
            this.getFullEndpoint(`${CategoriesApiPath.ROOT}/${id}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<CategoryGetAllItemResponseDto>();
    }

    public async deleteCategory(id: string): Promise<void> {
        await this.load(
            this.getFullEndpoint(`${CategoriesApiPath.ROOT}/${id}`, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                payload: JSON.stringify(id),
                hasAuth: true,
            },
        );
    }

    public async deleteCategories(categoryIds: string[]): Promise<void> {
        await this.load(this.getFullEndpoint(CategoriesApiPath.MANY, {}), {
            method: 'DELETE',
            contentType: ContentType.JSON,
            payload: JSON.stringify({ categoryIds }),
            hasAuth: true,
        });
    }
}

export { CategoriesApi };
