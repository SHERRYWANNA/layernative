# layernative

尝试自己将弹框改成vue插件。

仍在开发中，初级雏形！！！

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

 var Vue = require('vue');

 import layernative from './src/layernative.js';

 Vue.use(layernative);

 

``` 
// eg.
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




参考文档：

[Vue.js 组件编码规范](https://zhuanlan.zhihu.com/p/25654116)  
