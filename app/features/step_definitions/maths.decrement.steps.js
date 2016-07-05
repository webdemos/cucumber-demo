module.exports = function () {
    
    // this.World = require('../support/world.js');
    
    this.Given(/^a variable set to (\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });
    
    this.When(/^I decrement the variable by (\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });
    
    this.Then(/^the variable should contain (\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });
    
};