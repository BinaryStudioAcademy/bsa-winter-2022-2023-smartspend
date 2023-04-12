import { ImageEntity } from './images.entity.js';
import { type ImageModel } from './images.model.js';

class ImageRepository {
    private imageModel: typeof ImageModel;

    public constructor(imageModel: typeof ImageModel) {
        this.imageModel = imageModel;
    }

    public async create(entity: ImageEntity): Promise<ImageEntity> {
        const { path } = entity.toNewObject();
        const image = await this.imageModel
            .query()
            .insert({ path: path })
            .returning('*')
            .execute();
        return ImageEntity.initialize(image);
    }
}

export { ImageRepository };
