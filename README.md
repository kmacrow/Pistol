Pistol
======

Pistol is jQuery for browsers that work. I recently came face-to-face with how ruinous using <code>$</code> willy-nilly
in performance critical code can be. After replacing all of my jQuery calls with native alternatives (querySelector, 
querySelectorAll, getComputedStyle, etc.) I decided to build Pistol: an ultra-thin jQuery shim on top of the native APIs.
The rationale is that when my brain wants a DOM element, my fingers type <code>$</code>... and I suspect I'm not alone.

Of course jQuery itself <i>is</i> shrinking these days, but I do a lot of R&D and demo/prototyping work that targets
bleeding edge browsers. Call it WebKit-ism if you must, but it is not your Grandfather's web anymore and this is
not your Grandfather's jQuery: grab <a href="#">pistol-0.0.1.min.js</a> and try it out!

## Status

Pistol does not implement the entire jQuery interface, documentation on precisely what is supported (as well as caveats) will be forthcoming. Pistol is not stable, and not suitable for production environments yet&mdash;feel free to try it out on your dev branch but I wouldn't recommend starting or migrating a serious project to it right now.
