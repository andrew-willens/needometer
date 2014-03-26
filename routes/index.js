
/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {title: "Needometer"})
};


// module.exports = function(app){
//   // res.render('index', { title: 'Needometer' });

// 	//frontend routes ============================================================
// 	//route to handle all angular requests
// 	app.get('*', function(req, res) {
// 		res.sendfile('./public/views/index.html');// load our public/views/index.html file
// 	})
// };

