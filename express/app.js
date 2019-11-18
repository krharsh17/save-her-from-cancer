const express = require('express');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;
var bodyParser = require('body-parser');
const path = require('path');
const os = require('os');
const fs = require('fs');

var usersDB = "SaveHerFromCancerUsers"
var usersDBurl = "mongodb://localhost:27017/" + usersDB;

app.use(express.static(__dirname + '/pages'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '\\pages\\homepage.html'));
    // res.end();
});

app.get('/survivor%20stories', function (req, res) {
    res.sendFile(path.join(__dirname + '\\pages\\survivor stories.html'));
    //res.send();
});

app.get('/types%20of%20cancer', function (req, res) {
    res.sendFile(path.join(__dirname + '\\pages\\types of cancer.html'));
});

app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname + '\\pages\\articles.html'))
    // res.end();
});

app.get('/Nearest%20Centers', function (req, res) {
    res.sendFile(path.join(__dirname + '\\pages\\nearest centres.html'))
});

app.get('/create%20article', function (req, res) {
    res.sendFile(path.join(__dirname, '\\pages\\create article.html'));
});

app.get('/self%20diagnosis', function (req, res) {
    res.sendFile(path.join(__dirname, '\\pages\\self diagnosis.html'));
})

app.post('/createArticle', function (req, res) {
    var title = req.body.title;
    var id = Date.now();
    var author = req.body.author;
    var content = req.body.content;

    MongoClient.connect(usersDBurl, function (err, client) {
        var db = client.db("mongodb");
        if (err) {
            throw err
        };

        db.collection("users").find({
            id: parseInt(author)
        }).toArray(function (err, result) {
            if (err || result.length <= 0) {
                res.write("FAILED");
                res.end();
            }

            var article = {
                title: title,
                id: id,
                author: result[0].name + " | " + new Date().toLocaleString(),
                content: content
            }

            db.collection("articles").insertOne(article, function (err, result) {
                console.log(result);
                res.write("SUCCESSFUL");
                res.end();
            });


        });



    });
});

app.get('/input', (req, res) => {

    MongoClient.connect(usersDBurl, function (err, client) {
        var db = client.db("mongodb");
        if (err) {
            throw err
        };

        var article = {
            title: "Ovarian Cancer",
            id: Date.now(),
            author: "Amy S., Ovarian Cancer Survivor | 23-11-2019",
            content: "Historically, ovarian cancer was called the“ silent killer” because symptoms were not thought to develop until the chance of cure was poor.However, " +
            "recent studies have shown this term is untrue and that the following signs are much more likely to occur in women with ovarian cancer than in women in the general population, " +
            "even in patients with early - stage disease.<br><br>" +

            "These symptoms include:<br>" +

                "Bloating<br>" +
            "Pelvic or abdominal pain<br>" +
            "Difficulty eating or feeling full quickly<br>" +
            "Urinary symptoms(urgency or frequency)<br>" +
            "Women with ovarian cancer report that symptoms are persistent and represent a change from normal " +
            "for their bodies.The frequency or number of ovarian cancer signs are key factors in the diagnosis of ovarian cancer.Several studies show that even early - stage ovarian cancer can produce these symptoms.<br><br>" +

            "Women who have these symptoms almost daily " +
            "for more than a few weeks should see their doctor, " +
            "preferably a gynecologist.Prompt medical evaluation may lead to detection at the earliest possible stage of the disease.Early - stage diagnosis is associated with an improved prognosis.Several other symptoms have been commonly reported by women with ovarian cancer.These symptoms include fatigue, " +
            "indigestion, " +
            "back pain, " +
            "pain with intercourse, " +
            "constipation, " +
            "and menstrual irregularities.However, " +
            "these other symptoms are not as useful in identifying ovarian cancer because they are also found in equal frequency in women in the general population who do not have ovarian cancer.<br><br>"
        }



        db.collection("type").insertOne(article, function (err, result) {
            console.log(result);
        });

        // db.collection("stories").deleteMany({});

        if (err) throw err;

    });
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '\\pages\\login.html'))
    // res.end();
});


