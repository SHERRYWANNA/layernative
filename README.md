# layernative

简单的vue弹框插件。

已完成！ 基础功能ok！

简单使用：

    安装： 根目录下执行 npm install
    环境： npm run server (开发环境)
    webpack没有打开open开关所以不会自动打开浏览器，具体页面访问本地服务器http://localhost:8080/index.html。
使用语法：

    this.$layernative.alert(render);
    render: {                     // Object 弹框渲染内容
        title: '标题',            // String 弹框标题
        content: '内容',          // String 弹框内容
        btn: [{                   // Array 按钮数组
            word: '按钮文字',           // String 按钮文字
            callback: () => {          // Function 点击按钮回调函数
                console.log('回调函数');
            },
            callbackHidden: ture       // boolean 点击弹框是否会消失
        }]
    }
例子：
``` 
var Vue = require('vue');
import layernative from '@ths/layernative.js';
Vue.use(layernative);

// eg.（实例中使用
this.$layernative.alert({
​    title: '标题',
​    content: '内容',
​    btn: [{
​        word: '按钮文字',
​        callback: () => {
​            console.log('回调函数');
​        },
​        callbackHidden: ture
​    }]
});
```