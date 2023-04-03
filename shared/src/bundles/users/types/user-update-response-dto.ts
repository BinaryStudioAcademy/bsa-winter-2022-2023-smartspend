import { type Gender } from '../enums/enums';

type UserUpdateResponseDto = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    sex?: Gender;
    dateOfBirth?: string;
    language?: string;
    currency?: string;
};

export { type UserUpdateResponseDto };
