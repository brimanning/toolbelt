# About Toolbelt
========

Some useful JavaScript helpers. It's less of a library and more of a toolbelt, and thus the name.

It currently requires [jQuery](https://jquery.com/) and [snap-storage](https://github.com/brimanning/snap-storage).

Installation options
===
+ Download from above
+ Clone: `git clone https://github.com/brimanning/toolbelt.git`
+ Bower: `bower install toolbeltjs`

Usage
===

You'll need to reference `toolbelt` on your page.

	<head>
		<script src="toolbelt.js"></script>
	</head>

You'll now be able to access the following methods:

+ `addEventOnWindowResize(function)` - Add a function that will fire if the window is resized or device is rotated.
+ `runWindowResizeEvents()` - Force the window resize functions to run.
+ `checkSWFObject(callback, preferredUrl)` - See if [swfobject](https://github.com/swfobject/swfobject) is loaded. If it is, run the callback. If it's not, load swfobject. It will load from the url of `//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js` unless a `preferredUrl` is passed.
+ `exists(obj)` - See if an object exists.
+ `reRender()` - Force the page to redraw for weird, buggy occasions.
+ `checkBrowser(regexString)` - See if a string matches the current browser. This isn't a preferred solution, but sometimes feature detection is impossible or unreliable, unfortunately. There are also design or marketing use cases.
+ `isMobile()` - Use `checkBrowser` with `'iphone|ipod|ipad|mobile safari|mobile|android|iemobile|Windows Phone'`.
+ `isIOS()` - Use `checkBrowser` with `'iphone|ipod|ipad|mobile safari'`.
+ `isIPad()` - Use `checkBrowser` with `'ipad'`.
+ `isIPod()` - Use `checkBrowser` with `'ipod'`.
+ `isIPhone()` - Use `checkBrowser` with `'iphone'`.
+ `isAndroid()` - Use `checkBrowser` with `'android'`.
+ `isWindowsPhone()` - Use `checkBrowser` with `'iemobile|Windows Phone'`.
+ `isVisible(obj)` - Check to see if a jQuery selection is either `:hidden` and if not, check to see if it's on the screen.
+ `cachedAjax(options)` - A jQuery `ajax` call that caches the returned value in localStorage or sessionStorage via [snap-storage](https://github.com/brimanning/snap-storage). Options in addition to the standard jQuery options are `expires` and `storageType`. `expires` is how long the cache lasts in seconds. The default is that it doesn't expire. `storageType` dictates whether the cache will be saved as localStorage or sessionStorage.
+ `ajax(options)` - Either a passthrough to jQuery `ajax` or calls `cachedAjax` if the `cache` option is used.
