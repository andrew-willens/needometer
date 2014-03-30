var pieChart1a = function(width) {
  var width = 960/2.5,
      height = 500/2.5,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      .range(["red", "orange"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.population; });

  var svg = d3.select("#pieChart1aDiv").append("svg")
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
        .attr("data-legend", function(d){return d.data.name})
        .style("fill", function(d) { return color(d.data.age); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        // .style("text-anchor", "middle")
        // .text(function(d) { return d.data.age; });

  var legend = d3.select("#pieChart1aDiv").append("svg")
  .attr("class", "legend")
  .attr("width", 180)
  .attr("height", 180 * 2)
  .selectAll("g")
  .data(pie(data))
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("width", 18/2)
  .attr("height", 18/2)
  .style("fill", function(d, i) { return color(i); });

legend.append("text")
  .attr("x", 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .text(function(d) { return d.data.age+", "+d.data.population; });

  });
};
