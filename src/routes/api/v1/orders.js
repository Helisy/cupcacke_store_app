require('dotenv').config();

const { checkSchema, validationResult, param } = require('express-validator');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { verifyToken } = require('../../../middleware/authMiddleware');


router.get('/', verifyToken, async (req, res) => {
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

module.exports = router;


