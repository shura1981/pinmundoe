'use strict';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
/**
 * @description proceso que se ejecuta al cargar la pagina y resetea el scroll
 */
export const restarScroll = () => {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }
}
/**
 * 
 * @param {String} url url del archivo js a cargar
 * @returns una promesa que se resuelve cuando el archivo se ha cargado
 */
export const loadScript = url => {
    return new Promise(function (resolve, reject) {
        const s = document.createElement('script');
        let r = false;
        s.type = 'text/javascript';
        s.src = src;
        s.defer = true;
        s.onerror = function (err) {
            reject(err, s);
        };
        s.onload = s.onreadystatechange = function () {
            // console.log(this.readyState); // uncomment this line to see which ready states are called.
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                resolve("ok");
            }
        };
        const t = document.getElementsByTagName('script')[0];
        t.parentElement.insertBefore(s, t);
    });
}
/**
 * 
 * @param {String} url url del archivo css a cargar 
 * @returns una promotora que se resuelve cuando el archivo se ha cargado
 */
export const fetchStyle = (url) => {
    //https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
    return new Promise((resolve, reject) => {
        let link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.onload = function () {
            resolve("ok");
            // console.log("style has loaded");
            //Can add setTimeout to attempt to wait for the styles to be applied to DOM
        };
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    });
}
export const instersectionObserver = (
    {
        classTarget,
        callbackIntersecting = null,
        callbackNotIntersecting = null,
        disconnect = false,
        threshold = 0,
        rootMargin = {
            top: '0px',
            bottom: '-10%',
            left: '0px',
            right: '0px'
        }
    }
) => {
    if (classTarget === undefined) throw new Error("No se ha definido el elemento a observar");
    const options = {
        threshold: threshold,
        rootMargin: `${rootMargin.top} ${rootMargin.right} ${rootMargin.bottom} ${rootMargin.left}`
    }
    const targets = document.querySelectorAll(classTarget);
    const lazyLoad = target => {
        const io = new IntersectionObserver(entries => {
            let item = entries[0].target;
            if (entries[0].isIntersecting === true) {
                console.log("intersecting");
                if (callbackIntersecting) callbackIntersecting(item);
                if (disconnect) io.disconnect();
            } else {
                if (callbackNotIntersecting) callbackNotIntersecting(item);
            }
        }, options);
        io.observe(target);
    }
    targets.forEach(lazyLoad);
}
/**
 * Carga perezosa de los videos de youtube cuando se visualizan en la pantalla
 */
export const ControlYoutube = () => {
    const options = {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px"
    }
    const targets = document.querySelectorAll('[data-src]');
    const lazyLoad = target => {
        const io = new IntersectionObserver(entries => {
            let video = entries[0].target;
            if (entries[0].isIntersecting === true) {
                video.setAttribute("src", video.dataset.src);

            }
        }, options
        );
        io.observe(target);
    }
    targets.forEach(lazyLoad);
}
/**
 * Método que habilita el scroll suave en los enlaces internos de la pagina y que da soporte a safari
 */
const smoothScroll = () => {
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());

}
/**
 * Método que habilita el scroll suave en los enlaces internos de la pagina y que da soporte a navegadores antigüos
 */
