 xdescribe('MntCtrl', function() {
     var $scope, ctrl;
     
     // mock declarations
     var mountainsMock, weatherMock, resultsMock;
     
     beforeEach(module('starter.controllers', ['ngCordova']));
     
     beforeEach(function() {
         
         

         // mock the Mountains service
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
                 push: jasmine.createSpy('push spy'),
                 get: jasmine.createSpy('get spy'),
                 getAll: jasmine.createSpy('getAll spy'),
                 clearAll: jasmine.createSpy('clearAll spy')
             }
         });
         
         // create a scope and initialize the controller with our mock and scope
         inject(function($rootScope, $controller, _$cordovaGeolocation_, _$ionicPopover_) {
             $scope = $rootScope.$new();
             ctrl = $controller('MntCtrl', {$scope: $scope, Mountains: mountainsMock, $cordovaGeolocation: _$cordovaGeolocation_, $ionicPopover: _$ionicPopover_, Weather: weatherMock, Results: resultsMock}); 

             
         });
     });
     
     describe('$scope.toRadians', function() {
         it('proper output values', function() {

             for(var testDeg = 0; testDeg<=360; testDeg+=5)
                expect((ctrl.toRadians(testDeg)-(Math.PI*testDeg/180)) < 0.0001).toBe(true);
         });
     });

     xdescribe('$scope.getMountain', function() { //OBSOLETE FUNCTION
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
     

     xdescribe('$scope.remove', function() { //OBSOLETE FUNCTION
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
         it('proplerly adds to Results', function() {
             var testObj = 1;
             $scope.addEntry(testObj);
             expect(resutsMock.push).toHaveBeenCalledWith(1);
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