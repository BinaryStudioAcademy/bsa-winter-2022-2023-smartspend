import { type ApiHandlerResponse } from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.package.js';
import { ApiPath, HttpCode } from '~/common/enums/enums.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type ImageService } from './image.service.js';

class ImageController extends Controller {
    private imageService: ImageService;

    public constructor(logger: ILogger, imageService: ImageService) {
        super(logger, ApiPath.IMAGE_UPLOAD);

        this.imageService = imageService;

        this.addRoute({
            path: '/',
            method: 'POST',
            handler: (options) => this.create(options),
        });
    }

    private async create(payload: unknown): Promise<ApiHandlerResponse> {
        await Promise.resolve();
        return {
            status: HttpCode.OK,
            payload: payload,
        };
    }
}

export { ImageController };
