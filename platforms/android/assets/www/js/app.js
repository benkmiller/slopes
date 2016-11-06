// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
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

    //------------------------------------------------
    // Database Initialization
    //------------------------------------------------
    function copyDatabaseFile(dbName) {

      var sourceFileName = cordova.file.applicationDirectory + 'www/' + dbName;
      var targetDirName = cordova.file.dataDirectory;

      // Copy the database from a read-only directory into a read/write directory
      return Promise.all([
        new Promise(function (resolve, reject) {
          resolveLocalFileSystemURL(sourceFileName, resolve, reject);
        }),
        new Promise(function (resolve, reject) {
          resolveLocalFileSystemURL(targetDirName, resolve, reject);
        })
      ]).then(function (files) {
        var sourceFile = files[0];
        var targetDir = files[1];
        return new Promise(function (resolve, reject) {
          targetDir.getFile(dbName, {}, resolve, reject);
        }).then(function () {
          console.log("file already copied");
        }).catch(function () {
          console.log("file doesn't exist, copying it");
          return new Promise(function (resolve, reject) {
            sourceFile.copyTo(targetDir, dbName, resolve, reject);
          }).then(function () {
            console.log("database file copied");
          });
        });
      });
    }

    copyDatabaseFile('mountains.db').then(function () {

      // Successful copy, open the copied database
      db = sqlitePlugin.openDatabase('mountains.db');
      console.log("Successfully opened!")
    }).catch(function (err) {

      // Error copying the database
      console.log(err);
    });
  })
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
          controller: 'WthrCtrl'
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

//------------------------------------------------
// Mountain Tab Controller
//------------------------------------------------
.controller("MntCtrl", function($scope){
  console.log('MntCtrl');

  // Controls the Select All button
  // Outputs all table entries to the console, for now
  $scope.selectAll = function() {

    // Check if database is not initialized
    if(db != null)
    {
      // Query the database
      db.readTransaction(function(query){
        query.executeSql('SELECT * FROM mountains', [], function(tx, results){

          // Iterate through all of the results, output rows into console
          for(var i=0; i < results.rows.length; i++)
          {
            console.log(JSON.stringify(results.rows.item(i)));
          }
        });
      });
    }
    else
      console.error("db is null!");
  }
});



