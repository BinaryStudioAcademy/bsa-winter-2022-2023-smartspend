import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { HttpApi } from '~/framework/api/api';
import { type IHttp } from '~/framework/http/http';
import { type IStorage } from '~/framework/storage/storage';

import { TransactionsApiPath } from './enums/enums';
import {
    type DeleteRequestTokenDto,
    type TransactionCreateRequestDto,
    type TransactionUpdatePayloadDto,
} from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class TransactionApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.TRANSACTIONS, baseUrl, http, storage });
    }

    public async createTransaction(
        payload: TransactionCreateRequestDto,
    ): Promise<void> {
        await this.load(this.getFullEndpoint(TransactionsApiPath.ROOT, {}), {
            method: 'POST',
            contentType: ContentType.JSON,
            payload: JSON.stringify(payload),
            hasAuth: true,
        });
    }

    public async updateTransaction(
        payload: TransactionUpdatePayloadDto,
    ): Promise<void> {
        await this.load(this.getFullEndpoint(TransactionsApiPath.ID, {}), {
            method: 'PUT',
            contentType: ContentType.JSON,
            payload: JSON.stringify(payload),
            hasAuth: true,
        });
    }

    public async deleteTransaction(
        payload: DeleteRequestTokenDto,
    ): Promise<void> {
        await this.load(this.getFullEndpoint(TransactionsApiPath.ID, {}), {
            method: 'DELETE',
            contentType: ContentType.JSON,
            payload: JSON.stringify(payload),
            hasAuth: true,
        });
    }
}

export { TransactionApi };
