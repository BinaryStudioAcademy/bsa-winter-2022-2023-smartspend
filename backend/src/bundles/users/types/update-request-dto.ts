import { type UserUpdateRequestDto } from './types.js';

type UpdateRequestDto = {
    body: UserUpdateRequestDto;
    token: string;
};

export { type UpdateRequestDto };
