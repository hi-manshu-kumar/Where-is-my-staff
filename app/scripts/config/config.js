whereApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home/about");
  
  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: "views/home.html",
    controller: "LoginCtrl"
  }

  var registerState = {
    name: 'home.register',
    url: '/register',
    templateUrl: "views/register.html",
    controller: "LoginCtrl"
  }

  var loginState = {
    name: 'home.login',
    url: '/login',
    templateUrl: "views/login.html",
    controller: "LoginCtrl"
  }

  var aboutState = {
    name: 'home.about',
    url: '/about',
    templateUrl: "views/about.html",
  }

  var contactState = {
    name: 'home.contact',
    url: '/contact',
    templateUrl: "views/contact.html",
  }

  var adminState = {
    name: 'home.admin',
    url: '/admin',
    templateUrl: "views/adminview.html",
    controller: "AdminviewCtrl"
  }

  var staffState = {
    name: 'home.staff',
    url: '/staff',
    templateUrl: 'views/staff.html',
    controller: 'staffCtrl',
  }

  $stateProvider.state(homeState);  
  $stateProvider.state(registerState);
  // $stateProvider.state(loginRouterState);
  $stateProvider.state(loginState);
  $stateProvider.state(aboutState);
  $stateProvider.state(contactState);  

  $stateProvider.state(adminState);

  $stateProvider.state(staffState);
}]);
