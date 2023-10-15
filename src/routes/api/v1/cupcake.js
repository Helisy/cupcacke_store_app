require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');



router.get('/', verifyToken, async (req, res) => {
    //DO search

    const [rows_1] = await db.execute(`select * from cupcakes order by id desc`)

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
    const {name, description, dough_id, filling_id, cover_id, decoration_id } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({
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

    await db.execute(`insert into cupcakes(name, description, dough, filling, cover, decoration) values(?, ?, ?, ?, ?, ?);`, [name, description, dough_id, filling_id, cover_id, decoration_id])

    res.status(200).json(
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



router.get('/:id', verifyToken, param('id').isInt(), async (req, res) => {
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

router.get('/', verifyToken, async (req, res) => {

    const [rows_1] = await db.execute(`select * from cupcakes order by id desc`)

    var data = rows_1;

    for (let i = 0; i < rows_1.length; i++) {
        const [dough] = await db.execute(`select * from ingredients where id = ${rows_1[i].dough}`);
        const [filling] = await db.execute(`select * from ingredients where id = ${rows_1[i].filling}`);
        const [cover] = await db.execute(`select * from ingredients where id = ${rows_1[i].cover}`);
        const [decoration] = await db.execute(`select * from ingredients where id = ${rows_1[i].decoration}`);

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
            ]
        }
    );
});





module.exports = router;