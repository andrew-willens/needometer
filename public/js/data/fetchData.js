//=============== file README ===============
	// Builds and sends queries to server-side routes (needometer/routes/index.js), which pass the queries on to mongodb/Looker.
	// Then passes the data from the server response to renderData.js functions, which generate the proper visualizations.
//=============== file README ===============




//=================== Selected-areas tracking ============================================//
	// variables that hold information on the selected areas on the UI, as well as the filters applied to those selected areas.

		var filter_fields = {/* area1: [], area2: [] */};  // will hold values of selected filters from UI sidebars, which will be used to build db query.
//=================== Selected-areas tracking ============================================//





//============================= query logic ============================================//

		//====================== called from nonmapEvents.js =======================
		// submits query for each area selected on the UI map (with selected filters built in.) and passes the data from the server response to renderData.js.
		function getChartData(query_strings_array) {
			for (var i=selected_areas.length-1; i>=0; i--) {
				$.get('/data/'+selected_areas[i]+"/"+query_strings_array[i], function(data){
					// these functions in renderData.js
					// console.log(data.area_data, data.area_name);
					generateChart(data.area_data, data.area_name);
					renderDescriptionText(data.area_description_string);
				});
			}
		}
		//==============================================================================

//============================= query logic ============================================//