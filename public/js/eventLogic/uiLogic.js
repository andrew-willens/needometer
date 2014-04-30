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
				$("#right-sidebar h3").text("Please select an area.");
		  	$("#area-blank2").html("<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>");
		  } else if (selected_areas.length === 0) {
		  	$("#left-sidebar h3").text("Please select an area.");
				$("#area-blank1").html("<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>");
		  }

		}
		//==========================================================================


		//================= called from eventHandling/mapEvents.js =================
		// populates the navbar blank space and sidebar headers with the name of the geographic area that is clicked.
		function assignNavAndSidebarHeaders() {
			$("#area-blank1 h3, #left-sidebar h3").text(sgeonames[0]);

		  $(".area-blank").css("display", "inline-block");
		  if (sgeonames[1]) {
		  	$("#area-blank2 h3, #right-sidebar h3").text(sgeonames[1]);
		  	$("#data-buttons").css("display", "inline-block");
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
				if ($("#left-sidebar").hasClass("open")) {
					toggleSidebar("left");
				};
				if ($("#right-sidebar").hasClass("open")) {
					toggleSidebar("right");
				};
				$("#data-buttons, .demo-panel-white").hide();
				$(".chartdiv").empty();
				$(".sidebar h3").text("Please select an area.");
				$("#area-blank1 h3, #area-blank2 h3").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
				$("#col1").html("");
				$("#col2").html("");
				$(".state.selected").attr("class", "state");
				$("#map-canvas").fadeIn(2000);
				$("#instructions").fadeIn(2000);
			}
		//==========================================================================

//============================================= end navbar logic =====================================//






//============================================= sidebar logic =======================================//
		// all functions called from eventHandling/nonmapEvents.js

		//============== called from eventHandling/nonmapEvents.js  ================
		// open or close both sidebars. if sidebar toggle-buttons (chevrons) is not displayed, display it.
		function toggleBothSidebars() {
		  var sa_length = selected_areas.length, // number of areas selected
		  		left_sidebar = $("#left-sidebar"),
		  		right_sidebar = $("#right-sidebar");

		  if ( sa_length === 1 && left_sidebar.hasClass("closed") || sa_length === 0 && left_sidebar.hasClass("open")) {
		  	toggleSidebar("left");
		  } else if (sa_length === 2 && right_sidebar.hasClass("closed") || sa_length === 1 && right_sidebar.hasClass("open")) {
		  	toggleSidebar("right");
		  }
		}
		//==========================================================================


		//================== called from eventHandling/nonmapEvents.js =============
		// open or close left or right sidebar, depending on value of "side" parameter.
		function toggleSidebar(side) {
			var sidebar = $("#"+side+"-sidebar"),
					chevron = $("#"+side+"-chevron");

			if (sidebar.css("display") === "none"){
				chevron.css(side, "270px").show(500);
				if ( sidebar.hasClass("closed") ) {
					sidebar.removeClass("closed").addClass("open");
				}
			} else {
				sidebar.removeClass("open").addClass("closed");
				chevron.css(side, "20px");
			}

			chevron.children().toggle(400);
			sidebar.toggle(1000);
		}
		//==========================================================================

//============================================= end sidebar logic =======================================//
