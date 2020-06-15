# Sass知识点

[TOC]



#### 1.声明变量(变量在规则块内有效,"-","_"效果相同)

```scss
$highlight-color:#F90;
$basic-border:1px solid black;
```

#### 2.引用变量

```scss
$highlight-color:#F90;
.select{
	border:1px solid $highlight-color;
}

//如果需要镶嵌在字符串之中,就必须写在#{}之中
$side:left;
.round{
    border-#{$side}-radius: 5px;
}

//计算功能
body{
    margin: (14px/2);
    top: 50px + 100px;
    right: $var * 10%;
}
```

#### 3.嵌套规则(像俄罗斯套娃那样在规则块中嵌套规则块)

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```

#### 4.父选择器&

```scss
article a {
  color: blue;
  &:hover { color: red }
}
//在父选择器之前添加选择器
#content aside {
  color: red;
  body.ie & { color: green }
}
```

#### 5.群组选择器嵌套

```scss
.container h1, .container h2, .container h3 { 
    margin-bottom: .8em 
}

.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

#### 6.子组合选择器和同层组合选择器：>、+和~

```scss
//用子组合选择器>选择一个元素的直接子元素
article section { margin: 5px }
article > section { border: 1px solid #ccc }
//同层相邻组合选择器+选择header元素后紧跟的p元素
header + p { font-size: 1.1em }
//用同层全体组合选择器~,选择所有跟在article后的同层article元素
article ~ article { border-top: 1px dashed #ccc }
```

#### 7.嵌套属性

```scss
//把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中
nav {
  border: {
  	style: solid;
  	width: 1px;
  	color: #ccc;
  }
}

//属性的缩写形式，你甚至可以像下边这样来嵌套，指明例外规则
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```

#### 8.导入SASS文件

> `css`有一个特别不常用的特性，即`@import`规则
>
> ​	它允许在一个`css`文件中导入其他`css`文件。
>
> ​	然而，后果是只有执行到`@import`时，浏览器才会去下载其他`css`文件，这导致页面加载起来特别慢。

> **`sass`也有一个`@import`规则，但不同的是，`sass`的`@import`规则在生成`css`文件时就把相关文件导入进来,而无需发起额外的下载请求(以省略`.sass`或`.scss`文件后缀)**

```scss
@import "colors"
@import "mixins"
@import "grid"
```



#### 9.使用SASS部分文件

> 当通过`@import`把`sass`样式分散到多个文件时，你通常只想生成少数几个`css`文件。那些专门为`@import`命令而编写的`sass`文件，并不需要生成对应的独立`css`文件，这样的`sass`文件称为局部文件。对此，`sass`有一个特殊的约定来命名这些文件。
>
> 此约定即，`sass`局部文件的文件名以下划线开头。这样，`sass`就不会在编译时单独编译这个文件输出`css`，而只把这个文件用作导入。当你`@import`一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。举例来说，你想导入`themes/_night-sky.scss`这个局部文件里的变量，你只需在样式表中写`@import` `"themes/night-sky";`。

#### 10.默认变量值

```scss
//反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值
$link-color: blue;
$link-color: red;
a {
	color: $link-color;
}

//如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值
$fancybox-width: 400px !default;
```

#### 11.嵌套导入

```scss
//跟原生的css不同，sass允许@import命令写在css规则内
//_blue-theme.scss
aside {
  background: blue;
  color: white;
}
//它导入到一个CSS规则内
.blue-theme {@import "blue-theme"}

.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
//生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。
```

#### 12.原生的CSS导入

> 由于`sass`兼容原生的`css`，所以它也支持原生的`CSS@import`
>
> 尽管通常在`sass`中使用`@import`时，`sass`会尝试找到对应的`sass`文件并导入进来，但在下列三种情况下会生成原生的`CSS@import`，尽管这会造成浏览器解析`css`时的额外下载
>
> - 被导入文件的名字以`.css`结尾；
> - 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；
> - 被导入文件的名字是`CSS`的url()值。

> **这就是说，你不能用`sass`的`@import`直接导入一个原始的`css`文件，因为`sass`会认为你想用`css`原生的`@import`。但是，因为`sass`的语法完全兼容`css`，所以你可以把原始的`css`文件改名为`.scss`后缀，即可直接导入了**

#### 13.静默注释

> `sass`另外提供了一种不同于`css`标准注释格式`/* ... */`的注释语法，即静默注释

```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

#### 14.混合器

> 混合器使用`@mixin`标识符定义。看上去很像其他的`CSS @`标识符，比如说`@media`或者`@font-face`。这个标识符给一大段样式赋予一个名字，这样你就可以轻易地通过引用这个名字重用这段样式。

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

#### 15. 混合器中的CSS规则

```scss
//混合器中不仅可以包含属性，也可以包含css规则，包含选择器和选择器中的属性
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
```

#### 16.给混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

//当混合器被@include时，你可以把它当作一个css函数来传参
a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

#### 17.默认参数值

> 为了在`@include`混合器时不必传入所有的参数，我们可以给参数指定一个默认值。参数默认值使用`$name: default-value`的声明形式，默认值可以是任何有效的`css`属性值

```scss
@mixin link-colors($normal,$hover: $normal,$visited:$normal){
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

#### 18.使用选择器继承来精简CSS

```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

> - 跟混合器相比，继承生成的`css`代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的`css`体积更小。如果你非常关心你站点的速度，请牢记这一点。
> - 继承遵从`css`层叠的规则。当两个不同的`css`规则应用到同一个`html`元素上时，并且这两个不同的`css`规则对同一属性的修饰存在不同的值，`css`层叠规则会决定应用哪个样式。相当直观：通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出。

#### 19.条件语句

@if用来判断

```scss
p{
	@if 1 + 1 == 2{border: 1px solid}
	@if 5 < 3 {border: 2px dotted}
}
```

配套的还有@else

```scss
@if lightness($color) > 30%{
	background-color: #000;
}@else{
	background-color: #fff;
}
```

for循环

```scss
@for $i from 1 from 10{
	.border-#{$i}{
		border: #{$i}px solid blue;
	}
}
```

while循环

```scss
$i: 6;
@while $i > 0{
	.item-#{$i}{width: 2em *$i}
	$i:$i-2;
}

```

@each循环

```scss

@each $member in a,b,c,d{
	.#{$member}{
		background-image:url("/image/#{$member}.jpg")
	}
}
```

#### 20.自定义函数

```scss
@function double($n){
	@return $n*2;
}

#sidebar{
	width: double(5px);
}
```

#### 21.占位符%

```scss
.icon{
	width:20px;
	height:20px;
	color:red;
}
.icon-error{
	@extends .icon;
}

.icon-right{
    @extends .icon;
}

//编译后
.icon,.icon-error,.icon-right{
    width:20xp;
    height:20px;
    color:red;
}

//如果用占位符
%icon{
    width:20xp;
    height:20px;
    color:red;
}
.icon-error,.icon-right{
    width:20px;
	height:20px;
	color:red;
}

//如果用@mixin
@mixin icon{
	width:20px;
	height:20px;
	color:red;
}

.icon_error{
	width:20px;
	height:20px;
	color:red;
}

.icon-right{
	width:20px;
	height:20px;
	color:red;
}
```

