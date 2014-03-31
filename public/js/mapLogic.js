function selectJustTwo(geo) {
  if (selectedGeos.indexOf(geo.id) === -1) {
  	selectedGeos.push(geo.id);
  }
  if (selectedGeos.length > 2) {
  	var restyle = selectedGeos.shift();
  	$("#"+restyle).attr("class", "state");
  }
}


function fetchAndRenderData(){ // called from js/map.js
	console.log('running')
	if (dataStore.length === 0) { //dataStore is an array instantiated in the bottomscripts of views/index.
		selectedGeos.forEach(function(geoId){
			console.log(geoId);
			makeGeoObject(geoId);
		});
	} else {
		dataStore.forEach(function(geo){
			selectedGeos.forEach(function(geogId){
				console.log(geogId)
				// if (geo.properties.STUSPS === geogId){
					// snapshotsCache.push(geo);
					// renderTwoSnapshots();
				// } else {
				// 	makeGeoObject();
				// }
			})
		});
	}
}

function makeGeoObject(geoId) {
	console.log('making geo object')
	$.get('/'+geoId, function(data){
		var projects = data.projects;
		var geoObject = {
			"NAME": geoId,
			"projects":projects,
			//these functions in js/dataChef;
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
