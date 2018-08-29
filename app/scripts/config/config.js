whereApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  
  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: "views/about.html",
    controller: "LoginCtrl"
  }

  var registerState = {
    name: 'register',
    url: '/register',
    templateUrl: "views/register.html",
    controller: "LoginCtrl"
  }

  var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: "views/login.html",
    controller: "LoginCtrl"
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    templateUrl: "views/about.html",
  }

  var contactState = {
    name: 'contact',
    url: '/contact',
    templateUrl: "views/contact.html",
  }

  var adminState = {
    name: 'admin',
    url: '/admin',
    templateUrl: "views/adminview.html",
    controller: "AdminviewCtrl"
  }

  var staffState = {
    name: 'staff',
    url: '/staff',
    templateUrl: 'views/staff.html',
    controller: 'staffCtrl',
  }

  $stateProvider.state(homeState);  
  $stateProvider.state(registerState);
  $stateProvider.state(loginState);
  $stateProvider.state(aboutState);
  $stateProvider.state(contactState);  

  $stateProvider.state(adminState);

  $stateProvider.state(staffState);
}]);
