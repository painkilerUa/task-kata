"use strict";
const config = require('./config');
const app = require('express')();
const log = require('./utils');
const routs = require('./router')
const models = require('./models');


const PORT = process.env.PORT || config.port;
let server;
if(!config.debug){
    var options = {
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







app.use('/', routs());



models.sequelize.sync().then(() => {
        server.listen(PORT, () => {
        log.info('Server is running on port ' + PORT + '...');
    });
});
