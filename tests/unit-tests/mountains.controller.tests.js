 describe('MntCtrl', function() {
     // load the controller module
     beforeEach(module('starter.controllers'));
     
     var controller,
            deferredMountainsService,
            mountainsMock;
     
     // instantiate controller and necessary mocks
     beforeEach(inject(function($controller, $q) {
         
         
         // mock mountains
         deferredMountainsService = $q.defer();
         mountainsMock = {
             all: jasmine.createSpy('all spy').and.returnValue(deferredMountainsService.promise),
             getMountain: jasmine.createSpy('getMountain spy').and.returnValue(deferredMountainsService.promise),
             remove: jasmine.createSpy('remove spy').and.returnValue(deferredMountainsService.promise)
         };
         
         // instantiate a scope, for each test, necessary values should be written to it before tests runs
         var $scope = {};
         
         // instantiate controller
         controller = $controller('MtnCtrl', {$scope: $scope, Mountains: mountainsMock});
         
     }));
     
     // tests for getMountain function
     describe('$scope.getMountain', function() {
         
     });
     
     //tests for remove function
     describe('$scope.remove', function() {
         
     });
     
     //tests for addEntry
     describe('$scope.addEntry', function() {
         
     });
     
     //tests for submitForm
     describe('$scope.submitForm', function() {
         
     });
     
 });