import { type Gender } from 'shared/build';

import { type IEntity } from '~/common/interfaces/interfaces.js';

class UserEntity implements IEntity {
    private 'id': string | null;

    private 'email': string;

    private 'passwordHash': string;

    private 'passwordSalt': string;

    private 'firstName'?: string;

    private 'lastName'?: string;

    private 'sex'?: Gender;

    private 'dateOfBirth'?: string;

    private 'language'?: string;

    private 'currency'?: string;

    private 'avatarUrl'?: string;

    private constructor({
        id,
        email,
        passwordHash,
        passwordSalt,
        firstName,
        lastName,
        sex,
        dateOfBirth,
        language,
        currency,
        avatarUrl,
    }: {
        id: string | null;
        email: string;
        passwordHash: string;
        passwordSalt: string;
        firstName?: string;
        lastName?: string;
        sex?: Gender;
        dateOfBirth?: string;
        language?: string;
        currency?: string;
        avatarUrl?: string;
    }) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.language = language;
        this.currency = currency;
        this.avatarUrl = avatarUrl;
    }

    public static initialize({
        id,
        email,
        passwordHash,
        passwordSalt,
        firstName,
        lastName,
        sex,
        dateOfBirth,
        language,
        currency,
        avatarUrl,
    }: {
        id: string;
        email: string;
        passwordHash: string;
        passwordSalt: string;
        firstName?: string;
        lastName?: string;
        sex?: Gender;
        dateOfBirth?: string;
        language?: string;
        currency?: string;
        avatarUrl?: string;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
            passwordSalt,
            firstName,
            lastName,
            sex,
            dateOfBirth,
            language,
            currency,
            avatarUrl,
        });
    }

    public static initializeNew({
        email,
        passwordHash,
        passwordSalt,
        firstName,
        lastName,
        sex,
        dateOfBirth,
        language,
        currency,
        avatarUrl,
    }: {
        email: string;
        passwordHash: string;
        passwordSalt: string;
        firstName?: string;
        lastName?: string;
        sex?: Gender;
        dateOfBirth?: string;
        language?: string;
        currency?: string;
        avatarUrl?: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            passwordHash,
            passwordSalt,
            firstName,
            lastName,
            sex,
            dateOfBirth,
            language,
            currency,
            avatarUrl,
        });
    }

    public toObject(): {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        sex?: Gender;
        dateOfBirth?: string;
        language?: string;
        currency?: string;
        avatarUrl?: string;
    } {
        return {
            id: this.id as string,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            sex: this.sex,
            dateOfBirth: this.dateOfBirth,
            language: this.language,
            currency: this.currency,
            avatarUrl: this.avatarUrl,
        };
    }

    public toNewObject(): {
        email: string;
        passwordHash: string;
        passwordSalt: string;
        firstName?: string;
        lastName?: string;
        sex?: Gender;
        dateOfBirth?: string;
        language?: string;
        currency?: string;
        avatarUrl?: string;
    } {
        return {
            email: this.email,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
            firstName: this.firstName,
            lastName: this.lastName,
            sex: this.sex,
            dateOfBirth: this.dateOfBirth,
            language: this.language,
            currency: this.currency,
            avatarUrl: this.avatarUrl,
        };
    }
}

export { UserEntity };
