'use strict';

// env
require('dotenv').config();

// babel, to transpile mainly jsx but any non node features
// for isomorphic rendering
require('babel-register')({
  only: /components\//
});

// app
const express = require('express');
const app = express();
app.set('dirname', __dirname);

// compression
if (app.get('env') === 'production') {
  var compression = require('compression');
  app.use(compression());
}

// static
app.use('/public',express.static('public'));

// views
var path = require('path');
app.set('views', path.join(__dirname, 'src/html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// body
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1024mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit: '1024mb' }));

// override methods from forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// routes
const Routes = require('./src/js/server/routes');
Routes.init(app);

app.listen(process.env.PORT || 7000, function(){
  console.log('Server up on', process.env.PORT || 7000);
});