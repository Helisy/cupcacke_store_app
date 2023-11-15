module.exports = {
    type: {
        isIn:{
            options: [["dough", "filling", "cover", "decoration"]],
            errorMessage: 'Field type must have dough, filling, cover or decoration.',
        }
    }, 
    name: {
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: 'The value name must be at least 3 and max 100 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    selling_price :{
        isFloat:{
            options: {
                min: 0.1,
                max: 100
            },
            errorMessage: 'The value selling_price must be at least 0.1 and max 100.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    cost_price: {
        isFloat:{
            options: {
                min: 0.1,
                max: 100
            },
            errorMessage: 'The value cost_price must be at least 0.1 and max 100.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    ingredients: {
        isLength: {
            options: { min: 3, max: 255 },
            errorMessage: 'The value ingredients must be at least 3 and max 255 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    contains_allergens: {
        optional: {
            options: {
             nullable: true,
            }
         },
        isBoolean:{
            errorMessage: 'The value contains_allergens must be true or false, 1 or 0.',
        }
    },
    is_vegan: {
        optional: {
            options: {
             nullable: true,
            }
         },
        isBoolean:{
            errorMessage: 'The value is_vegan must be true or false, 1 or 0.',
        }
    },
    weight: {
        isInt: {
            errorMessage: 'The value weight must be an interger.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    calories: {
        isInt: {
            errorMessage: 'The value calories must be an interger.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }, 
    nutritional_info: {
        isLength: {
            options: { min: 3, max: 255 },
            errorMessage: 'The value nutritional_info must be at least 3 and max 255 characters.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    theme:{
        optional: {
            options: {
             nullable: true,
            }
         },
         isLength: {
             options: { min: 3, max: 30 },
             errorMessage: 'The value theme must be at max 30 characters.',
         },
    }
}