// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("uphighontheroof", "Needometer", "aduguN4ancper8GccHok");

var DonorsChoose = require("temboo/Library/DonorsChoose");

var literacyAndLanguageChoreo = new DonorsChoose.LiteracyAndLanguage(session);

// Instantiate and populate the input set for the choreo
var literacyAndLanguageInputs = literacyAndLanguageChoreo.newInputSet();

// Set required inputs
// no required inputs

/////////////////////////
// Set optional inputs //
/////////////////////////

// The APIKey provided by DonorsChoose.org. Defaults to the test APIKey 'DONORSCHOOSE'.
// literacyAndLanguageInputs.set_APIKey("DONORSCHOOSE");

// The number of the first row to return in the result. For example, if index=10, the results could show rows 10-59.
literacyAndLanguageInputs.set_Index(1);

// The max number of projects to return. Can return up to 50 rows at a time. Defaults to 10 when left empty.
literacyAndLanguageInputs.set_Max(50);

// The format that the response should be in. Can be set to xml or json. Defaults to xml.
literacyAndLanguageInputs.set_ResponseFormat("JSON");

// Set to 1 to return facet counts in the response
literacyAndLanguageInputs.set_ShowCounts(1);

// Set to 1 to show the synopsis for each project listing
literacyAndLanguageInputs.set_ShowSynopsis(1);

// Enter a sub-category of Literacy & Language. When left empty, all Literacy & Language projects are returned.
// literacyAndLanguageInputs.set_Subject("History & Geography");
// literacyAndLanguageInputs.set_Subject("Civics & Government");
// literacyAndLanguageInputs.set_Subject("Economics");
// literacyAndLanguageInputs.set_Subject("Social Sciences");

//////////////////////////////////////////////////

// Run the choreo, specifying success and error callback handlers
literacyAndLanguageChoreo.execute(
  literacyAndLanguageInputs,
  function(results) {
    console.log(results.get_Response());
    return results.get_Response();
  },
  function(error) {
    console.log(error.type);
    console.log(error.message);
  }
);
