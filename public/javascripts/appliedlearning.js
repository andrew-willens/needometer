// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("uphighontheroof", "Needometer", "aduguN4ancper8GccHok");

var DonorsChoose = require("temboo/Library/DonorsChoose");

var appliedLearningChoreo = new DonorsChoose.AppliedLearning(session);

// Instantiate and populate the input set for the choreo
var appliedLearningInputs = appliedLearningChoreo.newInputSet();

// Set required inputs
// no required inputs

/////////////////////////
// Set optional inputs //
/////////////////////////

// The APIKey provided by DonorsChoose.org. Defaults to the test APIKey 'DONORSCHOOSE'.
// appliedLearningInputs.set_APIKey("DONORSCHOOSE");

// The number of the first row to return in the result. For example, if index=10, the results could show rows 10-59.
appliedLearningInputs.set_Index(1);

// The max number of projects to return. Can return up to 50 rows at a time. Defaults to 10 when left empty.
appliedLearningInputs.set_Max(50);

// The format that the response should be in. Can be set to xml or json. Defaults to xml.
appliedLearningInputs.set_ResponseFormat("JSON");

// Set to 1 to return facet counts in the response
appliedLearningInputs.set_ShowCounts(1);

// Set to 1 to show the synopsis for each project listing
appliedLearningInputs.set_ShowSynopsis(0);

// Enter a sub-category of Applied Learning. When left empty, all Applied Learning projects are returned.
// appliedLearningInputs.set_Subject("Early Development");
// appliedLearningInputs.set_Subject("Community Service");
// appliedLearningInputs.set_Subject("Character Education");
// appliedLearningInputs.set_Subject("College & Career Prep");
// appliedLearningInputs.set_Subject("Extra Curricular");
// appliedLearningInputs.set_Subject("Parental Involvement");
// appliedLearningInputs.set_Subject("Other");

//////////////////////////////////////////////////

// Run the choreo, specifying success and error callback handlers
appliedLearningChoreo.execute(
  appliedLearningInputs,
  function(results) {
    console.log(results.get_Response());
    return results.get_Response();
  },
  function(error) {
    console.log(error.type);
    console.log(error.message);
  }
);
