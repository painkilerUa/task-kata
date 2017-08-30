"use strict";
const config = require('./config');
const app = require('express')();
const log = require('./utils/index');
const routs = require('./router');
const models = require('./models');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || config.port;
let server;
if(!config.debug){
    let options = {
        key: fs.readFileSync('keys/privkey.pem'),
        cert: fs.readFileSync('keys/cert.pem')
    };
    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", config.domain);
        res.setHeader('Access-Control-Allow-Credentials', true);
        return next();
    });
    server = require('https').createServer(options, app);
}else{
    server 	= require('http').createServer(app);
}

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

app.use('/', routs());



models.sequelize.sync().then(() => {
        server.listen(PORT, () => {
        log.info('Server is running on port ' + PORT + '...');
    });
});
