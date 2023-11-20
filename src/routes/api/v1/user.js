require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');

const axios = require('axios');

router.get('/current', verifyToken, async (req, res) => {
    const [rows_1] = await db.execute(`select first_name, last_name, email, address_cep, address_number, created_at, updated_at from users where id = ${req.user.userId};`)

    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: rows_1[0],
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

router.get('/current/address', verifyToken, async (req, res) => {
    const [rows_1] = await db.execute(`select address_cep, address_number from users where id = ${req.user.userId};`)

    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            data: rows_1[0],
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

router.get('/cep/:id', param('id').isInt(), async (req, res) => {
    const id = req.params.id;

    var address = {};

    await axios.get(`https://viacep.com.br/ws/${id}/json/`)
    .then(function (res) {
        address = res.data;
    })
    .catch(function (error) {
    console.log(error);
    })

    res.status(200).json(
        {
            method: "POST",
            error: false,
            code: 200,
            message: "",
            data: address,
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


