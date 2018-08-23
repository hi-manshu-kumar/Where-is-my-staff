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

    angular.extend($scope, {
      osloCenter: {
        autoDiscover: true,
        zoom: 10
      },
      markers: {
        taskMarker: {
            lat: 28.6547555,
            lng: 77.58810719999999,
            message: "You have to reach here",
            focus: true,
            draggable: false,
            icon: {},
        }
        // marker: {
        //     lat: $scope.latitude,
        //     lng: $scope.longitude,
        //     message: "You are here",
        //     focus: true,
        //     draggable: false
        // }
      },
      leafIcon : {
        iconUrl: '../../../Small-dark-grey-circle.svg.png',
        // shadowUrl: 'img/leaf-shadow.png',
        iconSize:     [38, 95], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      },
      position: {
          lat: 28.6547555,
          lng: 77.38890719999999,
      },
      defaults: {
          scrollWheelZoom: true
      }
      
    });    

    $scope.$watch(function($scope){
      return $scope.latitude;
    }, function (newValue,oldValue){
      var x = $scope.longitude || 24
      if( $scope.longitude || 24)
      console.log(x);

    //   L.marker([$scope.latitude, $scope.longitude]).bindPopup("<b>You are here!</b>").addTo(mymap).popup();

      angular.extend($scope, {
        osloCenter: {
            lat: 28.6547555,
            lng: 77.38890719999999,
            zoom: 10
        },
        markers: {
            taskMarker: {
                lat: 28.6547555,
                lng: 77.58810719999999,
                message: "You have to reach here",
                focus: true,
                draggable: false,
                icon: {
                    iconUrl: '../../images/Small-dark-grey-circle.svg.png',
                    // shadowUrl: 'img/leaf-shadow.png',
                    iconSize:     [50, 50], // size of the icon
                    // shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    // shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                  }
            },
            staffMarker: {
                lat: $scope.latitude,
                lng: $scope.longitude,
                message: "you are here",
                focus: true,
                draggable: false,
                icon: {}

            }
        },
        leafIcon : {
          iconUrl: '../../../Small-dark-grey-circle.svg.png',
          // shadowUrl: 'img/leaf-shadow.png',
          iconSize:     [38, 95], // size of the icon
          // shadowSize:   [50, 64], // size of the shadow
          iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
          // shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        },
        defaults: {
            scrollWheelZoom: true
        }
      });
    });

    //---------------------leaflet.js
    // var customPopup = "Mozilla Toronto Offices<br/>";
    
    // var customOptions =
    //     {
    //     'maxWidth': '500',
    //     'className' : 'custom'
    //     }


	// L.marker([28.6847555, 77.58810719999999])
    //     .bindPopup(customPopup,customOptions).addTo(mymap).openPopup();

	var mymap = L.map('mapid').setView([28.6547555, 77.38890719999999], 10);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	L.circle([28.6547555, 77.58810719999999], 1000, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("Reach Here.").openPopup();


	var popup = L.popup();


});
