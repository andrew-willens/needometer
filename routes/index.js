// dependencies
var path = require('path'),
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


