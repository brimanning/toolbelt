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
}(window, jQuery));