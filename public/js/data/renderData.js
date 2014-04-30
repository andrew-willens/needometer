//=============== file README ===============
	// renderData.js: Runs looker/mongodb response through data visualization functionality to produce charts/graphs/etc. (D3.js or amcharts.js).
//=============== file README ===============



//===================================== charts logic ============================================//

		//============== called from getChartData() in fetchData.js ================
		// renders a header above each area's column of data visualizations that tells the number of donors,
		// total_donations, total projects, and total students reached for each area. currying this function
		// enables it to track the number of times it is called within a locally contained scope.
			renderDescriptionText = renderDescriptionTextCurrier(0);
			function renderDescriptionTextCurrier(column_counter){
				var i = column_counter;
				return function(area_description_string) {
					i++;
					$("#col"+i).append(area_description_string);
				}
			}
		//==========================================================================


		//============== called from getChartData() in fetchData.js ================
		// clears the DOM and draws the data visualizations specified with the data passed back from mongodb/Looker
			generateChart = generateChartCurrier(0);
			function generateChartCurrier(iterator){
				var i = iterator;
				return function(data_object, area_name) {
					i++;
					var div_name = "chart-div"+i;

					// syntax of this library method: AmCharts.makeChart(divId, chartConfig, delay)
					AmCharts.makeChart(div_name, data_object, 1000);
				}
			}
		//==========================================================================

//===================================== end charts logic ============================================//