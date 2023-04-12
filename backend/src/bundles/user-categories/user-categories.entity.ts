import { type IEntity } from '~/common/interfaces/interfaces.js';

class UserCategoriesEntity implements IEntity {
    private 'id': string | null;

    private 'userId': string;

    private 'categoryId': string;

    private constructor({
        id,
        userId,
        categoryId,
    }: {
        id: string | null;
        userId: string;
        categoryId: string;
    }) {
        this.id = id;
        this.userId = userId;
        this.categoryId = categoryId;
    }

    public static initialize({
        id,
        userId,
        categoryId,
    }: {
        id: string | null;
        userId: string;
        categoryId: string;
    }): UserCategoriesEntity {
        return new UserCategoriesEntity({
            id,
            userId,
            categoryId,
        });
    }

    public static initializeNew({
        userId,
        categoryId,
    }: {
        userId: string;
        categoryId: string;
    }): UserCategoriesEntity {
        return new UserCategoriesEntity({
            id: null,
            userId,
            categoryId,
        });
    }

    public toObject(): {
        id: string;
        userId: string;
        categoryId: string;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            categoryId: this.categoryId,
        };
    }

    public toNewObject(): {
        userId: string;
        categoryId: string;
    } {
        return {
            userId: this.userId,
            categoryId: this.categoryId,
        };
    }
}

export { UserCategoriesEntity };
