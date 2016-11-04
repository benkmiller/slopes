// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db ;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "mountains.db" }); //device
    }else{
      db = window.openDatabase("mountains.db", '1.0', 'my', 10000); // browser
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MOUNTAINS (id unique, log)');
      });
      console.log("DB" + db) ;
    }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tab.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/tab-home.html",
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.weather', {
      url: "/weather",
      views: {
        'weather-tab': {
          templateUrl: "templates/tab-weather.html",
        }
      }
    })
    .state('tab.mountains', {
      url: "/mountains",
      views: {
        'mountains-tab': {
          templateUrl: "templates/tab-mountains.html",
          controller: 'MntCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise("/tab/home");

})
