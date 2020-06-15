const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const valuesMap = new Map();
const suggestionCatalogueUrl = "http://localhost";

app.get('/', function (req, res) {
    res.json(Array.from(valuesMap.keys()));
});

app.get('/:itemname', function (req, res) {
    var itemname = req.params.itemname;
    console.log(itemname);

    if(valuesMap.has(itemname)) {
        res.send(valuesMap.get(itemname));
    } else {
        res.status(404).send("Not found");
    }
});

app.use(bodyParser.text());
app.post('/:itemname', function (req, res) {
    var itemname = req.params.itemname;
    if(req.body) {
        valuesMap.set(itemname, req.body);
        res.send(req.body);
        sendSuggestions();
    } else {
        res.status(400).send("Unsupported format, please provide item in URL and value in body");
    }
});

function sendSuggestions() {
    if(valuesMap.has('insideTemp') &&
        valuesMap.has('outsideTemp') &&
        valuesMap.has('diffTemp')) {
        if(valuesMap.get('diffTemp') > 0 && valuesMap.get('insideTemp') > 25) {
            // TODO send suggestion to open windows to suggestionCatalogueUrl
            console.log("Suggestion: Open window")
        }
    }
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
