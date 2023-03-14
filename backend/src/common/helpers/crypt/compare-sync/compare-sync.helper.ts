import { compareSync } from 'bcrypt';

const compareSyncPassword = (password: string, hash: string): boolean =>
    compareSync(password, hash);

export { compareSyncPassword };
