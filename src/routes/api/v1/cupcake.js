require('dotenv').config();

const { checkSchema, validationResult, param, query } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');



router.get('/', query('category').isInt(), query('dough').isInt(), query('filling').isInt(), query('cover').isInt() , query('decoration').isInt(), async (req, res) => {
    const { q, category, dough, filling, cover, decoration} = req.query;

    var rows_1;
    if(q){
        var query = removeAp(q)

        const [rows] = await db.execute(`
        select cupcakes.*, a.name as dough_name, b.name as filling_name, c.name as cover_name, d.name as decoration_name
        from cupcakes
        join ingredients as a on cupcakes.dough = a.id
        join ingredients as b on cupcakes.filling = b.id
        join ingredients as c on cupcakes.cover = c.id
        join ingredients as d on cupcakes.decoration = d.id
        WHERE 
        MATCH (cupcakes.name) AGAINST ('${query}' IN NATURAL LANGUAGE MODE) or
        MATCH (a.name, a.ingredients) AGAINST ('${query}' IN NATURAL LANGUAGE MODE) or
        MATCH (b.name, b.ingredients) AGAINST ('${query}' IN NATURAL LANGUAGE MODE) or
        MATCH (c.name, c.ingredients) AGAINST ('${query}' IN NATURAL LANGUAGE MODE) or
        MATCH (d.name, d.ingredients) AGAINST ('${query}' IN NATURAL LANGUAGE MODE);
        `);
        rows_1 = rows;
        
    }else if(category){
        const [rows] = await db.execute(`select * from cupcakes where category_id = ${category};`);
        rows_1 = rows;
    }else if(dough){
        const [rows] = await db.execute(`select * from cupcakes where dough = ${dough};`);
        rows_1 = rows;
    }else if(filling){
        const [rows] = await db.execute(`select * from cupcakes where filling = ${filling};`);
        rows_1 = rows;
    }else if(cover){
        const [rows] = await db.execute(`select * from cupcakes where cover = ${cover};`);
        rows_1 = rows;
    }else if(decoration){
        const [rows] = await db.execute(`select * from cupcakes where decoration = ${decoration};`);
        rows_1 = rows;
    }else{
        const [rows] = await db.execute(`select * from cupcakes order by id desc`);
        rows_1 = rows;
    }



    var data = rows_1;

    for (let i = 0; i < rows_1.length; i++) {
        const [dough] = await db.execute(`select * from ingredients where id = ${rows_1[i].dough}`);
        const [filling] = await db.execute(`select * from ingredients where id = ${rows_1[i].filling}`);
        const [cover] = await db.execute(`select * from ingredients where id = ${rows_1[i].cover}`);
        const [decoration] = await db.execute(`select * from ingredients where id = ${rows_1[i].decoration}`);

        data[i].selling_price = dough[0].selling_price + filling[0].selling_price + cover[0].selling_price + dough[0].selling_price;
        data[i].cost_price = dough[0].cost_price + filling[0].cost_price + cover[0].cost_price + dough[0].cost_price;

        data[i].weight = dough[0].weight + filling[0].weight + cover[0].weight + dough[0].weight;
        data[i].calories = dough[0].calories + filling[0].calories + cover[0].calories + dough[0].calories;

        data[i].dough = dough[0];
        data[i].filling = filling[0];
        data[i].cover = cover[0];
        data[i].decoration = decoration[0];
    }

    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: data,
            links: [
                {
                    href: "/api/v1/cupcake/:id",
                    method: "GET"
                },
                {
                    href: "/api/v1/cupcake",
                    method: "POST"
                },
            ]
        }
    );
});


	

const registerValidation = require("../../../validation/cupcake/register_cupcake");

router.post('/', verifyToken, checkSchema(registerValidation), async (req, res) => {
    var { name, cover_image, description, category_id, dough_id, filling_id, cover_id, decoration_id } = req.body;

    if(req.user.role != "admin"){
        return res.status(401).json({
            method: "GET",
            error: true,
            code: 401,
            message: "You are not authorized to access this resource.",
            details: "Unauthorized"
            ,
            hints: [
            ],
            links: [
            ]
        })
    }

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            method: "POST",
            error: true,
            code: 400,
            message: "Incorrect entry.",
            details: result.array()
            ,
            hints: [
            ],
            links: [
            ]
        })
    }

    if(!category_id) category_id = null;

    await db.execute(`insert into cupcakes(name, cover_image, description, category_id, dough, filling, cover, decoration) values(?, ?, ?, ?, ?, ?, ?, ?);`, [name, cover_image, description, category_id, dough_id, filling_id, cover_id, decoration_id])

    res.status(201).json(
        {
            method: "POST",
            error: false,
            code: 201,
            message: "New cupcake created sucessfully",
            links: [
            ]
        }
    );
});



