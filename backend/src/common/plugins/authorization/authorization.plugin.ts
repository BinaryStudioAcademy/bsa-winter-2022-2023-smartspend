import fp from 'fastify-plugin';

import {
    ControllerHook,
    ExceptionMessage,
    HttpCode,
    HttpError,
} from '../../enums/enums.js';

const authorization = fp(async (fastify, { routesWhiteList, services }) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
        try {
            const isWhiteRoute = routesWhiteList.includes(request.routerPath);

            if (isWhiteRoute) {
                return;
            }

            const [, token] = request.headers.authorization?.split(' ') ?? [];
            const { auth } = services;

            const authorizedUser = await auth.getUserByToken(token);
            if (!authorizedUser) {
                throw new HttpError({
                    message: ExceptionMessage.INVALID_TOKEN,
                    status: HttpCode.UNAUTHORIZED,
                });
            }
        } catch (error) {
            void reply.code(HttpCode.UNAUTHORIZED).send(error);
        }
    });
    return await Promise.resolve();
});
    
export { authorization };
