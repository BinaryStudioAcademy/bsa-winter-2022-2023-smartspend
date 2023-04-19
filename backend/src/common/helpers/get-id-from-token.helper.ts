import jwt from 'jsonwebtoken';

import { config } from '../config/config.js';

interface DecodedToken {
    id: string;
}

const getUserIdFromToken = (token: string): string => {
    const decodedToken: DecodedToken = jwt.verify(
        token.slice(7),
        config.ENV.JWT.SECRET,
    ) as DecodedToken;
    return decodedToken.id;
};

export { getUserIdFromToken };
