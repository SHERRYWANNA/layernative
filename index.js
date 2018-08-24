var Vue = require('vue');
import layernative from './src/layernative.js';

Vue.use(layernative, {
    effect: 'fade',
    coverhidden: true,
    singlebtnclass: 'f_btn'
});

var container = new Vue({
    el: '.container',
    methods: {
        layerText() {
            this.$layernative.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '吃多了吗',
                    callback: () => {
                        this.$layernative.alert({
                            title: '是啊',
                            btn: [{
                                word: '哦吼？',
                                callback: () => {
                                    this.$layernative.hide();
                                }
                            }]
                        });
                    }
                }]
            });
        },
        layerText1() {
            this.$layernative.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '吃多了吗',
                    callback: () => {
                        console.log(1);
                    }
                }]
            });
        },
        layerText2() {
            this.$layernative.alert({
                title: '吃多了吗',
                btn: [{
                    word: '三天粒米未进'
                }, {
                    word: '嗝~'
                }]
            });
        },
        destroy() {
            this.$layernative.destroy();
        }
    }
});