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

	var svg = d3.select("#map-canvas").append("svg")
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
		// all geo-DOM elements are created

		// ===================== assign event handling to map ======================
			// indicate mouseover by changing color of area moused over
			.on("mouseover", function(d){
				if (d3.select(this).classed("selected") === false) {
					d3.select(this).classed("active", true)
				}
			})
			// change area color back to default color when "hover" is removed
			.on("mouseout", function(d){d3.select(this).classed("active", false)})

			// change color of area "on click"
			.on("click", function(d){
				// if the state clicked is California or New York, don't
				// let user select it - query is too expensive for our current system.
				if (d.properties.NAME === "California" || d.properties.NAME === "New York") {
					alert("We're sorry, but this is a beta version of the Needometer, and selecting "+d.properties.NAME+" will cause it to crash. Please select another area.");
				}
				//otherwise
				else if (d3.select(this).classed("selected") !== true) { // if area is not selected (already colored)

					// set its color to "selected" color
					d3.select(this).classed("active", false);
					d3.select(this).classed("selected", true);

					// these functions in eventLogic/uiLogic.js.
					selectJustTwoAreas(d);
					assignNavAndSidebarHeaders();
					toggleBothSidebars();

				} else {
					// reset the area's color back to default color
					d3.select(this).classed("selected", false);

					 // these functions in eventLogic/uiLogic.js
					unselectArea(d);
					toggleBothSidebars();
				}
      });
      // ===================== end assign event handling =======================

    // create the borders that separate states. is a single DOM element.
		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "state-border")
			.attr("d", path);
		// end create borders
	});
};
//============================== end D3 USA map creation/event handling ================================
