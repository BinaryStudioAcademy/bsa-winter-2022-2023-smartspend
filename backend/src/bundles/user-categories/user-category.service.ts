import {
    type CategoryGetAllResponseDto,
    type CategoryRequestDto,
    type CategoryUpdatePayloadDto,
    CategoryErrorMessage,
} from '~/bundles/categories/categories.js';
import { CategoryEntity } from '~/bundles/categories/category.entity.js';

import { type UserCategoryRepository } from './user-category.repository.js';

class UserCategoryService {
    private userCategoryRepository: UserCategoryRepository;

    public constructor(categoryRepository: UserCategoryRepository) {
        this.userCategoryRepository = categoryRepository;
    }

    public async findAllCategories(
        userId: string,
    ): Promise<CategoryGetAllResponseDto | undefined> {
        const items = await this.userCategoryRepository.getAll(userId);
        return {
            items: items?.map((it) => it.toObject()) ?? [],
        };
    }

    public async findById(
        userId: string,
        categoryId: string,
    ): Promise<CategoryEntity | undefined> {
        return await this.userCategoryRepository.getById(userId, categoryId);
    }

    public async createCategory(
        userId: string,
        payload: CategoryRequestDto,
    ): Promise<CategoryEntity> {
        return await this.userCategoryRepository.createUserCategory(
            userId,
            CategoryEntity.initializeNew({
                name: payload.name,
                icon: payload.icon,
                color: payload.color,
                type: payload.type,
            }),
        );
    }

    public async createDefaultCategories(
        userId: string,
        payload: CategoryRequestDto[],
    ): Promise<CategoryEntity[]> {
        return await this.userCategoryRepository.createDefaultUserCategory(
            userId,
            payload.map((item) => CategoryEntity.initializeNew(item)),
        );
    }

    public async updateCategory(
        userId: string,
        categoryId: string,
        payload: CategoryUpdatePayloadDto,
    ): Promise<CategoryUpdatePayloadDto | undefined> {
        const updatedCategory =
            await this.userCategoryRepository.updateCategory(
                userId,
                categoryId,
                payload,
            );

        if (!updatedCategory) {
            throw new Error(CategoryErrorMessage.NOT_FOUND);
        }

        return updatedCategory.toObject();
    }

    public async deleteCategory(
        userId: string,
        categoryId: string,
    ): Promise<{ categoryId: string } | undefined> {
        return await this.userCategoryRepository.deleteCategory(
            userId,
            categoryId,
        );
    }

    public async deleteCategories(
        userId: string,
        categoryIds: string[],
    ): Promise<{ categoryIds: string[] } | undefined> {
        return await this.userCategoryRepository.deleteCategories(
            userId,
            categoryIds,
        );
    }
}

export { UserCategoryService };
