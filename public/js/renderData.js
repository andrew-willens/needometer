//==============================================================================
var stateAbbrs = { AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming' }
//==============================================================================


//==============================================================================
function renderTwoSnapshots(){
	if (snapshotsCache.length >= 2) {
		generateSnapshots(); //in js/renderData.js.
		snapshotsCache = [];
	}
}
//==============================================================================


//==============================================================================
function generateSnapshots(){ //called in js/mapLogic.js
	var column_number = 0;

	$('#mapCanvas').hide();
	$(".demo-panel-white").show();

	snapshotsCache.forEach(function(geo){
		column_number++;
		var name = stateAbbrs[geo.NAME]
		snapshotText(geo.snapshot_text, name, column_number);
		var chartdiv = "chartdiv"+column_number;
		//jscharts pie/barcharts
		if (column_number == 1) {
      AmCharts.makeChart(chartdiv+"a", reformat_D3_amCharts(geo, "poverty", name));
      AmCharts.makeChart(chartdiv+"b", reformat_D3_amCharts(geo, "resource", name));
      AmCharts.makeChart(chartdiv+"c", reformat_D3_amCharts2(geo, "subject", name));
    } else {
      AmCharts.makeChart(chartdiv+"a", reformat_D3_amCharts(geo, "poverty", name));
      AmCharts.makeChart(chartdiv+"b", reformat_D3_amCharts(geo, "resource", name));
      AmCharts.makeChart(chartdiv+"c", reformat_D3_amCharts2(geo, "subject", name));
    }
	})

	stateDataCache = [];
}
//==============================================================================


//==============================================================================
function snapshotText(data, name, column){
	$("#col"+column).append("<h2>"+name+"</h2>"+commas(data.num_donors)+
		" donors contributed $"+commas(Math.floor(data.total_donations))+
		" to "+commas(data.projects)+" projects, reaching "+
		commas(data.students_reached)+" students.");
}

function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//==============================================================================