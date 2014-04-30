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

		poverty_data = formatPovertyData(projects);


		// res.send({state_name:state_name, project_resources:resource_data_array, data_type:"Resources"})
		console.log(new Date());
	});
};
//==============================================================================


//============================ data formatting logic =============================//

		//======================= format poverty data ==============================
			function formatPovertyData(dataArray) {
				var povertyData = {};
				var povertyDataArray =[];
				dataArray.forEach(function(project){
					if (!povertyData[project.poverty_level]) {
						povertyData[project.poverty_level] = 1;
					} else {
						povertyData[project.poverty_level]++;
					}
				})

				for (var val in povertyData){
					povertyDataArray.push({'type':val, 'count':povertyData[val]});
				}

				povertyData = povertyDataArray;
				return povertyData;
			};
		//======================= end format poverty data ==========================


		//============================ format resource data =========================
			function formatResourceData(dataArray) {
				var resourceData = {};
				var resourceDataArray =[];

				dataArray.forEach(function(project){
					if (!resourceData[project.resource_type]) {
						resourceData[project.resource_type] = 1;
					} else {
						resourceData[project.resource_type]++;
					}
				})

				for (var val in resourceData){
					resourceDataArray.push({'type':val, 'count':resourceData[val]});
				}

				resourceData = resourceDataArray;
				return resourceData;
			}
		//====================== end format resource data ==========================

		// //======================= format resources data =========================
		// var state_name = state_abbrs[req.params.state];
		// 		resource_data = {},
		// 		resource_data_array = [];
		// projects.forEach(function(project) {
		// 	if (!resource_data[project.resource_type]) {
		// 		resource_data[project.resource_type] = 1;
		// 	} else {
		// 		resource_data[project.resource_type]++;
		// 	}
		// });

		// for (var val in resource_data) {
		// 	resource_data_array.push({'type':val, 'count':resource_data[val]});
		// }
		// //======================= end format resources data =====================



		// //======================= format focus subject data =====================
				function formatFocusSubjectData(dataArray){
					var subjectData = {};
					var subjectDataArray =[];

					dataArray.forEach(function(project){
						if (!subjectData[project.primary_focus_subject]) {
							subjectData[project.primary_focus_subject] = 1;
						} else {
							subjectData[project.primary_focus_subject]++;
						}
					})

					for (var val in subjectData){
						subjectDataArray.push({'type':val, 'count':subjectData[val]});
					}

					subjectData = subjectDataArray;
					return subjectData
				}
		//======================= end format focus subject data ====================


		//======================= format text "snapshot" data ======================
		function summableProperties(dataArray){
			var properties = ['num_donors', 'total_donations', 'students_reached'];
			var all_prop_obj = {
				'projects': 0
			};

			dataArray.forEach(function(project){
				all_prop_obj.projects++;
				properties.forEach(function(prop){
					if (!all_prop_obj[prop]) {
						all_prop_obj[prop] = project[prop];
					} else {
						all_prop_obj[prop] += project[prop];
					}
				})
			});
			return all_prop_obj;
		}
		//=================== end format text "snapshot" data ======================


		//==============================================================================
		function reformat_D3_amCharts(data, category, name) {
			var titles_text, dataProvider;

			if (category === "poverty") {
				titles_text = "Poverty";
				dataProvider = data.poverty;
			} else if (category === "resource") {
				titles_text = "Resources";
				dataProvider = data.resource;
			} else {
				titles_text = "Subjects";
				dataProvider = data.subject;
			}

			return {
				"type": "pie",
				"theme": "none",
				"titles": [{
					"text": titles_text+" in "+name,
					"size": 16
				}],
				"dataProvider": dataProvider,
		    "valueField": "count",
		    "titleField": "type",
		    "startEffect": "elastic",
		    "startDuration": 2,
		    "labelRadius": 15,
		    "innerRadius": "50%",
		    "depth3D": 10,
		    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
		    "angle": 15
			};
		}
		//==============================================================================



		//==============================================================================
		function reformat_D3_amCharts2(data, category, name) {
		  var titles_text = "Subjects",
		      dataProvider = data.subject;

		  var colors = [
		    "#FF0F00", "#FF6600", "#FF9E01", "#FCD202", "#F8FF01", "#B0DE09",
		    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
		    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
		    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
		    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
		    "#754DEB", "#DDDDDD", "#999999", "#333333", "#000000"
		  ];

		  for (var i=0; i<dataProvider.length; i++) {
		    dataProvider[i].color = colors[i];
		  }

		  return {
		    "theme": "none",
		    "type": "serial",
		    "startDuration": 2,
		    "dataProvider": dataProvider,
		    "valueAxes": [{
		      "position": "left",
		      "title": "Subjects in "+name
		    }],
		    "graphs": [{
		      "balloonText": "[[category]]: <b>[[value]]</b>",
		      "colorField": "color",
		      "fillAlphas": 1,
		      "lineAlpha": 0.1,
		      "type": "column",
		      "valueField": "count"
		    }],
		    "depth3D": 20,
		    "angle": 30,
		    "rotate": true,
		    "chartCursor": {
		      "categoryBalloonEnabled": false,
		      "cursorAlpha": 0,
		      "zoomable": false
		    },
		    "categoryField": "type",
		    "categoryAxis": {
		      "gridPosition": "start",
		      "labelRotation": 90
		    }
		  }
		}
		//==============================================================================

//============================ end data formatting logic ========================//
