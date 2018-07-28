'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:staffCtrl
 * @description
 * # StaffCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('staffCtrl', function ($scope, $localStorage, $location, geoLocation) {
    redirect();
    dbOperations.init();
    $scope.position;
    $scope.latitude;
    $scope.longitude;
    function redirect() {
      if (!localStorage.StaffName) {
        $location.path('/login');
      }
    };
    $scope.id = localStorage.userid;
    $scope.username = localStorage.StaffName;
    // geoLocation.getCurrentPosition().then(data => {
    //   console.log("got data", data);
    // }).catch(err => {
    //   console.log("error is ", err);
    // });

    $scope.callGeoLo = function () {
      // geoLocation.getCurrentPostion().
      // then(x => {
      //   console.log("data is", x);
      // }).catch(err => {
      //   console.log("catch is ", err);
      // });
      geoLocation.getCurrentPosition().
      then(data => {
        console.log("data is", {data});
        $scope.position = data;
        $scope.latitude = data.coords.latitude;
        $scope.longitude = data.coords.longitude;
        // $scope.$apply(function(){
        //   // $scope.position = position;
        //   // console.log("data is", position);
        // });
        sendToDb();
      }).catch(err => {
        console.log("catch is ", err);
      });
    };

    function sendToDb(){
      
    }
    

  });
