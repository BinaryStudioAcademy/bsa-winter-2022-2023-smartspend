import {
    type UserGetAllResponseDto,
    type UserProfileResponseDto,
    type UserSignUpRequestDto,
    type UserUpdateRequestDto,
    type UserUpdateResponseDto,
} from 'shared/build';

import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type IService } from '~/common/interfaces/interfaces.js';
import { cryptService } from '~/common/services/services.js';

class UserService implements Partial<IService> {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    private async find(payload: object): Promise<UserEntity | undefined> {
        return await this.userRepository.find(payload);
    }

    public async findByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.find({ email });
    }

    public async findById(id: string): Promise<UserEntity | undefined> {
        return await this.find({ id });
    }

    public async getCurrentUserDetails(
        id: string,
    ): Promise<UserProfileResponseDto | undefined> {
        return await this.userRepository.getCurrentUserDetails(id);
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(payload: UserSignUpRequestDto): Promise<UserEntity> {
        const { hash, salt } = cryptService.encryptSync(payload.password);
        return await this.userRepository.create(
            UserEntity.initializeNew({
                email: payload.email,
                passwordSalt: salt,
                passwordHash: hash,
            }),
        );
    }

    public async update(
        id: string,
        payload: Partial<UserUpdateRequestDto>,
    ): Promise<UserUpdateResponseDto | undefined> {
        const updatedUser = await this.userRepository.updateUserProfile(
            id,
            payload,
        );

        if (!updatedUser) {
            throw new Error('Something went wrong.');
        }
        return updatedUser.toObject();
    }

    public async deleteUser(id: string): Promise<boolean> {
        return await this.userRepository.deleteUser(id);
    }
}

export { UserService };
