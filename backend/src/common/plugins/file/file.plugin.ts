import { type MultipartFile } from '@fastify/multipart';
import { type FastifyPluginAsync, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { ControllerHook, HttpCode } from '~/common/enums/enums.js';
// import { FilesError, InvalidFilesError } from '~/exceptions/exceptions';

type Options = {
    allowedExtensions: string[];
};

const upload: FastifyPluginAsync<Options> = async (fastify) => {
    await Promise.resolve(null);

    fastify.decorateRequest('fileBuffer', null);

    fastify.addHook(
        ControllerHook.PRE_VALIDATION,
        async (
            request: FastifyRequest<{
                Body: { file: MultipartFile; fileBuffer: Buffer };
            }>,
            reply,
        ) => {
            try {
                if (!request.isMultipart()) {
                    return;
                }

                const { file } = request.body;
                // const isAllowedExtension = allowedExtensions.includes(
                //     file.mimetype,
                // );

                // if (!isAllowedExtension) {
                //     throw new Error('Some Error');
                // }

                if (file.file.truncated) {
                    throw new Error('file too big');
                }

                const fileBuffer = await file.toBuffer();
                request.body.fileBuffer = fileBuffer;
            } catch (error: unknown) {
                await reply.status(HttpCode.UNPROCESSED_ENTITY).send(error);
            }
        },
    );
};

const file = fp(upload);

export { file };
