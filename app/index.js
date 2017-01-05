var featureSource = require('./features/maths.increment.feature');
var supportCode = require('./features/step_definitions/maths.increment.steps');
var ansi_up = require('ansi_up');

// function requireAll(r) { r.keys().forEach(r); }
// requireAll(require.context('./features/', true, /\.feature$/));

// console.log(requireAll(require.context('./features/', true, /\.feature$/)));
// console.log(require.context('.', true, /^[a-z]*/));
// console.log(require('fs'));

var options = {
    strict: false,

    // tagged with @frontend or @only but not @skip
    tags: ['@frontend,@only', '~@skip'],

    // tagged with @complex ut not @skip
    // tags: ['~@skip', '@complex'],

    // tagged with @frontend and @complex
    // tags: ['@frontend', '@complex'],
    backtrace: true
};


function runFeature() {
    var $output = $('#output');
    $output.empty();

    var cucumber = new Cucumber(featureSource, supportCode, options);

    var prettyFormatterOptions = {
        logToFunction: function(data) {
            var text = ansi_up.ansi_to_text(data);

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
        debugger
        var errorContainer = $('<div>');
        errorContainer.addClass('error').text(err.stack);
        $output.append(errorContainer);
    }
}

$(function() {
    $('#run-feature').click(runFeature);

    runFeature();
});
