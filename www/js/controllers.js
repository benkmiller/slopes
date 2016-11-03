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

  // Mountain Database
  var mntDB = new PouchDB('/www/db/bc_mountains.db',{adapter:'websql'});

  if(mntDB != null) {
    mntDB.info().then(function (info) {
      console.log(info);
    })
  };

});
