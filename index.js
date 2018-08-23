var Vue = require('vue');
import layernative from './src/layernative.js';

Vue.use(layernative);

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
                                    console.log(2);
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
        }
    }
});