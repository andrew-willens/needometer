//==============================================================================
function povertyLevel(dataArray) {
	var povertyData = {};
	var povertyDataArray =[];
	dataArray.forEach(function(project){
		if (!povertyData[project.poverty_level]) {
			povertyData[project.poverty_level] = 1;
		} else {
			povertyData[project.poverty_level]++;
		}
	})

	for (var val in povertyData){
		povertyDataArray.push({'type':val, 'count':povertyData[val]});
	}

	povertyData = povertyDataArray;
	return povertyData;
};
//==============================================================================


//==============================================================================
function resourceType(dataArray) {
	var resourceData = {};
	var resourceDataArray =[];

	dataArray.forEach(function(project){
		if (!resourceData[project.resource_type]) {
			resourceData[project.resource_type] = 1;
		} else {
			resourceData[project.resource_type]++;
		}
	})

	for (var val in resourceData){
		resourceDataArray.push({'type':val, 'count':resourceData[val]});
	}

	resourceData = resourceDataArray;
	return resourceData;
}
//==============================================================================


//==============================================================================
function focusSubject(dataArray){
	var subjectData = {};
	var subjectDataArray =[];

	dataArray.forEach(function(project){
		if (!subjectData[project.primary_focus_subject]) {
			subjectData[project.primary_focus_subject] = 1;
		} else {
			subjectData[project.primary_focus_subject]++;
		}
	})

	for (var val in subjectData){
		subjectDataArray.push({'type':val, 'count':subjectData[val]});
	}

	subjectData = subjectDataArray;
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


function reformat_D3_amCharts(data, category) {
	var titles_text, dataProvider;

	if (category === "poverty") {
		titles_text = "Poverty";
		dataProvider = data.poverty;
	} else if (category === "resource") {
		titles_text = "Resources";
		dataProvider = data.resource;
	} else {
		titles_text = "Subjects";
		dataProvider = data.subject;
	}

	return {
		"type": "pie",
		"theme": "none",
		"titles": [{
			"text": titles_text+" in "+data.properties.NAME,
			"size": 16
		}],
		"dataProvider": dataProvider,
    "valueField": "count",
    "titleField": "type",
    "startEffect": "elastic",
    "startDuration": 2,
    "labelRadius": 15,
    "innerRadius": "50%",
    "depth3D": 10,
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "angle": 15
	};
}
