import { CategoryEntity } from '~/bundles/categories/category.entity.js';
import { type CategoryModel } from '~/bundles/categories/category.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import { type CategoryUpdateRequestDto } from './types/types';

class CategoryRepository implements IRepository {
    private categoryModel: typeof CategoryModel;

    public constructor(categoryModel: typeof CategoryModel) {
        this.categoryModel = categoryModel;
    }

    public async find(data: object): Promise<CategoryEntity | undefined> {
        const category = await this.categoryModel
            .query()
            .select()
            .where(data)
            .first();
        if (!category) {
            return undefined;
        }
        return CategoryEntity.initialize(category);
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
        categoriId: string,
        data: CategoryUpdateRequestDto,
    ): Promise<CategoryEntity | undefined> {
        const updatedCategory = await this.categoryModel
            .query()
            .where({ id: categoriId })
            .update(data)
            .returning('*')
            .execute();

        return CategoryEntity.initialize(updatedCategory[0]);
    }

    public delete(): ReturnType<IRepository['delete']> {
        return Promise.resolve(true);
    }
}

export { CategoryRepository };
