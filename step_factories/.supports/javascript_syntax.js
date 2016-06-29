
function JavaScriptSyntax() {

    var fs = require('fs'),
        path = require('path'),
        temp = __dirname + '/../.temp/',
        steps = 'steps.js';

    function bufferFile(relPath) {
        return fs.readFileSync(path.join(relPath), {encoding: 'utf-8'});
    }

    function generateTempSteps(/*pattern in RegExp*/ pattern, /*snippet in string*/ snippet) {
        var stats;
        try {
            // Query the entry
            stats = fs.lstatSync(temp + steps);

            var stepData = bufferFile(temp + steps);

            if (stepData.indexOf(pattern) === -1) {
                fs.appendFileSync(temp + steps, '\n' + snippet + '\n');
            }

        } catch (err) {
            console.log(err);
            fs.mkdir(temp);
            fs.appendFileSync(temp + steps, '\n' + snippet + '\n');
        }
    }

    return {
        build: function build(functionName, pattern, parameters, comment) {
            var callbackName = parameters[parameters.length - 1];
            var snippet =
                'scenario.' + functionName + '(' + pattern + ', function (' + parameters.join(', ') + ') {' + '\n' +
                '  // ' + comment + '\n' +
                '  ' + callbackName + '();\n' +
                '});';
    
            generateTempSteps(pattern, snippet);

            return snippet;
        }
    };
}

module.exports = JavaScriptSyntax;