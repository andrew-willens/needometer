//==============================================================================
function selectJustTwo(geo) {
  if (selectedGeos.indexOf(geo.properties.STUSPS) === -1 && sgeonames.indexOf(geo.properties.NAME) === -1) {
  	selectedGeos.push(geo.properties.STUSPS);
  	sgeonames.push(geo.properties.NAME);
  }

  if (selectedGeos.length > 2) {
  	var restyle = selectedGeos.shift();
  	sgeonames.shift();
  	$("#"+restyle).attr("class", "state");
  }
}
//==============================================================================


//==============================================================================
function fetchAndRenderData(){ // called from js/map.js
	selectedGeos.forEach(function(geoId){
		makeGeoObject(geoId); //in
	});
}
//==============================================================================




