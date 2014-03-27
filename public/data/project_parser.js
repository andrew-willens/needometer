<<<<<<< HEAD
var fs = require('fs'),
		mongoose = require('mongoose'),
		models = require('../../models'),
		Project = models.Project;


function readProjects(callback) {
	console.log("reading csv");
	fs.readFile("projects_sample.csv", "utf8", callback);
};

function writeProjects(err, data) {
	//error handler
	if (err) {console.log(err); }

	console.log("Formatting projects data.")
	//pull the column heads out of the data. make each project an array of strings, each string is a datum.
	var projects = data.toString().split("\n");
	console.log("done splitting projects data along commas.");
	var keys = projects.shift().split(",");
	console.log("column headers removed")

	console.log("converting project arrays to project objects");
	// create template for project json objects
	j = 0;
	newProjects = [];
	for (var k=0; k<100000; k++ ){
		proj = projects[k].split(",");
		projObj = {};
		for (var i=0; i<proj.length-1; i++) {
			projObj[keys[i]] = proj[i];
		}
		newProjects.push(projObj);
		// newProjects.push(proj);
		j++;
		console.log(j);
	};
	// console.log("done creating project objects");

	// console.log("stringifying project objects")
	// convert projects object to format fs.writeFile can read.
	// newProjects = JSON.stringify(newProjects);
	// console.log("done stringifying")

	// console.log("writing data to separate file");
	// fs.writeFileSync("project_objects.json", newProjects);
	// console.log("done writing");

	// 	newProjects.forEach(function(project) {
	// 		Project.create({
	// 		  'school_city': project.school_city,
	// 		  'school_state': project.school_state,
	// 		  'students_reached': project.students_reached,
	// 		  'date_expiration': project.date_expiration
	// 		});
	// });

	console.log("Finished! control-c to quit.");
	return newProjects;
}

readProjects(writeProjects);












