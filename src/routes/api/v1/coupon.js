require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
    const { q } = req.query;

    var rows_1;

    if(!q){
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

        const [rows] = await db.execute(`select * from coupons;`);
        rows_1 = rows;
    }else{
        var query = q.replaceAll("'", '"')
        const [rows] = await db.execute(`select * from coupons where name = '${query}';`);
        rows_1 = rows;
    }


    if(!q){
        const [rows] = await db.execute(`select * from coupons;`);
        rows_1 = rows;
    }else{
        var query = removeAp(q);
        const [rows] = await db.execute(`select * from coupons where name = '${query}';`);
        rows_1 = rows;
    }

    

    res.status(201).json(
        {
            method: "GET",
            error: false,
            code: 201,
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

    const [rows_1] = await db.execute(`select * from coupons where id = ${id};`);

    res.status(201).json(
        {
            method: "GET",
            error: false,
            code: 201,
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


const registerValidation = require("../../../validation/coupon/coupon_register");

router.post('/', verifyToken, checkSchema(registerValidation), async (req, res) => {
    const { name, description, discount, is_percentage, minimum_value, expires_in } = req.body;

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

    if(is_percentage && discount > 80){
        return res.json({
            method: "POST",
            error: true,
            code: 400,
            message: "The value discount must be less than 80 when is_percentage is true.",
            details: result.array()
            ,
            hints: [
            ],
            links: [
            ]
        })
    }

    if(!is_percentage && discount > minimum_value){
        return res.json({
            method: "POST",
            error: true,
            code: 400,
            message: "The value discount can not be less than the minimum_value.",
            details: result.array()
            ,
            hints: [
            ],
            links: [
            ]
        })
    }


    await db.execute(`insert into coupons(name, description, discount, is_percentage, minimum_value, expires_in) values(?, ?, ?, ?, ?, ?);`, [name, description, discount, is_percentage, minimum_value, expires_in])

    res.status(201).json(
        {
            method: "POST",
            error: false,
            code: 201,
            message: "New coupon created sucessfully",
            links: [
            ]
        }
    );
});

function removeAp(string) {
    const regex = /'/g;
    return string.replace(regex, "");
}


module.exports = router;


