import { CategoryEntity } from '~/bundles/categories/category.entity.js';
import { type CategoryModel } from '~/bundles/categories/category.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import { type CategoryUpdateRequestDto } from './categories.js';

class CategoryRepository implements IRepository {
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

    public async update(
        id: string,
        data: CategoryUpdateRequestDto,
    ): Promise<CategoryEntity | undefined> {
        const updatedCategory = await this.categoryModel
            .query()
            .where({ id })
            .update(data)
            .returning('*')
            .execute();

        return CategoryEntity.initialize(updatedCategory[0]);
    }

    public async delete(id: string): Promise<CategoryEntity | undefined> {
        const item = await this.categoryModel
            .query()
            .where({ id })
            .del()
            .returning('id')
            .execute();

        return CategoryEntity.initialize(item[0]);
    }
}

export { CategoryRepository };
