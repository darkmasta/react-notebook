var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

var app = express();

app.use(cors());

app.use(require("body-parser").urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

app.post("/save-notebook", jsonParser, function(req, res) {
  let data = req.body;
  let path = __dirname + "/notebooks/" + data.docName;
  fs.writeFile(path, data.text, function(err) {
    if (err) return console.log(err);
    console.log("File saved!");
    res.json(data);
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
