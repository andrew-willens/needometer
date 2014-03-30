function fetchAndRenderData(geography){ // called from js/map.js
	if (dataStore.length === 0) {
		makeGeoObject(geography);
	} else {
	// if (snapshotsCache.length === 0 || (geography.properties.NAME !== snapshotsCache[0].properties.NAME)){
		dataStore.forEach(function(geo){ //dataStore is an array instantiated in the bottomscripts of views/index.html
		if (geo.properties.NAME === geography.properties.NAME){
			snapshotsCache.push(geo);
			renderTwoSnapshots();
		} else {
			makeGeoObject(geography);
		}
	});
	}
}

function makeGeoObject(geo) {
	$.get('/'+geo.properties.STUSPS, function(data){
		var projects = data.projects;
		var geoObject = {
			"properties": geo.properties,
			"projects":projects,
			"poverty": povertyLevel(projects),
			"resource": resourceType(projects),
			"subject": focusSubject(projects),
			"snapshot_text": summableProperties(projects)
		};
		dataStore.push(geoObject);
		snapshotsCache.push(geoObject);
		renderTwoSnapshots()
	});
}

function renderTwoSnapshots(){
	if (snapshotsCache.length >= 2) {
		generateSnapshots(); //in js/renderData.js.
		snapshotsCache = [];
	}
}
