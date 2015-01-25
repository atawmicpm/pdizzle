(function() {

	'use strict';

	require('angular');
	require('angular-route');
	require('firebase');
	require('angularfire');

	var app = angular.module('pdizzle', ['ngRoute', 'firebase']);

	// Routing
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider

			.when('/blog', {
				templateUrl: 'templates/blog.html',
				controller: 'BlogController'
			})

			.when('/about', {
				templateUrl: 'templates/about.html',
				controller: 'AboutController'
			})


			.when('/resume', {
				templateUrl: 'templates/resume.html',
				controller: 'ResumeController'
			})

			.when('/portfolio', {
				templateUrl: 'templates/portfolio.html',
				controller: 'PortfolioController'
			})


			.when('/music', {
				templateUrl: 'templates/music.html',
				controller: 'MusicController'
			})

			.otherwise({ redirectTo: '/blog' });
	}]);


	app.controller('BlogController', ['$scope', '$firebase', function($scope, $firebase) {
	  $scope.name = 'Phillip Mispagel';
	}]);


	app.controller('AboutController', ['$scope', '$firebase', function($scope, $firebase) {
	  $scope.name = 'Phillip Mispagel';
	}]);

	app.controller('ResumeController', ['$scope', '$firebase', function($scope, $firebase) {
	  $scope.name = 'Phillip Mispagel';
	}]);


	app.controller('PortfolioController', ['$scope', '$firebase', function($scope, $firebase) {
	  $scope.name = 'Phillip Mispagel';
	}]);

	app.controller('MusicController', ['$scope', '$firebase', function($scope, $firebase) {
	  $scope.name = 'Phillip Mispagel';
	}]);


	// Navigation directive
	app.directive('navigation', ['$location', function($location) {
		return {
			restrict: 'E',
			templateUrl: 'templates/navigation.html',

			controller: function() {
				
				this.page = $location.path().substring(1);

				this.setPage = function(page) {
					this.page = page;
				};
			
				this.isPage = function(page) {
					return this.page === page;
				};

			},
			
			controllerAs: 'navigation'
		};
	}]);




})();
