# ES6知识点概览



[TOC]



### *1.什么是babel*

> 这是一个ES6转码器,可以将ES6转换成ES5,以便兼容那些不支持ES5的平台.

### *2.var let const*

> ES6之前,声明变量只可以用var;但是这有很多问题,比如变量泄露,变量覆盖;

1. var声明的变量是方法内有效(function scope)
2. let有自己的块级作用域;修复了变量提升的问题;(block scope)
3. const用来声明常量;(block scope)

```javascript
var name = "fang";
function Aoo(){
	console.log(name);//undefined
	var name = "yvan";
	console.log(name);//yvan
	name = "jack";
	console.log(name);//jack
}
Aoo();
console.log(name);//fang
```



> let:
> 	1.不存在变量提升
> 	2.暂时性死区
> 	3.不允许重复声明
>
> const: 
> 	1.一旦声明,常量的值就不能改变
> 	2.如果声明的是一个对象,对象的属性可以改变(地址值没有变)

顶层对象:
	1.在浏览器里面的顶层对象是window(self也是)
	2.在node里面的顶层对象是global

### *3.字符串的优化*
1.字符的Unicode表示法  "\u0061"   "a"
2.字符串的遍历器接口

```javascript
let str = "hello";
for(let codePoint of str){
	console.log(codePoint); //h e l l o
}
```

3.at类似于charAt,返回字符串给定位置的字符(可以识别Unicode字符)(需要垫片库)
4.includes(), startsWith(), endsWith() 都返回Boolean,支持第二个参数,表示起始位置
5.repeat,返回一个字符串,将以前的字符串重复n次,如果n小数,取整
6.padStart,padEnd(length,"str"):length:补全后的长度,用str来补齐
7.字符串模板(``)

### *4.正则拓展*

```javascript
var regex = new RegExp("xyz",'g');
// => var regex = /xyz/i;  
//=> var regex = new RegExp(/xyz/i); (ES5后面不允许第二个参数)
//var regex = new RegExp(/xzy/i,'g');(ES6 返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符)

//match(),replace(),search(),split() 
// reg.test(str)
```



### *5.Array数组类型的升级优化*
1.数组的赋值解构 let [a,b,c] = [1,2,3]
2.(...)可以实现数组和松散序列的相互转换
3.新增find,用于查找项目,取代了indexOf查找
4.新增`copyWithin`,includes,fill,flat方法,用于查找,补全,转换

```javascript
slice(start,end)	//选取数组的的一部分，并返回一个新数组。
splice(start,num,...items)	//从数组中添加或删除元素。
```

### *6.赋值解构*

> 赋值解构的用途:
>     1.交换变量
>     2.从函数返回多个值
>     3.方便的将一组参数与变量名对应起来
>     4.提取Json中的数据
>     5.设置参数的默认值
>     6.遍历Map结构
>     7.输入模块的指定方法

## ES6对Number的优化

### *1.Number*

> 1.提供了二进制0b(0B)和八进制0o(0O)写法,转换为十进制Number(0o111);
> 2.Number.isFinite():是否有限 Number.isNaN():是否为NaN
> 3.Number.parseInt(), Number.parseFloat() (将全局方法 parseInt() 和 parseFloat() ，移植到 Number 对象上面，行为完全保持不变)
> 4.Number.isInteger() 是否为整数

### *2.Math：*

> ​	1.Math.trunc 舍弃小数部分
> ​	2.Math.sign 方法用来判断一个数到底是正数、负数、还是零
> ​	3.Math.cbrt() 于计算一个数的立方根。
> ​	4.ES2016 新增了一个指数运算符（ ** ）

## 对Object的优化
#### *1.特性*
1.可以直接以变量或方法命名变量,不用键值对的形式(赋值解构,模块输出)
2.对象的赋值解构,跟数组相似
3.对象的拓展运算符(...)
4.新增super关键字 指向当前函数所在的原型对象

