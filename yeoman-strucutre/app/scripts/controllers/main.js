'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('MainCtrl', function ($scope) {
    dbOperations.init();
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];    
  });
