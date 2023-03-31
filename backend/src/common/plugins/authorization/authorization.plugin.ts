import fp from 'fastify-plugin';

import { type WhiteRoute } from '~/common/types/white-route.type.js';

import {
    ControllerHook,
    ExceptionMessage,
    HttpCode,
    HttpError,
} from '../../enums/enums.js';
import { getToken } from '../../helpers/helpers.js';

const authorization = fp(async (fastify, { routesWhiteList, services }) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
        try {
            const routeConfig = {
                endpoint: request.routerPath,
                method: request.method,
            };
            const isWhiteRoute = routesWhiteList.some(
                (route: WhiteRoute) =>
                    JSON.stringify(route) === JSON.stringify(routeConfig),
            );

            if (isWhiteRoute) {
                return;
            }
            const token = getToken(request.headers.authorization as string);
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
