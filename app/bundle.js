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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function () {
	    
	    this.World = __webpack_require__(2);
	
	    ///// Your step definitions /////
	
	// use this.Given(), this.When() and this.Then() to declare step definitions
	    
	    this.Given(/^a variable set to (\d+)$/, function (number, callback) {
	        // Write code here that turns the phrase above into concrete actions
	        this.setTo(number);
	        callback();
	    });
	    
	    this.When(/^I increment the variable by (\d+)$/, function (number, callback) {
	        // Write code here that turns the phrase above into concrete actions
	        this.incrementBy(number);
	        callback();
	    });
	    
	    this.Then(/^the variable should contain (\d+)$/, function (number, callback) {
	        // Write code here that turns the phrase above into concrete actions
	        if (this.variable != parseInt(number))
	            throw new Error('Variable should contain ' + number +
	                ' but it contains ' + this.variable + '.');
	        callback();
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

	module.exports = "@frontend\r\nFeature: Simple maths: increment\r\n  In order to do maths\r\n  As a developer\r\n  I want to increment variables\r\n\r\n  @easy\r\n  Scenario: easy maths increment\r\n    Given a variable set to 1\r\n    When I increment the variable by 1\r\n    Then the variable should contain 2\r\n\r\n  @complex\r\n  Scenario Outline: much more complex stuff\r\n    Given a variable set to <var>\r\n    When I increment the variable by <increment>\r\n    Then the variable should contain <result>\r\n\r\n    Examples:\r\n      | var | increment | result |\r\n      | 100 |         5 |    105 |\r\n      |  99 |      1234 |   1333 |\r\n      |  12 |         5 |     18 |"

/***/ },
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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDg1Y2FhODU5NDdmNDc1OTA5NWQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9mZWF0dXJlcy9zdGVwX2RlZmluaXRpb25zL21hdGhzLmluY3JlbWVudC5zdGVwcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZmVhdHVyZXMvc3VwcG9ydC93b3JsZC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZmVhdHVyZXMvbWF0aHMuaW5jcmVtZW50LmZlYXR1cmUiLCJ3ZWJwYWNrOi8vLy4vfi9hbnNpX3VwL2Fuc2lfdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDakREOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7Ozs7Ozs7QUMzQkE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4Qjs7Ozs7O0FDakJBLGtyQjs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxtREFBbUQ7QUFDaEUsY0FBYSxtREFBbUQ7QUFDaEUsY0FBYSxtREFBbUQ7QUFDaEUsY0FBYSxtREFBbUQ7QUFDaEUsY0FBYSxtREFBbUQ7QUFDaEUsY0FBYSxtREFBbUQ7QUFDaEUsY0FBYSxtREFBbUQ7QUFDaEUsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhLDBEQUEwRDtBQUN2RSxjQUFhLDBEQUEwRDtBQUN2RSxjQUFhLDBEQUEwRDtBQUN2RSxjQUFhLDBEQUEwRDtBQUN2RSxjQUFhLDBEQUEwRDtBQUN2RSxjQUFhLDBEQUEwRDtBQUN2RSxjQUFhLDBEQUEwRDtBQUN2RSxjQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsT0FBTztBQUMxQixzQkFBcUIsT0FBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDO0FBQ3pDO0FBQ0Esb0JBQW1CLE9BQU87QUFDMUIsc0JBQXFCLE9BQU87QUFDNUIsd0JBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQztBQUN0QztBQUNBLG9CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLHNDQUFxQztBQUNyQyxxQ0FBb0M7QUFDcEMscUNBQW9DO0FBQ3BDLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBLFFBQU87O0FBRVA7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1EQUFrRDtBQUNsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEOztBQUVyRDs7QUFFQTtBQUNBLHFDQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVMscUNBQXFDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLG9CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsNENBQTRDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLG9CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Qsa0RBQWlEO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsRUFBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ4NWNhYTg1OTQ3ZjQ3NTkwOTVkXG4gKiovIiwidmFyIG1hdGhzU3RlcHMgPSByZXF1aXJlKCcuL2ZlYXR1cmVzL3N0ZXBfZGVmaW5pdGlvbnMvbWF0aHMuaW5jcmVtZW50LnN0ZXBzJyk7XHJcbnZhciBtYXRoc0ZlYXR1cmUgPSByZXF1aXJlKCcuL2ZlYXR1cmVzL21hdGhzLmluY3JlbWVudC5mZWF0dXJlJyk7XHJcbnZhciBhbnNpX3VwID0gcmVxdWlyZSgnYW5zaV91cCcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJ1bkZlYXR1cmUoKSB7XHJcbiAgICB2YXIgJG91dHB1dCA9ICQoJyNvdXRwdXQnKTtcclxuICAgICRvdXRwdXQuZW1wdHkoKTtcclxuXHJcbiAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgIHRhZ3M6IFsnQGZyb250ZW5kJ10sXHJcbiAgICAgICAgLy8gdGFnczogWyd+QGVhc3knLCAnQGNvbXBsZXgnXSxcclxuICAgICAgICAvLyB0YWdzOiBbJ0Bmcm9udGVuZCcsICdAY29tcGxleCddLFxyXG4gICAgICAgIGJhY2t0cmFjZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY3VjdW1iZXIgPSBDdWN1bWJlcihtYXRoc0ZlYXR1cmUsIG1hdGhzU3RlcHMsIG9wdGlvbnMpO1xyXG4gICAgZGVidWdnZXJcclxuXHJcbiAgICB2YXIgcHJldHR5Rm9ybWF0dGVyT3B0aW9ucyA9IHtcclxuICAgICAgICBsb2dUb0Z1bmN0aW9uOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gYW5zaV91cC5hbnNpX3RvX3RleHQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0gYW5zaV91cC5hbnNpX3RvX2h0bWwoZGF0YSk7XHJcbiAgICAgICAgICAgICRvdXRwdXQuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAkb3V0cHV0LnNjcm9sbFRvcCgkb3V0cHV0LnByb3AoXCJzY3JvbGxIZWlnaHRcIikpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlQ29sb3JzOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgdmFyIGxpc3RlbmVyID0gQ3VjdW1iZXIuTGlzdGVuZXIuUHJldHR5Rm9ybWF0dGVyKHByZXR0eUZvcm1hdHRlck9wdGlvbnMpO1xyXG4gICAgY3VjdW1iZXIuYXR0YWNoTGlzdGVuZXIobGlzdGVuZXIpO1xyXG5cclxuICAgICQoJ2FbaHJlZj1cIiNvdXRwdXQtdGFiXCJdJykudGFiKCdzaG93Jyk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjdWN1bWJlci5zdGFydChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVidWdnZXJcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgdmFyIGVycm9yQ29udGFpbmVyID0gJCgnPGRpdj4nKTtcclxuICAgICAgICBlcnJvckNvbnRhaW5lci5hZGRDbGFzcygnZXJyb3InKS50ZXh0KGVyci5zdGFjayk7XHJcbiAgICAgICAgJG91dHB1dC5hcHBlbmQoZXJyb3JDb250YWluZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnI3J1bi1mZWF0dXJlJykuY2xpY2socnVuRmVhdHVyZSk7XHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgXG4gICAgdGhpcy5Xb3JsZCA9IHJlcXVpcmUoJy4uL3N1cHBvcnQvd29ybGQuanMnKTtcblxuICAgIC8vLy8vIFlvdXIgc3RlcCBkZWZpbml0aW9ucyAvLy8vL1xuXG4vLyB1c2UgdGhpcy5HaXZlbigpLCB0aGlzLldoZW4oKSBhbmQgdGhpcy5UaGVuKCkgdG8gZGVjbGFyZSBzdGVwIGRlZmluaXRpb25zXG4gICAgXG4gICAgdGhpcy5HaXZlbigvXmEgdmFyaWFibGUgc2V0IHRvIChcXGQrKSQvLCBmdW5jdGlvbiAobnVtYmVyLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBXcml0ZSBjb2RlIGhlcmUgdGhhdCB0dXJucyB0aGUgcGhyYXNlIGFib3ZlIGludG8gY29uY3JldGUgYWN0aW9uc1xuICAgICAgICB0aGlzLnNldFRvKG51bWJlcik7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5XaGVuKC9eSSBpbmNyZW1lbnQgdGhlIHZhcmlhYmxlIGJ5IChcXGQrKSQvLCBmdW5jdGlvbiAobnVtYmVyLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBXcml0ZSBjb2RlIGhlcmUgdGhhdCB0dXJucyB0aGUgcGhyYXNlIGFib3ZlIGludG8gY29uY3JldGUgYWN0aW9uc1xuICAgICAgICB0aGlzLmluY3JlbWVudEJ5KG51bWJlcik7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5UaGVuKC9edGhlIHZhcmlhYmxlIHNob3VsZCBjb250YWluIChcXGQrKSQvLCBmdW5jdGlvbiAobnVtYmVyLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBXcml0ZSBjb2RlIGhlcmUgdGhhdCB0dXJucyB0aGUgcGhyYXNlIGFib3ZlIGludG8gY29uY3JldGUgYWN0aW9uc1xuICAgICAgICBpZiAodGhpcy52YXJpYWJsZSAhPSBwYXJzZUludChudW1iZXIpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYXJpYWJsZSBzaG91bGQgY29udGFpbiAnICsgbnVtYmVyICtcbiAgICAgICAgICAgICAgICAnIGJ1dCBpdCBjb250YWlucyAnICsgdGhpcy52YXJpYWJsZSArICcuJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gICAgXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9mZWF0dXJlcy9zdGVwX2RlZmluaXRpb25zL21hdGhzLmluY3JlbWVudC5zdGVwcy5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxyXG4vLy8vLyBZb3VyIFdvcmxkIC8vLy8vXHJcblxyXG4vLyBzZXQgdGhpcy5Xb3JsZCB0byB5b3VyIGN1c3RvbSB3b3JsZCAob3B0aW9uYWwpXHJcblxyXG52YXIgQ3VzdG9tV29ybGQgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuQ3VzdG9tV29ybGQucHJvdG90eXBlLnZhcmlhYmxlID0gMDtcclxuXHJcbkN1c3RvbVdvcmxkLnByb3RvdHlwZS5zZXRUbyA9IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgdGhpcy52YXJpYWJsZSA9IHBhcnNlSW50KG51bWJlcik7XHJcbn07XHJcblxyXG5DdXN0b21Xb3JsZC5wcm90b3R5cGUuaW5jcmVtZW50QnkgPSBmdW5jdGlvbihudW1iZXIpIHtcclxuICAgIHRoaXMudmFyaWFibGUgKz0gcGFyc2VJbnQobnVtYmVyKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tV29ybGQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9mZWF0dXJlcy9zdXBwb3J0L3dvcmxkLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIkBmcm9udGVuZFxcclxcbkZlYXR1cmU6IFNpbXBsZSBtYXRoczogaW5jcmVtZW50XFxyXFxuICBJbiBvcmRlciB0byBkbyBtYXRoc1xcclxcbiAgQXMgYSBkZXZlbG9wZXJcXHJcXG4gIEkgd2FudCB0byBpbmNyZW1lbnQgdmFyaWFibGVzXFxyXFxuXFxyXFxuICBAZWFzeVxcclxcbiAgU2NlbmFyaW86IGVhc3kgbWF0aHMgaW5jcmVtZW50XFxyXFxuICAgIEdpdmVuIGEgdmFyaWFibGUgc2V0IHRvIDFcXHJcXG4gICAgV2hlbiBJIGluY3JlbWVudCB0aGUgdmFyaWFibGUgYnkgMVxcclxcbiAgICBUaGVuIHRoZSB2YXJpYWJsZSBzaG91bGQgY29udGFpbiAyXFxyXFxuXFxyXFxuICBAY29tcGxleFxcclxcbiAgU2NlbmFyaW8gT3V0bGluZTogbXVjaCBtb3JlIGNvbXBsZXggc3R1ZmZcXHJcXG4gICAgR2l2ZW4gYSB2YXJpYWJsZSBzZXQgdG8gPHZhcj5cXHJcXG4gICAgV2hlbiBJIGluY3JlbWVudCB0aGUgdmFyaWFibGUgYnkgPGluY3JlbWVudD5cXHJcXG4gICAgVGhlbiB0aGUgdmFyaWFibGUgc2hvdWxkIGNvbnRhaW4gPHJlc3VsdD5cXHJcXG5cXHJcXG4gICAgRXhhbXBsZXM6XFxyXFxuICAgICAgfCB2YXIgfCBpbmNyZW1lbnQgfCByZXN1bHQgfFxcclxcbiAgICAgIHwgMTAwIHwgICAgICAgICA1IHwgICAgMTA1IHxcXHJcXG4gICAgICB8ICA5OSB8ICAgICAgMTIzNCB8ICAgMTMzMyB8XFxyXFxuICAgICAgfCAgMTIgfCAgICAgICAgIDUgfCAgICAgMTggfFwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9mZWF0dXJlcy9tYXRocy5pbmNyZW1lbnQuZmVhdHVyZVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGFuc2lfdXAuanNcbi8vIHZlcnNpb24gOiAxLjMuMFxuLy8gYXV0aG9yIDogRHJ1IE5lbHNvblxuLy8gbGljZW5zZSA6IE1JVFxuLy8gaHR0cDovL2dpdGh1Yi5jb20vZHJ1ZHJ1L2Fuc2lfdXBcblxuKGZ1bmN0aW9uIChEYXRlLCB1bmRlZmluZWQpIHtcblxuICAgIHZhciBhbnNpX3VwLFxuICAgICAgICBWRVJTSU9OID0gXCIxLjMuMFwiLFxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBub2RlSlNcbiAgICAgICAgaGFzTW9kdWxlID0gKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSxcblxuICAgICAgICAvLyBOb3JtYWwgYW5kIHRoZW4gQnJpZ2h0XG4gICAgICAgIEFOU0lfQ09MT1JTID0gW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMCwgMCwgMFwiLCAgICAgICAgJ2NsYXNzJzogXCJhbnNpLWJsYWNrXCIgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIxODcsIDAsIDBcIiwgICAgICAnY2xhc3MnOiBcImFuc2ktcmVkXCIgICAgIH0sXG4gICAgICAgICAgICB7IGNvbG9yOiBcIjAsIDE4NywgMFwiLCAgICAgICdjbGFzcyc6IFwiYW5zaS1ncmVlblwiICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMTg3LCAxODcsIDBcIiwgICAgJ2NsYXNzJzogXCJhbnNpLXllbGxvd1wiICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIwLCAwLCAxODdcIiwgICAgICAnY2xhc3MnOiBcImFuc2ktYmx1ZVwiICAgIH0sXG4gICAgICAgICAgICB7IGNvbG9yOiBcIjE4NywgMCwgMTg3XCIsICAgICdjbGFzcyc6IFwiYW5zaS1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMCwgMTg3LCAxODdcIiwgICAgJ2NsYXNzJzogXCJhbnNpLWN5YW5cIiAgICB9LFxuICAgICAgICAgICAgeyBjb2xvcjogXCIyNTUsMjU1LDI1NVwiLCAgICAnY2xhc3MnOiBcImFuc2ktd2hpdGVcIiAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHsgY29sb3I6IFwiODUsIDg1LCA4NVwiLCAgICAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC1ibGFja1wiICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMjU1LCA4NSwgODVcIiwgICAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC1yZWRcIiAgICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMCwgMjU1LCAwXCIsICAgICAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC1ncmVlblwiICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMjU1LCAyNTUsIDg1XCIsICAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC15ZWxsb3dcIiAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiODUsIDg1LCAyNTVcIiwgICAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC1ibHVlXCIgICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMjU1LCA4NSwgMjU1XCIsICAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiODUsIDI1NSwgMjU1XCIsICAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC1jeWFuXCIgICAgfSxcbiAgICAgICAgICAgIHsgY29sb3I6IFwiMjU1LCAyNTUsIDI1NVwiLCAgJ2NsYXNzJzogXCJhbnNpLWJyaWdodC13aGl0ZVwiICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgXSxcblxuICAgICAgICAvLyAyNTYgQ29sb3JzIFBhbGV0dGVcbiAgICAgICAgUEFMRVRURV9DT0xPUlM7XG5cbiAgICBmdW5jdGlvbiBBbnNpX1VwKCkge1xuICAgICAgdGhpcy5mZyA9IHRoaXMuYmcgPSB0aGlzLmZnX3RydWVjb2xvciA9IHRoaXMuYmdfdHJ1ZWNvbG9yID0gbnVsbDtcbiAgICAgIHRoaXMuYnJpZ2h0ID0gMDtcbiAgICB9XG5cbiAgICBBbnNpX1VwLnByb3RvdHlwZS5zZXR1cF9wYWxldHRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBQQUxFVFRFX0NPTE9SUyA9IFtdO1xuICAgICAgLy8gSW5kZXggMC4uMTUgOiBTeXN0ZW0gY29sb3JcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksIGo7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyArK2kpIHtcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgODsgKytqKSB7XG4gICAgICAgICAgICBQQUxFVFRFX0NPTE9SUy5wdXNoKEFOU0lfQ09MT1JTW2ldW2pdWydjb2xvciddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG5cbiAgICAgIC8vIEluZGV4IDE2Li4yMzEgOiBSR0IgNng2eDZcbiAgICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2phc29ubTIzLzI4Njg5ODEjZmlsZS14dGVybS0yNTZjb2xvci15YW1sXG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMCwgOTUsIDEzNSwgMTc1LCAyMTUsIDI1NV07XG4gICAgICAgIHZhciBmb3JtYXQgPSBmdW5jdGlvbiAociwgZywgYikgeyByZXR1cm4gbGV2ZWxzW3JdICsgJywgJyArIGxldmVsc1tnXSArICcsICcgKyBsZXZlbHNbYl0gfTtcbiAgICAgICAgdmFyIHIsIGcsIGI7XG4gICAgICAgIGZvciAociA9IDA7IHIgPCA2OyArK3IpIHtcbiAgICAgICAgICBmb3IgKGcgPSAwOyBnIDwgNjsgKytnKSB7XG4gICAgICAgICAgICBmb3IgKGIgPSAwOyBiIDwgNjsgKytiKSB7XG4gICAgICAgICAgICAgIFBBTEVUVEVfQ09MT1JTLnB1c2goZm9ybWF0LmNhbGwodGhpcywgciwgZywgYikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkoKTtcblxuICAgICAgLy8gSW5kZXggMjMyLi4yNTUgOiBHcmF5c2NhbGVcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxldmVsID0gODtcbiAgICAgICAgdmFyIGZvcm1hdCA9IGZ1bmN0aW9uKGxldmVsKSB7IHJldHVybiBsZXZlbCArICcsICcgKyBsZXZlbCArICcsICcgKyBsZXZlbCB9O1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDI0OyArK2ksIGxldmVsICs9IDEwKSB7XG4gICAgICAgICAgUEFMRVRURV9DT0xPUlMucHVzaChmb3JtYXQuY2FsbCh0aGlzLCBsZXZlbCkpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH07XG5cbiAgICBBbnNpX1VwLnByb3RvdHlwZS5lc2NhcGVfZm9yX2h0bWwgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICByZXR1cm4gdHh0LnJlcGxhY2UoL1smPD5dL2dtLCBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgaWYgKHN0ciA9PSBcIiZcIikgcmV0dXJuIFwiJmFtcDtcIjtcbiAgICAgICAgaWYgKHN0ciA9PSBcIjxcIikgcmV0dXJuIFwiJmx0O1wiO1xuICAgICAgICBpZiAoc3RyID09IFwiPlwiKSByZXR1cm4gXCImZ3Q7XCI7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgQW5zaV9VcC5wcm90b3R5cGUubGlua2lmeSA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgIHJldHVybiB0eHQucmVwbGFjZSgvKGh0dHBzPzpcXC9cXC9bXlxcc10rKS9nbSwgZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIHJldHVybiBcIjxhIGhyZWY9XFxcIlwiICsgc3RyICsgXCJcXFwiPlwiICsgc3RyICsgXCI8L2E+XCI7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgQW5zaV9VcC5wcm90b3R5cGUuYW5zaV90b19odG1sID0gZnVuY3Rpb24gKHR4dCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzcyh0eHQsIG9wdGlvbnMsIHRydWUpO1xuICAgIH07XG5cbiAgICBBbnNpX1VwLnByb3RvdHlwZS5hbnNpX3RvX3RleHQgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzcyh0eHQsIG9wdGlvbnMsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgQW5zaV9VcC5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uICh0eHQsIG9wdGlvbnMsIG1hcmt1cCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIHJhd190ZXh0X2NodW5rcyA9IHR4dC5zcGxpdCgvXFwwMzNcXFsvKTtcbiAgICAgIHZhciBmaXJzdF9jaHVuayA9IHJhd190ZXh0X2NodW5rcy5zaGlmdCgpOyAvLyB0aGUgZmlyc3QgY2h1bmsgaXMgbm90IHRoZSByZXN1bHQgb2YgdGhlIHNwbGl0XG5cbiAgICAgIHZhciBjb2xvcl9jaHVua3MgPSByYXdfdGV4dF9jaHVua3MubWFwKGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICByZXR1cm4gc2VsZi5wcm9jZXNzX2NodW5rKGNodW5rLCBvcHRpb25zLCBtYXJrdXApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbG9yX2NodW5rcy51bnNoaWZ0KGZpcnN0X2NodW5rKTtcblxuICAgICAgcmV0dXJuIGNvbG9yX2NodW5rcy5qb2luKCcnKTtcbiAgICB9O1xuXG4gICAgQW5zaV9VcC5wcm90b3R5cGUucHJvY2Vzc19jaHVuayA9IGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBtYXJrdXApIHtcblxuICAgICAgLy8gQXJlIHdlIHVzaW5nIGNsYXNzZXMgb3Igc3R5bGVzP1xuICAgICAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnID8ge30gOiBvcHRpb25zO1xuICAgICAgdmFyIHVzZV9jbGFzc2VzID0gdHlwZW9mIG9wdGlvbnMudXNlX2NsYXNzZXMgIT0gJ3VuZGVmaW5lZCcgJiYgb3B0aW9ucy51c2VfY2xhc3NlcztcbiAgICAgIHZhciBrZXkgPSB1c2VfY2xhc3NlcyA/ICdjbGFzcycgOiAnY29sb3InO1xuXG4gICAgICAvLyBFYWNoICdjaHVuaycgaXMgdGhlIHRleHQgYWZ0ZXIgdGhlIENTSSAoRVNDICsgJ1snKSBhbmQgYmVmb3JlIHRoZSBuZXh0IENTSS9FT0YuXG4gICAgICAvL1xuICAgICAgLy8gVGhpcyByZWdleCBtYXRjaGVzIGZvdXIgZ3JvdXBzIHdpdGhpbiBhIGNodW5rLlxuICAgICAgLy9cbiAgICAgIC8vIFRoZSBmaXJzdCBhbmQgdGhpcmQgZ3JvdXBzIG1hdGNoIGNvZGUgdHlwZS5cbiAgICAgIC8vIFdlIHN1cHBvcnRlZCBvbmx5IFNHUiBjb21tYW5kLiBJdCBoYXMgZW1wdHkgZmlyc3QgZ3JvdXAgYW5kICdtJyBpbiB0aGlyZC5cbiAgICAgIC8vXG4gICAgICAvLyBUaGUgc2Vjb25kIGdyb3VwIG1hdGNoZXMgYWxsIG9mIHRoZSBudW1iZXIrc2VtaWNvbG9uIGNvbW1hbmQgc2VxdWVuY2VzXG4gICAgICAvLyBiZWZvcmUgdGhlICdtJyAob3Igb3RoZXIgdHJhaWxpbmcpIGNoYXJhY3Rlci5cbiAgICAgIC8vIFRoZXNlIGFyZSB0aGUgZ3JhcGhpY3Mgb3IgU0dSIGNvbW1hbmRzLlxuICAgICAgLy9cbiAgICAgIC8vIFRoZSBsYXN0IGdyb3VwIGlzIHRoZSB0ZXh0IChpbmNsdWRpbmcgbmV3bGluZXMpIHRoYXQgaXMgY29sb3JlZCBieVxuICAgICAgLy8gdGhlIG90aGVyIGdyb3VwJ3MgY29tbWFuZHMuXG4gICAgICB2YXIgbWF0Y2hlcyA9IHRleHQubWF0Y2goL14oWyFcXHgzYy1cXHgzZl0qKShbXFxkO10qKShbXFx4MjAtXFx4MmNdKltcXHg0MC1cXHg3ZV0pKFtcXHNcXFNdKikvbSk7XG5cbiAgICAgIGlmICghbWF0Y2hlcykgcmV0dXJuIHRleHQ7XG5cbiAgICAgIHZhciBvcmlnX3R4dCA9IG1hdGNoZXNbNF07XG4gICAgICB2YXIgbnVtcyA9IG1hdGNoZXNbMl0uc3BsaXQoJzsnKTtcblxuICAgICAgLy8gV2UgY3VycmVudGx5IHN1cHBvcnQgb25seSBcIlNHUlwiIChTZWxlY3QgR3JhcGhpYyBSZW5kaXRpb24pXG4gICAgICAvLyBTaW1wbHkgaWdub3JlIGlmIG5vdCBhIFNHUiBjb21tYW5kLlxuICAgICAgaWYgKG1hdGNoZXNbMV0gIT09ICcnIHx8IG1hdGNoZXNbM10gIT09ICdtJykge1xuICAgICAgICByZXR1cm4gb3JpZ190eHQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFya3VwKSB7XG4gICAgICAgIHJldHVybiBvcmlnX3R4dDtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB3aGlsZSAobnVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBudW1fc3RyID0gbnVtcy5zaGlmdCgpO1xuICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQobnVtX3N0cik7XG5cbiAgICAgICAgaWYgKGlzTmFOKG51bSkgfHwgbnVtID09PSAwKSB7XG4gICAgICAgICAgc2VsZi5mZyA9IHNlbGYuYmcgPSBudWxsO1xuICAgICAgICAgIHNlbGYuYnJpZ2h0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09IDEpIHtcbiAgICAgICAgICBzZWxmLmJyaWdodCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID09IDM5KSB7XG4gICAgICAgICAgc2VsZi5mZyA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID09IDQ5KSB7XG4gICAgICAgICAgc2VsZi5iZyA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAoKG51bSA+PSAzMCkgJiYgKG51bSA8IDM4KSkge1xuICAgICAgICAgIHNlbGYuZmcgPSBBTlNJX0NPTE9SU1tzZWxmLmJyaWdodF1bKG51bSAlIDEwKV1ba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmICgobnVtID49IDkwKSAmJiAobnVtIDwgOTgpKSB7XG4gICAgICAgICAgc2VsZi5mZyA9IEFOU0lfQ09MT1JTWzFdWyhudW0gJSAxMCldW2tleV07XG4gICAgICAgIH0gZWxzZSBpZiAoKG51bSA+PSA0MCkgJiYgKG51bSA8IDQ4KSkge1xuICAgICAgICAgIHNlbGYuYmcgPSBBTlNJX0NPTE9SU1swXVsobnVtICUgMTApXVtrZXldO1xuICAgICAgICB9IGVsc2UgaWYgKChudW0gPj0gMTAwKSAmJiAobnVtIDwgMTA4KSkge1xuICAgICAgICAgIHNlbGYuYmcgPSBBTlNJX0NPTE9SU1sxXVsobnVtICUgMTApXVtrZXldO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gMzggfHwgbnVtID09PSA0OCkgeyAvLyBleHRlbmQgY29sb3IgKDM4PWZnLCA0OD1iZylcbiAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaXNfZm9yZWdyb3VuZCA9IChudW0gPT09IDM4KTtcbiAgICAgICAgICAgIGlmIChudW1zLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICAgIHZhciBtb2RlID0gbnVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gJzUnICYmIG51bXMubGVuZ3RoID49IDEpIHsgLy8gcGFsZXR0ZSBjb2xvclxuICAgICAgICAgICAgICAgIHZhciBwYWxldHRlX2luZGV4ID0gcGFyc2VJbnQobnVtcy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICBpZiAocGFsZXR0ZV9pbmRleCA+PSAwICYmIHBhbGV0dGVfaW5kZXggPD0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXVzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghUEFMRVRURV9DT0xPUlMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldHVwX3BhbGV0dGUuY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmcgPSBQQUxFVFRFX0NPTE9SU1twYWxldHRlX2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJnID0gUEFMRVRURV9DT0xPUlNbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrbGFzcyA9IChwYWxldHRlX2luZGV4ID49IDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICgnYW5zaS1wYWxldHRlLScgKyBwYWxldHRlX2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IEFOU0lfQ09MT1JTW3BhbGV0dGVfaW5kZXggPiA3ID8gMSA6IDBdW3BhbGV0dGVfaW5kZXggJSA4XVsnY2xhc3MnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZnID0ga2xhc3M7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5iZyA9IGtsYXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYobW9kZSA9PT0gJzInICYmIG51bXMubGVuZ3RoID49IDMpIHsgLy8gdHJ1ZSBjb2xvclxuICAgICAgICAgICAgICAgIHZhciByID0gcGFyc2VJbnQobnVtcy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgZyA9IHBhcnNlSW50KG51bXMuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSBwYXJzZUludChudW1zLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIGlmICgociA+PSAwICYmIHIgPD0gMjU1KSAmJiAoZyA+PSAwICYmIGcgPD0gMjU1KSAmJiAoYiA+PSAwICYmIGIgPD0gMjU1KSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gciArICcsICcgKyBnICsgJywgJyArIGI7XG4gICAgICAgICAgICAgICAgICBpZiAoIXVzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5mZyA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmcgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZnID0gJ2Fuc2ktdHJ1ZWNvbG9yJztcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZnX3RydWVjb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmcgPSAnYW5zaS10cnVlY29sb3InO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmdfdHJ1ZWNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgoc2VsZi5mZyA9PT0gbnVsbCkgJiYgKHNlbGYuYmcgPT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBvcmlnX3R4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBbXTtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgdmFyIHJlbmRlcl9kYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICB2YXIgZnJhZ21lbnRzID0gW107XG4gICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICBmb3IgKGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGZyYWdtZW50cy5wdXNoKCdkYXRhLScgKyBrZXkgKyAnPVwiJyArIHRoaXMuZXNjYXBlX2Zvcl9odG1sKGRhdGFba2V5XSkgKyAnXCInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZyYWdtZW50cy5sZW5ndGggPiAwID8gJyAnICsgZnJhZ21lbnRzLmpvaW4oJyAnKSA6ICcnO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzZWxmLmZnKSB7XG4gICAgICAgICAgaWYgKHVzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goc2VsZi5mZyArIFwiLWZnXCIpO1xuICAgICAgICAgICAgaWYgKHNlbGYuZmdfdHJ1ZWNvbG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGRhdGFbJ2Fuc2ktdHJ1ZWNvbG9yLWZnJ10gPSBzZWxmLmZnX3RydWVjb2xvcjtcbiAgICAgICAgICAgICAgc2VsZi5mZ190cnVlY29sb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIHNlbGYuZmcgKyBcIilcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmJnKSB7XG4gICAgICAgICAgaWYgKHVzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goc2VsZi5iZyArIFwiLWJnXCIpO1xuICAgICAgICAgICAgaWYgKHNlbGYuYmdfdHJ1ZWNvbG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGRhdGFbJ2Fuc2ktdHJ1ZWNvbG9yLWJnJ10gPSBzZWxmLmJnX3RydWVjb2xvcjtcbiAgICAgICAgICAgICAgc2VsZi5iZ190cnVlY29sb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgc2VsZi5iZyArIFwiKVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbGFzc2VzLmpvaW4oJyAnKSArICdcIicgKyByZW5kZXJfZGF0YS5jYWxsKHNlbGYsIGRhdGEpICsgJz4nICsgb3JpZ190eHQgKyAnPC9zcGFuPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBzdHlsZT1cIicgKyBzdHlsZXMuam9pbignOycpICsgJ1wiJyArIHJlbmRlcl9kYXRhLmNhbGwoc2VsZiwgZGF0YSkgKyAnPicgKyBvcmlnX3R4dCArICc8L3NwYW4+JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBNb2R1bGUgZXhwb3J0c1xuICAgIGFuc2lfdXAgPSB7XG5cbiAgICAgIGVzY2FwZV9mb3JfaHRtbDogZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICB2YXIgYTJoID0gbmV3IEFuc2lfVXAoKTtcbiAgICAgICAgcmV0dXJuIGEyaC5lc2NhcGVfZm9yX2h0bWwodHh0KTtcbiAgICAgIH0sXG5cbiAgICAgIGxpbmtpZnk6IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdmFyIGEyaCA9IG5ldyBBbnNpX1VwKCk7XG4gICAgICAgIHJldHVybiBhMmgubGlua2lmeSh0eHQpO1xuICAgICAgfSxcblxuICAgICAgYW5zaV90b19odG1sOiBmdW5jdGlvbiAodHh0LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBhMmggPSBuZXcgQW5zaV9VcCgpO1xuICAgICAgICByZXR1cm4gYTJoLmFuc2lfdG9faHRtbCh0eHQsIG9wdGlvbnMpO1xuICAgICAgfSxcblxuICAgICAgYW5zaV90b190ZXh0OiBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHZhciBhMmggPSBuZXcgQW5zaV9VcCgpO1xuICAgICAgICByZXR1cm4gYTJoLmFuc2lfdG9fdGV4dCh0eHQpO1xuICAgICAgfSxcblxuICAgICAgYW5zaV90b19odG1sX29iajogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFuc2lfVXAoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQ29tbW9uSlMgbW9kdWxlIGlzIGRlZmluZWRcbiAgICBpZiAoaGFzTW9kdWxlKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gYW5zaV91cDtcbiAgICB9XG4gICAgLypnbG9iYWwgZW5kZXI6ZmFsc2UgKi9cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGVuZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3cuYW5zaV91cCA9IGFuc2lfdXA7XG4gICAgfVxuICAgIC8qZ2xvYmFsIGRlZmluZTpmYWxzZSAqL1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoXCJhbnNpX3VwXCIsIFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5zaV91cDtcbiAgICAgICAgfSk7XG4gICAgfVxufSkoRGF0ZSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9hbnNpX3VwL2Fuc2lfdXAuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9