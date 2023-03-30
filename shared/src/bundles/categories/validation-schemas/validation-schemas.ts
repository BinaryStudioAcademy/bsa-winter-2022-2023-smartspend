import joi from 'joi';

import { CategoryValidationMessage } from '../categories.js';
import { type CategoryRequestDto } from '../types/types.js';

const categoryValidationSchema = joi.object<CategoryRequestDto, true>({
    name: joi
        .string()
        .trim()
        .required()
        .messages({ 'string.empty': CategoryValidationMessage.NAME_REQUIRE }),
    icon: joi.string().required(),
    color: joi.string().required(),
    type: joi.string().required(),
});

export { categoryValidationSchema };
