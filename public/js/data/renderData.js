//=============== file README ===============
	// renderData.js: Runs looker/mongodb response through data visualization functionality to produce charts/graphs/etc. (D3.js or amcharts.js).
//=============== file README ===============



//===================================== charts logic ============================================//

		//============== called from getChartData() in fetchData.js ================
		// renders a header above each area's column of data visualizations that tells the number of donors,
		// total_donations, total projects, and total students reached for each area.
			function snapshotText(data, name, column){
				$("#col"+column).append("<h2>"+name+"</h2>"+commas(data.num_donors)+
					" donors contributed $"+commas(Math.floor(data.total_donations))+
					" to "+commas(data.projects)+" projects, reaching "+
					commas(data.students_reached)+" students.");
			}
			function commas(x) {
			  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		//==========================================================================


		//============== called from getChartData() in fetchData.js ================
		// clears the DOM and draws the data visualizations specified with the data passed back from mongodb/Looker
			function generateChart(geo){
				$('#mapCanvas').hide();
				$(".demo-panel-white").show();
				var name = geo.name;

				// syntax of this library method: AmCharts.makeChart(divId, chartConfig, delay)
			  AmCharts.makeChart(name+geo.data_type, configChartData(geo, geo.data_type), 2000);
				// configChart() is below
			}
		//==========================================================================

//===================================== end charts logic ============================================//