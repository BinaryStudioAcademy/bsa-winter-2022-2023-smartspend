/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '~/common/logger/logger.js';

import { CategoryModel } from './category.model.js';
import { CategoryRepository } from './category.repository.js';

const categoryRepository = new CategoryRepository(CategoryModel);

export { CategoryModel } from './category.model.js';
