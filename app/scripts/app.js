'use strict';

/**
 * @ngdoc overview
 * @name staffApp
 * @description
 * # staffApp
 *
 * Main module of the application.
 */
angular
  .module('staffApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $locationProvider) {
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
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl',
        controllerAs: 'welcome'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
