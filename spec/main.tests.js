'use strict';

describe('MainController', function() {

  var scope;

  beforeEach(angular.mock.module('pdizzle'));

  beforeEach(angular.mock.inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    $controller('MainController', {$scope: scope});
  }));

  it('should have $scope.placeholder text be Here for Jasmine!', function() {
    expect(scope.placeholder).toBe('Here for Jasmine!');
  });
  
});