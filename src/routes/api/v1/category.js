require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');

router.get('/', async (req, res) => {
    const { q } = req.query;

    var rows_1;

    if(q){
        var query = q.replaceAll("'", '"');

        const [rows] = await db.execute(`select * from categories where name = '${query}';`);
        rows_1 = rows;
    }else{
        const [rows] = await db.execute(`select * from categories;`);
        rows_1 = rows;
    }

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

    const [rows_1] = await db.execute(`select * from categories where id = ${id};`);

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


const registerValidation = require("../../../validation/category/category_register");

router.post('/', verifyToken, checkSchema(registerValidation), async (req, res) => {
    const { name } = req.body;

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

    await db.execute("insert into categories(name) values(?);", [name])

    res.status(201).json(
        {
            method: "POST",
            error: false,
            code: 201,
            message: "New category created sucessfully",
            links: [
            ]
        }
    );
});


module.exports = router;


