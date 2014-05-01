//=============== file README ===============
// Assigns functionality to events occurring on all DOM elements that are not the USA map. (Mouseovers and clicks.)
//=============== file README ===============




//============================== begin initEvents()) ===================================//
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
	// close sidebars and submit AJAX requests for each selected area's data
	$("#get-data-button").on("click", function(){
		chart_generation_tracker = true;
		$("#get-data-button").hide();
		// in eventLogic/uiLogic.js
		var query_strings_array = getSpecsAndBuildQuery();

		// in data/fetchData.js
		getChartData(query_strings_array);

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
//============================= end initEvents()=================================//


//==============================================================================
	// function initSlider() {
	// 	$(function() {
	//     $( "#slider-range" ).slider({
	//       range: true,
	//       min: 2005,
	//       max: 2014,
	//       step: 1,
	//       values: [ 2005, 2014 ],
	//       slide: function( event, ui ) {
	//         $( "#years" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
	//       }
	//     });
	//     $( "#years" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
	//       " - " + $( "#slider-range" ).slider( "values", 1 ) );
	// 	});
	// }
// ==============================================================================
