require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const { validateToken, checkToken } = require('./src/middleware/authMiddleware')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('public'));
app.use(cookieParser());

app.set('view engine', 'ejs');


// // Routers
// const authRouter = require('./src/routes/auth');
// app.use("/auth", authRouter);

const apiRouter = require('./src/routes/api/api');
app.use("/api", apiRouter);
// /***/




const fs = require('fs');
var banners = fs.readdirSync("./public/images/banner")
banners = banners.map(banner => {return banner = "public/images/banner/" + banner})
app.get('/', checkToken, (req, res) => {
    res.render('home/home.ejs', {banners: banners, username: req.user?.firstName});
});

app.get('/product', checkToken, (req, res) => {
    res.redirect('/', {username: req.user?.firstName});
});

app.get('/cart', checkToken, (req, res) => {
    res.render('cart/cart.ejs', {username: req.user?.firstName});
});

app.get('/payment', validateToken, (req, res) => {
    res.render('payment/payment.ejs', {username: req.user?.firstName});
});

app.get('/payment/sucess', validateToken, (req, res) => {
    res.render('payment/sucess.ejs', {username: req.user?.firstName});
});

app.get('/auth/login', checkToken, checkToken, (req, res) => {
    res.render('auth/login.ejs', {username: req.user?.firstName});
});

app.get('/auth/register', checkToken, (req, res) => {
    res.render('auth/register.ejs', {username: req.user?.firstName});
});

app.get('/search', checkToken, (req, res) => {
    res.render('search/search.ejs', {username: req.user?.firstName});
});

app.get('/product/:id', checkToken, (req, res) => {
    const {id} = req.params;

    if(isNaN(parseInt(id))){
        return  res.redirect('/');
    }

    res.render('product/product.ejs', {username: req.user?.firstName});
});




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });

