import {
    type CategoryModel,
    type CategoryUpdatePayloadDto,
    type UserCategoriesModel,
} from '../categories/categories.js';
import { CategoryEntity } from '../categories/category.entity.js';
import { type UserModel } from '../users/users.js';

class UserCategoryRepository {
    private userCategoriesModel: typeof UserCategoriesModel;
    private categoryModel: typeof CategoryModel;
    private userModel: typeof UserModel;

    public constructor(
        categoryModel: typeof CategoryModel,
        userCategoriesModel: typeof UserCategoriesModel,
        userModel: typeof UserModel,
    ) {
        this.userCategoriesModel = userCategoriesModel;
        this.categoryModel = categoryModel;
        this.userModel = userModel;
    }

    private async createCategory(
        entity: CategoryEntity,
    ): Promise<CategoryEntity> {
        const { name, icon, color, type } = entity.toNewObject();
        const item = await this.categoryModel
            .query()
            .insert({ name, icon, color, type })
            .returning('*')
            .execute();
        return CategoryEntity.initialize(item);
    }

    public async createUserCategory(
        userId: string,
        entity: CategoryEntity,
    ): Promise<CategoryEntity> {
        const category = await this.createCategory(entity);
        const { id } = category.toObject();
        await this.userCategoriesModel.query().insert({
            userId,
            categoryId: id,
        });
        return category;
    }

    public async createDefaultUserCategory(
        userId: string,
        entities: CategoryEntity[],
    ): Promise<CategoryEntity[]> {
        const defaultCategories: CategoryEntity[] = [];
        for (const entity of entities) {
            const createdCategory = await this.createCategory(entity);
            defaultCategories.push(createdCategory);
        }

        const defaultCategoriesIds = defaultCategories.map((category) => ({
            userId,
            categoryId: category.toObject().id,
        }));
        for (const defaultCategoryId of defaultCategoriesIds) {
            await this.userCategoriesModel.query().insert(defaultCategoryId);
        }

        return defaultCategories;
    }

    public async getAll(id: string): Promise<CategoryEntity[] | undefined> {
        const categories = await this.userModel
            .query()
            .findById(id)
            .withGraphFetched('[userCategories.category]')
            .execute();
        const userCategories = categories?.userCategories.flatMap(
            (userCategory) => userCategory.category,
        );
        return userCategories?.map((it) => CategoryEntity.initialize(it));
    }

    public async getById(
        userId: string,
        categoryId: string,
    ): Promise<CategoryEntity | undefined> {
        const categories = await this.getAll(userId);
        return categories?.find((category) => category.id === categoryId);
    }

    public async updateCategory(
        userId: string,
        categoryId: string,
        payload: CategoryUpdatePayloadDto,
    ): Promise<CategoryEntity | undefined> {
        const user = await this.userModel.query().findById(userId).execute();
        if (!user) {
            return;
        }
        const userCategory = await this.userCategoriesModel
            .query()
            .findOne({ userId: user.id, categoryId: categoryId })
            .execute();
        if (!userCategory) {
            return;
        }
        const updatedCategory = await this.categoryModel
            .query()
            .findById(userCategory.categoryId)
            .patch(payload)
            .returning('*')
            .first()
            .execute();
        if (!updatedCategory) {
            return;
        }
        return CategoryEntity.initialize(updatedCategory);
    }

    public async deleteCategory(
        userId: string,
        categoryId: string,
    ): Promise<{ categoryId: string } | undefined> {
        const userCategory = await this.userCategoriesModel
            .query()
            .findOne({ userId, categoryId });
        if (!userCategory) {
            return;
        }
        await userCategory.$query().delete();
        return { categoryId };
    }

    public async deleteCategories(
        userId: string,
        categoryIds: string[],
    ): Promise<{ categoryIds: string[] } | undefined> {
        const userCategories = await this.userCategoriesModel
            .query()
            .whereIn('categoryId', categoryIds)
            .andWhere('userId', userId);

        if (userCategories.length === 0) {
            return;
        }

        const deletedCategoryIds = userCategories.map(
            (userCategory) => userCategory.categoryId,
        );

        await this.userCategoriesModel
            .query()
            .whereIn('categoryId', categoryIds)
            .andWhere('userId', userId)
            .delete();

        return { categoryIds: deletedCategoryIds };
    }
}

export { UserCategoryRepository };
