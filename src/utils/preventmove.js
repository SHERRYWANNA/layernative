import Common from './common.js';

/* istanbul ignore next */
var preventMove = {
    scroll: false,
    status: false,
    startY: 0,
    init(content) {
        // this.box = box;
        this.content = content;
        this.addEvent();
    },
    fun(e) {
        var _event = e || event;

        if (this.scroll && this.status) {
            var _py = e.targetTouches[0].pageY,
                _ch = this.content.clientHeight,
                _sh = this.content.scrollHeight,
                _st = this.content.scrollTop;

            if (_st === 0 && _py > this.startY) {
                _event.preventDefault();
                return;
            } else if (_ch + _st >= _sh && _py < this.startY) {
                _event.preventDefault();
                return;
            }
        } else {
            _event.preventDefault();
            return;
        }
    },
    addEvent() {
        Common.addEvent(this.content, 'touchstart', 
            function(e) {
                var _event = e || event;
                preventMove.status = true;
                preventMove.startY = _event.targetTouches[0].pageY;
            }
        );
        Common.addEvent(this.content, 'touchend', 
            function() {
                preventMove.status = false;
            }
        );
        // Common.addEvent(this.box, 'touchmove', this.fun.bind(this));
        Common.addEvent(this.content, 'touchmove', this.fun.bind(this));
    },
    isAddScroll() {
        if (this.content.scrollHeight > this.content.clientHeight) {
            this.scroll = true;
        } else {
            this.scroll = false;
        }
    }
};

export default preventMove;