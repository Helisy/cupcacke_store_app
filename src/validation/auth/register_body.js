module.exports = {
    firstName: 
    {
        isLength: {
            options: { min: 3 },
            errorMessage: 'The value firstName must be at least 3 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
        matches: {
            options: [/[A-Za-z ]+$/, 'g'],
            errorMessage: 'The value firstName must not have especial characters and numbers.',
        }
    },
    lastName: 
    {
        isLength: {
            options: { min: 3 },
            errorMessage: 'The value lastName must be at least 3 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
        matches: {
            options: [/[A-Za-z]+$/, 'g'],
            errorMessage: 'The value lastName must not have especial characters and numbers.',
        }
    },
    email: 
    {
        notEmpty: {
            errorMessage: 'Empty field.',
        },
        isEmail: {
            errorMessage: 'Invalid email.',
        },
    },
    password: 
    {
        isLength: {
            options: { min: 6, max: 35 },
            errorMessage: 'The value password must be at least 6 chars a maximum of 35.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }
};
