var mod = angular.module('app', ['ngRoute']);

mod.controller('BuyPolicyCtrl', BuyPolicyCtrl);
function BuyPolicyCtrl($scope) {
	debugger
}

mod.controller('ClaimCtrl', ClaimCtrl);
function ClaimCtrl($scope) {
	debugger
}

mod.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$locationProvider.html5Mode = false;

	$routeProvider.caseInsensitiveMatch = true;
	$routeProvider
	.when('/buy', {
		// controller: 'BuyPolicyCtrl',
		templateUrl: '/templates/buy.html'
	})
	.when('/claim', {
		// controller: 'ClaimCtrl',
		templateUrl: '/templates/claim.html'
	})
	.when('/', {
		templateUrl: '/templates/home.html'
	});
}]);
