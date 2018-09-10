// 'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:LoginCtrl
 * @description
 * # AboutCtrl
 * Controller of the whereApp
 *  .controller('AboutCtrl', function () {
 */
angular.module('whereApp')
  .controller('LoginCtrl',['$scope','$firebaseArray','loginfactory','$localStorage','$location', '$rootScope', function($scope,$firebaseArray,loginfactory,$localStorage,$location,$rootScope){

  
  //-------------------------firebase code here--------------------
  // var ref = new Firebase('https://console.firebase.google.com/project/where-is-my-staff-95951/database/where-is-my-staff-95951/data');
  // $scope.contacts = $firebaseArray(ref);

//   dbOperations.init();
  // var rootRef = $firebaseArray(firebase.database().ref().child('users'));
  var rootRef = firebase.database().ref();    
  var userRef = rootRef.child('users');
  $scope.users=$firebaseArray(userRef);   
  const users=$firebaseArray(userRef);
  // $scope.user = $firebaseArray(userRef);
  // $scope.user = "";
  console.log($firebaseArray(userRef));
  $scope.addUser = function() {
      console.log('Adding user');
      
      $scope.users=$firebaseArray(userRef);
      $scope.enable = "false";
      $scope.users.$add({
        name: $scope.name,
        email:$scope.mail,
        password:$scope.pwd,
        userid:$scope.userid,
        type:$scope.type,
        enable:$scope.enable,
        latitude:"",
        longitude:"",
        taskName:"",
        taskDate:"",
        taskLatitude:"",
        taskLongitude:"",
        status:"Not Set"
      }).then(function(userRef){
          // var id = userRef.key();
          // console.log("added user ...");
          $scope.name = "";
          $scope.mail = "";
          $scope.pwd = "";
          $scope.userid = "";
          $scope.type = "";
      });
  };
  //------------------------------admin.html save data-------------------------
  $scope.saveData = function(k){
      // userRef.$save
      // user.$save(user.enable).then
    //   users.$save(k);
      // users.$save(user).then(function() {
      //     // ref.key() === list[2].$id; // true
      //     console.log("Added changes to database");
      //   });
      
    // for (let user in k) {
    //     console.log("user is", users.$getRecord(user.$id));
    // }

  };
  //================================login verification========================
  $scope.callAjax = function() {
    var userid= $scope.useridtxt;
    var password= $scope.passwordtxt;   
    
    var pr = dbOperations.match(userid, password)
    $localStorage.userid=userid;
    $scope.username=userid;
    console.log($localStorage.userid,userid);
    
    pr.then(data => {
        // to use location.path we need to apply $rootScope.$apply
        if (data.type=="Admin")
        {
            $rootScope.$apply(function() {
                $location.path ('/admin');
            });
        }
        if (data.type=="Staff")
        {
            $rootScope.$apply(function() {
                $location.path ('/staff');
            });
        }
        
        // console.log("inside then",data.type);
        $localStorage.type = data.type;
        
        console.log("data is",$localStorage.type,data.type);
    }).catch(err => {
        console.log(err);
        alert("Username and password didn't match.");
        // document.querySelector("#message").innerHTML = "Invalid User id or password";
    });
    
  }; 
   //--------------------- employee details here--------------------------------
  $scope.showDetails = function(a,b) {
      console.log(a,b);
      console.log(a.$id,users.$getRecord(a.$id));
      
      $scope.msg="inside show details";
      $scope.empName = users.$getRecord(a.$id).name;
      $scope.empEmail = users.$getRecord(a.$id).email;
      $scope.empUserid = users.$getRecord(a.$id).userid;
      $scope.empType = users.$getRecord(a.$id).type;
  }

            
}]);
  
