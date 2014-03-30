////////////////////////////////////////////////////////////////////////////////
var pieChart = function(data) {
  pieLogic(data);
};
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function snapshotText(data, name){
	$("#pieChart1aDiv").html("<h2>"+name+"</h2>"+data.num_donors+" donors contributed "+data.total_donations+" to "+data.projects+" projects, reaching "+data.students_reached+" students.");
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function pieLogic(data){
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

	var svg = d3.select("#pieChart1aDiv").append("svg")
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













