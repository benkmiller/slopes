angular.module('starter.controllers', ['ngCordova'])

.controller('HomeCtrl', function($state, $scope, Mountains, Weather, Favorite) {
  $scope.title = 'Home';
  console.log('HomeCtrl');

  //----------------------------------------------
  // Favorites code
  //----------------------------------------------
  $scope.homeMntId = Favorite.getFave();
  $scope.homeMnt = Mountains.get($scope.homeMntId);
  $scope.homelink = "#/tab/mountains/"+$scope.homeMntId;

  $scope.alertUser = function(){
    alert("No Favorite Mountain Set - Go to a mountain and set it as favorite to use this feature.");
  }

  $scope.removeFave = function(){
    Favorite.remFave();
    $scope.homeMntId = 0;
    $window.location.reload(true);
    alert("Favorite mountain cleared!");
  }

  $scope.mountain = Mountains.all();
  var numMtns = Mountains.getNumMountains();

  //First grab all the data from each myWeather2 url
  for(var i = 0; i < numMtns; i ++){
      Mountains.getMountainInfoWeb($scope.mountain[i].url, i);
  }

  //get the Weather Underground scraping urls
  $scope.a = Mountains.getScrapedUrls();

  //Next grab all the data from each url from scrapedDataUrls to get the
  //Weather Underground info
  for(var i = 0; i < 10; i ++){
    Mountains.getScrapedInfoWeb($scope.a[i], i);
  }
})

