'use strict';

describe('Service: aboutFactory', function () {

  // load the service's module
  beforeEach(module('whereApp'));

  // instantiate service
  var aboutFactory;
  beforeEach(inject(function (_aboutFactory_) {
    aboutFactory = _aboutFactory_;
  }));

  it('should do something', function () {
    expect(!!aboutFactory).toBe(true);
  });

});
