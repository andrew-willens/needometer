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
  WY: 'Wyoming'
}
//======================= end data-manipulation variables ======================


//======================= create area description string =======================
		// Create a string describing the area queried for - number of donors,
		// total $ donated, and number of students reached.
		function makeAreaDescriptionString(projects_array, area_name){
			var properties = ['num_donors', 'total_donations', 'students_reached'];
			var all_properties_object = {
				'projects': 0
			};
			var commaInserter = function(number) {
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			};

			projects_array.forEach(function(project){
				all_properties_object.projects++;
				properties.forEach(function(property){
					if (!all_properties_object[property]) {
						all_properties_object[property] = project[property];
					} else {
						all_properties_object[property] += project[property];
					}
				})
			});

			var description_string = "<h2>"+area_name+"</h2><p>"+commaInserter(all_properties_object.num_donors)+
				" donors contributed $"+commaInserter(Math.floor(all_properties_object.total_donations))+
				" to "+commaInserter(all_properties_object.projects)+" projects, reaching "+
				commaInserter(all_properties_object.students_reached)+" students.</p>";

			return description_string;
		}
//=================== end create area description string =======================



//=============== select visualization for which to format =====================
		function selectVisualization(filter_string, area_name, projects) {
			switch (filter_string) {
				case "poverty":
					return formatdata.formatPovertyData(projects, area_name);
					break;
				case "resource":
					return formatdata.formatResourceData(projects, area_name);
					break;
				case "focus_subject":
					return formatdata.formatFocusSubjectData(projects, area_name);
					break;
			}
		};
//====================== end select visualization ==============================


//======================= format poverty data ==================================
		// format poverty data for AMCharts.js. "poverty data" = stratify entries
		// (projects) in this dataset by the value of their "poverty_level" attribute.
		// poverty_level is a metric for socioeconomic well-being of the area
		// the DonorsChoose project would benefit
		function formatPovertyData(data_array, area_name) {
			var poverty_data = {},
			poverty_data_array =[],
			// data_type_for_chart_header will be concatenated into the header/title of the chart generated on the UI.
			// ie: "DonorsChoose Projects Organized by "+[data_type_for_chart_header]+" in "+area_name;
			data_type_for_chart_header = "Level of Poverty";

			data_array.forEach(function(project){
				if (!poverty_data[project.poverty_level]) {
					poverty_data[project.poverty_level] = 1;
				} else {
					poverty_data[project.poverty_level]++;
				}
			})

			for (var val in poverty_data){
				poverty_data_array.push({'type':val, 'count':poverty_data[val]});
			}

			poverty_data = formatDataForPieChart(poverty_data_array, "Poverty", area_name);
			return poverty_data;
		};
//======================= end format poverty data ==============================


//============================ format resource data ============================
		// format resource data for AMCharts.js. ie, stratify entries (projects)
		// in this dataset by the value of their "resource_type" attribute,
		// ie what did the DonorsChoose project seek funding for? pencils? books?
		// a fieldtrip?
		function formatResourceData(data_array, area_name) {
			var resource_data = {},
					resource_data_array =[],
					// data_type_for_chart_header will be concatenated into the header/title of the chart generated on the UI.
					// ie: "DonorsChoose Projects Organized by "+[data_type_for_chart_header]+" in "+area_name;
					data_type_for_chart_header = "Resource Requested";

			data_array.forEach(function(project){
				if (!resource_data[project.resource_type]) {
					resource_data[project.resource_type] = 1;
				} else {
					resource_data[project.resource_type]++;
				}
			})

			for (var val in resource_data){
				resource_data_array.push({'type':val, 'count':resource_data[val]});
			}

			resource_data = formatDataForPieChart(resource_data_array, data_type_for_chart_header, area_name);
			return resource_data;
		}
//====================== end format resource data ==============================


//======================= format focus subject data ============================
		// format focus subject data for AMCharts.js. ie, stratify entries (projects)
		// in this response by the value of their "focus_area" attribute,
		// ie did the DonorsChoose project seek funding for science? mathematics?
		// foreign language? physical fitness?
		function formatFocusSubjectData(data_array, area_name){
			var subject_data = {},
					subject_data_array = [],
					// data_type_for_chart_header will be concatenated into the header/title of the chart generated on the UI.
					// ie: "DonorsChoose Projects Organized by "+[data_type_for_chart_header]+" in "+area_name;
					data_type_for_chart_header = "Subject Area";

			data_array.forEach(function(project){
				if (!subject_data[project.primary_focus_subject]) {
					subject_data[project.primary_focus_subject] = 1;
				} else {
					subject_data[project.primary_focus_subject]++;
				}
			})

			for (var val in subject_data){
				subject_data_array.push({'type':val, 'count':subject_data[val]});
			}

			subject_data = formatDataForBarChart(subject_data_array, data_type_for_chart_header, area_name);
			return subject_data;
		}
//======================= end format focus subject data ========================


//==============================================================================
		function formatDataForPieChart(data, data_type, area_name) {
			var dataProvider = data,
					header_text = "Projects by "+data_type+" in "+area_name;

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
				"type": "pie",
				"theme": "none",
				"titles": [{
					"text": header_text,
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
		    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]] projects</b> ([[percents]]% of area total)</span>",
		    "angle": 15
			};
		}
//==============================================================================


//==============================================================================
		function formatDataForBarChart(data, data_type, area_name) {
				var dataProvider = data,
		      header_text = "Projects by "+data_type+" in "+area_name;

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
		      "position": "right",
		      "title": header_text
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


module.exports = { 'state_abbrs':state_abbrs, 'formatPovertyData':formatPovertyData, 'formatResourceData':formatResourceData, 'formatFocusSubjectData':formatFocusSubjectData, 'makeAreaDescriptionString':makeAreaDescriptionString, "selectVisualization": selectVisualization };
