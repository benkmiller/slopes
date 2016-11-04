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
    var results = document.getElementById("results");
    var sean = document.getElementById("sean");

var hr = new XMLHttpRequest();
hr.open('GET', "http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json");
hr.setRequestHeader("Content-type", "application/json");
hr.onreadystatechange = function() {
   if(hr.readyState == 4 && hr.status == 200) {
     var data = JSON.parse(hr.responseText);
     if(results == null){
       console.log("JANNNN");
     }
   results.innerHTML = "today's conditions on whistler: "+ data.weather.forecast[0].day[0].weather_text;  //data.weather.forecast[0].day[0].weather_text;
      sean.innerHTML = "tomorrows conditions on whistler: "+ data.weather.forecast[1].day[0].weather_text;
   //tomorrow.innerHTML = "tomorrow: "+ data.weather.forecast[0].day[1].weather_text;
   //results2.innerHTML = "two days from now: "+ data.weather.forecast[0].day[2].weather_text;

    }
 }
 hr.send(null);
 results.innerHTML = "requesting...";
 //results2.innerHTML = "requesting...";
 //results3.innerHTML = "requesting...";
console.log("aevaev");
});


/*$scope.$on("$ionicView.loaded", function() {

  //Put your script in here!
  //console.log("seannnnn");
  var ben = document.getElementById("ben");
  var sean = document.getElementById("sean");
var hr = new XMLHttpRequest();
hr.open('GET', "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json");
hr.setRequestHeader("Content-type", "application/json");
hr.onreadystatechange = function() {
 if(hr.readyState == 4 && hr.status == 200) {
   var data = JSON.parse(hr.responseText);
   if(results == null){
     console.log("JANNNN");
   }
 ben.innerHTML = "On Cypress: \n"+data.weather.forecast[0].date+" max temperature: "+data.weather.forecast[0].day_max_temp+" degrees "+data.weather.forecast[0].temp_unit ;
 sean.innerHTML = "Today's Conditons on Cypress: "+ data.weather.forecast[0].day[0].weather_text;

 }
}
hr.send(null);
results.innerHTML = "requesting...";
console.log("aevaev");
}); */

});
