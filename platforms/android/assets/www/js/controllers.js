angular.module('starter.controllers', ['ngCordova'])

.controller('HomeCtrl', function($scope) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
})

.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');
})

.controller('MntCtrl', function($scope, $cordovaFile) {
  $scope.title = 'Mountains';
  console.log('MntCtrl');

  // Put script here
  $scope.$on("$ionicView.loaded", function(){

    if(window.cordova)
    {
      console.log("Print Mountain Database");

      var db = null;

      var error_output = document.getElementById('error_codes');

      // Check if we can find the database file
      $cordovaFile.checkFile(cordova.file.applicationDirectory + "www/" , "_pouch_bc_mountains.db")
        .then(function(success){
          console.log('File exists');
          error_output.innerHTML = 'File exists at path: ' + cordova.file.applicationDirectory + 'www/';
        }, function(error){
          console.log('File does not exist');
          error_output.innerHTML = 'File does not exist';
        });


      db = new PouchDB('bc_mountains.db', {adapter: 'websql'});

      if(db != null) {
        db.info().then(function(result){
          console.log(result);
          error_output.innerHTML = JSON.stringify(result, null, '  ');
        });
      }

      var output = document.getElementById('mountain_list');

      output.innerHTML = 'Completed';
    }
  })
});
