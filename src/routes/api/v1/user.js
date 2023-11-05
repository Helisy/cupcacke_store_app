require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');


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

module.exports = router;


