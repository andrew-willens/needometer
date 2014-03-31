////////////////////////////////////////////////////////////////////////////////
function generateSnapshots(){ //called in js/mapLogic.js
	var column_number = 0;

	snapshotsCache.forEach(function(state){
		console.log(state);
		column_number++;
		//following four functions in js/dataChef.js
		snapshotText(state.snapshot_text, state.properties.NAME, column_number);
		pieChart(state.poverty, column_number);
		pieChart(state.resource, column_number);
		// pieChart(state.subject, column_number);
		pieChart2(state.subject, column_number);
	})

	stateDataCache = [];
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

  var color = d3.scale.category20();
  // var color = d3.scale.category20b(); //alt color scheme1
  // var color = d3.scale.category20c(); //alt color scheme2

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
	    .attr("data-legend", function(d){return d.data.name})
	    .style("fill", function(d) { return color(d.data.count); });

	g.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    .attr("dy", ".35em")
	    // .style("text-anchor", "middle")
	    // .text(function(d) { return d.data.count+" "+d.data.type; });

  var legend = d3.select("#col"+column).append("svg")
		  .attr("class", "legend")
		  .attr("width", 180)
		  .attr("height", 180 * 2)
		  .selectAll("g")
		  .data(pie(data))
		  .enter().append("g")
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
//end piechart//////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function pieChart2(data, column){
	console.log("here's your pie chart 2")
	var width = 960/2.5,
	    height = 500/2.5,
		radius = Math.min(width, height) / 2;

	var svg = d3.select("#col"+column).append("svg")
		    .attr("width", width)
		    .attr("height", height)
		.append("g")

	svg.append("g")
		.attr("class", "slices");
	svg.append("g")
		.attr("class", "labels");
	svg.append("g")
		.attr("class", "lines");

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {
			console.log(d.data.count);
			return d.data.count;
		});

	var arc = d3.svg.arc()
		.outerRadius(radius - 0)
		.innerRadius(50);

	var outerArc = d3.svg.arc()
		.innerRadius(radius + 1.1)
		.outerRadius(120);

	svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var key = function(d){
		console.log(d.data.type);
		return d.data.type;
	};

	var color = d3.scale.category20();

	function randomData (){
		var labels = color.domain();
		return labels.map(function(label){
			return { label: label, value: Math.random() }
		});
	}

	var labels = ["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"]
	change(randomData());

	d3.select(".randomize")
		.on("click", function(){
			change(randomData());
		});


	function change(data) {
		/* ------- PIE SLICES -------*/
		var slice = svg.select(".slices").selectAll("path.slice")
			.data(pie(data), key);

		slice.enter()
			.insert("path")
			.style("fill", function(d) { return color(d.data.type); })
			.attr("class", "slice");

		slice
			.transition().duration(1000)
			.attrTween("d", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					return arc(interpolate(t));
				};
			})

		slice.exit()
			.remove();

		/* ------- TEXT LABELS -------*/

		var text = svg.select(".labels").selectAll("text")
			.data(pie(data), key);

		text.enter()
			.append("text")
			.attr("dy", ".35em")
			.text(function(d) {
				return d.data.type;
			});

		function midAngle(d){
			return d.startAngle + (d.endAngle - d.startAngle)/2;
		}

		text.transition().duration(1000)
			.attrTween("transform", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
					return "translate("+ pos +")";
				};
			})
			.styleTween("text-anchor", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					return midAngle(d2) < Math.PI ? "start":"end";
				};
			});

		text.exit()
			.remove();

		/* ------- SLICE TO TEXT POLYLINES -------*/

		var polyline = svg.select(".lines").selectAll("polyline")
			.data(pie(data), key);

		polyline.enter()
			.append("polyline");

		polyline.transition().duration(1000)
			.attrTween("points", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
					return [arc.centroid(d2), outerArc.centroid(d2), pos];
				};
			});

		polyline.exit()
			.remove();
	};
};
//end piechart2/////////////////////////////////////////////////////////////////













