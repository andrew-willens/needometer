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
	// var width = 960,
  var width = 960/2.5 // 384
	// var width = 960/2 // 480
  // var height = 500
  var height = 500/2.5 // 200
  // var height = 500/2 // 250
      radius = Math.min(width, height) / 2;

  var color = d3.scale.category20();
  // var color = d3.scale.category20b();
  // var color = d3.scale.category20c();

	// var color = d3.scale.ordinal()
	    // .range(data.length)
	    console.log(data.length)

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
	    // .style("fill", function(d) { return color(i); });
  	  .style("fill", function(d, i) { return color(i); });

	g.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    // .style("text-anchor", "middle")
	    // .text(function(d) { return d.data.count+" "+d.data.type; });

	  var legend = d3.select("#col"+column).append("svg")
			  .attr("class", "legend")
			  .attr("width", 180)
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
	  .text(function(d) { return d.data.type+", "+d.data.count; });
};
////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
function pieChart2(data, column){
	// var width = 960,
  var width = 960/2.5 // 384
	// var width = 960/2 // 480
  // var height = 500
  var height = 500/2.5 // 200
  // var height = 500/2 // 250
      radius = Math.min(width, height) / 2;

  var color = d3.scale.category20();
  // var color = d3.scale.category20b();
  // var color = d3.scale.category20c();

	// var color = d3.scale.ordinal()
	    // .range(data.length)
	    console.log(data.length)

	var arc = d3.svg.arc()
	    .outerRadius(radius - 0)
	    .innerRadius(50);
	    // .innerRadius(62.5); // 250/4

	var outerArc = d3.svg.arc()
	    .outerRadius(radius * 1.125)  // 12.5% bigger
	    .innerRadius(50 * 3.125)  // 212.5% bigger

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
	    // .style("fill", function(d) { return color(i); });
  	  .style("fill", function(d, i) { return color(i); });

	g.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    // .style("text-anchor", "middle")
	    // .text(function(d) { return d.data.count+" "+d.data.type; });

	// text labels
	var text = svg.select(".labels").selectAll("text")

	text.enter()
	  .append("text")
	  .attr("dy", ".35em")
	  .style("opacity", 0)
		.text(function(d) {
			return d.data.label;
		})
		.each(function(d) {
			this._current = d;
		});

		function midAngle(d){
			return d.startAngle + (d.endAngle - d.startAngle)/2;
		}

		// slice to key polylines
		var polyline = svg.select(".lines").selectAll("polyline")

		polyline.enter()
      .append("polyline")
      .style("opacity", 0)
      .each(function(d) {
			  this._current = d;
		  });

	  var legend = d3.select("#col"+column).append("svg")
			  .attr("class", "legend")
			  .attr("width", 180)
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
	  .text(function(d) { return d.data.type+", "+d.data.count; });
};
////////////////////////////////////////////////////////////////////////////////










