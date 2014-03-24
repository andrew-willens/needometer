// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("uphighontheroof", "Needometer", "aduguN4ancper8GccHok");

var DonorsChoose = require("temboo/Library/DonorsChoose");

var searchProjectsByKeywordChoreo = new DonorsChoose.SearchProjectsByKeyword(session);

// Instantiate and populate the input set for the choreo
var searchProjectsByKeywordInputs = searchProjectsByKeywordChoreo.newInputSet();

// Set required inputs
searchProjectsByKeywordInputs.set_Keyword("");

/////////////////////////
// Set optional inputs //
/////////////////////////

// The APIKey provided by DonorsChoose.org. Defaults to the test APIKey 'DONORSCHOOSE'.
// searchProjectsByKeywordInputs.set_APIKey("DONORSCHOOSE");

// The max number of projects to return. Can return up to 50 rows at a time. Defaults to 10 when left empty.
searchProjectsByKeywordInputs.set_Max(50);

// The format that the response should be in. Can be set to xml or json. Defaults to xml.
searchProjectsByKeywordInputs.set_ResponseFormat("JSON");

//////////////////////////////////////////////////

// Run the choreo, specifying success and error callback handlers
searchProjectsByKeywordChoreo.execute(
  searchProjectsByKeywordInputs,
  function(results) {
    console.log(results.get_Response());
    return results.get_Response();
  },
  function(error) {
    console.log(error.type);
    console.log(error.message);
  }
);
