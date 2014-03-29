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
