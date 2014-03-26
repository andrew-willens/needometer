// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("uphighontheroof", "Needometer", "aduguN4ancper8GccHok");

var DonorsChoose = require("temboo/Library/DonorsChoose");

var mathAndScienceChoreo = new DonorsChoose.MathAndScience(session);

// Instantiate and populate the input set for the choreo
var mathAndScienceInputs = mathAndScienceChoreo.newInputSet();

// Set required inputs
// no required inputs

/////////////////////////
// Set optional inputs //
/////////////////////////

// The APIKey provided by DonorsChoose.org. Defaults to the test APIKey 'DONORSCHOOSE'.
// mathAndScienceInputs.set_APIKey("DONORSCHOOSE");

// The number of the first row to return in the result. For example, if index=10, the results could show rows 10-59.
mathAndScienceInputs.set_Index(1);

// The max number of projects to return. Can return up to 50 rows at a time. Defaults to 10 when left empty.
mathAndScienceInputs.set_Max(50);

// The format that the response should be in. Can be set to xml or json. Defaults to xml.
mathAndScienceInputs.set_ResponseFormat("JSON");

// Set to 1 to show the synopsis for each project listing
mathAndScienceInputs.set_ShowSynopsis(1);

// Enter a sub-category of Math & Science. When left empty, all Math & Science projects are returned.
// mathAndScienceInputs.set_Subject("Health & Life Science");
// mathAndScienceInputs.set_Subject("Applied Science");
// mathAndScienceInputs.set_Subject("Environmental Science");
// mathAndScienceInputs.set_Subject("Mathematics");

//////////////////////////////////////////////////

// Run the choreo, specifying success and error callback handlers
mathAndScienceChoreo.execute(
  mathAndScienceInputs,
  function(results) {
    console.log(results.get_Response());
    return results.get_Response();
  },
  function(error) {
    console.log(error.type);
    console.log(error.message);
  }
);
