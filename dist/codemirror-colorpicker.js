(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('codemirror')) :
	typeof define === 'function' && define.amd ? define(['codemirror'], factory) :
	(global['codemirror-colorpicker'] = factory(global.CodeMirror));
}(this, (function (CodeMirror) { 'use strict';

CodeMirror = CodeMirror && CodeMirror.hasOwnProperty('default') ? CodeMirror['default'] : CodeMirror;

var color_names = { aliceblue: "rgb(240, 248, 255)", antiquewhite: "rgb(250, 235, 215)", aqua: "rgb(0, 255, 255)", aquamarine: "rgb(127, 255, 212)", azure: "rgb(240, 255, 255)", beige: "rgb(245, 245, 220)", bisque: "rgb(255, 228, 196)", black: "rgb(0, 0, 0)", blanchedalmond: "rgb(255, 235, 205)", blue: "rgb(0, 0, 255)", blueviolet: "rgb(138, 43, 226)", brown: "rgb(165, 42, 42)", burlywood: "rgb(222, 184, 135)", cadetblue: "rgb(95, 158, 160)", chartreuse: "rgb(127, 255, 0)", chocolate: "rgb(210, 105, 30)", coral: "rgb(255, 127, 80)", cornflowerblue: "rgb(100, 149, 237)", cornsilk: "rgb(255, 248, 220)", crimson: "rgb(237, 20, 61)", cyan: "rgb(0, 255, 255)", darkblue: "rgb(0, 0, 139)", darkcyan: "rgb(0, 139, 139)", darkgoldenrod: "rgb(184, 134, 11)", darkgray: "rgb(169, 169, 169)", darkgrey: "rgb(169, 169, 169)", darkgreen: "rgb(0, 100, 0)", darkkhaki: "rgb(189, 183, 107)", darkmagenta: "rgb(139, 0, 139)", darkolivegreen: "rgb(85, 107, 47)", darkorange: "rgb(255, 140, 0)", darkorchid: "rgb(153, 50, 204)", darkred: "rgb(139, 0, 0)", darksalmon: "rgb(233, 150, 122)", darkseagreen: "rgb(143, 188, 143)", darkslateblue: "rgb(72, 61, 139)", darkslategray: "rgb(47, 79, 79)", darkslategrey: "rgb(47, 79, 79)", darkturquoise: "rgb(0, 206, 209)", darkviolet: "rgb(148, 0, 211)", deeppink: "rgb(255, 20, 147)", deepskyblue: "rgb(0, 191, 255)", dimgray: "rgb(105, 105, 105)", dimgrey: "rgb(105, 105, 105)", dodgerblue: "rgb(30, 144, 255)", firebrick: "rgb(178, 34, 34)", floralwhite: "rgb(255, 250, 240)", forestgreen: "rgb(34, 139, 34)", fuchsia: "rgb(255, 0, 255)", gainsboro: "rgb(220, 220, 220)", ghostwhite: "rgb(248, 248, 255)", gold: "rgb(255, 215, 0)", goldenrod: "rgb(218, 165, 32)", gray: "rgb(128, 128, 128)", grey: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", greenyellow: "rgb(173, 255, 47)", honeydew: "rgb(240, 255, 240)", hotpink: "rgb(255, 105, 180)", indianred: "rgb(205, 92, 92)", indigo: "rgb(75, 0, 130)", ivory: "rgb(255, 255, 240)", khaki: "rgb(240, 230, 140)", lavender: "rgb(230, 230, 250)", lavenderblush: "rgb(255, 240, 245)", lawngreen: "rgb(124, 252, 0)", lemonchiffon: "rgb(255, 250, 205)", lightblue: "rgb(173, 216, 230)", lightcoral: "rgb(240, 128, 128)", lightcyan: "rgb(224, 255, 255)", lightgoldenrodyellow: "rgb(250, 250, 210)", lightgreen: "rgb(144, 238, 144)", lightgray: "rgb(211, 211, 211)", lightgrey: "rgb(211, 211, 211)", lightpink: "rgb(255, 182, 193)", lightsalmon: "rgb(255, 160, 122)", lightseagreen: "rgb(32, 178, 170)", lightskyblue: "rgb(135, 206, 250)", lightslategray: "rgb(119, 136, 153)", lightslategrey: "rgb(119, 136, 153)", lightsteelblue: "rgb(176, 196, 222)", lightyellow: "rgb(255, 255, 224)", lime: "rgb(0, 255, 0)", limegreen: "rgb(50, 205, 50)", linen: "rgb(250, 240, 230)", magenta: "rgb(255, 0, 255)", maroon: "rgb(128, 0, 0)", mediumaquamarine: "rgb(102, 205, 170)", mediumblue: "rgb(0, 0, 205)", mediumorchid: "rgb(186, 85, 211)", mediumpurple: "rgb(147, 112, 219)", mediumseagreen: "rgb(60, 179, 113)", mediumslateblue: "rgb(123, 104, 238)", mediumspringgreen: "rgb(0, 250, 154)", mediumturquoise: "rgb(72, 209, 204)", mediumvioletred: "rgb(199, 21, 133)", midnightblue: "rgb(25, 25, 112)", mintcream: "rgb(245, 255, 250)", mistyrose: "rgb(255, 228, 225)", moccasin: "rgb(255, 228, 181)", navajowhite: "rgb(255, 222, 173)", navy: "rgb(0, 0, 128)", oldlace: "rgb(253, 245, 230)", olive: "rgb(128, 128, 0)", olivedrab: "rgb(107, 142, 35)", orange: "rgb(255, 165, 0)", orangered: "rgb(255, 69, 0)", orchid: "rgb(218, 112, 214)", palegoldenrod: "rgb(238, 232, 170)", palegreen: "rgb(152, 251, 152)", paleturquoise: "rgb(175, 238, 238)", palevioletred: "rgb(219, 112, 147)", papayawhip: "rgb(255, 239, 213)", peachpuff: "rgb(255, 218, 185)", peru: "rgb(205, 133, 63)", pink: "rgb(255, 192, 203)", plum: "rgb(221, 160, 221)", powderblue: "rgb(176, 224, 230)", purple: "rgb(128, 0, 128)", rebeccapurple: "rgb(102, 51, 153)", red: "rgb(255, 0, 0)", rosybrown: "rgb(188, 143, 143)", royalblue: "rgb(65, 105, 225)", saddlebrown: "rgb(139, 69, 19)", salmon: "rgb(250, 128, 114)", sandybrown: "rgb(244, 164, 96)", seagreen: "rgb(46, 139, 87)", seashell: "rgb(255, 245, 238)", sienna: "rgb(160, 82, 45)", silver: "rgb(192, 192, 192)", skyblue: "rgb(135, 206, 235)", slateblue: "rgb(106, 90, 205)", slategray: "rgb(112, 128, 144)", slategrey: "rgb(112, 128, 144)", snow: "rgb(255, 250, 250)", springgreen: "rgb(0, 255, 127)", steelblue: "rgb(70, 130, 180)", tan: "rgb(210, 180, 140)", teal: "rgb(0, 128, 128)", thistle: "rgb(216, 191, 216)", tomato: "rgb(255, 99, 71)", turquoise: "rgb(64, 224, 208)", violet: "rgb(238, 130, 238)", wheat: "rgb(245, 222, 179)", white: "rgb(255, 255, 255)", whitesmoke: "rgb(245, 245, 245)", yellow: "rgb(255, 255, 0)", yellowgreen: "rgb(154, 205, 50)", transparent: "rgba(0, 0, 0, 0)" };

function isColorName(name) {
    return !!color_names[name];
}

function getColorByName(name) {
    return color_names[name];
}

var ColorNames = {
    isColorName: isColorName,
    getColorByName: getColorByName
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

















var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var colorpicker_class = 'codemirror-colorview';
var colorpicker_background_class = 'codemirror-colorview-background';
var color_regexp = /(#(?:[\da-f]{3}){1,2}|rgb\((?:\s*\d{1,3},\s*){2}\d{1,3}\s*\)|rgba\((?:\s*\d{1,3},\s*){3}\d*\.?\d+\s*\)|hsl\(\s*\d{1,3}(?:,\s*\d{1,3}%){2}\s*\)|hsla\(\s*\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\s*\)|([\w_\-]+))/gi;
// Excluded tokens do not show color views..
var excluded_token = ['comment'];

function onChange(cm, evt) {
    if (evt.origin == 'setValue') {
        // if content is changed by setValue method, it initialize markers
        cm.state.colorpicker.close_color_picker();
        cm.state.colorpicker.init_color_update();
        cm.state.colorpicker.style_color_update();
    } else {
        cm.state.colorpicker.style_color_update(cm.getCursor().line);
    }
}

function onUpdate(cm, evt) {
    if (!cm.state.colorpicker.isUpdate) {
        cm.state.colorpicker.isUpdate = true;
        cm.state.colorpicker.close_color_picker();
        cm.state.colorpicker.init_color_update();
        cm.state.colorpicker.style_color_update();
    }
}

function onRefresh(cm, evt) {
    onChange(cm, { origin: 'setValue' });
}

function onKeyup(cm, evt) {
    cm.state.colorpicker.keyup(evt);
}

function onMousedown(cm, evt) {
    if (cm.state.colorpicker.is_edit_mode()) {
        cm.state.colorpicker.check_mousedown(evt);
    }
}

function onPaste(cm, evt) {
    onChange(cm, { origin: 'setValue' });
}

function onScroll(cm) {
    cm.state.colorpicker.close_color_picker();
}

function debounce(callback, delay) {

    var t = undefined;

    return function (cm, e) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback(cm, e);
        }, delay || 300);
    };
}

function has_class(el, cls) {
    if (!el || !el.className) {
        return false;
    } else {
        var newClass = ' ' + el.className + ' ';
        return newClass.indexOf(' ' + cls + ' ') > -1;
    }
}

var ColorView = function () {
    function ColorView(cm, opt) {
        classCallCheck(this, ColorView);

        if (typeof opt == 'boolean') {
            opt = { mode: 'view' };
        } else {
            opt = Object.assign({ mode: 'view' }, opt || {});
        }

        this.opt = opt;
        this.cm = cm;
        this.markers = {};

        // set excluded token 
        this.excluded_token = this.opt.excluded_token || excluded_token;

        if (this.opt.colorpicker) {
            this.colorpicker = this.opt.colorpicker;
        } else {
            this.colorpicker = this.cm.colorpicker(this.opt);
        }

        this.init_event();
    }

    createClass(ColorView, [{
        key: 'init_event',
        value: function init_event() {

            this.cm.on('mousedown', onMousedown);
            this.cm.on('keyup', onKeyup);
            this.cm.on('change', onChange);
            this.cm.on('update', onUpdate);
            this.cm.on('refresh', onRefresh);

            // create paste callback
            this.onPasteCallback = function (cm, callback) {
                return function (evt) {
                    callback.call(this, cm, evt);
                };
            }(this.cm, onPaste);

            this.cm.getWrapperElement().addEventListener('paste', this.onPasteCallback);

            if (this.is_edit_mode()) {
                this.cm.on('scroll', debounce(onScroll, 50));
            }
        }
    }, {
        key: 'is_edit_mode',
        value: function is_edit_mode() {
            return this.opt.mode == 'edit';
        }
    }, {
        key: 'is_view_mode',
        value: function is_view_mode() {
            return this.opt.mode == 'view';
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.cm.off('mousedown', onMousedown);
            this.cm.off('keyup', onKeyup);
            this.cm.off('change', onChange);
            this.cm.getWrapperElement().removeEventListener('paste', this.onPasteCallback);

            if (this.is_edit_mode()) {
                this.cm.off('scroll');
            }
        }
    }, {
        key: 'hasClass',
        value: function hasClass(el, className) {
            if (!el.className) {
                return false;
            } else {
                var newClass = ' ' + el.className + ' ';
                return newClass.indexOf(' ' + className + ' ') > -1;
            }
        }
    }, {
        key: 'check_mousedown',
        value: function check_mousedown(evt) {
            if (this.hasClass(evt.target, colorpicker_background_class)) {
                this.open_color_picker(evt.target.parentNode);
            } else {
                this.close_color_picker();
            }
        }
    }, {
        key: 'popup_color_picker',
        value: function popup_color_picker(defalutColor) {
            var cursor = this.cm.getCursor();
            var self = this;
            var colorMarker = {
                lineNo: cursor.line,
                ch: cursor.ch,
                color: defalutColor || '#FFFFFF',
                isShortCut: true
            };

            Object.keys(this.markers).forEach(function (key) {
                var searchKey = "#" + key;
                if (searchKey.indexOf("#" + colorMarker.lineNo + ":") > -1) {
                    var marker = self.markers[key];

                    if (marker.ch <= colorMarker.ch && colorMarker.ch <= marker.ch + marker.color.length) {
                        // when cursor has marker
                        colorMarker.ch = marker.ch;
                        colorMarker.color = marker.color;
                        colorMarker.nameColor = marker.nameColor;
                    }
                }
            });

            this.open_color_picker(colorMarker);
        }
    }, {
        key: 'open_color_picker',
        value: function open_color_picker(el) {
            var lineNo = el.lineNo;
            var ch = el.ch;
            var nameColor = el.nameColor;
            var color = el.color;

            if (this.colorpicker) {
                var self = this;
                var prevColor = color;
                var pos = this.cm.charCoords({ line: lineNo, ch: ch });
                this.colorpicker.show({
                    left: pos.left,
                    top: pos.bottom,
                    isShortCut: el.isShortCut || false,
                    hideDelay: self.opt.hideDelay || 2000
                }, nameColor || color, function (newColor) {
                    self.cm.replaceRange(newColor, { line: lineNo, ch: ch }, { line: lineNo, ch: ch + prevColor.length }, '*colorpicker');
                    prevColor = newColor;
                });
            }
        }
    }, {
        key: 'close_color_picker',
        value: function close_color_picker(el) {
            if (this.colorpicker) {
                this.colorpicker.hide();
            }
        }
    }, {
        key: 'key',
        value: function key(lineNo, ch) {
            return [lineNo, ch].join(":");
        }
    }, {
        key: 'keyup',
        value: function keyup(evt) {

            if (this.colorpicker) {
                if (evt.key == 'Escape') {
                    this.colorpicker.hide();
                } else if (this.colorpicker.isShortCut() == false) {
                    this.colorpicker.hide();
                }
            }
        }
    }, {
        key: 'init_color_update',
        value: function init_color_update() {
            this.markers = {}; // initialize marker list
        }
    }, {
        key: 'style_color_update',
        value: function style_color_update(lineHandle) {
            if (lineHandle) {
                this.match(lineHandle);
            } else {
                var max = this.cm.lineCount();

                for (var lineNo = 0; lineNo < max; lineNo++) {
                    this.match(lineNo);
                }
            }
        }
    }, {
        key: 'empty_marker',
        value: function empty_marker(lineNo, lineHandle) {
            var list = lineHandle.markedSpans || [];

            for (var i = 0, len = list.length; i < len; i++) {
                var key = this.key(lineNo, list[i].from);

                if (key && has_class(list[i].marker.replacedWith, colorpicker_class)) {
                    delete this.markers[key];
                    list[i].marker.clear();
                }
            }
        }
    }, {
        key: 'match_result',
        value: function match_result(lineHandle) {
            return lineHandle.text.match(color_regexp);
        }
    }, {
        key: 'submatch',
        value: function submatch(lineNo, lineHandle) {

            this.empty_marker(lineNo, lineHandle);

            var result = this.match_result(lineHandle);
            if (result && result.length) {
                var obj = { next: 0 };
                for (var i = 0, len = result.length; i < len; i++) {

                    if (result[i].indexOf('#') > -1 || result[i].indexOf('rgb') > -1 || result[i].indexOf('hsl') > -1) {
                        this.render(obj, lineNo, lineHandle, result[i]);
                    } else {

                        var nameColor = ColorNames.getColorByName(result[i]);

                        if (nameColor) {
                            this.render(obj, lineNo, lineHandle, result[i], nameColor);
                        }
                    }
                }
            }
        }
    }, {
        key: 'match',
        value: function match(lineNo) {
            var lineHandle = this.cm.getLineHandle(lineNo);
            var self = this;
            this.cm.operation(function () {
                self.submatch(lineNo, lineHandle);
            });
        }
    }, {
        key: 'make_element',
        value: function make_element() {
            var el = document.createElement('div');

            el.className = colorpicker_class;

            if (this.is_edit_mode()) {
                el.title = "open color picker";
            } else {
                el.title = "";
            }

            el.back_element = this.make_background_element();
            el.appendChild(el.back_element);

            return el;
        }
    }, {
        key: 'make_background_element',
        value: function make_background_element() {
            var el = document.createElement('div');

            el.className = colorpicker_background_class;

            return el;
        }
    }, {
        key: 'set_state',
        value: function set_state(lineNo, start, color, nameColor) {
            var marker = this.create_marker(lineNo, start);

            marker.lineNo = lineNo;
            marker.ch = start;
            marker.color = color;
            marker.nameColor = nameColor;

            return marker;
        }
    }, {
        key: 'create_marker',
        value: function create_marker(lineNo, start) {

            var key = this.key(lineNo, start);

            if (!this.markers[key]) {
                this.markers[key] = this.make_element();
            }

            return this.markers[key];
        }
    }, {
        key: 'has_marker',
        value: function has_marker(lineNo, start) {
            var key = this.key(lineNo, start);
            return !!this.markers[key];
        }
    }, {
        key: 'update_element',
        value: function update_element(el, color) {
            el.back_element.style.backgroundColor = color;
        }
    }, {
        key: 'set_mark',
        value: function set_mark(line, ch, el) {
            this.cm.setBookmark({ line: line, ch: ch }, { widget: el, handleMouseEvents: true });
        }
    }, {
        key: 'is_excluded_token',
        value: function is_excluded_token(line, ch) {
            var type = this.cm.getTokenTypeAt({ line: line, ch: ch });
            var count = 0;
            for (var i = 0, len = this.excluded_token.length; i < len; i++) {
                if (type === this.excluded_token[i]) {
                    count++;
                    break;
                }
            }

            return count > 0; // true is that it has a excluded token 
        }
    }, {
        key: 'render',
        value: function render(cursor, lineNo, lineHandle, color, nameColor) {
            var start = lineHandle.text.indexOf(color, cursor.next);

            if (this.is_excluded_token(lineNo, start) === true) {
                // excluded token do not show.
                return;
            }

            cursor.next = start + color.length;

            if (this.has_marker(lineNo, start)) {
                this.update_element(this.create_marker(lineNo, start), nameColor || color);
                this.set_state(lineNo, start, color, nameColor);
                return;
            }

            var el = this.create_marker(lineNo, start);

            this.update_element(el, nameColor || color);

            this.set_state(lineNo, start, color, nameColor || color);
            this.set_mark(lineNo, start, el);
        }
    }]);
    return ColorView;
}();

var color$1 = {

    trim: function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    },

    /**
     * @method format
     *
     * convert color to format string
     *
     *     // hex
     *     color.format({ r : 255, g : 255, b : 255 }, 'hex')  // #FFFFFF
     *
     *     // rgb
     *     color.format({ r : 255, g : 255, b : 255 }, 'rgb') // rgba(255, 255, 255, 0.5);
     *
     *     // rgba
     *     color.format({ r : 255, g : 255, b : 255, a : 0.5 }, 'rgb') // rgba(255, 255, 255, 0.5);
     *
     * @param {Object} obj  obj has r, g, b and a attributes
     * @param {"hex"/"rgb"} type  format string type
     * @returns {*}
     */
    format: function format(obj, type) {
        if (type == 'hex') {
            var r = obj.r.toString(16);
            if (obj.r < 16) r = "0" + r;

            var g = obj.g.toString(16);
            if (obj.g < 16) g = "0" + g;

            var b = obj.b.toString(16);
            if (obj.b < 16) b = "0" + b;

            return "#" + [r, g, b].join("");
        } else if (type == 'rgb') {
            if (typeof obj.a == 'undefined') {
                return "rgb(" + [obj.r, obj.g, obj.b].join(",") + ")";
            } else {
                return "rgba(" + [obj.r, obj.g, obj.b, obj.a].join(",") + ")";
            }
        } else if (type == 'hsl') {
            if (typeof obj.a == 'undefined') {
                return "hsl(" + [obj.h, obj.s + '%', obj.l + '%'].join(",") + ")";
            } else {
                return "hsla(" + [obj.h, obj.s + '%', obj.l + '%', obj.a].join(",") + ")";
            }
        }

        return obj;
    },

    /**
     * @method rgb
     *
     * parse string to rgb color
     *
     * 		color.rgb("#FF0000") === { r : 255, g : 0, b : 0 }
     *
     * 		color.rgb("rgb(255, 0, 0)") == { r : 255, g : 0, b : }
     *
     * @param {String} str color string
     * @returns {Object}  rgb object
     */
    parse: function parse(str) {
        if (typeof str == 'string') {

            if (ColorNames.isColorName(str)) {
                str = ColorNames.getColorByName(str);
            }

            if (str.indexOf("rgb(") > -1) {
                var arr = str.replace("rgb(", "").replace(")", "").split(",");

                for (var i = 0, len = arr.length; i < len; i++) {
                    arr[i] = parseInt(color$1.trim(arr[i]), 10);
                }

                return { type: 'rgb', r: arr[0], g: arr[1], b: arr[2], a: 1 };
            } else if (str.indexOf("rgba(") > -1) {
                var arr = str.replace("rgba(", "").replace(")", "").split(",");

                for (var i = 0, len = arr.length; i < len; i++) {

                    if (len - 1 == i) {
                        arr[i] = parseFloat(color$1.trim(arr[i]));
                    } else {
                        arr[i] = parseInt(color$1.trim(arr[i]), 10);
                    }
                }

                return { type: 'rgb', r: arr[0], g: arr[1], b: arr[2], a: arr[3] };
            } else if (str.indexOf("hsl(") > -1) {
                var arr = str.replace("hsl(", "").replace(")", "").split(",");

                for (var i = 0, len = arr.length; i < len; i++) {
                    arr[i] = parseInt(color$1.trim(arr[i]), 10);
                }

                var obj = { type: 'hsl', h: arr[0], s: arr[1], l: arr[2], a: 1 };

                var temp = color$1.HSLtoRGB(obj.h, obj.s, obj.l);

                obj.r = temp.r;
                obj.g = temp.g;
                obj.b = temp.b;

                return obj;
            } else if (str.indexOf("hsla(") > -1) {
                var arr = str.replace("hsla(", "").replace(")", "").split(",");

                for (var i = 0, len = arr.length; i < len; i++) {

                    if (len - 1 == i) {
                        arr[i] = parseFloat(color$1.trim(arr[i]));
                    } else {
                        arr[i] = parseInt(color$1.trim(arr[i]), 10);
                    }
                }

                var obj = { type: 'hsl', h: arr[0], s: arr[1], l: arr[2], a: arr[3] };

                var temp = color$1.HSLtoRGB(obj.h, obj.s, obj.l);

                obj.r = temp.r;
                obj.g = temp.g;
                obj.b = temp.b;

                return obj;
            } else if (str.indexOf("#") == 0) {

                str = str.replace("#", "");

                var arr = [];
                if (str.length == 3) {
                    for (var i = 0, len = str.length; i < len; i++) {
                        var char = str.substr(i, 1);
                        arr.push(parseInt(char + char, 16));
                    }
                } else {
                    for (var i = 0, len = str.length; i < len; i += 2) {
                        arr.push(parseInt(str.substr(i, 2), 16));
                    }
                }

                return { type: 'hex', r: arr[0], g: arr[1], b: arr[2], a: 1 };
            }
        }

        return str;
    },

    /**
     * @method HSVtoRGB
     *
     * convert hsv to rgb
     *
     * 		color.HSVtoRGB(0,0,1) === #FFFFF === { r : 255, g : 0, b : 0 }
     *
     * @param {Number} H  hue color number  (min : 0, max : 360)
     * @param {Number} S  Saturation number  (min : 0, max : 1)
     * @param {Number} V  Value number 		(min : 0, max : 1 )
     * @returns {Object}
     */
    HSVtoRGB: function HSVtoRGB(H, S, V) {

        if (H == 360) {
            H = 0;
        }

        var C = S * V;
        var X = C * (1 - Math.abs(H / 60 % 2 - 1));
        var m = V - C;

        var temp = [];

        if (0 <= H && H < 60) {
            temp = [C, X, 0];
        } else if (60 <= H && H < 120) {
            temp = [X, C, 0];
        } else if (120 <= H && H < 180) {
            temp = [0, C, X];
        } else if (180 <= H && H < 240) {
            temp = [0, X, C];
        } else if (240 <= H && H < 300) {
            temp = [X, 0, C];
        } else if (300 <= H && H < 360) {
            temp = [C, 0, X];
        }

        return {
            r: Math.ceil((temp[0] + m) * 255),
            g: Math.ceil((temp[1] + m) * 255),
            b: Math.ceil((temp[2] + m) * 255)
        };
    },

    /**
     * @method RGBtoHSV
     *
     * convert rgb to hsv
     *
     * 		color.RGBtoHSV(0, 0, 255) === { h : 240, s : 1, v : 1 } === '#FFFF00'
     *
     * @param {Number} R  red color value
     * @param {Number} G  green color value
     * @param {Number} B  blue color value
     * @return {Object}  hsv color code
     */
    RGBtoHSV: function RGBtoHSV(R, G, B) {

        var R1 = R / 255;
        var G1 = G / 255;
        var B1 = B / 255;

        var MaxC = Math.max(R1, G1, B1);
        var MinC = Math.min(R1, G1, B1);

        var DeltaC = MaxC - MinC;

        var H = 0;

        if (DeltaC == 0) {
            H = 0;
        } else if (MaxC == R1) {
            H = 60 * ((G1 - B1) / DeltaC % 6);
        } else if (MaxC == G1) {
            H = 60 * ((B1 - R1) / DeltaC + 2);
        } else if (MaxC == B1) {
            H = 60 * ((R1 - G1) / DeltaC + 4);
        }

        if (H < 0) {
            H = 360 + H;
        }

        var S = 0;

        if (MaxC == 0) S = 0;else S = DeltaC / MaxC;

        var V = MaxC;

        return { h: H, s: S, v: V };
    },

    RGBtoHSL: function RGBtoHSL(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h,
            s,
            l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);break;
                case g:
                    h = (b - r) / d + 2;break;
                case b:
                    h = (r - g) / d + 4;break;
            }
            h /= 6;
        }

        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    },

    HUEtoRGB: function HUEtoRGB(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    },

    HSLtoRGB: function HSLtoRGB(h, s, l) {
        var r, g, b;

        h /= 360;
        s /= 100;
        l /= 100;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = this.HUEtoRGB(p, q, h + 1 / 3);
            g = this.HUEtoRGB(p, q, h);
            b = this.HUEtoRGB(p, q, h - 1 / 3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    },
    scale: function scale(startColor, endColor, t) {
        var obj = {
            r: parseInt(startColor.r + (endColor.r - startColor.r) * t, 10),
            g: parseInt(startColor.g + (endColor.g - startColor.g) * t, 10),
            b: parseInt(startColor.b + (endColor.b - startColor.b) * t, 10)
        };

        return color$1.format(obj, 'hex');
    },
    checkHueColor: function checkHueColor(p) {
        var startColor, endColor;

        for (var i = 0; i < hue_color.length; i++) {
            if (hue_color[i].start >= p) {
                startColor = hue_color[i - 1];
                endColor = hue_color[i];
                break;
            }
        }

        if (startColor && endColor) {
            return this.scale(startColor, endColor, (p - startColor.start) / (endColor.start - startColor.start));
        }

        return hue_color[0].rgb;
    }
};

