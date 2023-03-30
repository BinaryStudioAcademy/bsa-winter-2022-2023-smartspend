import { type WhiteRoute } from '../types/types';

const WHITE_ROUTES: WhiteRoute[] = [
    { endpoint: '/v1/documentation/static/*', method: 'GET' },
    { endpoint: '/v1/documentation/static/index.html', method: 'GET' },
    {
        endpoint: '/v1/documentation/static/swagger-initializer.js',
        method: 'GET',
    },
    { endpoint: '/v1/documentation/json', method: 'GET' },
    { endpoint: '/api/v1/auth/sign-in', method: 'POST' },
    { endpoint: '/api/v1/auth/sign-up', method: 'POST' },
];

export { WHITE_ROUTES };
