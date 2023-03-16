import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../config/config.js';
import { CryptService } from './crypt/crypt.service.js';
import { TokenService } from './token/token.service.js';

const cryptService = new CryptService(bcrypt);
const tokenService = new TokenService(jwt, config);

export { cryptService, tokenService };