var hue_color = [{ rgb: '#ff0000', start: .0 }, { rgb: '#ffff00', start: .17 }, { rgb: '#00ff00', start: .33 }, { rgb: '#00ffff', start: .50 }, { rgb: '#0000ff', start: .67 }, { rgb: '#ff00ff', start: .83 }, { rgb: '#ff0000', start: 1 }];

function initHueColors() {
    for (var i = 0, len = hue_color.length; i < len; i++) {
        var hue = hue_color[i];

        var obj = color$1.parse(hue.rgb);

        hue.r = obj.r;
        hue.g = obj.g;
        hue.b = obj.b;
    }
}

initHueColors();

var ColorUtil = {
    color: color$1,
    hue_color: hue_color
};

var color$2 = ColorUtil.color;

var counter = 0;
var cached = [];

var Dom = function () {
    function Dom(tag, className, attr) {
        classCallCheck(this, Dom);


        if (typeof tag != 'string') {
            this.el = tag;
        } else {

            var el = document.createElement(tag);
            this.uniqId = counter++;

            if (className) {
                el.className = className;
            }

            attr = attr || {};

            for (var k in attr) {
                el.setAttribute(k, attr[k]);
            }

            this.el = el;
        }
    }

    createClass(Dom, [{
        key: 'attr',
        value: function attr(key, value) {
            if (arguments.length == 1) {
                return this.el.getAttribute(key);
            }

            this.el.setAttribute(key, value);

            return this;
        }
    }, {
        key: 'closest',
        value: function closest(cls) {

            var temp = this;
            var checkCls = false;

            while (!(checkCls = temp.hasClass(cls))) {
                if (temp.el.parentNode) {
                    temp = new Dom(temp.el.parentNode);
                } else {
                    return null;
                }
            }

            if (checkCls) {
                return temp;
            }

            return null;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(cls) {
            this.el.className = color$2.trim((' ' + this.el.className + ' ').replace(' ' + cls + ' ', ' '));
        }
    }, {
        key: 'hasClass',
        value: function hasClass(cls) {
            if (!this.el.className) {
                return false;
            } else {
                var newClass = ' ' + this.el.className + ' ';
                return newClass.indexOf(' ' + cls + ' ') > -1;
            }
        }
    }, {
        key: 'addClass',
        value: function addClass(cls) {
            if (!this.hasClass(cls)) {
                this.el.className = this.el.className + ' ' + cls;
            }
        }
    }, {
        key: 'toggleClass',
        value: function toggleClass(cls) {
            if (this.hasClass(cls)) {
                this.removeClass(cls);
            } else {
                this.addClass(cls);
            }
        }
    }, {
        key: 'html',
        value: function html(_html) {

            if (typeof _html == 'string') {
                this.el.innerHTML = _html;
            } else {
                this.empty().append(_html);
            }

            return this;
        }
    }, {
        key: 'empty',
        value: function empty() {
            return this.html('');
        }
    }, {
        key: 'append',
        value: function append(el) {

            if (typeof el == 'string') {
                this.el.appendChild(document.createTextNode(el));
            } else {
                this.el.appendChild(el.el || el);
            }

            return this;
        }
    }, {
        key: 'appendTo',
        value: function appendTo(target) {
            var t = target.el ? target.el : target;

            t.appendChild(this.el);

            return this;
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }

            return this;
        }
    }, {
        key: 'text',
        value: function text() {
            return this.el.textContent;
        }
    }, {
        key: 'css',
        value: function css(key, value) {
            if (arguments.length == 2) {
                this.el.style[key] = value;
            } else if (arguments.length == 1) {

                if (typeof key == 'string') {
                    return getComputedStyle(this.el)[key];
                } else {
                    var keys = key || {};
                    for (var k in keys) {
                        this.el.style[k] = keys[k];
                    }
                }
            }

            return this;
        }
    }, {
        key: 'offset',
        value: function offset() {
            var rect = this.el.getBoundingClientRect();
            return {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            };
        }
    }, {
        key: 'position',
        value: function position() {
            return {
                top: parseFloat(this.el.style.top),
                left: parseFloat(this.el.style.left)
            };
        }
    }, {
        key: 'width',
        value: function width() {
            return this.el.offsetWidth;
        }
    }, {
        key: 'height',
        value: function height() {
            return this.el.offsetHeight;
        }
    }, {
        key: 'dataKey',
        value: function dataKey(key) {
            return this.uniqId + '.' + key;
        }
    }, {
        key: 'data',
        value: function data(key, value) {
            if (arguments.length == 2) {
                cached[this.dataKey(key)] = value;
            } else if (arguments.length == 1) {
                return cached[this.dataKey(key)];
            } else {
                var keys = Object.keys(cached);

                var uniqId = this.uniqId + ".";
                return keys.filter(function (key) {
                    if (key.indexOf(uniqId) == 0) {
                        return true;
                    }

                    return false;
                }).map(function (value) {
                    return cached[value];
                });
            }

            return this;
        }
    }, {
        key: 'val',
        value: function val(value) {
            if (arguments.length == 0) {
                return this.el.value;
            } else if (arguments.length == 1) {
                this.el.value = value;
            }

            return this;
        }
    }, {
        key: 'int',
        value: function int() {
            return parseInt(this.val(), 10);
        }
    }, {
        key: 'show',
        value: function show() {
            return this.css('display', 'block');
        }
    }, {
        key: 'hide',
        value: function hide() {
            return this.css('display', 'none');
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.css('display') == 'none') {
                return this.show();
            } else {
                return this.hide();
            }
        }
    }, {
        key: 'on',
        value: function on(eventName, callback, opt1, opt2) {
            this.el.addEventListener(eventName, callback, opt1, opt2);

            return this;
        }
    }, {
        key: 'off',
        value: function off(eventName, callback) {
            this.el.removeEventListener(eventName, callback);

            return this;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.el;
        }
    }, {
        key: 'createChild',
        value: function createChild(tag) {
            var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var css = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var $element = new Dom(tag, className, attrs);
            $element.css(css);

            this.append($element);

            return $element;
        }
    }]);
    return Dom;
}();

