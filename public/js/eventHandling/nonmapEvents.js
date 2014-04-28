//=============== file README ===============

// Assigns functionality to events occurring on all DOM elements that are not the USA map. (Mouseovers and clicks.)

//=============== file README ===============



//===================== begin event handling ================================ //
function initEvents(){

	$(document).on({
		ajaxStart: function() { $("body").addClass("loading"); },
		ajaxStop: function() { $("body").removeClass("loading"); }
	});

	$("#databtn").on("click", function(){
		getChartData(); //in dataChef.js
		tglLeftSidebar();
		tglRightSidebar();
		$("#brdcrmb1, #brdcrmb2").fadeOut(1000);
	})

	$("#leftchevron").on("click", function() {
		tglLeftSidebar();
	})

	$("#rightchevron").on("click", function() {
		tglRightSidebar();
	})

	$("#clrbtn").on("click", function(){
		// close sidebars, unselect all areas, clear navbar instructions (in eventLogic/nonmapLogic.js)
		resetUI();
	})

}
//==============================================================================
