/**
 * 防止某些浏览器因缺少console对象抛异常
 */
var method;
var noop = function () {};
var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
];
var length = methods.length;

while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
}

if ((typeof module !== "undefined" && module !== null) && module.exports) {
    exports = module.exports = console;
} else {
    window.console = console;
}