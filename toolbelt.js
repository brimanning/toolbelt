(function (w, $) {
	w.toolbelt = {};

	w.toolbelt.resizeFunctions = [];
	w.toolbelt.addEventOnWindowResize = function (f) {
		$(window).unbind('resize').bind('resize', w.toolbelt.runWindowResizeEvents);
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

	var useSessionStorage = null,
		checkSessionStorage = function() {
			try {
				if (useSessionStorage === null) {
					useSessionStorage = w.toolbelt.exists(Storage) && w.toolbelt.exists(sessionStorage);
				}
			} catch(e) {
				useSessionStorage= false;
			}

			return useSessionStorage;
		},
		setSessionItem = function(key, obj) {
			if (checkSessionStorage()) {
				try {
					sessionStorage.setItem(key, JSON.stringify(obj));
				} catch (e) { }
			}
		},
		getSessionItem = function(key) {
			var val = null;
			if (checkSessionStorage()) {
				try {
					val = JSON.parse(sessionStorage.getItem(key));
				} catch (e) { }
			}
			return val;
		};

	w.toolbelt.cachedAjax = function(options) {
		var val = null;
		options = options || {};
		if (!w.toolbelt.exists(options.cache) || !options.cache) {
			val = getSessionItem(options.url);
			if (w.toolbelt.exists(options.expires) && options.expires > 0 && !!val && !!val.expiration
				&& val.expiration < new Date().getTime()) {

				val = null;
				//TODO: add cache removal
			}
		}

		if (val === null) {
			var success = function(val) {
				if (w.toolbelt.exists(options.expires) && options.expires > 0) {
					var now = new Date();
					val.expiration = now.setSeconds(now.getSeconds() + options.expires);
				}
				setSessionItem(options.url, val);
				options.success(val);
			};
			options.success = success;
			$.ajax(options);
		} else if (w.toolbelt.exists(options.success)) {
			options.success(val);
		}
	};
}(window, jQuery));