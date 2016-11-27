angular.module('starter.controllers', ['ngCordova'])

.controller('HomeCtrl', function($scope) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
  // Geolocation.getCurrentLocation()
  //   .then(function(position) {
  //     $scope.gpsLat = position.coords.latitude;
  //     $scope.gpsLong = position.coords.longitude ;
  //   }, function(err) {
  //   console.log('getCurrentPosition error: ' + angular.toJson(err));
  // });
})

.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');

})

.controller('MntCtrl',function($scope, Mountains, $cordovaGeolocation, Weather, Results) {
  // variables for reading from table
  $scope.title = 'Mountains';

      $scope.init = function(){
        $scope.form = true ;
        $scope.distance = 200 ;
        $scope.difficulty = 0 ;
        getLocation() ;
        }




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

          //  newData.size = results.rows.item(i)['size'] ;
           newData.park = results.rows.item(i)['park'] ;
          //  newData.difficulty = results.rows.item(i)['difficulty'] ;

           newData.lifts = results.rows.item(i)['lifts'] ;
           newData.green = results.rows.item(i)['green'] ;
           newData.blue = results.rows.item(i)['blue'] ;
           newData.black = results.rows.item(i)['black'] ;
           newData.dblack = results.rows.item(i)['dblblack'] ;

           newData.shuttle = results.rows.item(i)['shuttle'] ;

           newData.latitude = results.rows.item(i)['latitude'];
           newData.longitude = results.rows.item(i)['longitude'];
           newData.difficulty = getDifficulty(newData.green, newData.blue, newData.black, newData.dblack) ;
           newData.size = getSize(newData.green, newData.blue, newData.black, newData.dblack) ;
           getWeather(newData, newData.latitude, newData.longitude) ;
           console.log("weather" + newData.weather) ;
           $scope.$apply() ;

           if($scope.gpsLat != null)
           {
             newData.distance = getDistance($scope.gpsLat, $scope.gpsLong, newData.latitude, newData.longitude);
           }
           else
           {
             newData.distance = "No valid GPS data"
           }

           addEntry(newData) ;
           $scope.$apply() ;
           //console.log(JSON.stringify(results.rows.item(i)));
         }
       });
     });
    getResults() ;
   }
   else
     console.error("db is null!");

  }

  // Run at the onclick of the preferred mountains button
  // Will send query to database based on user inputs and return mountains
  // that meet preference
  $scope.submitForm = function()
  {
    this.form = !this.form ;        // hide the preference menu at click
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

          //  newData.size = results.rows.item(i)['size'] ;
           newData.park = results.rows.item(i)['park'] ;
           //newData.difficulty = results.rows.item(i)['difficulty'] ;

           newData.lifts = results.rows.item(i)['lifts'] ;
           newData.green = results.rows.item(i)['green'] ;
           newData.blue = results.rows.item(i)['blue'] ;
           newData.black = results.rows.item(i)['black'] ;
           newData.dblack = results.rows.item(i)['dblblack'] ;

           newData.difficulty = getDifficulty(newData.green, newData.blue, newData.black, newData.dblack) ;
           newData.size = getSize(newData.green, newData.blue, newData.black, newData.dblack) ;
           newData.shuttle = results.rows.item(i)['shuttle'] ;

           newData.latitude = results.rows.item(i)['latitude'];
           newData.longitude = results.rows.item(i)['longitude'];
           getWeather(newData, newData.latitude, newData.longitude) ;
           console.log("weather" + newData.weather) ;
           $scope.$apply() ;
           if($scope.gpsLat != null)
           {
             newData.distance = getDistance($scope.gpsLat,$scope.gpsLong, newData.latitude, newData.longitude);
           }
           else
           {
             newData.distance = "No valid GPS data"
           }
           if(newData.distance <= distance)
            addEntry(newData);
           $scope.$apply() ;

           //console.log(JSON.stringify(results.rows.item(i)));
           console.log(newData);
         }
       });
     });
     getResults() ;
   }
   else
     console.error("db is null!");
}
/*******************************************************
* helper functions run by mountain controllers
********************************************************/

