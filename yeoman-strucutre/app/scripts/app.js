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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/admin', {
        templateUrl: 'views/adminview.html',
        controller: 'AdminviewCtrl',
        controllerAs: 'Adminview'
      })
      .when('/staff', {
        templateUrl: 'views/staff.html',
        controller: 'staffCtrl',
        controllerAs: 'Staff'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
