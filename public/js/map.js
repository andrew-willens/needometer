var initD3 = function() {
	var	width = 960,
			height = width / 2
			active = d3.select(null);

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
			.projection(projection);

	var svg = d3.select("#mapCanvas").append("svg")
			.attr("id", "svg")
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", "0 0 " + width + " " + height)
			.attr("preserveAspectRatio", "xMidYMid");

	d3.json("data/us.json", function(err, us) {
		var states = topojson.feature(us, us.objects.states).features;

    svg.selectAll("path")
				.data(states)
			.enter().append("path")
			.attr("id", function(d) {
				return d.properties.STUSPS;
			})
			.attr("class", "state")
			.attr("d", path)
			.on("mouseover", function(d){
				if (d3.select(this).classed("selected") === false) {
					d3.select(this).classed("active", true)
				}
			})
			.on("mouseout", function(d){d3.select(this).classed("active", false)})
			.on("click", function(d){
				$("#instructions").hide()
				if (d3.select(this).classed("selected") === true) {
					d3.select(this).classed("selected", false);
					selectedGeos.shift(selectedGeos.indexOf(this.id),1);
				} else {
					d3.select(this).classed("active", false);
					d3.select(this).classed("selected", true);
					//these functions in js/mapLogic.js;
					selectJustTwo(d);
					assignHeaders();
					toggleSidebars();
				}
      });

		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "state-border")
			.attr("d", path);
	});
};
