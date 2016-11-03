angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
})

.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');
})

.controller('MntCtrl',function($scope) {
  $scope.title = 'Mountains';
  console.log('MntCtrl');
  $scope.parks = true ;
  $scope.distance = 50 ;
  $scope.difficulty = 0 ;
  $scope.size = 0 ;
  $scope.query = "empty";
  $scope.submitForm = function()
  {
    $scope.query = "SELECT * FROM MOUNTAINS WHERE SIZE = " + this.size + ";" ;
  }
});
