module.exports = function () {
    
    this.World = require('../support/world.js');

    ///// Your step definitions /////

// use this.Given(), this.When() and this.Then() to declare step definitions
    
    this.Given(/^a variable set to (\d+)$/, function (number, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.setTo(number);
        callback();
    });
    
    this.When(/^I increment the variable by (\d+)$/, function (number, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.incrementBy(number);
        callback();
    });
    
    this.Then(/^the variable should contain (\d+)$/, function (number, callback) {
        // Write code here that turns the phrase above into concrete actions
        if (this.variable != parseInt(number))
            throw new Error('Variable should contain ' + number +
                ' but it contains ' + this.variable + '.');
        callback();
    });
    
};
