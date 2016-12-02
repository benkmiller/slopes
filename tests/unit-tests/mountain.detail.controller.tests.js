describe('MntDetailCtrl', function() {

    var $scope, ctrl;

    // mocks
    var moutnainsMock, resultsMock, testStateParams;

    beforeEach(function() {

        module('starter.controllers', ['ngCordova']);

        // mock the Mountains service
         inject(function($q) {

             deferredMountainsService = $q.defer();
             mountainsMock = {
             all: jasmine.createSpy('all spy').and.returnValue(deferredMountainsService.promise),
             remove: jasmine.createSpy('remove spy').and.returnValue(deferredMountainsService.promise),
             get: jasmine.createSpy('get spy').and.returnValue(deferredMountainsService.promise),
             getMountainInfo: jasmine.createSpy('getMountainInfo spy').and.callFake(function() {
                 // return some fake data for testing purposes here
                 var fakeDataObject = { "weather": { "forecast": [ {"date": "2016-12-02",  "day": [ {"weather_code": "69", "weather_text": "Moderate or heavy sleet",  "wind": [ {"dir": "ESE", "dir_degree": "120", "speed": "14", "wind_unit": "kph" } ] } ], "day_max_temp": "6",  "night": [ {"weather_code": "23", "weather_text": "Patchy sleet possible",  "wind": [ {"dir": "SSE", "dir_degree": "158", "speed": "18", "wind_unit": "kph" } ] } ], "night_min_temp": "2", "temp_unit": "c" }, {"date": "2016-12-03",  "day": [ {"weather_code": "2", "weather_text": "Cloudy skies",  "wind": [ {"dir": "SSE", "dir_degree": "157", "speed": "14", "wind_unit": "kph" } ] } ], "day_max_temp": "6",  "night": [ {"weather_code": "68", "weather_text": "Light sleet",  "wind": [ {"dir": "WSW", "dir_degree": "246", "speed": "14", "wind_unit": "kph" } ] } ], "night_min_temp": "1", "temp_unit": "c" }, {"date": "2016-12-04",  "day": [ {"weather_code": "0", "weather_text": "Sunny skies",  "wind": [ {"dir": "NNW", "dir_degree": "338", "speed": "18", "wind_unit": "kph" } ] } ], "day_max_temp": "1",  "night": [ {"weather_code": "0", "weather_text": "Clear skies",  "wind": [ {"dir": "E", "dir_degree": "90", "speed": "14", "wind_unit": "kph" } ] } ], "night_min_temp": "-3", "temp_unit": "c" }, {"date": "2016-12-05",  "day": [ {"weather_code": "94", "weather_text": "Moderate or heavy snow with thunder",  "wind": [ {"dir": "ENE", "dir_degree": "67", "speed": "14", "wind_unit": "kph" } ] } ], "day_max_temp": "0",  "night": [ {"weather_code": "71", "weather_text": "Light snow",  "wind": [ {"dir": "NE", "dir_degree": "41", "speed": "11", "wind_unit": "kph" } ] } ], "night_min_temp": "-6", "temp_unit": "c" }, {"date": "2016-12-06",  "day": [ {"weather_code": "0", "weather_text": "Sunny skies",  "wind": [ {"dir": "NE", "dir_degree": "38", "speed": "14", "wind_unit": "kph" } ] } ], "day_max_temp": "-5",  "night": [ {"weather_code": "0", "weather_text": "Clear skies",  "wind": [ {"dir": "NE", "dir_degree": "40", "speed": "11", "wind_unit": "kph" } ] } ], "night_min_temp": "-6", "temp_unit": "c" }, {"date": "2016-12-07",  "day": [ {"weather_code": "0", "weather_text": "Sunny skies",  "wind": [ {"dir": "NE", "dir_degree": "42", "speed": "11", "wind_unit": "kph" } ] } ], "day_max_temp": "-1",  "night": [ {"weather_code": "75", "weather_text": "Heavy snow",  "wind": [ {"dir": "NE", "dir_degree": "56", "speed": "14", "wind_unit": "kph" } ] } ], "night_min_temp": "-5", "temp_unit": "c" } ],  "snow_report": [ {"conditions": "Variable snow conditions at all elevations", "last_snow_date": "Nov 29", "lower_snow_depth": "10", "report_date": "2016-11-30 00:00", "upper_snow_depth": "30" } ] }};
                 return fakeDataObject;
             }),
             getScrapedInfo: jasmine.createSpy('getScrapedInfo spy').and.callFake(function() {
                 // return some fake data for testing purposes here
                 var fakeArray = [1,2,3,4,5,6,7,8,9,10];
                 return fakeArray;
             })
             };

             // mock the Results service
             resultsMock = {
                 push: jasmine.createSpy('push spy'),
                 get: jasmine.createSpy('get spy'),
                 getAll: jasmine.createSpy('getAll spy'),
                 clearAll: jasmine.createSpy('clearAll spy')
             };

             // state params for testing:
             testStateParams = {
                 // testing with mountain 1
                 mountainId: 1
             };
         });

         // create a scope and initialize controllers
         inject(function($rootscope, $controller) {
             $scope = $rootscope.$new();
             ctrl = $controller('MntDetailCtrl', {$scope: $scope, $stateParams: testStateParams, Mountains: mountainsMock, Results: resultsMock});
         });
    });

    it('Controller initialized properly', function() {
       expect(ctrl).toBeDefined();
    });

    describe('Proper field setup', function() {

    });


});
