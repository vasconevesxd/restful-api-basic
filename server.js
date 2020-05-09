var fs = require("fs");
var data = fs.readFileSync("words.json");
var words = JSON.parse(data);


var express = require("express"); //access code from a node package
var app = express(); //With a reference to express, you can then create an express “app”

var server = app.listen(3000, listening);

function listening() {
  console.log("listening ....");
}

app.use(express.static("website")); //You can also serve static files.

app.get("/add/:word/:score?", addWord); // [?] Score is optional

function addWord(req, res) {
  // These variables refer to the HTTP request-response protocol. The user made a request and the server provides a response.

  var data = req.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;

  if (!score) {
    reply = {
      msg: "Score is required.",
    };
    res.send(reply);
  } else {
    words[word] = score;
    var data = JSON.stringify(words, null, 2);
    fs.writeFile("words.json", data, finished);

    function finished(err) {
      console.log("all set.");
      reply = {
        word: word,
        score: score,
        msg: "Success",
      };
      res.send(reply);
    }
  }
}

app.get("/all", sendAll); //Json -> javascript object notation

function sendAll(req, res) {
  res.send(words);
}

app.get("/search/:word/", searchWord);

function searchWord(req, res) {
  var word = req.params.word;
  var reply;
  if (words[word]) {
    reply = {
      status: "found",
      word: word,
      score: words[word],
    };
  } else {
    reply = {
      status: "not found",
      word: word,
    };
  }
  res.send(reply);
}