#### *2.升级*
1.Object.is : 用来比较两个对象是否一致
2.Object.assign: 用于对象属性的新增或者多个对象的合并
3.新增getOwnPropertyDescriptors()方法,增强了ES5中getOwnPropertyDescriptor()方法
4.Object原型上新增了getPrototypeOf()和setPrototypeOf()方法，用来获取或设置当前对象的prototype对象 
5.ES6在Object原型上还新增了Object.keys()，Object.values()，Object.entries()方法，用来获取对象的所有键、所有值和所有键值对数组。

## ES6对函数类型做出的升级优化
1.函数参数的默认值
2.函数的length属性  length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数
3.rest参数 用于获取函数的多余参数(rest参数之后不能再有其他参数)
4.拓展运算符(...),将一个数组转成用逗号分隔的参数序列
5.name属性,返回函数的方法名
6.箭头函数
		（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
		（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
		（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
		（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。



##### 默认值

```javascript
function multiply(a=4,b=5){
	console.log(b*a);
	return b * a;
}

multiply(undefined,2);//如果默认值在前面,不传参,一定要加一个undefined
```

##### JS中的this是在运行时才绑定的

```JavaScript
//箭头函数
const Jelly = {
	name: 'Jelly',
	hobbies: ['Coding','Sleeping','Reading'],
	printHobbies:function(){
        //在以前的通常的做法是
        // var self = this;
		console.log(this);//object jelly
		this.hobbies.map(function(hobby){
            //这里的function是作为单独的函数运行的,没有用call或者apply绑定运行环境,所以在一般情况下是window,在严格模式下是undefined
			console.log(this);//undefined
			console.log(`${this.name} loves ${hobby}`);
            //console.log(`${self.name} loves ${hobby}`);
			/*
				undefined loves Coding
				undefined loves Sleeping
				undefined loves Reading
			*/
		});
	},
    printHobbies2:function(){
        //在es6中,我们可以使用箭头函数
        //箭头函数没有自己的this值,它的this值是绑定的父作用域的
        this.hobbies.map(hobby => {
            console.log(`${this.name} loves ${hobby}`); //Jelly loves Coding
        })
    }
}

Jelly.printHobbies();
```



```javascript
let arr = [33,4,12,93,31,32]
let double = arr.map(function(item){ //[ 66, 8, 24, 186, 62, 64 ]
	return item * 2;
});

//省略function
let double2 = arr.map(item => { //[ 66, 8, 24, 186, 62, 64 ]
	return item * 2; 
})
//隐式返回
let double3 = arr.map(item => item * 2) //[ 66, 8, 24, 186, 62, 64 ]
```

> 这里有一个自执行函数的概念.为什么需要自执行函数,其主要目的是为了避免全局变量的污染;
>
> 在自执行函数中,当方法执行完之后,变量等就会释放

```javascript
let obj = {
    name: 'fang',
    age: 22
};//自执行函数前面一定要都有分号
(function(obj){
    var sex = "man";
    obj.sex = sex;
})(obj)
console.log(obj);//{ name: 'fang', age: 22, sex: 'man' }
console.log(sex)//sex is not defined

{
    obj.grade = "大学一年级";
}
console.log(obj);//{ name: 'fang', age: 22, sex: 'man', grade: '大学一年级' }

//立即执行函数可以起到作用域的功能，但是立即执行函数存在的意义不仅仅是用作等价于块级作用域。
//块级作用域可以反问外部变量,自执行函数可以传递变量,但是还是有一些区别,需要进一步了解
```



### *1.Set*
是一种类似于Array的新的数据结构,区别在于成员都是唯一的,不重复的,可以轻松实现数组去重

1.类似于数组,但是成员是唯一的
2.Set函数可以接受一个数组作为参数,进行初始化
3.NaN不等于NaN,但是Set中只能存在一个,但是可以存在两个相同的对象
4.set.size 返回set成员的数量
5.add(value)：添加某个值，返回Set结构本身。
	delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
	has(value)：返回一个布尔值，表示该值是否为Set的成员。
	clear()：清除所有成员，没有返回值。

> Array.from()可以将一个set转换为一个数组

### *2.Map*
一种类似于Object的数据结构,可以理解为Object的超集

