/*!
 * Toolbelt JavaScript Library v0.1
 * https://github.com/brimanning/Toolbelt
 *
 * Uses jQuery.js
 * http://jquery.com/
 *
 * Copyright 2014 Brian Manning
 * Released under the MIT license
 *
 * Date: 1/21/2014
 */

(function (w, $) {
	w.toolbelt = {};

	w.toolbelt.resizeFunctions = [];
	w.toolbelt.addEventOnWindowResize = function (f) {
		var eventsToBindTo = 'resize fullscreenchange webkitfullscreenchange mozfullscreenchange orientationchange';
		$(window).unbind(eventsToBindTo).bind(eventsToBindTo, w.toolbelt.runWindowResizeEvents);
		w.toolbelt.resizeFunctions.push(f);
		f();
	};
	w.toolbelt.runWindowResizeEvents = function () {
		for (var i = 0, l = w.toolbelt.resizeFunctions.length; i < l; i++) {
			w.toolbelt.resizeFunctions[i]();
		}
	};

	w.toolbelt.checkSWFObject = function (cb, preferredUrl) {
		if (typeof swfobject === 'undefined' || swfobject === null) {
			$.getScript(w.toolbelt.exists(preferredUrl) ? preferredUrl : window.location.protocol + '//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js', function () {
				if (!!cb) {
					cb();
				}
			});
		} else {
			if (!!cb) {
				cb();
			}
		}
	};

	w.toolbelt.exists = function(obj) {
		return typeof obj !== 'undefined' && !!obj;
	};

	w.toolbelt.reRender = function() {
		w.scrollTo(0, w.pageYOffset);
		$(w).trigger('scroll');
	};

	//I know people don't like this, but sometimes you need to know if it's iOS, IE or Android, sorry
	w.toolbelt.checkBrowser = function(browser) {
		return navigator.userAgent.toLowerCase().match(new RegExp(browser)) != null;
	};
	w.toolbelt.isMobile = function() {
		return w.toolbelt.checkBrowser('iphone|ipod|ipad|mobile|android');
	};
	w.toolbelt.isIOS = function() {
		return w.toolbelt.checkBrowser('iphone|ipod|ipad|mobile safari');
	};
	w.toolbelt.isIPad = function() {
		return w.toolbelt.checkBrowser('ipad');
	};
	w.toolbelt.isIPod = function() {
		return w.toolbelt.checkBrowser('ipod');
	};
	w.toolbelt.isIPhone = function() {
		return w.toolbelt.checkBrowser('iphone');
	};
	w.toolbelt.isAndroid = function() {
		return w.toolbelt.checkBrowser('android');
	};
	w.toolbelt.isWindowsPhone = function() {
		return w.toolbelt.checkBrowser('iemobile|Windows Phone');
	};

	w.toolbelt.isVisible = function(obj) {
		if (typeof obj === 'string') {
			obj = $(obj);
		}

		if (!obj.is(':visible')) {
			return false;
		} else if (obj.is(':hidden')) {
			return true;
		}

		var $window = $(w),
			docViewTop = $window.scrollTop(),
			docViewBottom = docViewTop + $window.height(),
			elemTop = obj.offset().top,
			elemBottom = elemTop + obj.height();

		return elemBottom >= docViewTop && elemTop <= docViewBottom;
	};

	var useStorage = null,
		checkStorage = function(storageType) {
			try {
				if (useStorage === null) {
					useStorage = w.toolbelt.exists(Storage) && w.toolbelt.exists(storageType === 'session' ? sessionStorage : localStorage);
				}
			} catch(e) {
				useStorage = false;
			}

			return useStorage !== null;
		},
		getStorage = function(storageType) {
			return storageType === 'session' ? sessionStorage : localStorage;
		},
		setItem = function(key, obj, storageType) {
			if (checkStorage(storageType)) {
				try {
					getStorage().setItem(key, JSON.stringify(obj));
				} catch (e) { }
			}
		},
		getItem = function(key, storageType) {
			var val = null;
			if (checkStorage(storageType)) {
				try {
					val = JSON.parse(getStorage().getItem(key));
				} catch (e) { }
			}
			return val;
		},
		removeItem = function(key, storageType) {
			if (checkStorage(storageType)) {
				try {
					getStorage().removeItem(key);
				} catch (e) { }
			}
		};

	w.toolbelt.cachedAjax = function(options) {
		var val = null;
		options = options || {};
		if (!w.toolbelt.exists(options.cache) || !options.cache) {
			if (!w.toolbelt.exists(options.storageType)) {
				options.storageType = 'session';
			}

			val = getItem(options.url, options.storageType);
			if (w.toolbelt.exists(options.expires) && options.expires > 0 && !!val && !!val.expiration
				&& val.expiration < new Date().getTime()) {

				val = null;
				removeItem(options.url, options.storageType);
			}
		}

		if (val === null) {
			var success = function(val) {
				if (w.toolbelt.exists(options.expires) && options.expires > 0) {
					var now = new Date();
					val.expiration = now.setSeconds(now.getSeconds() + options.expires);
				}
				setItem(options.url, val, options.storageType);
				options.success(val);
			};
			options.success = success;
			$.ajax(options);
		} else if (w.toolbelt.exists(options.success)) {
			options.success(val);
		}
	};
}(window, jQuery));
