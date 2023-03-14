import { hashSync } from 'bcrypt';

import { createSaltSync } from '../salt-sync/salt-sync.helper';

type EncryptSyncReturnType = {
    salt: string;
    hash: string;
};

const encryptSync = (data: string): EncryptSyncReturnType => {
    const salt = createSaltSync();
    const hash = hashSync(data, salt);
    return { salt, hash };
};

export { encryptSync };
