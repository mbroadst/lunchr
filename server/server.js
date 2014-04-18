var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    serveStatic = require('serve-static'),
    compression = require('compression'),
    path = require('path'),
    fs = require('fs'),
    socketio = require('socket.io'),
    mongoose = require('mongoose');

// paths
var root = path.join(__dirname, '../build')
    assets = path.join(root, 'assets');

// configuration
var app = module.exports = express();
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

// database
mongoose.connect('mongodb://localhost/lunchr');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // load all models
  fs.readdirSync(__dirname + '/models').forEach(function (file) {
    if (~file.indexOf('.js')) {
      console.log("loading: " + __dirname + '/models/' + file);
      require(__dirname + '/models/' + file);
    }
  });

  app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    io = socketio.listen(this);

    // routes
    app.use('/api/choices', require('./routes/choices'));
    app.use('/api/votes', require('./routes/votes')(io));
    app.use(serveStatic(root));
    app.all('/*', function(req, res) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendfile('index.html', { root: root });
    });

  });
});
