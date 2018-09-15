'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('MainCtrl', function () {
    dbOperations.init();
  });
