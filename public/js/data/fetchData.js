//=============== file README ===============
	// Builds and sends queries to server-side routes (needometer/routes/index.js), which pass the queries on to mongodb/Looker.
	// Then passes the data from the server response to renderData.js functions, which generate the proper visualizations.
//=============== file README ===============




//=================== Selected-areas tracking ============================================//
	// variables that hold information on the selected areas on the UI, as well as the filters applied to those selected areas.

		var snapshots_cache = []; // holds data objects that will be passed back from database query after areas and filters are selected. is iterated over by generateChart (in data/renderData.js) to create data visualizations.

		var filter_fields = {/* area1: [], area2: [] */};  // holds values of selected filters from UI sidebars, which will be used to build db query.
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
			selected_geos.forEach(function(geo_id) {
				$.get('/'+geo_id /* queryBuilder() (above) */, function(data){
					var geo_object = {
						name: data.state_name,
						project_resources: data.project_resources,
						data_type: data.data_type
					};

					// data-storage array, which is itereated over to produce data visualizations. (charts/graphs)
					snapshots_cache.push(geo_object);

					// these functions in renderData.js
					generateChart(geo_object);
					generateSnapshotText();
				});
			})
		}
		//==============================================================================

//============================= query logic ============================================//