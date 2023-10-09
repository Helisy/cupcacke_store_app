require('dotenv').config();

const { verify } = require('jsonwebtoken');


//Verifies if the the acessToken in the cookies is valid.
const validateToken = (req, res, next) => {
    const acessToken = req.cookies.acessToken;

    if(!acessToken) return res.redirect('/auth/login');

    verify(acessToken, process.env.TOKEN_SECRETE, (err, user) =>{
        if (err) return res.sendStatus(403);
        req.user = user;
        return next();
    });
}

//Verifies is the user is already logged.
const isAuthenticated = (req, res, next) => {
    const acessToken = req.cookies.acessToken;

    if(!acessToken) return next();

        verify(acessToken, process.env.TOKEN_SECRETE, (err, user) =>{
        if (err) return res.sendStatus(403);
        req.user = user;
        res.redirect('/');
    });
}

const verifyToken = (req, res, next) => {
    const acessToken = req.headers['token'] || req.cookies.acessToken;

    if(acessToken === undefined) return res.status(401).json({
        method: req.method,
        error: true,
        code: 401,
        message: "An acess token is needed to access this resource.",
        details: result.array(),
        hints: [
            "Provide an access token by the header key 'token'"
        ],
        links: [
        ]
    });

    verify(acessToken, process.env.TOKEN_SECRETE, (err, user) =>{
        if (err) return res.status(403).json({
            method: req.method,
            error: true,
            code: 401,
            message: "The access token provided is invalid.",
            details: result.array(),
            hints: [
            ],
            links: [
            ]
        });
        req.user = user;
        return next();
    });
}

module.exports = { validateToken, isAuthenticated, verifyToken };