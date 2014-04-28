//==============================================================================
function assignHeaders() {
	$("#brdcrmb1 h3, #gf1 h3").text(sgeonames[0]);
  $("#brdcrmb2 h3, #gf2 h3").text(sgeonames[1]);

  if ($("#brdcrmb1 h3").text()) $("#brdcrmb1").css("display", "inline-block").show();
  if ($("#brdcrmb2 h3").text()) {
  	$("#brdcrmb2").css("display", "inline-block").show();
  	$("#brdcrmb3").css("display", "inline-block").fadeIn(3000);
  }
}
//==============================================================================


//==============================================================================
function toggleSidebars() {
  if (selected_geos.length === 1 && $("#gf1").hasClass("untoggled")) {
  	tglLeftSidebar();
  } else if (selected_geos.length === 2 && $("#gf2").hasClass("untoggled")) {
  	tglRightSidebar();
  }
}
//==============================================================================



//==================== filter sidebar functionaility =========================//
	function tglLeftSidebar() {
		var leftSidebar = $("#gf1");

		if (leftSidebar.css("display") === "none"){
			$("#ftglleft").css("left", "270px").show(500);
			if ( leftSidebar.hasClass("untoggled") ) {
				leftSidebar.removeClass("untoggled").addClass("toggled");
			}
		} else {
			$("#ftglleft").css("left", "20px");
		}

		$("#ftglleft").children().toggle(400);
		leftSidebar.toggle(1000);
	}
	//=======================================================
	function tglRightSidebar() {
		var rightSidebar = $("#gf2");

		if (rightSidebar.css("display") === "none"){
			$("#ftglright").css("right", "270px").show(500);
			if ( rightSidebar.hasClass("untoggled") ) {
				rightSidebar.removeClass("untoggled").addClass("toggled");
			}
		} else {
			$("#ftglright").css("right", "20px");
		}

		$("#ftglright").children().toggle(400);
		rightSidebar.toggle(1000);
	}
//================== end filter sidebar functionality ========================//
