angular.module('starter.controllers', ['ngCordova'])

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
  $scope.test = "empty" ;
  $scope.submitForm = function()
  {
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
