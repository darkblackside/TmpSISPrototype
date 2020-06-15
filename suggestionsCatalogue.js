const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const suggestions = new Map();

var id = 1;

app.get('/', function (req, res) {
    res.json([...suggestions]);
});

app.use(bodyParser.json());
app.post('/:suggestion', function (req, res) {
    var suggestion = req.params.suggestion + (id++);

    if(suggestion && req.body.name && req.body.suggestion && req.body.reason) {
        suggestions.set(suggestion, req.body)
        res.json(req.body);
    } else {
        res.status(400).send("Unsupported format, please provide name of suggestion in URL and name, suggestion and reason in body");
    }

});

app.delete('/:suggestion', function (req, res) {
    var suggestion = req.params.suggestion;
    suggestions.delete(suggestion);
    res.status(200).send("OK");
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
