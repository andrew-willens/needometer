
//Dependencies =================================================================
var fs = ('fs');
//==============================================================================


//==============================================================================
function povertyLevel(dataArray) {
	var povertyData = {};

	dataArray.forEach(function(project){
		if (!povertyData[project.poverty_level]) {
			povertyData[project.poverty_level] = 1;
		} else {
			povertyData[project.poverty_level]++;
		}
	})

	// fs.writeFile('data/poverty.csv', )
	return povertyData;
};
//==============================================================================


//==============================================================================
function resourceType(dataArray) {
	var resourceData = {};

	dataArray.forEach(function(project){
		if (!resourceData[project.resource_type]) {
			resourceData[project.resource_type] = 1;
		} else {
			resourceData[project.resource_type]++;
		}
	})

	return resourceData
}
//==============================================================================


//==============================================================================
function focusSubject(dataArray){
	var subjectData = {};

	dataArray.forEach(function(project){
		if (!subjectData[project.primary_focus_subject]) {
			subjectData[project.primary_focus_subject] = 1;
		} else {
			subjectData[project.primary_focus_subject]++;
		}
	})

	return subjectData
}
//==============================================================================


//==============================================================================
function summableProperties(dataArray){
	var properties = ['num_donors', 'total_donations', 'students_reached'];
	var all_prop_obj = {
		'projects': 0
	};

	dataArray.forEach(function(project){
		all_prop_obj.projects++;
		properties.forEach(function(prop){
			if (!all_prop_obj[prop]) {
				all_prop_obj[prop] = project[prop];
			} else {
				all_prop_obj[prop] += project[prop];
			}
		})
	});
	return all_prop_obj;
}
//==============================================================================


//==============================================================================

//==============================================================================


