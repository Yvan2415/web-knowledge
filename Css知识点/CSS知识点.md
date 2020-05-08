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

