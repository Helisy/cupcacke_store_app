module.exports =
{
    name: {
        isLength: {
            options: { min: 3, max: 15 },
            errorMessage: 'The value name must be at least 3 and max 15 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    description: {
        isLength: {
            options: { min: 6, max: 250 },
            errorMessage: 'The value description must be at least 6 and max 250 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    discount: {
        isFloat:{
            options: {
                min: 1,
                max: 500
            },
            errorMessage: 'The value discount must be at least 1 and max 500.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    is_percentage: {
        isBoolean:{
            errorMessage: 'The value is_percentage must be true or false, 1 or 0.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    minimum_value: {
        isFloat:{
            options: {
                min: 5,
                max: 1000
            },
            errorMessage: 'The value minimum_value must be at least 5 and max 1000.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    expires_in: {
        isISO8601: {
            errorMessage: 'The expires_in field must be datetime.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
}