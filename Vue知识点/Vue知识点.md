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

