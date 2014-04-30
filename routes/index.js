//====================== dependencies ==========================================
var path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    models = require('../models')
formatdata = require('./formatdata');
//====================== end dependencies ======================================


//==============================================================================
exports.index = function(req, res) {
	res.render('index');
};
//==============================================================================


//================ query database for dataset specified by GET =================
exports.stateData = function(req, res) {
	var state_abbr = req.params.state;
	console.log("Querying mongodb for "+state_abbr+" projects.");
	console.log(new Date()); //timestamp = start time of mongodb query
	models.Project.find({"school_state": state_abbr }, function(err, projects){
		if (err) console.log(err);

		var state_name = formatdata.state_abbrs[state_abbr],
				area_description_string = formatdata.makeAreaDescriptionString(projects, state_name),
				poverty_data_object = formatdata.formatPovertyData(projects, state_name),
				resource_data_array = formatdata.formatResourceData(projects, state_name),
				focus_subject_data_array = formatdata.formatFocusSubjectData(projects, state_name);

		// this data sent to/used by getChartData(), in js/data/fetchData.js
		res.send({'area_name':state_name, 'area_description_string':area_description_string, 'poverty_data_object':poverty_data_object, 'resource_data_array':resource_data_array, 'focus_subject_data_array':focus_subject_data_array });
		console.log(new Date()); //timestamp = end time of mongodb query
	});
};
//========================= end database query =================================