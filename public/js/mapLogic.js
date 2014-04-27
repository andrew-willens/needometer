function selectJustTwo(geo) {
  if (selectedGeos.indexOf(geo.properties.STUSPS) === -1 && sgeonames.indexOf(geo.properties.NAME) === -1) {
  	selectedGeos.push(geo.properties.STUSPS);
  	sgeonames.push(geo.properties.NAME);
  }

  if (selectedGeos.length > 2) {
  	sgeonames.shift();
  	var restyle = selectedGeos.shift();
  	$("#"+restyle).attr("class", "state");
  }
}

function assignHeaders() {
	$("#brdcrmb1 h3, #gf1 h3").text(sgeonames[0]);
  $("#brdcrmb2 h3, #gf2 h3").text(sgeonames[1]);

  if ($("#brdcrmb1 h3").text()) { $("#brdcrmb1").css("display", "inline-block").show(); }
  if ($("#brdcrmb2 h3").text()) { $("#brdcrmb2").css("display", "inline-block").show(); }
}

function toggleSidebars() {
  if (selectedGeos.length === 1 && $("#gf1").hasClass("untoggled")) {
  	tglLeftSidebar();
  } else if (selectedGeos.length === 2 && $("#gf2").hasClass("untoggled")) {
  	tglRightSidebar();
  	$("#brdcrmb3").css("display", "inline-block").fadeIn(3000);
  }
}

function fetchAndRenderData(){ // called from js/map.js
	selectedGeos.forEach(function(geoId){
		makeGeoObject(geoId);
	});
}

function makeGeoObject(geoId) {
	$.get('/'+geoId, function(data){
		var projects = data.projects;
		var geoObject = {
			"NAME": geoId,
			"projects":projects,
			//these functions in js/dataChef;
			"poverty": povertyLevel(projects),
			"resource": resourceType(projects),
			"subject": focusSubject(projects),
			"snapshot_text": summableProperties(projects)
		};
		dataStore.push(geoObject);
		snapshotsCache.push(geoObject);
		renderTwoSnapshots()
	});
}

function renderTwoSnapshots(){
	if (snapshotsCache.length >= 2) {
		generateSnapshots(); //in js/renderData.js.
		snapshotsCache = [];
	}
}

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

