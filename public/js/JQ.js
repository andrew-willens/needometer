function initSlider() {
	$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 2005,
      max: 2014,
      step: 1,
      values: [ 2005, 2014 ],
      slide: function( event, ui ) {
        $( "#years" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#years" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
	});
}

function initEvents(){
	$(".row").hide()

	$(document).on({
		ajaxStart: function() { $("body").addClass("loading"); },
		ajaxStop: function() { $("body").removeClass("loading"); }
	});

	$("#databtn").on("click", function(){
		fetchAndRenderData();
	})

	$("#clrdatabtn").on("click", function(){
		window.location = "/";
		// $(".demo-panel-white").remove();
		// $(".row").hide();
		// $("h3").show();
		// $("#databtn").show();
		// $(".state.selected").attr("class", "state");
		// $("#mapCanvas").show();
		// $("#col1").html("");
		// $("#col2").html("");
		// snapshotsCache = [];
		// selectedGeos = [];
	})
}

