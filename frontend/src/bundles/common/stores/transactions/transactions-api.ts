import {
    type TransactionCreateRequestDto,
    type TransactionGetAllResponseDto,
    type TransactionUpdatePayloadDto,
    TransactionsApiPath,
} from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

type DeleteTransactionResponseDto = {
    id: string;
};

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};
class TransactionsApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.TRANSACTIONS, baseUrl, http, storage });
    }

    public async loadTransactions(): Promise<TransactionGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(TransactionsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<TransactionGetAllResponseDto>();
    }

    public async deleteTransaction(
        id: string,
    ): Promise<DeleteTransactionResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`${TransactionsApiPath.ROOT}${id}`, {}),
            {
                method: 'DELETE',
                contentType: ContentType.TEXT_PLAIN,
                hasAuth: true,
            },
        );
        return response.json<DeleteTransactionResponseDto>();
    }

    public async createTransaction(
        payload: TransactionCreateRequestDto,
    ): Promise<TransactionGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(TransactionsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<TransactionGetAllResponseDto>();
    }

    public async updateTransaction({
        id,
        payload,
    }: {
        id: string;
        payload: TransactionUpdatePayloadDto;
    }): Promise<TransactionUpdatePayloadDto> {
        const response = await this.load(
            this.getFullEndpoint(`${TransactionsApiPath.ROOT}${id}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<TransactionUpdatePayloadDto>();
    }
    public async deleteTransactions(ids: string[]): Promise<void> {
        await this.load(this.getFullEndpoint(TransactionsApiPath.MANY, {}), {
            method: 'DELETE',
            contentType: ContentType.JSON,
            payload: JSON.stringify({ ids }),
            hasAuth: true,
        });
    }
}

export { type DeleteTransactionResponseDto, TransactionsApi };
