/**
 * Module dependencies.
 */

var express = require('express'),
    swig = require('swig'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express();

// rendering views
app.engine('html', swig.renderFile);
app.set('port', process.env.PORT || 3000);
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

// looker GET request setup
// var options = {
//   host: 'https://hackingeducation.looker.com/explore/opendata',
//   port: 3000,
//   method = 'GET'
//   token: 'AYTiT1530NZ2dBBnGFNzYA',
//   secret: 'v1+2P0OO4A0OKbtknhZPzFJa9vneJzHN3bx'
// };

// var options = "GET /api/dictionaries/faa/queries/airports?fields=airports.city,airports.state&filters[state]=GA HTTP/1.1"
// "test.llooker.com" + "\n" +
// "Tue, 19 Jun 2012 14:35:56 -0700" + "\n" +
// "QHgM302Yt1CL1Uk6fNybAA:Dbl4spJ0opW9V4sJbO51UBUQy8w=" + "\n" +
// "a1a4ebdd7c9c864d7c2ee57424605dde544eb0e2";

// <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha1.js"></script>
// var hash = CryptoJS.HmacSHA1("Message", "a1a4ebdd7c9c864d7c2ee57424605dde544eb0e2");

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// // write data to request body
// req.write('data\n');
// req.write('data\n');
// req.end();



// application -------------------------------------------------------------
// app.get('*', function(req, res) {
  // res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
