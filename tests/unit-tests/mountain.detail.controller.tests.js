describe('MntDetailCtrl', function() {
    
    var $scope, ctrl;
    
    // mocks
    var moutnainsMock, resultsMock;
    
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
             }),
             getScrapedInfo: jasmine.createSpy('getScrapedInfo spy').and.callFake(function() {
                 // return some fake data for testing purposes here
             })
             }
             
             // mock the Results service
             resultsMock = {
                 push: jasmine.createSpy('push spy'),
                 get: jasmine.createSpy('get spy'),
                 getAll: jasmine.createSpy('getAll spy'),
                 clearAll: jasmine.createSpy('clearAll spy')
             }
             
             // state params for testing:
             testStateParams = {
                 // testing with mountain 1
                 mountainId: 1
             }
         });
         
         // create a scope and initialize controllers
         inject(function($rootscope, $controller) {
             $scope = $rootscope.$new();
             ctrl = $controller('MntDetailCtrl', {$scope: $scope, $stateParams: testStateParams, Mountains: mountainsMock, Results: resultsMock})
         });
    });
    
    it('Controller initialized properly', function() {
       expect(ctrl).toBeDefined(); 
    });
    
    describe('Proper field setup', function() {
        
    });
    
    
});