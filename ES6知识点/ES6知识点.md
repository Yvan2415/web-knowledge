# ES6知识点概览



[TOC]



### 1.什么是babel*

> 这是一个ES6转码器,可以将ES6转换成ES5,以便兼容那些不支持ES5的平台.

### *2.var let const*

> ES6之前,声明变量只可以用var;但是这有很多问题,比如变量泄露,变量覆盖;

1. var声明的变量都是全局的,没有自己的作用域
2. let有自己的块级作用域;修复了变量提升的问题;
3. const用来声明常量;

### 3.字符串的优化*
1.(``)字符串模板
2.新增了includes方法,以前只能用indexOf
3.新增startsWidth,endsWith,padStart,padEnd,repeat,方便补全字符串

### 4.Array数组类型的升级优化
1.数组的赋值解构 let [a,b,c] = [1,2,3]
2.(...)可以实现数组和松散序列的相互转换
3.新增find,用于查找项目,取代了indexOf查找
4.新增`copyWithin`,includes,fill,flat方法,用于查找,补全,转换

```javascript
slice(start,end)	//选取数组的的一部分，并返回一个新数组。
splice(start,num,...items)	//从数组中添加或删除元素。
```



## ES6对Number的优化
1.将全局方法isFinite,isNaN放到了Number上
2.增加了一些科学运算的方法

## 对Object的优化
#### 1.优化
1.可以直接以变量或方法命名变量,不用键值对的形式(赋值解构,模块输出)
2.对象的赋值解构,跟数组相似
3.对象的拓展运算符(...)
4.新增super关键字 指向当前函数所在的原型对象
#### 2.升级
1.Object.is : 用来比较两个对象是否一致
2.Object.assign: 用于对象属性的新增或者多个对象的合并
3.新增getOwnPropertyDescriptors()方法,增强了ES5中getOwnPropertyDescriptor()方法
4.Object原型上新增了getPrototypeOf()和setPrototypeOf()方法，用来获取或设置当前对象的prototype对象 
5.ES6在Object原型上还新增了Object.keys()，Object.values()，Object.entries()方法，用来获取对象的所有键、所有值和所有键值对数组。

## ES6对函数类型做出的升级优化
一.箭头函数
1.箭头函数没有自己的this,函数内的this指向函数定义的对象,而不是调用函数的对象
2.箭头函数不可以实例化
3.箭头函数内部也没有arguements,可以用拓展运算符代替
二.函数默认赋值
1.现在可以给函数的参数赋默认值

### 1.Set
是一种类似于Array的新的数据结构,区别在于成员都是唯一的,不重复的,可以轻松实现数组去重

### 2.Map
一种类似于Object的数据结构,可以理解为Object的超集

