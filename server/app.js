/* jslint node: true */
'use strict';

var express = require('express');
var app = express();
var path = require('path');

// If no env is set, default to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var staticFiles = path.resolve(__dirname, '..', 'app');

// development only
app.configure('development', function() {
  app.use(require('connect-livereload')());
});

// production only
app.configure('production', function(){
  app.set('db uri', 'n.n.n.n/prod');
});

// all environments
app.configure(function(){
  app.set('title', 'My Application');

  app.set('view engine', 'html');
  app.set('views', staticFiles);

  app.use(express.static(staticFiles));
});



app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(3000);

console.log('Server started');