var Event = {
    checkNumberKey: function checkNumberKey(e) {
        var code = e.which,
            isExcept = false;

        if (code == 37 || code == 39 || code == 8 || code == 46 || code == 9) isExcept = true;

        if (!isExcept && (code < 48 || code > 57)) return false;

        return true;
    },
    addEvent: function addEvent(dom, eventName, callback) {
        dom.addEventListener(eventName, callback);
    },
    removeEvent: function removeEvent(dom, eventName, callback) {
        dom.removeEventListener(eventName, callback);
    },
    pos: function pos(e) {
        if (e.touches && e.touches[0]) {
            return e.touches[0];
        }

        return e;
    }
};

var CHECK_EVENT_PATTERN = /^(click|mouse(down|up|move|enter|leave)|key(down|up|press)|contextmenu)/ig;
var EVENT_SAPARATOR = ' ';

var EventMachin = function () {
  function EventMachin() {
    classCallCheck(this, EventMachin);
  }

  createClass(EventMachin, [{
    key: 'destroy',
    value: function destroy() {
      this.destroyEventMachin();
    }
  }, {
    key: 'destroyEventMachin',
    value: function destroyEventMachin() {
      this.removeEventAll();
    }
  }, {
    key: 'initializeEventMachin',
    value: function initializeEventMachin() {
      this.filterProps(CHECK_EVENT_PATTERN).forEach(this.parseEvent.bind(this));
    }
  }, {
    key: 'filterProps',
    value: function filterProps(pattern) {
      return Object.getOwnPropertyNames(this.__proto__).filter(function (key) {
        return key.match(pattern);
      });
    }
  }, {
    key: 'parseEvent',
    value: function parseEvent(key) {
      var arr = key.split(EVENT_SAPARATOR);

      this.bindingEvent(arr, this[key].bind(this));
    }
  }, {
    key: 'getDefaultDomElement',
    value: function getDefaultDomElement(dom) {
      var el = void 0;

      if (dom) {
        el = this[dom] || window[dom];
      } else {
        el = this.el || this.$el || this.$root;
      }

      if (el instanceof Dom) {
        return el.getElement();
      }

      return el;
    }
  }, {
    key: 'bindingEvent',
    value: function bindingEvent(_ref, callback) {
      var _ref2 = toArray(_ref),
          eventName = _ref2[0],
          dom = _ref2[1],
          delegate = _ref2.slice(2);

      dom = this.getDefaultDomElement(dom);

      this.addEvent(eventName, dom, delegate.join(EVENT_SAPARATOR), callback);
    }
  }, {
    key: 'matchPath',
    value: function matchPath(el, selector) {
      if (el) {
        if (el.matches(selector)) {
          return el;
        }
        return this.matchPath(el.parentElement, selector);
      }
      return null;
    }
  }, {
    key: 'getBindings',
    value: function getBindings() {

      if (!this._bindings) {
        this.initBindings();
      }

      return this._bindings;
    }
  }, {
    key: 'addBinding',
    value: function addBinding(obj) {
      this.getBindings().push(obj);
    }
  }, {
    key: 'initBindings',
    value: function initBindings() {
      this._bindings = [];
    }
  }, {
    key: 'makeCallback',
    value: function makeCallback(eventName, dom, delegate, callback) {
      var _this = this;

      if (delegate) {
        return function (e) {
          var delegateTarget = _this.matchPath(e.target || e.srcElement, delegate);

          if (delegateTarget) {
            // delegate target 이 있는 경우만 callback 실행 
            e.delegateTarget = delegateTarget;
            callback(e);
          }
        };
      } else {
        return function (e) {
          callback(e);
        };
      }
    }
  }, {
    key: 'addEvent',
    value: function addEvent(eventName, dom, delegate, callback) {
      var eventObject = {
        eventName: eventName,
        dom: dom,
        delegate: delegate,
        callback: this.makeCallback(eventName, dom, delegate, callback)
      };
      this.addBinding(eventObject);
      Event.addEvent(eventObject.dom, eventObject.eventName, eventObject.callback);
    }
  }, {
    key: 'removeEventAll',
    value: function removeEventAll() {
      var _this2 = this;

      this.getBindings().forEach(function (obj) {
        _this2.removeEvent(obj);
      });
      this.initBindings();
    }
  }, {
    key: 'removeEvent',
    value: function removeEvent(_ref3) {
      var eventName = _ref3.eventName,
          dom = _ref3.dom,
          callback = _ref3.callback;

      Event.removeEvent(dom, eventName, callback);
    }
  }]);
  return EventMachin;
}();

