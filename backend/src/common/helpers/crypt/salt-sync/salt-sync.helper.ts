import { genSaltSync } from 'bcrypt';

import { USER_PASSWORD_SALT_ROUNDS } from '../../../constants/constants';

const createSaltSync = (): string => genSaltSync(USER_PASSWORD_SALT_ROUNDS);

export { createSaltSync };
