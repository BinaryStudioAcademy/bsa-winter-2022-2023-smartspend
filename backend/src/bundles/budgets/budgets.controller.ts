import { type BudgetService } from '~/bundles/budgets/budgets.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { getUserIdFromToken } from '~/common/helpers/get-id-from-token.helper.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { budgetCategoriesService } from '../budgets-categories/budgets-categories.js';
import { BudgetsApiPath, BudgetValidationMessage } from './enums/enums.js';
import {
    type BudgetFindRequestDto,
    type BudgetGetAllCategoriesResponseDto,
    type TokenDeleteRequestDto,
    type TokenRequestDto,
} from './types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Budget:
 *        type: object
 *        required:
 *          - name
 *          - amount
 *          - currency
 *          - recurrence
 *          - categories
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
 *          name:
 *            type: string
 *            format: text
 *          amount:
 *            type: number
 *            format: text
 *          currency:
 *            type: string
 *            format: text
 *            example: USD
 *          recurrence:
 *            type: string
 *            format: text
 *            example: WEEKLY
 *          categoriesId:
 *            type: array
 *            format: string
 *            example: ["4b7908cc-5581-4d74-8910-7f2bba8cb49b"]
 *      Budgets:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Budget'
 *
 */

class BudgetController extends Controller {
    private budgetService: BudgetService;

    public constructor(logger: ILogger, budgetService: BudgetService) {
        super(logger, ApiPath.BUDGETS);

        this.budgetService = budgetService;

        this.addRoute({
            path: BudgetsApiPath.ROOT,
            method: 'POST',
            handler: (options) => {
                return this.create(options as TokenRequestDto);
            },
        });

        this.addRoute({
            path: BudgetsApiPath.ROOT,
            method: 'GET',
            handler: (options) => this.findAll(options.token as string),
        });
        this.addRoute({
            path: BudgetsApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        params: BudgetFindRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: BudgetsApiPath.ID,
            method: 'PUT',
            handler: (options) => {
                return this.update(options as TokenRequestDto);
            },
        });
        this.addRoute({
            path: BudgetsApiPath.ID,
            method: 'DELETE',
            handler: (options) => {
                return this.delete(options as TokenDeleteRequestDto);
            },
        });
    }

    /**
     * @swagger
     * /budgets:
     *    get:
     *      tags: [Budgets]
     *      description: Returns an array of Budgets
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation with an array of Budgets
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Budgets'
     */

