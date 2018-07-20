'use strict';

describe('Controller: AdminviewCtrl', function () {

  // load the controller's module
  beforeEach(module('whereApp'));

  var AdminviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminviewCtrl = $controller('AdminviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminviewCtrl.awesomeThings.length).toBe(3);
  });
});
