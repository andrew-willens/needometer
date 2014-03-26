var fs = require("fs");

console.log("Embedding event objects in TopoJSON...");
var counties = JSON.parse(fs.readFileSync("us.json").toString());
var projects = JSON.parse(fs.readFileSync("project_objects.json").toString());

counties.objects.counties2.geometries.forEach(function(county){
	countyProjects = [];
	for (var i=0; i<projects.length; i++){
		if (projects[i].school_county === county.id) {
			// console.log("pushing to", county.id)
			countyProjects.push(projects[i]);
		}
	}
	// if (countyProjects.length !== 0) {
	// 	console.log(countyProjects);
	// }
	county.properties["projects"] = countyProjects;
});

counties = JSON.stringify(counties);
fs.writeFileSync("us_with_projects.json", counties);

console.log("Event objects embedded in TopoJSON.")