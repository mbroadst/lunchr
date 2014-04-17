var express = require('express'),
		choices = express.Router(),
		fakeData = require('./fake-data');

choices.get('/', function(req, res) {
	/*
	yelp.search({term: "food", location: "19406"}, function(error, data) {
	  if (!!error) {
	  	res.json(error);
	  	return;
	  }

	  res.json(data);
	});
	*/

	res.json(fakeData);
});

module.exports = choices;
