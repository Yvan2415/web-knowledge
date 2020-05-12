

# Vue知识点总结

[TOC]



### 1.Vue模板语法

```javascript
/*
数据绑定:{{}}
单次绑定: v-once
双向绑定: v-model,延迟更新v-model.lazy
DOM元素绑定属性: v-bind:title => :title 
DOM元素绑定: v-html
事件绑定: v-on:click  => @click
事件修饰符:
	@click.prevent:阻止默认事件
	@keyup.after:键盘监听事件
样式绑定:v-class,v-style
判断:v-if,v-show
循环:v-for  必须绑定:key="index"
*/
```

### 2.vm实例中的钩子函数

```javascript
//directives 和 filters
Vue.directive("focus",{
	//第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作
	bind(el,binding){},
	//被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）
	inserted(el,binding){},
	//被绑定于元素所在的模板更新时调用，而无论绑定值是否变化
	updated(el,binding){}
	//componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
	//unbind:只调用一次，指令与元素解绑时调用
});
//当我们需要简写的时候:
Vue.directive('focus',(el,binding)=>{});//指bind和update两个方法的结合
//指令在用的时候,前面要加一个v,如v-focus;el是目标DOM元素,binding:一个对象(包含诸多属性,如用户传的值)
Vue.filter("filterName",function(data,...args){
	return data;
});

//生命周期函数
 beforeCreate(),created(),beforeMount(),mounted(),beforeUpdate(),updated(),beforeDestroy()destroy()
 //项目实例化最早需要在created里面进行

methods,computed,wacth区别

//methods里面的方法执行一次需要先触发,而computed跟watch是自动触发的
//computed最开始初始化后会放在缓存中,效率高
//watch可以监听路由等,而computed比较适合监听data中的数据
```

### 3.动画

(当某一个元素需要设置动画时,需要用transition包裹起来)

> 1. 动画状态可以有6个class状态 进入的状态:v-enter -> v-enter-active ->v-enter-to 离开的状态:v-leave -> v-leave-active ->v-leave-to
>
>    *在transition包裹中,vue会自动给元素加上以上类名,我们只需要在给他们添加样式即可* *如果不想要v-开头,在标签上加上 name="...",类名就就以...开头*
>
> 2. 我们也可以通过transition上的属性添加样式

```vue
<transition 
            enter-active-class="className" 
            leave-active-class='className'
            :duration="2000">
    <h1 v-if="flag">这个是一个H1</h1>
</transition>
```

> 通过钩子函数绑定样式 在methods属性中添加: 
>
> beforeEnter(el),enter(el,done),afterEnter(el) beforeEnter:位置初始化;enter:样式改变,done回调afterEnter,这里需要注意的是要加el.offsetWidth; 不然动画效果不执行;afterEnter:元素状态的改变

#### 列表动画

> 1. 用transition-group绑定元素
> 2. 必须要给每一个子元素设置:key属性
> 3. appear,元素初始化,入场时的动画 tag="ul" 将默认元素改变
>
> **如果需要动画效果,可以加transition,mode="out-in":先出再进**

#### 4.render方法

```
1. render方法的实质就是生成template模板； 
2. 通过调用一个方法来生成，而这个方法是通过render方法的参数传递给它的； 
3. 这个方法有三个参数，分别提供标签名，标签相关属性，标签内部的html内容 
4. 通过这三个参数，可以生成一个完整的木模板
```

> ```
> render 函数`即渲染函数，它是个函数，它的参数也是个函数——即 `createElement
> 
> createElement 是 render 函数 的参数，它本身也是个函数，并且有三个参数。
> 
> createElement 函数的返回值（VNode）
> createElement 函数的返回值是 VNode（即：虚拟节点）。
> 
> createElement 函数的参数（三个）
> 一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数。类型：{String | Object | Function}。必需。
> 一个包含模板相关属性的数据对象你可以在 template 中使用这些特性。类型：{Object}。可选。
> 子虚拟节点 (VNodes)，由 createElement() 构建而成，也可以使用字符串来生成“文本虚拟节点”。类型：{String | Array}。可选。
> 
> ```

#### *5.Vue.use()*

> 安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
>
> 该方法需要在调用 `new Vue()` 之前被调用。
>
> 当 install 方法被同一个插件多次调用，插件将只会被安装一次。

loading.vue

```vue
<template>
	<div>Loading</div>
</template>
```

index.js

```javascript
import loading from "./loading.vue"
const loading  = {
    install: function(Vue){ //会将vue用参数传入
        Vue.component('Loading',loading);
    }
}
export default loading;
```

main.js

```javascript
import loading from "./component/loading/index.js"
Vue.use(loading);
new Vue({});
```



#### *6.Vue.extend(options)*

> 用法:使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

#### *7.Vue.nextTick*

> 在DOM更新之后立即执行的操作
>
> 在this.$alert()中为了销毁AlertMessage组件,在这个方法中调用

