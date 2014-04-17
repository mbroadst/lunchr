var express = require('express'),
		votes = express.Router();

votes.post('/', function(req, res) {
	res.json({action: "POST"});
});

votes.get('/', function(req, res) {
	res.json({action: "LIST"});
});

votes.get('/:id', function(req, res) {
	res.json({action: "SHOW"});
});

module.exports = votes;
