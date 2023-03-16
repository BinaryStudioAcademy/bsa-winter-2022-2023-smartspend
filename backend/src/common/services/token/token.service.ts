// eslint-disable-next-line no-restricted-syntax
import type Jwt from 'jsonwebtoken';
import { type JwtPayload } from 'jsonwebtoken';

import { type IConfig } from '~/common/config/config.js';

class TokenService {
    private jwt: typeof Jwt;
    private config: IConfig;
    private options: object;

    public constructor(jwt: typeof Jwt, config: IConfig) {
        this.jwt = jwt;
        this.config = config;
        this.options = {
            expiresIn: this.config.ENV.JWT.EXPIRES_IN,
        };
    }

    public createToken(data: string | object | Buffer): string {
        return this.jwt.sign(data, this.config.ENV.JWT.SECRET, this.options);
    }

    public verifyToken(token: string): string | JwtPayload {
        return this.jwt.verify(token, this.config.ENV.JWT.SECRET);
    }
}

export { TokenService };
