var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var sign_up_server_port = 8081;
var login_server_port = 8082;

var RESPONSE_DUPLICATE = "DUPLICATE";
var RESPONSE_SUCCESSFUL = "SUCCESSFUL";
var RESPONSE_FAILED = "FAILED";
var RESPONSE_TIMED_OUT = "TIMED OUT";
var RESPONSE_INVALID_CRED = "INVALID CREDENTIALS";


var usersDB = "SaveHerFromCancerUsers"
var usersDBurl = "mongodb://localhost:27017/" + usersDB;

http.createServer(function (request, response) {
    request.on('data', function (message) {
        var messageString = message.toString().split(" ");
        var email = messageString[0];
        var password = messageString[1];
        var userName = messageString[2];
        var userType = messageString[3];
        var userLocation = messageString[4];

        MongoClient.connect(usersDBurl, function (err, client) {
            var db = client.db("mongodb");
            if (err) {
                throw err
            };

            var userID = "user_" + Math.floor(Math.random() * 1000000000);
            var user = {
                id: userID,
                name: userName,
                email: email,
                password: password,
                user_type: userType,
                location: userLocation
            }

            db.collection("users").find(user).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                if (result.length <= 0){
                    db.collection("users").insertOne(user, function(error, result){
                        if(error){
                            response.write(error.toString());
                            response.end();
                        } else {
                            response.write(RESPONSE_SUCCESSFUL);
                            response.end();
                        }
                    });
                }else{
                    response.write(RESPONSE_DUPLICATE);
                    response.end();
                }
            });
        });
    });
}).listen(sign_up_server_port);

http.createServer(function(request, response){

    request.on('data', function(message){
        var messageString = message.toString().split(" ");
        var email = messageString[1];
        var password = messageString[0];

        db.collection("users").find({email: email}).toArray(function(err, result){
            if(err || result.length<=0){
                response.write(RESPONSE_FAILED);
                response.end();
            } else {
                if(result[0].data().password === password){
                    response.write(RESPONSE_SUCCESSFUL);
                    response.write("\ntoken: " + result[0].data().id);
                    response.end();
                } else {
                    response.write(RESPONSE_FAILED);
                    response.write(RESPONSE_INVALID_CRED);
                    response.end();
                }
            }
        });
    });
}).listen(login_server_port);