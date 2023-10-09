require('dotenv').config();

const express = require('express');
const router = express.Router();

const database = require('../../database');
const db = database();

const { isAuthenticated } = require('../../middleware/authMiddleware');
const { response } = require('express');

router.get('/', (req, res) => {
    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "Welcome to * API.",
            links: [
                {
                    href: "/api/v1",
                    method: "GET"
                }
            ]
        }
    );
});

const v1Router = require('./v1/v1');
router.use("/v1", v1Router);

router.use((req, res) => {
    res.status(404).json(
        {
            method: req.method,
            error: true,
            code: 404,
            message: "'" + req.originalUrl + "'" + " was not found.",
            hints: [
                "Can not request " + req.method.toLocaleLowerCase() + " to " + "'" + req.originalUrl + "'."
            ],
            links: [
            ]
        }
    );
});

module.exports = router;