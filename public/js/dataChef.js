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


//==============================================================================
function reformat_D3_amCharts(data, category, name) {
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
			"text": titles_text+" in "+name,
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
//==============================================================================


//==============================================================================
function reformat_D3_amCharts2(data, category, name) {
  console.log("data2:");
  console.log(data);
  console.log("category2:");
  console.log(category);

  var titles_text, dataProvider;

  titles_text = "Subjects";
  dataProvider = data.subject;

  // console.log("dataProvider2 (before colors):")
  // console.log(dataProvider);

  var colors = [
    "#FF0F00", "#FF6600", "#FF9E01", "#FCD202", "#F8FF01", "#B0DE09",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#754DEB", "#DDDDDD", "#999999", "#333333", "#000000"
  ];
  // for (var i<0; i<dataProvider.length; i++) {
  for (var i=0; i<dataProvider.length; i++) {
    dataProvider[i].color = colors[i];
  }

  // console.log("dataProvider2 (before colors):")
  // console.log(dataProvider);

  return {
    "theme": "none",
    "type": "serial",
    "startDuration": 2,
    "dataProvider": dataProvider,
    "valueAxes": [{
      "position": "left",
      "title": "Subjects in "+name
    }],
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "colorField": "color",
      "fillAlphas": 1,
      "lineAlpha": 0.1,
      "type": "column",
      "valueField": "count"
    }],
    "depth3D": 20,
    "angle": 30,
    "rotate": true,
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "type",
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 90
    }
  }
}
//==============================================================================

