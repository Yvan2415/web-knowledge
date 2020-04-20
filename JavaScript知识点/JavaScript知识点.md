# JavaScript知识点

[TOC]





### *1.javascript的typeof返回那些数据类型*

1. string
2. undefined
3. boolean
4. function
5. number
6. object

### *2.*例举3种强制类型转换和2种隐式类型转换?

强制类型转换:parseInt,parseFloat,number

隐式: ==    === 

### *3. split() join() 的区别*

前者是将字符串分割成数组,后者是将数组连接成字符串

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

### *7.call和apply的区别*

```javascript
Object.call(this,obj1,obj2,obj3)

Object.apply(this,arguments)
```

### *8.ajax请求时,如何解析json数据*

```
JSON.parse(string)
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

### *11.如何阻止事件冒泡*

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
| document.onload 是在结构和样式,外部js以及图片加载完才执行js | ready是dom树创建完成就执行的方法,原生种没有这个方法，jquery中有 $().ready(function) |

### *16."==" 和 "===" 的区别*

前者会自动转换类型,再判断是否相等
后者不会自动类型转换,直接去比较

### *17.函数声明与函数表达式的区别?*

> 在Javscript中，解析器在向执行环境中加载数据时，对函数声明和函数表达式并非是一视同仁的，解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问），至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解析执行。

```javascript
add(1,2);//3
function add(x,y){
    alert(x+y)
}

add(1,2) //add is not a function  
var add = function(x,y){  
    alert(x+y)  
} 
```



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

### *19.看下面代码，给出输出结果。*

```javascript
for(var i = 1; i <= 3; i++){  //建议使用let 可正常输出i的值
  setTimeout(function(){
      console.log(i);   
  },0); 
};
答案：4 4 4。
原因：Javascript事件处理器在线程空闲之前不会运行。
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

### *24.alert的值分别是多少*

```javascript
var a = 100;  
function test(){  
    alert(a);  
    a = 10;  //去掉了var 就变成定义了全局变量了
    alert(a);  
}  
test();
alert(a);
//正确答案是： 100， 10， 10
```

### *25.javaScript的2种变量范围有什么不同？*

1. 全局变量:当前页面有效
2. 局部变量:函数方法内有效

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

### *35.javascriprt的数据类型*

1. 主要数据类型：string, boolean, number
2. 复合数据类型：function, object
3. 特殊类型：undefined，null

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

### *38.什么是Json*

1. json是一种轻量级的数据交换格式
2. json独立于语言和平台,json解析器和json库支持许多不同的编程语言
3. JSON的语法表示三种类型值，简单值(字符串，数值，布尔值，null),数组，对象

### *39.js中的3种弹出式消息提醒（警告窗口，确认窗口，信息输入窗口）的命令式什么？*

alert,confirm,prompt

### 40.执行以下代码的结果

```javascript
var uname = 'jack'
function change() {
    alert(uname) // ?
    var uname = 'lily'
    alert(uname)  //?
}
change()
//分别alert出 undefined，lily，（变量声明提前问题）
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

### *46.闭包的好处*

1. 希望一个变量长期驻扎在内存当中(不被垃圾回收机制回收)
2. 避免全局变量的污染
3. 私有成员的存在
4. 安全性提高

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



### *49.生成一个日期*

new Date(year,month,day....)