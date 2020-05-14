



## 前端工作中遇到的问题

[TOC]



### 1.transform:scale(1)   

> 在使用element-ui的el-carousel组件时,图片轮播时会影响到el-footer的按钮,会使字体短暂模糊

##### 办法:

1. ##### 在该动画的transform里加上translateZ(0)值, 能解决文字抖动的问题，但是没解决文字模糊的问题。

2. #####  在受影响的字体处设置transform: translate3d(0,0,0);