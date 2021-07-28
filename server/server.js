'use strict'
let express = require('express');
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
// const corsOptions = {
//     origin: 'http://localhost:5000',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }
app.use(cors({origin: true}));

app.use('/users',require('./UsersRouter.js'));
app.use('/products',require('./ProductsRouter.js'));
app.use('/orders',require('./OrdersRouter.js'));
app.use('/streets',require('./StreetsRouter'));

app.listen(5000, () => {
    console.log('listening on 5000');
});






