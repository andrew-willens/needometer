//=============== file README ===============
// Assigns functionality to events occurring on all DOM elements that are not the USA map. (Mouseovers and clicks.)
//=============== file README ===============




//===================== begin assign event handling (initEvents()) ===================================//
function initEvents(){ // assigns event handling to selected DOM elements


	//============================================================================
	// activates the css-class that displays the translucent "loading" spinner icon
	$(document).on({
		ajaxStart: function() {
			$("body").addClass("loading");
			$('#map-canvas').hide();
			$(".demo-panel-white").show();
		},
		ajaxStop: function() {
			$("body").removeClass("loading");
		}
	});
	//============================================================================


	//============================================================================
	// close sidebars and submit AJAX request for data-visualization data
	$("#get-data-button").on("click", function(){
		// in data/fetchData.js
		getChartData();

		// below functions in eventLogic/uiLogic.js
		toggleSidebar("left");
		toggleSidebar("right");
	})
	//============================================================================


	//============================================================================
	// open or close left sidebar
	$("#left-chevron").on("click", function() {
		toggleSidebar("left");
	})
	//============================================================================


	//============================================================================
	// open or close right sidebar
	$("#right-chevron").on("click", function() {
		toggleSidebar("right");
	})
	//============================================================================


	//============================================================================
	// close sidebars, unselect all areas, clear navbar instructions (in eventLogic/nonmapLogic.js)
	$("#reset-ui-button").on("click", function(){
		resetUI();
	})
	//============================================================================

}

//============================= end assign event handling (initEvents())=================================//