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

	$(document).on({
		ajaxStart: function() { $("body").addClass("loading"); },
		ajaxStop: function() { $("body").removeClass("loading"); }
	});

	$("#databtn").on("click", function(){
		fetchAndRenderData();
	})

	$("#clrbtn").on("click", function(){
		snapshotsCache = [];
		selectedGeos = [];
		$("#col1").html("");
		$("#col2").html("");
		$(".demo-panel-white").hide(1000);
		$("#clrbtn2").hide(1000);
		$("#clrbtn").show(2000);
		$("#databtn").show(2000);
		$("h4").show(2000);
		$(".state.selected").attr("class", "state");
		$("#mapCanvas").show(2000);
		$(".navbar-fixed-bottom").show(2000);
	})


	//==================== filter sidebar functionaility ====================//
	function showSidebar(btn) {
		var parent = $(btn).parent();

		if (parent.attr("id") === "ftglleft") {
			parent.css("left", "270px");
			$("#gf1").toggle(1000);
		} else {
			parent.css("right", "270px");
			$("#gf2").toggle(1000);
		}
	}

	function hideSidebar(btn) {
		var parent = $(btn).parent();

		if (parent.attr("id") === "ftglleft") {
			parent.css("left", "20px");
			$("#gf1").toggle(1000);
		} else {
			parent.css("right", "20px");
			$("#gf2").toggle(1000);
		}
		$(btn).prev().toggle(1000)
	}

	$(".tglbtn").on("click", function(){
		$(this).toggle();
		$(this).next().toggle(1000);

		if ($(this).hasClass("showsb")) {
			showSidebar(this);
		} else {
			hideSidebar(this);
		}
	})
	//================== end filter sidebar functionality ===================//

}
//==============================================================================
