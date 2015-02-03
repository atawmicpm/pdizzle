(function() {

  'use strict';

  // Gulp calls Browserify to compile these scripts into bundle.js
  var angular = require('angular'); // defining angular so i can keep undefined: true in jshint
  
  require('../../bower_components/ngSmoothScroll/angular-smooth-scroll');


  // My App
  var app = angular.module('pdizzle', ['smoothScroll']);

 
  // Main Controller, not being used for anything yet
  app.controller('MainController', ['$scope', function($scope) {
    // placeholder so gulp doesn't complain about $scope not being used
    $scope.placeholder = 'Here for Jasmine!';

  }]);
 
  // Navigation directive, this 
  app.directive('navigation', ['smoothScroll', function(smoothScroll) {
    return {
      // why pollute parent scope?
      scope: {},
      restrict: 'EA',

      controller: function($scope) {
        $scope.items = [];

        $scope.setActive = function(elem) {
          // this is a double forEach since it gets called after the
          // forEach in the link function.  This seems like it can be
          // optimized, however, wouldn't jQuery be doing the same
          // thing by calling $('.item').removeClass('active') ?
          angular.forEach($scope.items, function(item) {
            item.elem.removeClass('active');
          });

          elem.addClass('active');
        };

        this.scrollTo = function(section) {
          section = document.getElementById(section);
          smoothScroll(section);
        };

        this.addItem = function(elem, name) {
          var top = document.getElementById(name).offsetTop,
              bottom = top + document.getElementById(name).offsetHeight;

          $scope.items.push({
            elem: elem,
            top: top,
            bottom: bottom
          });
        };
      },

      link: function(scope, elem, attrs) {
        angular.element(window).bind('scroll', function() {
          var scrollPos = window.scrollY;

          angular.forEach(scope.items, function(item) {
            if (item.top <= scrollPos && item.bottom >= scrollPos) {
              scope.setActive(item.elem);
            }
          });
        });
      }
    };
  }]);

  // Navigation items add themselves to navigation directive controller
  app.directive('item', function() {
    return {
      scope: {},
      restrict: 'E',
      require: '^navigation',
      replace: true,

      template: '<a class="item"><i class="{{icon}}"></i><label>{{name}}</label></a>',

      link: function(scope, elem, attrs, navController) {
        scope.name = attrs.name;
        scope.icon = attrs.icon;

        navController.addItem(elem, scope.name);

        elem.bind('click', function() {
          navController.scrollTo(scope.name);
        });

      }
    };
  });

  // About template
  app.directive('about', function() {
    return {
      restrict: 'EA',
      templateUrl: 'templates/about.html'
    };
  });

  // Resume template
  app.directive('resume', function() {
    return {
      restrict: 'EA',
      templateUrl: 'templates/resume.html'
    };
  });

  // Projects template
  app.directive('projects', function() {
    return {
      restrict: 'EA',
      templateUrl: 'templates/projects.html'
    };
  });

  // Music template
  app.directive('music', function() {
    return {
      restrict: 'EA',
      templateUrl: 'templates/music.html'
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

})();
