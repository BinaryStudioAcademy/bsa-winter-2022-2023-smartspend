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

    private 'imageId'?: string;

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
        imageId,
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
        imageId?: string;
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
        this.imageId = imageId;
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
        imageId,
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
        imageId?: string;
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
            imageId,
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
        imageId,
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
        imageId?: string;
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
            imageId,
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
        imageId?: string;
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
            imageId: this.imageId,
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
        imageId?: string;
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
            imageId: this.imageId,
        };
    }
}

export { UserEntity };
