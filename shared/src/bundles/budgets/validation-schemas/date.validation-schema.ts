import joi from 'joi';

const dateSchema = joi.object({
    name: joi.string().required(),
    amount: joi.number().required(),
    currency: joi.string().required(),
    categories: joi.array().items(joi.string()).required(),
    recurrence: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().greater(joi.ref('startDate')).messages({
        'date.greater': 'End date must be greater than start date',
    }),
});

export { dateSchema };
