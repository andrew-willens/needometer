////////////////////////////////////////////////////////////////////////////////
function generateSnapshots(){ //called in js/mapLogic.js
	var column_number = 0;

	snapshotsCache.forEach(function(state){
		column_number++;
		snapshotText(state.snapshot_text, state.properties.NAME, column_number);
		var chartdiv = "chartdiv"+column_number;

		if (column_number == 1) {
			AmCharts.makeChart(chartdiv+"a", reformat_D3_amCharts(state, "poverty"));
			AmCharts.makeChart(chartdiv+"b", reformat_D3_amCharts(state, "resource"));
			AmCharts.makeChart(chartdiv+"c", reformat_D3_amCharts(state, "subject"));
		} else {
			AmCharts.makeChart(chartdiv+"a", reformat_D3_amCharts(state, "poverty"));
			AmCharts.makeChart(chartdiv+"b", reformat_D3_amCharts(state, "resource"));
			AmCharts.makeChart(chartdiv+"c", reformat_D3_amCharts(state, "subject"));
		}

	})

	stateDataCache = [];
}
////////////////////////////////////////////////////////////////////////////////

function sortStatePovertyData(data) {
	console.log(data)
	// data = [{'type':"highest poverty", 'count':1000}, {'type':"moderate poverty", 'count':500}]
	// highest poverty, high poverty, moderate poverty, low poverty
	var tempData = {};
	var tempDataArray = [];
	// console.log("inside sortStatePovertyData function");
	// console.log(data.length, data[0].type, data[0].count);
	// var i;
	var index;
	// look for "highest poverty"
	for (var i=0; i<data.length; i++) {
		// console.log(i)
		index = 0;
		// console.log(data[i].type)
		if (data[i].type === "highest poverty") {
			index = i;
		}
	}
	// console.log(index)
	if (index > 0) {
		// console.log("index = "+index)
		// console.log("i = "+i)
		tempDataArray.push({'type': data[index].type, 'count': data[index].count})
  } else {
  	tempDataArray.push({'type': "", 'count': 0})
  }

	// look for "high poverty"
	for (var i=0; i<data.length; i++) {
		// console.log(i)
		index = 0;
		// console.log(data[i].type)
		if (data[i].type === "high poverty") {
			index = i;
		}
	}
	// console.log(index)
	if (index > 0) {
		tempDataArray.push({'type': data[index].type, 'count': data[index].count})
  } else {
  	tempDataArray.push({'type': "", 'count': 0})
  }

	// look for "moderate poverty"
	for (var i=0; i<data.length; i++) {
		index = 0;
		if (data[i].type === "moderate poverty") {
			index = i;
		}
	}
	if (index > 0) {
		tempDataArray.push({'type': data[index].type, 'count': data[index].count})
  } else {
  	tempDataArray.push({'type': "", 'count': 0})
  }

	// look for "low poverty"
	for (var i=0; i<data.length; i++) {
		index = 0;
		if (data[i].type === "low poverty") {
			index = i;
		}
	}
	if (index > 0) {
		tempDataArray.push({'type': data[index].type, 'count': data[index].count})
  } else {
  	tempDataArray.push({'type': "", 'count': 0})
  }

  tempData = tempDataArray;
  console.log(tempData)
	// return tempData;
}

////////////////////////////////////////////////////////////////////////////////
function snapshotText(data, name, column){
	$("#col"+column).append("<h2>"+name+"</h2>"+commas(data.num_donors)+
		" donors contributed $"+commas(Math.floor(data.total_donations))+
		" to "+commas(data.projects)+" projects, reaching "+
		commas(data.students_reached)+" students.");
}

