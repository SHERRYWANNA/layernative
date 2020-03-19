var Vue = require('vue');
import layernative from '../../src/index.js';

Vue.use(layernative, {
    effect: 'fade',
    coverhidden: true,
    singlebtnclass: 'f_btn',
    toastTime: 1e3,
    tipsConfig: {
        title: '233',
        btnWord: '你不知道'
    }
});

var container = new Vue({
    el: '.container',
    methods: {
        layerTextComboLayer() {
            this.$layernative.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        this.$layernative.alert({
                            title: '标题二',
                            btn: [{
                                word: '按钮二',
                                callback: () => {
                                    this.$layernative.hide();
                                }
                            }]
                        });
                    }
                }]
            });
        },
        layerTextKeepAlive() {
            this.$layernative.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        console.log(1);
                    }
                }]
            });
        },
        layerTextTwoBtn() {
            this.$layernative.alert({
                title: '标题一',
                btn: [{
                    word: '按钮一'
                }, {
                    word: '按钮二'
                }],
                coverHidden: true
            });
        },
        layerTextCoverKeepAlive() {
            this.$layernative.alert({
                title: '标题一',
                btn: [{
                    word: '按钮一'
                }, {
                    word: '按钮二'
                }],
                coverHidden: false
            });
        },
        layerTextLongContent() {
            this.$layernative.alert({
                title: '标题一',
                content: '章鱼小丸子，<b>紫菜</b>，奥尔良烤翅，各类慕斯，黑森林，布朗尼，提拉米苏，牛排，牛肉干，奶昔，奶茶，双皮奶，手抓饼，巧克力，咖喱鱼丸，鱼腐，寿司，北极贝，三文鱼，天妇罗，黑轮，冰激凌，炒面，三文治，鸡翅，意大利面，烧烤，鳗鱼饭三吃，拉面，熟寿司，荞麦面，咚咚烧  三阳开泰 蜜三刀 砂锅三鲜 四季豆 四宝菜 五花肉 五香鳝片',
                btn: [{
                    word: '按钮一'
                }, {
                    word: '按钮二'
                }]
            }, 'layer-long');
        },

        layerTips() {
            this.$layernative.tips('你知道个啥哦');
        },

        layerToast() {
            this.$layernative.toast('toast你知个啥哦');
        },

        destroy() {
            this.$layernative.destroy();
        }
    }
});