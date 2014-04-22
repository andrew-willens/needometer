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
	// fetchAndRenderData();

	$(document).on({
		ajaxStart: function() { $("body").addClass("loading"); },
		ajaxStop: function() { $("body").removeClass("loading"); }
	});

	$("#slctbtn").on("click", function(){
		if ($("#brdcrmb2").css("display") === "none") {
			if ($("#ftglleft").css("display") === "none") {
				$("#ftglleft").toggle(1000);
			}
			tglLeftSidebar();
		} else {
			if ($("#ftglright").css("display") === "none") {
				$("#ftglright").toggle(1000);
			}
			tglRightSidebar();
		}
	})

	$("#ftglleft").on("click", function() {
		tglLeftSidebar();
	})

	$("#ftglright").on("click", function() {
		tglRightSidebar();
	})

	$("#fltrbtn1").on("click", function(){
		$("#brdcrmb2").fadeIn(2000);
		tglLeftSidebar();
	});

	$("#fltrbtn2").on("click", function(){
		$("#brdcrmb3").fadeIn(2000).css("display", "inline");
		tglRightSidebar();
	});

	$("#backbtn").on("click", function(){
		$(".brdcrmb2").fadeOut(2000);
	});

	$("#clrbtn").on("click", function(){
		snapshotsCache = [];
		selectedGeos = [];
		$("#col1").html("");
		$("#col2").html("");
		$(".demo-panel-white").hide(1000);
		$("#databtn").show(2000);
		$(".state.selected").attr("class", "state");
		$("#mapCanvas").show(2000);
	})


	//==================== filter sidebar functionaility ====================//

	function tglLeftSidebar() {
		if ($("#gf1").css("display") === "none"){
			$("#ftglleft").css("left", "270px");
		} else {
			$("#ftglleft").css("left", "20px");
		}
		$("#ftglleft").children().toggle(400);
		$("#gf1").toggle(1000);
	}

	function tglRightSidebar() {
		if ($("#gf2").css("display") === "none"){
			$("#ftglright").css("right", "270px");
		} else {
			$("#ftglright").css("right", "20px");
		}
		$("#ftglright").children().toggle(400);
		$("#gf2").toggle(1000);
	}
	//================== end filter sidebar functionality ===================//

}
//==============================================================================
