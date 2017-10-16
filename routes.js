//Modules dependencies
var restify = require('restify'),
    http = require('http');

var _ = require('underscore');
var resourceAController = require('./controllers/resourceA');
module.exports = function (server) {
    //ROUTES
    server.get('/api/resourcea', function (req, res) {
        console.log('resourcea');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    });
    server.get('/getData', resourceAController.getData);
    server.post('/validateData', resourceAController.validateData);
    server.post('/updateData', resourceAController.updateData);
    server.post('/deleteData', resourceAController.deleteData);
    server.get('/getAllCountry', resourceAController.getAllCountry);
    server.get('/getAllStates', resourceAController.getAllStates);
    server.get('/getAllCities', resourceAController.getAllCities);
    server.post('/postRegistrationForm', resourceAController.postRegistrationForm);
};