const polyfillSooothScroll = () => {
    // polyfill
    function polyfill() {
        // aliases
        var w = window;
        var d = document;

        // return if scroll behavior is supported and polyfill is not forced
        if (
            'scrollBehavior' in d.documentElement.style &&
            w.__forceSmoothScrollPolyfill__ !== true
        ) {
            return;
        }

        // globals
        var Element = w.HTMLElement || w.Element;
        var SCROLL_TIME = 468;

        // object gathering original scroll methods
        var original = {
            scroll: w.scroll || w.scrollTo,
            scrollBy: w.scrollBy,
            elementScroll: Element.prototype.scroll || scrollElement,
            scrollIntoView: Element.prototype.scrollIntoView
        };

        // define timing method
        var now =
            w.performance && w.performance.now
                ? w.performance.now.bind(w.performance)
                : Date.now;

        /**
         * indicates if a the current browser is made by Microsoft
         * @method isMicrosoftBrowser
         * @param {String} userAgent
         * @returns {Boolean}
         */
        function isMicrosoftBrowser(userAgent) {
            var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

            return new RegExp(userAgentPatterns.join('|')).test(userAgent);
        }

        /*
         * IE has rounding bug rounding down clientHeight and clientWidth and
         * rounding up scrollHeight and scrollWidth causing false positives
         * on hasScrollableSpace
         */
        var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

        /**
         * changes scroll position inside an element
         * @method scrollElement
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function scrollElement(x, y) {
            this.scrollLeft = x;
            this.scrollTop = y;
        }

        /**
         * returns result of applying ease math function to a number
         * @method ease
         * @param {Number} k
         * @returns {Number}
         */
        function ease(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }

        /**
         * indicates if a smooth behavior should be applied
         * @method shouldBailOut
         * @param {Number|Object} firstArg
         * @returns {Boolean}
         */
        function shouldBailOut(firstArg) {
            if (
                firstArg === null ||
                typeof firstArg !== 'object' ||
                firstArg.behavior === undefined ||
                firstArg.behavior === 'auto' ||
                firstArg.behavior === 'instant'
            ) {
                // first argument is not an object/null
                // or behavior is auto, instant or undefined
                return true;
            }

            if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
                // first argument is an object and behavior is smooth
                return false;
            }

            // throw error when behavior is not supported
            throw new TypeError(
                'behavior member of ScrollOptions ' +
                firstArg.behavior +
                ' is not a valid value for enumeration ScrollBehavior.'
            );
        }

        /**
         * indicates if an element has scrollable space in the provided axis
         * @method hasScrollableSpace
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function hasScrollableSpace(el, axis) {
            if (axis === 'Y') {
                return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
            }

            if (axis === 'X') {
                return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
            }
        }

        /**
         * indicates if an element has a scrollable overflow property in the axis
         * @method canOverflow
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function canOverflow(el, axis) {
            var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

            return overflowValue === 'auto' || overflowValue === 'scroll';
        }

        /**
         * indicates if an element can be scrolled in either axis
         * @method isScrollable
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function isScrollable(el) {
            var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
            var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

            return isScrollableY || isScrollableX;
        }

        /**
         * finds scrollable parent of an element
         * @method findScrollableParent
         * @param {Node} el
         * @returns {Node} el
         */
        function findScrollableParent(el) {
            while (el !== d.body && isScrollable(el) === false) {
                el = el.parentNode || el.host;
            }

            return el;
        }

        /**
         * self invoked function that, given a context, steps through scrolling
         * @method step
         * @param {Object} context
         * @returns {undefined}
         */
        function step(context) {
            var time = now();
            var value;
            var currentX;
            var currentY;
            var elapsed = (time - context.startTime) / SCROLL_TIME;

            // avoid elapsed times higher than one
            elapsed = elapsed > 1 ? 1 : elapsed;

            // apply easing to elapsed time
            value = ease(elapsed);

            currentX = context.startX + (context.x - context.startX) * value;
            currentY = context.startY + (context.y - context.startY) * value;

            context.method.call(context.scrollable, currentX, currentY);

            // scroll more if we have not reached our destination
            if (currentX !== context.x || currentY !== context.y) {
                w.requestAnimationFrame(step.bind(w, context));
            }
        }

        /**
         * scrolls window or element with a smooth behavior
         * @method smoothScroll
         * @param {Object|Node} el
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function smoothScroll(el, x, y) {
            var scrollable;
            var startX;
            var startY;
            var method;
            var startTime = now();

            // define scroll context
            if (el === d.body) {
                scrollable = w;
                startX = w.scrollX || w.pageXOffset;
                startY = w.scrollY || w.pageYOffset;
                method = original.scroll;
            } else {
                scrollable = el;
                startX = el.scrollLeft;
                startY = el.scrollTop;
                method = scrollElement;
            }

            // scroll looping over a frame
            step({
                scrollable: scrollable,
                method: method,
                startTime: startTime,
                startX: startX,
                startY: startY,
                x: x,
                y: y
            });
        }

        // ORIGINAL METHODS OVERRIDES
        // w.scroll and w.scrollTo
        w.scroll = w.scrollTo = function () {
            // avoid action when no arguments are passed
            if (arguments[0] === undefined) {
                return;
            }

            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0]) === true) {
                original.scroll.call(
                    w,
                    arguments[0].left !== undefined
                        ? arguments[0].left
                        : typeof arguments[0] !== 'object'
                            ? arguments[0]
                            : w.scrollX || w.pageXOffset,
                    // use top prop, second argument if present or fallback to scrollY
                    arguments[0].top !== undefined
                        ? arguments[0].top
                        : arguments[1] !== undefined
                            ? arguments[1]
                            : w.scrollY || w.pageYOffset
                );

                return;
            }

            // LET THE SMOOTHNESS BEGIN!
            smoothScroll.call(
                w,
                d.body,
                arguments[0].left !== undefined
                    ? ~~arguments[0].left
                    : w.scrollX || w.pageXOffset,
                arguments[0].top !== undefined
                    ? ~~arguments[0].top
                    : w.scrollY || w.pageYOffset
            );
        };

        // w.scrollBy
        w.scrollBy = function () {
            // avoid action when no arguments are passed
            if (arguments[0] === undefined) {
                return;
            }

            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0])) {
                original.scrollBy.call(
                    w,
                    arguments[0].left !== undefined
                        ? arguments[0].left
                        : typeof arguments[0] !== 'object' ? arguments[0] : 0,
                    arguments[0].top !== undefined
                        ? arguments[0].top
                        : arguments[1] !== undefined ? arguments[1] : 0
                );

                return;
            }

            // LET THE SMOOTHNESS BEGIN!
            smoothScroll.call(
                w,
                d.body,
                ~~arguments[0].left + (w.scrollX || w.pageXOffset),
                ~~arguments[0].top + (w.scrollY || w.pageYOffset)
            );
        };

        // Element.prototype.scroll and Element.prototype.scrollTo
        Element.prototype.scroll = Element.prototype.scrollTo = function () {
            // avoid action when no arguments are passed
            if (arguments[0] === undefined) {
                return;
            }

            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0]) === true) {
                // if one number is passed, throw error to match Firefox implementation
                if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
                    throw new SyntaxError('Value could not be converted');
                }

                original.elementScroll.call(
                    this,
                    // use left prop, first number argument or fallback to scrollLeft
                    arguments[0].left !== undefined
                        ? ~~arguments[0].left
                        : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
                    // use top prop, second argument or fallback to scrollTop
                    arguments[0].top !== undefined
                        ? ~~arguments[0].top
                        : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
                );

                return;
            }

            var left = arguments[0].left;
            var top = arguments[0].top;

            // LET THE SMOOTHNESS BEGIN!
            smoothScroll.call(
                this,
                this,
                typeof left === 'undefined' ? this.scrollLeft : ~~left,
                typeof top === 'undefined' ? this.scrollTop : ~~top
            );
        };

        // Element.prototype.scrollBy
        Element.prototype.scrollBy = function () {
            // avoid action when no arguments are passed
            if (arguments[0] === undefined) {
                return;
            }

            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0]) === true) {
                original.elementScroll.call(
                    this,
                    arguments[0].left !== undefined
                        ? ~~arguments[0].left + this.scrollLeft
                        : ~~arguments[0] + this.scrollLeft,
                    arguments[0].top !== undefined
                        ? ~~arguments[0].top + this.scrollTop
                        : ~~arguments[1] + this.scrollTop
                );

                return;
            }

            this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior
            });
        };

        // Element.prototype.scrollIntoView
        Element.prototype.scrollIntoView = function () {
            // avoid smooth behavior if not required
            if (shouldBailOut(arguments[0]) === true) {
                original.scrollIntoView.call(
                    this,
                    arguments[0] === undefined ? true : arguments[0]
                );

                return;
            }

            // LET THE SMOOTHNESS BEGIN!
            var scrollableParent = findScrollableParent(this);
            var parentRects = scrollableParent.getBoundingClientRect();
            var clientRects = this.getBoundingClientRect();

            if (scrollableParent !== d.body) {
                // reveal element inside parent
                smoothScroll.call(
                    this,
                    scrollableParent,
                    scrollableParent.scrollLeft + clientRects.left - parentRects.left,
                    scrollableParent.scrollTop + clientRects.top - parentRects.top
                );

                // reveal parent in viewport unless is fixed
                if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
                    w.scrollBy({
                        left: parentRects.left,
                        top: parentRects.top,
                        behavior: 'smooth'
                    });
                }
            } else {
                // reveal element in viewport
                w.scrollBy({
                    left: clientRects.left,
                    top: clientRects.top,
                    behavior: 'smooth'
                });
            }
        };
    }

    if (typeof exports === 'object' && typeof module !== 'undefined') {
        // commonjs
        module.exports = { polyfill: polyfill };
    } else {
        // global
        polyfill();
    }
}
/**
 * Método para suavizar el scroll
 */
export const groupSmoothScroll = () => {
    smoothScroll();
    polyfillSooothScroll();
}
/**
 * Método para animar elementos al hacer scroll
 * en el elemento poner class="animatedLoad" data-keyframe="fadeInDown" data-duration=".6s" data-delay="0s" data-timing="ease" data-img="img/imagen.jpg"
 */
const animatedLoad = (
    {
        top = '0px',
        bottom = '-10%',
        left = '0px',
        right = '0px',
    }
) => {
    const options = {
        threshold: 0,
        rootMargin: `${top} ${right} ${bottom} ${left}`
    }
    const targets = document.querySelectorAll('.animatedLoad');
    const Load = target => {
        const io = new IntersectionObserver(entries => {
            let item = entries[0].target;
            // console.log(entries[0]);
            if (entries[0].isIntersecting === true) {
                if (item.nodeName === "IMG") {
                    const src = item.getAttribute('data-img');
                    const animation = `${item.dataset.keyframe} ${item.dataset.duration} ${item.dataset.timing} ${item.dataset.delay} forwards`;
                    item.addEventListener("load", (evt) => { item.style.animation = animation; });
                    item.setAttribute('src', src);
                }
                else {
                    const animation = `${item.dataset.keyframe} ${item.dataset.duration} ${item.dataset.timing} ${item.dataset.delay} forwards`;
                    item.style.animation = animation;
                }
                io.disconnect();
            } else item.style.animation = 'none';
        }, options);
        io.observe(target);
    }
    targets.forEach(Load);
}
/**
 * 
 * @param {String} element doom donde se desplazará el scroll
 */
export const smoothScrollElement = (element) => {
    document.querySelector(element).scrollIntoView({ behavior: 'smooth' });
}

// Utilidades para sweetalert2
export const wrapSwal = {
    Toast: MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', MySwal.stopTimer)
            toast.addEventListener('mouseleave', MySwal.resumeTimer)
        }
    }),
    ICON: {
        SUCCESS: 'success',
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info',
        QUESTION: 'question'
    },
    POSITION: {
        TOP: 'top',
        TOP_START: 'top-start',
        TOP_END: 'top-end',
        CENTER: 'center',
        CENTER_START: 'center-start',
        CENTER_END: 'center-end',
        BOTTOM: 'bottom',
        BOTTOM_START: 'bottom-start',
        BOTTOM_END: 'bottom-end'
    },
    showToast: ({ icon, title, position }) => {
        wrapSwal.Toast.fire({
            icon: icon || wrapSwal.ICON.SUCCESS,
            title: title || 'Se ha actualizado el registro',
            position: position || wrapSwal.POSITION.TOP_END,
        });
    },
    showSuccess: (title, message = null) => {
        MySwal.fire({
            icon: 'success',
            title: title,
            text: message,
            showConfirmButton: false,
            timer: 1500
        })
    },
    showErrorFetch: (text) => {
        MySwal.fire({
            icon: 'error',
            title: 'Oops... Ocurrió un error',
            text: text,
        })
    },
    toogleLoading: ({ html = 'Enviando datos...', title = '¡Ya casi está listo!' }) => {
        let swal = null;
        if (swal) {
            swal.close();
            swal = null;
        }
        else {
            swal = MySwal.fire({
                title: title,
                html: html,
                backdrop: true,
                allowOutsideClick: false,
                timerProgressBar: true,
                didOpen: () => {
                    MySwal.showLoading()
                }
            });
        }
    }
}

