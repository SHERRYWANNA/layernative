<template>
<div class="layer" :class="[layerClass]" v-show="isShow.status">
    <div class="layer_cover"></div>
    <div class="layer_container" :style="containerStyle">
        <div class="layer_tt" v-html="title"></div>
        <div class="layer_content" v-html="content" ref="content"></div>
        <div class="layer_btnarea">
            <div class="layer_btn" v-for="_btn in btn" @click="_btn.callback" v-html="_btn.word"></div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import Common from './js/common.js';
import PreventMove from './js/preventmove.js';

export default {
    name: 'layernative',
    data() {
        var _that = this;

        return {
            title: '标题',
            content: '内容',
            btn: [{
                word: '我知道了',
                callbackHidden: 1
            }],
            layerClass: '',
            containerStyle: '',
            config: {
                coverHidden: _that.coverhidden,
                time: _that.time,
                effect: _that.effect,
                singleBtnClass: _that.singlebtnclass,
            },
            _$: (window.jQuery || window.Zepto ? true : false),
            isShow: {
                status: false,
                num: 0,
                addNum() {
                    this.num++;
                },
                reduceNum(limit) {
                    var _limit = limit ? limit : 0;
                    this.num--;
                    if (this.num < _limit) {
                        this.num = _limit;
                    }
                }
            }
        };
    },
    props: {
        coverhidden: {
            type: Boolean,
            default() { 
                return false; 
            }
        },
        time: {
            type: Number,
            default() { 
                return 25e1; 
            }
        },
        effect: {
            type: String,
            default() { 
                return 'fade'; 
            }
        },
        singlebtnclass: {
            type: String,
            default() { 
                return 'layer_btn-red'; 
            }
        }
    },
    methods: {
        init: function(item) {
            Common.extend(this.config, this.item);

            if ('show' === this.config.effect) {
                this.config.time = 0;
            }
            this.addEffect(this.config.effect, this.config.time);
            PreventMove.init(this.$refs.content);

            if (this.config.coverHidden) {
                Common.addEvent(cover, 'click', function() {
                    this.isShow.num = 1;
                    this.hide();
                }.bind(this));
            }
        },
        alert: function(render, style, testItem) {
            var _testItem = {
                    afterShow() {},
                    afterHide() {}
                },
                _render = {
                    title: '',
                    word: '',
                    btn: [{
                        word: '我知道了',
                        callbackHidden: 1
                    }]
                };

            Common.extend(_testItem, testItem);
            Common.extend(_render, render);


            for (var i = 0; i < _render.btn.length; i++) {
                _render.btn.push(resetBtn(_render.btn[i].word, _render.btn[i].callback, _render.btn[i].callbackHidden).bind(this));
            }

            Common.extend(this, _render);
            this.show(style, _testItem.afterShow);

            PreventMove.isAddScroll();
           
            function resetBtn(word = '', callback, callbackHidden) {
                callback = () => {
                    if (callback) {
                        if (callbackHidden) {
                            this.hide(_testItem.afterHide);
                        } else {
                            this.isShow.reduceNum(1);
                        }

                        callback();
                    } else {
                        this.hide(_testItem.afterHide);
                    }
                };

                return {
                    word,
                    callback
                };
            }
        },
        show: function(style, afterDisplay) {
            this.addStyle(style);

            if (!this.isShow.status) {
                this.isShow.addNum();
                this.isShow.status = true;
            }
            $(cover).layerEffectIn(this.config.time);
            $(container).layerEffectIn(this.config.time, afterDisplay);
        },
        hide: function(afterDisplay) {
            this.isShow.reduceNum();
            this.isShow.status = false;
            if (!this.isShow.num) {
                $(cover).LayerEffectOut(this.config.time); 
                $(container).LayerEffectOut(this.config.time, function(){
                    content.innerHTML = '';
                    tt.innerHTML = '';
                    if (afterDisplay) {
                        afterDisplay();
                    }
                }, 1);
            }
        },
        clearStyle: function() {
            var _style = $(container).attr('style'),
                _reg = /display:(\s)?.+?($|;)/;

            if (_reg.test(_style)) {
                _style = _style.match(_reg)[0];
                $(container).attr('style', _style);
            }
            
            this.layerClass = '';
        },
        addStyle: function(style) {
            this.clearStyle();

            if ('object' === typeof style) {
                this.containerStyle = style;
            } else if ('string' === typeof style) {
                this.layerClass = style;
            }
        },
        destroy: function(callback = () => {}) {
            if (this.isShow.status) {
                $(container).LayerEffectOut(this.config.time, function(){
                    alertBox.parentNode.removeChild(alertBox);
                    callback();
                });
            } else {
                alertBox.parentNode.removeChild(alertBox);
                callback();
            }
        },
        addEffect(effect, time) {
            if (this._$) {
                $.Common.extend($.fn, {
                    layerEffectIn: function(time, callback) {
                        if (effect === 'fade') {
                            $(this).fadeIn(time, callback);
                        } else {
                            $(this).show(time, callback);
                        }
                        return this;
                    },
                    LayerEffectOut: function(time, callback) {
                        if (effect === 'fade') {
                            $(this).fadeOut(time, callback);
                        } else {
                            $(this).hide(time, callback);
                        }
                        return this;
                    }
                });
            }
        },
        addOriginFun() {
            if (!this._$) {
                window.$ = function(el) {
                    var obj = {
                        el: typeof el !== 'object' ? Common.query(el) : el.constructor === NodeList ? el : [el],
                        fade(status, time, callback) {
                            var _status = 'none';
                            if (status === 'in') {
                                _status = 'block';
                            }
                            this.css('display', _status);
                            if (callback) {
                                if (time) {
                                    setTimeout(callback, time);
                                } else {
                                    callback();
                                }
                            }
                            return this;
                        },
                        show(time, callback) {
                            this.fade('in', time, callback);
                            return this;
                        },
                        hide(time, callback) {
                            this.fade('out', time, callback);
                            return this;
                        },
                        css(name, value) {
                            if (value) {
                                this.domsEvent(function() {
                                    this.style[name] = value;
                                });
                            } else {
                                return getComputedStyle(this.el[0], null).getPropertyValue(name);
                            }
                            return this;
                        },
                        attr(name, value) {
                            if (value) {
                                this.domsEvent(function() {
                                    this.setAttribute(name, value);
                                });
                            } else {
                                return this.el[0].getAttribute(name);
                            }
                            return this;
                        },
                        domsEvent(fun) {
                            for (var i = 0; i < this.el.length; i++) {
                                fun.call(this.el[i]);
                            }
                        }
                    };
                    obj.layerEffectIn = obj.show;
                    obj.LayerEffectOut = obj.hide;

                    return obj;
                };

                window.$.constructor = 'layernative';
            }
        },
        isSingleBtn() {
            if (1 === this.btn.length && this.config.singleBtnClass) {
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.addOriginFun();
        this.init(this.item);
    }
};
</script>

<style scoped src="./css/index.css"></style>