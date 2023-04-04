/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for transactions
 */

import { ApiPath } from 'shared/build';

import {
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { getUserIdFromToken } from '~/common/helpers/get-id-from-token.helper.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger';

import {
    TransactionsApiPath,
    TransactionValidationMessage,
} from './enums/enums';
import { type TransactionService } from './transactions';
import {
    type DeleteRequestTokenDto,
    type TokenRequestDto,
} from './types/types';
import { createTransactionValidationSchema } from './validation-schemas/validation-schemas';

class TransactionController extends Controller {
    private transactionService: TransactionService;

    public constructor(
        logger: ILogger,
        transactionService: TransactionService,
    ) {
        super(logger, ApiPath.TRANSACTIONS);

        this.transactionService = transactionService;

        this.addRoute({
            path: TransactionsApiPath.ROOT,
            method: 'GET',
            handler: (options) => this.findAll(options.token as string),
        });

        this.addRoute({
            path: TransactionsApiPath.ROOT,
            method: 'POST',
            validation: {
                body: createTransactionValidationSchema,
            },
            handler: (options) => {
                return this.create(options as TokenRequestDto);
            },
        });

        this.addRoute({
            path: TransactionsApiPath.ROOT,
            method: 'PUT',
            handler: (options) => {
                return this.update(options as TokenRequestDto);
            },
        });

        this.addRoute({
            path: TransactionsApiPath.ROOT,
            method: 'DELETE',
            handler: (options) => this.delete(options as DeleteRequestTokenDto),
        });
    }

    private async findAll(token: string): Promise<ApiHandlerResponse> {
        if (!token) {
            throw new Error(TransactionValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(token);
        return {
            status: HttpCode.OK,
            payload: await this.transactionService.findAll(userId),
        };
    }

    private async create(
        request: TokenRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(TransactionValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);
        const newTransaction = await this.transactionService.create(
            request.body,
            userId,
        );
        return {
            status: HttpCode.CREATED,
            payload: newTransaction,
        };
    }

    private async update(
        request: TokenRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(TransactionValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);
        const updatedTransaction = await this.transactionService.update(
            request.params.id,
            request.body,
            userId,
        );
        return {
            status: HttpCode.CREATED,
            payload: updatedTransaction,
        };
    }

    private async delete(
        request: DeleteRequestTokenDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(TransactionValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);

        const deletedTransaction = await this.transactionService.delete(
            request.params.id,
            userId,
        );
        return {
            status: HttpCode.OK,
            payload: deletedTransaction,
        };
    }
}

export { TransactionController };
