describe("Configuration setup",function(){
    it(" should load local configuratons",function(next){
        var config = require('../config/index')();
        expect(config.mode).toBe('local');
        next();
    });
    it(" should load staging configurations", function(next){
        var config = require('../config/index')('staging');
        expect(config.mode).toBe('staging');
        next();
    });
    it(" should load production configurations", function(next){
        var config = require('../config/index')('production');
        expect(config.mode).toBe('production');
        next();
    })
});