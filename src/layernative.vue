<template>
<transition name="fade">
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
</transition>
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
                    content: '',
                    btn: [{}]
                };

            Common.extend(_testItem, testItem);
            Common.extend(_render, render);

            for (var i = 0; i < _render.btn.length; i++) {
                let btnConfig = resetBtn.call(this, _render.btn[i].word, _render.btn[i].callback, _render.btn[i].callbackHidden);
                Common.extend(_render.btn[i], btnConfig);
            }

            Common.extend(this, _render);
            this.show(style, _testItem.afterShow);

            PreventMove.isAddScroll();
           
            function resetBtn(word = '我知道了', callback, callbackHidden) {
                let _callback = () => {
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
                    callback: _callback
                };
            }
        },
        show: function(style, afterDisplay) {
            this.addStyle(style);
            if (!this.isShow.status) {
                this.isShow.addNum();
                this.isShow.status = true;
            }
            afterDisplay();
            // $(cover).layerEffectIn(this.config.time);
            // $(container).layerEffectIn(this.config.time, afterDisplay);
        },
        hide: function(afterDisplay) {
            this.isShow.reduceNum();
            this.isShow.status = false;
            if (!this.isShow.num) {
                if (afterDisplay) {
                    afterDisplay();
                }
            }
        },
        clearStyle: function() {
            this.containerStyle = '';
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
        isSingleBtn() {
            if (1 === this.btn.length && this.config.singleBtnClass) {
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.init(this.item);
    }
};
</script>

<style src="./css/index.css"></style>