var pieChart = function(width) {
  var width = 960/2.5,
      height = 500/2.5,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      .range(["red", "orange", "yellow", "green", "blue", "purple", "gray"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.population; });


  var svg = d3.select("#pieChartDiv").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.csv("data/pie_chart.csv", function(error, data) {

    data.forEach(function(d) {
      d.population = +d.population;
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.age); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.age; });
});
};

///////////////

var scatterPlot = function() {
  var data = [[5,3], [10,17], [15,4], [2,8]];

      var margin = {top: 20, right: 15, bottom: 60, left: 60}
        , width = 960/2.5 - margin.left - margin.right
        , height = 500/2.5 - margin.top - margin.bottom;

      var x = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d[0]; })])
                .range([ 0, width ]);

      var y = d3.scale.linear()
              .domain([0, d3.max(data, function(d) { return d[1]; })])
              .range([ height, 0 ]);

      var chart = d3.select('#scatterPlotDiv').append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart')

      var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main')

      // draw the x axis
      var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

      main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

      // draw the y axis
      var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

      main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

      var g = main.append("svg:g");

      g.selectAll("scatter-dots")
        .data(data)
        .enter().append("svg:circle")
            .attr("cx", function (d,i) { return x(d[0]); } )
            .attr("cy", function (d) { return y(d[1]); } )
            .attr("r", 8);
}
