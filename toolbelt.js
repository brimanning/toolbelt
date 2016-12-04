/*!
 * Toolbelt JavaScript Library v0.0.1
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

(function (w, $, s) {
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

  //Sometimes you just gotta know if it's iOS, IE, Android, we live in a sad, imperfect world
  w.toolbelt.checkBrowser = function(browser) {
    return navigator.userAgent.toLowerCase().match(new RegExp(browser)) != null;
  };
  w.toolbelt.isMobile = function() {
    return w.toolbelt.checkBrowser('iphone|ipod|ipad|mobile safari|mobile|android|iemobile|Windows Phone');
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

  w.toolbelt.cachedAjax = function(options) {
    var val = null;
    options = options || {};
    if (!w.toolbelt.exists(options.cache) || !options.cache) {
      if (!w.toolbelt.exists(options.storageType)) {
        s.setType(options.storageType);
      }

      val = s.get(options.url);
      if (w.toolbelt.exists(options.expires) && options.expires > 0 && !!val && !!val.expiration
        && val.expiration < new Date().getTime()) {

        val = null;
        s.remove(options.url);
      }
    }

    if (val === null) {
      var success = function(val) {
        if (w.toolbelt.exists(options.expires) && options.expires > 0) {
          var now = new Date();
          val.expiration = now.setSeconds(now.getSeconds() + options.expires);
        }
        s.set(options.url, val);
        options.success(val);
      };
      options.success = success;
      $.ajax(options);
    } else if (w.toolbelt.exists(options.success)) {
      options.success(val);
    }
  };
}(window, jQuery, snap));
