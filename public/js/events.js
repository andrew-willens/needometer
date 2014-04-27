//===================== begin event handling ================================ //
function initEvents(){

	$(document).on({
		ajaxStart: function() { $("body").addClass("loading"); },
		ajaxStop: function() { $("body").removeClass("loading"); }
	});

	$("#databtn").on("click", function(){
		fetchAndRenderData();
	})

	$("#ftglleft").on("click", function() {
		tglLeftSidebar();
	})

	$("#ftglright").on("click", function() {
		tglRightSidebar();
	})

	$("#clrbtn").on("click", function(){
		snapshotsCache = [];
		selectedGeos = [];
		sgeonames = [];
		if ($("#ftglright").css("right") === "270px") tglRightSidebar();
		if ($("#ftglleft").css("left") === "270px") tglLeftSidebar();
		$("#gf2, #gf1").removeClass("toggled").addClass("untoggled");
		$(".brdcrmb, .demo-panel-white").hide();
		$(".geofilter h3").text("Please select an area.");
		$(".brdcrmb h3").text("");
		$("#col1").html("");
		$("#col2").html("");
		$(".state.selected").attr("class", "state");
		$("#mapCanvas").show(2000);
		$("#instructions").fadeIn(2000);
	})
}
//==============================================================================
