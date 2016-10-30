angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
})

.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');
})

.controller('MntCtrl', function($scope) {
  $scope.title = 'Mountains';
  console.log('MntCtrl');

  $scope.select = function() {
    var query = "SELECT * FROM mountains";
  }
});
