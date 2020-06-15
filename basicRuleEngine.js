const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const request = require('request');

const valuesMap = new Map();
const suggestionCatalogueUrl = "http://localhost:4000/";

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
        oldValue = valuesMap.get(itemname);
        valuesMap.set(itemname, req.body);

        if(!oldValue || oldValue != req.body) {
            console.log(req.body);
            sendSuggestions();
        }

        res.send(req.body);
    } else {
        res.status(400).send("Unsupported format, please provide item in URL and value in body");
    }
});

function sendSuggestions() {
    if(valuesMap.has('insideTemp') &&
        valuesMap.has('outsideTemp') &&
        valuesMap.has('diffTemp') &&
        valuesMap.has('windowOpen')) {
        if(valuesMap.get('diffTemp') > 0 && valuesMap.get('insideTemp') > 25 && valuesMap.get('windowOpen') == 'False') {
            sendSuggestion("openWindows", "Windows", "Open Windows", "Temperature too high");
        }
    }
    // More rules go in here!
}

function sendSuggestion(identifier, name, suggestion, reason) {
    var options = {
        'method': 'POST',
        'url': suggestionCatalogueUrl + identifier,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name":name,"suggestion":suggestion,"reason":reason})
        
    };
    console.log(options.url);
    request(options, function (error, response) { 
    if (error) throw new Error(error);
        console.log(response.body);
    });
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
