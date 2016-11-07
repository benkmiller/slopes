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
  $scope.parks = true ;
  $scope.distance = 50 ;
  $scope.difficulty = 0 ;
  $scope.size = 0 ;
  $scope.collection = [] ;
  $scope.newData = {
    name:'',
    size:'',
    park:'',
    difficulty:'',
    lifts:'',
    shuttle:''
  };

  //add entry to collection
  $scope.addEntry = function(){
    $scope.collection.push($scope.newData) ;
    $scope.newData= '' ;
    console.log("Size of collection: " + $scope.collection.length) ;
  };

  $scope.submitForm = function()
  {
    var size, diff ;
    switch(this.size)
    {
      case '0':
        size = "S" ;
        break ;
      case '1':
        size = "M" ;
        break ;
      case '2':
        size = "L" ;
        break ;
      case '3':
        size = "XL" ;
        break ;
      default:
        size = "M";
    }

    switch(this.difficulty)
    {
      case '0':
        diff = " between 1 and 6 " ;
        break ;
      case '1':
        diff = " between 5 and 7 " ;
        break ;
      case '2':
        diff = " between 7 and 10 " ;
        break ;
      default:
        diff = " between 1 and 6 " ;
        break;
    }

    //Delete everything from collection before inserting
    var j = 0 ;
    while($scope.collection.length > 0)
    {
      $scope.collection.splice(j, 1) ;
    }
    console.log("Size of collection:" + $scope.collection.length) ;

    if(db != null)
   {
     // Query the database
     db.readTransaction(function(query){
       var q = "SELECT * FROM mountains where size =='"+ size +"' or difficulty" + diff ;
       console.log("Query: " + q) ;
       query.executeSql(q, [], function(tx, results){

         // Iterate through all of the results, output rows into console
         for(var i=0; i < results.rows.length; i++)
         {
           $scope.newData.name = results.rows.item(i)['name'] ;

           $scope.newData.size = results.rows.item(i)['size'] ;
           $scope.newData.park = results.row.item(i)['park'] ;
           $scope.newData.difficulty = results.rows.item(i)['difficulty'] ;

           $scope.newData.lifts = results.rows.item(i)['lifts'] ;

           $scope.newData.shuttle = results.rows.item(i)['shuttle'] ;
           $scope.addEntry() ;

           console.log(JSON.stringify(results.rows.item(i)));
         }
       });
     });
   }
   else
     console.error("db is null!");
 }

})
