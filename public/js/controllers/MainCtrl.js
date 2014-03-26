angular.module('needometer.main', [])
	.controller('MainController',['$scope', '$http', function($scope, $http) {

		$scope.location1 = 'Texas';
		$scope.location2 = 'California';

	// when generating a query, stay on landing page and deliver query to view
	$http.get('/')
		.success(function(data) {
			$scope.query = data;
			// console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}]);