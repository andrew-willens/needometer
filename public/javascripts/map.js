var initD3 = function(width) {
	var	width = width,
			height = width / 2;

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
			.projection(projection);

	var svg = d3.select("body").append("svg")
			.attr("id", "map")
			.attr("width", width)
			.attr("height", height)

	d3.json("./data/us.json", function(err, us) {
		var counties = topojson.feature(us, us.objects.counties2).features;

		svg.selectAll("path")
				.data(counties)
			.enter().append("path")
			.attr("class", "county")
			.attr("d", path)
			.on("click", function(d){
				console.log(d);
			});

		// svg.append("path")
				// .datum(topojson.mesh(us, us.objects.uscounties, function(a,b) { return a !== b; }))
				// .attr("id", "state-borders")
				// .attr("d", path);
	});
};