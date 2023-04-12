import {
    type CategoryIdRequestDto,
    type CategoryRequestDto,
    type CategoryUpdatePayloadDto,
    CategoriesApiPath,
    categoryValidationSchema,
} from '~/bundles/categories/categories.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { getUserIdFromToken } from '~/common/helpers/get-id-from-token.helper.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type CategoryService } from './category.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - name
 *          - icon
 *          - color
 *          - type
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
 *          name:
 *            type: string
 *            format: text
 *          icon:
 *            type: string
 *            format: text
 *          color:
 *            type: string
 *            format: text
 *          type:
 *            type: string
 *            enum:
 *              - income
 *              - expense
 *              - transfer
 *            desctiption: type of category expense, income or transfer
 *      Categories:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Category'
 *
 */
class CategoryController extends Controller {
    private categoryService: CategoryService;

    public constructor(logger: ILogger, categoryService: CategoryService) {
        super(logger, ApiPath.CATEGORIES);

        this.categoryService = categoryService;

        this.addRoute({
            path: CategoriesApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: CategoriesApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.findById(
                    options as ApiHandlerOptions<{
                        params: CategoryIdRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: CategoriesApiPath.ROOT,
            method: 'POST',
            validation: {
                body: categoryValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: CategoryRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: '/user',
            method: 'POST',
            validation: {
                body: categoryValidationSchema,
            },
            handler: (options) =>
                this.createUserCategory(
                    options as ApiHandlerOptions<{
                        token: string;
                        body: CategoryRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: CategoriesApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: CategoryUpdatePayloadDto;
                        params: CategoryIdRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: CategoriesApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{
                        params: CategoryIdRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /categories:
     *    get:
     *      tags: [Categories]
     *      description: Returns an array of categories
     *      responses:
     *        200:
     *          description: Successful operation with an array of categories
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Categories'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.categoryService.findAll(),
        };
    }

    /**
     * @swagger
     * /categories/{id}:
     *    get:
     *      tags: [Categories]
     *      description: Returns one category by id
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Category ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      responses:
     *        200:
     *          description: Successful operation of getting category by id
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */
    private async findById(
        options: ApiHandlerOptions<{
            params: CategoryIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.categoryService.findById(options.params.id),
        };
    }

    /**
     * @swagger
     * /categories:
     *    post:
     *      tags: [Categories]
     *      description: Create category
     *      requestBody:
     *        required: true
     *        content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     *      responses:
     *        201:
     *          description: Successful category creation operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */
    private async create(
        options: ApiHandlerOptions<{
            body: CategoryRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.categoryService.create(options.body),
        };
    }

    /**
     * @swagger
     * /categories/{id}:
     *    put:
     *      tags: [Categories]
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Category ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      description: Update category
     *      responses:
     *        200:
     *          description: Successful category update operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */
    private async update(
        options: ApiHandlerOptions<{
            body: CategoryUpdatePayloadDto;
            params: CategoryIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const updatedCategory = await this.categoryService.updateCategory(
            options.params.id,
            options.body,
        );
        return {
            status: HttpCode.OK,
            payload: updatedCategory,
        };
    }

    /**
     * @swagger
     * /categories/{id}:
     *    delete:
     *      tags: [Categories]
     *      parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          description: Category ID
     *          schema:
     *            type: string
     *          example: 4b7908cc-5581-4d74-8910-7f2bba8cb49b
     *      description: Delete category
     *      responses:
     *        200:
     *          description: Successful delete category operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */
    private async delete(
        options: ApiHandlerOptions<{
            params: CategoryIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.categoryService.deleteCategory(
                options.params.id,
            ),
        };
    }

    private async createUserCategory(
        options: ApiHandlerOptions<{
            token: string;
            body: CategoryRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.CREATED,
            payload: await this.categoryService.createUserCategory(
                userId,
                options.body,
            ),
        };
    }
}

export { CategoryController };
