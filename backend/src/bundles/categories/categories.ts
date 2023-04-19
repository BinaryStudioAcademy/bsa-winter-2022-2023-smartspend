import { logger } from '~/common/logger/logger.js';

import { UserCategoriesModel } from '../user-categories/user-category.model.js';
import { CategoryController } from './category.controller.js';
import { CategoryModel } from './category.model.js';
import { CategoryRepository } from './category.repository.js';
import { CategoryService } from './category.service.js';

const categoryRepository = new CategoryRepository(
    CategoryModel,
    UserCategoriesModel,
);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(logger, categoryService);

export { categoryController, categoryService };
export { UserCategoriesEntity } from '../user-categories/user-categories.entity.js';
export { UserCategoriesModel } from '../user-categories/user-category.model.js';
export { CategoryEntity } from './category.entity.js';
export { CategoryModel } from './category.model.js';
export {
    CategoriesApiPath,
    CategoryErrorMessage,
    CategoryType,
} from './enums/enums.js';
export {
    type CategoryGetAllItemResponseDto,
    type CategoryGetAllResponseDto,
    type CategoryIdRequestDto,
    type CategoryIdsRequestDto,
    type CategoryRequestDto,
    type CategoryUpdatePayloadDto,
} from './types/types.js';
export { categoryValidationSchema } from './validation-schemas/validation-schemas.js';
