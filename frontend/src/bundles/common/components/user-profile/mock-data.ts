import { type UserChangeSettingsRequestDto } from 'shared/build/bundles/users/types/user-change-settings-request';

const mockData: UserChangeSettingsRequestDto = {
    name: 'Delete',
    surname: 'Me',
    email: 'deleteme@gmail.com',
    sex: 'Male',
    birth: '',
    currency: 'USD',
    language: 'English',
};

const currency = [
    { value: 'USD', name: 'USD' },
    { value: 'UAH', name: 'UAH' },
];

const language = [
    { value: 'English', name: 'English' },
    { value: 'Ukrainian', name: 'Ukrainian' },
];

const sex = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' },
];

export { currency, language, mockData, sex };
