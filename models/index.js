// refer to
// http://blog.mongodb.org/post/52299826008/the-mean-stack-mistakes-youre-probably-making-with
// for information on nested schemas used here

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/donorschoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;

var projectSchema = new Schema({
  '_projectid': String,
  '_teacher_acctid': String,
  '_schoolid': String,
  'school_ncesid': String,
  'school_latitude': Number,
  'school_longitude': Number,
  'school_city': String,
  'school_state': String,
  'school_zip': Number,
  'school_metro': String,
  'school_district': String,
  'school_county': String,
  'school_charter': Boolean,
  'school_magnet': Boolean,
  'school_year_round': Boolean,
  'school_nlns': Boolean,
  'school_kipp': Boolean,
  'school_charter_ready_promise': Boolean,
  'teacher_prefix': String,
  'teacher_teach_for_america': Boolean,
  'teacher_ny_teaching_fellow': Boolean,
  'primary_focus_subject': String,
  'primary_focus_area': String,
  'secondary_focus_subject': String,
  'secondary_focus_area': String,
  'resource_type': String,
  'poverty_level': String,
  'grade_level': String,
  'vendor_shipping_charges': Number,
  'sales_tax': Number,
  'payment_processing_charges': Number,
  'fulfillment_labor_materials': Number,
  'total_price_excluding_optional_support': Number,
  'total_price_including_optional_support': Number,
  'students_reached': Number,
  'total_donations': Number,
  'num_donors': Number,
  'eligible_double_your_impact_match': Boolean,
  'eligible_almost_home_match': Boolean,
  'funding_status': String,
  'date_posted': Date,
  'date_completed': Date,
  'date_thank_you_packet_mailed': Date,
  'date_expiration': Date
});

var countiesSchema = new Schema({
  'type': String,
  // properties will have these attributes:
  // STATEFP (String), AWATER (Number), Projects (Object Array)
  'properties': Object, // includes state
  'id': String,
  'arcs': Array
  // 'school_state': String,
  // 'school_county': String
});

var statesSchema = new Schema({
  // 'school_state': String
  'school_state': [countiesSchema]
});

var Project = mongoose.model('Project', projectSchema);
var Counties = mongoose.model('Counties', countiesSchema);
var States = mongoose.model('States', statesSchema);

module.exports = { 'Project': Project, 'Counties': Counties, 'States': States };
