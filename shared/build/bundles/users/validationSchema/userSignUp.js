import joi from 'joi';
import ValidationMessageEnum from '../enums/ValidationMessageEnum';
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
        'string.email': ValidationMessageEnum.EMAIL_WRONG,
        'string.empty': ValidationMessageEnum.EMAIL_REQUIRE,
    }),
    password: joi.string().trim().required(),
});
export { userSignUp };
