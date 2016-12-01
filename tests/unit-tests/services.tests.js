describe('services testing:', function() {
    var Mountains, Results, Weather;
    var allMountains, collection;
    
    beforeEach(module('starter.services'));
    
    describe('Mountains service:', function() {
        beforeEach(inject(function(_Mountains_) {
            Mountains = _Mountains_;
        }));
        
        it('Mountains object should be defined', function() {
            expect(Mountains).toBeDefined();
        });
        
        describe('get function:', function() {
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
        
        describe('all function:', function() {
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
        
        describe('remove function:', function() {
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

    describe('Results service:', function() {
        beforeEach(inject(function(_Results_) {
            Results = _Results_;
            collection = Results.test_getCollection();
        }));
        
        it('Results object should be defined', function() {
            expect(Results).toBeDefined();
        });
        
        describe('push:', function() {
            it('properly push to collection', function() {
                Results.push(1);
                Results.push(2);
                
                expect(collection.length).toBe(3);// TODO: why is there a blank element at the beginning of the array
                expect(collection.indexOf(1)).toBe(1);
                expect(collection.indexOf(2)).toBe(2);
            });
        });
        
        describe('get:', function() {
            it('properly fetch an element by id', function() {
                var testObj = new Object();
                testObj.id = 2;
                testObj.key = 'testing object';
                Results.push(testObj);
                
                expect(Results.get(2).key).toBe('testing object');
                expect(Results.get(1)).toBe(undefined);
            });
        });
        
        describe('getAll:', function() {
            it('properly returns collection', function() {
                expect(Results.getAll().toString()).toBe(collection.toString());
            });
        });
        
        describe('clerAll:', function() {
            it('properly clears all elements', function() {
                 Results.push(new Object()); 
                 Results.push(1);
                 
                 Results.clearAll();
                 
                 expect(collection.length).toBe(0);                
            });
        });
    });
    
    describe('Weather service', function() {
        
        beforeEach(inject(function(_Weather_) {
            Weather = _Weather_;
        }));
        
        it('Weather object should be defined', function() {
            expect(Weather).toBeDefined();
        });
        
        describe('getWeather:', function() {
            
        });
        
    });
});
