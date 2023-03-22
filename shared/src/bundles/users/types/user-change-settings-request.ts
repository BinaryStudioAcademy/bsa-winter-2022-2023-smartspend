type UserChangeSettingsRequestDto = {
    name: string;
    surname: string;
    sex?: 'Man' | 'Woman';
    birthday?: {
        date: string | number;
        month: string;
        year: string | number;
    };
    email: string;
    currency: string;
    language: string;
};

export { type UserChangeSettingsRequestDto };
