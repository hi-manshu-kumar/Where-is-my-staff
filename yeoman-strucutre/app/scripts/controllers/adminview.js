'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:AdminviewCtrl
 * @description
 * # AdminviewCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('AdminviewCtrl',['$scope','$firebaseArray','$localStorage','$location',function($scope,$firebaseArray,$localStorage,$location){
    dbOperations.init();
    redirect();
    function redirect(){
        if(!localStorage.AdminName){
            $location.path('/login');
        }
    };
    
    //-------------------------firebase code here--------------------
    
    // var ref = new Firebase('https://console.firebase.google.com/project/where-is-my-staff-95951/database/where-is-my-staff-95951/data');
    // $scope.contacts = $firebaseArray(ref);
  
    
    // var rootRef = $firebaseArray(firebase.database().ref().child('users'));
    var rootRef = firebase.database().ref();    
    var userRef = rootRef.child('users');
    $scope.users=$firebaseArray(userRef);   
    const users=$firebaseArray(userRef);
    // $scope.user = $firebaseArray(userRef);
    // $scope.user = "";
    // console.log($firebaseArray(userRef));

    $scope.username = localStorage.AdminName;
    $scope.id = localStorage.userid; 
    
    //------------------------------admin.html save data-------------------------
    $scope.saveData = function(a,b){
        // userRef.$save
        // user.$save(user.enable).then
      //   users.$save(k);
        // users.$save(user).then(function() {
        //     // ref.key() === list[2].$id; // true
        //     console.log("Added changes to database");
        //   });
        console.log(users);
        console.log({a});
        console.log({b});
        let c =0;

        console.log(users[0]);
        for (let user of b){
            console.log(user.enable,c);
            
            console.log(c);

            if(user.enable=="false" || user.enable==false)
            {
                console.log(user.enable,c);
                users.$remove(c);
            }
            c++;
        }
    //   for (let user in b) {
    //       console.log("user is" ,b[1].email);
    //   }
  
    };

     //--------------------- employee details here--------------------------------
    $scope.showDetails = (a,b) => {
        console.log(a,b);
        var c = a.$id;
        console.log(a.$id,users.$getRecord('-LI5ooXTyfKLbMOSeGHc'));
        
        $scope.msg="inside show details";
        $scope.empName = users.$getRecord(a.$id).name;
        $scope.empEmail = users.$getRecord(a.$id).email;
        $scope.empUserid = users.$getRecord(a.$id).userid;
        $scope.empType = users.$getRecord(a.$id).type;
    }
    // -------------------------Assign Task here---------------------------------
    $scope.date = new Date();
    // =========================================codes for gmaps==================
    
    // $scope.Markers = [
    //     {
    //         "title": 'Aksa Beach',
    //         "lat": '19.1759668',
    //         "lng": '72.79504659999998',
    //         "description": 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.'
    //     },
    //     ];
    // //Setting the Map options.
    // $scope.MapOptions = {
    //     center: new google.maps.LatLng(19.214,72.91062),
    //     zoom: 0,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // //Initializing the InfoWindow, Map and LatLngBounds objects.
    // $scope.InfoWindow = new google.maps.InfoWindow();
    // $scope.Latlngbounds = new google.maps.LatLngBounds();
    // $scope.Map = new google.maps.Map(document.getElementById("dvMap"), $scope.MapOptions);
    // //Looping through the Array and adding Markers.
    // for (var i = 0; i < $scope.Markers.length; i++) {
    //     var data = $scope.Markers[i];
    //     var myLatlng = new google.maps.LatLng(data.lat, data.lng);

    //     //Initializing the Marker object.
    //     var marker = new google.maps.Marker({
    //         position: myLatlng,
    //         map: $scope.Map,
    //         title: data.title
    //     });

    //     //Adding InfoWindow to the Marker.
    //     (function (marker, data) {
    //         google.maps.event.addListener(marker, "click", function (e) {
    //             $scope.InfoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
    //             $scope.InfoWindow.open($scope.Map, marker);
    //         });
    //     })(marker, data);

    //     //Plotting the Marker on the Map.
    //     $scope.Latlngbounds.extend(marker.position);
    // }

    // //Adjusting the Map for best display.
    // $scope.Map.setCenter($scope.Latlngbounds.getCenter());
    // $scope.Map.fitBounds($scope.Latlngbounds);


}]);