app.get('/article', (req, res) => {
    console.log(req.query.id);
    fs.readFile(path.join(__dirname + '\\pages\\article.html'), (err, data) => {
        MongoClient.connect(usersDBurl, function (err, client) {
            var db = client.db("mongodb");
            if (err) {
                throw err
            };

            db.collection("articles").find({
                id: parseInt(req.query.id)
            }).toArray(function (er, result) {
                console.log(result);

                var title = result[0].title;
                var author = result[0].author;
                var content = result[0].content;

                var dataArr = data.toString().split("$");
                var file = dataArr[0] + title + dataArr[1] + author + dataArr[2] + content + dataArr[3];

                var id = "id";

                fs.writeFile(path.join(__dirname + '\\pages\\articletemp.html'), file, (err) => {
                    res.sendFile(path.join(__dirname + '\\pages\\articletemp.html'));

                });
            });

            if (err) throw err;

        });
    })
});

app.get('/story', (req, res) => {
    console.log(req.query.id);
    fs.readFile(path.join(__dirname + '\\pages\\article.html'), (err, data) => {
        MongoClient.connect(usersDBurl, function (err, client) {
            var db = client.db("mongodb");
            if (err) throw err;

            db.collection("stories").find({
                id: parseInt(req.query.id)
            }).toArray(function (err, result) {
                console.log(result);

                var title = result[0].title;
                var author = result[0].author;
                var content = result[0].content;

                var dataArr = data.toString().split("$");
                var file = dataArr[0] + title + dataArr[1] + author + dataArr[2] + content + dataArr[3];

                fs.writeFile(path.join(__dirname + '\\pages\\storytemp.html'), file, (err) => {
                    res.sendFile(path.join(__dirname + '\\pages\\storytemp.html'));

                });

            });
        });
    })
});

app.get('/type', (req, res) => {
    console.log(req.query.id);
    fs.readFile(path.join(__dirname + '\\pages\\type of cancer.html'), (err, data) => {
        MongoClient.connect(usersDBurl, function (err, client) {
            var db = client.db("mongodb");
            if (err) throw err;

            db.collection("type").find({
                id: parseInt(req.query.id)
            }).toArray(function (err, result) {
                console.log(result);

                var title = result[0].title;
                var author = result[0].author;
                var content = result[0].content;

                var dataArr = data.toString().split("$");
                var file = dataArr[0] + title + dataArr[1] + author + dataArr[2] + content + dataArr[3];

                fs.writeFile(path.join(__dirname + '\\pages\\typetemp.html'), file, (err) => {
                    res.sendFile(path.join(__dirname + '\\pages\\typetemp.html'));

                });

            });
        });
    })
});

app.get('/centre_data', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.sendFile(path.join(__dirname + '\\pages\\centres.xml'));
});

app.get('/fetch_articles', (req, res) => {
    MongoClient.connect(usersDBurl, function (err, client) {
        var db = client.db("mongodb");
        if (err) {
            throw err
        };

        db.collection("articles").find({}).toArray(function (err, articles_list) {
            var articles = [];
            articles_list.forEach(function (val, index, arr) {
                articles.push(val);
            });
            res.send(articles);
            res.end();
        });

    });
});

app.get('/fetch_stories', (req, res) => {
    MongoClient.connect(usersDBurl, function (err, client) {
        var db = client.db("mongodb");
        if (err) {
            throw err
        };

        db.collection("stories").find({}).toArray(function (err, articles_list) {
            var articles = [];
            articles_list.forEach(function (val, index, arr) {
                articles.push(val);
            });
            res.send(articles);
            res.end();
        });

    });
});

app.get('/fetch_types', (req, res) => {
    MongoClient.connect(usersDBurl, function (err, client) {
        var db = client.db("mongodb");
        if (err) {
            throw err
        };

        db.collection("type").find({}).toArray(function (err, articles_list) {
            var articles = [];
            articles_list.forEach(function (val, index, arr) {
                articles.push(val);
            });
            res.send(articles);
            res.end();
        });

    });
});

app.get('/create%20story', (req, res) => {
    res.sendFile(path.join(__dirname, '\\pages\\create story.html'));
});

app.post('/createStory', (req, res) => {
    var title = req.body.title;
    var id = Date.now();
    var author = req.body.author;
    var content = req.body.content;

    MongoClient.connect(usersDBurl, function (err, client) {
        var db = client.db("mongodb");
        if (err) {
            throw err
        };

        db.collection("users").find({
            id: parseInt(author)
        }).toArray(function (err, result) {
            if (err || result.length <= 0) {
                res.write("FAILED");
                res.end();
            }

            var article = {
                title: title,
                id: id,
                author: result[0].name + " | " + new Date().toLocaleString(),
                content: content
            }

            db.collection("stories").insertOne(article, function (err, result) {
                console.log(result);
                res.write("SUCCESSFUL");
                res.end();
            });


        });



    });
});



// app.use('/', router);
app.listen(port, () => console.log("App started at port: " + port));