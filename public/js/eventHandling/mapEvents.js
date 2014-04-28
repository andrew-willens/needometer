//=============== file README ===============

//Creates USA map DOM element with D3.js. Also assigns functionality to events occurring on the map element. (Mouseovers and clicks.)

//=============== file README ===============



//=============== create D3 USA map, assign event handling to it ===============
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

		// create USA map by creating a DOM element for each USA state object passed to D3.
    svg.selectAll("path")
				.data(states)
			.enter().append("path")
			.attr("id", function(d) {
				return d.properties.STUSPS;
			})
			.attr("class", "state")
			.attr("d", path)
		// end create map

		// ===================== assign event handling to map ======================
			// change color of area "on hover"
			.on("mouseover", function(d){
				if (d3.select(this).classed("selected") === false) {
					d3.select(this).classed("active", true)
				}
			})
			// change area color back to default color when "hover" is removed
			.on("mouseout", function(d){d3.select(this).classed("active", false)})

			// change color of area "on click"
			.on("click", function(d){
				if (d3.select(this).classed("selected") !== true) { // if area is not selected (already colored)

					// set its color to "selected" color
					d3.select(this).classed("active", false);
					d3.select(this).classed("selected", true);

					// do not allow user to select more than two areas. (in eventLogic/mapLogic.js)
					selectJustTwo(d);
					// assign name of area to sidebar header/s and navbar instructions. (in eventLogic/nonmapLogic.js)
					assignHeaders();
					// if sidebar corresponding to selected area is not already open, open it. (in eventLogic/nonmapLogic.js)
					toggleSidebars(); // (in eventLogic/nonmapLogic.js)

				} else {
					// reset the area's color back to default color
					d3.select(this).classed("selected", false);
					// remove the area from the arrays that track which areas are selected: "selected_areas" and "sgeonames" (in eventLogic/mapLogic.js).
					unselect(d);
					// close corresponding sidebar.
					toggleSidebars(); // (in eventLogic/nonmapLogic.js)
				}
      });
      // ===================== end assign event handling =======================


		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "state-border")
			.attr("d", path);
	});
};
//============================== end D3 USA map creation/event handling ================================
