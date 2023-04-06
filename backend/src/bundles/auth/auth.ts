import { userService } from '~/bundles/users/users.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';
import { cryptService, tokenService } from '~/common/services/services.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService({
    userService,
    cryptService,
    tokenService,
    config,
});
const authController = new AuthController(logger, authService);

export { authController, authService };
