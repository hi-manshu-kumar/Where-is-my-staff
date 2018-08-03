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
    var cities = [
      {
          place : 'India',
          desc : 'A country of culture and tradition!',
          lat : 23.200000,
          long : 79.225487
      },
      {
          place : 'New Delhi',
          desc : 'Capital of India...',
          lat : 28.500000,
          long : 77.250000
      },
      {
          place : 'Kolkata',
          desc : 'City of Joy...',
          lat : 22.500000,
          long : 88.400000
      },
      {
          place : 'Mumbai',
          desc : 'Commercial city!',
          lat : 19.000000,
          long : 72.90000
      },
      {
          place : 'Bangalore',
          desc : 'Silicon Valley of India...',
          lat : 12.9667,
          long : 77.5667
      }
  ];

    var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(25,80),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    
    
  });
