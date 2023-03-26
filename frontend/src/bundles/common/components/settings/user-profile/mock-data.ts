import { type UserChangeSettingsRequestDto } from 'shared/build/bundles/users/types/user-change-settings-request';

const mockData: UserChangeSettingsRequestDto = {
    name: 'Delete',
    surname: 'Me',
    email: 'deleteme@gmail.com',
    currency: 'USD',
    language: 'en',
};

export { mockData };
