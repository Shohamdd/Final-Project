const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const CONFIG = require('./config/conf');
const router = require('./routes/index');

app.use(bodyparser.json());


//Configuring express server
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/',  router);


app.listen(CONFIG.running_port, () => {
    console.log(`Listening To The Port Number ${CONFIG.running_port}`)
})