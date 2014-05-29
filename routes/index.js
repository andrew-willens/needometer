//====================== dependencies ==========================================
var path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    models = require('../models')
formatdata = require('./formatdata');
//====================== end dependencies ======================================


//==============================================================================
exports.index = function(req, res) {
	models.State.find({}, function(err, states){
    if (err) throw(err);
    models.Topology.findOne({}, function(err, topo){

      res.render('index', {'states': states, 'topology': {arcs: topo.arcs, transform: topo.transform, type: topo.type}});
    })
  })
};
//==============================================================================


//================ query database for dataset specified by GET =================
exports.areaData = function(req, res) {
	var area_id = req.params.area_id,
			filter_string = req.params.query,
			area_name,
			area_description_string,
			area_data;

	console.log("Querying mongodb for "+area_id+" projects.");
	console.log(new Date()); //timestamp = start time of mongodb query

  // models.Project.find() is the functionality that access MongoDB
  // it is located in models/index.js
  models.Project.find({"school_state": area_id }, function(err, projects){
		if (err) console.log(err);

    // formatdata is a module passed in from routes/formatdata.js
		var area_name = formatdata.state_abbrs[area_id],
				area_description_string = formatdata.makeAreaDescriptionString(projects, area_name);
				area_data = formatdata.selectVisualization(filter_string, area_name, projects);

		// this data sent to/used by getChartData(), in js/data/fetchData.js
    // res.send() is an Express.js function
		res.send({'area_name':area_name, 'area_description_string':area_description_string, 'area_data':area_data });
		console.log(new Date()); //timestamp = end time of mongodb query
	});
};
//========================= end database query =================================