router.get('/:id', param('id').isInt(), async (req, res) => {
    const id = req.params.id;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            method: "GET",
            error: true,
            code: 400,
            message: "Incorrect param entry.",
            details: result.array()
            ,
            hints: [
            ],
            links: [
            ]
        })
    }

    const [rows_1] = await db.execute(`select * from cupcakes where id = ${id}`)

    if(rows_1.length < 1){
       return res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: data,
            links: [
            ]
        }
    );
    }

    var data = rows_1[0];

    const [dough] = await db.execute(`select * from ingredients where id = ${rows_1[0].dough}`);
    const [filling] = await db.execute(`select * from ingredients where id = ${rows_1[0].filling}`);
    const [cover] = await db.execute(`select * from ingredients where id = ${rows_1[0].cover}`);
    const [decoration] = await db.execute(`select * from ingredients where id = ${rows_1[0].decoration}`);

    data.selling_price = dough[0].selling_price + filling[0].selling_price + cover[0].selling_price + dough[0].selling_price;
    data.cost_price = dough[0].cost_price + filling[0].cost_price + cover[0].cost_price + dough[0].cost_price;

    data.weight = dough[0].weight + filling[0].weight + cover[0].weight + dough[0].weight;
    data.calories = dough[0].calories + filling[0].calories + cover[0].calories + dough[0].calories;

    data.dough = dough[0];
    data.filling = filling[0];
    data.cover = cover[0];
    data.decoration = decoration[0];


    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: data,
            links: [
            ]
        }
    );
});

router.get('/:id/review', param('id').isInt(), async (req, res) => {
    const id = req.params.id;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({
            method: "GET",
            error: true,
            code: 400,
            message: "Incorrect param entry.",
            details: result.array()
            ,
            hints: [
            ],
            links: [
            ]
        })
    }

    const [rows_1] = await db.execute(`select reviews.*, users.first_name from reviews join users on users.id = user_id where cupcake_id = ${id}`)

    

    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: rows_1,
            links: [
            ]
        }
    );
});

const reviewValidation = require("../../../validation/cupcake/register_review");

router.post('/:id/review', verifyToken, param('id').isInt(), checkSchema(reviewValidation), async (req, res) => {
    const { review } = req.body;
    const id = req.params.id;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            method: "POST",
            error: true,
            code: 400,
            message: "Incorrect entry.",
            details: result.array()
            ,
            hints: [
            ],
            links: [
            ]
        })
    }

    const [rows_1] = await db.execute(`select id from reviews where cupcake_id = ${id} and user_id = ${req.user.userId};`);

    if(rows_1.length > 0){
        return res.status(400).json({
            method: "POST",
            error: true,
            code: 400,
            message: "This user already reviwed this item.",
            details: [

            ],
            hints: [
            ],
            links: [
            ]
        })
    }

    const [rows_2] = await db.execute(`select orders_items.* from orders_items join orders on order_id = orders.id where cupcake_id = ${id} and client_id = ${req.user.userId};`);

    if(rows_2.length < 1){
        return res.status(400).json({
            method: "POST",
            error: true,
            code: 400,
            message: "This user has not made a order yet.",
            details: [
                
            ],
            hints: [
            ],
            links: [
            ]
        })
    }


    await db.execute(`insert into reviews(review, cupcake_id, user_id) values(?, ?, ?);`, [review, id, req.user.userId])

    res.status(201).json(
        {
            method: "POST",
            error: false,
            code: 201,
            message: "Review created sucessfuly.",
            data: [],
            links: [
            ]
        }
    );
});

function removeAp(string) {
    const regex = /'/g;
    return string.replace(regex, "");
}

// router.get('/', verifyToken, async (req, res) => {

//     const [rows_1] = await db.execute(`select * from cupcakes order by id desc`)

//     var data = rows_1;

//     for (let i = 0; i < rows_1.length; i++) {
//         const [dough] = await db.execute(`select * from ingredients where id = ${rows_1[i].dough}`);
//         const [filling] = await db.execute(`select * from ingredients where id = ${rows_1[i].filling}`);
//         const [cover] = await db.execute(`select * from ingredients where id = ${rows_1[i].cover}`);
//         const [decoration] = await db.execute(`select * from ingredients where id = ${rows_1[i].decoration}`);

//         data[i].dough = dough[0];
//         data[i].filling = filling[0];
//         data[i].cover = cover[0];
//         data[i].decoration = decoration[0];
//     }


//     res.status(200).json(
//         {
//             method: "GET",
//             error: false,
//             code: 200,
//             message: "",
//             data: data,
//             links: [
//             ]
//         }
//     );
// });





module.exports = router;