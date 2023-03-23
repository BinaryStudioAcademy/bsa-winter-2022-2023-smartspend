import {
    type CategoryGetAllResponseDto,
    type CategoryRequestDto,
    type CategoryUpdateRequestDto,
    CategoryErrorMessage,
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

    public async findById(id: string): Promise<CategoryEntity | undefined> {
        const category = await this.find({ id });

        if (!category) {
            throw new Error(CategoryErrorMessage.NOT_FOUND);
        }

        return category;
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

    public async update(
        id: string,
        payload: CategoryUpdateRequestDto,
    ): Promise<CategoryUpdateRequestDto | undefined> {
        const updatedCategory = await this.categoryRepository.update(
            id,
            payload,
        );

        if (!updatedCategory) {
            throw new Error(CategoryErrorMessage.NOT_FOUND);
        }

        return updatedCategory.toObject();
    }

    public async delete(
        id: string,
    ): Promise<CategoryGetAllResponseDto | undefined> {
        const deletedCategory = await this.categoryRepository.delete(id);

        if (!deletedCategory) {
            throw new Error(CategoryErrorMessage.NOT_FOUND);
        }

        return await this.findAll();
    }
}

export { CategoryService };