    private async findAll(token: string): Promise<ApiHandlerResponse> {
        if (!token) {
            throw new Error(BudgetValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(token);
        const budgets = await this.budgetService.findAllBudget(userId);

        const response: BudgetGetAllCategoriesResponseDto[] = [];

        for (const item of budgets.items) {
            const category =
                await budgetCategoriesService.findAllBudgetCategory(item.id);
            const categoriesId: string[] = [];
            for (const item of category.items) {
                categoriesId.push(item.categoryId);
            }
            response.push({ ...item, categoriesId });
        }
        return {
            status: HttpCode.OK,
            payload: response,
        };
    }

    /**
     * @swagger
     * /budgets/{id}:
     *    get:
     *      tags: [Budgets]
     *      description: Returns one budget by id
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Budget ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      responses:
     *        200:
     *          description: Successful operation of getting Budget by id
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Budget'
     */

    private async find(
        options: ApiHandlerOptions<{
            params: BudgetFindRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const budget = await this.budgetService.find(options.params);
        if (!budget) {
            throw new Error(BudgetValidationMessage.BUDGET_NOT_FOUND);
        }
        const category = await budgetCategoriesService.findAllBudgetCategory(
            budget.toObject().id,
        );
        const categoriesId: string[] = [];
        for (const item of category.items) {
            categoriesId.push(item.categoryId);
        }
        return {
            status: HttpCode.OK,
            payload: { ...budget, categoriesId },
        };
    }

    /**
     * @swagger
     * /budgets:
     *   post:
     *     tags: [Budgets]
     *     description: Create budget
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
     *               amount:
     *                 type: number
     *                 format: float
     *                 example: 23
     *               currency:
     *                 type: string
     *                 format: text
     *                 example: USD
     *               recurrence:
     *                 type: string
     *                 format: text
     *                 example: WEEKLY
     *               categories:
     *                  type: array
     *                  format: string
     *                  example: ["4b7908cc-5581-4d74-8910-7f2bba8cb49b"]
     *     responses:
     *       201:
     *         description: Successful budget creation operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Budget'
     */

    private async create(
        request: TokenRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(BudgetValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);
        const budget = await this.budgetService.createBudget(
            request.body.name,
            request.body.recurrence,
            request.body.amount,
            request.body.currency,
            userId,
        );
        const categories = await budgetCategoriesService.createBudgetCategory(
            request.body.categories,
            budget.id,
        );
        const categoriesId: string[] = [];
        for (const item of categories) {
            categoriesId.push(item.categoryId);
        }
        return {
            status: HttpCode.OK,
            payload: { ...budget, categoriesId },
        };
    }

    /**
     * @swagger
     * /budget/{id}:
     *   put:
     *     tags: [Budgets]
     *     summary: Update a budget
     *     description: Update a budget's name, currency, amount, recurrence and categories
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the budget to update.
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
     *                 format: text
     *               amount:
     *                 type: number
     *                 format: float
     *                 example: 23
     *               currency:
     *                 type: string
     *                 format: text
     *                 example: USD
     *               recurrence:
     *                 type: string
     *                 format: text
     *                 example: WEEKLY
     *               categories:
     *                  type: array
     *                  format: string
     *                  example: ["4b7908cc-5581-4d74-8910-7f2bba8cb49b"]
     *     responses:
     *       '200':
     *         description: Budget updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Budget'
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     * components:
     *   schemas:
     *     Budget:
     *       type: object
     *       properties:
     *         id:
     *            type: string
     *            format: uuid
     *          name:
     *            type: string
     *            format: text
     *          amount:
     *            type: number
     *            format: text
     *          currency:
     *            type: string
     *            format: text
     *          recurrence:
     *            type: string
     *            format: text
     *          categoriesId:
     *            type: array
     *            format: string
     */

    private async update(
        request: TokenRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(BudgetValidationMessage.TOKEN_REQUIRE);
        }
        const userId = getUserIdFromToken(request.token);
        const updatedBudget = await this.budgetService.updateBudget(
            request.params.id,
            request.body.name,
            request.body.amount,
            request.body.currency,
            request.body.recurrence,
            userId,
        );
        if (!updatedBudget) {
            throw new Error(BudgetValidationMessage.BUDGET_NOT_FOUND);
        }
        await budgetCategoriesService.deleteBudgetCategory(request.params.id);
        const categories = await budgetCategoriesService.createBudgetCategory(
            request.body.categories,
            request.params.id,
        );
        const categoriesId: string[] = [];
        for (const item of categories) {
            categoriesId.push(item.categoryId);
        }
        return {
            status: HttpCode.OK,
            payload: { ...updatedBudget, categoriesId },
        };
    }

    /**
     * @swagger
     * /budgets/{id}:
     *    delete:
     *      tags: [Budgets]
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Budget ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      security:
     *         - bearerAuth: []
     *      description: Delete budget
     *      responses:
     *        200:
     *          description: Successful delete budget operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Budget'
     */

    private async delete(
        request: TokenDeleteRequestDto,
    ): Promise<ApiHandlerResponse> {
        if (!request.token) {
            throw new Error(BudgetValidationMessage.TOKEN_REQUIRE);
        }
        await budgetCategoriesService.deleteBudgetCategory(request.params.id);
        return {
            status: HttpCode.OK,
            payload: await this.budgetService.deleteBudget(request.params.id),
        };
    }
}

export { BudgetController };
