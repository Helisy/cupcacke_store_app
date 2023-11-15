module.exports =
{
    name: {
        isLength: {
            options: { min: 3, max: 20 },
            errorMessage: 'The value name must be at least 3 and max 15 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }
}