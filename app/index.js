var mathsSteps = require('./features/step_definitions/maths.steps');
var mathsFeature = require('./features/maths.feature');


function runFeature() {
    var $output = $('#output');
    $output.empty();

    var options = {
        strict: false,
        tags: ['~@frontend', '@complex'],
        backtrace: true
    };

    var cucumber = Cucumber(mathsFeature, mathsSteps, options);
    debugger

    var prettyFormatterOptions = {
        logToFunction: function(data) {
            var text = ansi_up.ansi_to_text(data);
            console.log(text);
            data = ansi_up.ansi_to_html(data);
            $output.append(data);
            $output.scrollTop($output.prop("scrollHeight"));
        },
        useColors: true
    };
    var listener = Cucumber.Listener.PrettyFormatter(prettyFormatterOptions);
    cucumber.attachListener(listener);

    $('a[href="#output-tab"]').tab('show');

    try {
        cucumber.start(function() {
            debugger
        });
    } catch(err) {
        var errorContainer = $('<div>');
        errorContainer.addClass('error').text(err.stack);
        $output.append(errorContainer);
    }
}

$(function() {
    $('#run-feature').click(runFeature);
});
