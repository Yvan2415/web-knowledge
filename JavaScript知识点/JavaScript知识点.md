# JavaScript知识点

[TOC]





### *1.javascript的typeof返回那些数据类型(6种)*

1. number
2. string
3. boolean
4. undefined
5. function
6. object(数据类型多一个null)

### *2.*例举3种强制类型转换和2种隐式类型转换?

强制类型转换:parseInt,parseFloat,number

隐式: ==    === 

### 4*.数组方法*

1. 添加方法    push()尾部添加    unshift()头部添加
2. 删除方法   pop()尾部删除    shift()头部删除   splice(index,howmany,...item)指定位置删除,下标,删除长度,替代的元素     slice(start,end)指定位置删除 起始下标,终点下标
3. 数组排序   sort(function) 按指定的规则排列   reverse()数组倒叙
4. 数组链接  concat()  返回一个新的数组
5. 位置查找  indexOf(item,index):要查找的项和（可选的）表示查找起点位置的索引  lastIndexOf(item,index):要查找的项和（可选的）表示查找起点位置的索引
6. 数组遍历   

- forEach() 对数组的每一项进行遍历,没有返回值   
- map() 给数组的每一项指定运行函数,返回运算后的结果   
- filter() 数组中的每一项运行给定函数，返回满足过滤条件组成的数组  
- some()判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true  
- every()判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true   
- reduce()&&reduceRight()  这两个方法都会实现迭代数组的所有项，然后构建一个最终返回的值。reduce()方法从数组的第一项开始，逐个遍历到最后。而 reduceRight()则从数组的最后一项开始，向前遍历到第一项。

```javascript
let arr = [1,2,3,4,5,6,7,8,9];

//forEach
arr.forEach((item,index) => {
	console.log(item,index);
});
// 1 2 3 4 5 6 7 8 9 
// 0 1 2 3 4 5 6 7 8


//filter
let i = arr.filter(item => {
	return item > 3;
})
console.log(i); //[ 4, 5, 6, 7, 8, 9 ]

//map
let j = arr.map(item => item*2);
console.log(j);
// [
//    2,  4,  6,
//    8, 10, 12,
//   14, 16, 18
// ]

//some
let flagOne = arr.some(item => {
	return item > 8;
});
console.log(flagOne) //true

//every
let flagTwo = arr.every(item => {
	return item > 1;
});
console.log(flagTwo) //false


//reduce
let result = arr.reduce((previousValue, currentValue, currentIndex, array)=>{
	console.log(previousValue,currentValue,currentIndex,array)
	return previousValue + currentValue;
});

console.log(result); //45

//多维数组拍平
let array = [1,2,3,[4,5,6],[7,[8,9,[10]]]]
function toArray(item){
	let arr = [];
	if(Array.isArray(item)){
		item.reduce((pre,cur)=>{
			arr = arr.concat(toArray(cur))
			return arr;
		},[])
	}else{
		arr = arr.concat(item);
	}
	return arr;
}
let a = toArray(array);
console.log(a)
// [
//    1,  2,  3,
//    4,  5,  6,
//    7,  8,  9,
//   10
// ]

```

### *5.IE和标准下有哪些兼容性的写法*

```javascript
var ev = ev || window.event
document.documentElement.clientWidth || document.body.clientWidth
var target = ev.srcElement||ev.target
```

### 6*.ajax请求的时候get 和post方式的区别*

|             get请求             |         post请求         |
| :-----------------------------: | :----------------------: |
|     get请求参数放在url后面      | post参数放在虚拟载体里面 |
| get有大小限制(只能提交少量参数) |     参数大小没有限制     |
|            请求数据             |         提交数据         |
|           安全性一般            |      安全性相对较高      |

### *7.call和apply的区别,bind*

```javascript
Object.call(this,obj1,obj2,obj3)

Object.apply(this,arguments)

//call,apply在绑定this时就执行,而bind(this,arguments)后生成一个新的函数,稍后执行
```

### *9.事件委托*

利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行

### *10.什么是闭包,有什么特性,对页面有什么影响*

闭包就是能够读取其他函数内部变量的函数,使得函数不被GC回收，如果过多使用闭包，容易导致内存泄露

