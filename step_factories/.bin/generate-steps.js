#! /usr/bin/env node

// I don't want the actual return value to be the result of the call, so use exclamatory mark here, also save a byte
// http://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function
!function () {
    var fs = require('fs'),
        path = require('path'),
        shell = require('shelljs'),
        stepFactories = 'step_factories/',
        temp = '.temp/',
        tempSteps = path.resolve(stepFactories + temp + './steps.js'),
        snippets = path.resolve(stepFactories + '.supports/javascript_syntax.js'),
        wrapper =  path.resolve(stepFactories + '.supports/wrapper.tpl.js'),
        tempWrapper =  path.resolve(stepFactories + temp + '.wrapper.js'),
        command = 'node ' + path.resolve('node_modules/cucumber/bin/cucumber.js'),
        snippetSyntax = '--snippet-syntax ' + snippets,
        feature;

    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }

    function bufferFile (relPath) {
        return fs.readFileSync(path.join(relPath), {encoding: 'utf-8'});
    }

    function cleanSteps () {
        if (shell.test('-f', [tempSteps])) {
            shell.rm('-rf', tempSteps);
            shell.echo(tempSteps + ' cleaned');
            // shell.echo(process.cwd());
        }
    }

    fs.readdirSync(stepFactories).forEach(function (file) {

        var stats;
        try{
            stats = fs.lstatSync(stepFactories + file);
        } catch (err) {
            console.log(err);
        }

        // make sure it's a file and it's with a suffix '.feature'
        if (stats.isFile() && (path.extname(file) === '.feature')) {
            
            var featureName = file.replace(/\.feature$/, '');
            feature = stepFactories + featureName + '.feature';

            cleanSteps();
            shell.exec(command + ' ' + snippetSyntax + ' ' + feature);

            shell.cp(wrapper, tempWrapper);

            // Buffer steps
            var BUFFER = bufferFile(tempSteps);

            shell.sed('-i', "'%CONTENT%';", BUFFER, tempWrapper);

            shell.mv('-f', tempWrapper, stepFactories + temp + featureName + '.steps.js');
    
            cleanSteps();
        }
    });
    
}();








