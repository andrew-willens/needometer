//====================== dependencies ==========================================
var path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    models = require('../models');
//====================== end dependencies ======================================



//======================= data-manipulation helper variables ===================
var state_abbrs = { AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'Washington D.C.',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming' }
//======================= end data-manipulation variables ===================


//==============================================================================
exports.index = function(req, res) {
	res.render('index');
};
//==============================================================================


//==============================================================================
exports.stateData = function(req, res) {
	console.log("Querying mongodb for "+req.params.state+" projects.");
	console.log(new Date());
	models.Project.find({"school_state": req.params.state }, function(err, projects){
		if (err) console.log(err);
		console.log(new Date())

		//======================= format data ========================
		var state_name = state_abbrs[req.params.state];
				resource_data = {},
				resource_data_array = [];
		projects.forEach(function(project) {
			if (!resource_data[project.resource_type]) {
				resource_data[project.resource_type] = 1;
			} else {
				resource_data[project.resource_type]++;
			}
		});

		for (var val in resource_data) {
			resource_data_array.push({'type':val, 'count':resource_data[val]});
		}
		//======================= end format data =====================


		res.send({state_name:state_name, project_resources:resource_data_array, data_type:"Resources"})
	});
};
//==============================================================================


