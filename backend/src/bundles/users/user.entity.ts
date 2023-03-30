import { type IEntity } from '~/common/interfaces/interfaces.js';

import { type Gender } from './types/types.js';

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
        };
    }
}

export { UserEntity };
