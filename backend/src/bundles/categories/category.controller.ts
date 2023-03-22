import { type CategoryRequestDto } from 'shared/build/index.js';

import { categoryValidationSchema } from '~/bundles/categories/categories.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type CategoryService } from './category.service.js';
import { CategoriesApiPath } from './enums/enums.js';

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
    }

    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.categoryService.findAll(),
        };
    }

    private async create(
        options: ApiHandlerOptions<{
            body: CategoryRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const newCategory = await this.categoryService.create(options.body);
        return {
            status: HttpCode.CREATED,
            payload: newCategory,
        };
    }
}

export { CategoryController };
