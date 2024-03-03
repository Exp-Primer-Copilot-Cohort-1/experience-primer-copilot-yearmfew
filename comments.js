// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the server
var server = app.listen(5000, function () {
    console.log('Server is running..');
});

// Path: /comments
// Get all the comments
app.get('/comments', function (req, res) {
    var data = fs.readFileSync('comments.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

// Path: /comments
// Add a new comment
app.post('/comments', function (req, res) {
    var data = JSON.parse(fs.readFileSync('comments.json'));
    data.push(req.body);
    fs.writeFileSync('comments.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
}