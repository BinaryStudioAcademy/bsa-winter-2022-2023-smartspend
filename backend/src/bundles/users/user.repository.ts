import { type PartialModelObject } from 'objection';
import { type UserProfileResponseDto } from 'shared/build';

import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import { type UserProfileModel } from './user-profile.model.js';

class UserRepository implements Omit<IRepository, 'update' | 'delete'> {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public async find(data: object): Promise<UserEntity | undefined> {
        const user = await this.userModel.query().select().where(data).first();
        if (!user) {
            return undefined;
        }
        return UserEntity.initialize(user);
    }

    public async getCurrentUserDetails(
        userId: string,
    ): Promise<UserProfileResponseDto | undefined> {
        const user = await this.userModel
            .query()
            .findById(userId)
            .withGraphFetched('userProfile');

        if (!user) {
            return undefined;
        }

        return { email: user.email, ...user.userProfile };
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, passwordSalt, passwordHash } = entity.toNewObject();
        const item = await this.userModel
            .query()
            .insert({
                email,
                passwordSalt,
                passwordHash,
            })
            .returning('*')
            .execute();

        return UserEntity.initialize(item);
    }

    public async updateUserProfile(
        id: string,
        data: PartialModelObject<
            UserModel & { userProfile?: PartialModelObject<UserProfileModel> }
        >,
    ): Promise<UserEntity | undefined> {
        const user = await this.userModel
            .query()
            .findById(id)
            .withGraphFetched('userProfile');

        if (!user) {
            return undefined;
        }

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!user.userProfile) {
            await user
                .$relatedQuery('userProfile')
                .insert({ ...data.userProfile })
                .returning('*')
                .execute();
        }

        await user
            .$relatedQuery('userProfile')
            .update({ ...data.userProfile })
            .returning('*')
            .execute();

        await user.$query().update(data).returning('*').execute();

        return UserEntity.initialize(user);
    }

    public async deleteUser(id: string): Promise<boolean> {
        const item = await this.userModel
            .query()
            .where({ id })
            .del()
            .returning('id')
            .execute();
        const deletedUser = UserEntity.initialize(item[0]);
        return !!deletedUser;
    }
}

export { UserRepository };
