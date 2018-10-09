import Vue from 'vue';
import Layernative from '../../src/components/layernative.vue';

describe('showName.vue', function() {
    const layernative = Vue.extend(Layernative);

    it('data必须是函数', function() {
        expect(typeof Layernative.data).to.equal('function');
    });

    it('带数据实例化后数据无误', () => {
        testLayer((layer) => {
            expect(layer).to.deep.include({
                effect: 'fade',
                coverhidden: true,
                singlebtnclass: 'f_btn',
                title: '标题',
                content: '内容',
                btn: [{
                    word: '我知道了'
                }],
                layerClass: '',
                containerStyles: {}
            });

            expect(layer.config).to.include({
                effect: 'fade',
                coverHidden: true,
                singleBtnClass: 'f_btn'
            });
        }, {
            propsData: {
                effect: 'fade',
                coverhidden: true,
                singlebtnclass: 'f_btn'
            }
        });
    });

    it('不数据实例化后数据无误', () => {
        testLayer((layer) => {
            expect(layer).to.deep.include({
                effect: 'fade',
                coverhidden: false,
                singlebtnclass: 'layer_btn-red',
                title: '标题',
                content: '内容',
                btn: [{
                    word: '我知道了'
                }],
                layerClass: '',
                containerStyles: {}
            });
        });
    });

    it('弹框出现方法：不带参数的基础使用', () => {
        testLayer((layer) => {
            expect(layer.isShow.status).to.equal(false);
            layer.alert();
            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(layer).to.deep.include({
                title: '',
                content: '',
                layerClass: '',
                containerStyles: {}
            });

            expect(layer.btn[0].word).to.include('我知道了');

            layer.btn[0].callback();
            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });
        });
    });

    it('弹框出现方法：按钮回调及弹框添加classname', () => {
        testLayer((layer) => {
            let isCallbackRun = false;

            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback() {
                        isCallbackRun = true;
                    },
                    callbackHidden: true
                }]
            }, 'layerClass');

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(isCallbackRun).to.equal(false);
            expect(layer).to.deep.include({
                title: 'Hello',
                content: 'World',
                layerClass: 'layerClass',
                containerStyles: {}
            });

            expect(layer.btn[0].word).to.include('按钮一');
            layer.btn[0].callback();

            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });
            expect(isCallbackRun).to.equal(true);

        });
    });

    it('弹框出现方法：按钮触发弹框不消失及弹框添加容器styles', () => {
        testLayer((layer) => {
            let isCallbackRun = false;

            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        isCallbackRun = true;
                    }
                }]
            }, {
                top: '20%'
            });

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(layer).to.deep.include({
                title: 'Hello',
                content: 'World',
                layerClass: '',
                containerStyles: {
                    top: '20%'
                }
            });

            layer.btn[0].callback();
            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });

        });
    });

    it('弹框出现方法：双按钮弹框', () => {
        testLayer((layer) => {
            let isCallbackRun = false;

            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        isCallbackRun = true;
                    }
                }, {
                    word: '按钮二'
                }]
            });

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(layer).to.deep.include({
                title: 'Hello',
                content: 'World',
                layerClass: '',
                containerStyles: {}
            });
            expect(layer.getSingleBtnClass()).to.equal('');

            layer.btn[0].callback();
            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            layer.btn[1].callback();
            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });
        });
    });

    it('弹框出现方法：双按钮弹框', () => {
        testLayer((layer) => {
            let isCallbackRun = false;

            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        isCallbackRun = true;
                    }
                }, {
                    word: '按钮二'
                }]
            });

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(layer).to.deep.include({
                title: 'Hello',
                content: 'World',
                layerClass: '',
                containerStyles: {}
            });

            layer.btn[0].callback();
            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            layer.btn[1].callback();
            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });
        });
    });

    it('弹框出现方法：点击弹框出现弹框-点击按钮弹框消失', () => {
        testLayer((layer) => {
            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        layer.alert({
                            title: '标题一',
                            content: '内容1'
                        });
                    },
                    callbackHidden: true
                }]
            }, 'layer-twice');

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(layer).to.deep.include({
                title: 'Hello',
                content: 'World',
                layerClass: 'layer-twice',
                containerStyles: {}
            });
            expect(layer.btn[0].word).to.equal('按钮一');
            expect(layer.getSingleBtnClass()).to.equal('layer_btn-red');

            layer.btn[0].callback();
            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });

            expect(layer).to.deep.include({
                title: '标题一',
                content: '内容1',
                layerClass: '',
                containerStyles: {}
            });
            expect(layer.btn[0].word).to.equal('我知道了');
            layer.btn[0].callback();

            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });

        });
    });

    it('弹框出现方法：点击弹框出现弹框-点击按钮弹框不消失', () => {
        testLayer((layer) => {
            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        layer.alert({
                            title: '标题一',
                            content: '内容1'
                        });
                    }
                }]
            }, {
                top: '20%'
            });

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(layer).to.deep.include({
                title: 'Hello',
                content: 'World',
                layerClass: '',
                containerStyles: {
                    top: '20%'
                }
            });
            expect(layer.btn[0].word).to.equal('按钮一');

            layer.btn[0].callback();
            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });

            expect(layer).to.deep.include({
                title: '标题一',
                content: '内容1',
                layerClass: '',
                containerStyles: {}
            });
            expect(layer.btn[0].word).to.equal('我知道了');
            layer.btn[0].callback();

            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });
        });
    });

    it('弹框消失方法：点击蒙版弹框不消失', () => {
        testLayer((layer) => {
            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        layer.alert({
                            title: '标题一',
                            content: '内容1'
                        });
                    }
                }]
            }, {
                top: '20%'
            });

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });

            layer.coverHide();

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
        });
    });

    it('弹框消失方法：点击蒙版弹框消失', () => {
        testLayer((layer) => {
            layer.alert({
                title: 'Hello',
                content: 'World',
                btn: [{
                    word: '按钮一',
                    callback: () => {
                        layer.alert({
                            title: '标题一',
                            content: '内容1'
                        });
                    }
                }]
            });

            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            expect(layer.config.coverHidden).to.equal(true);

            layer.coverHide();

            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });
        }, {
            propsData: {
                coverhidden: true
            }
        });
    });

    it('弹框消失方法：hide()', () => {
        testLayer((layer) => {
            let isAfterCallback = false;
            layer.alert();
            expect(layer.isShow).to.include({
                status: true,
                num: 1
            });
            layer.hide();
            expect(layer.isShow).to.include({
                status: false,
                num: 0
            });
            layer.hide();
            layer.hide(() => {
                isAfterCallback = true;
            });
            expect(isAfterCallback).to.equal(true);
        });
    });

    it('长弹框', () => {
        testLayer((layer) => {
            document.getElementsByClassName('layer_content')[0].style.height = '400px';
            let _content = '',
                i = 40;
            while (i--) {
                _content += '<br />';
            }
            layer.alert({
                content: _content
            });

            expect(1).to.equal(1);
        });
    });

    it('测试destroy方法', () => {
        testLayer((layer) => {
            expect(document.getElementsByClassName('layer').length).to.equal(1);
        });
        expect(document.getElementsByClassName('layer').length).to.equal(0);
    });

    function testLayer(testFun, item) {
        const layer = new layernative(item);
        document.body.appendChild(layer.$mount().$el);

        testFun(layer);

        layer.destroy();
    }
});


