
function JavaScriptSyntax() {

    var fs = require('fs'),
        path = require('path'),
        tmp = __dirname + '/../.tmp/',
        steps = 'steps.js';

    function bufferFile(relPath) {
        return fs.readFileSync(path.join(relPath), {encoding: 'utf-8'});
    }

    function generateSteps(/*pattern in RegExp*/ pattern, /*snippet in string*/ snippet) {
        var stats;
        try {
            // Query the entry
            stats = fs.lstatSync(tmp + steps);

            var stepData = bufferFile(tmp + steps);

            if (stepData.indexOf(pattern) === -1) {
                fs.appendFileSync(tmp + steps, '\n' + snippet + '\n');
            }

        } catch (err) {
            console.error(err);
            fs.mkdir(tmp);
            fs.appendFileSync(tmp + steps, '\n' + snippet + '\n');
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
    
            generateSteps(pattern, snippet);

            return snippet;
        }
    };
}

module.exports = JavaScriptSyntax;