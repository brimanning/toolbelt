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

	w.toolbelt.checkSWFObject = function (cb) {
		if (typeof swfobject === 'undefined' || swfobject === null) {
			$.getScript(window.location.protocol + '//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js', function () {
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

	//I know people don't like this, but sometimes you need to know if it's iOS, IE or Android, sorry
	w.toolbelt.checkBrowser = function(browser) {
		return navigator.userAgent.toLowerCase().match(new RegExp(type)) != null;
	};
}(window, jQuery));