require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const { validateToken } = require('./src/middleware/authMiddleware')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('public'));
app.use(cookieParser());

app.set('view engine', 'ejs');


// Routers
const authRouter = require('./src/routes/auth');
app.use("/auth", authRouter);

const apiRouter = require('./src/routes/api/api');
app.use("/api", apiRouter);
/***/

const fs = require('fs');
var banners = fs.readdirSync("./public/images/banner")
banners = banners.map(banner => {return banner = "public/images/banner/" + banner})
app.get('/', (req, res) => {
    res.render('home/home.ejs', {banners: banners});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });

