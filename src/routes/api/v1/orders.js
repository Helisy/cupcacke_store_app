require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
    const [rows_1] = await db.execute(`select * from orders order by id desc;`);

    var info = rows_1;

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

    for (let i = 0; i < rows_1.length; i++) {
        const [rows_2] = await db.execute(`select * from orders_items where order_id = ${rows_1[i].id}`);
        info[i].items = rows_2;
    }

    res.status(201).json(
        {
            method: "GET",
            error: false,
            code: 201,
            message: "",
            data: info,
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

router.get('/current', verifyToken, async (req, res) => {
    const [rows_1] = await db.execute(`select * from orders where client_id = ${req.user.userId} order by id desc;`);

    var info = rows_1;

    for (let i = 0; i < rows_1.length; i++) {
        const [rows_2] = await db.execute(`select * from orders_items where order_id = ${rows_1[i].id};`);
        info[i].items = rows_2;
    }

    res.status(201).json(
        {
            method: "GET",
            error: false,
            code: 201,
            message: "",
            data: info,
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

    const [rows_1] = await db.execute(`select * from orders where id = ${id} order by id desc;`);

    var info = rows_1;

    const [rows_2] = await db.execute(`select * from orders_items where order_id = ${rows_1[0].id};`);
    info[0].items = rows_2;

    res.status(201).json(
        {
            method: "GET",
            error: false,
            code: 201,
            message: "",
            data: info,
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

const crate_order_verification = require("../../../validation/orders/create_order");
router.post('/', verifyToken, checkSchema(crate_order_verification), async (req, res) => {
    const {delivery_date, items, coupon} = req.body;
    // const [rows_1] = await db.execute(`select * from ingredients order by id desc`)



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

    await db.execute(`insert into orders(delivery_date, client_id) values(STR_TO_DATE('${delivery_date}', '%Y-%m-%dT%H:%i:%s.%fZ'), ${req.user.userId});`);

    const [rows_1] = await db.execute(`select * from orders order by id desc limit 1`);

    for (let i = 0; i < items.length; i++) {
        const [rows_2] = await db.execute(`select cupcakes.*, sum(a.selling_price + b.selling_price + c.selling_price + d.selling_price) as selling_price from cupcakes join ingredients a on cupcakes.dough = a.id join ingredients b on cupcakes.filling = b.id join ingredients c on cupcakes.cover = c.id join ingredients d on cupcakes.decoration = d.id where cupcakes.id = ${items[i].product_id} group by id;`);
        var discValue = 0;
        if(coupon){
            if(coupon.is_percentage == 1){
                discValue = rows_2[0].selling_price - (rows_2[0].selling_price * (coupon.discount / 100));
            }else{
                discValue = rows_2[0].selling_price - (coupon.discount / items.length);
            }
        }

        db.execute(`insert into orders_items(order_id, cupcake_id, quantity, unity_price) values(?, ?, ?, ?);`, [rows_1[0].id, items[i].product_id, items[i].quantity, discValue]);
    }

    res.status(201).json(
        {
            method: "POST",
            error: false,
            code: 201,
            message: "",
            data: "Order created sucessfully.",
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

module.exports = router;


