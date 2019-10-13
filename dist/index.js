(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["COZY_LIB"] = factory();
	else
		root["COZY_LIB"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/wolfy87-eventemitter/EventEmitter.js":
/*!***********************************************************!*\
  !*** ./node_modules/wolfy87-eventemitter/EventEmitter.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*!\n * EventEmitter v5.2.8 - git.io/ee\n * Unlicense - http://unlicense.org/\n * Oliver Caldwell - https://oli.me.uk/\n * @preserve\n */\n\n;(function (exports) {\n    'use strict';\n\n    /**\n     * Class for managing events.\n     * Can be extended to provide event functionality in other classes.\n     *\n     * @class EventEmitter Manages event registering and emitting.\n     */\n    function EventEmitter() {}\n\n    // Shortcuts to improve speed and size\n    var proto = EventEmitter.prototype;\n    var originalGlobalValue = exports.EventEmitter;\n\n    /**\n     * Finds the index of the listener for the event in its storage array.\n     *\n     * @param {Function[]} listeners Array of listeners to search through.\n     * @param {Function} listener Method to look for.\n     * @return {Number} Index of the specified listener, -1 if not found\n     * @api private\n     */\n    function indexOfListener(listeners, listener) {\n        var i = listeners.length;\n        while (i--) {\n            if (listeners[i].listener === listener) {\n                return i;\n            }\n        }\n\n        return -1;\n    }\n\n    /**\n     * Alias a method while keeping the context correct, to allow for overwriting of target method.\n     *\n     * @param {String} name The name of the target method.\n     * @return {Function} The aliased method\n     * @api private\n     */\n    function alias(name) {\n        return function aliasClosure() {\n            return this[name].apply(this, arguments);\n        };\n    }\n\n    /**\n     * Returns the listener array for the specified event.\n     * Will initialise the event object and listener arrays if required.\n     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.\n     * Each property in the object response is an array of listener functions.\n     *\n     * @param {String|RegExp} evt Name of the event to return the listeners from.\n     * @return {Function[]|Object} All listener functions for the event.\n     */\n    proto.getListeners = function getListeners(evt) {\n        var events = this._getEvents();\n        var response;\n        var key;\n\n        // Return a concatenated array of all matching events if\n        // the selector is a regular expression.\n        if (evt instanceof RegExp) {\n            response = {};\n            for (key in events) {\n                if (events.hasOwnProperty(key) && evt.test(key)) {\n                    response[key] = events[key];\n                }\n            }\n        }\n        else {\n            response = events[evt] || (events[evt] = []);\n        }\n\n        return response;\n    };\n\n    /**\n     * Takes a list of listener objects and flattens it into a list of listener functions.\n     *\n     * @param {Object[]} listeners Raw listener objects.\n     * @return {Function[]} Just the listener functions.\n     */\n    proto.flattenListeners = function flattenListeners(listeners) {\n        var flatListeners = [];\n        var i;\n\n        for (i = 0; i < listeners.length; i += 1) {\n            flatListeners.push(listeners[i].listener);\n        }\n\n        return flatListeners;\n    };\n\n    /**\n     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.\n     *\n     * @param {String|RegExp} evt Name of the event to return the listeners from.\n     * @return {Object} All listener functions for an event in an object.\n     */\n    proto.getListenersAsObject = function getListenersAsObject(evt) {\n        var listeners = this.getListeners(evt);\n        var response;\n\n        if (listeners instanceof Array) {\n            response = {};\n            response[evt] = listeners;\n        }\n\n        return response || listeners;\n    };\n\n    function isValidListener (listener) {\n        if (typeof listener === 'function' || listener instanceof RegExp) {\n            return true\n        } else if (listener && typeof listener === 'object') {\n            return isValidListener(listener.listener)\n        } else {\n            return false\n        }\n    }\n\n    /**\n     * Adds a listener function to the specified event.\n     * The listener will not be added if it is a duplicate.\n     * If the listener returns true then it will be removed after it is called.\n     * If you pass a regular expression as the event name then the listener will be added to all events that match it.\n     *\n     * @param {String|RegExp} evt Name of the event to attach the listener to.\n     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.addListener = function addListener(evt, listener) {\n        if (!isValidListener(listener)) {\n            throw new TypeError('listener must be a function');\n        }\n\n        var listeners = this.getListenersAsObject(evt);\n        var listenerIsWrapped = typeof listener === 'object';\n        var key;\n\n        for (key in listeners) {\n            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {\n                listeners[key].push(listenerIsWrapped ? listener : {\n                    listener: listener,\n                    once: false\n                });\n            }\n        }\n\n        return this;\n    };\n\n    /**\n     * Alias of addListener\n     */\n    proto.on = alias('addListener');\n\n    /**\n     * Semi-alias of addListener. It will add a listener that will be\n     * automatically removed after its first execution.\n     *\n     * @param {String|RegExp} evt Name of the event to attach the listener to.\n     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.addOnceListener = function addOnceListener(evt, listener) {\n        return this.addListener(evt, {\n            listener: listener,\n            once: true\n        });\n    };\n\n    /**\n     * Alias of addOnceListener.\n     */\n    proto.once = alias('addOnceListener');\n\n    /**\n     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.\n     * You need to tell it what event names should be matched by a regex.\n     *\n     * @param {String} evt Name of the event to create.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.defineEvent = function defineEvent(evt) {\n        this.getListeners(evt);\n        return this;\n    };\n\n    /**\n     * Uses defineEvent to define multiple events.\n     *\n     * @param {String[]} evts An array of event names to define.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.defineEvents = function defineEvents(evts) {\n        for (var i = 0; i < evts.length; i += 1) {\n            this.defineEvent(evts[i]);\n        }\n        return this;\n    };\n\n    /**\n     * Removes a listener function from the specified event.\n     * When passed a regular expression as the event name, it will remove the listener from all events that match it.\n     *\n     * @param {String|RegExp} evt Name of the event to remove the listener from.\n     * @param {Function} listener Method to remove from the event.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.removeListener = function removeListener(evt, listener) {\n        var listeners = this.getListenersAsObject(evt);\n        var index;\n        var key;\n\n        for (key in listeners) {\n            if (listeners.hasOwnProperty(key)) {\n                index = indexOfListener(listeners[key], listener);\n\n                if (index !== -1) {\n                    listeners[key].splice(index, 1);\n                }\n            }\n        }\n\n        return this;\n    };\n\n    /**\n     * Alias of removeListener\n     */\n    proto.off = alias('removeListener');\n\n    /**\n     * Adds listeners in bulk using the manipulateListeners method.\n     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.\n     * You can also pass it a regular expression to add the array of listeners to all events that match it.\n     * Yeah, this function does quite a bit. That's probably a bad thing.\n     *\n     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.\n     * @param {Function[]} [listeners] An optional array of listener functions to add.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.addListeners = function addListeners(evt, listeners) {\n        // Pass through to manipulateListeners\n        return this.manipulateListeners(false, evt, listeners);\n    };\n\n    /**\n     * Removes listeners in bulk using the manipulateListeners method.\n     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.\n     * You can also pass it an event name and an array of listeners to be removed.\n     * You can also pass it a regular expression to remove the listeners from all events that match it.\n     *\n     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.\n     * @param {Function[]} [listeners] An optional array of listener functions to remove.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.removeListeners = function removeListeners(evt, listeners) {\n        // Pass through to manipulateListeners\n        return this.manipulateListeners(true, evt, listeners);\n    };\n\n    /**\n     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.\n     * The first argument will determine if the listeners are removed (true) or added (false).\n     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.\n     * You can also pass it an event name and an array of listeners to be added/removed.\n     * You can also pass it a regular expression to manipulate the listeners of all events that match it.\n     *\n     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.\n     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.\n     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {\n        var i;\n        var value;\n        var single = remove ? this.removeListener : this.addListener;\n        var multiple = remove ? this.removeListeners : this.addListeners;\n\n        // If evt is an object then pass each of its properties to this method\n        if (typeof evt === 'object' && !(evt instanceof RegExp)) {\n            for (i in evt) {\n                if (evt.hasOwnProperty(i) && (value = evt[i])) {\n                    // Pass the single listener straight through to the singular method\n                    if (typeof value === 'function') {\n                        single.call(this, i, value);\n                    }\n                    else {\n                        // Otherwise pass back to the multiple function\n                        multiple.call(this, i, value);\n                    }\n                }\n            }\n        }\n        else {\n            // So evt must be a string\n            // And listeners must be an array of listeners\n            // Loop over it and pass each one to the multiple method\n            i = listeners.length;\n            while (i--) {\n                single.call(this, evt, listeners[i]);\n            }\n        }\n\n        return this;\n    };\n\n    /**\n     * Removes all listeners from a specified event.\n     * If you do not specify an event then all listeners will be removed.\n     * That means every event will be emptied.\n     * You can also pass a regex to remove all events that match it.\n     *\n     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.removeEvent = function removeEvent(evt) {\n        var type = typeof evt;\n        var events = this._getEvents();\n        var key;\n\n        // Remove different things depending on the state of evt\n        if (type === 'string') {\n            // Remove all listeners for the specified event\n            delete events[evt];\n        }\n        else if (evt instanceof RegExp) {\n            // Remove all events matching the regex.\n            for (key in events) {\n                if (events.hasOwnProperty(key) && evt.test(key)) {\n                    delete events[key];\n                }\n            }\n        }\n        else {\n            // Remove all listeners in all events\n            delete this._events;\n        }\n\n        return this;\n    };\n\n    /**\n     * Alias of removeEvent.\n     *\n     * Added to mirror the node API.\n     */\n    proto.removeAllListeners = alias('removeEvent');\n\n    /**\n     * Emits an event of your choice.\n     * When emitted, every listener attached to that event will be executed.\n     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.\n     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.\n     * So they will not arrive within the array on the other side, they will be separate.\n     * You can also pass a regular expression to emit to all events that match it.\n     *\n     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.\n     * @param {Array} [args] Optional array of arguments to be passed to each listener.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.emitEvent = function emitEvent(evt, args) {\n        var listenersMap = this.getListenersAsObject(evt);\n        var listeners;\n        var listener;\n        var i;\n        var key;\n        var response;\n\n        for (key in listenersMap) {\n            if (listenersMap.hasOwnProperty(key)) {\n                listeners = listenersMap[key].slice(0);\n\n                for (i = 0; i < listeners.length; i++) {\n                    // If the listener returns true then it shall be removed from the event\n                    // The function is executed either with a basic call or an apply if there is an args array\n                    listener = listeners[i];\n\n                    if (listener.once === true) {\n                        this.removeListener(evt, listener.listener);\n                    }\n\n                    response = listener.listener.apply(this, args || []);\n\n                    if (response === this._getOnceReturnValue()) {\n                        this.removeListener(evt, listener.listener);\n                    }\n                }\n            }\n        }\n\n        return this;\n    };\n\n    /**\n     * Alias of emitEvent\n     */\n    proto.trigger = alias('emitEvent');\n\n    /**\n     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.\n     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.\n     *\n     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.\n     * @param {...*} Optional additional arguments to be passed to each listener.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.emit = function emit(evt) {\n        var args = Array.prototype.slice.call(arguments, 1);\n        return this.emitEvent(evt, args);\n    };\n\n    /**\n     * Sets the current value to check against when executing listeners. If a\n     * listeners return value matches the one set here then it will be removed\n     * after execution. This value defaults to true.\n     *\n     * @param {*} value The new value to check for when executing listeners.\n     * @return {Object} Current instance of EventEmitter for chaining.\n     */\n    proto.setOnceReturnValue = function setOnceReturnValue(value) {\n        this._onceReturnValue = value;\n        return this;\n    };\n\n    /**\n     * Fetches the current value to check against when executing listeners. If\n     * the listeners return value matches this one then it should be removed\n     * automatically. It will return true by default.\n     *\n     * @return {*|Boolean} The current value to check for or the default, true.\n     * @api private\n     */\n    proto._getOnceReturnValue = function _getOnceReturnValue() {\n        if (this.hasOwnProperty('_onceReturnValue')) {\n            return this._onceReturnValue;\n        }\n        else {\n            return true;\n        }\n    };\n\n    /**\n     * Fetches the events object and creates one if required.\n     *\n     * @return {Object} The events storage object.\n     * @api private\n     */\n    proto._getEvents = function _getEvents() {\n        return this._events || (this._events = {});\n    };\n\n    /**\n     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.\n     *\n     * @return {Function} Non conflicting EventEmitter class.\n     */\n    EventEmitter.noConflict = function noConflict() {\n        exports.EventEmitter = originalGlobalValue;\n        return EventEmitter;\n    };\n\n    // Expose the class either via AMD, CommonJS or the global object\n    if (true) {\n        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n            return EventEmitter;\n        }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    }\n    else {}\n}(typeof window !== 'undefined' ? window : this || {}));\n\n\n//# sourceURL=webpack://COZY_LIB/./node_modules/wolfy87-eventemitter/EventEmitter.js?");

/***/ }),

/***/ "./src/Element/Code.ts":
/*!*****************************!*\
  !*** ./src/Element/Code.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Element_1 = __importDefault(__webpack_require__(/*! ./Element */ \"./src/Element/Element.ts\"));\r\n/**\r\n * Load Code from codeData object(json)\r\n * @function loadCode\r\n * @param {Object} codeData\r\n * @return {Code}\r\n*/\r\nclass Code extends Element_1.default {\r\n    constructor(data, mix) {\r\n        super(data);\r\n        this.linkingPoints = mix.linkingPoints;\r\n        this.addLinkingPoint = mix.addLinkingPoint.bind(mix);\r\n        this.init();\r\n    }\r\n}\r\nexports.default = Code;\r\n;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Element/Code.ts?");

/***/ }),

