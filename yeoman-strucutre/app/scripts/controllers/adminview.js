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
    
    redirect();
    function redirect(){
        if(!$localStorage.userid){
            location.href =  "index.html";
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

    $scope.username = $localStorage.userid;
    
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
        // console.log(a.$id,users.$getRecord(a.$id));
        
        $scope.msg="inside show details";
        $scope.empName = users.$getRecord(a.$id).name;
        $scope.empEmail = users.$getRecord(a.$id).email;
        $scope.empUserid = users.$getRecord(a.$id).userid;
        $scope.empType = users.$getRecord(a.$id).type;
    }
    // -------------------------Assign Task here---------------------------------
    $scope.date = new Date();
  }]);