var color$3 = ColorUtil.color;

var ColorControl = function (_EventMachin) {
    inherits(ColorControl, _EventMachin);

    function ColorControl(colorpicker) {
        classCallCheck(this, ColorControl);

        var _this = possibleConstructorReturn(this, (ColorControl.__proto__ || Object.getPrototypeOf(ColorControl)).call(this));

        _this.colorpicker = colorpicker;
        _this.initialize();
        return _this;
    }

    createClass(ColorControl, [{
        key: 'initialize',
        value: function initialize() {
            this.$el = new Dom('div', 'control');
            this.$hue = this.$el.createChild('div', 'hue');
            this.$opacity = this.$el.createChild('div', 'opacity');
            this.$controlPattern = this.$el.createChild('div', 'empty');
            this.$controlColor = this.$el.createChild('div', 'color');

            this.$hueContainer = this.$hue.createChild('div', 'hue-container');
            this.$drag_bar = this.$hueContainer.createChild('div', 'drag-bar');

            this.$opacityContainer = this.$opacity.createChild('div', 'opacity-container');
            this.$opacityColorBar = this.$opacityContainer.createChild('div', 'color-bar');

            this.$opacity_drag_bar = this.$opacityContainer.createChild('div', 'drag-bar2');
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor(color) {
            this.$controlColor.css("background-color", color);
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setColorUI();
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI() {
            var x = this.$el.width() * this.colorpicker.currentS,
                y = this.$el.height() * (1 - this.colorpicker.currentV);

            this.$drag_pointer.css({
                left: x - 5 + "px",
                top: y - 5 + "px"
            });

            this.$drag_pointer.data('pos', { x: x, y: y });
        }
    }, {
        key: 'setMainColor',
        value: function setMainColor(e) {
            e.preventDefault();
            var pos = this.colorpicker.$root.position(); // position for screen
            var w = $color.width();
            var h = $color.height();

            var x = e.clientX - pos.left;
            var y = e.clientY - pos.top;

            if (x < 0) x = 0;else if (x > w) x = w;

            if (y < 0) y = 0;else if (y > h) y = h;

            this.$drag_pointer.css({
                left: x - 5 + 'px',
                top: y - 5 + 'px'
            });

            this.$drag_pointer.data('pos', { x: x, y: y });

            this.colorpicker.caculateHSV();
            this.colorpicker.setInputColor();
        }
    }, {
        key: 'setOpacityColorBar',
        value: function setOpacityColorBar(hueColor) {
            var rgb = color$3.parse(hueColor);

            rgb.a = 0;
            var start = color$3.format(rgb, 'rgb');

            rgb.a = 1;
            var end = color$3.format(rgb, 'rgb');

            this.$opacityColorBar.css('background', 'linear-gradient(to right, ' + start + ', ' + end + ')');
        }
    }, {
        key: 'setOpacity',
        value: function setOpacity(e) {
            var min = this.$opacityContainer.offset().left;
            var max = min + this.$opacityContainer.width();
            var current = Event.pos(e).clientX;
            var dist;

            if (current < min) {
                dist = 0;
            } else if (current > max) {
                dist = 100;
            } else {
                dist = (current - min) / (max - min) * 100;
            }

            var x = this.$opacityContainer.width() * (dist / 100);

            this.$opacity_drag_bar.css({
                left: x - Math.ceil(this.$opacity_drag_bar.width() / 2) + 'px'
            });

            this.$opacity_drag_bar.data('pos', { x: x });

            this.colorpicker.setCurrentA(this.caculateOpacity());
            this.colorpicker.currentFormat();
            this.colorpicker.setInputColor();
        }
    }, {
        key: 'setInputColor',
        value: function setInputColor() {
            this.setBackgroundColor(this.colorpicker.getFormattedColor('rgb'));

            var rgb = this.colorpicker.convertRGB();
            var colorString = color$3.format(rgb, 'rgb');
            this.setOpacityColorBar(colorString);
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI() {

            var hueX = this.$hueContainer.width() * (this.colorpicker.currentH / 360);

            this.$drag_bar.css({
                left: hueX - 7.5 + 'px'
            });

            this.$drag_bar.data('pos', { x: hueX });

            var opacityX = this.$opacityContainer.width() * (this.colorpicker.currentA || 0);

            this.$opacity_drag_bar.css({
                left: opacityX - 7.5 + 'px'
            });

            this.$opacity_drag_bar.data('pos', { x: opacityX });
        }
    }, {
        key: 'caculateH',
        value: function caculateH() {

            var huePos = this.$drag_bar.data('pos') || { x: 0 };

            var h = huePos.x / this.$hueContainer.width() * 360;

            return { h: h };
        }
    }, {
        key: 'caculateOpacity',
        value: function caculateOpacity() {
            var opacityPos = this.$opacity_drag_bar.data('pos') || { x: 0 };
            var a = Math.round(opacityPos.x / this.$opacityContainer.width() * 100) / 100;

            return isNaN(a) ? 1 : a;
        }
    }, {
        key: 'EventDocumentMouseMove',
        value: function EventDocumentMouseMove(e) {
            if (this.$hue.data('isDown')) {
                this.setHueColor(e);
            }

            if (this.$opacity.data('isDown')) {
                this.setOpacity(e);
            }
        }
    }, {
        key: 'EventDocumentMouseUp',
        value: function EventDocumentMouseUp(e) {
            this.$hue.data('isDown', false);
            this.$opacity.data('isDown', false);
        }
    }, {
        key: 'setControlColor',
        value: function setControlColor(color) {
            this.$controlColor.css('background-color', color);
        }
    }, {
        key: 'setHueColor',
        value: function setHueColor(e) {
            var min = this.$hueContainer.offset().left;
            var max = min + this.$hueContainer.width();
            var current = e ? Event.pos(e).clientX : min + (max - min) * (this.colorpicker.currentH / 360);

            var dist;
            if (current < min) {
                dist = 0;
            } else if (current > max) {
                dist = 100;
            } else {
                dist = (current - min) / (max - min) * 100;
            }

            var x = this.$hueContainer.width() * (dist / 100);

            this.$drag_bar.css({
                left: x - Math.ceil(this.$drag_bar.width() / 2) + 'px'
            });

            this.$drag_bar.data('pos', { x: x });

            var hueColor = color$3.checkHueColor(dist / 100);

            this.colorpicker.setBackgroundColor(hueColor);
            this.colorpicker.setCurrentH(dist / 100 * 360);
            this.colorpicker.setInputColor();
        }
    }, {
        key: 'mousedown $drag_bar',
        value: function mousedown$drag_bar(e) {
            e.preventDefault();
            this.$hue.data('isDown', true);
        }
    }, {
        key: 'mousedown $opacity_drag_bar',
        value: function mousedown$opacity_drag_bar(e) {
            e.preventDefault();
            this.$opacity.data('isDown', true);
        }
    }, {
        key: 'mousedown $hueContainer',
        value: function mousedown$hueContainer(e) {
            this.$hue.data('isDown', true);
            this.setHueColor(e);
        }
    }, {
        key: 'mousedown $opacityContainer',
        value: function mousedown$opacityContainer(e) {
            this.$opacity.data('isDown', true);
            this.setOpacity(e);
        }
    }, {
        key: 'initializeEvent',
        value: function initializeEvent() {
            this.initializeEventMachin();
        }
    }]);
    return ColorControl;
}(EventMachin);

var color$4 = ColorUtil.color;

var ColorInformation = function (_EventMachin) {
    inherits(ColorInformation, _EventMachin);

    function ColorInformation(colorpicker) {
        classCallCheck(this, ColorInformation);

        var _this = possibleConstructorReturn(this, (ColorInformation.__proto__ || Object.getPrototypeOf(ColorInformation)).call(this));

        _this.colorpicker = colorpicker;
        _this.initialize();

        return _this;
    }

    createClass(ColorInformation, [{
        key: 'initialize',
        value: function initialize() {
            this.$el = new Dom('div', 'information hex');

            this.$informationChange = this.$el.createChild('div', 'information-change');

            this.$formatChangeButton = this.$informationChange.createChild('button', 'format-change-button arrow-button', { type: 'button' });

            this.$el.append(this.makeInputFieldHex());
            this.$el.append(this.makeInputFieldRgb());
            this.$el.append(this.makeInputFieldHsl());
        }
    }, {
        key: 'makeInputFieldHex',
        value: function makeInputFieldHex() {
            var item = new Dom('div', 'information-item hex');
            var field = item.createChild('div', 'input-field hex');

            this.$hexCode = field.createChild('input', 'input', { type: 'text' });

            field.createChild('div', 'title').html('HEX');

            return item;
        }
    }, {
        key: 'makeInputFieldRgb',
        value: function makeInputFieldRgb() {
            var item = new Dom('div', 'information-item rgb');

            var field = item.createChild('div', 'input-field rgb-r');
            this.$rgb_r = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('R');

            field = item.createChild('div', 'input-field rgb-g');
            this.$rgb_g = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('G');

            field = item.createChild('div', 'input-field rgb-b');
            this.$rgb_b = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('B');

            // rgba
            field = item.createChild('div', 'input-field rgb-a');
            this.$rgb_a = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('A');

            return item;
        }
    }, {
        key: 'makeInputFieldHsl',
        value: function makeInputFieldHsl() {
            var item = new Dom('div', 'information-item hsl');

            var field = item.createChild('div', 'input-field hsl-h');
            this.$hsl_h = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('H');

            field = item.createChild('div', 'input-field hsl-s');
            this.$hsl_s = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('S');

            field = item.createChild('div', 'input-field hsl-l');
            this.$hsl_l = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('L');

            // rgba
            field = item.createChild('div', 'input-field hsl-a');
            this.$hsl_a = field.createChild('input', 'input', { type: 'text' });
            field.createChild('div', 'title').html('A');

            return item;
        }
    }, {
        key: 'currentFormat',
        value: function currentFormat() {
            var current_format = this.$el.data('format') || 'hex';
            if (this.colorpicker.currentA < 1 && current_format == 'hex') {
                var next_format = 'rgb';
                this.$el.removeClass(current_format);
                this.$el.addClass(next_format);
                this.$el.data('format', next_format);

                this.colorpicker.setInputColor();
            }
        }
    }, {
        key: 'setCurrentFormat',
        value: function setCurrentFormat(format) {
            this.$el.data('format', format);
            this.initFormat();
        }
    }, {
        key: 'initFormat',
        value: function initFormat() {
            var current_format = this.$el.data('format') || 'hex';

            this.$el.removeClass('hex');
            this.$el.removeClass('rgb');
            this.$el.removeClass('hsl');
            this.$el.addClass(current_format);
        }
    }, {
        key: 'nextFormat',
        value: function nextFormat() {
            var current_format = this.$el.data('format') || 'hex';

            var next_format = 'hex';
            if (current_format == 'hex') {
                next_format = 'rgb';
            } else if (current_format == 'rgb') {
                next_format = 'hsl';
            } else if (current_format == 'hsl') {
                if (this.colorpicker.currentA == 1) {
                    next_format = 'hex';
                } else {
                    next_format = 'rgb';
                }
            }

            this.$el.removeClass(current_format);
            this.$el.addClass(next_format);
            this.$el.data('format', next_format);

            this.colorpicker.setInputColor();
        }
    }, {
        key: 'setRGBtoHexColor',
        value: function setRGBtoHexColor(e) {
            var r = this.$rgb_r.val(),
                g = this.$rgb_g.val(),
                b = this.$rgb_b.val();

            if (r == "" || g == "" || b == "") return;

            if (parseInt(r) > 255) this.$rgb_r.val(255);else this.$rgb_r.val(parseInt(r));

            if (parseInt(g) > 255) this.$rgb_g.val(255);else this.$rgb_g.val(parseInt(g));

            if (parseInt(b) > 255) this.$rgb_b.val(255);else this.$rgb_b.val(parseInt(b));

            this.colorpicker.initColor(this.getHexFormat());
        }
    }, {
        key: 'setRGBInput',
        value: function setRGBInput(r, g, b) {
            this.$rgb_r.val(r);
            this.$rgb_g.val(g);
            this.$rgb_b.val(b);
            this.$rgb_a.val(this.colorpicker.currentA);
        }
    }, {
        key: 'setHSLInput',
        value: function setHSLInput(h, s, l) {
            this.$hsl_h.val(h);
            this.$hsl_s.val(s + '%');
            this.$hsl_l.val(l + '%');
            this.$hsl_a.val(this.colorpicker.currentA);
        }
    }, {
        key: 'getHexFormat',
        value: function getHexFormat() {
            return color$4.format({
                r: this.$rgb_r.int(),
                g: this.$rgb_g.int(),
                b: this.$rgb_b.int()
            }, 'hex');
        }
    }, {
        key: 'convertRGB',
        value: function convertRGB() {
            return this.colorpicker.convertRGB();
        }
    }, {
        key: 'convertHEX',
        value: function convertHEX() {
            return this.colorpicker.convertHEX();
        }
    }, {
        key: 'convertHSL',
        value: function convertHSL() {
            return this.colorpicker.convertHSL();
        }
    }, {
        key: 'getFormattedColor',
        value: function getFormattedColor(format) {
            return this.colorpicker.getFormattedColor(format);
        }
    }, {
        key: 'getFormat',
        value: function getFormat() {
            return this.$el.data('format') || 'hex';
        }
    }, {
        key: 'setInputColor',
        value: function setInputColor() {
            var format = this.getFormat();

            var rgb = null;
            if (format == 'hex') {
                this.$hexCode.val(this.convertHEX());
            } else if (format == 'rgb') {
                var rgb = this.convertRGB();
                this.setRGBInput(rgb.r, rgb.g, rgb.b, rgb.a);
            } else if (format == 'hsl') {
                var hsl = this.convertHSL();
                this.setHSLInput(hsl.h, hsl.s, hsl.l, hsl.a);
            }
        }
    }, {
        key: 'checkNumberKey',
        value: function checkNumberKey(e) {
            return Event.checkNumberKey(e);
        }
    }, {
        key: 'keydown $rgb_r',
        value: function keydown$rgb_r(e) {
            return this.checkNumberKey(e);
        }
    }, {
        key: 'keydown $rgb_g',
        value: function keydown$rgb_g(e) {
            return this.checkNumberKey(e);
        }
    }, {
        key: 'keydown $rgb_b',
        value: function keydown$rgb_b(e) {
            return this.checkNumberKey(e);
        }
    }, {
        key: 'keyup $rgb_r',
        value: function keyup$rgb_r(e) {
            return this.setRGBtoHexColor(e);
        }
    }, {
        key: 'keyup $rgb_g',
        value: function keyup$rgb_g(e) {
            return this.setRGBtoHexColor(e);
        }
    }, {
        key: 'keyup $rgb_b',
        value: function keyup$rgb_b(e) {
            return this.setRGBtoHexColor(e);
        }
    }, {
        key: 'keydown $hexCode',
        value: function keydown$hexCode(e) {
            if (e.which < 65 || e.which > 70) {
                return this.checkNumberKey(e);
            }
        }
    }, {
        key: 'keyup $hexCode',
        value: function keyup$hexCode(e) {
            var code = this.$hexCode.val();

            if (code.charAt(0) == '#' && code.length == 7) {
                this.colorpicker.initColor(code);
            }
        }
    }, {
        key: 'click $formatChangeButton',
        value: function click$formatChangeButton(e) {
            this.nextFormat();
        }
    }, {
        key: 'initializeEvent',
        value: function initializeEvent() {
            this.initializeEventMachin();
        }
    }, {
        key: 'refresh',
        value: function refresh() {}
    }]);
    return ColorInformation;
}(EventMachin);

var ColorPallet = function (_EventMachin) {
    inherits(ColorPallet, _EventMachin);

    function ColorPallet(colorpicker) {
        classCallCheck(this, ColorPallet);

        var _this = possibleConstructorReturn(this, (ColorPallet.__proto__ || Object.getPrototypeOf(ColorPallet)).call(this));

        _this.colorpicker = colorpicker;
        _this.initialize();
        return _this;
    }

    createClass(ColorPallet, [{
        key: 'initialize',
        value: function initialize() {
            this.$el = new Dom('div', 'color');
            this.$saturation = this.$el.createChild('div', 'saturation');
            this.$value = this.$saturation.createChild('div', 'value');
            this.$drag_pointer = this.$value.createChild('div', 'drag-pointer');
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor(color) {
            this.$el.css("background-color", color);
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setColorUI();
        }
    }, {
        key: 'caculateSV',
        value: function caculateSV() {
            var pos = this.$drag_pointer.data('pos') || { x: 0, y: 0 };

            var width = this.$el.width();
            var height = this.$el.height();

            var s = pos.x / width;
            var v = (height - pos.y) / height;

            return { s: s, v: v, width: width, height: height };
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI() {
            var x = this.$el.width() * this.colorpicker.currentS,
                y = this.$el.height() * (1 - this.colorpicker.currentV);

            this.$drag_pointer.css({
                left: x - 5 + "px",
                top: y - 5 + "px"
            });

            this.$drag_pointer.data('pos', { x: x, y: y });
        }
    }, {
        key: 'setMainColor',
        value: function setMainColor(e) {
            e.preventDefault();
            var pos = this.colorpicker.$root.position(); // position for screen
            var w = this.$el.width();
            var h = this.$el.height();

            var x = e.clientX - pos.left;
            var y = e.clientY - pos.top;

            if (x < 0) x = 0;else if (x > w) x = w;

            if (y < 0) y = 0;else if (y > h) y = h;

            this.$drag_pointer.css({
                left: x - 5 + 'px',
                top: y - 5 + 'px'
            });

            this.$drag_pointer.data('pos', { x: x, y: y });

            this.colorpicker.caculateHSV();
            this.colorpicker.setInputColor();
        }
    }, {
        key: 'EventDocumentMouseUp',
        value: function EventDocumentMouseUp(e) {
            this.$el.data('isDown', false);
        }
    }, {
        key: 'EventDocumentMouseMove',
        value: function EventDocumentMouseMove(e) {
            if (this.$el.data('isDown')) {
                this.setMainColor(e);
            }
        }
    }, {
        key: 'mousedown',
        value: function mousedown(e) {
            this.$el.data('isDown', true);
            this.setMainColor(e);
        }
    }, {
        key: 'mouseup',
        value: function mouseup(e) {
            this.$el.data('isDown', false);
        }
    }, {
        key: 'initializeEvent',
        value: function initializeEvent() {
            this.initializeEventMachin();
        }
    }]);
    return ColorPallet;
}(EventMachin);

var DATA_COLORSETS_INDEX = 'data-colorsets-index';

var ColorSetsChooser = function (_EventMachin) {
    inherits(ColorSetsChooser, _EventMachin);

    function ColorSetsChooser(colorpicker) {
        classCallCheck(this, ColorSetsChooser);

        var _this = possibleConstructorReturn(this, (ColorSetsChooser.__proto__ || Object.getPrototypeOf(ColorSetsChooser)).call(this));

        _this.colorpicker = colorpicker;

        _this.initialize();
        return _this;
    }

    createClass(ColorSetsChooser, [{
        key: 'initialize',
        value: function initialize() {
            // make colorset-chooser 
            this.$el = new Dom('div', 'color-chooser');

            var $container = this.$el.createChild('div', 'color-chooser-container');

            var $header = $container.createChild('div', 'colorsets-item colorsets-item-header');

            $header.createChild('h1', 'title').html('Color Pallets');

            this.$toggleButton = $header.createChild('span', 'items').html('&times;');

            this.$colorsetsList = $container.createChild('div', 'colorsets-list');

            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.$colorsetsList.html(this.makeColorSetsList());
        }
    }, {
        key: 'makeColorItemList',
        value: function makeColorItemList(colors) {
            var maxCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

            var $list = new Dom('div');

            for (var i = 0, len = colors.length; i < len && i < maxCount; i++) {
                var color = colors[i];
                var $item = $list.createChild('div', 'color-item', {
                    title: color
                });

                $item.createChild('div', 'color-view', null, {
                    'background-color': color
                });
            }

            return $list;
        }
    }, {
        key: 'makeColorSetsList',
        value: function makeColorSetsList() {
            var _this2 = this;

            var $div = new Dom('div');

            // colorsets 
            var colorSets = this.colorpicker.getColorSetsList();
            colorSets.forEach(function (element, index) {
                var $item = $div.createChild('div', 'colorsets-item', defineProperty({}, DATA_COLORSETS_INDEX, index));

                $item.createChild('h1', 'title').html(element.name);

                $item.createChild('div', 'items').append(_this2.makeColorItemList(element.colors, 5));
            });

            return $div;
        }
    }, {
        key: 'show',
        value: function show() {
            this.$el.addClass('open');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.removeClass('open');
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.$el.toggleClass('open');
        }
    }, {
        key: 'click $toggleButton',
        value: function click$toggleButton(e) {
            this.toggle();
        }
    }, {
        key: 'click $colorsetsList',
        value: function click$colorsetsList(e) {
            e.preventDefault();
            var $item = new Dom(e.target).closest('colorsets-item');

            if ($item) {

                var index = parseInt($item.attr(DATA_COLORSETS_INDEX));
                this.colorpicker.setCurrentColorSets(index);
                this.hide();
            }
        }
    }, {
        key: 'initializeEvent',
        value: function initializeEvent() {
            this.initializeEventMachin();
        }
    }]);
    return ColorSetsChooser;
}(EventMachin);

var colorSetsList = [{
    name: "Material",
    colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
}, {
    name: "Custom",
    "edit": true,
    'colors': []
}, {
    name: "Pages",
    'colors': ['#fff', '#f00', '#0ff', '#f0f']
}];

var ColorSetsList = function () {
    function ColorSetsList(colorpicker) {
        classCallCheck(this, ColorSetsList);

        this.colorpicker = colorpicker;

        this.setUserList(this.colorpicker.getOption('colorSets'));
    }

    createClass(ColorSetsList, [{
        key: 'list',
        value: function list() {
            return this.userList || colorSetsList;
        }
    }, {
        key: 'setUserList',
        value: function setUserList(list) {
            this.userList = list;

            this.resetUserList();

            this.setCurrentColorSets();
        }
    }, {
        key: 'resetUserList',
        value: function resetUserList() {
            var _this = this;

            if (this.userList && this.userList.length) {
                this.userList = this.userList.map(function (element, index) {

                    if (typeof element.colors == 'function') {
                        var makeCallback = element.colors;

                        element.colors = makeCallback(_this.colorpicker, _this);
                        element._colors = makeCallback;
                    }

                    return Object.assign({
                        name: 'color-' + index,
                        colors: []
                    }, element);
                });
            }
        }
    }, {
        key: 'setCurrentColorSets',
        value: function setCurrentColorSets(nameOrIndex) {

            var _list = this.list();

            if (typeof nameOrIndex == 'undefined') {
                this.currentColorSets = _list[0];
            } else if (typeof nameOrIndex == 'number') {
                this.currentColorSets = _list[nameOrIndex];
            } else {
                this.currentColorSets = _list.filter(function (obj) {
                    return obj.name == nameOrIndex;
                })[0];
            }
        }
    }, {
        key: 'getCurrentColorSets',
        value: function getCurrentColorSets() {
            return this.currentColorSets;
        }
    }, {
        key: 'addCurrentColor',
        value: function addCurrentColor(color) {
            if (Array.isArray(this.currentColorSets.colors)) {
                this.currentColorSets.colors.push(color);
            }
        }
    }, {
        key: 'removeCurrentColor',
        value: function removeCurrentColor(index) {
            if (this.currentColorSets.colors[index]) {
                this.currentColorSets.colors.splice(index, 1);
            }
        }
    }, {
        key: 'removeCurrentColorToTheRight',
        value: function removeCurrentColorToTheRight(index) {
            if (this.currentColorSets.colors[index]) {
                this.currentColorSets.colors.splice(index, Number.MAX_VALUE);
            }
        }
    }, {
        key: 'clearPalette',
        value: function clearPalette() {
            if (this.currentColorSets.colors) {
                this.currentColorSets.colors = [];
            }
        }
    }, {
        key: 'getCurrentColors',
        value: function getCurrentColors() {
            return this.getColors(this.currentColorSets);
        }
    }, {
        key: 'getColors',
        value: function getColors(element) {
            return element.colors || [];
        }
    }, {
        key: 'getColorSetsList',
        value: function getColorSetsList() {
            var _this2 = this;

            return this.list().map(function (element) {
                return {
                    name: element.name,
                    colors: _this2.getColors(element)
                };
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {}
    }]);
    return ColorSetsList;
}();

var CurrentColorSets = function (_EventMachin) {
    inherits(CurrentColorSets, _EventMachin);

    function CurrentColorSets(colorpicker) {
        classCallCheck(this, CurrentColorSets);

        var _this = possibleConstructorReturn(this, (CurrentColorSets.__proto__ || Object.getPrototypeOf(CurrentColorSets)).call(this));

        _this.colorpicker = colorpicker;

        _this.colorSetsList = _this.colorpicker.colorSetsList;

        _this.initialize();
        return _this;
    }

    createClass(CurrentColorSets, [{
        key: 'makeCurrentColorSets',
        value: function makeCurrentColorSets() {
            var list = new Dom('div', 'current-color-sets');
            var currentColorSets = this.colorSetsList.getCurrentColorSets();
            var colors = this.colorSetsList.getCurrentColors();

            for (var i = 0, len = colors.length; i < len; i++) {
                var color = colors[i];
                var item = list.createChild('div', 'color-item', {
                    'title': color,
                    'data-index': i,
                    'data-color': color
                });

                item.createChild('div', 'empty');
                item.createChild('div', 'color-view', null, {
                    'background-color': color
                });
            }

            if (currentColorSets.edit) {
                list.createChild('div', 'add-color-item').html('+');
            }

            return list;
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            // make colorsets view 
            this.$el = new Dom('div', 'colorsets');

            var $colorSetsMenu = this.$el.createChild('div', 'menu', {
                title: 'Open Color Pallets'
            });
            this.$colorSetsColorList = this.$el.createChild('div', 'color-list');

            this.$colorSetsChooseButton = $colorSetsMenu.createChild('button', 'color-sets-choose-btn arrow-button', {
                type: 'button'
            });

            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.$colorSetsColorList.html(this.makeCurrentColorSets());
        }
    }, {
        key: 'refreshAll',
        value: function refreshAll() {
            this.refresh();
            this.colorpicker.refreshColorSetsChooser();
        }
    }, {
        key: 'addColor',
        value: function addColor(color) {
            this.colorSetsList.addCurrentColor(color);
            this.refreshAll();
        }
    }, {
        key: 'removeColor',
        value: function removeColor(index) {
            this.colorSetsList.removeCurrentColor(index);
            this.refreshAll();
        }
    }, {
        key: 'removeAllToTheRight',
        value: function removeAllToTheRight(index) {
            this.colorSetsList.removeCurrentColorToTheRight(index);
            this.refreshAll();
        }
    }, {
        key: 'clearPalette',
        value: function clearPalette() {
            this.colorSetsList.clearPalette();
            this.refreshAll();
        }
    }, {
        key: 'click $colorSetsChooseButton',
        value: function click$colorSetsChooseButton(e) {
            this.colorpicker.toggleColorChooser();
        }
    }, {
        key: 'contextmenu $colorSetsColorList',
        value: function contextmenu$colorSetsColorList(e) {
            e.preventDefault();
            var currentColorSets = this.colorSetsList.getCurrentColorSets();

            if (!currentColorSets.edit) {
                return;
            }

            var $target = new Dom(e.target);

            var $item = $target.closest('color-item');

            if ($item) {
                var index = parseInt($item.attr('data-index'));

                this.colorpicker.showContextMenu(e, index);
            } else {
                this.colorpicker.showContextMenu(e);
            }
        }
    }, {
        key: 'click $colorSetsColorList',
        value: function click$colorSetsColorList(e) {
            e.preventDefault();
            var $target = new Dom(e.target);

            var $item = $target.closest('color-item');

            if ($item) {
                var _color = $item.attr('data-color');
                this.colorpicker.setColor(_color);
            } else {
                var $addColorItem = $target.closest('add-color-item');

                if ($addColorItem) {
                    this.addColor(this.colorpicker.getCurrentColor());
                }
            }
        }
    }, {
        key: 'initializeEvent',
        value: function initializeEvent() {
            this.initializeEventMachin();
        }
    }]);
    return CurrentColorSets;
}(EventMachin);

var CurrentColorSetsContextMenu = function (_EventMachin) {
    inherits(CurrentColorSetsContextMenu, _EventMachin);

    function CurrentColorSetsContextMenu(colorpicker) {
        classCallCheck(this, CurrentColorSetsContextMenu);

        var _this = possibleConstructorReturn(this, (CurrentColorSetsContextMenu.__proto__ || Object.getPrototypeOf(CurrentColorSetsContextMenu)).call(this));

        _this.colorpicker = colorpicker;
        _this.currentColorSets = colorpicker.currentColorSets;

        _this.initialize();
        return _this;
    }

    createClass(CurrentColorSetsContextMenu, [{
        key: 'initialize',
        value: function initialize() {
            // make colorsets view 
            this.$el = new Dom('ul', 'colorsets-contextmenu');

            this.$el.createChild('li', 'menu-item small-hide', {
                'data-type': 'remove-color'
            }).html('Remove color');

            this.$el.createChild('li', 'menu-item small-hide', {
                'data-type': 'remove-all-to-the-right'
            }).html('Remove all to the right');

            this.$el.createChild('li', 'menu-item', {
                'data-type': 'clear-palette'
            }).html('Clear palette');
        }
    }, {
        key: 'show',
        value: function show(e, index) {
            var $event = Event.pos(e);

            this.$el.css({
                top: $event.clientY - 10 + 'px',
                left: $event.clientX + 'px'
            });
            this.$el.addClass('show');
            this.selectedColorIndex = index;

            if (typeof this.selectedColorIndex == 'undefined') {
                this.$el.addClass('small');
            } else {
                this.$el.removeClass('small');
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.removeClass('show');
        }
    }, {
        key: 'runCommand',
        value: function runCommand(command) {
            switch (command) {
                case 'remove-color':
                    this.currentColorSets.removeColor(this.selectedColorIndex);
                    break;
                case 'remove-all-to-the-right':
                    this.currentColorSets.removeAllToTheRight(this.selectedColorIndex);
                    break;
                case 'clear-palette':
                    this.currentColorSets.clearPalette();
                    break;
            }
        }
    }, {
        key: 'click $el .menu-item',
        value: function click$elMenuItem(e) {
            e.preventDefault();

            var $item = new Dom(e.delegateTarget);
            this.runCommand($item.attr('data-type'));
            this.hide();
        }
    }, {
        key: 'initializeEvent',
        value: function initializeEvent() {
            this.initializeEventMachin();
        }
    }]);
    return CurrentColorSetsContextMenu;
}(EventMachin);

var color = ColorUtil.color;

var ColorPicker = function (_EventMachin) {
    inherits(ColorPicker, _EventMachin);

    function ColorPicker(opt) {
        classCallCheck(this, ColorPicker);

        var _this = possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this));

        _this.opt = opt || {};
        _this.$body = null;
        _this.$root = null;
        _this.format = 'rgb';
        _this.currentA = 0;
        _this.currentH = 0;
        _this.currentS = 0;
        _this.currentV = 0;
        _this.colorSetsList = new ColorSetsList(_this);
        _this.colorpickerCallback = function () {};

        _this.isColorPickerShow = false;
        _this.isShortCut = false;
        _this.hideDelay = _this.opt.hideDeplay || 2000;
        _this.timerCloseColorPicker;
        _this.autoHide = _this.opt.autoHide || true;

        _this.control = new ColorControl(_this);
        _this.palette = new ColorPallet(_this);
        _this.information = new ColorInformation(_this);
        _this.colorSetsChooser = new ColorSetsChooser(_this);
        _this.currentColorSets = new CurrentColorSets(_this);
        _this.contextMenu = new CurrentColorSetsContextMenu(_this, _this.currentColorSets);

        _this.initialize();
        return _this;
    }

    createClass(ColorPicker, [{
        key: 'getOption',
        value: function getOption(key) {
            return this.opt[key];
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            this.$body = new Dom(document.body);
            this.$root = new Dom('div', 'codemirror-colorpicker');

            this.$arrow = new Dom('div', 'arrow');

            this.$root.append(this.$arrow);
            this.$root.append(this.palette.$el);
            this.$root.append(this.control.$el);
            this.$root.append(this.information.$el);
            this.$root.append(this.currentColorSets.$el);
            this.$root.append(this.colorSetsChooser.$el);
            this.$root.append(this.contextMenu.$el);

            this.$checkColorPickerClass = this.checkColorPickerClass.bind(this);

            this.initColor();
        }
    }, {
        key: 'showContextMenu',
        value: function showContextMenu(e, index) {
            this.contextMenu.show(e, index);
        }
    }, {
        key: 'setColor',
        value: function setColor(value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
                if (!value.r || !value.g || !value.b) return;

                this.initColor(color.format(value, "hex"));
            } else if (typeof value == "string") {
                this.initColor(value);
            }
        }
    }, {
        key: 'getColor',
        value: function getColor(type) {
            this.caculateHSV();
            var rgb = this.convertRGB();

            if (type) {
                return color.format(rgb, type);
            }

            return rgb;
        }
    }, {
        key: 'definePostion',
        value: function definePostion(opt) {

            var width = this.$root.width();
            var height = this.$root.height();

            // set left position for color picker
            var elementScreenLeft = opt.left - this.$body.el.scrollLeft;
            if (width + elementScreenLeft > window.innerWidth) {
                elementScreenLeft -= width + elementScreenLeft - window.innerWidth;
            }
            if (elementScreenLeft < 0) {
                elementScreenLeft = 0;
            }

            // set top position for color picker
            var elementScreenTop = opt.top - this.$body.el.scrollTop;
            if (height + elementScreenTop > window.innerHeight) {
                elementScreenTop -= height + elementScreenTop - window.innerHeight;
            }
            if (elementScreenTop < 0) {
                elementScreenTop = 0;
            }

            // set position
            this.$root.css({
                left: elementScreenLeft + 'px',
                top: elementScreenTop + 'px'
            });
        }
    }, {
        key: 'show',
        value: function show(opt, color, callback) {
            this.destroy();
            this.initializeEvent();
            this.$root.appendTo(document.body);

            this.$root.css({
                position: 'fixed', // color picker has fixed position
                left: '-10000px',
                top: '-10000px'
            }).show();

            this.definePostion(opt);

            this.isColorPickerShow = true;

            this.isShortCut = opt.isShortCut || false;

            this.initColor(color);

            // define colorpicker callback
            this.colorpickerCallback = function (colorString) {
                callback(colorString);
            };

            // define hide delay
            this.hideDelay = opt.hideDelay || 2000;
            if (this.hideDelay > 0) {
                this.setHideDelay(this.hideDelay);
            }
        }
    }, {
        key: 'setHideDelay',
        value: function setHideDelay(delayTime) {
            var _this2 = this;

            delayTime = delayTime || 0;

            this.$root.off('mouseenter');
            this.$root.off('mouseleave');

            this.$root.on('mouseenter', function () {
                clearTimeout(_this2.timerCloseColorPicker);
            });

            this.$root.on('mouseleave', function () {
                clearTimeout(_this2.timerCloseColorPicker);
                _this2.timerCloseColorPicker = setTimeout(_this2.hide.bind(_this2), delayTime);
            });

            clearTimeout(this.timerCloseColorPicker);
            this.timerCloseColorPicker = setTimeout(this.hide.bind(this), delayTime);
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.isColorPickerShow) {
                this.destroy();
                this.$root.hide();
                this.$root.remove(); // not empty 
                this.isColorPickerShow = false;
            }
        }
    }, {
        key: 'convertRGB',
        value: function convertRGB() {
            return color.HSVtoRGB(this.currentH, this.currentS, this.currentV);
        }
    }, {
        key: 'convertHEX',
        value: function convertHEX() {
            return color.format(this.convertRGB(), 'hex');
        }
    }, {
        key: 'convertHSL',
        value: function convertHSL() {
            var rgb = color.HSVtoRGB(this.currentH, this.currentS, this.currentV);
            return color.RGBtoHSL(rgb.r, rgb.g, rgb.b);
        }
    }, {
        key: 'getCurrentColor',
        value: function getCurrentColor() {
            return this.getFormattedColor(this.information.getFormat());
        }
    }, {
        key: 'getFormattedColor',
        value: function getFormattedColor(format) {
            format = format || 'hex';

            if (format == 'rgb') {
                var rgb = this.convertRGB();
                rgb.a = this.currentA == 1 ? undefined : this.currentA;
                return color.format(rgb, 'rgb');
            } else if (format == 'hsl') {
                var hsl = this.convertHSL();
                hsl.a = this.currentA == 1 ? undefined : this.currentA;
                return color.format(hsl, 'hsl');
            } else {
                var rgb = this.convertRGB();
                return color.format(rgb, 'hex');
            }
        }
    }, {
        key: 'setInputColor',
        value: function setInputColor() {

            this.information.setInputColor();
            this.control.setInputColor();

            if (typeof this.colorpickerCallback == 'function') {

                if (!isNaN(this.currentA)) {
                    this.colorpickerCallback(this.getCurrentColor());
                }
            }
        }
    }, {
        key: 'caculateHSV',
        value: function caculateHSV() {

            var obj = this.palette.caculateSV();
            var control = this.control.caculateH();

            var s = obj.s;
            var v = obj.v;
            var h = control.h;

            if (obj.width == 0) {
                h = 0;
                s = 0;
                v = 0;
            }

            this.currentH = h;
            this.currentS = s;
            this.currentV = v;
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI() {
            this.control.setColorUI();
            this.palette.setColorUI();
        }
    }, {
        key: 'setCurrentHSV',
        value: function setCurrentHSV(h, s, v, a) {
            this.currentA = a;
            this.currentH = h;
            this.currentS = s;
            this.currentV = v;
        }
    }, {
        key: 'setCurrentH',
        value: function setCurrentH(h) {
            this.currentH = h;
        }
    }, {
        key: 'setCurrentA',
        value: function setCurrentA(a) {
            this.currentA = a;
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor(color) {
            this.palette.setBackgroundColor(color);
        }
    }, {
        key: 'setCurrentFormat',
        value: function setCurrentFormat(format) {
            this.format = format;
            this.information.setCurrentFormat(format);
        }
    }, {
        key: 'initColor',
        value: function initColor(newColor) {
            var c = newColor || "#FF0000",
                colorObj = color.parse(c);

            this.setCurrentFormat(colorObj.type);
            this.setBackgroundColor(c);

            var hsv = color.RGBtoHSV(colorObj.r, colorObj.g, colorObj.b);

            this.setCurrentHSV(hsv.h, hsv.s, hsv.v, colorObj.a);
            this.setColorUI();
            this.setHueColor();
            this.setInputColor();
        }
    }, {
        key: 'setHueColor',
        value: function setHueColor() {
            this.control.setHueColor();
        }
    }, {
        key: 'checkColorPickerClass',
        value: function checkColorPickerClass(el) {
            var hasColorView = new Dom(el).closest('codemirror-colorview');
            var hasColorPicker = new Dom(el).closest('codemirror-colorpicker');
            var hasCodeMirror = new Dom(el).closest('CodeMirror');
            var IsInHtml = el.nodeName == 'HTML';

            return !!(hasColorPicker || hasColorView || hasCodeMirror);
        }
    }, {
        key: 'checkInHtml',
        value: function checkInHtml(el) {
            var IsInHtml = el.nodeName == 'HTML';

            return IsInHtml;
        }

        // Event Bindings 

    }, {
        key: 'mouseup document',
        value: function mouseupDocument(e) {
            this.palette.EventDocumentMouseUp(e);
            this.control.EventDocumentMouseUp(e);

            // when color picker clicked in outside
            if (this.checkInHtml(e.target)) {
                //this.setHideDelay(hideDelay);
            } else if (this.checkColorPickerClass(e.target) == false) {
                this.hide();
            }
        }
    }, {
        key: 'mousemove document',
        value: function mousemoveDocument(e) {
            this.palette.EventDocumentMouseMove(e);
            this.control.EventDocumentMouseMove(e);
        }
    }, {
        key: 'initializeEvent',
        value: function initializeEvent() {

            this.initializeEventMachin();

            this.palette.initializeEvent();
            this.control.initializeEvent();
            this.information.initializeEvent();
            this.currentColorSets.initializeEvent();
            this.colorSetsChooser.initializeEvent();
            this.contextMenu.initializeEvent();
        }
    }, {
        key: 'currentFormat',
        value: function currentFormat() {
            this.information.currentFormat();
        }
    }, {
        key: 'toggleColorChooser',
        value: function toggleColorChooser() {
            this.colorSetsChooser.toggle();
        }
    }, {
        key: 'refreshColorSetsChooser',
        value: function refreshColorSetsChooser() {
            this.colorSetsChooser.refresh();
        }
    }, {
        key: 'getColorSetsList',
        value: function getColorSetsList() {
            return this.colorSetsList.getColorSetsList();
        }
    }, {
        key: 'setCurrentColorSets',
        value: function setCurrentColorSets(nameOrIndex) {
            this.colorSetsList.setCurrentColorSets(nameOrIndex);
            this.currentColorSets.refresh();
        }
    }, {
        key: 'setColorSets',
        value: function setColorSets(list) {
            this.colorSetsList.setUserList(list);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'destroy', this).call(this);

            this.control.destroy();
            this.palette.destroy();
            this.information.destroy();
            this.colorSetsChooser.destroy();
            this.colorSetsList.destroy();
            this.currentColorSets.destroy();
            this.contextMenu.destroy();

            // remove color picker callback
            this.colorpickerCallback = undefined;
        }
    }]);
    return ColorPicker;
}(EventMachin);

CodeMirror.defineOption("colorpicker", false, function (cm, val, old) {
    if (old && old != CodeMirror.Init) {

        if (cm.state.colorpicker) {
            cm.state.colorpicker.destroy();
            cm.state.colorpicker = null;
        }
        // remove event listener
    }

    if (val) {
        cm.state.colorpicker = new ColorView(cm, val);
    }
});

CodeMirror.defineExtension("colorpicker", function (opt) {
    return new ColorPicker(opt);
});

var index = {
    ColorView: ColorView,
    ColorPicker: ColorPicker
};

return index;

})));