/***/ "./src/Element/Compiler.ts":
/*!*********************************!*\
  !*** ./src/Element/Compiler.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Controller_1 = __importDefault(__webpack_require__(/*! ./Controller */ \"./src/Element/Controller.ts\"));\r\nclass Compiler extends Controller_1.default {\r\n}\r\nexports.default = Compiler;\r\n;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Element/Compiler.ts?");

/***/ }),

/***/ "./src/Element/Controller.ts":
/*!***********************************!*\
  !*** ./src/Element/Controller.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Element_1 = __importDefault(__webpack_require__(/*! ./Element */ \"./src/Element/Element.ts\"));\r\nclass Controller extends Element_1.default {\r\n    constructor(data, code) {\r\n        super(data);\r\n        this.code = code;\r\n        this.init();\r\n    }\r\n}\r\nexports.default = Controller;\r\n;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Element/Controller.ts?");

/***/ }),

/***/ "./src/Element/Element.ts":
/*!********************************!*\
  !*** ./src/Element/Element.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Element {\r\n    constructor(data) {\r\n        this.data = data;\r\n    }\r\n}\r\nexports.default = Element;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Element/Element.ts?");

/***/ }),

/***/ "./src/Element/Renderer.ts":
/*!*********************************!*\
  !*** ./src/Element/Renderer.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Controller_1 = __importDefault(__webpack_require__(/*! ./Controller */ \"./src/Element/Controller.ts\"));\r\nclass Renderer extends Controller_1.default {\r\n}\r\nexports.default = Renderer;\r\n;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Element/Renderer.ts?");