// peticiones http fectch
export const Http = ({ url, method = 'GET', body = null, headers = null }) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: headers ?? {
                'Content-Type': 'application/json'
            },
            body: method === 'GET' ? null : JSON.stringify(body)
        }).then(async res => {
            if (!res.ok) {
                throw new Error(JSON.stringify(await res.json()));
            }
            return res.json()
        }
        ).then(res => {
            resolve(res)
        }
        ).catch(err => {
            reject(JSON.parse(err.message));
        })
    })
}

// const smoothScrollElement = ({ selector, behavior, block }) => {
//     const element = document.querySelector(selector);
//     element.scrollIntoView({ behavior, block });
//   }
// Takes the viewport widths in pixels and the font sizes in rem
function clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize, pixelsPerRem = 16) {

    const minWidth = minWidthPx / pixelsPerRem;
    const maxWidth = maxWidthPx / pixelsPerRem;

    const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
    const yAxisIntersection = -minWidth * slope + minFontSize

    return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSize}rem )`;
}

// clampBuilder( 360, 840, 1, 3.5 ) -> "clamp( 1rem, -0.875rem + 8.333vw, 3.5rem )"
// clamp( 1rem, -0.875rem + 8.333333333333332vw, 3.5rem )

// console.log(clampBuilder(375, 1366, 2, 3.5));