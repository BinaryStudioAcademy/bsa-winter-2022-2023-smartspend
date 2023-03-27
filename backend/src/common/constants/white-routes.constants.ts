import { type WhiteRoute } from '../types/types';

const WHITE_ROUTES: WhiteRoute[] = [
    { endpoint: '/v1/documentation/static/*', method: 'GET' },
    { endpoint: '/v1/documentation/static/index.html', method: 'GET' },
    {
        endpoint: '/v1/documentation/static/swagger-initializer.js',
        method: 'GET',
    },
    { endpoint: '/v1/documentation/json', method: 'GET' },
    { endpoint: '/api/v1/auth/sign-in', method: 'GET' },
    { endpoint: '/api/v1/auth/sign-up', method: 'GET' },
];

export { WHITE_ROUTES };
