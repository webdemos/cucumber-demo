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

	var mathsSteps = __webpack_require__(5);
	var mathsFeature = __webpack_require__(6);
	var ansi_up = __webpack_require__(4);
	
	
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
	            debugger
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
	        var errorContainer = $('<div>');
	        errorContainer.addClass('error').text(err.stack);
	        $output.append(errorContainer);
	    }
	}
	
	$(function() {
	    $('#run-feature').click(runFeature);
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// ansi_up.js
	// version : 1.3.0
	// author : Dru Nelson
	// license : MIT
	// http://github.com/drudru/ansi_up
	
	(function (Date, undefined) {
	
	    var ansi_up,
	        VERSION = "1.3.0",
	
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined'),
	
	        // Normal and then Bright
	        ANSI_COLORS = [
	          [
	            { color: "0, 0, 0",        'class': "ansi-black"   },
	            { color: "187, 0, 0",      'class': "ansi-red"     },
	            { color: "0, 187, 0",      'class': "ansi-green"   },
	            { color: "187, 187, 0",    'class': "ansi-yellow"  },
	            { color: "0, 0, 187",      'class': "ansi-blue"    },
	            { color: "187, 0, 187",    'class': "ansi-magenta" },
	            { color: "0, 187, 187",    'class': "ansi-cyan"    },
	            { color: "255,255,255",    'class': "ansi-white"   }
	          ],
	          [
	            { color: "85, 85, 85",     'class': "ansi-bright-black"   },
	            { color: "255, 85, 85",    'class': "ansi-bright-red"     },
	            { color: "0, 255, 0",      'class': "ansi-bright-green"   },
	            { color: "255, 255, 85",   'class': "ansi-bright-yellow"  },
	            { color: "85, 85, 255",    'class': "ansi-bright-blue"    },
	            { color: "255, 85, 255",   'class': "ansi-bright-magenta" },
	            { color: "85, 255, 255",   'class': "ansi-bright-cyan"    },
	            { color: "255, 255, 255",  'class': "ansi-bright-white"   }
	          ]
	        ],
	
	        // 256 Colors Palette
	        PALETTE_COLORS;
	
	    function Ansi_Up() {
	      this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null;
	      this.bright = 0;
	    }
	
	    Ansi_Up.prototype.setup_palette = function() {
	      PALETTE_COLORS = [];
	      // Index 0..15 : System color
	      (function() {
	        var i, j;
	        for (i = 0; i < 2; ++i) {
	          for (j = 0; j < 8; ++j) {
	            PALETTE_COLORS.push(ANSI_COLORS[i][j]['color']);
	          }
	        }
	      })();
	
	      // Index 16..231 : RGB 6x6x6
	      // https://gist.github.com/jasonm23/2868981#file-xterm-256color-yaml
	      (function() {
	        var levels = [0, 95, 135, 175, 215, 255];
	        var format = function (r, g, b) { return levels[r] + ', ' + levels[g] + ', ' + levels[b] };
	        var r, g, b;
	        for (r = 0; r < 6; ++r) {
	          for (g = 0; g < 6; ++g) {
	            for (b = 0; b < 6; ++b) {
	              PALETTE_COLORS.push(format.call(this, r, g, b));
	            }
	          }
	        }
	      })();
	
	      // Index 232..255 : Grayscale
	      (function() {
	        var level = 8;
	        var format = function(level) { return level + ', ' + level + ', ' + level };
	        var i;
	        for (i = 0; i < 24; ++i, level += 10) {
	          PALETTE_COLORS.push(format.call(this, level));
	        }
	      })();
	    };
	
	    Ansi_Up.prototype.escape_for_html = function (txt) {
	      return txt.replace(/[&<>]/gm, function(str) {
	        if (str == "&") return "&amp;";
	        if (str == "<") return "&lt;";
	        if (str == ">") return "&gt;";
	      });
	    };
	
	    Ansi_Up.prototype.linkify = function (txt) {
	      return txt.replace(/(https?:\/\/[^\s]+)/gm, function(str) {
	        return "<a href=\"" + str + "\">" + str + "</a>";
	      });
	    };
	
	    Ansi_Up.prototype.ansi_to_html = function (txt, options) {
	      return this.process(txt, options, true);
	    };
	
	    Ansi_Up.prototype.ansi_to_text = function (txt) {
	      var options = {};
	      return this.process(txt, options, false);
	    };
	
	    Ansi_Up.prototype.process = function (txt, options, markup) {
	      var self = this;
	      var raw_text_chunks = txt.split(/\033\[/);
	      var first_chunk = raw_text_chunks.shift(); // the first chunk is not the result of the split
	
	      var color_chunks = raw_text_chunks.map(function (chunk) {
	        return self.process_chunk(chunk, options, markup);
	      });
	
	      color_chunks.unshift(first_chunk);
	
	      return color_chunks.join('');
	    };
	
	    Ansi_Up.prototype.process_chunk = function (text, options, markup) {
	
	      // Are we using classes or styles?
	      options = typeof options == 'undefined' ? {} : options;
	      var use_classes = typeof options.use_classes != 'undefined' && options.use_classes;
	      var key = use_classes ? 'class' : 'color';
	
	      // Each 'chunk' is the text after the CSI (ESC + '[') and before the next CSI/EOF.
	      //
	      // This regex matches four groups within a chunk.
	      //
	      // The first and third groups match code type.
	      // We supported only SGR command. It has empty first group and 'm' in third.
	      //
	      // The second group matches all of the number+semicolon command sequences
	      // before the 'm' (or other trailing) character.
	      // These are the graphics or SGR commands.
	      //
	      // The last group is the text (including newlines) that is colored by
	      // the other group's commands.
	      var matches = text.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);
	
	      if (!matches) return text;
	
	      var orig_txt = matches[4];
	      var nums = matches[2].split(';');
	
	      // We currently support only "SGR" (Select Graphic Rendition)
	      // Simply ignore if not a SGR command.
	      if (matches[1] !== '' || matches[3] !== 'm') {
	        return orig_txt;
	      }
	
	      if (!markup) {
	        return orig_txt;
	      }
	
	      var self = this;
	
	      while (nums.length > 0) {
	        var num_str = nums.shift();
	        var num = parseInt(num_str);
	
	        if (isNaN(num) || num === 0) {
	          self.fg = self.bg = null;
	          self.bright = 0;
	        } else if (num === 1) {
	          self.bright = 1;
	        } else if (num == 39) {
	          self.fg = null;
	        } else if (num == 49) {
	          self.bg = null;
	        } else if ((num >= 30) && (num < 38)) {
	          self.fg = ANSI_COLORS[self.bright][(num % 10)][key];
	        } else if ((num >= 90) && (num < 98)) {
	          self.fg = ANSI_COLORS[1][(num % 10)][key];
	        } else if ((num >= 40) && (num < 48)) {
	          self.bg = ANSI_COLORS[0][(num % 10)][key];
	        } else if ((num >= 100) && (num < 108)) {
	          self.bg = ANSI_COLORS[1][(num % 10)][key];
	        } else if (num === 38 || num === 48) { // extend color (38=fg, 48=bg)
	          (function() {
	            var is_foreground = (num === 38);
	            if (nums.length >= 1) {
	              var mode = nums.shift();
	              if (mode === '5' && nums.length >= 1) { // palette color
	                var palette_index = parseInt(nums.shift());
	                if (palette_index >= 0 && palette_index <= 255) {
	                  if (!use_classes) {
	                    if (!PALETTE_COLORS) {
	                      self.setup_palette.call(self);
	                    }
	                    if (is_foreground) {
	                      self.fg = PALETTE_COLORS[palette_index];
	                    } else {
	                      self.bg = PALETTE_COLORS[palette_index];
	                    }
	                  } else {
	                    var klass = (palette_index >= 16)
	                          ? ('ansi-palette-' + palette_index)
	                          : ANSI_COLORS[palette_index > 7 ? 1 : 0][palette_index % 8]['class'];
	                    if (is_foreground) {
	                      self.fg = klass;
	                    } else {
	                      self.bg = klass;
	                    }
	                  }
	                }
	              } else if(mode === '2' && nums.length >= 3) { // true color
	                var r = parseInt(nums.shift());
	                var g = parseInt(nums.shift());
	                var b = parseInt(nums.shift());
	                if ((r >= 0 && r <= 255) && (g >= 0 && g <= 255) && (b >= 0 && b <= 255)) {
	                  var color = r + ', ' + g + ', ' + b;
	                  if (!use_classes) {
	                    if (is_foreground) {
	                      self.fg = color;
	                    } else {
	                      self.bg = color;
	                    }
	                  } else {
	                    if (is_foreground) {
	                      self.fg = 'ansi-truecolor';
	                      self.fg_truecolor = color;
	                    } else {
	                      self.bg = 'ansi-truecolor';
	                      self.bg_truecolor = color;
	                    }
	                  }
	                }
	              }
	            }
	          })();
	        }
	      }
	
	      if ((self.fg === null) && (self.bg === null)) {
	        return orig_txt;
	      } else {
	        var styles = [];
	        var classes = [];
	        var data = {};
	        var render_data = function (data) {
	          var fragments = [];
	          var key;
	          for (key in data) {
	            if (data.hasOwnProperty(key)) {
	              fragments.push('data-' + key + '="' + this.escape_for_html(data[key]) + '"');
	            }
	          }
	          return fragments.length > 0 ? ' ' + fragments.join(' ') : '';
	        };
	
	        if (self.fg) {
	          if (use_classes) {
	            classes.push(self.fg + "-fg");
	            if (self.fg_truecolor !== null) {
	              data['ansi-truecolor-fg'] = self.fg_truecolor;
	              self.fg_truecolor = null;
	            }
	          } else {
	            styles.push("color:rgb(" + self.fg + ")");
	          }
	        }
	        if (self.bg) {
	          if (use_classes) {
	            classes.push(self.bg + "-bg");
	            if (self.bg_truecolor !== null) {
	              data['ansi-truecolor-bg'] = self.bg_truecolor;
	              self.bg_truecolor = null;
	            }
	          } else {
	            styles.push("background-color:rgb(" + self.bg + ")");
	          }
	        }
	        if (use_classes) {
	          return '<span class="' + classes.join(' ') + '"' + render_data.call(self, data) + '>' + orig_txt + '</span>';
	        } else {
	          return '<span style="' + styles.join(';') + '"' + render_data.call(self, data) + '>' + orig_txt + '</span>';
	        }
	      }
	    };
	
	    // Module exports
	    ansi_up = {
	
	      escape_for_html: function (txt) {
	        var a2h = new Ansi_Up();
	        return a2h.escape_for_html(txt);
	      },
	
	      linkify: function (txt) {
	        var a2h = new Ansi_Up();
	        return a2h.linkify(txt);
	      },
	
	      ansi_to_html: function (txt, options) {
	        var a2h = new Ansi_Up();
	        return a2h.ansi_to_html(txt, options);
	      },
	
	      ansi_to_text: function (txt) {
	        var a2h = new Ansi_Up();
	        return a2h.ansi_to_text(txt);
	      },
	
	      ansi_to_html_obj: function () {
	        return new Ansi_Up();
	      }
	    };
	
	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = ansi_up;
	    }
	    /*global ender:false */
	    if (typeof window !== 'undefined' && typeof ender === 'undefined') {
	        window.ansi_up = ansi_up;
	    }
	    /*global define:false */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return ansi_up;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	})(Date);


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function () {
	    
	    // this.World = require('../support/world.js');
	    
	    this.Given(/^a variable set to (\d+)$/, function (arg1, callback) {
	        // Write code here that turns the phrase above into concrete actions
	        callback();
	    });
	    
	    this.When(/^I decrement the variable by (\d+)$/, function (arg1, callback) {
	        // Write code here that turns the phrase above into concrete actions
	        callback();
	    });
	    
	    this.Then(/^the variable should contain (\d+)$/, function (arg1, callback) {
	        // Write code here that turns the phrase above into concrete actions
	        callback();
	    });
	    
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "@frontend\r\nFeature: Simple maths: decrement\r\n  In order to do maths\r\n  As a developer\r\n  I want to decrement variables\r\n\r\n  @easy\r\n  Scenario: easy maths decrement\r\n    Given a variable set to 3\r\n    When I decrement the variable by 1\r\n    Then the variable should contain 2\r\n\r\n  @complex\r\n  Scenario Outline: much more complex stuff\r\n    Given a variable set to <var>\r\n    When I decrement the variable by <decrement>\r\n    Then the variable should contain <result>\r\n\r\n    Examples:\r\n      | var  | decrement | result |\r\n      |  105 |         5 |    100 |\r\n      | 1333 |      1234 |     99 |\r\n      |   12 |         5 |     18 |"

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjA1OTI1NDg2YWVlOTYxMmViMWMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYW5zaV91cC9hbnNpX3VwLmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9zdGVwX2RlZmluaXRpb25zL21hdGhzLmRlY3JlbWVudC5zdGVwcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZmVhdHVyZXMvbWF0aHMuZGVjcmVtZW50LmZlYXR1cmUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7Ozs7O0FDakREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsbURBQW1EO0FBQ2hFLGNBQWEsbURBQW1EO0FBQ2hFLGNBQWEsbURBQW1EO0FBQ2hFLGNBQWEsbURBQW1EO0FBQ2hFLGNBQWEsbURBQW1EO0FBQ2hFLGNBQWEsbURBQW1EO0FBQ2hFLGNBQWEsbURBQW1EO0FBQ2hFLGNBQWE7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QUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLEVBQUM7Ozs7Ozs7QUN0VUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUwsRzs7Ozs7O0FDbkJBLHNyQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGYwNTkyNTQ4NmFlZTk2MTJlYjFjXG4gKiovIiwidmFyIG1hdGhzU3RlcHMgPSByZXF1aXJlKCcuL2ZlYXR1cmVzL3N0ZXBfZGVmaW5pdGlvbnMvbWF0aHMuZGVjcmVtZW50LnN0ZXBzJyk7XHJcbnZhciBtYXRoc0ZlYXR1cmUgPSByZXF1aXJlKCcuL2ZlYXR1cmVzL21hdGhzLmRlY3JlbWVudC5mZWF0dXJlJyk7XHJcbnZhciBhbnNpX3VwID0gcmVxdWlyZSgnYW5zaV91cCcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJ1bkZlYXR1cmUoKSB7XHJcbiAgICB2YXIgJG91dHB1dCA9ICQoJyNvdXRwdXQnKTtcclxuICAgICRvdXRwdXQuZW1wdHkoKTtcclxuXHJcbiAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgIHRhZ3M6IFsnQGZyb250ZW5kJ10sXHJcbiAgICAgICAgLy8gdGFnczogWyd+QGVhc3knLCAnQGNvbXBsZXgnXSxcclxuICAgICAgICAvLyB0YWdzOiBbJ0Bmcm9udGVuZCcsICdAY29tcGxleCddLFxyXG4gICAgICAgIGJhY2t0cmFjZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY3VjdW1iZXIgPSBDdWN1bWJlcihtYXRoc0ZlYXR1cmUsIG1hdGhzU3RlcHMsIG9wdGlvbnMpO1xyXG4gICAgZGVidWdnZXJcclxuXHJcbiAgICB2YXIgcHJldHR5Rm9ybWF0dGVyT3B0aW9ucyA9IHtcclxuICAgICAgICBsb2dUb0Z1bmN0aW9uOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gYW5zaV91cC5hbnNpX3RvX3RleHQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0gYW5zaV91cC5hbnNpX3RvX2h0bWwoZGF0YSk7XHJcbiAgICAgICAgICAgICRvdXRwdXQuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAkb3V0cHV0LnNjcm9sbFRvcCgkb3V0cHV0LnByb3AoXCJzY3JvbGxIZWlnaHRcIikpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlQ29sb3JzOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgdmFyIGxpc3RlbmVyID0gQ3VjdW1iZXIuTGlzdGVuZXIuUHJldHR5Rm9ybWF0dGVyKHByZXR0eUZvcm1hdHRlck9wdGlvbnMpO1xyXG4gICAgY3VjdW1iZXIuYXR0YWNoTGlzdGVuZXIobGlzdGVuZXIpO1xyXG5cclxuICAgICQoJ2FbaHJlZj1cIiNvdXRwdXQtdGFiXCJdJykudGFiKCdzaG93Jyk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjdWN1bWJlci5zdGFydChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVidWdnZXJcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgdmFyIGVycm9yQ29udGFpbmVyID0gJCgnPGRpdj4nKTtcclxuICAgICAgICBlcnJvckNvbnRhaW5lci5hZGRDbGFzcygnZXJyb3InKS50ZXh0KGVyci5zdGFjayk7XHJcbiAgICAgICAgJG91dHB1dC5hcHBlbmQoZXJyb3JDb250YWluZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnI3J1bi1mZWF0dXJlJykuY2xpY2socnVuRmVhdHVyZSk7XHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gYW5zaV91cC5qc1xuLy8gdmVyc2lvbiA6IDEuMy4wXG4vLyBhdXRob3IgOiBEcnUgTmVsc29uXG4vLyBsaWNlbnNlIDogTUlUXG4vLyBodHRwOi8vZ2l0aHViLmNvbS9kcnVkcnUvYW5zaV91cFxuXG4oZnVuY3Rpb24gKERhdGUsIHVuZGVmaW5lZCkge1xuXG4gICAgdmFyIGFuc2lfdXAsXG4gICAgICAgIFZFUlNJT04gPSBcIjEuMy4wXCIsXG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIG5vZGVKU1xuICAgICAgICBoYXNNb2R1bGUgPSAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpLFxuXG4gICAgICAgIC8vIE5vcm1hbCBhbmQgdGhlbiBCcmlnaHRcbiAgICAgICAgQU5TSV9DT0xPUlMgPSBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgeyBjb2xvcjogXCIwLCAwLCAwXCIsICAgICAgICAnY2xhc3MnOiBcImFuc2ktYmxhY2tcIiAgIH0sXG4gICAgICAgICAgICB7IGNvbG9yOiBcIjE4NywgMCwgMFwiLCAgICAgICdjbGFzcyc6IFwiYW5zaS1yZWRcIiAgICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMCwgMTg3LCAwXCIsICAgICAgJ2NsYXNzJzogXCJhbnNpLWdyZWVuXCIgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIxODcsIDE4NywgMFwiLCAgICAnY2xhc3MnOiBcImFuc2kteWVsbG93XCIgIH0sXG4gICAgICAgICAgICB7IGNvbG9yOiBcIjAsIDAsIDE4N1wiLCAgICAgICdjbGFzcyc6IFwiYW5zaS1ibHVlXCIgICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMTg3LCAwLCAxODdcIiwgICAgJ2NsYXNzJzogXCJhbnNpLW1hZ2VudGFcIiB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIwLCAxODcsIDE4N1wiLCAgICAnY2xhc3MnOiBcImFuc2ktY3lhblwiICAgIH0sXG4gICAgICAgICAgICB7IGNvbG9yOiBcIjI1NSwyNTUsMjU1XCIsICAgICdjbGFzcyc6IFwiYW5zaS13aGl0ZVwiICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgeyBjb2xvcjogXCI4NSwgODUsIDg1XCIsICAgICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LWJsYWNrXCIgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIyNTUsIDg1LCA4NVwiLCAgICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LXJlZFwiICAgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIwLCAyNTUsIDBcIiwgICAgICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LWdyZWVuXCIgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIyNTUsIDI1NSwgODVcIiwgICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LXllbGxvd1wiICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCI4NSwgODUsIDI1NVwiLCAgICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LWJsdWVcIiAgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIyNTUsIDg1LCAyNTVcIiwgICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LW1hZ2VudGFcIiB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCI4NSwgMjU1LCAyNTVcIiwgICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LWN5YW5cIiAgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIyNTUsIDI1NSwgMjU1XCIsICAnY2xhc3MnOiBcImFuc2ktYnJpZ2h0LXdoaXRlXCIgICB9XG4gICAgICAgICAgXVxuICAgICAgICBdLFxuXG4gICAgICAgIC8vIDI1NiBDb2xvcnMgUGFsZXR0ZVxuICAgICAgICBQQUxFVFRFX0NPTE9SUztcblxuICAgIGZ1bmN0aW9uIEFuc2lfVXAoKSB7XG4gICAgICB0aGlzLmZnID0gdGhpcy5iZyA9IHRoaXMuZmdfdHJ1ZWNvbG9yID0gdGhpcy5iZ190cnVlY29sb3IgPSBudWxsO1xuICAgICAgdGhpcy5icmlnaHQgPSAwO1xuICAgIH1cblxuICAgIEFuc2lfVXAucHJvdG90eXBlLnNldHVwX3BhbGV0dGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIFBBTEVUVEVfQ09MT1JTID0gW107XG4gICAgICAvLyBJbmRleCAwLi4xNSA6IFN5c3RlbSBjb2xvclxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSwgajtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDI7ICsraSkge1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCA4OyArK2opIHtcbiAgICAgICAgICAgIFBBTEVUVEVfQ09MT1JTLnB1c2goQU5TSV9DT0xPUlNbaV1bal1bJ2NvbG9yJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkoKTtcblxuICAgICAgLy8gSW5kZXggMTYuLjIzMSA6IFJHQiA2eDZ4NlxuICAgICAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamFzb25tMjMvMjg2ODk4MSNmaWxlLXh0ZXJtLTI1NmNvbG9yLXlhbWxcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxldmVscyA9IFswLCA5NSwgMTM1LCAxNzUsIDIxNSwgMjU1XTtcbiAgICAgICAgdmFyIGZvcm1hdCA9IGZ1bmN0aW9uIChyLCBnLCBiKSB7IHJldHVybiBsZXZlbHNbcl0gKyAnLCAnICsgbGV2ZWxzW2ddICsgJywgJyArIGxldmVsc1tiXSB9O1xuICAgICAgICB2YXIgciwgZywgYjtcbiAgICAgICAgZm9yIChyID0gMDsgciA8IDY7ICsrcikge1xuICAgICAgICAgIGZvciAoZyA9IDA7IGcgPCA2OyArK2cpIHtcbiAgICAgICAgICAgIGZvciAoYiA9IDA7IGIgPCA2OyArK2IpIHtcbiAgICAgICAgICAgICAgUEFMRVRURV9DT0xPUlMucHVzaChmb3JtYXQuY2FsbCh0aGlzLCByLCBnLCBiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSgpO1xuXG4gICAgICAvLyBJbmRleCAyMzIuLjI1NSA6IEdyYXlzY2FsZVxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGV2ZWwgPSA4O1xuICAgICAgICB2YXIgZm9ybWF0ID0gZnVuY3Rpb24obGV2ZWwpIHsgcmV0dXJuIGxldmVsICsgJywgJyArIGxldmVsICsgJywgJyArIGxldmVsIH07XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMjQ7ICsraSwgbGV2ZWwgKz0gMTApIHtcbiAgICAgICAgICBQQUxFVFRFX0NPTE9SUy5wdXNoKGZvcm1hdC5jYWxsKHRoaXMsIGxldmVsKSk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIEFuc2lfVXAucHJvdG90eXBlLmVzY2FwZV9mb3JfaHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgIHJldHVybiB0eHQucmVwbGFjZSgvWyY8Pl0vZ20sIGZ1bmN0aW9uKHN0cikge1xuICAgICAgICBpZiAoc3RyID09IFwiJlwiKSByZXR1cm4gXCImYW1wO1wiO1xuICAgICAgICBpZiAoc3RyID09IFwiPFwiKSByZXR1cm4gXCImbHQ7XCI7XG4gICAgICAgIGlmIChzdHIgPT0gXCI+XCIpIHJldHVybiBcIiZndDtcIjtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBBbnNpX1VwLnByb3RvdHlwZS5saW5raWZ5ID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgcmV0dXJuIHR4dC5yZXBsYWNlKC8oaHR0cHM/OlxcL1xcL1teXFxzXSspL2dtLCBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiXCIgKyBzdHIgKyBcIlxcXCI+XCIgKyBzdHIgKyBcIjwvYT5cIjtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBBbnNpX1VwLnByb3RvdHlwZS5hbnNpX3RvX2h0bWwgPSBmdW5jdGlvbiAodHh0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9jZXNzKHR4dCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgfTtcblxuICAgIEFuc2lfVXAucHJvdG90eXBlLmFuc2lfdG9fdGV4dCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICByZXR1cm4gdGhpcy5wcm9jZXNzKHR4dCwgb3B0aW9ucywgZmFsc2UpO1xuICAgIH07XG5cbiAgICBBbnNpX1VwLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKHR4dCwgb3B0aW9ucywgbWFya3VwKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgcmF3X3RleHRfY2h1bmtzID0gdHh0LnNwbGl0KC9cXDAzM1xcWy8pO1xuICAgICAgdmFyIGZpcnN0X2NodW5rID0gcmF3X3RleHRfY2h1bmtzLnNoaWZ0KCk7IC8vIHRoZSBmaXJzdCBjaHVuayBpcyBub3QgdGhlIHJlc3VsdCBvZiB0aGUgc3BsaXRcblxuICAgICAgdmFyIGNvbG9yX2NodW5rcyA9IHJhd190ZXh0X2NodW5rcy5tYXAoZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnByb2Nlc3NfY2h1bmsoY2h1bmssIG9wdGlvbnMsIG1hcmt1cCk7XG4gICAgICB9KTtcblxuICAgICAgY29sb3JfY2h1bmtzLnVuc2hpZnQoZmlyc3RfY2h1bmspO1xuXG4gICAgICByZXR1cm4gY29sb3JfY2h1bmtzLmpvaW4oJycpO1xuICAgIH07XG5cbiAgICBBbnNpX1VwLnByb3RvdHlwZS5wcm9jZXNzX2NodW5rID0gZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIG1hcmt1cCkge1xuXG4gICAgICAvLyBBcmUgd2UgdXNpbmcgY2xhc3NlcyBvciBzdHlsZXM/XG4gICAgICBvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcgPyB7fSA6IG9wdGlvbnM7XG4gICAgICB2YXIgdXNlX2NsYXNzZXMgPSB0eXBlb2Ygb3B0aW9ucy51c2VfY2xhc3NlcyAhPSAndW5kZWZpbmVkJyAmJiBvcHRpb25zLnVzZV9jbGFzc2VzO1xuICAgICAgdmFyIGtleSA9IHVzZV9jbGFzc2VzID8gJ2NsYXNzJyA6ICdjb2xvcic7XG5cbiAgICAgIC8vIEVhY2ggJ2NodW5rJyBpcyB0aGUgdGV4dCBhZnRlciB0aGUgQ1NJIChFU0MgKyAnWycpIGFuZCBiZWZvcmUgdGhlIG5leHQgQ1NJL0VPRi5cbiAgICAgIC8vXG4gICAgICAvLyBUaGlzIHJlZ2V4IG1hdGNoZXMgZm91ciBncm91cHMgd2l0aGluIGEgY2h1bmsuXG4gICAgICAvL1xuICAgICAgLy8gVGhlIGZpcnN0IGFuZCB0aGlyZCBncm91cHMgbWF0Y2ggY29kZSB0eXBlLlxuICAgICAgLy8gV2Ugc3VwcG9ydGVkIG9ubHkgU0dSIGNvbW1hbmQuIEl0IGhhcyBlbXB0eSBmaXJzdCBncm91cCBhbmQgJ20nIGluIHRoaXJkLlxuICAgICAgLy9cbiAgICAgIC8vIFRoZSBzZWNvbmQgZ3JvdXAgbWF0Y2hlcyBhbGwgb2YgdGhlIG51bWJlcitzZW1pY29sb24gY29tbWFuZCBzZXF1ZW5jZXNcbiAgICAgIC8vIGJlZm9yZSB0aGUgJ20nIChvciBvdGhlciB0cmFpbGluZykgY2hhcmFjdGVyLlxuICAgICAgLy8gVGhlc2UgYXJlIHRoZSBncmFwaGljcyBvciBTR1IgY29tbWFuZHMuXG4gICAgICAvL1xuICAgICAgLy8gVGhlIGxhc3QgZ3JvdXAgaXMgdGhlIHRleHQgKGluY2x1ZGluZyBuZXdsaW5lcykgdGhhdCBpcyBjb2xvcmVkIGJ5XG4gICAgICAvLyB0aGUgb3RoZXIgZ3JvdXAncyBjb21tYW5kcy5cbiAgICAgIHZhciBtYXRjaGVzID0gdGV4dC5tYXRjaCgvXihbIVxceDNjLVxceDNmXSopKFtcXGQ7XSopKFtcXHgyMC1cXHgyY10qW1xceDQwLVxceDdlXSkoW1xcc1xcU10qKS9tKTtcblxuICAgICAgaWYgKCFtYXRjaGVzKSByZXR1cm4gdGV4dDtcblxuICAgICAgdmFyIG9yaWdfdHh0ID0gbWF0Y2hlc1s0XTtcbiAgICAgIHZhciBudW1zID0gbWF0Y2hlc1syXS5zcGxpdCgnOycpO1xuXG4gICAgICAvLyBXZSBjdXJyZW50bHkgc3VwcG9ydCBvbmx5IFwiU0dSXCIgKFNlbGVjdCBHcmFwaGljIFJlbmRpdGlvbilcbiAgICAgIC8vIFNpbXBseSBpZ25vcmUgaWYgbm90IGEgU0dSIGNvbW1hbmQuXG4gICAgICBpZiAobWF0Y2hlc1sxXSAhPT0gJycgfHwgbWF0Y2hlc1szXSAhPT0gJ20nKSB7XG4gICAgICAgIHJldHVybiBvcmlnX3R4dDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFtYXJrdXApIHtcbiAgICAgICAgcmV0dXJuIG9yaWdfdHh0O1xuICAgICAgfVxuXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHdoaWxlIChudW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIG51bV9zdHIgPSBudW1zLnNoaWZ0KCk7XG4gICAgICAgIHZhciBudW0gPSBwYXJzZUludChudW1fc3RyKTtcblxuICAgICAgICBpZiAoaXNOYU4obnVtKSB8fCBudW0gPT09IDApIHtcbiAgICAgICAgICBzZWxmLmZnID0gc2VsZi5iZyA9IG51bGw7XG4gICAgICAgICAgc2VsZi5icmlnaHQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gMSkge1xuICAgICAgICAgIHNlbGYuYnJpZ2h0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT0gMzkpIHtcbiAgICAgICAgICBzZWxmLmZnID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT0gNDkpIHtcbiAgICAgICAgICBzZWxmLmJnID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICgobnVtID49IDMwKSAmJiAobnVtIDwgMzgpKSB7XG4gICAgICAgICAgc2VsZi5mZyA9IEFOU0lfQ09MT1JTW3NlbGYuYnJpZ2h0XVsobnVtICUgMTApXVtrZXldO1xuICAgICAgICB9IGVsc2UgaWYgKChudW0gPj0gOTApICYmIChudW0gPCA5OCkpIHtcbiAgICAgICAgICBzZWxmLmZnID0gQU5TSV9DT0xPUlNbMV1bKG51bSAlIDEwKV1ba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmICgobnVtID49IDQwKSAmJiAobnVtIDwgNDgpKSB7XG4gICAgICAgICAgc2VsZi5iZyA9IEFOU0lfQ09MT1JTWzBdWyhudW0gJSAxMCldW2tleV07XG4gICAgICAgIH0gZWxzZSBpZiAoKG51bSA+PSAxMDApICYmIChudW0gPCAxMDgpKSB7XG4gICAgICAgICAgc2VsZi5iZyA9IEFOU0lfQ09MT1JTWzFdWyhudW0gJSAxMCldW2tleV07XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID09PSAzOCB8fCBudW0gPT09IDQ4KSB7IC8vIGV4dGVuZCBjb2xvciAoMzg9ZmcsIDQ4PWJnKVxuICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpc19mb3JlZ3JvdW5kID0gKG51bSA9PT0gMzgpO1xuICAgICAgICAgICAgaWYgKG51bXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgdmFyIG1vZGUgPSBudW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICAgIGlmIChtb2RlID09PSAnNScgJiYgbnVtcy5sZW5ndGggPj0gMSkgeyAvLyBwYWxldHRlIGNvbG9yXG4gICAgICAgICAgICAgICAgdmFyIHBhbGV0dGVfaW5kZXggPSBwYXJzZUludChudW1zLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIGlmIChwYWxldHRlX2luZGV4ID49IDAgJiYgcGFsZXR0ZV9pbmRleCA8PSAyNTUpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghdXNlX2NsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFQQUxFVFRFX0NPTE9SUykge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0dXBfcGFsZXR0ZS5jYWxsKHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5mZyA9IFBBTEVUVEVfQ09MT1JTW3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmcgPSBQQUxFVFRFX0NPTE9SU1twYWxldHRlX2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtsYXNzID0gKHBhbGV0dGVfaW5kZXggPj0gMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gKCdhbnNpLXBhbGV0dGUtJyArIHBhbGV0dGVfaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogQU5TSV9DT0xPUlNbcGFsZXR0ZV9pbmRleCA+IDcgPyAxIDogMF1bcGFsZXR0ZV9pbmRleCAlIDhdWydjbGFzcyddO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmcgPSBrbGFzcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJnID0ga2xhc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZihtb2RlID09PSAnMicgJiYgbnVtcy5sZW5ndGggPj0gMykgeyAvLyB0cnVlIGNvbG9yXG4gICAgICAgICAgICAgICAgdmFyIHIgPSBwYXJzZUludChudW1zLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIHZhciBnID0gcGFyc2VJbnQobnVtcy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgYiA9IHBhcnNlSW50KG51bXMuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgaWYgKChyID49IDAgJiYgciA8PSAyNTUpICYmIChnID49IDAgJiYgZyA8PSAyNTUpICYmIChiID49IDAgJiYgYiA8PSAyNTUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSByICsgJywgJyArIGcgKyAnLCAnICsgYjtcbiAgICAgICAgICAgICAgICAgIGlmICghdXNlX2NsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZnID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5iZyA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmcgPSAnYW5zaS10cnVlY29sb3InO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmdfdHJ1ZWNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5iZyA9ICdhbnNpLXRydWVjb2xvcic7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5iZ190cnVlY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKChzZWxmLmZnID09PSBudWxsKSAmJiAoc2VsZi5iZyA9PT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdfdHh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtdO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICB2YXIgcmVuZGVyX2RhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHZhciBmcmFnbWVudHMgPSBbXTtcbiAgICAgICAgICB2YXIga2V5O1xuICAgICAgICAgIGZvciAoa2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgZnJhZ21lbnRzLnB1c2goJ2RhdGEtJyArIGtleSArICc9XCInICsgdGhpcy5lc2NhcGVfZm9yX2h0bWwoZGF0YVtrZXldKSArICdcIicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZnJhZ21lbnRzLmxlbmd0aCA+IDAgPyAnICcgKyBmcmFnbWVudHMuam9pbignICcpIDogJyc7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNlbGYuZmcpIHtcbiAgICAgICAgICBpZiAodXNlX2NsYXNzZXMpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChzZWxmLmZnICsgXCItZmdcIik7XG4gICAgICAgICAgICBpZiAoc2VsZi5mZ190cnVlY29sb3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgZGF0YVsnYW5zaS10cnVlY29sb3ItZmcnXSA9IHNlbGYuZmdfdHJ1ZWNvbG9yO1xuICAgICAgICAgICAgICBzZWxmLmZnX3RydWVjb2xvciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgc2VsZi5mZyArIFwiKVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuYmcpIHtcbiAgICAgICAgICBpZiAodXNlX2NsYXNzZXMpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChzZWxmLmJnICsgXCItYmdcIik7XG4gICAgICAgICAgICBpZiAoc2VsZi5iZ190cnVlY29sb3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgZGF0YVsnYW5zaS10cnVlY29sb3ItYmcnXSA9IHNlbGYuYmdfdHJ1ZWNvbG9yO1xuICAgICAgICAgICAgICBzZWxmLmJnX3RydWVjb2xvciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiYmFja2dyb3VuZC1jb2xvcjpyZ2IoXCIgKyBzZWxmLmJnICsgXCIpXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlX2NsYXNzZXMpIHtcbiAgICAgICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIHJlbmRlcl9kYXRhLmNhbGwoc2VsZiwgZGF0YSkgKyAnPicgKyBvcmlnX3R4dCArICc8L3NwYW4+JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzxzcGFuIHN0eWxlPVwiJyArIHN0eWxlcy5qb2luKCc7JykgKyAnXCInICsgcmVuZGVyX2RhdGEuY2FsbChzZWxmLCBkYXRhKSArICc+JyArIG9yaWdfdHh0ICsgJzwvc3Bhbj4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1vZHVsZSBleHBvcnRzXG4gICAgYW5zaV91cCA9IHtcblxuICAgICAgZXNjYXBlX2Zvcl9odG1sOiBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHZhciBhMmggPSBuZXcgQW5zaV9VcCgpO1xuICAgICAgICByZXR1cm4gYTJoLmVzY2FwZV9mb3JfaHRtbCh0eHQpO1xuICAgICAgfSxcblxuICAgICAgbGlua2lmeTogZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICB2YXIgYTJoID0gbmV3IEFuc2lfVXAoKTtcbiAgICAgICAgcmV0dXJuIGEyaC5saW5raWZ5KHR4dCk7XG4gICAgICB9LFxuXG4gICAgICBhbnNpX3RvX2h0bWw6IGZ1bmN0aW9uICh0eHQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGEyaCA9IG5ldyBBbnNpX1VwKCk7XG4gICAgICAgIHJldHVybiBhMmguYW5zaV90b19odG1sKHR4dCwgb3B0aW9ucyk7XG4gICAgICB9LFxuXG4gICAgICBhbnNpX3RvX3RleHQ6IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdmFyIGEyaCA9IG5ldyBBbnNpX1VwKCk7XG4gICAgICAgIHJldHVybiBhMmguYW5zaV90b190ZXh0KHR4dCk7XG4gICAgICB9LFxuXG4gICAgICBhbnNpX3RvX2h0bWxfb2JqOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW5zaV9VcCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBDb21tb25KUyBtb2R1bGUgaXMgZGVmaW5lZFxuICAgIGlmIChoYXNNb2R1bGUpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBhbnNpX3VwO1xuICAgIH1cbiAgICAvKmdsb2JhbCBlbmRlcjpmYWxzZSAqL1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZW5kZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdpbmRvdy5hbnNpX3VwID0gYW5zaV91cDtcbiAgICB9XG4gICAgLypnbG9iYWwgZGVmaW5lOmZhbHNlICovXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShcImFuc2lfdXBcIiwgW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBhbnNpX3VwO1xuICAgICAgICB9KTtcbiAgICB9XG59KShEYXRlKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Fuc2lfdXAvYW5zaV91cC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIFxuICAgIC8vIHRoaXMuV29ybGQgPSByZXF1aXJlKCcuLi9zdXBwb3J0L3dvcmxkLmpzJyk7XG4gICAgXG4gICAgdGhpcy5HaXZlbigvXmEgdmFyaWFibGUgc2V0IHRvIChcXGQrKSQvLCBmdW5jdGlvbiAoYXJnMSwgY2FsbGJhY2spIHtcbiAgICAgICAgLy8gV3JpdGUgY29kZSBoZXJlIHRoYXQgdHVybnMgdGhlIHBocmFzZSBhYm92ZSBpbnRvIGNvbmNyZXRlIGFjdGlvbnNcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLldoZW4oL15JIGRlY3JlbWVudCB0aGUgdmFyaWFibGUgYnkgKFxcZCspJC8sIGZ1bmN0aW9uIChhcmcxLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBXcml0ZSBjb2RlIGhlcmUgdGhhdCB0dXJucyB0aGUgcGhyYXNlIGFib3ZlIGludG8gY29uY3JldGUgYWN0aW9uc1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuVGhlbigvXnRoZSB2YXJpYWJsZSBzaG91bGQgY29udGFpbiAoXFxkKykkLywgZnVuY3Rpb24gKGFyZzEsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIFdyaXRlIGNvZGUgaGVyZSB0aGF0IHR1cm5zIHRoZSBwaHJhc2UgYWJvdmUgaW50byBjb25jcmV0ZSBhY3Rpb25zXG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gICAgXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvZmVhdHVyZXMvc3RlcF9kZWZpbml0aW9ucy9tYXRocy5kZWNyZW1lbnQuc3RlcHMuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiQGZyb250ZW5kXFxyXFxuRmVhdHVyZTogU2ltcGxlIG1hdGhzOiBkZWNyZW1lbnRcXHJcXG4gIEluIG9yZGVyIHRvIGRvIG1hdGhzXFxyXFxuICBBcyBhIGRldmVsb3BlclxcclxcbiAgSSB3YW50IHRvIGRlY3JlbWVudCB2YXJpYWJsZXNcXHJcXG5cXHJcXG4gIEBlYXN5XFxyXFxuICBTY2VuYXJpbzogZWFzeSBtYXRocyBkZWNyZW1lbnRcXHJcXG4gICAgR2l2ZW4gYSB2YXJpYWJsZSBzZXQgdG8gM1xcclxcbiAgICBXaGVuIEkgZGVjcmVtZW50IHRoZSB2YXJpYWJsZSBieSAxXFxyXFxuICAgIFRoZW4gdGhlIHZhcmlhYmxlIHNob3VsZCBjb250YWluIDJcXHJcXG5cXHJcXG4gIEBjb21wbGV4XFxyXFxuICBTY2VuYXJpbyBPdXRsaW5lOiBtdWNoIG1vcmUgY29tcGxleCBzdHVmZlxcclxcbiAgICBHaXZlbiBhIHZhcmlhYmxlIHNldCB0byA8dmFyPlxcclxcbiAgICBXaGVuIEkgZGVjcmVtZW50IHRoZSB2YXJpYWJsZSBieSA8ZGVjcmVtZW50PlxcclxcbiAgICBUaGVuIHRoZSB2YXJpYWJsZSBzaG91bGQgY29udGFpbiA8cmVzdWx0PlxcclxcblxcclxcbiAgICBFeGFtcGxlczpcXHJcXG4gICAgICB8IHZhciAgfCBkZWNyZW1lbnQgfCByZXN1bHQgfFxcclxcbiAgICAgIHwgIDEwNSB8ICAgICAgICAgNSB8ICAgIDEwMCB8XFxyXFxuICAgICAgfCAxMzMzIHwgICAgICAxMjM0IHwgICAgIDk5IHxcXHJcXG4gICAgICB8ICAgMTIgfCAgICAgICAgIDUgfCAgICAgMTggfFwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9mZWF0dXJlcy9tYXRocy5kZWNyZW1lbnQuZmVhdHVyZVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=