var restify = require('restify'),
    http = require('http');

var _ = require('underscore');


var constants = require('./databasefiles/sqlQueries');
var connection = require('./databasefiles/connection');
// var resourceAController = require('./controllers/resourceA');

//Create server instance
var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.CORS());

server.listen(constants.server.port, function () {
    console.log('Server listening on ' + constants.server.port);
});
var routes = require('./routes')(server);