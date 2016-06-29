
///// Your World /////

// set this.World to your custom world (optional)

var CustomWorld = function() {};

CustomWorld.prototype.variable = 0;

CustomWorld.prototype.setTo = function(number) {
    this.variable = parseInt(number);
};

CustomWorld.prototype.incrementBy = function(number) {
    this.variable += parseInt(number);
};

module.exports = CustomWorld;