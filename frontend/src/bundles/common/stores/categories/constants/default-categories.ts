import { CategoryType } from 'shared/build';

import { FaIcons } from '~/bundles/common/enums/enums';
import { type CategoryRequestDto } from '~/bundles/common/stores/categories/types/types';

const defaultCategories: CategoryRequestDto[] = [
    {
        name: 'Gifts',
        icon: FaIcons.GIFT,
        color: '--gradient-1',
        type: CategoryType.INCOME,
    },
];

export { defaultCategories };
