type UserChangeSettingsRequestDto = {
    name: string;
    surname: string;
    sex?: string;
    birth?: string | number | Date;
    email: string;
    currency?: string;
    language?: string;
};

export { type UserChangeSettingsRequestDto };
