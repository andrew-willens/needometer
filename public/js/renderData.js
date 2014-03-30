////////////////////////////////////////////////////////////////////////////////
function createSnapshots(){
	var column_number = 0;

	stateSnapshotsCache.forEach(function(state){
		console.log(state);
		column_number++;
		snapshotText(state.snapshot_text, state.properties.NAME, column_number);
		pieChart(state.poverty, column_number);
		pieChart(state.resource, column_number);
		pieChart(state.subject, column_number);
	})

	stateSnapshotsCache = [];
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function snapshotText(data, name, column){
	$("#col"+column).append("<h2>"+name+"</h2>"+data.num_donors+" donors contributed $"+Math.floor(data.total_donations)+" to "+data.projects+" projects, reaching "+data.students_reached+" students.");
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function pieChart(data, column){
	var width = 960/2.5,
      height = 500/2.5,
      radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	    .range(["red", "orange", "yellow", "green", "blue", "purple", "gray"]);

	var arc = d3.svg.arc()
	    .outerRadius(radius - 0)
	    .innerRadius(50);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.count; });

	var svg = d3.select("#col"+column).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
	    .data(pie(data))
	  .enter().append("g")
	    .attr("class", "arc");

	g.append("path")
	    .attr("d", arc)
	    .style("fill", function(d) { return color(d.data.count); });

	g.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    .style("text-anchor", "middle")
	    .text(function(d) { return d.data.count+" "+d.data.type; });
};
////////////////////////////////////////////////////////////////////////////////













