var preventMove = {
    scroll: false,
    status: false,
    startY: 0,
    init: function(box, content) {
        this.box = box;
        this.content = content;
        this.addEvent();
    },
    fun: function(e) {
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
    addEvent: function() {
        addEvent(this.content, 'touchstart', 
            function(e) {
                var _event = e || event;
                preventMove.status = true;
                preventMove.startY = _event.targetTouches[0].pageY;
            }
        );
        addEvent(this.content, 'touchend', 
            function() {
                preventMove.status = false;
            }
        );
        addEvent(this.box, 'touchmove', this.fun.bind(this));
    },
    isAddScroll: function() {
        if (this.content.scrollHeight > this.content.clientHeight) {
            this.scroll = true;
        } else {
            this.scroll = false;
        }
    }
};

export default preventMove;