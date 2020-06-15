



## JavaScript深入学习

[TOC]



#### 1.原型和原型链*

```javascript
function Person(){}//构造函数
var person = new Person();//实例对象
Person.prototype //原型对象

person._proto_  == Person.prototype;
Person = Person.prototype.constructor
//这里的继承用委托更合适,最终都是找到原型对象上
```

#### *2.作用域*

> 作用域:指程序源代码中定义变量的区域

###### 静态作用域与动态作用域

> JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

> 与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的

```javascript
var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();//1 在书写的时候就已经决定了
```

#### *3.执行上下文*

