import { ImageModel } from './images.model.js';
import { ImageRepository } from './images.repository.js';

const imageRepository = new ImageRepository(ImageModel);

export { imageRepository };
