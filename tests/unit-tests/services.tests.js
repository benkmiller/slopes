describe('services testing:', function() {
    var Mountains;
    var allMountains;
    
    beforeEach(module('starter.services'));
    
    describe('Mountains service', function() {
        beforeEach(inject(function(_Mountains_) {
            Mountains = _Mountains_;
        }));
        
        it('Mountains object should be defined', function() {
            expect(Mountains).toBeDefined();
        });
        
        describe('get function', function() {
            it('properly fetch mountainId 1', function() {
                var testMountain = Mountains.get(1);
                
                expect(testMountain.id).toBe(1);
                expect(testMountain.name).toBe('Whistler');
                expect(testMountain.face).toBe('img/clouds.jpg');
                expect(testMountain.url).toBe("http://www.myweather2.com/developer/weather.ashx?uac=EqOGCVvbG-&uref=b3fa171b-af31-4a63-87dc-d79f1cbed54d&output=json");
            });
            
            it('getting all test mountains returns defined objects', function() {
               expect(Mountains.get(1)).toBeDefined(); 
               expect(Mountains.get(2)).toBeDefined();
               expect(Mountains.get(3)).toBeDefined();
               expect(Mountains.get(4)).toBeDefined();
               expect(Mountains.get(5)).toBeDefined();
            });
            
            it('query a non-existant mountain returns null', function() {
               expect(Mountains.get(6)).toBe(null);
            });
        });
        
        describe('all function', function() {
            beforeEach(function() {
                allMountains = Mountains.all();
            });
            
            it('all is correct size', function() {
               
               expect(allMountains.length).toBe(5); 
            });
            
            it('all return contains all mountains', function() {
                expect(allMountains[0].name).toBe('Whistler');
                expect(allMountains[1].name).toBe('Cypress');
                expect(allMountains[2].name).toBe('Grouse');
                expect(allMountains[3].name).toBe('Seymour');
                expect(allMountains[4].name).toBe('Big White');
            });
        });
        
        describe('remove function', function() {
           it('removed mountain no longer in array', function() {
             var toRemove = Mountains.get(1);
             Mountains.remove(toRemove);
             expect((Mountains.get(2)).name).toBe('Cypress');   
             expect(Mountains.get(1)).toBe(null);
             expect(Mountains.all().length).toBe(4);
             // TODO: the test reports that we have not shifter over the remaining mountains, is this intended?
           });
        });
        
        describe('getNumMountains function', function() {
            it('default mountain number is 5', function() {
                expect(Mountains.getNumMountains()).toBe(5);
            });
        });
    });


});
