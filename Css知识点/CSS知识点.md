# CSS日常积累

[TOC]



#### 1.如何引入外部字体

```css
//正常情况下
div{
	font-family:'宋体'
}

//外部字体
@font-face{
    font-family:'yvan';
    src:url('./fonts/yvan.ttf')
}
div{
    font-family:'yvan'
}
/*字体后缀和浏览器有关，如下所示
　　*.TTF或.OTF，适用于Firefox3.5、Safari、Opera
　　*.EOT，适用于InternetExplorer4.0+
　　*.SVG，适用于Chrome、IPhone
*/
```

#### *2. calc()*

```css
height:calc(100vh - 1.2rem);//- 旁边必须有空格才可以生效
```

#### *3.伪类 :focus-within*  

> 表示一个元素获得焦点或者**该元素的后代获得焦点**

```html
<div class="demo">
    1111
	<input>
</div>
<style type="text/css">
	.demo:focus-within{
		color:red;
	}
</style>
```

e.g. 当input获得焦点时,demo的字体颜色可以变成red;

#### *4.placeholder-shown*

> 当input类型标签使用了placeholder属性有了默认占位的文字,就会触发此样式;配合:not()伪类,可以在改变默认文字消失之后的样式