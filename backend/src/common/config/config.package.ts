import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/common/enums/enums.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type IConfig } from './interfaces/interfaces.js';
import { type EnvironmentSchema } from './types/types.js';

class Config implements IConfig {
    private logger: ILogger;

    public ENV: EnvironmentSchema;

    public constructor(logger: ILogger) {
        this.logger = logger;

        config();

        this.envSchema.load({});
        this.envSchema.validate({
            allowed: 'strict',
            output: (message) => this.logger.info(message),
        });

        this.ENV = this.envSchema.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }

    private get envSchema(): TConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                ENVIRONMENT: {
                    doc: 'Application environment',
                    format: Object.values(AppEnvironment),
                    env: 'NODE_ENV',
                    default: null,
                },
                PORT: {
                    doc: 'Port for incoming connections',
                    format: Number,
                    env: 'PORT',
                    default: null,
                },
            },
            DB: {
                CONNECTION_STRING: {
                    doc: 'Database connection string',
                    format: String,
                    env: 'DB_CONNECTION_STRING',
                    default: null,
                },
                DIALECT: {
                    doc: 'Database dialect',
                    format: String,
                    env: 'DB_DIALECT',
                    default: null,
                },
                POOL_MIN: {
                    doc: 'Database pool min count',
                    format: Number,
                    env: 'DB_POOL_MIN',
                    default: null,
                },
                POOL_MAX: {
                    doc: 'Database pool max count',
                    format: Number,
                    env: 'DB_POOL_MAX',
                    default: null,
                },
            },
            JWT: {
                SECRET: {
                    doc: 'Secret for jsonwebtoken',
                    format: String,
                    env: 'SECRET',
                    default: null,
                },
                EXPIRES_IN: {
                    doc: 'jsonwebtoken option specifies the time duration after which the generated token will expire',
                    format: String,
                    env: 'EXPIRES_IN',
                    default: null,
                },
            },
            EMAIL: {
                GMAIL_DOMAIN: {
                    doc: 'gmail email address',
                    format: String,
                    env: 'GMAIL_DOMAIN',
                    default: null,
                },
                GMAIL_PASSWORD: {
                    doc: 'gmail email password',
                    format: String,
                    env: 'GMAIL_PASSWORD',
                    default: null,
                },
                DASHBOARD_LINK: {
                    doc: 'dashboard link to redirect user in email',
                    format: String,
                    env: 'DASHBOARD_LINK',
                    default: null,
                },
                APP_LOGO_LINK: {
                    doc: 'logo link image',
                    format: String,
                    env: 'APP_LOGO_LINK',
                    default: null,
                },
            },
            GYAZO: {
                FILE_SIZE: {
                    doc: 'File size',
                    format: Number,
                    default: 10_000_000,
                },
                UPLOAD_API_URL: {
                    doc: 'url to upload images',
                    format: String,
                    env: 'GYAZO_UPLOAD_API_URL',
                    default: null,
                },
                ACCESS_TOKEN: {
                    doc: 'access token',
                    format: String,
                    env: 'GYAZO_ACCESS_TOKEN',
                    default: null,
                },
            },
        });
    }
}

export { Config };
