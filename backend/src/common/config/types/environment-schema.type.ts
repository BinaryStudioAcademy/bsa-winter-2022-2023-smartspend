import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    JWT: {
        SECRET: string;
        EXPIRES_IN: string;
    };
    EMAIL: {
        GMAIL_DOMAIN: string;
        GMAIL_PASSWORD: string;
        DASHBOARD_LINK: string;
        APP_LOGO_LINK: string;
    };
    GYAZO: {
        FILE_SIZE: number;
        UPLOAD_API_URL: string;
        ACCESS_TOKEN: string;
    };
};

export { type EnvironmentSchema };
