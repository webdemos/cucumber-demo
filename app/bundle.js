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
	        tags: ['@frontend'],
	        // tags: ['~@easy', '@complex'],
	        // tags: ['@frontend', '@complex'],
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

	module.exports = "Feature: Simple maths\r\n  In order to do maths\r\n  As a developer\r\n  I want to increment variables\r\n\r\n  @frontend @easy\r\n  Scenario: easy maths\r\n    Given a variable set to 1\r\n    When I increment the variable by 1\r\n    Then the variable should contain 2\r\n\r\n  @frontend @complex\r\n  Scenario Outline: much more complex stuff\r\n    Given a variable set to <var>\r\n    When I increment the variable by <increment>\r\n    Then the variable should contain <result>\r\n\r\n    Examples:\r\n      | var | increment | result |\r\n      | 100 |         5 |    105 |\r\n      |  99 |      1234 |   1333 |\r\n      |  12 |         5 |     18 |"

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQxMTY1MGQ5ODcxNWMxYzgwNmQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9zdGVwX2RlZmluaXRpb25zL21hdGhzLnN0ZXBzLmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9zdXBwb3J0L3dvcmxkLmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9tYXRocy5mZWF0dXJlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQy9DRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7Ozs7Ozs7O0FDckJBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7OztBQ2pCQSxvcUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZDExNjUwZDk4NzE1YzFjODA2ZFxuICoqLyIsInZhciBtYXRoc1N0ZXBzID0gcmVxdWlyZSgnLi9mZWF0dXJlcy9zdGVwX2RlZmluaXRpb25zL21hdGhzLnN0ZXBzJyk7XHJcbnZhciBtYXRoc0ZlYXR1cmUgPSByZXF1aXJlKCcuL2ZlYXR1cmVzL21hdGhzLmZlYXR1cmUnKTtcclxuXHJcblxyXG5mdW5jdGlvbiBydW5GZWF0dXJlKCkge1xyXG4gICAgdmFyICRvdXRwdXQgPSAkKCcjb3V0cHV0Jyk7XHJcbiAgICAkb3V0cHV0LmVtcHR5KCk7XHJcblxyXG4gICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgc3RyaWN0OiBmYWxzZSxcclxuICAgICAgICB0YWdzOiBbJ0Bmcm9udGVuZCddLFxyXG4gICAgICAgIC8vIHRhZ3M6IFsnfkBlYXN5JywgJ0Bjb21wbGV4J10sXHJcbiAgICAgICAgLy8gdGFnczogWydAZnJvbnRlbmQnLCAnQGNvbXBsZXgnXSxcclxuICAgICAgICBiYWNrdHJhY2U6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGN1Y3VtYmVyID0gQ3VjdW1iZXIobWF0aHNGZWF0dXJlLCBtYXRoc1N0ZXBzLCBvcHRpb25zKTtcclxuICAgIGRlYnVnZ2VyXHJcblxyXG4gICAgdmFyIHByZXR0eUZvcm1hdHRlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgbG9nVG9GdW5jdGlvbjogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgdGV4dCA9IGFuc2lfdXAuYW5zaV90b190ZXh0KGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KTtcclxuICAgICAgICAgICAgZGF0YSA9IGFuc2lfdXAuYW5zaV90b19odG1sKGRhdGEpO1xyXG4gICAgICAgICAgICAkb3V0cHV0LmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgJG91dHB1dC5zY3JvbGxUb3AoJG91dHB1dC5wcm9wKFwic2Nyb2xsSGVpZ2h0XCIpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVzZUNvbG9yczogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHZhciBsaXN0ZW5lciA9IEN1Y3VtYmVyLkxpc3RlbmVyLlByZXR0eUZvcm1hdHRlcihwcmV0dHlGb3JtYXR0ZXJPcHRpb25zKTtcclxuICAgIGN1Y3VtYmVyLmF0dGFjaExpc3RlbmVyKGxpc3RlbmVyKTtcclxuXHJcbiAgICAkKCdhW2hyZWY9XCIjb3V0cHV0LXRhYlwiXScpLnRhYignc2hvdycpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY3VjdW1iZXIuc3RhcnQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIHZhciBlcnJvckNvbnRhaW5lciA9ICQoJzxkaXY+Jyk7XHJcbiAgICAgICAgZXJyb3JDb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yJykudGV4dChlcnIuc3RhY2spO1xyXG4gICAgICAgICRvdXRwdXQuYXBwZW5kKGVycm9yQ29udGFpbmVyKTtcclxuICAgIH1cclxufVxyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoJyNydW4tZmVhdHVyZScpLmNsaWNrKHJ1bkZlYXR1cmUpO1xyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5Xb3JsZCA9IHJlcXVpcmUoJy4uL3N1cHBvcnQvd29ybGQuanMnKTtcblxuICAgIC8vLy8vIFlvdXIgc3RlcCBkZWZpbml0aW9ucyAvLy8vL1xuXG4vLyB1c2UgdGhpcy5HaXZlbigpLCB0aGlzLldoZW4oKSBhbmQgdGhpcy5UaGVuKCkgdG8gZGVjbGFyZSBzdGVwIGRlZmluaXRpb25zXG5cbiAgICB0aGlzLkdpdmVuKC9eYSB2YXJpYWJsZSBzZXQgdG8gKFxcZCspJC8sIGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRUbyhudW1iZXIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5XaGVuKC9eSSBpbmNyZW1lbnQgdGhlIHZhcmlhYmxlIGJ5IChcXGQrKSQvLCBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50QnkobnVtYmVyKTtcbiAgICB9KTtcblxuICAgIHRoaXMuVGhlbigvXnRoZSB2YXJpYWJsZSBzaG91bGQgY29udGFpbiAoXFxkKykkLywgZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy52YXJpYWJsZSAhPSBwYXJzZUludChudW1iZXIpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYXJpYWJsZSBzaG91bGQgY29udGFpbiAnICsgbnVtYmVyICtcbiAgICAgICAgICAgICAgICAnIGJ1dCBpdCBjb250YWlucyAnICsgdGhpcy52YXJpYWJsZSArICcuJyk7XG4gICAgfSk7XG5cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2ZlYXR1cmVzL3N0ZXBfZGVmaW5pdGlvbnMvbWF0aHMuc3RlcHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcclxuLy8vLy8gWW91ciBXb3JsZCAvLy8vL1xyXG5cclxuLy8gc2V0IHRoaXMuV29ybGQgdG8geW91ciBjdXN0b20gd29ybGQgKG9wdGlvbmFsKVxyXG5cclxudmFyIEN1c3RvbVdvcmxkID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbkN1c3RvbVdvcmxkLnByb3RvdHlwZS52YXJpYWJsZSA9IDA7XHJcblxyXG5DdXN0b21Xb3JsZC5wcm90b3R5cGUuc2V0VG8gPSBmdW5jdGlvbihudW1iZXIpIHtcclxuICAgIHRoaXMudmFyaWFibGUgPSBwYXJzZUludChudW1iZXIpO1xyXG59O1xyXG5cclxuQ3VzdG9tV29ybGQucHJvdG90eXBlLmluY3JlbWVudEJ5ID0gZnVuY3Rpb24obnVtYmVyKSB7XHJcbiAgICB0aGlzLnZhcmlhYmxlICs9IHBhcnNlSW50KG51bWJlcik7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEN1c3RvbVdvcmxkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvZmVhdHVyZXMvc3VwcG9ydC93b3JsZC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJGZWF0dXJlOiBTaW1wbGUgbWF0aHNcXHJcXG4gIEluIG9yZGVyIHRvIGRvIG1hdGhzXFxyXFxuICBBcyBhIGRldmVsb3BlclxcclxcbiAgSSB3YW50IHRvIGluY3JlbWVudCB2YXJpYWJsZXNcXHJcXG5cXHJcXG4gIEBmcm9udGVuZCBAZWFzeVxcclxcbiAgU2NlbmFyaW86IGVhc3kgbWF0aHNcXHJcXG4gICAgR2l2ZW4gYSB2YXJpYWJsZSBzZXQgdG8gMVxcclxcbiAgICBXaGVuIEkgaW5jcmVtZW50IHRoZSB2YXJpYWJsZSBieSAxXFxyXFxuICAgIFRoZW4gdGhlIHZhcmlhYmxlIHNob3VsZCBjb250YWluIDJcXHJcXG5cXHJcXG4gIEBmcm9udGVuZCBAY29tcGxleFxcclxcbiAgU2NlbmFyaW8gT3V0bGluZTogbXVjaCBtb3JlIGNvbXBsZXggc3R1ZmZcXHJcXG4gICAgR2l2ZW4gYSB2YXJpYWJsZSBzZXQgdG8gPHZhcj5cXHJcXG4gICAgV2hlbiBJIGluY3JlbWVudCB0aGUgdmFyaWFibGUgYnkgPGluY3JlbWVudD5cXHJcXG4gICAgVGhlbiB0aGUgdmFyaWFibGUgc2hvdWxkIGNvbnRhaW4gPHJlc3VsdD5cXHJcXG5cXHJcXG4gICAgRXhhbXBsZXM6XFxyXFxuICAgICAgfCB2YXIgfCBpbmNyZW1lbnQgfCByZXN1bHQgfFxcclxcbiAgICAgIHwgMTAwIHwgICAgICAgICA1IHwgICAgMTA1IHxcXHJcXG4gICAgICB8ICA5OSB8ICAgICAgMTIzNCB8ICAgMTMzMyB8XFxyXFxuICAgICAgfCAgMTIgfCAgICAgICAgIDUgfCAgICAgMTggfFwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9mZWF0dXJlcy9tYXRocy5mZWF0dXJlXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==