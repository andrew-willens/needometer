//==============================================================================
		// holds data objects that will be passed back from database query after areas and filters are selected. is iterated over by generateChart (in data/renderData.js) to create data visualizations.
		var snapshots_cache = [];
//==============================================================================


//==============================================================================
function assignHeaders() {
	$("#brdcrmb1 h3, #leftsidebar h3").text(sgeonames[0]);
  $("#brdcrmb2 h3, #rightsidebar h3").text(sgeonames[1]);

  if ($("#brdcrmb1 h3").text()) $("#brdcrmb1").css("display", "inline-block").show();
  if ($("#brdcrmb2 h3").text().indexOf(" ") !== -1) {
  	$("#brdcrmb3").css("display", "inline-block");
  }
}
//==============================================================================


//============================ reset selectors =================================
	function resetUI() {
		snapshots_cache = [];
		selected_areas = [];
		sgeonames = [];
		if ($("#leftsidebar").hasClass("open")) tglLeftSidebar();
		if ($("#rightsidebar").hasClass("open")) tglRightSidebar();
		$("#brdcrmb3, .demo-panel-white").hide();
		$(".geofilter h3").text("Please select an area.");
		$("#brdcrmb1, #brdcrmb2").html("<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>");
		$("#col1").html("");
		$("#col2").html("");
		$(".state.selected").attr("class", "state");
		$("#mapCanvas").show(2000);
		$("#instructions").fadeIn(2000);
	}
//============================ end reset selectors =============================

//==================== filter sidebar functionaility =========================//
	function toggleSidebars() {
	  var sa_length = selected_areas.length, // number of areas selected
	  		left_sidebar = $("#leftsidebar"),
	  		right_sidebar = $("#rightsidebar");

	  if ( sa_length === 1 && left_sidebar.hasClass("closed") || sa_length === 0 && left_sidebar.hasClass("open")) {
	  	tglLeftSidebar();
	  } else if (sa_length === 2 && right_sidebar.hasClass("closed") || sa_length === 1 && right_sidebar.hasClass("open")) {
	  	tglRightSidebar();
	  }
	}

	function tglLeftSidebar() {
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
	//=======================================================
	function tglRightSidebar() {
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
//================== end filter sidebar functionality ========================//
