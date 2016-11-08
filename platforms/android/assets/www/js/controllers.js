angular.module('starter.controllers', ['ngCordova'])

.controller('HomeCtrl', function($scope) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
})

.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');
})

.controller('MntCtrl',function($scope, Mountains) {
  // variables for reading from table
  $scope.title = 'Mountains';
  $scope.form = true ;
  $scope.parks = true ;
  $scope.distance = 50 ;
  $scope.difficulty = 0 ;
  $scope.size = 0 ;
  $scope.collection = [] ;

  $scope.mountains = Mountains.all();

  $scope.getMountain = function(mountainId){
    Mountains.getMountain(mountainId) ;
  }

  $scope.remove = function(mountain){
    Mountains.remove(mountain);
}
  //add entry to collection
  $scope.addEntry = function(newData){
    $scope.collection.push(newData) ;

    console.log("Size of collection: " + $scope.collection.length) ;
  };

  $scope.submitForm = function()
  {
    this.form = !this.form ;
    var size = $scope.size ;

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
       //var q = "SELECT * FROM MOUNTAINS" //for debugging
       console.log("Query: " + q) ;
       query.executeSql(q, [], function(tx, results){

         // Iterate through all of the results, output rows into console
         for(var i=0; i < results.rows.length; i++)
         {
           var newData={
                id:'',
               name:'',
               size:'',
               park:'',
               difficulty:'',
               green:'', blue:'', black:'', dblack:'',
               lifts:'',
               shuttle:''
             } ;
             var newMountain ;

           newData.id = results.rows.item(i)['id'] ;
           newData.name = results.rows.item(i)['name'] ;

           newData.size = results.rows.item(i)['size'] ;
           newData.park = results.rows.item(i)['park'] ;
           newData.difficulty = results.rows.item(i)['difficulty'] ;

           newData.lifts = results.rows.item(i)['lifts'] ;
           newData.green = results.rows.item(i)['green'] ;
           newData.blue = results.rows.item(i)['blue'] ;
           newData.black = results.rows.item(i)['black'] ;
           newData.dblack = results.rows.item(i)['dblack'] ;

           newData.shuttle = results.rows.item(i)['shuttle'] ;

           $scope.addEntry(newData) ;
           $scope.$apply() ;
           console.log(JSON.stringify(results.rows.item(i)));
         }
       });
     });
   }
   else
     console.error("db is null!");

}
})
.controller('MntDetailCtrl', function($scope, $stateParams, Mountains){
  $scope.mountain = Mountains.get($stateParams.mountainId);

  $scope.$on("$ionicView.loaded", function() {
    //Put your script in here!ß

    //set variables to use for storing information from myweather2
    $scope.lastSnow = document.getElementById("lastSnow");
    $scope.results = document.getElementById("results");
    $scope.tomorrow = document.getElementById("tomorrow");
    $scope.days2 = document.getElementById("days2");
    $scope.days3 = document.getElementById("days3");
    $scope.days4 = document.getElementById("days4");

    var hr = new XMLHttpRequest();
    //WHISTLER: http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json
    //CYPRESS: http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json
    //GROUSE: http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json
    //SEYMOUR:
    //BIG WHITE:
    //$scope.mountain.url is the url hardcoded for each mountain in the service.js file
    hr.open('GET', $scope.mountain.url);
    hr.setRequestHeader("Content-type", "application/json");

    hr.onreadystatechange = function() {
      if(hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.responseText);
        //ben added a different font size and bolding
        $scope.lastSnow = data.weather.snow_report[0].last_snow_date;
        $scope.results = data.weather.forecast[0].day[0].weather_text;
        $scope.tomorrow = data.weather.forecast[1].day[0].weather_text;
        $scope.days2 = data.weather.forecast[2].day[0].weather_text;
        $scope.days3 = data.weather.forecast[3].day[0].weather_text;
        $scope.days4 = data.weather.forecast[4].day[0].weather_text;
        $scope.$apply();
      }
    }

    //show the requesting strings while it is retrieving data
    hr.send(null);
    lastSnow.innerHTML = "requesting...";
    results.innerHTML = "requesting...";
    tomorrow.innerHTML = "requesting...";
    days2.innerHTML = "requesting...";
    days3.innerHTML = "requesting...";
    days4.innerHTML = "requesting...";
});

});