function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function pieChart(data, column){
	// console.log("data = "+data)
	console.log("data coming into pieChart:");
	console.log(data);
	// console.log("data.length = "+data.length);
	// for (var n=0; n<data.length; n++) {
		// console.log("data["+n+"].type = "+data[n].type+" ... data["+n+"].count = "+data[n].count)
	// }

	// testing to see if I can custom sort this
	// if (data[0].type === "moderate poverty" && data[0].count === 116) {
		// data[0].type = "you should not see me";
		// data[0].count = 1700;
		// data[1].type = "you should not see me either";
		// data[1].count = 1900;
	// }

	// var width = 960,
  var width = 960/2.5 // 384
	// var width = 960/2 // 480
  // var height = 500
  var height = 500/2.5 // 200
  // var height = 500/2 // 250
  var radius = Math.min(width, height) / 2;

  // var color = d3.scale.category20b();
  // var color = d3.scale.category20c();

	// if ("poverty".indexOf(data[0].type) !== -1) {
	if (data[0].type.split(' ')[1] === "poverty") {
		var color = d3.scale.ordinal()
		    .range(["#d62728", "#ff9896", "#ff7f0e", "#ffbb78", "#1f77b4"])
	} else {
	  var color = d3.scale.category20();
	};

	// console.log("color(1) = "+color(1))

	var arc = d3.svg.arc()
	    .outerRadius(radius - 0)
	    .innerRadius(50);
	    // .innerRadius(62.5); // 250/4

	var pie = d3.layout.pie()
	    .sort(null)
	    // .sort(function(d) { return d.value; })
	    // .sort(function(d) { return ["highest poverty","high poverty","moderate poverty","low poverty"]})
	    // .value(function(d) { console.log("d.count = "+d.count);return d.count; });
	    .value(function(d) { return d.count; });

	var svg = d3.select("#col"+column).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	  	// .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	    // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
	    .data(pie(data))
	    // .data(pie(data), function(d) { return ["highest poverty","high poverty","moderate poverty","low poverty"] })
	  .enter().append("g")
	    .attr("class", "arc");

	g.append("path")
	    .attr("d", arc)
	    // .attr("data-legend", function(d){console.log("d.data.name = "+d.data.name);return d.data.name})
	    .attr("data-legend", function(d){ return d.data.name; })
	    // .style("fill", function(d) { return color(i); });
  	  // .style("fill", function(d, i) {console.log("color("+i+") = "+color(i));return color(i); });
  	  .style("fill", function(d, i) { return color(i); }); //easier? return d.data.color (color tag must be assigned)

	// g.append("text")
	    // .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	    // .attr("dy", ".35em")
	    // .style("text-anchor", "middle")
	    // .text(function(d) { return d.data.count+" "+d.data.type; });

	  var legend = d3.select("#col"+column).append("svg")
			  .attr("class", "legend")
			  // .attr("width", 180)
			  .attr("width", 240)
			  // .attr("height", 180 * 2)
			  .attr("height", height)
			  .selectAll("g")
			  .data(pie(data))
			  // .data(pie(data), function(d) { return ["highest poverty","high poverty","moderate poverty","low poverty"] })
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
	  .text(function(d) { return d.data.type+": "+commas(d.data.count); });
};
//end piechart//////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function barChart(data, column) {
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var formatPercent = d3.format(".0%");

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1, 1);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .tickFormat(formatPercent);

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("/data/pie_chart.csv", function(error, data) {

	  data.forEach(function(d) {
	    d.frequency = +d.frequency;
	  });

	  x.domain(data.map(function(d) { return d.letter; }));
	  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Frequency");

	  svg.selectAll(".bar")
	      .data(data)
	    .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.letter); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.frequency); })
	      .attr("height", function(d) { return height - y(d.frequency); });

	  d3.select("input").on("change", change);

	  var sortTimeout = setTimeout(function() {
	    d3.select("input").property("checked", true).each(change);
	  }, 2000);

	  function change() {
	    clearTimeout(sortTimeout);

	    // Copy-on-write since tweens are evaluated after a delay.
	    var x0 = x.domain(data.sort(this.checked
	        ? function(a, b) { return b.frequency - a.frequency; }
	        : function(a, b) { return d3.ascending(a.letter, b.letter); })
	        .map(function(d) { return d.letter; }))
	        .copy();

	    var transition = svg.transition().duration(750),
	        delay = function(d, i) { return i * 50; };

	    transition.selectAll(".bar")
	        .delay(delay)
	        .attr("x", function(d) { return x0(d.letter); });

	    transition.select(".x.axis")
	        .call(xAxis)
	      .selectAll("g")
	        .delay(delay);
	  }
	});
}


////////////////////////////////////////////////////////////////////////////////
function pieChart2(data, column){
var width = 960/2.5,
    // height = 450/2.5,
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
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius - 0)
	.innerRadius(50);

var outerArc = d3.svg.arc()
	.innerRadius(radius + 1.1)
	.outerRadius(120);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.label; };

var color = d3.scale.ordinal()
	.domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

function randomData (){
	var labels = color.domain();
	return labels.map(function(label){
		return { label: label, value: Math.random() }
	});
}

var labels = ["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"]
change(randomData());

// d3.select(".randomize")
// 	.on("click", function(){
// 		change(randomData());
// 	});


function change(data) {
	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice.enter()
		.insert("path")
		.style("fill", function(d) { return color(d.data.label); })
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
			return d.data.label;
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
////////////////////////////////////////////////////////////////////////////////
