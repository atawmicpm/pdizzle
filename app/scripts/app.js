(function() {

	'use strict';

	require('angular');
	require('firebase');
	require('angularfire');

	var app = angular.module('myApp', ['firebase']);

	app.controller('HelloCtrl', ['$scope', '$firebase', function($scope, $firebase) {
	  $scope.test = 'Test varretjes';
	}]);

})();
