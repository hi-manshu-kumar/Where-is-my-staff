'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:staffCtrl
 * @description
 * # StaffCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('staffCtrl', function ($scope, $localStorage, $location, geoLocation, $firebaseArray,) {
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
        L.marker([$scope.latitude, $scope.longitude]).bindPopup("<b>You are here!</b>").addTo(mymap).openPopup();

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

      L.circle([$scope.taskLat, $scope.taskLng], 1000, {
		color: 'black',
		fillColor: '#555',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("<b>Reach Here.</b>").openPopup();
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

    // navigator.geolocation.getCurrentPosition(function(position){
    //   $scope.$apply(function(){
    //     $scope.positionLat = position.coords.latitude;
    //     $scope.positionLng = position.coords.longitude;
    //   });
    // });

	var mymap = L.map('mapid').setView([28.6547555, 77.38890719999999], 10);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

    var popup = L.popup();

// --------------------------------------------------------------verification of position
    $scope.verify = function(){
        // calcDist();
        console.log($scope.latitude, $scope.longitude, $scope.taskLat, $scope.taskLng);
        calcDist($scope.latitude, $scope.longitude, $scope.taskLat, $scope.taskLng);
    }
    function calcDist(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km

        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        
        // alert(`The distance is ${d} km.`);
        if(d<1){
            alert(`Task Succesfull`);
        }
        else{
            alert(`task unsuccesfull`);
        }
    }
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
});
