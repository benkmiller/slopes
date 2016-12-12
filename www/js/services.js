angular.module('starter.services', [])

.factory('Mountains', function($http, $q) {

         //total number of mountains in our database
         var numMountains = 5;

         //array with 5 objects to hold all mountain information from myweather2
         //each object in the array represents one mountain's information
         //mountain information is stored in the same order as ID so for
         //example, whistler is the first ID so allWeatherData[0] contains
         //whistler's data from myweather2
         var allWeatherData = [
         {},
         {},
         {},
         {},
         {}
         ];

         var scrapedData = [0,0,0,0,0,0,0,0,0,0];

         var scrapedDataUrls = [//WHISTLER
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=ESGLK9PAW2ZXV5LK',
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=E7INJNQP9MMO7C1T',
                                //CYPRESS
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=WDB84S2RF0OO4SO2',
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=7DUBW9JGHEPIOKX5',

                                //GROUSE
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=889RM4DDHQ37BITN',
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=I842EISFS3PRAWMV',
                                //Seymour
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=WDB84S2RF0OO4SO2',
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=7DUBW9JGHEPIOKX5',
                                //BIGWHIT
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=DBU29PJO8EXD5YMZ',
                                'https://api.thingspeak.com/apps/thinghttp/send_request?api_key=8TRRZGMCP6SIZPE6'
                                ];


         //An array to store all of our mountains in JSON format
         //each mountain contains an ID, name and a url
         //the url is for grabbing data from myWeather2
         var mountains = [{
                          id: 1,
                          name: 'Whistler',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json",
                          }, {
                          id: 2,
                          name: 'Cypress',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json",
                          }, {
                          id: 3,
                          name: 'Grouse',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json",
                          }, {
                          id: 4,
                          name: 'Seymour',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json",
                          },{
                          id: 5,
                          name: 'Big White',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json",
                          }];

      return {
        //function that returns all the objects in the mountain array
         all: function() {
         return mountains;
         },

         //function that returns the total number of mountains in the database
         getNumMountains: function() {
         return numMountains;
         },

         /*
         returns a specific object containing a mountains information from the
          parameter: mountainID - the ID of the mountain you want
         */
         get: function(mountainId) {
         for (var i = 0; i < mountains.length; i++) {
         if (mountains[i].id === parseInt(mountainId)) {
         return mountains[i];
         }
         }
         return null;
         },

         /*
         function for grabbing information from the url provided
         parameters:  url2 - the url the data is retrieved from
                      numData - position where the data retrieved should be
                                storred within scrapedData array
         */
         getScrapedInfoWeb: function(url2, numData){
         var def1 = $q.defer()
         $http.get(url2)
         .then(function (response1) {
               scrapedData[numData] = response1.data;   // successfully executed http request
               def1.resolve(scrapedData[numData]);
               }).catch(function(err1){
                        def1.reject(err1) ;
                        console.log("Error getting conditions.") ;
                        }) ;
         return def1.promise ;                                // because http request might be delayed
         } ,

         /*
         function for grabbing information from the url provided
         parameters:  url1 - the url the data is retrieved from
                      mtnNum - position where the data retrieved should be
                                storred within allWeatherData array
         */

         getMountainInfoWeb: function(url1, mtnNum){
         var defs = $q.defer()
         $http.get(url1)
         .then(function (response) {
               allWeatherData[mtnNum] = response.data;   // successfully executed http request
               defs.resolve(allWeatherData[mtnNum]);
               }).catch(function(err){                             // error in connecting, return error
                        defs.reject(err) ;
                        console.log("Error getting conditions.") ;
                        }) ;
         return defs.promise ;                                // because http request might be delayed
         } ,

         //returns allWeatherData array
         getMountainInfo: function(){ //paramerter: index
         return allWeatherData;
         },

         //returns scrapedData array
         getScrapedInfo: function(){ //paramerter: index
         return scrapedData;
         } ,

         //returns scrapedDataUrls
         getScrapedUrls: function(){
         return scrapedDataUrls;
         }


    };
})

.factory('Results', function(){                         // Collection of results from the most recent parse to db
  var collection = [{}];
  return{
    push: function(newData){                            // add new result
      collection.push(newData) ;
    },
    get: function(id){                                  // get specific mountain by their id
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].id === parseInt(id)) {
          return collection[i];
        }
      }
    },
    getAll: function(){                                 // return all results
      return collection ;
    },
    clearAll: function(id){                             // delete all results from collection
      var j = 0 ;
      while(collection.length > 0)
      {
        collection.splice(j, 1) ;
      }
      console.log("Size of collection:" + collection.length) ;
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
})
.factory('Favorite',function(){
  var faveID = 0;

  return{
    setFave: function(id){
      localStorage.setItem("id", id);
    },

    getFave: function(){
      faveID = localStorage.getItem("id");

      if(faveID == null)
      {
        return 0;
      }
      else
      {
        return faveID;
      }
    },

    remFave: function(){
      localStorage.removeItem("id");
    }
  }
})

//
//Factory dedicated to providing the right icon given some weather
//
.factory('Icons',function(){
  return{
    getIcon: function(data){
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
      else if(weather.includes('Cloud') || weather.includes('Cloudy') || weather.includes('Clouds') )
        return 'img/weather-icons-small/icon-cloudy.png' ;
      else if(weather.includes('Partly cloudy')  )
        return 'img/weather-icons-small/icon-sun-clouds.png' ;
      else return 'no results for ' + data ;
    }
  }
})
