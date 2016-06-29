module.exports = function () {

    this.World = require('../support/world.js');

    ///// Your step definitions /////

// use this.Given(), this.When() and this.Then() to declare step definitions

    this.Given(/^a variable set to (\d+)$/, function (number) {
        this.setTo(number);
    });

    this.When(/^I increment the variable by (\d+)$/, function (number) {
        this.incrementBy(number);
    });

    this.Then(/^the variable should contain (\d+)$/, function (number) {
        if (this.variable != parseInt(number))
            throw new Error('Variable should contain ' + number +
                ' but it contains ' + this.variable + '.');
    });

};
