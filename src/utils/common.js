function extend(source, target) {
    if ('object' === typeof target) {
        for (var i in target) {
            source[i] = target[i];
        }
    }
    
    return source;
}

/* istanbul ignore next */
function addEvent(el, event, fun) {
    if (el.attachEvent) {
        el.attachEvent("on" + event, fun);
    } else if (el.addEventListener) {
        el.addEventListener(event, fun, false);
    }
}

/* istanbul ignore next */
function removeEvent(el, event, fun) {
    if (el.attachEvent) {
        el.detachEvent("on" + event, fun);
    } else if (el.addEventListener) {
        el.removeEventListener(event, fun, false);
    }
}

export default {
    extend,
    addEvent,
    removeEvent
};