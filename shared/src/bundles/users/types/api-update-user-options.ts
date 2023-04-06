import { type UserUpdateRequestDto } from './types.js';

type ApiUpdateUserOptions = {
    body: Partial<UserUpdateRequestDto>;
    token: string;
};

export { type ApiUpdateUserOptions };
