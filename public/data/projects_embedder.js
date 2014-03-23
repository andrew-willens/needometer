var fs = require("fs");

	console.log("Embedding event objects in TopoJSON...");
	var usTopology = JSON.parse(fs.readFileSync("us.json").toString());
	var projects = JSON.parse(fs.readFileSync("project_objects.json").toString());
	projectsone = projects[0].school_county;
	console.log(projectsone);

	usTopology.objects.counties2.geometries.forEach(function(county){
		countyProjectsArray = [];
		for (var i=0; i<projects.length; i++){
			console.log(projects[i].school_county, i)
			if (projects[i].school_county === "Bronx") {
				console.log("pushing")
				countyProjectsArray.push(projects[i]);
			}
		}
		usTopology.objects.counties2.geometries[3163].properties["projects"] = countyProjectsArray;



	// access state objects in topology obj, make container to hold events
	// topology.objects.states.geometries.forEach(function(state) {
	// 	state.properties.events = [];
	// });

	// eventObjectArray.forEach(function(evnt) {
	// 	// how to incorporate error handling?
	// 	topology.objects.states.geometries.forEach(function(state){
	// 		// console.log(evnt.location);
	// 		if (evnt.location.split(", ")[1] == state.id
	// 			|| evnt.location.split(", ")[1] == state.properties.name) {
	// 				state.properties.events.push(evnt);
	// 		}
	// 	});
	// });

	// topology = JSON.stringify(topology);
	// fs.writeFileSync("NewUs.json", topology);
	// console.log("Event objects embedded in TopoJSON.")