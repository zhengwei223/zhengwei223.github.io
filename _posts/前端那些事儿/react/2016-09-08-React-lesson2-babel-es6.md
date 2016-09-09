---
layout: post
title: 使用babel，试试用ES6来提升编码的愉悦感
category: react
tags: React 入门实例教程
author: 郑未
keywords: lanqiao 蓝桥 培训 教程  React
description:
p_cate: 前端那些事儿
---

es5有很多蹩脚的语法，es6（es2015）很爽，但浏览器支持还不够，因此出现了很多转换器，可以把es6语法风格的代码转为es5的实际代码，这样可以顺利在各主流浏览器上运行，同时又能获得es6的编码快感。

[本例](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/10/index.html)采用babel：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="../../build/react.js"></script>
    <script src="../../build/react-dom.js"></script>
    <script src="../../build/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>

    
<script type="text/babel">
  class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={

      }
    }

    render(){
      return <h1>hello world</h1>;
    }

  }

  ReactDOM.render(<MyApp /> , document.getElementById('example'));
</script>
  </body>
</html>
```

几点说明：

- `browser.min.js`是babel的浏览器版本，我们采用压缩格式.
- 我们使用了最新的`class`和`extends`语法.
- 不用`react`也可以用`babel`，前提是你已经了解了`es6`语法.