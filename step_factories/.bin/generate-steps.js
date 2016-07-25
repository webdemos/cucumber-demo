#! /usr/bin/env node

// I don't want the actual return value to be the result of the call, so use exclamatory mark here, also save a byte
// http://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function
!function () {
    var fs = require('fs'),
        path = require('path'),
        shell = require('shelljs'),
        stepFactories = 'step_factories/',
        tmp = '.tmp/',
        tmpSteps = path.resolve(stepFactories + tmp + './steps.js'),
        snippets = path.resolve(stepFactories + '.supports/javascript_syntax.js'),
        wrapper =  path.resolve(stepFactories + '.supports/wrapper.tpl.js'),
        tmpWrapper =  path.resolve(stepFactories + tmp + '.wrapper.js'),
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
        if (shell.test('-f', [tmpSteps])) {
            shell.rm('-rf', tmpSteps);
            shell.echo(tmpSteps + ' cleaned');
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

            shell.cp(wrapper, tmpWrapper);

            // Buffer steps
            var BUFFER = bufferFile(tmpSteps);

            shell.sed('-i', "'%STEPS%';", BUFFER, tmpWrapper);

            shell.mv('-f', tmpWrapper, stepFactories + tmp + featureName + '.steps.js');
    
            cleanSteps();
        }
    });
    
}();








