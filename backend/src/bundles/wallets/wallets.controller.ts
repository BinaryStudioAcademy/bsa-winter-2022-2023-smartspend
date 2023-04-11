import { createWallet } from '~/bundles/wallets/validation-schemas/validation-schemas.js';
import { type WalletService } from '~/bundles/wallets/wallets.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { getUserIdFromToken } from '~/common/helpers/get-id-from-token.helper.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { transactionService } from '../transactions/transactions.js';
import { WalletsApiPath, WalletValidationMessage } from './enums/enums.js';
import {
    type TokenDeleteRequestDto,
    type TokenRequestDto,
    type WalletFindRequestDto,
} from './types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Wallet:
 *        type: object
 *        required:
 *          - name
 *          - currencyId
 *          - balance
 *          - ownerID
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
 *          name:
 *            type: string
 *            format: text
 *          currencyId:
 *            type: number
 *            format: uuid
 *            example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
 *          balance:
 *            type: number
 *            format: float
 *            example: 75000
 *          ownerId:
 *            type: string
 *            format: uuid
 *            example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
 *      Wallets:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Wallet'
 *
 */

class WalletController extends Controller {
    private walletService: WalletService;

    public constructor(logger: ILogger, walletService: WalletService) {
        super(logger, ApiPath.WALLETS);

        this.walletService = walletService;

        this.addRoute({
            path: WalletsApiPath.ROOT,
            method: 'POST',
            validation: {
                body: createWallet,
            },
            handler: (options) => {
                return this.create(options as TokenRequestDto);
            },
        });

        this.addRoute({
            path: WalletsApiPath.ROOT,
            method: 'GET',
            handler: (options) => this.findAll(options.token as string),
        });
        this.addRoute({
            path: WalletsApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        params: WalletFindRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: WalletsApiPath.ID,
            method: 'PUT',
            handler: (options) => {
                return this.update(options as TokenRequestDto);
            },
        });
        this.addRoute({
            path: WalletsApiPath.ID,
            method: 'DELETE',
            handler: (options) => {
                return this.delete(options as TokenDeleteRequestDto);
            },
        });
    }

    /**
     * @swagger
     * /wallets:
     *    get:
     *      tags: [Wallets]
     *      description: Returns an array of Wallets
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation with an array of wallet
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Wallets'
     */
    private async findAll(token: string): Promise<ApiHandlerResponse> {
        if (!token) {
            throw new Error(WalletValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(token);
        const wallets = await this.walletService.findAllWallets(userId);

        const response: unknown[] = [];
        for (const wallet of wallets.items) {
            const transactions = await transactionService.findAll(userId);
            const transactionsIds: string[] = [];
            for (const transaction of transactions.items) {
                if (transaction.walletsId === wallet.id) {
                    transactionsIds.push(transaction.id as string);
                }
            }
            response.push({ ...wallet, transactionsIds });
        }
        return {
            status: HttpCode.OK,
            payload: response,
        };
    }

    /**
     * @swagger
     * /wallets/{id}:
     *    get:
     *      tags: [Wallets]
     *      description: Returns one wallet by id
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Wallet ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      responses:
     *        200:
     *          description: Successful operation of getting wallete by id
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Wallet'
     */

    private async find(
        options: ApiHandlerOptions<{
            params: WalletFindRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const wallet = await this.walletService.find(options.params);
        return {
            status: HttpCode.OK,
            payload: wallet,
        };
    }

    /**
     * @swagger
     * /wallets:
     *   post:
     *     tags: [Wallets]
     *     description: Create wallet
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 format: text
     *               currencyId:
     *                 type: number
     *                 format: uuid
     *                 example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *               balance:
     *                 type: number
     *                 format: float
     *                 example: 75000
     *     responses:
     *       201:
     *         description: Successful wallet creation operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Wallet'
     */

    private async create(
        request: TokenRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(WalletValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);
        const wallet = await this.walletService.createWallet(
            request.body,
            userId,
        );
        return {
            status: HttpCode.OK,
            payload: wallet,
        };
    }

    /**
     * @swagger
     * /wallets/{id}:
     *   put:
     *     tags: [Wallets]
     *     summary: Update a wallet
     *     description: Update a wallet's name, currency ID, and balance.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the wallet to update.
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
     *               name:
     *                 type: string
     *                 description: Name of the wallet.
     *               currencyId:
     *                 type: string
     *                 description: ID of the currency used in the wallet.
     *                 format: uuid
     *               balance:
     *                 type: number
     *                 description: Balance of the wallet.
     *                 format: float
     *     responses:
     *       '200':
     *         description: Wallet updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Wallet'
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     * components:
     *   schemas:
     *     Wallet:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           format: uuid
     *         name:
     *           type: string
     *         currencyId:
     *           type: string
     *           format: uuid
     *         balance:
     *           type: number
     *           format: float
     */

    private async update(
        request: TokenRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(WalletValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);
        const updatedWallet = await this.walletService.updateWallet(
            request.params.id,
            request.body,
            userId,
        );
        return {
            status: HttpCode.OK,
            payload: updatedWallet,
        };
    }

    /**
     * @swagger
     * /wallets/{id}:
     *    delete:
     *      tags: [Wallets]
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Wallet ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      security:
     *         - bearerAuth: []
     *      description: Delete category
     *      responses:
     *        200:
     *          description: Successful delete wallet operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Wallet'
     */

    private async delete(
        request: TokenDeleteRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(WalletValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);
        return {
            status: HttpCode.OK,
            payload: await this.walletService.deleteWallet(
                request.params.id,
                userId,
            ),
        };
    }
}

export { WalletController };
