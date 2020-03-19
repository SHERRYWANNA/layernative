import Layernative from './components/layernative.vue';

const Layer = {
    // 注册
    install(Vue, option) {
        // 生成一个Vue的子类
        // 同时这个子类也就是组件
        const layernative = Vue.extend(Layernative);
        const layer = new layernative({
            propsData: option
        });
        // 实例挂载
        document.body.appendChild(layer.$mount().$el);
        
        // 注册$layernative方法
        Vue.prototype.$layernative = layer;
    }
};

export default Layer;
