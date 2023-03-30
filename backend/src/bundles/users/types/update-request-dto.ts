import { type UserUpdateRequestDto } from './types.js';

type UpdateRequestDto = {
    body: Partial<UserUpdateRequestDto>;
    token: string;
};

export { type UpdateRequestDto };
