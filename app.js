const express = require('express');
const app = express();
port = process.env.PORT || 8080;

const fetch = require('node-fetch');
const bodyParser = require('body-parser');
var url, resp;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    url = "https://wordsapiv1.p.rapidapi.com/words/?random=true&frequencyMin=4&lettersMax=15";
    resp = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": process.env.API_KEY
        }
    });
    const randomWord = await resp.json();
    res.render('index.ejs', {
        word: randomWord.word,
    });
})

app.listen(port);