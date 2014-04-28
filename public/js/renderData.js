//========================== charts logic ======================================
function generateChart(geo){ // called from
	$('#mapCanvas').hide();
	$(".demo-panel-white").show();
	var name = geo.name;

//   AmCharts.makeChart(name+geo.data_type, configChart(geo, geo.data_type), 2000); // configChart() in js/dataChef.js
  AmCharts.makeChart(name+geo.data_type, configChart(geo, geo.data_type), 2000); // configChart() in js/dataChef.js
	// AmCharts.makeChart(divId, chartConfig, delay)
}
//==============================================================================

//==============================================================================
function configChart(geo, data_type) {
	var chart_title = data_type+" Requested by DonorsChoose Projects in "+geo.name,
		data_provider = geo.resource;

	return {
		"type": "pie",
		"theme": "none",
		"titles": [{
			"text": chart_title,
			"size": 16
		}],
		"dataProvider": geo.project_resources,
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
//============================ end charts logic ================================



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