import { logger } from '~/common/logger/logger.js';

import { CategoryController } from './category.controller.js';
import { CategoryModel } from './category.model.js';
import { CategoryRepository } from './category.repository.js';
import { CategoryService } from './category.service.js';

const categoryRepository = new CategoryRepository(CategoryModel);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(logger, categoryService);

export { categoryController };
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
    type CategoryRequestDto,
    type CategoryUpdatePayloadDto,
} from './types/types.js';
export { categoryValidationSchema } from './validation-schemas/validation-schemas.js';
