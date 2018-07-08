myApp.controller('userCtrl',function($scope,userfactory){
    $scope.isShowHideLog=false;
    var x =$scope.isShowHideLog;
    $scope.isShowHideReg=false;
    var y =$scope.isShowHideReg;
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
})