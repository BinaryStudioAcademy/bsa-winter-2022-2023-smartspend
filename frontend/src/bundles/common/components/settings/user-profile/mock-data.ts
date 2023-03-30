import { type UserChangeSettingsRequestDto } from 'shared/build/bundles/users/types/user-change-settings-request';

const mockData: UserChangeSettingsRequestDto = {
    name: 'Delete',
    surname: 'Me',
    email: 'deleteme@gmail.com',
    sex: '',
    birth: '',
    currency: 'USD',
    language: 'English',
};

export { mockData };
