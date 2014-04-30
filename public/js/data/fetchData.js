//=============== file README ===============
	// Builds and sends queries to server-side routes (needometer/routes/index.js), which pass the queries on to mongodb/Looker.
	// Then passes the data from the server response to renderData.js functions, which generate the proper visualizations.
//=============== file README ===============




//=================== Selected-areas tracking ============================================//
	// variables that hold information on the selected areas on the UI, as well as the filters applied to those selected areas.

		var filter_fields = {/* area1: [], area2: [] */};  // will hold values of selected filters from UI sidebars, which will be used to build db query.
//=================== Selected-areas tracking ============================================//





//============================= query logic ============================================//

		//============================== called from getChartData(), below ==============================
			// function queryBuilder() {
				// pulls geo-ids from selected_areas array, as well as filter_fields object, and build them into a query to send to mongodb/Looker.
				// var query = "";
				// for (area in filter_fields) {
				// 	area.forEach(function(filter){
				// 		query += "&" + filter;
				// 	})
				// };
				// return query;
			// }
		//==========================================================================


		//====================== called from nonmapEvents.js =======================
		// submits query for each area selected on the UI map (with selected filters built in.) and passes the data from the server response to renderData.js.
		function getChartData() {
			selected_areas.forEach(function(geo_id) {
				$.get('/area/'+geo_id /* queryBuilder() (above) */, function(data){
					// these functions in renderData.js
					generateChart(data.focus_subject_data_array, data.area_name);
					renderDescriptionText(data.area_description_string);
				});
			})
		}
		//==============================================================================

//============================= query logic ============================================//