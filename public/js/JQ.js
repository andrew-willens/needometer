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
//==============================================================================


//==============================================================================
function initEvents(){
	$(".demo-panel-white").hide()
	$("#clrbtn2").hide()

	$(document).on({
		ajaxStart: function() { $("body").addClass("loading"); },
		ajaxStop: function() { $("body").removeClass("loading"); }
	});

	$("#databtn").on("click", function(){
		fetchAndRenderData();
	})

	$("#clrbtn").on("click", function(){
		$(".state.selected").attr("class", "state");
		snapshotsCache = [];
		selectedGeos = [];
	})

	$("#clrbtn2").on("click", function(){
		snapshotsCache = [];
		selectedGeos = [];
		$("#col1").html("");
		$("#col2").html("");
		$(".demo-panel-white").hide();
		$("#clrbtn2").hide();
		$("#clrbtn").show();
		$("#databtn").show();
		$("h4").show();
		$(".state.selected").attr("class", "state");
		$("#mapCanvas").show();
		$(".navbar-fixed-bottom").show();
	})

}
//==============================================================================
