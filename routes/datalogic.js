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
//======================= end data-manipulation variables ======================



//======================= format poverty data ==================================
		// format poverty data for AMCharts.js. "poverty data" = stratify entries
		// (projects) in this dataset by the value of their "poverty_level" attribute.
		// poverty_level is a metric for socioeconomic well-being of the area
		// the DonorsChoose project would benefit
		function formatPovertyData(data_array, area_name) {
			var poverty_data = {};
			var poverty_data_array =[];
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

			poverty_data = formatDataForPieChart(poverty_data_array, "poverty", area_name);
			return poverty_data;
		};
//======================= end format poverty data ==============================


//============================ format resource data ============================
		// format resource data for AMCharts.js. ie, stratify entries (projects)
		// in this dataset by the value of their "resource_type" attribute,
		// ie what did the DonorsChoose project seek funding for? pencils? books?
		// a fieldtrip?
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
//====================== end format resource data ==============================


//======================= format focus subject data ============================
		// format focus subject data for AMCharts.js. ie, stratify entries (projects)
		// in this response by the value of their "focus_area" attribute,
		// ie did the DonorsChoose project seek funding for science? mathematics?
		// foreign language? physical fitness?
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
//======================= end format focus subject data ========================


//======================= create area description string =======================
		// Create a string describing the area queried for - number of donors,
		// total $ donated, and number of students reached.
		function makeAreaDescriptionString(dataArray, area_name){
			var properties = ['num_donors', 'total_donations', 'students_reached'];
			var all_props_obj = {
				'projects': 0
			};
			var commaInserter = function(number) {
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			};

			dataArray.forEach(function(project){
				all_props_obj.projects++;
				properties.forEach(function(prop){
					if (!all_props_obj[prop]) {
						all_props_obj[prop] = project[prop];
					} else {
						all_props_obj[prop] += project[prop];
					}
				})
			});

			console.log("All prop obj: " + all_props_obj);

			// var description_string = "<h2>"+area_name+"</h2>"+commaInserter(all_props_obj.num_donors)+
			// 	" donors contributed $"+commaInserter(Math.floor(all_props_object.total_donations))+
			// 	" to "+commaInserter(all_props_object.projects)+" projects, reaching "+
			// 	commaInserter(all_props_object.students_reached)+" students.";

			// return description_string;
		}
//=================== end create area description string =======================


//==============================================================================
		// formats
		function formatDataForPieChart(data, category, name) {
			console.log(data);

			var title_text, dataProvider;

			if (category === "poverty") {
				title_text = "Projects Stratified by Level of Poverty in "+name;
				dataProvider = data;
			} else if (category === "resource") {
				title_text = "Resources";
				dataProvider = data.resource;
			} else {
				title_text = "Subjects";
				dataProvider = data.subject;
			};

			// return {
			// 	"type": "pie",
			// 	"theme": "none",
			// 	"titles": [{
			// 		"text": titles_text,
			// 		"size": 16
			// 	}],
			// 	"dataProvider": dataProvider,
		 //    "valueField": "count",
		 //    "titleField": "type",
		 //    "startEffect": "elastic",
		 //    "startDuration": 2,
		 //    "labelRadius": 15,
		 //    "innerRadius": "50%",
		 //    "depth3D": 10,
		 //    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
		 //    "angle": 15
			// };
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


module.exports = { 'state_abbrs':state_abbrs, 'formatPovertyData':formatPovertyData, 'formatResourceData':formatResourceData, 'formatFocusSubjectData':formatFocusSubjectData, 'makeAreaDescriptionString':makeAreaDescriptionString };
