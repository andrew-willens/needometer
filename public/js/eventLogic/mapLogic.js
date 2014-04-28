//=============== file README ===============

// All logic (functions) for event that occur on USA map.

//=============== file README ===============


//=================== Selected-areas tracking ==================================
		// NOTE - 'selected_areas' and 'sgeonames' are to be merged into a single object, where the values of 'selected_areas' will be keys to an object or array containing query filters and the full name of the area.

		// holds one string for every area that is selected. (currently a maximum of two areas.) each string acts as an id that will be used to build a database query passed by GET request.
		var selected_areas = [];

		// holds names of selected areas, to populate sidebar headers and navbar instructions.
		var sgeonames = [];
//========================== end selected-areas tracking =======================


//==============================================================================
function selectJustTwo(geo) { // called from js/map.js
  if (selected_areas.indexOf(geo.properties.STUSPS) === -1 && sgeonames.indexOf(geo.properties.NAME) === -1) {
  	selected_areas.push(geo.properties.STUSPS);
  	sgeonames.push(geo.properties.NAME);
  }

  if (selected_areas.length > 2) {
  	var restyle = selected_areas.shift();
  	sgeonames.shift();
  	$("#"+restyle).attr("class", "state");
  }

}
//==============================================================================


//==============================================================================
	function unselect(area){ // called from "(state).onclick function(){ else {}} (in eventHandling/mapEvents.js)
		var id_index = selected_areas.indexOf(area.properties.STUSPS), //state abbr, ie "NV" for Nevada
				name_index = sgeonames.indexOf(area.properties.NAME);

		selected_areas.splice(id_index, 1);
		sgeonames.splice(name_index, 1);

		if (selected_areas.length === 1) {
			$("#rightsidebar h3").text("Please select an area.");
	  	$("#brdcrmb2").html("<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>");
	  } else if (selected_areas.length === 0) {
	  	$("#leftsidebar h3").text("Please select an area.");
			$("#brdcrmb1").html("<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>");
	  }

	}
//==============================================================================