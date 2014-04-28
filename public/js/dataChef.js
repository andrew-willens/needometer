//==============================================================================
function makeGeoObject(geo_id) {
	$.get('/'+geo_id, function(data){
		var geo_object = {
			name: data.state_name,
			data_type: data.data_type,
			project_resources: data.project_resources,
		};

		// data-storage objects defined in bottomscripts of index.html
		query_cache.push(geo_object);
		snapshots_cache.push(geo_object);

		generateChart(geo_object); // in renderData.js
	});
}
//==============================================================================


//==============================================================================
function configChart(geo, data_type) {
	var chart_title = data_type+" Requested by DonorsChoose Projects in "+geo.name,
		data_provider = geo.resource;

	return {
		"type": "pie",
		"theme": "none",
		"titles": [{
			"text": chart_title,
			"size": 16
		}],
		"dataProvider": geo.project_resources,
    "valueField": "count",
    "titleField": "type",
    "startEffect": "elastic",
    "startDuration": 2,
    "labelRadius": 15,
    "innerRadius": "50%",
    "depth3D": 10,
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "angle": 15
	};
}
//==============================================================================


//==============================================================================
function reformat_D3_amCharts2(data, category, name) {
  var titles_text = "Subjects",
      dataProvider = data.subject;

  var colors = [
    "#FF0F00", "#FF6600", "#FF9E01", "#FCD202", "#F8FF01", "#B0DE09",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74",
    "#754DEB", "#DDDDDD", "#999999", "#333333", "#000000"
  ];

  for (var i=0; i<dataProvider.length; i++) {
    dataProvider[i].color = colors[i];
  }

  return {
    "theme": "none",
    "type": "serial",
    "startDuration": 2,
    "dataProvider": dataProvider,
    "valueAxes": [{
      "position": "left",
      "title": "Subjects in "+name
    }],
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "colorField": "color",
      "fillAlphas": 1,
      "lineAlpha": 0.1,
      "type": "column",
      "valueField": "count"
    }],
    "depth3D": 20,
    "angle": 30,
    "rotate": true,
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "type",
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 90
    }
  }
}
//==============================================================================

