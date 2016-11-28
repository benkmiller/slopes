angular.module('starter.services', [])

.factory('Mountains', function($http, $q) {
         // Might use a resource here that returns a JSON array

         var numMountains = 5;
         var mountainInfo = [];

         var sean = [
         {},
         {},
         {},
         {},
         {}
         ];

         var scrapedData = [0,0,0,0,0,0,0,0,0,0];
        // var scrapedData.length = 10;
         
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

         
         // Some fake testing data
         var mountains = [{
                          id: 1,
                          name: 'Whistler',
                          face: 'img/clouds.jpg',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json",
                          }, {
                          id: 2,
                          name: 'Cypress',
                          face: 'img/sunandclouds.jpg',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json",
                          }, {
                          id: 3,
                          name: 'Grouse',
                          face: 'img/sunandclouds.jpg',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json",
                          }, {
                          id: 4,
                          name: 'Seymour',
                          face: 'img/clouds.jpg',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=aY-aygU21j&uref=bf2e39b0-a66e-4ccd-813c-b8f731bc12e6&output=json",
                          },{
                          id: 5,
                          name: 'Big White',
                          face: 'img/clouds.jpg',
                          url: "http://www.myweather2.com/developer/weather.ashx?uac=8OK8Qsa/Hb&uref=02830405-f52e-48bf-9b0d-b4127b45a600&output=json",
                          }];

      return {
         all: function() {
         return mountains;
         },
         getNumMountains: function() {
         return numMountains;
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
         },
         set: function(mountain, updatedWeather){
         mountain.oldWeather.lastSnow = updatedWeather;
         return null;
         },
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
         

         getMountainInfoWeb: function(url1, mtnNum){
         var defs = $q.defer()
         $http.get(url1)
         .then(function (response) {
               sean[mtnNum] = response.data;   // successfully executed http request
               defs.resolve(sean[mtnNum]);
               }).catch(function(err){                             // error in connecting, return error
                        defs.reject(err) ;
                        console.log("Error getting conditions.") ;
                        }) ;
         return defs.promise ;                                // because http request might be delayed
         } ,

         getMountainInfo: function(){ //paramerter: index
         return sean;
         },
         getScrapedInfo: function(){ //paramerter: index
         return scrapedData;
         } ,
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
