////////////////////////////////////////////////////////////////////////////////
var stateAbbrs = { AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
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
  MH: 'Marshall Islands',
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
  MP: 'Northern Mariana Islands',
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
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming' }
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function generateSnapshots(){ //called in js/mapLogic.js
	var column_number = 0;
	// $("#col1").html("");
	// $("#col2").html("");
	$("#databtn").hide();
	$("h3").hide();
	$('#mapCanvas').hide();
	$(".row").show();

	snapshotsCache.forEach(function(geo){
		column_number++;
		var name = stateAbbrs[geo.NAME]
		snapshotText(geo.snapshot_text, name, column_number);
		var chartdiv = "chartdiv"+column_number;
		//jscharts pie/barcharts
		if (column_number == 1) {
      AmCharts.makeChart(chartdiv+"a", reformat_D3_amCharts(geo, "poverty", name));
      AmCharts.makeChart(chartdiv+"b", reformat_D3_amCharts(geo, "resource", name));
      AmCharts.makeChart(chartdiv+"c", reformat_D3_amCharts(geo, "subject", name));
    } else {
      AmCharts.makeChart(chartdiv+"a", reformat_D3_amCharts(geo, "poverty", name));
      AmCharts.makeChart(chartdiv+"b", reformat_D3_amCharts(geo, "resource", name));
      AmCharts.makeChart(chartdiv+"c", reformat_D3_amCharts(geo, "subject", name));
    }

		//following three functions in js/dataChef.js
		// pieChart(geo.poverty, column_number);
		// pieChart(geo.resource, column_number);
		// pieChart(geo.subject, column_number);
		// pieChart2(state.subject, column_number);
	})

	stateDataCache = [];
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function snapshotText(data, name, column){
	console.log(data, name, column)
	$("#col"+column).append("<h2>"+name+"</h2>"+commas(data.num_donors)+
		" donors contributed $"+commas(Math.floor(data.total_donations))+
		" to "+commas(data.projects)+" projects, reaching "+
		commas(data.students_reached)+" students.");
}

function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function pieChart(data, column){
	// var width = 960,
  var width = 960/2.5 // 384
	// var width = 960/2 // 480
  // var height = 500
  var height = 500/2.5 // 200
  // var height = 500/2 // 250
      radius = Math.min(width, height) / 2;

  var color = d3.scale.category20();
  // var color = d3.scale.category20b(); //alt color scheme1
  // var color = d3.scale.category20c(); //alt color scheme2

	var arc = d3.svg.arc()
	    .outerRadius(radius - 0)
	    .innerRadius(50);
	    // .innerRadius(62.5); // 250/4

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.count; });

	var svg = d3.select("#col"+column).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	  	// .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
	    .data(pie(data))
	  .enter().append("g")
	    .attr("class", "arc");

	g.append("path")
	    .attr("d", arc)
	    .attr("data-legend", function(d){return d.data.name})
  	  .style("fill", function(d, i) { return color(i); });

	  var legend = d3.select("#col"+column).append("svg")
			  .attr("class", "legend")
			  // .attr("width", 180)
			  .attr("width", 240)
			  // .attr("height", 180 * 2)
			  .attr("height", height)
			  .selectAll("g")
			  .data(pie(data))
			  .enter().append("g")
			  // .attr("transform", function(d, i) { console.log("translate(0," + i * 20 + ")"); return "translate(0," + i * 20 + ")"; });
			  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
	  .attr("width", 18)
	  .attr("height", 18)
	  .style("fill", function(d, i) { return color(i); });

	legend.append("text")
	  .attr("x", 24)
	  .attr("y", 9)
	  .attr("dy", ".35em")
	  .text(function(d) { return d.data.type+": "+commas(d.data.count); });
};
//end piechart//////////////////////////////////////////////////////////////////
