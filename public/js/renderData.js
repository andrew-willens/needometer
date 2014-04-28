//========================== charts logic ======================================
// function renderSnapshot(){ //called from dataChef.js
// 	if (snapshots_cache.length === 2) {
// 		generateSnapshots();
// 	}
// }

function generateChart(geo){ //called from renderSnapshot, above
	$('#mapCanvas').hide();
	$(".demo-panel-white").show();
	var name = geo.name;
  AmCharts.makeChart(name+geo.data_type, configChart(geo, geo.data_type, 2000)); // configChart() in js/dataChef.js
	// AmCharts.makeChart(divId, chartConfig, delay)
}
//======================= end charts logic =====================================


//==============================================================================
function snapshotText(data, name, column){
	$("#col"+column).append("<h2>"+name+"</h2>"+commas(data.num_donors)+
		" donors contributed $"+commas(Math.floor(data.total_donations))+
		" to "+commas(data.projects)+" projects, reaching "+
		commas(data.students_reached)+" students.");
}

function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//==============================================================================