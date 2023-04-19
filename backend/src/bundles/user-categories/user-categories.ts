import { logger } from '~/common/logger/logger.js';

import {
    CategoryModel,
    UserCategoriesModel,
} from '../categories/categories.js';
import { UserModel } from '../users/user.model.js';
import { UserCategoryController } from './user-category.controller.js';
import { UserCategoryRepository } from './user-category.repository.js';
import { UserCategoryService } from './user-category.service.js';

const userCategoryRepository = new UserCategoryRepository(
    CategoryModel,
    UserCategoriesModel,
    UserModel,
);
const userCategoryService = new UserCategoryService(userCategoryRepository);
const userCategoryController = new UserCategoryController(
    logger,
    userCategoryService,
);

export { userCategoryController, userCategoryRepository, userCategoryService };
export { defaultCategories } from './constants/default-categories.js';
export { UserCategoriesEntity } from './user-categories.entity.js';
