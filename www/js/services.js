angular.module('starter.services', [])
.factory('Geolocation', function($cordovaGeolocation) {
  return {
    getCurrentLocation: function() {
      return $cordovaGeolocation.getCurrentPosition(function(location) {
        q.resolve(location);
      }, function(error) {
        console.log("Error getting location: " + error.code + "-" + error.message) ;
      }, {
        timeout: 10000,           // maximum time for success function to result
        enableHighAccuracy: true  // increase accuracy of data returned
      });
    }
  }
})

.factory('Mountains', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var mountains = [{
    id: 1,
    name: 'Whistler',
    lastText: 'New Snow!!!',
    face: 'img/clouds.jpg',
    url: "http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json"
  }, {
    id: 2,
    name: 'Cypress',
    lastText: 'no new snow',
    face: 'img/sunandclouds.jpg',
    url: "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json"
  }, {
    id: 3,
    name: 'Grouse',
    lastText: 'no new snow',
    face: 'img/sunandclouds.jpg',
    url: "http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json"
  }, {
    id: 4,
    name: 'Seymour',
    lastText: 'no new snow',
    face: 'img/clouds.jpg',
    url: "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json"
  },{
    id: 5,
    name: 'Big White',
    lastText: 'no new snow',
    face: 'img/clouds.jpg',
    url: "http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json"
  }];

  return {
    all: function() {
      return mountains;
    },
    remove: function(mountain) {
      mountains.splice(mountains.indexOf(mountain), 1);
    },
    get: function(mountainId) {
      for (var i = 0; i < mountains.length; i++) {
        if (mountains[i].id === parseInt(mountainId)) {
          return mountains[i];
        }
      }
      return null;
    }
  };
})
.factory('Weather', function($http, $q){
  return{

    getWeather: function(latitude, longitude){
      var def = $q.defer() ;
      var APIKEY = '3770427263d5a7a6ce2c0f0ac0c53bba' ;   // API key for OpenWeather
      var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +
        '&lon='+ longitude + '&appid=' + APIKEY ;
      $http.get(url)
      .then(function (response) {
          var weather = response.data.weather[0].main ;   // successfully executed http request
          def.resolve(weather) ;
          console.log("Weather: " + weather) ;
      }).catch(function(err){                             // error in connecting, return error
          def.reject(err) ;
          console.log("Error getting weather.") ;
      }) ;
      return def.promise ;                                // because http request might be delayed
    }                                                     // return a "promise"
  }
});
