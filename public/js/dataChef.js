// function dataChef(stateDataArray) {

function povertyLevel(dataArray) {
		var povertyData = {
			"highest poverty": 0,
			"high poverty": 0,
			"moderate poverty": 0,
			"low poverty": 0,
			"minimal poverty": 0,
			"unknown": 0
		};
		dataArray.forEach(function(project){
			if (project.poverty_level === "highest poverty"){
				povertyData["highest poverty"]++;
			} else if (project.poverty_level === "high poverty"){
				povertyData["high poverty"]++;
			} else if (project.poverty_level === "moderate poverty"){
				povertyData["moderate poverty"]++;
			} else if (project.poverty_level === "low poverty"){
				povertyData["low poverty"]++;
			} else if (project.poverty_level === "minimal poverty"){
				povertyData["minimal poverty"]++;
			} else if (project.poverty_level === "unknown poverty" || project.poverty_level === "unknown"){
				povertyData["unknown"]++;
			}
		})

		return povertyData;
};


// }