```javascript
function Aoo(){
	var i = 1;
	return function (){
		console.log(++i);
	}
}
let f = Aoo();
f(); //2
f(); //3
```

##### 闭包的好处

1. 希望一个变量长期驻扎在内存当中(不被垃圾回收机制回收)
2. 避免全局变量的污染
3. 私有成员的存在
4. 安全性提高

### 11.如何阻止事件冒泡*

|           IE           |         非IE         |
| :--------------------: | :------------------: |
| ev.cancelBubble = true | ev.stopPropagation() |

### *12.如何阻止默认事件*

1. return false；
2. ev.preventDefault();

### *13.添加 删除 替换 插入到某个接点的方法*

1. 创建新的节点   createElement(): 创建一个具体的元素   createTextNode(): 创建一个文本节点
2. 添加(appendChild),移除(removeChild),替换(replaceChild),插入(insertBefore)
3. 查找  getElementByTagName: 通过标签名   getElementsByName:通过Name属性查找   getElementById: 通过元素Id查找

### *14.解释jsonp的原理,以及为什么不是真正的ajax*

原理:动态创建script标签,回调函数

Ajax是页面无刷新请求数据操作

### *15.document load 和 document ready的区别*

| document load                                               | document ready                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| document.onload 是在结构和样式,外部js以及图片加载完才执行js | ready是dom树创建完成就执行的方法,原生种没有这个方法，jquery中有 $(document).ready(function) |

### *18.对作用域上下文和this的理解*

```javascript
let User = {
	count: 1,
	getCount:function(){
		return this.count
	}
}
console.log(User.getCount()); //1
let func = User.getCount;
console.log(func());//undefined

// 因为func是在window的上下文中运行的,所以访问不到count
```

### *20.当一个DOM节点被点击时,我们希望执行一个函数,应该怎么做*

```javascript
box.onclick= function(){}
box.addEventListener("click",function(){},false);
```

```html
<button onclick="xxx()"></button>
```

### *21.JavaScript的事件流模型都有什么*

- 事件冒泡:事件开始由最具体的元素接受，然后逐级向上传播
- 事件捕捉:事件由最不具体的节点先接收，然后逐级向下，一直到最具体的
- DOM事件流:   三个阶段：事件捕捉，目标阶段，事件冒泡

### *22.看下列代码,输出什么*

```javascript
var a = null;
alert(typeof a); //object
//null是一个只有一个值的数据类型,这个值就是null,表示一个空指针对象
```

### *23.正则表达 字母开头，后面可以是数字，下划线，字母，长度为6-30*

> var reg = /^[a-zA-Z]\w{5,29}/

### *26.null和undefined的区别？*

|             null             |           undefined            |
| :--------------------------: | :----------------------------: |
| 表示"无"的对象,转为数值时为0 | 表示"无"的原始值,转为数值时NaN |

> 当声明的变量还未被初始化时,变量的默认值为undefined.null表示尚未存在的对象.
>
> undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是
>
> 1. 变量被声明了，但没有赋值时，就等于undefined
> 2. 调用函数时，应该提供的参数没有提供，该参数等于undefined
> 3. 对象没有赋值的属性，该属性的值为undefined
> 4. 函数没有返回值时，默认返回undefined



> null表示"没有对象"，即该处不应该有值。典型用法是：
>
> 1. 作为函数的参数，表示该函数的参数不是对象。
> 2.  作为对象原型链的终点。

### *27.new操作符具体干了什么呢?*

1.创建一个空对象,并且this变量引用该对象,同时还继承了改函数的原型

2.属性和方法被加入到了this引用的对象

3.新创建的对象由this所引用,并且最后隐式的返回this

### *28.js延迟加载的方法有哪些*

> defer和async、动态创建DOM方式（创建script，插入到DOM中，加载完毕后callBack）、按需异步载入js

```javascript
<script type="text/javascript" defer="defer">
	alert(document.getElementById("p1").firstChild.nodeValue);
</script>
//defer 属性规定是否对脚本执行进行延迟，直到页面加载为止
```



### *29.Flash、Ajax各自的优缺点，在使用中如何取舍？*

