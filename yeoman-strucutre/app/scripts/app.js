'use strict';

/**
 * @ngdoc overview
 * @name whereApp
 * @description
 * # whereApp
 *
 * Main module of the application.
 */
angular
  .module('whereApp', [
    'ngRoute','firebase','ngStorage'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
