import multer from 'fastify-multer';

import { config } from '../../config/config.js';

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: config.ENV.GYAZO.FILE_SIZE,
    },
});

export { upload };
