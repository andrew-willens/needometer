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
			$('#mapCanvas').hide();
			$(".demo-panel-white").show();
		},
		ajaxStop: function() {
			$("body").removeClass("loading");
		}
	});
	//============================================================================


	//============================================================================
	// close sidebars and submit AJAX request for data-visualization data
	$("#databtn").on("click", function(){
		// in data/fetchData.js
		getChartData();

		// below functions in eventLogic/uiLogic.js
		toggleLeftSidebar();
		toggleRightSidebar();

		$("#brdcrmb1, #brdcrmb2").fadeOut(1000);
	})
	//============================================================================


	//============================================================================
	// open or close left sidebar
	$("#leftchevron").on("click", function() {
		toggleLeftSidebar();
	})
	//============================================================================


	//============================================================================
	// open or close right sidebar
	$("#rightchevron").on("click", function() {
		toggleRightSidebar();
	})
	//============================================================================


	//============================================================================
	// close sidebars, unselect all areas, clear navbar instructions (in eventLogic/nonmapLogic.js)
	$("#clrbtn").on("click", function(){
		resetUI();
	})
	//============================================================================

}

//============================= end assign event handling (initEvents())=================================//