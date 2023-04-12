import {
    type CategoryGetAllItemResponseDto,
    type CategoryGetAllResponseDto,
} from 'shared/build';

const getSortedCategoriesByType = (
    categories: CategoryGetAllResponseDto,
): Record<string, CategoryGetAllItemResponseDto[]> => {
    const sortByType: Record<string, CategoryGetAllItemResponseDto[]> = {};
    for (const data of categories.items) {
        if (!(data.type in sortByType)) {
            sortByType[data.type] = [];
        }
        sortByType[data.type].push(data);
    }

    return sortByType;
};

export { getSortedCategoriesByType };
