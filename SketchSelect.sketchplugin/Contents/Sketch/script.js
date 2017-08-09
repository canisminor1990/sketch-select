var that = this;
function run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports['default'] = function (context) {
	var webUI = new _sketchModuleWebView2['default'](context, 'index.html', {
		identifier: 'sketch-select.dialog',
		x: 0,
		y: 0,
		width: 340,
		height: 680,
		onlyShowCloseButton: true,
		background: hexToNSColor('32d1ff'),
		title: ' ',
		hideTitleBar: false,
		shouldKeepAround: true,
		handlers: {
			onClick: function () {
				function onClick(s) {
					context.document.showMessage(s);

					var sketch = context.api();
					var document = sketch.selectedDocument;
					var selection = document.selectedLayers;
					var count = 0;

					selection.iterate(function (layer) {
						if (count > 0) return;
						selection.clear();
						var i = dialog.selection;
						var selectConfig = {
							fn: selectMethod[i].fn,
							selectInAllArtboards: dialog.artboard
						};
						var parentArtboard = !selectConfig.selectInAllArtboards ? selectParentArtboard(layer) : selectAllArtboard(layer);
						selectSubElement(parentArtboard, layer, selectConfig.fn);
						count++;
					});
				}

				return onClick;
			}()
		}
	});
};

var _sketchModuleWebView = __webpack_require__(1);

var _sketchModuleWebView2 = _interopRequireDefault(_sketchModuleWebView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function selectParentArtboard(layer) {
	var artboard = layer.container;
	if (artboard.isArtboard === false) {
		return selectParentArtboard(artboard);
	}
	return artboard;
}

function selectAllArtboard(layer) {
	var artboard = layer.container;
	if (artboard.isPage === false) {
		return selectAllArtboard(artboard);
	}
	return artboard;
}

function selectSubElement(group, configLayer, fn) {
	if (group.isGroup || group.isArtboard) {
		group.iterate(function (layer) {
			selectSubElement(layer, configLayer, fn);
		});
	} else {
		fn(group, configLayer);
	}
}

function hexToNSColor(hex) {
	var r = parseInt(hex.substring(0, 2), 16) / 255,
	    g = parseInt(hex.substring(2, 4), 16) / 255,
	    b = parseInt(hex.substring(4, 6), 16) / 255,
	    a = 1;
	return NSColor.colorWithRed_green_blue_alpha(r, g, b, a);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSUUID NSThread NSPanel NSMakeRect NSTexturedBackgroundWindowMask NSTitledWindowMask NSClosableWindowMask NSColor NSWindowMiniaturizeButton NSWindowZoomButton NSFloatingWindowLevel WebView COScript */
var MochaJSDelegate = __webpack_require__(2)
var parseQuery = __webpack_require__(3)

var coScript = COScript.currentCOScript()

var LOCATION_CHANGED = 'webView:didChangeLocationWithinPageForFrame:'

function WebUI (context, htmlName, options) {
  // ColorPicker main window
  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()
  var backgroundColor = options.background || NSColor.whiteColor()
  var panel = threadDictionary[identifier] ? threadDictionary[identifier] : NSPanel.alloc().init()

  // Window size
  panel.setFrame_display(NSMakeRect(
    options.x || 0,
    options.y || 0,
    options.width || 240,
    options.height || 180
  ), true)

  panel.setStyleMask(options.styleMask || (NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask))
  panel.setBackgroundColor(backgroundColor)

  if (options.onlyShowCloseButton) {
    panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
    panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
  }

  // Titlebar
  panel.setTitle(options.title || context.plugin.name())
  if (options.hideTitleBar) {
    panel.setTitlebarAppearsTransparent(true)
  }

  panel.becomeKeyWindow()
  panel.setLevel(NSFloatingWindowLevel)

  threadDictionary[identifier] = panel

  if (options.shouldKeepAround !== false) { // Long-running script
    coScript.setShouldKeepAround(true)
  }

  // Add Web View to window
  var webView = WebView.alloc().initWithFrame(NSMakeRect(
    0,
    options.hideTitleBar ? -24 : 0,
    options.width || 240,
    (options.height || 180) - (options.hideTitleBar ? 0 : 24)
  ))

  if (options.frameLoadDelegate || options.handlers) {
    var handlers = options.frameLoadDelegate || {}
    if (options.handlers) {
      var lastQueryId
      handlers[LOCATION_CHANGED] = function (webview, frame) {
        var query = webview.windowScriptObject().evaluateWebScript('window.location.hash')
        query = parseQuery(query)
        if (query.pluginAction && query.actionId && query.actionId !== lastQueryId && query.pluginAction in options.handlers) {
          lastQueryId = query.actionId
          try {
            query.pluginArgs = JSON.parse(query.pluginArgs)
          } catch (err) {}
          options.handlers[query.pluginAction].apply(context, query.pluginArgs)
        }
      }
    }
    var frameLoadDelegate = new MochaJSDelegate(handlers)
    webView.setFrameLoadDelegate_(frameLoadDelegate.getClassInstance())
  }
  if (options.uiDelegate) {
    var uiDelegate = new MochaJSDelegate(options.uiDelegate)
    webView.setUIDelegate_(uiDelegate.getClassInstance())
  }

  webView.setOpaque(true)
  webView.setBackgroundColor(backgroundColor)
  webView.setMainFrameURL_(context.plugin.urlForResourceNamed(htmlName).path())

  panel.contentView().addSubview(webView)
  panel.center()
  panel.makeKeyAndOrderFront(null)

  return {
    panel: panel,
    eval: webView.stringByEvaluatingJavaScriptFromString,
    webView: webView
  }
}

WebUI.clean = function () {
  coScript.setShouldKeepAround(false)
}

module.exports = WebUI


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals NSUUID MOClassDescription NSObject NSSelectorFromString NSClassFromString */

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = 'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject)

  delegateClassDesc.registerClass()

  // Storage Handlers
  var handlers = {}

  // Define interface
  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = (selectorString in handlers)
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      var dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })')

      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
    }
  }

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString]
  }

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString]
  }

  this.getAllHandlers = function () {
    return handlers
  }

  this.getClass = function () {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new()
  }

  // Convenience
  if (typeof selectorHandlerDict === 'object') {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
    }
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (query) {
  query = query.split('?')[1]
  if (!query) { return }
  query = query.split('&').reduce(function (prev, s) {
    var res = s.split('=')
    if (res.length === 2) {
      prev[decodeURIComponent(res[0])] = decodeURIComponent(res[1])
    }
    return prev
  }, {})
  return query
}


/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
