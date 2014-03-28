needometer = angular.module('needometer', ['ngRoute', 'MainService', 'needometer.main', 'ChartService', 'needometer.chart'])

// reset angular rendering brackets to "[[]]". (Default "{{}}" collides with
// swig.) ======================================================================
needometer.config(function($interpolateProvider){
	$interpolateProvider.startSymbol("[[");
	$interpolateProvider.endSymbol("]]");
});
//==============================================================================


//Dependency Injection for =====================================================

//==============================================================================


// D3.js projection of U.S.A.===================================================
needometer.run(function (){
	// console.log(chart);

	var	width = 960,
			height = width / 2
			active = d3.select(null);

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
			.projection(projection);

	var svg = d3.select("#mapCanvas").append("svg")
			.attr("id", "map")
			.attr("width", width)
			.attr("height", height)

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
			.on("click", function(d){
				// console.log(d.properties.STUSPS);
				// initChart()
				document.location = '/'+d.properties.STUSPS;
      });

		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "state-border")
			.attr("d", path);
	});
})
	// D3.js projection of U.S.A.=================================================