<template>
<transition :name="config.effect" @after-enter="layerEnter">
<div class="layer" :class="[layerClass]" v-show="isShow.status">
    <div class="layer_cover" @click="coverHide" @touchmove.prevent></div>
    <div class="layer_container" :style="containerStyles">
        <div class="layer_tt" v-html="title" @touchmove.prevent></div>
        <div class="layer_content" v-html="content" ref="content">
            <slot></slot>
        </div>
        <div class="layer_btnarea" @touchmove.prevent>
            <div class="layer_btn" v-for="_btn in btn" @click="_btn.callback" :class="[getSingleBtnClass()]" v-html="_btn.word"></div>
        </div>
    </div>
</div>
</transition>
</template>

<script type="text/javascript">
import Common from '../utils/common.js';
import PreventMove from '../utils/preventmove.js';

export default {
    name: 'layernative',
    data() {
        var _that = this;
        return {
            title: '标题',
            content: '内容',
            btn: [{
                word: '我知道了'
            }],
            layerClass: '',
            containerStyles: {},
            isCoverHide: this.coverhidden,
            config: {
                coverHidden: _that.coverhidden,
                time: _that.time,
                effect: _that.effect,
                singleBtnClass: _that.singlebtnclass,
            },
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
        coverHide() {
            if (this.isCoverHide) {
                this.isShow.num = 1;
                this.hide();
            }
        },
        init(item) {
            Common.extend(this.config, this.item);

            PreventMove.init(this.$refs.content);
        },
        alert(render, style, testItem) {
            var _testItem = {
                    afterShow() {},
                    afterHide() {}
                },
                _render = {
                    title: '',
                    content: '',
                    btn: [{}],
                    coverHidden: this.config.coverHidden
                };

            Common.extend(_testItem, testItem);
            Common.extend(_render, render);

            this.isCoverHide = _render.coverHidden;

            for (var i = 0; i < _render.btn.length; i++) {
                let btnConfig = resetBtn.call(this, _render.btn[i].word, _render.btn[i].callback, _render.btn[i].callbackHidden);
                Common.extend(_render.btn[i], btnConfig);
            }

            Common.extend(this, _render);
            this.show(style, _testItem.afterShow);

           
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
        layerEnter() {
            PreventMove.isAddScroll();
        },
        show(style, afterDisplay) {
            this.addStyle(style);
            if (!this.isShow.status) {
                this.isShow.addNum();
                this.isShow.status = true;
            }
            afterDisplay();
        },
        hide(afterDisplay) {
            this.isShow.reduceNum();
            this.isShow.status = false;
            if (!this.isShow.num) {
                if (afterDisplay) {
                    afterDisplay();
                }
            }
        },
        clearStyle() {
            this.containerStyles = {};
            this.layerClass = '';
        },
        addStyle(style) {
            this.clearStyle();

            if ('object' === typeof style) {
                this.containerStyles = style;
            } else if ('string' === typeof style) {
                this.layerClass = style;
            }
        },
        destroy(callback = () => {}) {
            this.$destroy();
            callback();
        },
        getSingleBtnClass() {
            if (1 === this.btn.length && this.config.singleBtnClass) {
                return this.config.singleBtnClass;
            }
            return '';
        }
    },
    mounted() {
        this.init(this.item);
    },
    destroyed() {
        this.$el.remove();
    }
};
</script>

<style src="../styles/index.css"></style>