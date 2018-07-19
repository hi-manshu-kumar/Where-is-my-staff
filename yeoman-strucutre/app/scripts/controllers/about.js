// 'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the whereApp
 *  .controller('AboutCtrl', function () {
 */
angular.module('whereApp')
  .controller('AboutCtrl',['$scope','$firebaseArray','userfactory','$localStorage','$location',function($scope,$firebaseArray,userfactory,$localStorage,$location){

  $scope.isShowHideLog=false;
  var x =$scope.isShowHideLog;
  $scope.isShowHideReg=false;
  var y =$scope.isShowHideReg;
  // --------------------------show/hide login------------------
  $scope.showLogin = function(){
      console.log(
          userfactory.showLogin(x,y).isShowHide 
       , userfactory.showLogin().isShowHideReg
        );  
      x=false;
      y=true;
       x = userfactory.showLogin(x,y).isShowHide;
       y = userfactory.showLogin(x,y).isShowHideReg;
      console.log({x,y});
      $scope.isShowHideLog = x;
      $scope.isShowHideReg = y;        
   };
  // --------------------------show/hide register-----------------
  $scope.showReg = function(){
      console.log(
          userfactory.showLogin(x,y).isShowHide 
      // , userfactory.showLogin().isShowHideReg
        );  
      x = true;
      y=true;
      x = userfactory.showReg(x,y).x;
      y = userfactory.showReg(x,y).y;
      console.log({x,y}); 
      $scope.isShowHideLog = x; 
      $scope.isShowHideReg = y;       
  };
  
  //-------------------------firebase code here--------------------
  // var ref = new Firebase('https://console.firebase.google.com/project/where-is-my-staff-95951/database/where-is-my-staff-95951/data');
  // $scope.contacts = $firebaseArray(ref);

  
  // var rootRef = $firebaseArray(firebase.database().ref().child('users'));
  var rootRef = firebase.database().ref();    
  var userRef = rootRef.child('users');
  $scope.users=$firebaseArray(userRef);   
  users=$firebaseArray(userRef);
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
          enable:$scope.enable
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
      users.$save(k);
      // users.$save(user).then(function() {
      //     // ref.key() === list[2].$id; // true
      //     console.log("Added changes to database");
      //   });
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
        
        $location.path ('/admin');
        console.log("inside then",data.type);
        $localStorage.type = data.type;
        
        console.log("data is",$localStorage.type,data.type);
    }).catch(err => {
        console.log(err);
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
  