/***/ }),

/***/ "./src/Loader/CodeLoader.ts":
/*!**********************************!*\
  !*** ./src/Loader/CodeLoader.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Loader_1 = __importDefault(__webpack_require__(/*! ./Loader */ \"./src/Loader/Loader.ts\"));\r\nclass CodeLoader extends Loader_1.default {\r\n    load(data, mix) {\r\n        const foundPackage = Object.values(this.packages).find((package_) => {\r\n            return data.packageId === package_.id && data.packageVersion === package_.version;\r\n        });\r\n        const Class = foundPackage.body[data.id];\r\n        const instance = new Class(data.data, mix);\r\n        return instance;\r\n    }\r\n}\r\nexports.default = CodeLoader;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Loader/CodeLoader.ts?");

/***/ }),

/***/ "./src/Loader/CompilerLoader.ts":
/*!**************************************!*\
  !*** ./src/Loader/CompilerLoader.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst ControllerLoader_1 = __importDefault(__webpack_require__(/*! ./ControllerLoader */ \"./src/Loader/ControllerLoader.ts\"));\r\nclass CompilerLoader extends ControllerLoader_1.default {\r\n}\r\nexports.default = CompilerLoader;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Loader/CompilerLoader.ts?");

/***/ }),

/***/ "./src/Loader/ControllerLoader.ts":
/*!****************************************!*\
  !*** ./src/Loader/ControllerLoader.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Loader_1 = __importDefault(__webpack_require__(/*! ./Loader */ \"./src/Loader/Loader.ts\"));\r\nclass ControllerLoader extends Loader_1.default {\r\n    load(data, code) {\r\n        const foundPackage = Object.values(this.packages).find((package_) => {\r\n            return data.packageId === package_.id && data.packageVersion === package_.version;\r\n        });\r\n        const Class = foundPackage.body[data.id];\r\n        const instance = new Class(data.data, code);\r\n        return instance;\r\n    }\r\n}\r\nexports.default = ControllerLoader;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Loader/ControllerLoader.ts?");

