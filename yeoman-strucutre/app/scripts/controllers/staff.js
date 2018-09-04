'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:staffCtrl
 * @description
 * # StaffCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('staffCtrl', function ($scope, $localStorage, $location, geoLocation, $firebaseArray, $timeout) {
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
      $scope.myvar = true;
      const taskDatee = users.$getRecord(localStorage.keyFB).taskDate;
      var q = new Date(taskDatee);
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
    var state = 0 ;
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
            state = "Complete";
            updateStatus(state);
        }
        else{
            alert(`Task unsuccesfull`);
            state = "InComplete";
            updateStatus(state);
        }
    }
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    $(document).ready(function(){
        $("#uploadButton").hide();
    })

    var selectedFile ;    
    $("#file").on("change", function(event){
        selectedFile = event.target.files[0];
        $("#uploadButton").show();
    });

    $scope.uploadFile = function(){
        var storageRef = firebase.storage().ref('/staffImage/' + filename);
        var filename = selectedFile.name;
        var uploadTask = storageRef.put(selectedFile);
        // ref.put(file).then(function(snapshot) {
        //     console.log('Uploaded a blob or file!');
        //   });
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // var postKey = firebase.database().ref().child('users/' + localStorage.keyFB ).push().key;
                var updates = {};
                var postData = {
                    url: downloadURL,
                    user: localStorage.keyFB
                };
                updates['/users/' + localStorage.keyFB+'/posts' ] = postData;
                firebase.database().ref().update(updates);            
                console.log('File available at', downloadURL);
            });
          });

    }

    function updateStatus(state) {
        const recordPosition = users.$indexFor(localStorage.keyFB);
        users[recordPosition].status = state;
        users.$save(recordPosition);
    }

    $scope.$watch("taskDate", function (newValue, oldValue) {
      $timeout(function() {
      //   $('.open-popup-link').magnificPopup({
      //        type:'inline',
      //        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
      //     //   titleSrc: function(item){
      //     //     return item.el.attr('title');
      //     //  }
      //    })
      $('.open-popup-link').magnificPopup({
          removalDelay: 500, //delay removal by X to allow out-animation
          callbacks: {
            beforeOpen: function() {
               this.st.mainClass = this.st.el.attr('data-effect');
            }
          },
          midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
      });
    });
});
