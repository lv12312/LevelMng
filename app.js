var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var expressLayouts = require('express-ejs-layouts');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (app.get('env') === 'development') {
  app.use(logger('dev'));

  var webpack = require('webpack');
  var webpackConfig = require('./build/webpack.dev.conf');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    lazy: false,
    // noInfo:true,
    stats: {
      colors: true,
      chunks: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

  app.use(express.static('./static'))
}
else {
  var FileStreamRotator = require('file-stream-rotator');
  var compression = require('compression');
  var logDirectory = __dirname + '/logs';
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
  });
  app.use(compression());
  app.use(logger('combined', {stream: accessLogStream}));
  app.use(express.static(path.join(__dirname, './dist')));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('*', function (req, res, next) {
  if (app.get('env') == 'development') {
    console.log('>>>>>:', req.baseUrl);
  }
  res.locals.title = 'Vue webpack';
  res.locals.description = 'Vue webpack web';
  next();
});

app.use('*', require('./middlewares/hashedAssets')(path.resolve(__dirname, './config/webpack-assets.json')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
