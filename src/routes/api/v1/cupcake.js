require('dotenv').config();

const { checkSchema, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');
const { response } = require('express');


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

//next routs

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