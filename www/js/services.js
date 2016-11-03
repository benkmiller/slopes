angular.module('starter.services', [])

.factory('Mountains', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var mountains = [{
    id: 0,
    name: 'Whistler',
    lastText: 'New Snow!!!',
    face: 'img/clouds.jpg'
  }, {
    id: 1,
    name: 'Cypress',
    lastText: 'no new snow',
    face: 'img/sunandclouds.jpg'
  }, {
    id: 2,
    name: 'Grouse',
    lastText: 'no new snow',
    face: 'img/sunandclouds.jpg'
  }, {
    id: 3,
    name: 'Seymour',
    lastText: 'no new snow',
    face: 'img/clouds.jpg'
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
