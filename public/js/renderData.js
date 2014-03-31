////////////////////////////////////////////////////////////////////////////////
function generateSnapshots(){ //called in js/mapLogic.js
	var column_number = 0;
	$("#col1").html("");
	$("#col2").html("");

	snapshotsCache.forEach(function(geo){
		console.log(geo);
		column_number++;
		snapshotText(geo.snapshot_text, geo.NAME, column_number);
		//following three functions in js/dataChef.js
		pieChart(geo.poverty, column_number);
		pieChart(geo.resource, column_number);
		pieChart(geo.subject, column_number);
		// pieChart2(state.subject, column_number);
	})

	stateDataCache = [];
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function snapshotText(data, name, column){
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
	    // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
	    .data(pie(data))
	  .enter().append("g")
	    .attr("class", "arc");

	g.append("path")
	    .attr("d", arc)
	    .attr("data-legend", function(d){return d.data.name})
	    // .style("fill", function(d) { return color(i); });
  	  .style("fill", function(d, i) { return color(i); });

	// g.append("text")
	    // .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    // .attr("dy", ".35em")
	    // .style("text-anchor", "middle")
	    // .text(function(d) { return d.data.count+" "+d.data.type; });

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
