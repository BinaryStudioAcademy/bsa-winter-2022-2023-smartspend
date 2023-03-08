import joi from 'joi';
import { UserValidationMessage } from '../enums/enums.js';
const userSignUp = joi.object({
    email: joi
        .string()
        .trim()
        .email({
        tlds: {
            allow: false,
        },
    })
        .required()
        .messages({
        'string.email': UserValidationMessage.EMAIL_WRONG,
        'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
    password: joi.string().trim().required(),
});
export { userSignUp };