.controller('MntCtrl',function($scope, Mountains, $cordovaGeolocation, $ionicPopover, Weather, Results) {
  // variables for reading from table
  $scope.title = 'Mountains';

  $scope.init = function(){
    $scope.form = true ;
    $scope.distance = 200 ;
    $scope.difficulty = 0 ;
    getLocation() ;
  }

  var popoverSize = '<ion-popover-view style="height:200px">' +
          '<ion-content class="padding" style="color:#38434C"> Size is calculated by total number of runs. A Small mountain has under 40 runs'+
          ' whereas a Large mountain has over 100 runs. </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(popoverSize, {
  scope: $scope
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

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

      //ben add
      var mountainData = Mountains.getMountainInfo();

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

           newData.lastSnow = getLastSnow(newData.id) ;
           newData.newSnow = getNewSnow(newData.id) ;

           newData.difficulty = getDifficulty(newData.green, newData.blue, newData.black, newData.dblack) ;
           newData.size = getSize(newData.green, newData.blue, newData.black, newData.dblack) ;
           
           newData.weather = Icons.getIcon(mountainData[newData.id - 1].weather.forecast[0].day[0].weather_text)
           //getWeather(newData, newData.latitude, newData.longitude) ;
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

           newData.lastSnow = getLastSnow(newData.id) ;
           newData.newSnow = getNewSnow(newData.id) ;
           getWeather(newData, newData.latitude, newData.longitude) ;
          //  console.log("weather" + newData.weather) ;
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
  // Start Geolocation code
  // Test coordinates: 49.134690, -122.873986
  //Calls function to get current location of phone
    var position = navigator.geolocation.getCurrentPosition(function(location) {
      $scope.gpsLat = location.coords.latitude;
      $scope.gpsLong = location.coords.longitude ;
      // console.log("Location: " + location) ;
    }, function(error) {
      console.log("Error getting location: " + error.code + "-" + error.message) ;
    }, options );

}

function getLastSnow(id){
  var a = Mountains.getMountainInfo() ;
  return a[id - 1].weather.snow_report[0].last_snow_date

}

function getNewSnow(id){
  var a = Mountains.getScrapedInfo() ;
  return a[(id - 1)*2];
}
// get weather from OpenWeatherAPI

/*
function getWeather(newData, latitude, longitude){
  var promise = Weather.getWeather(latitude, longitude);
  promise.then(function(weather){
    newData.weather = weather ;
    }, function(error){
    console.log("Failed to receive weather info") ;
  })
}
*/
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
.controller('MntDetailCtrl', function($ionicHistory, $scope, $stateParams, Mountains, Results, Favorite){

  $scope.setFaveId = Favorite.getFave();

  $scope.mountain = Mountains.get($stateParams.mountainId);
  //FROM DATABASE
  $scope.info = Results.get($stateParams.mountainId) ;

  //Get data from factory
  var mountainData = Mountains.getMountainInfo();
  var scrapedData = Mountains.getScrapedInfo();

  $scope.lastSnow = mountainData[$scope.mountain.id - 1].weather.snow_report[0].last_snow_date;
  //snow in the last 24 hours
  $scope.newSnow = scrapedData[($scope.mountain.id - 1)*2];
  //snow in the last 48 hours
  $scope.newSnow48 = scrapedData[(($scope.mountain.id - 1)*2)+1];


  $scope.results = mountainData[$scope.mountain.id - 1].weather.forecast[0].day[0].weather_text;
  $scope.tomorrow = mountainData[$scope.mountain.id - 1].weather.forecast[1].day[0].weather_text;
  $scope.days2 = mountainData[$scope.mountain.id - 1].weather.forecast[2].day[0].weather_text;
  $scope.days3 = mountainData[$scope.mountain.id - 1].weather.forecast[3].day[0].weather_text;
  $scope.days4 = mountainData[$scope.mountain.id - 1].weather.forecast[4].day[0].weather_text;

  //------------------------------------------
  // Added to add more detail on weather page
  //------------------------------------------
  $scope.maxTemp = mountainData[$scope.mountain.id - 1].weather.forecast[0].day_max_temp;
  $scope.windSpeed = mountainData[$scope.mountain.id - 1].weather.forecast[0].day[0].wind[0].speed;
  $scope.windUnit = mountainData[$scope.mountain.id - 1].weather.forecast[0].day[0].wind[0].wind_unit;
  $scope.upperDepth = mountainData[$scope.mountain.id - 1].weather.snow_report[0].upper_snow_depth;
  $scope.snowConditions = mountainData[$scope.mountain.id - 1].weather.snow_report[0].conditions;

  //Display correct icons on page
  displayWeatherFC() ;

$scope.goBackOneView = function(){
  $ionicHistory.goBack(-1);
}

$scope.navigate = function(){
  var lat = this.info.latitude ;
  var long = this.info.longitude ;
  var devicePlatform = device.platform ;

  console.log("Device Platform: " + device.platform) ;
  // console.log("Latitude: " + this.info.latitude) ;
  // console.log("Longitude:" + this.info.longitude) ;

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

$scope.setFave = function(){
  Favorite.setFave($scope.mountain.id);
  alert($scope.mountain.name+" set as favorite!");

  $scope.setFaveId = Favorite.getFave();
  $window.location.reload(true);
}

function displayWeatherFC(){

  var d = new Date() ;
  document.getElementById("todayPNG").src = getIcon($scope.results) ;
  document.getElementById("tom").innerHTML = getDay(d.getDay() + 1) ;
  document.getElementById("tomPNG").src = getIcon($scope.tomorrow) ;
  document.getElementById("day2").innerHTML = getDay(d.getDay() + 2) ;
  document.getElementById("day2PNG").src = getIcon($scope.days2) ;
  document.getElementById("day3").innerHTML = getDay(d.getDay() + 3) ;
  document.getElementById("day3PNG").src = getIcon($scope.days3) ;
  document.getElementById("day4").innerHTML = getDay(d.getDay() + 4) ;
  document.getElementById("day4PNG").src = getIcon($scope.days4) ;
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

    return weekday[num % 7] ;
} ;

//Helper function for providing the correct weather icon
function getIcon(data){
  weather = data.toString() ;
  if(weather.includes('thunder') || weather.includes('Thundery'))
    return 'img/weather-icons-small/icon-thunder.png' ;
  else if(weather.includes('snow') || weather.includes('Snow'))
    return 'img/weather-icons-small/icon-light-snow.png' ;
  else if(weather.includes('sleet') || weather.includes('Sleet'))
    return 'img/weather-icons-small/icon-sleet.png' ;
  else if(weather.includes('Heavy rain') || weather.includes('heavy rain'))
    return 'img/weather-icons-small/icon-heavyrain.png' ;
  else if(weather.includes('rain') || weather.includes('shower'))
    return 'img/weather-icons-small/icon-showers.png' ;
  else if(weather.includes('Mist') || weather.includes('drizzle'))
    return 'img/weather-icons-small/icon-light-rain.png' ;
  else if(weather.includes('Fog') || weather.includes('fog'))
    return 'img/weather-icons-small/icon-fog.png' ;
  else if(weather.includes('ice') || weather.includes('Ice'))
    return 'img/weather-icons-small/icon-hail.png';
  else if(weather.includes('Sunny') || weather.includes('sunny'))
    return 'img/weather-icons-small/icon_sun.png' ;
  else if(weather.includes('Overcast'))
    return 'img/weather-icons-small/icon-cloudy.png' ;
  else if(weather.includes('Cloud') || weather.includes('Cloudy'))
    return 'img/weather-icons-small/icon-cloudy.png' ;
  else return '' ;
};

});
