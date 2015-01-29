(function() {

	'use strict';

	// require('jquery');
	// require('../assets/js/stickymojo');
	// require('../../bower_components/foundation/js/foundation');
	require('angular');
	require('angular-route');
	require('firebase');
	require('angularfire');

	var app = angular.module('pdizzle', ['ngRoute', 'firebase']);

	// Routing
	// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	// 	$locationProvider.html5Mode(true);

	// 	$routeProvider

	// 		.when('/blog', {
	// 			templateUrl: 'templates/blog.html',
	// 			controller: 'BlogController'
	// 		})


	// 		.otherwise({ redirectTo: '/blog' });
	// }]);


	app.controller('MainController', ['$scope', '$document', '$window', function($scope, $document, $window) {
		// $document.foundation();


	}]);

	app.directive('navigation', function() {
		return {
			scope: {},
			restrict: 'EA',

			controller: function($scope) {
				this.items = [];

				this.setActive = function(elem) {
					// remove active class from all nav items
					angular.forEach(this.items, function(el) {
						el.removeClass('active');
					});

					elem.addClass('active');
				};

				this.addItem = function(elem) {
					this.items.push(elem);
				};

			},
			
		};
	});

	app.directive('item', function() {
		return {
			scope: {},
			restrict: 'EA',
			require: '^navigation',
			replace: true,

			template: '<a class="item"><i class="{{icon}}"></i><label>{{name}}</label></a>',

			link: function(scope, elem, attrs, navController) {
				scope.name = attrs.name;
				scope.icon = attrs.icon;

				navController.addItem(elem);

				elem.bind('click', function() {
					navController.setActive(elem);
				});
			}
		};
	});

	// directive needs to have HTML for navigation
	// CSS must position the navigation correctly initially
	// directive will reposition the navigation on window size change and scroll
	// directive will determine all anchor point names based on link
	// names eg. a href="#resume" will scrollTo <a target="#resume">
	// directive will determine sizes and locations of all page sections
	// directive will do a smooth scrollTo
	// directive will update navigation active as it passes each directive

	// TO DO today
	// - clean outside area
	// - tidy above my dressers
	// - mop hard wood
	// - take trash down
	// - pick up pieces of trash in driveway (newspapers)
	// - air blow walk way and driveway
	// - take pictures of things
	// - 
				
				// var i = 0;

				// function myScroll () {
				// 	setTimeout(function() {
				// 		window.scrollTo(i, i);
				// 		i += 5;
				// 		if (i < 6000) {
				// 			myScroll();
				// 		}
				// 	}, 1);					
				// }

				// this.page = $location.path().substring(1);

				// this.setPage = function(page) {
				// 	this.page = page;
				// };
			
				// this.isPage = function(page) {
				// 	return this.page === page;
				// };

	// Navigation directive





})();
