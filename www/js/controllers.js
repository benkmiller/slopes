angular.module('starter.controllers', ['ngCordova'])

.controller('HomeCtrl', function($scope) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
})

.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');
})

.controller('MntCtrl',function($scope, $cordovaSQLite) {
  $scope.title = 'Mountains';
  console.log('MntCtrl');
  $scope.parks = true ;
  $scope.distance = 50 ;
  $scope.difficulty = 0 ;
  $scope.size = 0 ;
  $scope.query = "empty";
  $scope.test = "empty" ;
  $scope.submitForm = function()
  {
    $scope.query = "SELECT * FROM MOUNTAINS ;" ;
    console.log($scope.query) ;
      $cordovaSQLite.execute(db, $scope.query).then(function(res) {
        $scope.test = "running" ;
        console.log("Result: " + res.insertId);
      }, function (error) {
        console.log("error" + error.message);

  });

  }

});
