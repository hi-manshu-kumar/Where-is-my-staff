welcomeApp.controller('welcomeCtrl',['$scope','$rootScope','$firebaseArray','welcomefactory',function($scope,$rootScope,$firebaseArray,welcomefactory){

       
    //-------------------------firebase code here--------------------
    // var ref = new Firebase('https://console.firebase.google.com/project/where-is-my-staff-95951/database/where-is-my-staff-95951/data');
    // $scope.contacts = $firebaseArray(ref);

    
    // var rootRef = $firebaseArray(firebase.database().ref().child('users'));
    var rootRef = firebase.database().ref();    
   
}])