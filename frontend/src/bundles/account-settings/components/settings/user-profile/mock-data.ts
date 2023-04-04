import { type UserUpdateRequestDto, Gender } from 'shared/build';

const mockData: UserUpdateRequestDto = {
    firstName: 'Delete',
    lastName: 'Me',
    email: 'deleteme@gmail.com',
    sex: Gender.MALE,
    dateOfBirth: '',
    currency: 'USD',
    language: 'English',
};

export { mockData };
