// dependencies
// var request = require('request'),
		path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    models = require('../models');

exports.index = function(req, res) {
	res.render('index');
};

exports.stateData = function(req, res) {
	console.log("querying mongo for "+req.params.state+" projects.");
	console.log(new Date());
	models.Project.find({"school_state": req.params.state }, function(err, projects){
		if (err) console.log(err);
		console.log(new Date())
		res.send({projects: projects})
	});
};

// module.exports = function(app){
//   // res.render('index', { title: 'Needometer' });

// 	//frontend routes ============================================================
// 	//route to handle all angular requests
// 	app.get('*', function(req, res) {
// 		res.sendfile('./public/views/index.html');// load our public/views/index.html file
// 	})
// };

