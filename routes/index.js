//====================== dependencies ==========================================
var path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    models = require('../models')
		datalogic = require('./datalogic');
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
	console.log(new Date());
	models.Project.find({"school_state": state_abbr }, function(err, projects){
		if (err) console.log(err);

		var state_name = datalogic.state_abbrs[state_abbr],
				area_description_string = datalogic.makeAreaDescriptionString(projects),
				poverty_data_object = datalogic.formatPovertyData(projects, state_name);
				//var resource_data_array = datalogic.formatResourceData(projects);
				// var focus_subject_data_array = datalogic.formatFocusSubjectData(projects);

		// res.send({'area_name':state_name, 'area_description_string':area_description_string, 'poverty_data_array':poverty_data_object});
		console.log(new Date());
	});
};
//========================= end database query =================================