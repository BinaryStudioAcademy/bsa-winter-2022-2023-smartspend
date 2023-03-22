import {
    type CategoryIdRequestDto,
    type CategoryRequestDto,
    type CategoryUpdateRequestDto,
    CategoriesApiPath,
    categoryValidationSchema,
} from '~/bundles/categories/categories.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type CategoryService } from './category.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Category:
 *        type: object
 *        properties:
 *          id:
 *              type: number
 *              format: uuid
 *              minimum: 1
 *          name:
 *            type: string
 *            format: string
 *          icon:
 *            type: string
 *          color:
 *            type: string
 *          type:
 *            type: string
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
            path: CategoriesApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: CategoryUpdateRequestDto;
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
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/Categories'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.categoryService.findAll(),
        };
    }

    /**
     * @swagger
     * /categories:
     *    get:
     *      tags: [Categories]
     *      description: Returns an array of categories
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/Categories'
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

    private async update(
        options: ApiHandlerOptions<{
            body: CategoryUpdateRequestDto;
            params: CategoryIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const updatedCategory = await this.categoryService.update(
            options.params.id,
            options.body,
        );
        return {
            status: HttpCode.OK,
            payload: updatedCategory,
        };
    }

    private async delete(
        options: ApiHandlerOptions<{
            params: CategoryIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.categoryService.delete(options.params.id),
        };
    }
}

export { CategoryController };
