var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var DBurl = "mongodb://localhost:8081/mydb";


var sign_up_server_port = 8081;

http.createServer(function (request, response) {

    request.on('data', function (message) {
        var messageString = message.toString().split(" ");
        var email = messageString[0];
        var password = messageString[1];
        var userName = messageString[2];
        var userType = messageString[3];
        var userLocation = messageString[4];

        MongoClient.connect(DBurl, function (err, db) {
            if (err) {
                // response.write(err);
                // response.end();
                throw err
            };
            var user = {
                name: userName,
                email: email,
                password: password,
                user_type: userType,
                location: userLocation
            }

            console.log(user);
            dbo.collection("users").insertOne(user, function (err, res) {
                if (err) {
                    // response.write(err);
                    // response.end();
                    throw err;
                }
                response.write("1 document inserted");
                db.close();
                response.end();
            });
        });
    });
}).listen(sign_up_server_port);