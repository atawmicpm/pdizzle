(function() {

	'use strict';

	require('angular');
	require('firebase');
	require('angularfire');

	var app = angular.module('pdizzle', ['firebase']);

	app.controller('HelloCtrl', ['$scope', '$firebase', function($scope, $firebase) {
	  $scope.test = 'Test varretjes';
	}]);


	app.directive('navigation', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/navigation.html',

			controller: function() {
				
				this.page = 'blog';

				this.setPage = function(page) {
					this.page = page;
				};
			
				this.isPage = function(page) {
					return this.page === page;
				};

			},
			
			controllerAs: 'navigation'
		}
	});




})();
