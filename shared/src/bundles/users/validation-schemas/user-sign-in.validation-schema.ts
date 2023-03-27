import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
    email: joi
        .string()
        .pattern(
            new RegExp(
                '^[a-zA-Z0-9._%+-]{1,15}@(?=.{3,15}$)[a-zA-Z0-9.-]{1,}\\.[a-zA-Z]{1,}$',
            ),
        )
        .email({
            tlds: {
                allow: false,
            },
        })
        .required()
        .messages({
            'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
        }),
    password: joi.string().trim().min(8).max(30).required().messages({
        'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
        'string.min': UserValidationMessage.PASSWORD_MIN,
        'string.max': UserValidationMessage.PASSWORD_MAX,
    }),
});

export { userSignIn };
