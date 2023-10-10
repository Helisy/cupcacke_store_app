module.exports = {
    name: {
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: 'The value title must be at least 3 and max 100 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    description: {
        optional: {
           options: {
            nullable: true,
           }
        },
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: 'The value description must be at max 255 characters.',
        },
    }, 
    dough_id: {
        isInt: {
            errorMessage: 'The value dough_id must be an interger.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    filling_id: {
        isInt: {
            errorMessage: 'The value dough_id must be an interger.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    cover_id: {
        isInt: {
            errorMessage: 'The value dough_id must be an interger.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    decoration_id: {
        isInt: {
            errorMessage: 'The value dough_id must be an interger.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }
};