// return collection of results
function getResults(){
  $scope.collection = Results.getAll() ;
}

// get user's current location
function getLocation(){
  var options = {
    timeout: 10000,           // maximum time for success function to result
    enableHighAccuracy: true  // increase accuracy of data returned
  } ;
  console.log("getting location ...") ;
  // Start Geolocation code
  // Test coordinates: 49.134690, -122.873986
  //Calls function to get current location of phone
    var position = navigator.geolocation.getCurrentPosition(function(location) {
      $scope.gpsLat = location.coords.latitude;
      $scope.gpsLong = location.coords.longitude ;
      console.log("Location: " + location) ;
    }, function(error) {
      console.log("Error getting location: " + error.code + "-" + error.message) ;
    }, options );

}

// get weather from OpenWeatherAPI
function getWeather(newData, latitude, longitude){
  var promise = Weather.getWeather(latitude, longitude);
  promise.then(function(weather){
    console.log("Received weather ... " + weather) ;
    newData.weather = weather ;
    }, function(error){
    console.log("Failed to receive weather info") ;
  })
}

// Convert to distance
// lat1, lon1 = GPS Coords, lat2, lon2 = Mountain Coords
function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = toRadians(lat2-lat1);  // toRadians defined below
  var dLon = toRadians(lon2-lon1);
  var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
};

function toRadians(deg) {
  return deg * (Math.PI/180)
};

//add mountain entry to collection
function addEntry(newData){
  Results.push(newData) ;
};

function getDifficulty(green, blue, black, dblack){
  var ratio = parseFloat(green) / parseFloat(green + blue + black + dblack) ;
  console.log("Difficulty Ratio: " + ratio ) ;

  if( ratio > 0.17)
    return "Difficult" ;
  else if (ratio > 0.14)
    return "Medium" ;
  else
    return "Easy" ;
};

function getSize(green, blue, black, dblack){
  console.log(green + blue + black + dblack) ;
  var total = parseFloat(green) + parseFloat(blue) + parseFloat(black) + parseFloat(dblack) ;

  console.log("Total number of runs: " + total) ;
  if(total > 100)
    return "Large" ;
  else if (total > 50)
    return "Medium" ;
  else
    return "Small" ;
};

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

displayWeatherFC() ;


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

function displayWeatherFC(){

  var d = new Date() ;
  document.getElementById("tom").innerHTML = getDay(d.getDay() + 1) ;
  console.log("Tomorrow:" + (d.getDay() + 1)) ;
  document.getElementById("tomPNG").src = getIcon($scope.results) ;
  console.log("URL : " + getIcon($scope.results)) ;
  document.getElementById("day2").innerHTML = getDay(d.getDay() + 2) ;
  document.getElementById("day3").innerHTML = getDay(d.getDay() + 3) ;
  document.getElementById("day4").innerHTML = getDay(d.getDay() + 4) ;

};

function getDay(num){
  var weekday = new Array(7);
    weekday[0]=  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    return weekday[(num - 1) % 6] ;
} ;

function getIcon(weather){
  console.log("Getting weather for " + weather) ;
  var url;
  switch(weather){
    case "Patchy light snow":
      url = 'img/weather-icons-small/icon-light-snow.png' ;
      break ;
    case "Heavy snow":
      url = 'img/weather-icons-small/icon-snowflake.png' ;
      break ;
    case "Mist":
      url = 'img/weather-icons-small/icon-light-rain.png' ;
      break ;
    case "Sunny skies":
    url = 'img/weather-icons-small/icon-sun.png' ;
      break ;
    default:
      url = 'img/weather-icons-small/icon-sun.png' ;
      break ;
  };

  return url ;
}

});
