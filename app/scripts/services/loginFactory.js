'use strict';

/**
 * @ngdoc service
 * @name whereApp.aboutFactory
 * @description
 * # aboutFactory
 * Factory in the whereApp.
 */
angular.module('whereApp')
 .factory('loginfactory',function($http,$q){
    var object ={};
    
    return object;
});
    // object.showLogin = function(isShowHide,isShowHideReg){
    //     // var isShowHide =  true;
    //     // var isShowHideReg = false;
    //     isShowHide = true;
    //     isShowHideReg = false;
    //     return {isShowHide,isShowHideReg};
    // },
    // object.showReg = function(x,y){
    //     x = false;
    //     y = true;
    //     console.log({x,y});
    //     return {x,y};
    // }
//     object.doAjax=function(){
//         var defer = $q.defer();
//         console.log("Inside DoAjax in Factory  Fake Object ",defer);
//         var URL = 'https://raw.githubusercontent.com/brainmentorspvtltd/myserverdata/master/mobiles.json';
//         console.log(" I am Going to Hit the Server....");
//         $http.get(URL).then(response=>{
//             console.log("Response is Come..... ",response);
//            defer.resolve(response);
//         },error=>{
//             console.log("Error is Come from Server ",error);
//             defer.reject(error);
//         });
//         console.log("Going to Return the Promise...");
//         return defer.promise;
// }
    // object.
   
