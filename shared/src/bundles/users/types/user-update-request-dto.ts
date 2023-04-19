import { type Gender } from '../enums/enums';

type UserUpdateRequestDto = {
    email: string;
    firstName: string;
    lastName: string;
    sex: Gender;
    dateOfBirth: string;
    language: string;
    createdAt: string;
    id: string;
    imageId: string;
    updatedAt: string;
    userId: string;
    currency: string;
};

export { type UserUpdateRequestDto };
