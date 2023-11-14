require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');


router.get('/', verifyToken, async (req, res) => {
    //DO search

    const [rows_1] = await db.execute(`select * from ingredients order by id desc`)

    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: rows_1,
            links: [
                // {
                //     href: "/api/v1/cupcake/:id",
                //     method: "GET"
                // },
                // {
                //     href: "/api/v1/cupcake",
                //     method: "POST"
                // },
            ]
        }
    );
});

const registerValidation = require("../../../validation/ingredient/register_ingredients");

router.post('/', verifyToken, checkSchema(registerValidation), async (req, res) => {
    var { type, name, selling_price, cost_price, ingredients, contains_allergens, is_vegan, weight, calories, nutritional_info, theme } = req.body;

    if(req.user.role != "admin"){
        return res.json({
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


    if(!theme) theme = null;
    if(!contains_allergens) contains_allergens = 1;
    if(!is_vegan) is_vegan = 0;

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

    await db.execute(`insert into ingredients(type, name, selling_price, cost_price, ingredients, contains_allergens, is_vegan, weight, calories, nutritional_info, theme) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [type, name, selling_price, cost_price, ingredients, contains_allergens, is_vegan, weight, calories, nutritional_info, theme])

    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 201,
            message: "New cupcake ingredient added sucessfully",
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

    const [rows_1] = await db.execute(`select * from ingredients where id = ${id}`)

    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: rows_1[0],
            links: [
            ]
        }
    );
});


module.exports = router;


