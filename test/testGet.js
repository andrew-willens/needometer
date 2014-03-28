http = require('http');
nonce = require('nonce')();
CryptoJS = require('crypto-js');

// var hellofanonce = nonce();
// console.log(nonce())

// stringtosign = "GET\n" +
// 		"/explore/opendata/project%20data?\n"+
// 		(new Date())+"\n"
// 		+hellofanonce+"\n"+
// 		"fields=project.count\n"+
// 		"&limit=100\n"

// console.log(nonce())

signature = "fiTScS6iZK1vEalojDPODTajjp8=";
// console.log(JSON.stringify(CryptoJS.HmacSHA1(stringtosign, 'v1+2P0OO4A0OKbtknhZPzFJa9vneJzHN3bx')).toString("base64"))

var options = {
	host: 'hackingeducation.looker.com',
	path: "/explore/opendata/project%20data?",
	// port: 9999,
	method: "GET",
	nonce: "139594657534200",
	auth: 'AYTiT1530Nz2dBBngFNzYA:'+signature
};

http.request(options, function(res) {
	console.log('response received')
  console.log('STATUS: ' + res.statusCode);
  console.log("Error code: " + res.error_code);
  console.log("Error data: " + res.error_data);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).on('error', function(e) {
  console.log('problem with request: ' + e);
}).end();

