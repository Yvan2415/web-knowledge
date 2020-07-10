

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

### 4.render方法

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

### *5.Vue.use()*

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



### *6.Vue.extend(options)*

> 用法:使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

### *7.Vue.nextTick*

> 在DOM更新之后立即执行的操作
>
> 在this.$alert()中为了销毁AlertMessage组件,在这个方法中调用

### *8.混入mixin*

> 混入(mixin)提供了一种非常灵活的方式,来分发Vue组件中的复用功能;一个混入对象可以包含任意组件选项,当组件使用混入对象时,所有混入对象的选项将被"混合"进入该组件本身的选项

```javascript
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

#### 选项合并

> 当组件和混入对象含有同名选项时,这些选项将以恰当的方式进行"合并"
>
> 比如:数据对象在内部会进行递归合并,并在发生冲突时以数据组件数据有限

```javascript
var mixin = {
    data:function(){
        return {
            message: 'hello',
            foo: 'abc'
        }
    }
}
new Vue({
    mixins: [mixin],
    data:function(){
        return {
            message: 'goodbye',
            bar: 'def'
        }
    },
    created:function(){
        console.log("this.$data");
        // => {message:'goodbye',foo:'abc',bar:'def'}
    }
});
```

##### 同名钩子函数将被合并为一个数组,都将被调用.另外,混入对象的钩子将在组件*自身钩子**之前***调用。

```javascript
var mixin = {
	created:function(){
        console.log("混入对象的钩子被调用");
    }
}

new Vue({
    mixins:[mixin],
    created:function(){
        console.log("组件钩子被调用");
    }
});
// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

##### 值为对象的选项,例如methods,components和directives,将被合并为同一个对象,两个对象键名冲突,取组件对象的键值对

```javascript
var mixin = {
    methods: {
        foo: function(){
            console.log('foo');
        },
        conflicting:function(){
            console.log("from mixin");
        }
    }
}

var vm = new Vue({
    mixins: [mixin],
    methods:{
        bar:function(){
            console.log('bar');
        },
        conflicting:(){
        	console.log("from self");
    	}
    }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

##### 全局混入

> 混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响**每一个**之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。

```javascript
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

### 9.vue-router中的query和params的区别

相同点: 跳转到不同的url,这个方法会向history栈添加一个记录,点击后退时返回到上一个页面

不同点:

```javascript
//用query作为参数传递
this.$router.push({
    path:"/home/sort",
    query:{
        id:'abc'
    }
})
//用params作为参数传递
this.$router.push({
    name: 'sort',
    params:{
        id:'abc'
    }
})

//如果在定义router的时候,不写成"/home/sort/:id"这种格式,会导致页面刷新丢失数据
```

1. query要用path来引入,params要用name来引入

2. 在浏览器中的显示不同:

   query:  	localhost:8080/books?q=123;

   params:	localhost:8080/users/123

#### 10.computed(计算属性)和watch(侦听器)

当有比较大的内存开销的时候可以使用计算属性,

需要有异步操作时用侦听器,因为我们可以设置一个中间状态,这是计算属性不具备的