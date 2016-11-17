 describe('MntCtrl', function() {
     var $scope, ctrl;
     
     // mountains service mock
     var mountainsMock;
     
     beforeEach(function() {
         
         module('starter.controllers');

         // mock the Mountains service
         inject(function($q) {
             
             deferredMountainsService = $q.defer();
             mountainsMock = {
             all: jasmine.createSpy('all spy').and.returnValue(deferredMountainsService.promise),
             remove: jasmine.createSpy('remove spy').and.returnValue(deferredMountainsService.promise),
             get: jasmine.createSpy('get spy').and.returnValue(deferredMountainsService.promise)
         }
         });
         
         
         // create a scope and initialize the controller with our mock and scope
         inject(function($rootScope, $controller, $q) {
             $scope = $rootScope.$new();
             
             ctrl = $controller('MntCtrl', {$scope: $scope, Mountains: mountainsMock}); 

             
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
     
 });