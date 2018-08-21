import layernative from './layernative.vue';
var Vue = require('vue');

console.log(layernative);
var container = new Vue({
    el: '.container',
    components: {
        layer: layernative
    },
    methods: {
        layerText() {
            layernative.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '吃多了吗',
                    callback() {
                        layernative.alert({
                            word: '是啊'
                        });
                    }
                }]
            });
        }
    }
});

