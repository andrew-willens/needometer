//=============== file README ===============
	// All logic (functions) for events that occur on the UI. (USA map, navbar, and sidebars.)
	// Logic tied to events for any DOM elements newly added to this application should be placed in this file.
//=============== file README ===============





//=================== Selected-areas tracking ======================================================//
		// NOTE - 'selected_areas' and 'sgeonames' are to be merged into a single object, where the values of 'selected_areas' will be keys to an object or array containing query filters and the full name of the area.

		var selected_areas = []; // holds one string for every area that is selected. (currently a maximum of two areas.) each string acts as an id that will be used to build a database query passed by GET request.

		var sgeonames = []; // holds names of selected areas, to populate sidebar headers and navbar instructions.

//========================== end selected-areas tracking ========================================//






//============================================= map logic =======================================//

		//================= called from js/eventHandling/mapEvents.js ==============
		// prevents user from selecting more than two areas on the map.
		function selectJustTwoAreas(geo) {
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
		//==========================================================================


		//================== called from eventHandling/mapEvents.js ================
		// unselects a geographic area on the UI map.
		function unselectArea(area){
			var id_index = selected_areas.indexOf(area.properties.STUSPS), // area.properties.STUSPS = state abbr, ie "NV" for Nevada
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
		//==========================================================================


		//================= called from eventHandling/mapEvents.js =================
		// populates the navbar blank space and sidebar headers with the name of the geographic area that is clicked.
		function assignNavAndSidebarHeaders() {
			$("#brdcrmb1 h3, #leftsidebar h3").text(sgeonames[0]);

		  $("#brdcrmb1").css("display", "inline-block");
		  if (sgeonames[1]) {
		  	$("#brdcrmb2 h3, #rightsidebar h3").text(sgeonames[1]);
		  	$("#brdcrmb3").css("display", "inline-block");
		  }
		}
		//==========================================================================

//============================================= end map logic =======================================//






//============================================= navbar logic =======================================//

		//============== called from eventHandling/nonmapEvents.js =================
		// unselects all areas on the UI map, clears the sidebar headbars, and clears the nvabar blank spaces.
			function resetUI() {
				selected_areas = [];
				sgeonames = [];
				if ($("#leftsidebar").hasClass("open")) toggleLeftSidebar();
				if ($("#rightsidebar").hasClass("open")) toggleRightSidebar();
				$("#brdcrmb3, .demo-panel-white").hide();
				$("chartdiv").empty();
				$(".geofilter h3").text("Please select an area.");
				$("#brdcrmb1 h3, #brdcrmb2 h3").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
				$("#col1").html("");
				$("#col2").html("");
				$(".state.selected").attr("class", "state");
				$("#mapCanvas").fadeIn(2000);
				$("#instructions").fadeIn(2000);
			}
		//==========================================================================

//============================================= end navbar logic =====================================//






//============================================= sidebar logic =======================================//
		// all functions called from eventHandling/nonmapEvents.js

		//============== called from eventHandling/nonmapEvents.js  ================
		// open or close both sidebars. if sidebar toggle-buttons (chevrons) is not displayed, display it.
		function toggleSidebars() {
		  var sa_length = selected_areas.length, // number of areas selected
		  		left_sidebar = $("#leftsidebar"),
		  		right_sidebar = $("#rightsidebar");

		  if ( sa_length === 1 && left_sidebar.hasClass("closed") || sa_length === 0 && left_sidebar.hasClass("open")) {
		  	toggleLeftSidebar();
		  } else if (sa_length === 2 && right_sidebar.hasClass("closed") || sa_length === 1 && right_sidebar.hasClass("open")) {
		  	toggleRightSidebar();
		  }
		}
		//==========================================================================


		//================== called from eventHandling/nonmapEvents.js =============
		// open or close left sidebar.
		function toggleLeftSidebar() {
			var left_sidebar = $("#leftsidebar"),
					left_chevron = $("#leftchevron");

			if (left_sidebar.css("display") === "none"){
				left_chevron.css("left", "270px").show(500);
				if ( left_sidebar.hasClass("closed") ) {
					left_sidebar.removeClass("closed").addClass("open");
				}
			} else {
				left_sidebar.removeClass("open").addClass("closed");
				left_chevron.css("left", "20px");
			}

			left_chevron.children().toggle(400);
			left_sidebar.toggle(1000);
		}
		//==========================================================================


		//=============== called from eventHandling/nonmapEvents.js ================
		// open or close right sidebar.
		function toggleRightSidebar() {
			var right_sidebar = $("#rightsidebar"),
					right_chevron = $("#rightchevron");

			if (right_sidebar.css("display") === "none"){
				right_chevron.css("right", "270px").show(500);
				if ( right_sidebar.hasClass("closed") ) {
					right_sidebar.removeClass("closed").addClass("open");
				}
			} else {
				right_sidebar.removeClass("open").addClass("closed");
				right_chevron.css("right", "20px");
			}

			right_chevron.children().toggle(400);
			right_sidebar.toggle(1000);
		}
		//==========================================================================

//============================================= end sidebar logic =======================================//