1.size返回Map结构的成员总数
2.set(key,value):返回整个map,如果key存在,就更新value
3.get(key),返回对应的value,如果找不到,返回undefined
4.has(key),判断是否有某个键
5.delete(key):删除某个键,成功返回true,失败返回false
6.clear():清除所有成员
7.遍历:
		keys()：返回键名的遍历器。
		values()：返回键值的遍历器。
		entries()：返回所有成员的遍历器。
		forEach()：遍历Map的所有成员

## Proxy

可以理解成,在目标对象之前架设一层"拦截";外界对该对象的访问，都必须先通过这层拦截;

Proxy的构造函数:
	var proxy = new Proxy(traget,handler);	
	new Proxy:生成一个Proxy实例,
	target:表示需要拦截的目标对象,
	handler:定制拦截行为

```javascript
var obj = {
	name : 'fang',
	age : 22,
	sex : "man"
}

var proxy = new Proxy(obj,{
	get:function(target,property,receiver){
        console.log(target);//{ name: 'fang', age: 22, sex: 'man' }
        console.log(property);//name
        console.log(receiver);//{ name: 'fang', age: 22, sex: 'man' }
		return target[property];
	},
	set:function(target,property,value,receiver){
        console.log(target);//{ name: 'fang', age: 22, sex: 'man' }
        console.log(property);//name
        console.log(value);//hello
        console.log(receiver);//{ name: 'fang', age: 22, sex: 'man' }
		target[property] = value;
	}
});
```

> 作用:
>
> 1. 拦截和监视外部对对象的访问
> 2. 降低函数或类的复杂度
> 3. 在复杂操作前对操作进行校验或对所需资源进行管理

```javascript
//handle的一些属性
// 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。
handler.getPrototypeOf()

// 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。
handler.setPrototypeOf()
 
// 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。
handler.isExtensible()

// 在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时。
handler.preventExtensions()

// 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。
handler.getOwnPropertyDescriptor()
 
// 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。
andler.defineProperty()
 
// 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。
handler.has()

// 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。
handler.get()
 
// 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。
handler.set()

// 在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。
handler.deleteProperty()

// 在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。
handler.ownKeys()

// 在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时。
handler.apply()
 
// 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时。
handler.construct()
```

[proxy使用场景]: https://www.jianshu.com/p/c2a1aa2e2b14

## 模块化

> import命令的特点
> 	只读属性:不允许在加载模块的监本里面,改写接口的引用指向;
> 	即:
> 		可以改写import变量类型为对象的属性值,但是不可以改写import变量类型为基本类型的值

> export default 命令
> 	1.在一个文件或模块中,export,import可以有多个,export default仅有一个
> 	2.export default中的default是对应的导出接口变量
> 	3.通过export方式导出,在导入时要加{},export default则不需要
> 	4.export default向外暴露的成员,可以使用变量来接收

## Class

##### 声明类:

​	1.通过class关键字创建,类名大写
​	2.constructor函数,可以接收传过来的参数,返回实例对象
​	3.只要new 生成实例,就会自动调用这个函数

##### 声明类的方法:

1.类里面的函数不需要写function
2.多个函数方法之间不需要添加逗号分隔

##### 类的继承(extends):

1.子类可以继承父类的属性,方法
2.子类的构造器必须先调用父类的构造器super(),虽然调用的是父类的构造器,但是返回的是子类的对象;

##### super关键字

1.子类可以调用父类的构造函数
2.出了调用父类的构造函数,也可以调用父类的普通函数 super.method()

##### class的注意点:

1.class没有变量提升,我们必须先有类,才能实例化
2.类里面的共有属性和方法一定要加this使用
3.constructor里面的this指向的是实例对象,方法谁调用this就指向谁

## Promise

promise:是一种异步编程的解决方案
	Promise是一个容器,里面保存着某个未来才会结束的事件(通常是一个异步操作的结果)

特点: 
1.对象的状态不受外界影响。 Promise 对象代表一个异步操作，有三种状态： pending （进行中）、 fulfilled （已成功）和 rejected （已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变
	

2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。 Promise 对象的状态改变，只有两种可能：从pending 变为 fulfilled 和从 pending变为 rejected 。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。