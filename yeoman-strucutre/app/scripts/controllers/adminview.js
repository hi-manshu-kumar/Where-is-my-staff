'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:AdminviewCtrl
 * @description
 * # AdminviewCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('AdminviewCtrl',['$scope','$firebaseArray','$localStorage','$location','$timeout',function($scope,$firebaseArray,$localStorage,$location,$timeout){
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
        $scope.showHideDetails = true;
        // console.log(a.$id,users.$getRecord(a.$id));
        if(users.$getRecord(a.$id).type == "Staff"){
            $scope.myTask = true;
        }
        $scope.id =a.$id;
        $scope.empName = users.$getRecord(a.$id).name;
        $scope.empEmail = users.$getRecord(a.$id).email;
        $scope.empUserid = users.$getRecord(a.$id).userid;
        $scope.empType = users.$getRecord(a.$id).type;
        $scope.latitude = users.$getRecord(a.$id).latitude;
        $scope.longitude = users.$getRecord(a.$id).longitude;
        $scope.status = users.$getRecord(a.$id).status;
    
        angular.extend($scope, {
            osloCenter: {
                autoDiscover: true,
                zoom: 10
            },
            markersStaff: {
                staffMarker: {
                    lat: $scope.latitude,
                    lng: $scope.longitude,
                    message: $scope.empName + " is here",
                    focus: true,
                    draggable: false
                }
            },
            
            // markersSet: {
            //     osloMarker: {
            //         lat: $scope.latitude,
            //         lng: $scope.longitude,
            //         message: $scope.empName + " is here",
            //         focus: true,
            //         draggable: false
            //     },
            //     taskMarker: {
            //         lat: $scope.taskLongitude,
            //         lng: $scope.taskLatitude,
            //         message: "Set the new task by dragging",
            //         focus: true,
            //         draggable: true
            //     }
            // },
    
            defaults: {
                scrollWheelZoom: true
            }
          });
          if(users.$getRecord(a.$id).type == "Admin")
            {
                $scope.myTask = false;
            }
    }
    // -------------------------Assign Task here---------------------------------
    $scope.date = new Date();
    $scope.setTask = function() {
        const userEntry = users.$indexFor($scope.id);
        console.log($scope.taskDate.toString(),$scope.taskName);
        users[userEntry].taskName = $scope.taskName;
        users[userEntry].taskDate = $scope.taskDate.toString();
        users[userEntry].taskLatitude = $scope.position.lat;
        users[userEntry].taskLongitude = $scope.position.lng;
        users[userEntry].status = "Incomplete";
        users.$save(userEntry).then(data => {
          alert("New Task succesfully added");
        });

        // console.log($scope.id);
        // console.log(users.$getRecord($scope.id));
        // users.$getRecord($scope.id).taskName = $scope.taskName;
        // users.$getRecord($scope.id).taskDate = $scope.taskDate;
    }

//-----------------------------working maps but api problem--------------------------- 
   /* $scope.map = {center: {latitude: 28.6547555, longitude: 77.38890719999999 }, zoom: 14 };
    $scope.options = {scrollwheel: true};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 28.6547555,
        longitude: 77.38890719999999
      },
      options: { draggable: false },
      events: {
        dragend: function (marker, eventName, args) {
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + '       ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };*/


    $scope.taskLongitude = 28.6547555;
    $scope.taskLatitude = 77.38890719999999;

    // $scope.$watch(function($scope){
    //   return $scope.latitude;
    // }, function (newValue,oldValue){
    //   var x = $scope.longitude || 24
    //   if( $scope.longitude || 24)
    //   console.log(x);
    //   angular.extend($scope, {
    //     osloCenter: {
    //         autoDiscover: true,
    //         zoom: 10
    //     },
    //     markersStaff: {
    //         staffMarker: {
    //             lat: $scope.latitude,
    //             lng: $scope.longitude,
    //             message: $scope.empName + " is here",
    //             focus: true,
    //             draggable: false
    //         }
    //     },
        
    //     // markersSet: {
    //     //     osloMarker: {
    //     //         lat: $scope.latitude,
    //     //         lng: $scope.longitude,
    //     //         message: $scope.empName + " is here",
    //     //         focus: true,
    //     //         draggable: false
    //     //     },
    //     //     taskMarker: {
    //     //         lat: $scope.taskLongitude,
    //     //         lng: $scope.taskLatitude,
    //     //         message: "Set the new task by dragging",
    //     //         focus: true,
    //     //         draggable: true
    //     //     }
    //     // },

    //     defaults: {
    //         scrollWheelZoom: true
    //     }
    //   });
    // });


    // $scope.$apply(function() {
    // var x = $scope.longitude || 24
    // if( $scope.longitude || 24)
    // console.log(x);
    // });

    var mainMarker = {
        lat: 28.6547555,
        lng: 77.38890719999999,
        message: "Set the new task by dragging",
        focus: true,
        draggable: true
    };

      angular.extend($scope, {
          osloCenter: {
            lat: 28.6547555,
            lng: 77.38890719999999,
            // autodiscover: true,
            zoom: 10
          },
          markers: {
              taskMarker: angular.copy(mainMarker)
          },
          position: {
              lat: $scope.taskLongitude,
              lng: $scope.taskLatitude
          },

          defaults: {
              scrollWheelZoom: true
          },
          events: { 
              markers: {
                  enable: ['dragend']
              }
          }
      });
    
    $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
                $scope.position.lat = args.model.lat;
                $scope.position.lng = args.model.lng;
    });      
   
    $scope.$watch("empName", function (newValue, oldValue) {
        $timeout(function() {
        //   $('.open-popup-link').magnificPopup({
        //        type:'inline',
        //        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        //     //   titleSrc: function(item){
        //     //     return item.el.attr('title');
        //     //  }
        //    })
        $(".open-popup-link").click(function(){
            $("#openPopup").removeClass("hide").addClass("show").css({"opacity": "1", "height" : "inherit"});
        });
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
    
}]);