/***/ }),

/***/ "./src/Loader/Loader.ts":
/*!******************************!*\
  !*** ./src/Loader/Loader.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Loader {\r\n    constructor(packages) {\r\n        this.packages = packages;\r\n    }\r\n}\r\nexports.default = Loader;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Loader/Loader.ts?");

/***/ }),

/***/ "./src/Loader/RendererLoader.ts":
/*!**************************************!*\
  !*** ./src/Loader/RendererLoader.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst ControllerLoader_1 = __importDefault(__webpack_require__(/*! ./ControllerLoader */ \"./src/Loader/ControllerLoader.ts\"));\r\nclass RendererLoader extends ControllerLoader_1.default {\r\n}\r\nexports.default = RendererLoader;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Loader/RendererLoader.ts?");

/***/ }),

/***/ "./src/Mix/Mix.ts":
/*!************************!*\
  !*** ./src/Mix/Mix.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst LinkingPoint_1 = __importDefault(__webpack_require__(/*! ../structClass/LinkingPoint */ \"./src/structClass/LinkingPoint.ts\"));\r\nclass Mix {\r\n    constructor(codeLoader, controllerLoaders, mixData) {\r\n        this.codeLoader = codeLoader;\r\n        this.controllerLoaders = controllerLoaders;\r\n        this.mixData = mixData;\r\n        this.controllers = {};\r\n        this.linkingPoints = {};\r\n        // 연결점 제작\r\n        Object.entries(mixData.linkingPointsData).forEach(([name, data]) => {\r\n            const point = new Mix(codeLoader, controllerLoaders, data); //자기자신을 생성\r\n            this.linkingPoints[name] = new LinkingPoint_1.default(point);\r\n        });\r\n        // 코드 제작\r\n        this.code = this.codeLoader.load(mixData.codeData, this);\r\n        // 컨트롤러 제작\r\n        Object.entries(mixData.controllerDatas).forEach(([name, controllerData]) => {\r\n            this.controllers[name] = this.controllerLoaders[name].load(controllerData, this.code);\r\n        });\r\n        /*\r\n        특정 Controller는 Code에만 접근 할 것.\r\n        Mix로 접근 비권장.\r\n        */\r\n    }\r\n    // 연결점 연결\r\n    addLinkingPoint(name) {\r\n        this.linkingPoints[name] = new LinkingPoint_1.default();\r\n        this.linkingPoints[name]\r\n            .on(\"link\", (mix) => {\r\n            this.mixData.linkingPointsData[name] = {\r\n                codeData: mix.mixData.codeData,\r\n                controllerDatas: mix.mixData.controllerDatas,\r\n                linkingPointsData: mix.mixData.linkingPointsData\r\n            };\r\n        })\r\n            .on(\"unlink\", (mix) => {\r\n            delete this.mixData.linkingPointsData[name];\r\n        });\r\n    }\r\n    removeLinkingPoint(name) {\r\n        delete this.linkingPoints[name];\r\n    }\r\n    // 컨트롤러 연결\r\n    linkController(name, controllerData) {\r\n        this.controllers[name] = this.controllerLoaders[name].load(controllerData, this.code);\r\n    }\r\n}\r\nexports.default = Mix;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/Mix/Mix.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Element_1 = __importDefault(__webpack_require__(/*! ./Element/Element */ \"./src/Element/Element.ts\"));\r\nexports.Element = Element_1.default;\r\nconst Code_1 = __importDefault(__webpack_require__(/*! ./Element/Code */ \"./src/Element/Code.ts\"));\r\nexports.Code = Code_1.default;\r\nconst Controller_1 = __importDefault(__webpack_require__(/*! ./Element/Controller */ \"./src/Element/Controller.ts\"));\r\nexports.Controller = Controller_1.default;\r\nconst Renderer_1 = __importDefault(__webpack_require__(/*! ./Element/Renderer */ \"./src/Element/Renderer.ts\"));\r\nexports.Renderer = Renderer_1.default;\r\nconst Compiler_1 = __importDefault(__webpack_require__(/*! ./Element/Compiler */ \"./src/Element/Compiler.ts\"));\r\nexports.Compiler = Compiler_1.default;\r\nconst Loader_1 = __importDefault(__webpack_require__(/*! ./Loader/Loader */ \"./src/Loader/Loader.ts\"));\r\nexports.Loader = Loader_1.default;\r\nconst CodeLoader_1 = __importDefault(__webpack_require__(/*! ./Loader/CodeLoader */ \"./src/Loader/CodeLoader.ts\"));\r\nexports.CodeLoader = CodeLoader_1.default;\r\nconst CompilerLoader_1 = __importDefault(__webpack_require__(/*! ./Loader/CompilerLoader */ \"./src/Loader/CompilerLoader.ts\"));\r\nexports.ControllerLoader = CompilerLoader_1.default;\r\nconst RendererLoader_1 = __importDefault(__webpack_require__(/*! ./Loader/RendererLoader */ \"./src/Loader/RendererLoader.ts\"));\r\nexports.RendererLoader = RendererLoader_1.default;\r\nconst CompilerLoader_2 = __importDefault(__webpack_require__(/*! ./Loader/CompilerLoader */ \"./src/Loader/CompilerLoader.ts\"));\r\nexports.CompilerLoader = CompilerLoader_2.default;\r\nconst Mix_1 = __importDefault(__webpack_require__(/*! ./Mix/Mix */ \"./src/Mix/Mix.ts\"));\r\nexports.Mix = Mix_1.default;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/index.ts?");

