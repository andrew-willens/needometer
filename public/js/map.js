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
		var click = 0;
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
				click++;
				// console.log(d.properties.STUSPS);

				$.get ( '/'+d.properties.STUSPS, function(data){
					stateDataCache.push(data.projects);
					povertyData = povertyLevel(data.projects);
					resourceData = resourceType(data.projects);
					subjectData = focusSubject(data.projects);
					donors_donations_students = summableProperties(data.projects);
					console.log(data.projects);
				});

    		// $( ".inner" ).append( "You clicked on the map<br>" );
    		if (click === 2) {
	    		pieChart1a();
  	  		scatterPlot1();
  	  		pieChart1b();
  	  		pieChart1c();
    			pieChart2a();
    			scatterPlot2();
    			pieChart2b();
    			pieChart2c();
    		}
      });

		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "state-border")
			.attr("d", path);
	});
};
