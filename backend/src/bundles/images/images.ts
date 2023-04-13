import { logger } from '~/common/logger/logger.js';

import { ImageService } from './image.service.js';
import { ImageController } from './images.controller.js';
import { ImageModel } from './images.model.js';
import { ImageRepository } from './images.repository.js';

const imageRepository = new ImageRepository(ImageModel);
const imageService = new ImageService(imageRepository);
const imageController = new ImageController(logger, imageService);

export { imageController, imageRepository, imageService };
