import { CategoryEntity } from '~/bundles/categories/category.entity.js';
import { type CategoryModel } from '~/bundles/categories/category.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import { type CategoryUpdatePayloadDto } from './categories.js';

class CategoryRepository implements Partial<IRepository> {
    private categoryModel: typeof CategoryModel;

    public constructor(categoryModel: typeof CategoryModel) {
        this.categoryModel = categoryModel;
    }

    public async find(payload: object): Promise<CategoryEntity | undefined> {
        const data = await this.categoryModel
            .query()
            .select()
            .where(payload)
            .first();
        if (!data) {
            return undefined;
        }
        return CategoryEntity.initialize(data);
    }

    public async findAll(): Promise<CategoryEntity[]> {
        const categories = await this.categoryModel.query().execute();

        return categories.map((it) => CategoryEntity.initialize(it));
    }

    public async create(entity: CategoryEntity): Promise<CategoryEntity> {
        const { name, icon, color, type } = entity.toNewObject();
        const item = await this.categoryModel
            .query()
            .insert({ name, icon, color, type })
            .returning('*')
            .execute();
        return CategoryEntity.initialize(item);
    }

    public async updateCategory(
        id: string,
        payload: CategoryUpdatePayloadDto,
    ): Promise<CategoryEntity | undefined> {
        const updatedCategory = await this.categoryModel
            .query()
            .where({ id })
            .update(payload)
            .returning('*')
            .execute();

        return CategoryEntity.initialize(updatedCategory[0]);
    }

    public async deleteCategory(
        id: string,
    ): Promise<CategoryEntity | undefined> {
        const item = await this.categoryModel
            .query()
            .where({ id })
            .del()
            .returning('id')
            .execute();

        return CategoryEntity.initialize(item[0]);
    }

    public async deleteCategories(
        idArray: string[],
    ): Promise<CategoryEntity[] | undefined> {
        const items = await this.categoryModel
            .query()
            .whereIn('id', idArray)
            .del()
            .returning('id')
            .execute();

        return items.map((it) => CategoryEntity.initialize(it));
    }
}

export { CategoryRepository };
