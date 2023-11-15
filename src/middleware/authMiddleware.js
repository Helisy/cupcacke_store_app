require('dotenv').config();

const { verify } = require('jsonwebtoken');


//Verifies if the the accessToken in the cookies is valid.
const validateToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) return res.redirect('/auth/login');

    verify(accessToken, process.env.TOKEN_SECRETE, (err, user) =>{
        if (err) return res.sendStatus(403);
        req.user = user;
        return next();
    });
}

//Verifies is the user is already logged.
const isAuthenticated = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) return next();

        verify(accessToken, process.env.TOKEN_SECRETE, (err, user) =>{
        if (err) return res.sendStatus(403);
        req.user = user;
        res.redirect('/');
    });
}

const checkToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) return next();

    verify(accessToken, process.env.TOKEN_SECRETE, (err, user) =>{
        if (err) return res.sendStatus(403);
        req.user = user;
        return next();
    });
}

const verifyToken = (req, res, next) => {
    const accessToken = req.headers['token'] || req.cookies.accessToken;

    if(!accessToken) return res.status(403).json({
        method: req.method,
        error: true,
        code: 403,
        message: "An access token is needed to access this resource.",
        details: [

        ],
        hints: [
            "Provide an access token by the header key 'token'"
        ],
        links: [
        ]
    });

    verify(accessToken, process.env.TOKEN_SECRETE, (err, user) =>{
        if (err) return res.status(403).json({
            method: req.method,
            error: true,
            code: 403,
            message: "The access token provided is invalid.",
            details: [

            ],
            hints: [
            ],
            links: [
            ]
        });
        req.user = user;
        return next();
    });
}

module.exports = { validateToken, isAuthenticated, checkToken, verifyToken };