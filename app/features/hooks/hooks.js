module.exports = function () {

// hooks
    this.registerHandler('BeforeFeatures', function (event, callback) {
        console.log('in BeforeFeatures hook');
        // clean up!
        // Be careful, there is no World instance available on `this` here
        // because all scenarios are done and World instances are long gone.
        callback();
    });
    
    this.registerHandler('AfterFeatures', function (event, callback) {
        console.log('in AfterFeatures hook');
        // clean up!
        // Be careful, there is no World instance available on `this` here
        // because all scenarios are done and World instances are long gone.
        callback();
    });
    
    this.registerHandler('BeforeScenario', function (event, callback) {
        console.log('in BeforeScenario hook');
        // clean up!
        // Be careful, there is no World instance available on `this` here
        // because all scenarios are done and World instances are long gone.
        callback();
    });
    
    this.Before(function (scenario, callback) {
        console.log('in Before hook');
        // console.log(scenario.getName(), "(" + scenario.getUri() + ":" + scenario.getLine() + ")");
        callback();
    });
    
    this.After(function (scenario, callback) {
        console.log('in After hook');
        // console.log(scenario.getName(), "(" + scenario.getUri() + ":" + scenario.getLine() + ")");
        callback();
    });

};