| Flash                                                        | Ajax                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| Flash适合处理多媒体、矢量图形、访问机器；对CSS、处理文本上不足，不容易被搜索。 | ajax对CSS、文本支持很好，支持搜索；多媒体、矢量图形、机器访问不足。 |

```
共同点：与服务器的无刷新传递消息、用户离线和在线状态、操作DOM
```

### *30.希望获取到页面中所有的checkbox怎么做*

```javascript
var inputs = document.getElementsByTagName("input");//获取所有的input标签对象
var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
for(var i=0;i<inputs.length;i++){
  var obj = inputs[i];
  if(obj.type=='checkbox'){
     checkboxArray.push(obj);
  }
}
```

### *31.清除字符串前后的空格*

```javascript
String.prototype.trim = function(){
	return this.replace(/^\s+/,"").replace(/\s+$/,"")
}
```

### *32.javascript语言特性中，有很多方面和我们接触的其他编程语言不太一样*

> javascript语言实现继承机制的核心就是 **(原型)**，而不是Java语言那样的类式继承。
>
> Javascript解析引擎在读取一个Object的属性的值时，会沿着 **(原型链)**向上寻找，如果最终没有找到，则该属性值为undefined；如果最终找到该属性的值，则返回结果。
>
> 与这个过程不同的是，当javascript解析引擎执行“给一个Object的某个属性赋值”的时候，如果当前Object存在该属性，则改写该属性的值，如果当前的Object本身并不存在该属性，则赋值该属性的值。

### *33.Cookie在客户机上是如何存储的*

> Cookies就是服务器暂存放在你的电脑里的文本文件，好让服务器用来辨认你的计算机。
>
> 当你在浏览网站的时候，Web服务器会先送一小小资料放在你的计算机上，Cookies 会帮你在网站上所打的文字或是一些选择都记录下来。
>
> 当下次你再访问同一个网站，Web服务器会先看看有没有它上次留下的Cookies资料，有的话，就会依据Cookie里的内容来判断使用者，送出特定的网页内容给你。

### *34.*form中的input可以设置为readonly和disable，请问二者有什么区别？

|              readonly              |               disable                |
| :--------------------------------: | :----------------------------------: |
| readonly不可编辑，但可以选择和复制 | disabled不能编辑，不能复制，不能选择 |
|          值可以传递到后台          |           值可以传递到后台           |

### *36.程序中捕获异常的方法？*

```javascript
try{

}catch(e){

}finally{

}
```

### 37.Ajax的原理

```javascript
(1)创建对象
var xhr = new XMLHttpRequest();
(2)打开请求
xhr.open('GET', 'example.txt', true);
(3)发送请求
xhr.send(); 发送请求到服务器
(4)接收响应
xhr.onreadystatechange =function(){}
(1)当readystate值从一个值变为另一个值时，都会触发readystatechange事件。
(2)当readystate==4时，表示已经接收到全部响应数据。
(3)当status ==200时，表示服务器成功返回页面和数据。
(4)如果(2)和(3)内容同时满足，则可以通过xhr.responseText，获得服务器返回的内容。
```

### 41.浏览器的滚动距离

可视区域距离页面顶部的距离:scrollTop=document.documentElement.scrollTop||document.body.scrollTop

### 42.可视区的大小

```javascript
//(1)innerXXX（不兼容ie）
window.innerHeight //可视区高度，包含滚动条宽度
window.innerWidth //可视区宽度，包含滚动条宽度
//(2)document.documentElement.clientXXX//(兼容ie)
document.documentElement.clientWidth//可视区宽度，不包含滚动条宽度
document.documentElement.clientHeight//可视区高度，不包含滚动条宽度
```

### *43.节点的种类有几种,分别是什么*

- 元素节点：nodeType ===1;
- 文本节点：nodeType ===3;
- 属性节点：nodeType ===2;

### *44.innerHTML 和outerHTML的区别*

