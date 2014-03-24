// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("uphighontheroof", "Needometer", "aduguN4ancper8GccHok");

var DonorsChoose = require("temboo/Library/DonorsChoose");

var specialNeedsChoreo = new DonorsChoose.SpecialNeeds(session);

// Instantiate and populate the input set for the choreo
var specialNeedsInputs = specialNeedsChoreo.newInputSet();

// Set required inputs
// no required inputs

/////////////////////////
// Set optional inputs //
/////////////////////////

// The APIKey provided by DonorsChoose.org. Defaults to the test APIKey 'DONORSCHOOSE'.
// specialNeedsInputs.set_APIKey("DONORSCHOOSE");

// The number of the first row to return in the result. For example, if index=10, the results could show rows 10-59.
specialNeedsInputs.set_Index(1);

// The max number of projects to return. Can return up to 50 rows at a time. Defaults to 10 when left empty.
specialNeedsInputs.set_Max(50);

// The format that the response should be in. Can be set to xml or json. Defaults to xml.
specialNeedsInputs.set_ResponseFormat("JSON");

// Set to 1 to show the synopsis for each project listing
specialNeedsInputs.set_ShowSynopsis(1);

//////////////////////////////////////////////////

// Run the choreo, specifying success and error callback handlers
specialNeedsChoreo.execute(
  specialNeedsInputs,
  function(results) {
    console.log(results.get_Response());
    return results.get_Response();
  },
  function(error) {
    console.log(error.type);
    console.log(error.message);
  }
);