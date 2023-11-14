module.exports = 
{
    delivery_date:
    {
        isISO8601: {
            errorMessage: 'The delivery_date field must be datetime.',
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    items: 
    {
        isArray: {
            bail:true,
            options: {
              min: 0,
            },
        },
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    "items.*.product_id": {
        isInt: true,
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    },
    "items.*.quantity": {
        isInt: true,
        notEmpty: {
            errorMessage: 'Empty field.',
        },
    }
}