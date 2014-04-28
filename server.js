var express = require('express'),
    swig = require('swig'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express();

// rendering views
app.engine('html', swig.renderFile);
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);

// all environments
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.bodyParser()); // pull information from HTML to POST
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/:state', routes.stateData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
