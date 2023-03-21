import { CategoryEntity } from '~/bundles/categories/category.entity.js';
import { type CategoryModel } from '~/bundles/categories/category.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

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
        const { icon, color, type } = entity.toNewObject();
        const item = await this.categoryModel
            .query()
            .insert({ icon, color, type })
            .returning('*')
            .execute();
        return CategoryEntity.initialize(item);
    }

    public update(): ReturnType<IRepository['update']> {
        return Promise.resolve(true);
    }

    public delete(): ReturnType<IRepository['delete']> {
        return Promise.resolve(true);
    }
}

export { CategoryRepository };