innerHTML(元素内包含的内容）

outerHTML(自己以及元素内的内容）

### *45.offsetWidth offsetHeight和clientWidth clientHeight的区别*

(1)offsetWidth （content宽度+padding宽度+border宽度）

(2)offsetHeight（content高度+padding高度+border高度）

(3)clientWidth（content宽度+padding宽度）

(4)clientHeight（content高度+padding高度）



### *47.冒泡排序算法*

```javascript
let arr = [5,4,3,2,1,6];

for(let i = 0; i < arr.length; i++){
	for(let j = 0; j<arr.length-1; j++){
		if(arr[j] > arr[j+1]){
			[arr[j],arr[j+1]] = [arr[j+1],arr[j]]
		}
	}
}

console.log(arr); //[ 1, 2, 3, 4, 5, 6 ]
```

### *48.JS实现一个函数对JavaScript中josn对象进行克隆*

Object.assign(target,source1,source2,....);//浅克隆

JSON.parase(JSON.stringify(obj));//深克隆,但是有问题,空值,顺序等

```javascript
let obj = {
	name: 'fang',
	age: 22,
	say: function(){
		console.log("hello")
	},
	children:{
		name: 'yvan'
	}
}
// let key = Object.keys(obj);
// console.log(key);
function isBaseType(arg){
	let type = typeof arg;
	let obj = {};
	if(type === 'string' || type === 'number' || type === 'boolean' || type === 'undefined' ){
		obj.flag = 1;
		obj.key = arg;
	}
	else if(type === "function"){
		obj.flag = 2;
		obj.key = Object.assign({},arg);
	}else if(type === 'object'){
		obj.flag = 3;
	}
	return obj;
}
function deepCopy(object){
	let obj = {};
	let keys = Object.keys(object)
	for(let key of keys){
		let json = isBaseType(object[key]);
		if(json.flag == 1){
			obj[key] = json.key;
		}else if(json.flag == 2){
			obj[key] = json.key;
		}else{
			obj[key] = deepCopy(object[key]);
		}
	}
	return obj;
}
let obj2 = deepCopy(obj);//递归方法实现的深克隆
console.log(obj.say === obj2.say)
```



### *49.生成一个日期*

new Date(year,month,day....)

### *50.原型与原型链*

```javascript
function Person(name,age){
	this.name = name;
    this.age = age;
    this.info = function(){
        console.log(`my name is ${this.name},my age is ${this.age}`);
    }
}

Person.prototype.describe = function(){
    console.log(`the object's name is ${this.name},the object'age is ${this.age}`);
}

let jack = new Person("jack",22);
/*
age: 22
info: ƒ ()
name: "jack"
__proto__: 
	Object:describe: ƒ ()
	constructor: ƒ Person(name,age)
	__proto__: Object
*/
let lily = new Person('lily',18);
/*
age: 18
info: ƒ ()
name: "lily"
__proto__: 
	describe: ƒ ()
	constructor: ƒ Person(name,age)
	__proto__: Object
*/
jack.info === lily.info //false
jack.describe === lily.describe//true
```

1. 每一个实例对象都有一个**_ _proto_ _**指向原型对象,包括**构造函数**,**prototype**等
2. 原型对象上的prototype上则存放着被这个原型对象new出来的对象的共有的方法
3. 因为原型对象也是一个object,所以它也有**_ _proto_ _**

**为什么要将对象的共有方法写在原型对象的prototype上呢?**

> 如上面的代码所示,如果将一个对象的方法写在构造函数内,那么每new一个对象,都会开辟一个空间存放这个对象的方法;但是,将方法写在prototype上时,则每个对象的方法都指向这个方法,减少了空间的占用;
>
> 如果我们需要重写这个方法,只需在对象上重新定义就行了;

### *51.Object常用的方法*

##### 1.Object.assign(target,source1,source2,...)

```javascript
// 该方法用于对象的合并,将对象source的所有可枚举属性合并到target上
// Object.assign方法实行的是浅拷贝，而不是深拷贝
// 会替换同名属性

const target = {
    x: 0,
    y: 1
}
const source = {
    x: 1,
    z: 2,
    fn: {
        number: 1
    }
}
Object.assign(target,source);
console.log(target.fn == source.fn) //true
```

##### 2.Object.create(prototype,[propertiesObject])

```javascript
//使用指定的原型对象及其属性去创建一个新的对象
var parent = {
    x: 1,
    y: 1
}
var child = Object.create(parent,{
    z: {
        writable: true,
        configurable: true,
        value: "newAdd"
    }
});
console.log(child);//{z: "newAdd"},x,y在其_proto_上
```

##### 3.Object.defineProperties(obj,props)

```javascript
//直接在一个对象上定义新的属性或修改现有属性,并返回该对象
var obj = {};
Object.defineProperties(obj,{
    'property1': {
        value: true,
        writable: true
    },
    'property2': {
        value: 'hello',
        writable: false
    }
});
console.log(obj);//{property1: true, property2: "Hello"}
```

##### 4.Object.defineProperty(obj,prop,descriptor)

```javascript
//在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回这个对象
Object.defineProperty(Object,'is',{
    value: fucntion(x,y){
    		if(x == y){
    			return x !=0 || 1/x === 1/y
			}
			return x!==x && y !== y; 
	},
    configurable: true,
    enumerbale: false,
    writable: true
})
// 不能同时设置(writable,value)和get,set方法,否则会报错
```

##### 5.Object.keys(obj)

```javascript
//返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致,（两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）

var arr = ["a","b","c"];
console.log(Object.keys(arr));//['0','1','2']
```

##### 6.Object.values(obj)

```javascript
//方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。Object.values会过滤属性名为 Symbol 值的属性

var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
```

##### 7.hasOwnProperty()

```javascript
//判断对象自身属性中是否具有指定的属性。
obj.hasOwnProperty('name')
```

##### 8.Object.entries()

```javascript
//返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```

##### 9.Object.getOwnPropertyNames()

```javascript
//返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

var obj = { 0: "a", 1: "b", 2: "c"};
Object.getOwnPropertyNames(obj).forEach(function(val) {
  console.log(val);
});
var obj = {
  x : 1,
  y : 2
}
Object.defineProperty(obj,'z',{
  enumerable : false
})
console.log(Object.getOwnPropertyNames(obj))  // ["x", "y", "z"] 包含不可枚举属性 。
console.log(Object.keys(obj))                 // ["x", "y"]      只包含可枚举属性 。
```

##### 10.isPrototypeOf()

```javascript
// 判断一个对象是否存在于另一个对象的原型链上
```

##### 11.Object.setPrototypeOf(obj,prototype)

```javascript
//设置对象的原型对象
```

##### 12.Object.is()

```javascript
/*
判断两个值是否相同。
如果下列任何一项成立，则两个值相同：
两个值都是 undefined
两个值都是 null
两个值都是 true 或者都是 false
两个值是由相同个数的字符按照相同的顺序组成的字符串
两个值指向同一个对象
两个值都是数字并且
都是正零 +0
都是负零 -0
都是 NaN
都是除零和 NaN 外的其它同一个数字
*/
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true
Object.is('foo', 'bar');     // false
Object.is([], []);           // false
var test = { a: 1 };
Object.is(test, test);       // true
Object.is(null, null);       // true
// 特例
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

##### 13.Object.freeze()

```javascript
//冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。
```

##### 14.Object.isFrozen()

```javascript
//判断一个对象是否被冻结.
```

##### 15.Object.preventExtensions()

```javascript
//对象不能再添加新的属性。可修改，删除现有属性，不能添加新属性
```

### *52.立即执行函数*

> 在避免污染全局命名空间时经常使用这种模式,内部定义的变量外部获取不到

```javascript
//在定义的同时立即执行
(function(){
    let a = "fang";
    function Aoo(){
        console.log(a);
    }
    Aoo();
})()
```

### *53.not defind 和 undefined 的区别*

> 变量未定义,未赋值  报  not defind
>
> 变量已定义,未赋值, 报 undefined

### *54.eval*

> eval:方法只接受原始字符串作为参数,否则返回undefined

### *55.JavaScript中querySelector()和getElementById()*

> 文档对象模型`Document`引用的`querySelector()`方法返回文档中与指定选择器或选择器组匹配的第一个 html元素`Element`。 如果找不到匹配项，则返回`null`。

其实两种方法是可以互换的.

区别(取**动态集合**和**静态集合**的关系):

1. getElementById():通过函数获取元素之后，元素之后的改变还是会动态添加到已经获取的这个元素中。
2. querySelector():通过函数获取元素之后，元素之后的改变并不会影响之前获取后存储到的变量。
3. querySelectorAll表示获取到所有满足条件的元素，返回的是一个列表

