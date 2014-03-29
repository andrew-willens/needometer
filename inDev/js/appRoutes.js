appRoutes = angular.module('appRoutes', ['$stateProvider', '$locationProvider'])

appRoutes.config(function($routeProvider, $locationProvider) {
	$routeProvider
	//home page
	.when('/',{
		templateUrl: 'views/index.html',
		// controller: 'MainController'
	})

		$locationProvider.html5Mode(true);
});