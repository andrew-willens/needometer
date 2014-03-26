var initD3 = function(width) {
	var	width = width,
			height = width / 2
			active = d3.select(null);

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
			.projection(projection);

	var svg = d3.select("body").append("svg")
			.attr("id", "map")
			.attr("width", width)
			.attr("height", height)

	d3.json("./data/us.json", function(err, us) {
		// var counties = topojson.feature(us, us.objects.uscounties).features;
		var states = topojson.feature(us, us.objects.states).features;
		var land = topojson.feature(us, us.objects.usland);

		// svg.append("path")
  //     .datum(land)
  //     .attr("class", "land")
  //   	.attr("d", path);

    svg.selectAll("path")
				.data(states)
			.enter().append("path")
			.attr("id", function(d) {
				return d.properties.STUSPS;
			})
			.attr("class", "state")
			.attr("d", path)
			.on("click", function(){
		  	clicked();
		  	svg.append("path")
					.datum(topojson.mesh(us, us.objects.uscounties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000) }))
					.attr("class", "county-border")
					.attr("d", path);
      });

		// svg.selectAll("path")
		// 		.data(counties)
		// 	.enter().append("path")
		// 	.attr("class", "county")
		// 	// .style("fill", function(d){
		// 	// 	if (d.properties.projects.length>0){
		// 	// 		return "red";
		// 	// 	}
		// 	// })
		// 	.attr("d", path)
		// 	.on("click", function(d){
		// 		console.log(d);
		// 	});

		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "state-border")
			.attr("d", path);

	});

};