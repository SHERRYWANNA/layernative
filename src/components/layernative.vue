<template>
<transition 
    :name="config.effect" 
    @after-enter="layerEnter"
>
<div 
    class="layer" 
    :class="[layerClass]" 
    v-show="isShow.status"
>
    <div 
        class="layer_cover" 
        @click="coverHide" 
        @touchmove.prevent
    ></div>
    <div 
        class="layer_container" 
        :style="containerStyles"
    >
        <div 
            class="layer_tt" 
            v-html="title" 
            @touchmove.prevent
        ></div>
        <div 
            class="layer_content" 
            v-html="content" 
            ref="content"
        >
            <slot></slot>
        </div>
        <div 
            class="layer_btnarea" 
            @touchmove.prevent
        >
            <div 
                class="layer_btn" 
                v-for="item in btn" 
                @click="btnCallback(item.callback)" 
                :class="[getSingleBtnClass()]" 
                v-html="item.word"
            ></div>
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
        },
        tipsConfig: {
            type: Object
        },
        toastTime: {
            type: Number,
            default() {
                return 3e3;
            }
        }
    },

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
            },

            tipsTimer: null
        };
    },
    
    mounted() {
        this.init(this.item);
    },
    destroyed() {
        this.$el.remove();
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
            clearTimeout(this.tipsTimer);

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
                let btnConfig = resetBtn.call(
                    this, 
                    _render.btn[i].word, 
                    _render.btn[i].callback, 
                    _render.btn[i].callbackHidden
                );
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

        tips(content) {
            let config = {
                title: '提示',
                btnWord: '我知道了'
            };

            Common.extend(config, this.tipsConfig);

            this.alert({
                title: config.title,
                content,
                btn: [{
                    word: config.btnWord
                }]
            });
        },

        toast(content) {
            this.alert({
                title: '',
                content
            }, 'layer-toast');

            this.tipsTimer = setTimeout(() => {
                this.hide();
            }, this.toastTime);
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
        },

        btnCallback(callback) {
            if (callback) {
                callback();
            }
        }
    }

    
};
</script>

<style src="../styles/index.css" scoped></style>