import { type TransactionIdsRequestDto } from 'shared/build/index.js';
import { ApiPath } from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.js';
import { getUserIdFromToken } from '~/common/helpers/get-id-from-token.helper.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import {
    TransactionsApiPath,
    TransactionValidationMessage,
} from './enums/enums.js';
import { type TransactionService } from './transactions.js';
import {
    type DeleteRequestTokenDto,
    type TokenRequestTransactionDto,
} from './types/types.js';
import { createTransactionValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Transaction:
 *        type: object
 *        required:
 *          - category
 *          - date
 *          - note
 *          - labelId
 *          - amount
 *          - currency
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
 *          category:
 *            type: string
 *            format: text
 *          date:
 *            type: date
 *            format: text
 *            example: 03/03/2023
 *          note:
 *            type: string
 *            format: text
 *            example: Transaction Note
 *          labelId:
 *            type: string
 *            format: uuid
 *            example: Food
 *          amount:
 *            type: number
 *            format: text
 *            example: 1000
 *          currency:
 *            type: string
 *            format: uuid
 *            example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
 *      Transaction:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Transaction'
 *
 */

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
                return this.create(options as TokenRequestTransactionDto);
            },
        });

        this.addRoute({
            path: TransactionsApiPath.ID,
            method: 'PUT',
            handler: (options) => {
                return this.update(options as TokenRequestTransactionDto);
            },
        });

        this.addRoute({
            path: TransactionsApiPath.ID,
            method: 'DELETE',
            handler: (options) => this.delete(options as DeleteRequestTokenDto),
        });

        this.addRoute({
            path: TransactionsApiPath.MANY,
            method: 'DELETE',
            handler: (options) =>
                this.deleteMany(
                    options as ApiHandlerOptions<{
                        token: string;
                        body: TransactionIdsRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /transactions:
     *    get:
     *      tags: [Transactions]
     *      description: Returns an array of Transactions
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation with an array of transaction
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Transactions'
     */

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

    /**
     * @swagger
     * /transactions:
     *   post:
     *     tags: [Transactions]
     *     description: Create transaction
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               categoryId:
     *                 type: string
     *                 format: text
     *                 example: 208da023-e7a9-4695-a40c-ba2580776878
     *               date:
     *                 type: date
     *                 format: text
     *                 example: 03/03/2023
     *               note:
     *                 type: string
     *                 format: text
     *                 example: transaction note
     *               labelId:
     *                 type: string
     *                 format: uuid
     *                 example: 059dc814-89cc-4ba1-89da-b20c5bf78231
     *               amount:
     *                 type: float
     *                 format: text
     *                 example: 1000
     *               currencyId:
     *                 type: string
     *                 format: uuid
     *                 example: 053689b5-b84d-49b6-93ba-51e2cfc64edd
     *               walletsId:
     *                 type: string
     *                 format: uuid
     *                 example: 060689b5-b84d-49b6-93ba-51e2cfc64edd
     *     responses:
     *       201:
     *         description: Successful transaction creation operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Transaction'
     */

    private async create(
        request: TokenRequestTransactionDto,
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

    /**
     * @swagger
     * /transactions/:
     *   put:
     *     tags: [Transactions]
     *     summary: Update a transaction
     *     description: Update a transaction's category, date, note, amount, labelId.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the transaction to update.
     *         required: true
     *         schema:
     *           type: string
     *         example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               category:
     *                 type: string
     *                 format: text
     *                 description: name of category
     *               date:
     *                 type: date
     *                 format: text
     *                 description: same date
     *               note:
     *                 type: string
     *                 format: text
     *                 description: Note for transaction
     *               label:
     *                 type: string
     *                 format: uuid
     *                 description: label id
     *               amount:
     *                 type: float
     *                 format: text
     *                 description: count
     *
     *     responses:
     *       '200':
     *         description: Transaction updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Transaction'
     */

    private async update(
        request: TokenRequestTransactionDto,
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

    /**
     * @swagger
     * /transactions:
     *    delete:
     *      tags: [Transactions]
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Transaction ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      security:
     *         - bearerAuth: []
     *      description: Delete transaction
     *      responses:
     *        200:
     *          description: Successful delete transaction operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Transaction'
     */

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

    private async deleteMany(
        options: ApiHandlerOptions<{
            body: TransactionIdsRequestDto;
            token: string;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.OK,
            payload: await this.transactionService.deleteAll(
                userId,
                options.body.ids,
            ),
        };
    }
}

export { TransactionController };