/***/ }),

/***/ "./src/structClass/LinkingPoint.ts":
/*!*****************************************!*\
  !*** ./src/structClass/LinkingPoint.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/*\r\nimport EventEmitter from \"wolfy87-eventemitter\";\r\nimport Data from \"@src/struct/Data\";\r\nimport Element from \"../Element/Element\";\r\n\r\ndeclare interface LinkingPoint<T extends Element<any, T>> {\r\n    on(event : \"link\" | \"unlink\", listener : (code : T) => void) : this\r\n    on(event: string, listener: Function): this\r\n    on(event: RegExp, listener: Function): this\r\n\r\n    emit(event : \"link\" | \"unlink\", ) : this\r\n    emit(event : string, ...args : any): this\r\n    emit(event : RegExp, ...args : any): this\r\n}\r\n\r\nclass LinkingPoint<T extends Element<any, T>> extends EventEmitter {\r\n    private _linkedCode : T\r\n    get linkedCode() {\r\n        return this._linkedCode;\r\n    }\r\n\r\n    constructor(linkedCode : T = undefined) {\r\n        super();\r\n        this._linkedCode = linkedCode;\r\n    }\r\n\r\n    link(code : T) {\r\n        this.emit(\"link\", code);\r\n        this._linkedCode = code;\r\n    }\r\n\r\n    unlink() {\r\n        this.emit(\"unlink\", this._linkedCode)\r\n        this._linkedCode = undefined;\r\n    }\r\n}\r\n\r\nexport default LinkingPoint;\r\n\r\n*/\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst wolfy87_eventemitter_1 = __importDefault(__webpack_require__(/*! wolfy87-eventemitter */ \"./node_modules/wolfy87-eventemitter/EventEmitter.js\"));\r\nclass LinkingPoint extends wolfy87_eventemitter_1.default {\r\n    constructor(linkedMix = undefined) {\r\n        super();\r\n        this.linkedMix = linkedMix;\r\n    }\r\n    link(code) {\r\n        this.emit(\"link\", code);\r\n        this.linkedMix = code;\r\n    }\r\n    unlink() {\r\n        this.emit(\"unlink\", this.linkedMix);\r\n        this.linkedMix = undefined;\r\n    }\r\n}\r\nexports.default = LinkingPoint;\r\n\n\n//# sourceURL=webpack://COZY_LIB/./src/structClass/LinkingPoint.ts?");

/***/ })

/******/ });
});