const express = require('express');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;
const path = require('path');
const os = require('os');
const fs = require('fs');

var usersDB = "SaveHerFromCancerUsers"
var usersDBurl = "mongodb://localhost:27017/" + usersDB;



app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '\\pages\\homepage.html'));
    // res.end();
});

app.get('/survivor%20stories', function (req, res) {
    res.sendFile(path.join(__dirname + '\\pages\\survivor stories.html'));
    //res.send();
});

app.get('/types-of-cancer', function (req, res){
    res.sendFile(path.join(__dirname + '\\pages\\types of cancer.html'));
});

app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname + '\\pages\\articles.html'))
    // res.end();
});

app.get('/input', (req, res) => {
    MongoClient.connect(usersDBurl, function (err, client) {
        var db = client.db("mongodb");
        if (err) {
            throw err
        };

        var article = {
            title: "Inside Knowledge (gynecologic cancer)",
            id: "1",
            author : "Ana R., Cervical Cancer Survivor | 23-11-2019",
            content: "I was diagnosed with Stage 2 cervical cancer (adenocarcinoma) at age 36. I was a single mother with two children, ages 6 and 8.\n" +

            "I had abnormal Pap smears starting 8 years prior, when I was pregnant with my daughter. I was never told that I had HPV, even though I did. After each abnormal Pap test result, I would have a LEEP and colposcopy. They always came back clear, and my gynecologist/obstetrician would send me on my way. [Editor’s note: During colposcopy, the doctor uses an instrument to magnify the cervix to see any abnormal cells. Often the doctor takes a small sample of tissue (biopsy) to be checked for cancer and other abnormalities. LEEP—short for loop electrosurgical excision procedure—uses electric current passed through a thin wire loop to remove abnormal tissue.]\n" +
            
            "And then, I had abnormal bleeding. I thought it was from a poorly placed IUD. I went to my gynecologist, who said, “You know, you have this history, and you have HPV, and so I’m going to do a Pap, but this time I’ll sample cells a little higher up in your cervix.”\n" +
            
            "I got abnormal results again and scheduled yet another colposcopy for the day before Thanksgiving. I still really wasn’t concerned. I got the results on December 15th, three days before my school’s winter break. My doctor called while I was teaching and said, “I have your results. You have cancer. I can’t treat you, and I have referred you to an oncologist. They will be calling today. You probably will have to have a hysterectomy.” I left work, and sat in my car, in shock. I sat there for maybe 45 minutes before the tears came. I had no idea what to expect. All I knew was I could not die, I had two babies who needed me.\n" +
            
            "That Christmas was spent going for exams, scans, meeting with oncologists and radiologists, and chemo doctors to set my plan for treatment. On New Year’s Eve, I had my first laparoscopic surgery. [Editor’s note: In laparoscopic surgery, a thin, tube-like instrument called a laparoscope is inserted into the abdomen through a small incision. This helps the doctor view and remove tissue to be checked under a microscope for signs of disease.] The surgeon removed my fallopian tubes and moved my ovaries out of the field of the radiation that I would soon be getting.\n" +
            
            "Six weeks later, I started weekly chemotherapy appointments and 28 rounds of external radiation. I continued this for six weeks and then had three more rounds of internal radiation. My body was exhausted. We moved in with my parents so they could help get me to appointments and shuttle my kids to and from school and their activities.\n" +
            
            "And then, in April, it was over. My doctors sent me home, telling me, “You’re done. We will see you in six months.” I was petrified. There was no way to know whether they had gotten all of the cancer. Then I started having a lot of discharge. My radiologist and oncologist told me it was healing due to radiation. They told me to wait a month and it will get better…wait three months and it should be gone. After six months I was done waiting. I knew there was something still wrong.\n" +
            
            "It was at this point that I went to get my first second opinion. I was worried my gynecologic oncologist would be upset at me for not trusting her. But I knew I needed to advocate for myself. When I got the second opinion, the doctor said, “There is most likely residual cancer.” I couldn’t believe it. I had a radical hysterectomy two weeks later. [Editor’s note: A gynecologic oncologist is a doctor who specializes in diagnosing and treating cancers that begin in a woman’s reproductive organs. A radical hysterectomy is surgery to remove the uterus, cervix, and part of the vagina. The ovaries, fallopian tubes, and nearby lymph nodes may also be removed.]\n" +
            
            "After the surgery, I was told that they had gotten clear margins and there was no evidence of disease. Yay! But a few days later, I began having extreme pain in my kidneys. I found out that my ureters (what attaches your kidneys to your bladder) were damaged from radiation on both sides of my body.\n" +
            
            "In January of 2017, I had major reconstructive surgery on my bladder and ureters. I was sent home with a catheter and stents in both ureters, to aid in the healing process. It was painful and cumbersome. Finally, six weeks later, the stents and catheter were removed.\n" +
            
            "October 5th, 2017, was my first cancerversary. With a clear PET/CT scan, I was officially one year free from cancer. But my Pap test showed more precancerous cells. This time they were VAIN lesions, vaginal intraepithelial neoplasia, level 2. [Editor’s note: Precancerous cells in the vagina are called vaginal intraepithelial neoplasia, or VAIN. Most women who develop VAIN do not go on to develop cancer. VAIN is caused by HPV infection.]\n" +
            
            "Again, I called to get a second opinion on the treatment recommended for me. This time I wasn’t worried about offending anyone. I wanted to advocate for my health and take matters into my own hands. The second opinion confirmed the course of treatment recommended by my oncologist.\n" +
            
            "Since January 2018, I have been cancer- and lesion-free. I would never choose to go through this battle, but I choose to see the blessings in the experience of having cancer. I learned to listen to my body and advocate for myself. I learned that it’s okay to get a second opinion. I learned that I have countless family and friends who are here to support me, sitting with me during chemo, driving me to radiation, watching my children, cooking meals, laughing with me, crying with me, advocating for me when I didn’t have the ability to do so on my own. And in the case of my mom, doing anything and everything I needed, sometimes even before I knew I needed it. But most of all I learned that I am strong. Every time I thought I couldn’t make it, I couldn’t go on, every time I wanted to give up, I dug deeper. I kept finding more strength.\n" +
            
            "I want women to know they need to take care of themselves. Don’t skip your annual exams, and if you feel something is amiss with your body, don’t worry about bothering doctors or upsetting them. This is your life! I also want people to know that my generation could potentially be the LAST generation to have cervical cancer. We can eradicate this disease by vaccinating our children, daughters AND sons. This is my mission now: to share my story so that others don’t have to go through what I went through."
        }



        db.collection("stories").insertOne(article, function(err, result){
            console.log(result);
        } );

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
                id: req.query.id
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
        MongoClient.connect(usersDBurl, function(err, client) {
            var db = client.db("mongodb");
            if(err) throw err;

            db.collection("stories").find({
                id: req.query.id
            }).toArray(function(err, result){
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

// app.use('/', router);
app.listen(port, () => console.log("App started at port: " + port));