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
    //console.log("seannnnn");
    var results = document.getElementById("results");
var hr = new XMLHttpRequest();
hr.open('GET', "http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json");
hr.setRequestHeader("Content-type", "application/json");
hr.onreadystatechange = function() {
   if(hr.readyState == 4 && hr.status == 200) {
     var data = JSON.parse(hr.responseText);
     if(results == null){
       console.log("JANNNN");
     }
   results.innerHTML = "today: \n"+data.weather.forecast[0].date+" max temperature: "+data.weather.forecast[0].day_max_temp+" degrees "+data.weather.forecast[0].temp_unit ;
   }
 }
 hr.send(null);
 results.innerHTML = "requesting...";
console.log("aevaev");
});


$scope.$on("$ionicView.loaded", function() {

  //Put your script in here!
  //console.log("seannnnn");
  var results = document.getElementById("ben");
var hr = new XMLHttpRequest();
hr.open('GET', "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json");
hr.setRequestHeader("Content-type", "application/json");
hr.onreadystatechange = function() {
 if(hr.readyState == 4 && hr.status == 200) {
   var data = JSON.parse(hr.responseText);
   if(results == null){
     console.log("JANNNN");
   }
 results.innerHTML = "today: \n"+data.weather.forecast[0].date+" max temperature: "+data.weather.forecast[0].day_max_temp+" degrees "+data.weather.forecast[0].temp_unit ;
 }
}
hr.send(null);
results.innerHTML = "requesting...";
console.log("aevaev");
});

});
