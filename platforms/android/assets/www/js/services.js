angular.module('starter.services', [])
 
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
});
