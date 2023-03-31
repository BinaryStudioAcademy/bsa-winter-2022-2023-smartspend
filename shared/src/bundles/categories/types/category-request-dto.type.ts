import { type CategoryType } from '../enums/enums.js';

type CategoryRequestDto = {
    name: string;
    icon: string;
    color: string;
    type: CategoryType;
};
export { type CategoryRequestDto };
