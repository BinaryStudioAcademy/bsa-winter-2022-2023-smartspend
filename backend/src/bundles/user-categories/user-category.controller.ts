import {
    type CategoryIdRequestDto,
    type CategoryIdsRequestDto,
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

import { type UserCategoryService } from './user-category.service.js';

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
class UserCategoryController extends Controller {
    private userCategoryService: UserCategoryService;

    public constructor(logger: ILogger, categoryService: UserCategoryService) {
        super(logger, ApiPath.USER_CATEGORIES);

        this.userCategoryService = categoryService;

        this.addRoute({
            path: CategoriesApiPath.ROOT,
            method: 'GET',
            handler: (options) =>
                this.findAll(options as ApiHandlerOptions<{ token: string }>),
        });

        this.addRoute({
            path: CategoriesApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.findById(
                    options as ApiHandlerOptions<{
                        token: string;
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
                        token: string;
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
                        token: string;
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
                        token: string;
                        params: CategoryIdRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: CategoriesApiPath.MANY,
            method: 'DELETE',
            handler: (options) =>
                this.deleteMany(
                    options as ApiHandlerOptions<{
                        token: string;
                        body: CategoryIdsRequestDto;
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
    private async findAll(
        options: ApiHandlerOptions<{
            token: string;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.OK,
            payload: await this.userCategoryService.findAllCategories(userId),
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
            token: string;
            params: CategoryIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.OK,
            payload: await this.userCategoryService.findById(
                userId,
                options.params.id,
            ),
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
            token: string;
            body: CategoryRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.CREATED,
            payload: await this.userCategoryService.createCategory(
                userId,
                options.body,
            ),
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
            token: string;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        const updatedCategory = await this.userCategoryService.updateCategory(
            userId,
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
            token: string;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.OK,
            payload: await this.userCategoryService.deleteCategory(
                userId,
                options.params.id,
            ),
        };
    }

    private async deleteMany(
        options: ApiHandlerOptions<{
            body: CategoryIdsRequestDto;
            token: string;
        }>,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.OK,
            payload: await this.userCategoryService.deleteCategories(
                userId,
                options.body.categoryIds,
            ),
        };
    }
}

export { UserCategoryController };
