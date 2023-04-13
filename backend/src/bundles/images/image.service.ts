import { ImageEntity } from './images.entity.js';
import { type ImageRepository } from './images.repository.js';

class ImageService {
    private imageRepository: ImageRepository;

    public constructor(imageRepository: ImageRepository) {
        this.imageRepository = imageRepository;
    }

    public async create(payload: { path: string }): Promise<unknown> {
        return await this.imageRepository.create(
            ImageEntity.initializeNew(payload),
        );
    }
}

export { ImageService };
