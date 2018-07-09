myApp.controller('userCtrl',['$scope','$rootScope','$firebaseArray','userfactory',function($scope,$rootScope,$firebaseArray,userfactory){

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
    // $scope.user = $firebaseArray(userRef);
    // $scope.user = "";
    console.log($firebaseArray(userRef));
    $scope.addUser = function() {
        console.log('Adding user');
        
        $scope.users=$firebaseArray(userRef);
        $scope.enable = "false"
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
}])