var express = require('express'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		logger = require('morgan'),
		errorHandler = require('errorhandler'),
		serveStatic = require('serve-static'),
		compression = require('compression'),
    http = require('http'),
    path = require('path'),
    config = require('./server-config'),
    fakeData = require('./fake-data');

var app = module.exports = express();

// paths
var root = path.join(__dirname, '../build')
		assets = path.join(root, 'assets');

// configuration
app.set('port', process.env.PORT || 8000);
app.use(bodyParser());
app.use(methodOverride());
app.use(logger('dev'));
app.use(compression());

// development only
if (app.get('env') === 'development') {
  app.use(errorHandler());
} else if (app.get('env') === 'production') {
  // TODO
}


// create yelp client
var yelp = require("yelp").createClient(config.yelpAuthInfo);

// routes
app.use('/data', function(req, res) {
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

app.use(serveStatic(root));
app.all('/*', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendfile('index.html', { root: root });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});