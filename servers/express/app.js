const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const os = require('os');
const fs = require('fs');


app.get('/home', function (req, res) { 
    // res.write("Hey there");
    res.sendFile(path.join(__dirname + '\\index.html'));
});

// app.get('/home', (req, res) => {
//     res.sendFile('index.html');
//     // fs.open('/webpages/index.html', (err, fd) => {
        
//     // })
//     // res.send("Hey");
//     res.end();
// });

// app.get('/articles', (req, res) => {
//     res.send("Hi");
//     res.end();
// });

// app.use('/', router);
app.listen(port, () => console.log("App started at port: " + port));