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
    //Put your script in here!

    //set variables to use for storing information from myweather2
    var results = document.getElementById("results");
    var tomorrow = document.getElementById("tomorrow");
    var days2 = document.getElementById("days2");
    var days3 = document.getElementById("days3");
    var days4 = document.getElementById("days4");

    var hr = new XMLHttpRequest();
    //WHISTLER: http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json
    //CYPRESS: http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json
    //GROUSE: http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json
    //$scope.mountain.url is the url hardcoded for each mountain in the service.js file
    hr.open('GET', $scope.mountain.url);
    hr.setRequestHeader("Content-type", "application/json");

    hr.onreadystatechange = function() {
      if(hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.responseText);
        results.innerHTML = "today's conditions: "+ data.weather.forecast[0].day[0].weather_text;
        tomorrow.innerHTML = "tomorrow's conditions: "+ data.weather.forecast[1].day[0].weather_text;
        days2.innerHTML = "conditions in 2 days: "+ data.weather.forecast[2].day[0].weather_text;
        days3.innerHTML = "conditions in 3 days: "+ data.weather.forecast[3].day[0].weather_text;
        days4.innerHTML = "conditions in 4 days: "+ data.weather.forecast[4].day[0].weather_text;
      }
    }

    //show the requesting strings while it is retrieving data
    hr.send(null);
    results.innerHTML = "requesting...";
    tomorrow.innerHTML = "requesting...";
    days2.innerHTML = "requesting...";
    days3.innerHTML = "requesting...";
    days4.innerHTML = "requesting...";
});

});
