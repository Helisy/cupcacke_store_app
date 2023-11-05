require('dotenv').config();

const { checkSchema, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

const database = require('../../../database');
const db = database();

const { isAuthenticated } = require('../../../middleware/authMiddleware');
const { response } = require('express');


router.get('/', (req, res) => {
    res.status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "",
            links: [
                {
                    href: "/api/v1/auth/register",
                    method: "POST"
                },
                {
                    href: "/api/v1/auth/login",
                    method: "POST"
                },
                {
                    href: "/api/v1/auth/logout",
                    method: "GET"
                },
            ]
        }
    );
});

router.get('/logout', async (req, res) => {
    res.cookie('acessToken', '', {maxAge: 1, httpOnly: true}).status(200).json(
        {
            method: "GET",
            error: false,
            code: 200,
            message: "Log out was successfully.",
            links: [
            ]
        }
    );
});


const registerValidation = require("../../../validation/auth/register_body")

router.post('/register', checkSchema(registerValidation), async (req, res) => {
    const {firstName, lastName, email, password, document_id, address_cep, address_number} = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({
            method: "POST",
            error: true,
            code: 400,
            message: "Incorrect field entry.",
            details: result.array()
            ,
            hints: [
            ],
            links: [
            ]
        })
    }

    const [rows_1] = await db.execute(`SELECT * FROM users WHERE email = '${email}'`)

    if(rows_1.length) return res.json({
        method: "POST",
        error: true,
        code: 400,
        message: "The value for email field is already registed.",
        details: [
            
        ],
        hints: [
            "Provide email that is not registed."
        ],
        links: [
        ]
    })

    bcrypt.hash(password, 10).then(async (hash) =>
    {
        let sql = `INSERT INTO users (first_name, last_name, email, password, document_id, address_cep, address_number) VALUES(?, ?, ?, ?, ?, ?, ?);`;
        await db.execute(sql, [firstName, lastName, email, hash, document_id, address_cep, address_number])

        res.status(201).json(
            {
                method: "POST",
                error: false,
                code: 201,
                message: "Register new user has been successfully.",
                links: [
                ]
            }
        );
    });
    return;
});

//Logs in the user
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    let sql = `SELECT * FROM users WHERE email = '${email}'`;
    const [rows] = await db.execute(sql)

    if(!rows.length) return res.json({
        method: "POST",
        error: true,
        code: 400,
        message: "This user does not exists.",
        details: [
            
        ],
        hints: [
            "Provide a registred email."
        ],
        links: [
        ]
    });

    bcrypt.compare(password, rows[0]['password']).then((match) =>
    {
        if(!match) return res.status(400).json({
            method: "POST",
            error: true,
            code: 400,
            message: "The given password is invalid.",
            details: [
            
            ],
            hints: [
            ],
            links: [
            ]
        })

        const acessToken = sign({
            firstName: rows[0].first_name, 
            lastName: rows[0].last_name,
            userId: rows[0].id,
            role: rows[0].role,
            verified: rows[0].verified  
        }, process.env.TOKEN_SECRETE);

        res.status(200).cookie('accessToken', acessToken, {httpOnly: true}).json({
            method: "POST",
            error: false,
            code: 200,
            message: "Log in was sucessfully.",
            links: [
            ]
        });
        return;
    });
});

//Logs in the user
router.post('/printer/login', async (req, res) => {
    const {email, password} = req.body;

    let sql = `SELECT * FROM users WHERE email = '${email}'`;
    const [rows] = await db.execute(sql)

    if(!rows.length) return res.status(400).json({error: "Usuário não encontrado"});

    bcrypt.compare(password, rows[0]['password']).then((match) =>
    {
        if(!match) return res.status(400).json({error: "Senha incorreta"})

        const acessToken = sign({
            firstName: rows[0].first_name, 
            lastName: rows[0].last_name,
            userId: rows[0].id,
            role: rows[0].role,
            verified: rows[0].verified  
        }, process.env.TOKEN_SECRETE);

        res.status(200).json({user: {firstName: rows[0].first_name, token: acessToken}});
        return;
    });
});



module.exports = router;