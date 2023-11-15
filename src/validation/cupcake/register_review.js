module.exports = {
    review: {
        isLength: {
            options: { min: 3, max: 255 },
            errorMessage: 'The value review must be at least 3 and max 100 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }
};


