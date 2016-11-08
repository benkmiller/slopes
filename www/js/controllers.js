angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {
  $scope.title = 'Home';
  console.log('HomeCtrl');
})

.controller('WthrCtrl', function($scope) {
  $scope.title = 'Weather';
  console.log('WthrCtrl');
})

.controller('MntCtrl', function($scope, Mountains) {
  console.log('MntCtrl');
  $scope.mountains = Mountains.all();
  $scope.remove = function(mountain){
    Mountains.remove(mountain);
  };
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
    //var results = document.getElementById("results");
    //var tomorrow = document.getElementById("tomorrow");
    //var days2 = document.getElementById("days2");
    //var days3 = document.getElementById("days3");
    //var days4 = document.getElementById("days4");

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
        // lastSnow.innerHTML = "<b><span style='font-size:20px'>last snowfall: </span> </b>" + data.weather.snow_report[0].last_snow_date.fontsize(3);
        //results.innerHTML = "<b><span style='font-size:20px'>todays weather: </span> </b>"+  data.weather.forecast[0].day[0].weather_text.fontsize(3);
        //tomorrow.innerHTML = "<b><span style='font-size:20px'>tomorrows weather: </span> </b>"+ data.weather.forecast[1].day[0].weather_text.fontsize(3);
        //days2.innerHTML = "<b><span style='font-size:20px'>conditions in 2 days: </span> </b>"+ data.weather.forecast[2].day[0].weather_text.fontsize(3);
        //days3.innerHTML = "<b><span style='font-size:20px'>conditions in 3 days: </span> </b>"+ data.weather.forecast[3].day[0].weather_text.fontsize(3);
        //days4.innerHTML = "<b><span style='font-size:20px'>conditions in 4 days: </span> </b>"+ data.weather.forecast[4].day[0].weather_text.fontsize(3);
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
