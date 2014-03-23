// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("uphighontheroof", "Needometer", "aduguN4ancper8GccHok");

var Google = require("temboo/Library/Google/Geocoding");

var geocodeByAddressChoreo = new Google.GeocodeByAddress(session);

// Instantiate and populate the input set for the choreo
var geocodeByAddressInputs = geocodeByAddressChoreo.newInputSet();

// Set inputs
geocodeByAddressInputs.set_Address("104 Franklin St., New York NY 10013");

// Run the choreo, specifying success and error callback handlers
geocodeByAddressChoreo.execute(
  geocodeByAddressInputs,
  function(results) {
    console.log("Latitude: %s", results.get_Latitude());
    console.log("Longitude: %s", results.get_Longitude());
  },
  function(error) {
  console.log(error.type);
  console.log(error.message);
  }
);
