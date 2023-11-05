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
            options: [/[A-Za-z\s]+$/, 'g'],
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
    },
    document_id: 
    {
        isLength: {
            options: { min: 11, max: 11 },
            errorMessage: 'The value document_id must be 11 chars length.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    address_cep: 
    {
        isLength: {
            options: { min: 8, max: 8 },
            errorMessage: 'The value address_cep must be 8 chars length.',
        },
        notEmpty: {
            errorMessage: 'Empty field.', 
        },
    },
    address_number: 
    {
        isLength: {
            options: { min: 1, max: 6 },
            errorMessage: 'The value address_number must be at least 1 chars a maximum of 6.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    } 
};
