# layernative

#### 简单的vue弹框插件

###### npm包名： @arni/vue-layernative

**demo地址**：<https://sherrywanna.github.io/layernative/examples/index.html



##### 简单使用：

    安装： 根目录下执行 npm install
    环境： npm run server (开发环境)
    webpack没有打开open开关所以不会自动打开浏览器，具体页面访问本地服务器http://localhost:8080/examples/index.html。

##### 使用语法：

    interface BtnItem {
    	word: string,           	// 按钮文字
        callback(): void;       	// Function 点击按钮回调函数
        callbackHidden: boolean     // boolean 点击按钮后弹框是否会消失
    }
    
    interface Render {
      	title: string,            // 弹框标题
        content: string,          // 弹框内容
        btn: BtnItem[]            // Array 按钮数组
    }
    
    /**
     * @param {string} className 给弹框最外层div添加的class属性
     */
    this.$layernative.alert(render: Render, className: string);
###### 例子：

``` 
var Vue = require('vue');
import layernative from '@arni/vue-layernative';
Vue.use(layernative);

// eg.普通弹窗
this.$layernative.alert({
    title: '标题',
    content: '内容',
    btn: [{
        word: '按钮文字',
        callback: () => {
            console.log('回调函数');
        },
        callbackHidden: ture
    }]
}, 'layer-tips');

// eg.toast
this.$layernative.toast('toast');

// eg.tips
this.$layernative.tips('tips')
```

#### 兼容
兼容至es2015

#### 版本更新
- 1.0.4
  - 添加 toast 方法和 tips 方法
  - 添加 scoped 控制样式
- 1.0.3 - deprecate
  - "Unable to use, dist generated is a test version"
- 1.0.2
  - webpack导出umd格式
  - 添加uglify压缩js
- 1.0.1
  - 添加弹框内content滑动事件，阻止除了content以外的弹框内容滑动事件
  - 添加content内的插槽
- 1.0.0

