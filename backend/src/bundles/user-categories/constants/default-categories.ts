import { CategoryType } from '~/bundles/categories/categories.js';
import { type CategoryRequestDto } from '~/bundles/categories/types/types.js';
import { Gradients, Icons } from '~/bundles/user-categories/enums/enums.js';

const defaultCategories: CategoryRequestDto[] = [
    {
        name: 'Gifts',
        icon: Icons.GIFT,
        color: Gradients.GRADIENT_1,
        type: CategoryType.INCOME,
    },
    {
        name: 'Business',
        icon: Icons.BRIEFCASE,
        color: Gradients.GRADIENT_2,
        type: CategoryType.INCOME,
    },
    {
        name: 'Extra Income',
        icon: Icons.SACK_DOLLAR,
        color: Gradients.GRADIENT_3,
        type: CategoryType.INCOME,
    },
    {
        name: 'Salary',
        icon: Icons.SACK_DOLLAR,
        color: Gradients.GRADIENT_4,
        type: CategoryType.INCOME,
    },
    {
        name: 'Other',
        icon: Icons.LANDMARK,
        color: Gradients.GRADIENT_5,
        type: CategoryType.INCOME,
    },
    {
        name: 'Car',
        icon: Icons.CAR,
        color: Gradients.GRADIENT_6,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Shoping',
        icon: Icons.BASKET_SHOPPING,
        color: Gradients.GRADIENT_7,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Travel',
        icon: Icons.CAR,
        color: Gradients.GRADIENT_8,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Home',
        icon: Icons.PAW,
        color: Gradients.GRADIENT_9,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Food & drink',
        icon: Icons.BASKET_SHOPPING,
        color: Gradients.GRADIENT_10,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Education',
        icon: Icons.GRADUATION_CAP,
        color: Gradients.GRADIENT_11,
        type: CategoryType.EXPENSE,
    },

    {
        name: 'Other',
        icon: Icons.TRASH,
        color: Gradients.GRADIENT_12,
        type: CategoryType.EXPENSE,
    },
];

export { defaultCategories };
