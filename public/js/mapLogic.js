//==============================================================================
function selectJustTwo(geo) { // called from js/map.js
  if (selected_geos.indexOf(geo.properties.STUSPS) === -1 && sgeonames.indexOf(geo.properties.NAME) === -1) {
  	selected_geos.push(geo.properties.STUSPS);
  	sgeonames.push(geo.properties.NAME);
  }

  if (selected_geos.length > 2) {
  	var restyle = selected_geos.shift();
  	sgeonames.shift();
  	$("#"+restyle).attr("class", "state");
  }
}
//==============================================================================


//==============================================================================
function fetchAndRenderData(){ // called from js/map.js
	selected_geos.forEach(function(geo_id){
		makeGeoObject(geo_id); // js/dataChef.js
	});
}
//==============================================================================




