angular.module('starter.controllers', ['ngCordova'])

.controller('HomeCtrl', function($scope,Weather) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
})


.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');
})



.controller("DataController", function($scope, Mountains){

  $scope.id = window.localStorage.getItem("id");
  $scope.name = window.localStorage.getItem("name");
  $scope.face = window.localStorage.getItem("face");
  $scope.url = window.localStorage.getItem("url");
  $scope.lasts = window.localStorage.getItem("lasts");
  //$scope.mountain = Mountains.get(window.localStorage.getItem("id"));

  $scope.saveData = function(i, n, f, u, ls){
      window.localStorage.setItem("id", i);
      window.localStorage.setItem("name", n);
      window.localStorage.setItem("face", f);
      window.localStorage.setItem("url", u);
      window.localStorage.setItem("lasts", ls);

  }

  $scope.loadData = function(){
      alert(window.localStorage.getItem("id"));

  }
})

.controller('MntCtrl',function($scope, Mountains, Geolocation, Weather, Results) {
  // variables for reading from table
  $scope.title = 'Mountains';
  $scope.form = true ;
  $scope.parks = true ;
  $scope.distance = 200 ;
  $scope.difficulty = 0 ;
  $scope.size = 0 ;

  // Start Geolocation code
  // Test coordinates: 49.134690, -122.873986

  $scope.getResults = function(){
    $scope.collection = Results.getAll() ;
  }
  //Calls function to get current location of phone
  Geolocation.getCurrentLocation()
    .then(function(position) {
      $scope.gpsLat = position.coords.latitude;
      $scope.gpsLong = position.coords.longitude ;
    }, function(err) {
    console.log('getCurrentPosition error: ' + angular.toJson(err));
  });

  $scope.getWeather = function(newData, latitude, longitude){
    var promise = Weather.getWeather(latitude, longitude);
    promise.then(function(weather){
      console.log("Received weather ... " + weather) ;
      newData.weather = weather ;
      }, function(error){
      console.log("Failed to receive weather info") ;
    })
  }

  $scope.filterFunction = function(element){
    //console.log("Input distance: " + $scope.distance) ;
    //console.log("Mountain distance: " + element.distance) ;
    return element.distance <= $scope.distance ;
  };

  // Convert to distance
  // lat1, lon1 = GPS Coords, lat2, lon2 = Mountain Coords
  $scope.getDistance = function (lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = $scope.toRadians(lat2-lat1);  // toRadians defined below
    var dLon = $scope.toRadians(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos($scope.toRadians(lat1)) * Math.cos($scope.toRadians(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  };

  $scope.toRadians = function(deg) {
    return deg * (Math.PI/180)
  };

  $scope.mountains = Mountains.all();

  //add entry to collection
  $scope.addEntry = function(newData){
    Results.push(newData) ;
  };

  $scope.showAll = function()
  {
    this.form = !this.form ;

    Results.clearAll() ;

    if(db != null)
   {
     // Query the database
     db.readTransaction(function(query){
       //debug
      //  $scope.query = "SELECT * FROM mountains where size =='"+ size +"' and difficulty" + diff ;
       var q = "SELECT * FROM mountains" ;
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
               shuttle:'',
             latitude:'',
             longitude:'',
             distance:'',
             weather:''
             } ;

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

           newData.latitude = results.rows.item(i)['latitude'];
           newData.longitude = results.rows.item(i)['longitude'];
           $scope.getWeather(newData, newData.latitude, newData.longitude) ;
           console.log("weather" + newData.weather) ;
           $scope.$apply() ;

           if($scope.gpsLat != null)
           {
             newData.distance = $scope.getDistance($scope.gpsLat, $scope.gpsLong, newData.latitude, newData.longitude);
           }
           else
           {
             newData.distance = "No valid GPS data"
           }

           $scope.addEntry(newData) ;
           $scope.$apply() ;
           //console.log(JSON.stringify(results.rows.item(i)));
         }
       });
     });
     $scope.getResults() ;
   }
   else
     console.error("db is null!");

  }

  $scope.submitForm = function()
  {
    this.form = !this.form ;
    var size = this.size ;
    var distance = this.distance ;
    switch(this.difficulty)
    {
      case '0':
        diff = " between 3 and 5 " ;
        break ;
      case '1':
        diff = " between 2 and 4 " ;
        break ;
      case '2':
        diff = " between 1 and 3 " ;
        break ;
      default:
        diff = " between 1 and 3 " ;
        break;
    }
    Results.clearAll() ;

    if(db != null)
   {
     // Query the database
     db.readTransaction(function(query){
       //debug
      //  $scope.query = "SELECT * FROM mountains where size =='"+ size +"' and difficulty" + diff ;
       var q = "SELECT * FROM mountains where size <='"+ size +"' and difficulty" + diff + " order by priority desc" ;
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
               shuttle:'',
                latitude:'',
                longitude:'',
                distance:'',
                weather:''
             } ;

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

           newData.latitude = results.rows.item(i)['latitude'];
           newData.longitude = results.rows.item(i)['longitude'];
           $scope.getWeather(newData, newData.latitude, newData.longitude) ;
           console.log("weather" + newData.weather) ;
           $scope.$apply() ;
           if($scope.gpsLat != null)
           {
             newData.distance = $scope.getDistance($scope.gpsLat,$scope.gpsLong, newData.latitude, newData.longitude);
           }
           else
           {
             newData.distance = "No valid GPS data"
           }
           if(newData.distance <= distance)
            $scope.addEntry(newData);
           $scope.$apply() ;

           //console.log(JSON.stringify(results.rows.item(i)));
           console.log(newData);
         }
       });
     });
     $scope.getResults() ;
   }
   else
     console.error("db is null!");
}
})
.controller('MntDetailCtrl', function($scope, $stateParams, Mountains, Results){
  $scope.mountain = Mountains.get($stateParams.mountainId);
  //FROM DATABASE
  $scope.info = Results.get($stateParams.mountainId) ;

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

$scope.navigate = function(){
  var lat = this.info.latitude ;
  var long = this.info.longitude ;
  var devicePlatform = device.platform ;

  console.log("Device Platform: " + device.platform) ;
  console.log("Latitude: " + this.info.latitude) ;
  console.log("Longitude:" + this.info.longitude) ;

  if(devicePlatform == 'iOS')
  {
    window.open("maps://maps.apple.com/?q=" + lat + "," + long);
  }
  else if (devicePlatform == 'Android')
  {
    window.open("geo:"+ lat + "," + long);
  }
  else {
    window.alert("Your device is incompatible!") ;
  }
};

});
