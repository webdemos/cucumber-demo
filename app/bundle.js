/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var mathsSteps = __webpack_require__(1);
	var mathsFeature = __webpack_require__(3);
	
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function () {
	
	    this.World = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "Feature: Simple maths\r\n  In order to do maths\r\n  As a developer\r\n  I want to increment variables\r\n\r\n  @frontend\r\n  Scenario: easy maths\r\n    Given a variable set to 1\r\n    When I increment the variable by 1\r\n    Then the variable should contain 2\r\n\r\n  @complex\r\n  Scenario Outline: much more complex stuff\r\n    Given a variable set to <var>\r\n    When I increment the variable by <increment>\r\n    Then the variable should contain <result>\r\n\r\n    Examples:\r\n      | var | increment | result |\r\n      | 100 |         5 |    105 |\r\n      |  99 |      1234 |   1333 |\r\n      |  12 |         5 |     18 |"

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzczZGJkYmZmMTUxYWYwMDAzM2UiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9zdGVwX2RlZmluaXRpb25zL21hdGhzLnN0ZXBzLmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9zdXBwb3J0L3dvcmxkLmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9tYXRocy5mZWF0dXJlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDN0NEOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7Ozs7Ozs7QUNyQkE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4Qjs7Ozs7O0FDakJBLG9wQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGM3M2RiZGJmZjE1MWFmMDAwMzNlXG4gKiovIiwidmFyIG1hdGhzU3RlcHMgPSByZXF1aXJlKCcuL2ZlYXR1cmVzL3N0ZXBfZGVmaW5pdGlvbnMvbWF0aHMuc3RlcHMnKTtcclxudmFyIG1hdGhzRmVhdHVyZSA9IHJlcXVpcmUoJy4vZmVhdHVyZXMvbWF0aHMuZmVhdHVyZScpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJ1bkZlYXR1cmUoKSB7XHJcbiAgICB2YXIgJG91dHB1dCA9ICQoJyNvdXRwdXQnKTtcclxuICAgICRvdXRwdXQuZW1wdHkoKTtcclxuXHJcbiAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgIHRhZ3M6IFsnfkBmcm9udGVuZCcsICdAY29tcGxleCddLFxyXG4gICAgICAgIGJhY2t0cmFjZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY3VjdW1iZXIgPSBDdWN1bWJlcihtYXRoc0ZlYXR1cmUsIG1hdGhzU3RlcHMsIG9wdGlvbnMpO1xyXG4gICAgZGVidWdnZXJcclxuXHJcbiAgICB2YXIgcHJldHR5Rm9ybWF0dGVyT3B0aW9ucyA9IHtcclxuICAgICAgICBsb2dUb0Z1bmN0aW9uOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gYW5zaV91cC5hbnNpX3RvX3RleHQoZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG4gICAgICAgICAgICBkYXRhID0gYW5zaV91cC5hbnNpX3RvX2h0bWwoZGF0YSk7XHJcbiAgICAgICAgICAgICRvdXRwdXQuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAkb3V0cHV0LnNjcm9sbFRvcCgkb3V0cHV0LnByb3AoXCJzY3JvbGxIZWlnaHRcIikpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlQ29sb3JzOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgdmFyIGxpc3RlbmVyID0gQ3VjdW1iZXIuTGlzdGVuZXIuUHJldHR5Rm9ybWF0dGVyKHByZXR0eUZvcm1hdHRlck9wdGlvbnMpO1xyXG4gICAgY3VjdW1iZXIuYXR0YWNoTGlzdGVuZXIobGlzdGVuZXIpO1xyXG5cclxuICAgICQoJ2FbaHJlZj1cIiNvdXRwdXQtdGFiXCJdJykudGFiKCdzaG93Jyk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjdWN1bWJlci5zdGFydChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVidWdnZXJcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgdmFyIGVycm9yQ29udGFpbmVyID0gJCgnPGRpdj4nKTtcclxuICAgICAgICBlcnJvckNvbnRhaW5lci5hZGRDbGFzcygnZXJyb3InKS50ZXh0KGVyci5zdGFjayk7XHJcbiAgICAgICAgJG91dHB1dC5hcHBlbmQoZXJyb3JDb250YWluZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnI3J1bi1mZWF0dXJlJykuY2xpY2socnVuRmVhdHVyZSk7XHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLldvcmxkID0gcmVxdWlyZSgnLi4vc3VwcG9ydC93b3JsZC5qcycpO1xuXG4gICAgLy8vLy8gWW91ciBzdGVwIGRlZmluaXRpb25zIC8vLy8vXG5cbi8vIHVzZSB0aGlzLkdpdmVuKCksIHRoaXMuV2hlbigpIGFuZCB0aGlzLlRoZW4oKSB0byBkZWNsYXJlIHN0ZXAgZGVmaW5pdGlvbnNcblxuICAgIHRoaXMuR2l2ZW4oL15hIHZhcmlhYmxlIHNldCB0byAoXFxkKykkLywgZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFRvKG51bWJlcik7XG4gICAgfSk7XG5cbiAgICB0aGlzLldoZW4oL15JIGluY3JlbWVudCB0aGUgdmFyaWFibGUgYnkgKFxcZCspJC8sIGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnRCeShudW1iZXIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5UaGVuKC9edGhlIHZhcmlhYmxlIHNob3VsZCBjb250YWluIChcXGQrKSQvLCBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnZhcmlhYmxlICE9IHBhcnNlSW50KG51bWJlcikpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhcmlhYmxlIHNob3VsZCBjb250YWluICcgKyBudW1iZXIgK1xuICAgICAgICAgICAgICAgICcgYnV0IGl0IGNvbnRhaW5zICcgKyB0aGlzLnZhcmlhYmxlICsgJy4nKTtcbiAgICB9KTtcblxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvZmVhdHVyZXMvc3RlcF9kZWZpbml0aW9ucy9tYXRocy5zdGVwcy5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxyXG4vLy8vLyBZb3VyIFdvcmxkIC8vLy8vXHJcblxyXG4vLyBzZXQgdGhpcy5Xb3JsZCB0byB5b3VyIGN1c3RvbSB3b3JsZCAob3B0aW9uYWwpXHJcblxyXG52YXIgQ3VzdG9tV29ybGQgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuQ3VzdG9tV29ybGQucHJvdG90eXBlLnZhcmlhYmxlID0gMDtcclxuXHJcbkN1c3RvbVdvcmxkLnByb3RvdHlwZS5zZXRUbyA9IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgdGhpcy52YXJpYWJsZSA9IHBhcnNlSW50KG51bWJlcik7XHJcbn07XHJcblxyXG5DdXN0b21Xb3JsZC5wcm90b3R5cGUuaW5jcmVtZW50QnkgPSBmdW5jdGlvbihudW1iZXIpIHtcclxuICAgIHRoaXMudmFyaWFibGUgKz0gcGFyc2VJbnQobnVtYmVyKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tV29ybGQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9mZWF0dXJlcy9zdXBwb3J0L3dvcmxkLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIkZlYXR1cmU6IFNpbXBsZSBtYXRoc1xcclxcbiAgSW4gb3JkZXIgdG8gZG8gbWF0aHNcXHJcXG4gIEFzIGEgZGV2ZWxvcGVyXFxyXFxuICBJIHdhbnQgdG8gaW5jcmVtZW50IHZhcmlhYmxlc1xcclxcblxcclxcbiAgQGZyb250ZW5kXFxyXFxuICBTY2VuYXJpbzogZWFzeSBtYXRoc1xcclxcbiAgICBHaXZlbiBhIHZhcmlhYmxlIHNldCB0byAxXFxyXFxuICAgIFdoZW4gSSBpbmNyZW1lbnQgdGhlIHZhcmlhYmxlIGJ5IDFcXHJcXG4gICAgVGhlbiB0aGUgdmFyaWFibGUgc2hvdWxkIGNvbnRhaW4gMlxcclxcblxcclxcbiAgQGNvbXBsZXhcXHJcXG4gIFNjZW5hcmlvIE91dGxpbmU6IG11Y2ggbW9yZSBjb21wbGV4IHN0dWZmXFxyXFxuICAgIEdpdmVuIGEgdmFyaWFibGUgc2V0IHRvIDx2YXI+XFxyXFxuICAgIFdoZW4gSSBpbmNyZW1lbnQgdGhlIHZhcmlhYmxlIGJ5IDxpbmNyZW1lbnQ+XFxyXFxuICAgIFRoZW4gdGhlIHZhcmlhYmxlIHNob3VsZCBjb250YWluIDxyZXN1bHQ+XFxyXFxuXFxyXFxuICAgIEV4YW1wbGVzOlxcclxcbiAgICAgIHwgdmFyIHwgaW5jcmVtZW50IHwgcmVzdWx0IHxcXHJcXG4gICAgICB8IDEwMCB8ICAgICAgICAgNSB8ICAgIDEwNSB8XFxyXFxuICAgICAgfCAgOTkgfCAgICAgIDEyMzQgfCAgIDEzMzMgfFxcclxcbiAgICAgIHwgIDEyIHwgICAgICAgICA1IHwgICAgIDE4IHxcIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvZmVhdHVyZXMvbWF0aHMuZmVhdHVyZVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=