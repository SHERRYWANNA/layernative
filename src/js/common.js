function query(e, fa) {
    if (_$) {
        if (!fa) {
            return $(e);
        } else {
            return $(e, fa);
        }
    } else {
        var _fa = fa;
        if (!fa) {
            _fa = document;
        }
        return _fa.querySelectorAll(e);
    }
}

function extend(source, target) {
    if ('object' === typeof target) {
        for (var i in target) {
            source[i] = target[i];
        }
    }
    
    return source;
}

function addEvent(el, event, fun) {
    if (el.attachEvent) {
        el.attachEvent("on" + event, fun);
    } else if (el.addEventListener) {
        el.addEventListener(event, fun, false);
    }
}

function removeEvent(el, event, fun) {
    if (el.attachEvent) {
        el.detachEvent("on" + event, fun);
    } else if (el.addEventListener) {
        el.removeEventListener(event, fun, false);
    }
}

function findParent(dom, parent) {
    var _parent = dom.parentNode;
    if (_parent != document.body && _parent != document.documentElement) {
        if (_parent != parent) {
            return findParent(_parent, parent);
        } else {
            return true;
        }
    }
    return false;
}

export default {
    query,
    extend,
    addEvent,
    removeEvent,
    findParent
};