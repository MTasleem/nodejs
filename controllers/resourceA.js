var _ = require('underscore');
var mysql = require('mysql');
var cryptocipher = require('cryptocipher');
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");
// var crypto = require('crypto'),
//     algorithm = 'aes-256-ctr',
//     password = 'd6F3Efeq';
var crypto = require('crypto');
algorithm = 'aes-256-cbc',
    password = 'abcabcabc1abcabcabc1abcabcabc132';


// var crypto = require('crypto');
// var r_pass = crypto.randomBytes(128);
// var r_pass_base64 = r_pass.toString("base64");
// var base64 = require('base64-min');
// var crypto = require('crypto');

resourceA = {

    _summarize: [],
    connection: require('../databasefiles/connection'),
    sqlQueries: require('../databasefiles/sqlQueries'),

    validateData: function (req, res, masterkey) {
        var _connection = resourceA.connection.get;
        var key = '00000000000000000000000000000000';
        var iv = '0000000000000000';

        var bData = new Buffer(req.params, 'base64');

        // convert data to buffers
        var salt = bData.slice(0, 64);
        var iv = bData.slice(64, 76);
        var tag = bData.slice(76, 92);
        var text = bData.slice(92);

        // derive key using; 32 byte key length
        var key = crypto.pbkdf2Sync(masterkey, salt, 2145, 32, 'sha512');

        // AES 256 GCM Mode
        var decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);

        // encrypt the given text
        var decrypted = decipher.update(req.params, 'binary', 'utf8') + decipher.final('utf8');
    },
    getData: function (req, res, callback) {
        var _connection = resourceA.connection.get;
        var getVal = resourceA.sqlQueries.Get_All_Data;

        _connection.query(getVal, function (err, rows, fields) {
            if (err) {
                console.log(err);
                resourceA._summarize = [];
                callback(req, res);
                return;
            } else {
                resourceA._summarize = [];
                _.each(rows, function (d) {
                    resourceA._summarize.push(d);
                });
                res.json(resourceA._summarize);
                callback(req, res);
                return;
            }
        });
    },

    updateData: function (req, res) {
        var _connection = resourceA.connection.get;
        var query = _connection.query("UPDATE userDetail SET username =?,userpassword =? WHERE id =? ", [req.params.name, req.params.password, req.params.id], function (err, rows) {
            if (err) {
                res.json(err);
            }
        });
    },
    deleteData: function (req, res) {
        // console.log(req.params);
        var _connection = resourceA.connection.get;
        var query = _connection.query("delete from  userDetail WHERE id =? ", [req.params], function (err, rows) {
            if (err) {
                res.json(err);
            }
        });
        // console.log(query);
    },
    getAllCountry: function (req, res) {
        var _connection = resourceA.connection.get;
        var query = _connection.query("select *  from  Country", function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    },
    getAllStates: function (req, res) {
        var _connection = resourceA.connection.get;
        var query = _connection.query("select *  from  countryState", function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    },
    getAllCities: function (req, res) {
        var _connection = resourceA.connection.get;
        var query = _connection.query("select *  from  stateCity", function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    },
    postRegistrationForm: function (req, res) {
        var _connection = resourceA.connection.get;
        console.log(req.params);
        var query = _connection.query("insert into registration VALUES ?" + [req.params.fName, req.params.lName, req.params.email, req.params.password, req.params.mobile, req.params.address, req.params.pin, req.params.country, req.params.state, req.params.city, req.params.repassword],
            function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        console.log(query)

    }
}

module.exports = resourceA