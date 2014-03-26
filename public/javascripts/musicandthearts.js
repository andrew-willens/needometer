// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("uphighontheroof", "Needometer", "aduguN4ancper8GccHok");

var DonorsChoose = require("temboo/Library/DonorsChoose");

var musicAndTheArtsChoreo = new DonorsChoose.MusicAndTheArts(session);

// Instantiate and populate the input set for the choreo
var musicAndTheArtsInputs = musicAndTheArtsChoreo.newInputSet();

// Set required inputs
// no required inputs

/////////////////////////
// Set optional inputs //
/////////////////////////

// The APIKey provided by DonorsChoose.org. Defaults to the test APIKey 'DONORSCHOOSE'.
// musicAndTheArtsInputs.set_APIKey("DONORSCHOOSE");

// The number of the first row to return in the result. For example, if index=10, the results could show rows 10-59.
musicAndTheArtsInputs.set_Index(1);

// The max number of projects to return. Can return up to 50 rows at a time. Defaults to 10 when left empty.
musicAndTheArtsInputs.set_Max(50);

// The format that the response should be in. Can be set to xml or json. Defaults to xml.
musicAndTheArtsInputs.set_ResponseFormat("JSON");

// Set to 1 to return facet counts in the response
musicAndTheArtsInputs.set_ShowCounts(1);

// Set to 1 to show the synopsis for each project listing
musicAndTheArtsInputs.set_ShowSynopsis(1);

// Enter a sub-category of Music & The Arts. When left empty, all Music & The Arts projects are returned.
// musicAndTheArtsInputs.set_Subject("Performing Arts");
// musicAndTheArtsInputs.set_Subject("Visual Arts");
// musicAndTheArtsInputs.set_Subject("Music");

//////////////////////////////////////////////////

// Run the choreo, specifying success and error callback handlers
musicAndTheArtsChoreo.execute(
  musicAndTheArtsInputs,
  function(results) {
    console.log(results.get_Response());
    return results.get_Response();
  },
  function(error) {
    console.log(error.type);
    console.log(error.message);
  }
);
