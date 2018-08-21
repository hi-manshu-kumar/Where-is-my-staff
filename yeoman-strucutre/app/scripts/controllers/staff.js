'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:staffCtrl
 * @description
 * # StaffCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('staffCtrl', function ($scope, $localStorage, $location, geoLocation, $firebaseArray) {
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
        console.log("data is", {
          data
        });
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

    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    $scope.users = $firebaseArray(userRef);
    const users = $firebaseArray(userRef);

    console.log(localStorage.keyFB);
    // var alias = localStorage.keyFB;
    // users.$getRecord("alias").name;
    // console.log(users.$getRecord(1).name);
    const recordPosition = users.$indexFor(localStorage.keyFB);
    
    $scope.loadTask = function () {
      const taskDatee = users.$getRecord(localStorage.keyFB).taskDate;
      var q = new Date(taskDatee)
      console.log( q);
      $scope.taskDate = q ;
      $scope.taskName = users.$getRecord(localStorage.keyFB).taskName;
      $scope.taskLat = users.$getRecord(localStorage.keyFB).taskLatitude;
      $scope.taskLng = users.$getRecord(localStorage.keyFB).taskLongitude;
    }

    function sendToDb() {
      // console.log(users.$getRecord(alias).latitude);
      // console.log(users.$indexFor(alias));
      const recordPosition = users.$indexFor(localStorage.keyFB);
      users[recordPosition].latitude = $scope.latitude;
      users[recordPosition].longitude = $scope.longitude;
      
      users.$save(recordPosition).then(data => {
        alert("Position succesfully added");
      });
    }


  });
