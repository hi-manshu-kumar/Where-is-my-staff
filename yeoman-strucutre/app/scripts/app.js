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
    'ngRoute','firebase','ngStorage','uiGmapgoogle-maps',"leaflet-directive"
  ])
  .config(function ($routeProvider,$locationProvider,$logProvider) {
    $locationProvider.hashPrefix('');
    $logProvider.debugEnabled(false);
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
      .when('/logout', {
        template: '',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
