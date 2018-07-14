myAdmin.controller('adminCtrl',['$scope','$rootScope','$firebaseArray','adminfactory',function($scope,$rootScope,$firebaseArray,adminfactory){

       
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
}])