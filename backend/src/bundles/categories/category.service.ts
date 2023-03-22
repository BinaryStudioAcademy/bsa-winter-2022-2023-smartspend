import {
    type CategoryGetAllResponseDto,
    type CategoryRequestDto,
} from '~/bundles/categories/categories.js';
import { CategoryEntity } from '~/bundles/categories/category.entity.js';
import { type CategoryRepository } from '~/bundles/categories/category.repository.js';
import { type IService } from '~/common/interfaces/interfaces.js';

class CategoryService implements IService {
    private categoryRepository: CategoryRepository;

    public constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    private async find(payload: object): Promise<CategoryEntity | undefined> {
        return await this.categoryRepository.find(payload);
    }

    public async findById(id: number): Promise<CategoryEntity | undefined> {
        return await this.find({ id });
    }

    public async findAll(): Promise<CategoryGetAllResponseDto> {
        const items = await this.categoryRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(payload: CategoryRequestDto): Promise<CategoryEntity> {
        return await this.categoryRepository.create(
            CategoryEntity.initializeNew({
                name: payload.name,
                icon: payload.icon,
                color: payload.color,
                type: payload.type,
            }),
        );
    }

    public update(): ReturnType<IService['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<IService['delete']> {
        return Promise.resolve(true);
    }
}

export { CategoryService };
