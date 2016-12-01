 describe('MntCtrl', function() {
     var $scope, ctrl, $ionicPopover;
     
     // mock declarations
     var mountainsMock, weatherMock, resultsMock;
     
     beforeEach(function() {
         
         module('starter.controllers');
         module('ngCordova');

         // mock the Mountains service ALISFHGALEIFUAFEIUAOIFD
         inject(function($q) {
             
             deferredMountainsService = $q.defer();
             mountainsMock = {
             all: jasmine.createSpy('all spy').and.returnValue(deferredMountainsService.promise),
             remove: jasmine.createSpy('remove spy').and.returnValue(deferredMountainsService.promise),
             get: jasmine.createSpy('get spy').and.returnValue(deferredMountainsService.promise)
             }
             // mock the Weather service
             weatherMock = {
                 
             }
             
             // mock the Results service
             resultsMock = {
                 
             }
         });
         
         // mock the geolocation, no longer necessary
         inject(function($q) {
             deferredGeolocation = $q.defer();
             geolocationMock = {
                 getCurrentLocation: jasmine.createSpy('getCurrentLocationSpy').and.returnValue(deferredGeolocation.promise)
             }
         });

         
         // create a scope and initialize the controller with our mock and scope
         inject(function($rootScope, $controller, _$cordovaGeolocation_, _$ionicPopover_) {
             $scope = $rootScope.$new();
             $ionicPopover = _$ionicPopover_;
             ctrl = $controller('MntCtrl', {$scope: $scope, Mountains: mountainsMock, $cordovaGeolocation: _$cordovaGeolocation_, $ionicPopover: $ionicPopover, Weather: weatherMock, Results: resultsMock}); 

             
         });
     });
     /*
     describe('Geolocation.getCurrentLocaation', function() {
         var testPosition;
         beforeEach(function() {
             //test position
             testPosition = new Object();
             testPosition.coords = new Object();
             testPosition.coords.latitude = 100;
             testPosition.coords.longitude = 50;
             //call the function
             geolocationMock.getCurrentLocation();
         });
         
         it('successful geolocation', function() {
             deferredGeolocation.resolve(testPosition);
             $scope.$digest();
             expect($scope.gpsLat == testPosition.coords.latitude).toBe(true);
             expect($scope.gpsLong == testPosition.coords.longitude).toBe(true);
         });
     });
     
     describe('$scope.filterFunction', function() {
         it('properly compares distance fields', function() {
             //set controller var to default
             $scope.distance = 200;
             //tester object to pass in
             var testObj = new Object();
             testObj.distance = 199;
             expect($scope.filterFunction(testObj)).toBe(true);
             testObj.distance = 200;
             expect($scope.filterFunction(testObj)).toBe(true);
             testObj.distance = 201;
             expect($scope.filterFunction(testObj)).toBe(false);
         });
     });
     */
     
     /*
     describe('$scope.getDistance', function() {
         it('known distance computation', function() {
             // distance from 49.193827, -123.184263 to 51.115329, -114.021494 should be 675
             expect($scope.getDistance(49, -123, 51, -114)).toBe(0);
         });
     });
     */
     
     describe('$scope.toRadians', function() {
         it('proper output values', function() {

             for(var testDeg = 0; testDeg<=360; testDeg+=5)
                expect(($scope.toRadians(testDeg)-(Math.PI*testDeg/180)) < 0.0001).toBe(true);
         });
     });

     describe('$scope.getMountain', function() {
         //call the function
         beforeEach(function() {
             var mountainId = 1;
             $scope.getMountain(mountainId);             
         });
         
         it('proper mountainId used', function() {
             expect(mountainsMock.get).toHaveBeenCalledWith(1);
         });
         
         it('proper mountain "got"', function() {
             // TODO: how to check this? what does getting a mountain do?
         });
     });
     

     describe('$scope.remove', function() {
         //call the function
         beforeEach(function() {
             var mountain = 'testMountain';
             $scope.remove(mountain);  
            // TODO: why does remove use a mountain but get uses an ID?          
         });
         
         it('proper mountain used', function() {
             expect(mountainsMock.remove).toHaveBeenCalledWith('testMountain');
         });
         
         it('mountain properly removed', function() {
             // TODO: how to check for this?
         });
     });
     
     describe('$scope.addEntry', function() {
         it('proplerly adds to collection', function() {
             var testObj = 1;
             $scope.addEntry(testObj);
             expect($scope.collection.indexOf(testObj)).toBe(0);
         });
     });
     
     // TODO: database calls do not work on browser, how to get around this?
     describe('$scope.submitForm', function() {
         beforeEach(function() {
             $scope.submitForm();
         });
         
         it('a', function() {
             expect($scope.collection.length >0 ).toBe(true);
         });
     });
     
     
     
 });