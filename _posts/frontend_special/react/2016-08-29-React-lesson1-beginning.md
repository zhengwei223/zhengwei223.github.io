---
layout: post
title: React初探：入门实例教程
category: react
tags: React 入门实例教程
author: 郑未
keywords: lanqiao 蓝桥 培训 教程  React 入门实例教程
description:
---



现在最热门的前端框架，毫无疑问是 [React](https://facebook.github.io/react/) 。

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 [JavaScript MVC 框架](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)，都不满意，就决定自己写一套。在2013年5月该项目开源。

下面，我们通过若干浅显的demo来完成react的第一轮学习。

# 0.安装

我是在这里[http://reactjs.cn/react/docs/getting-started.html](http://reactjs.cn/react/docs/getting-started.html)下载的Starter Kit。

解压后就会得到react的js文件、一个最简单的index示例和别的更为复杂的示例。

不过你也可以从[React Demo](https://git.coding.net/lanqiao/reactDemo.git)下载本教程的示例代码，里面自带了react、jQuery的代码。

# 1.HTML模板

打开starter kit的index.html：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="build/react.js"></script>
    <script src="build/react-dom.js"></script>
    <script src="https://npmcdn.com/babel-core@5.8.38/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>

    
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

上面代码有两个地方需要注意。

- 首先，最后一个 `<script>` 标签的 `type` 属性为 `text/babel` 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 `type="text/babel"` 。

- 其次，上面代码一共用了三个库： `react.js` 、`react-dom.js` 和 `Browser.js` ，它们必须首先加载。其中，`react.js` 是 React 的核心库，`react-dom.js` 是提供与 DOM 相关的功能，`Browser.js` 的作用是将 JSX 语法转为 JavaScript 语法。

# 2.ReactDOM.render()

ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

上面代码将一个 h1 标题，插入 example 节点（查看 [index.html](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/index.html)）。

![Alt text](http://lemon.lanqiao.org:8082/teaching/img/react/1.1.png)

# 3.JSX 语法

上一节的代码， HTML 语言直接写在 `JavaScript` 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写（查看 [示例01](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/01/index.html)）:

```
<script type="text/babel">
  var names = ['Alice', 'Emily', 'Kate'];
  ReactDOM.render(
    <div>
      {
        names.map(function(name){
          return <div>Hello,{name}</div>;
        })
      }
    </div>,
    document.getElementById('container'));
</script>
```  
上面代码,render函数的第一个参数体现了 JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。 上面代码的运行结果如下。

 ![Alt text](http://lemon.lanqiao.org:8082/teaching/img/react/1.2.png)

JSX 允许直接在模板中插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员:

```
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

上面代码的arr变量是一个数组，结果 JSX 会把它的所有成员，添加到模板，运行结果如下。

 ![Alt text](http://lemon.lanqiao.org:8082/teaching/img/react/1.3.png)

# 4.组件

React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类（查看 [示例02](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/02/index.html)）。

```
<script type="text/babel">
  var HelloMessage = React.createClass({
    render: function() {
      return <h1>Hello {this.props.name}</h1>;
    }
  });

  ReactDOM.render(
    <HelloMessage name="John" />,
    document.getElementById('container')
  );
</script>
```

上面代码中，变量 `var HelloMessage` 就是一个组件类。模板插入 `<HelloMessage />` 时，会自动生成 `HelloMessage `的一个实例（下文的"组件"都指组件类的实例）。所有组件类都必须有自己的 `render` 方法，用于输出组件。

注意，组件类的第一个字母必须大写，否则会报错，比如`HelloMessage`不能写成`helloMessage`。另外，组件类只能包含一个顶层标签，否则也会报错。

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>
      Hello {this.props.name}
    </h1>
    <p>
      some text
    </p>;
  }
});
```

上面代码会报错，因为HelloMessage组件包含了两个顶层标签：`h1`和`p`。

组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 `<HelloMessage name="John"> `，就是 `HelloMessage` 组件加入一个 `name` 属性，值为 `John`。组件的属性可以在组件类的 `this.props `对象上获取，比如 name 属性就可以通过 `this.props.name `读取。上面代码的运行结果如下。

![Alt text](http://lemon.lanqiao.org:8082/teaching/img/react/1.4.png)

添加组件属性，有一个地方需要注意，就是 `class` 属性需要写成 `className` ，`for `属性需要写成 `htmlFor` ，这是因为 `class` 和 `for` 是 `JavaScript` 的保留字。

# 5.this.props.children

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的所有子节点（查看 [示例03](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/03/index.html)）:

```
<script type="text/babel">
  var NotesList = React.createClass({
    render: function() {
      return (
        <ol>
          {React.Children.map(this.props.children,function(child){
            return <li>{child}</li>;
          })}
        </ol>
      );
    }
  });

  ReactDOM.render(
    <NotesList>
      <span>note1</span>    
      <span>note2</span>    
    </NotesList>
    ,
    document.getElementById('container')
  );
</script>
```

上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取，运行结果如下。

![Alt text](http://lemon.lanqiao.org:8082/teaching/img/react/1.5.png)

这里需要注意， `this.props.children` 的值有三种可能：如果当前组件没有子节点，它就是 `undefined` ;如果有一个子节点，数据类型是 `object` ；如果有多个子节点，数据类型就是 `array` 。所以，处理 `this.props.children` 的时候要小心。

React 提供一个工具方法 `React.Children` 来处理 `this.props.children` 。我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。更多的 React.Children 的方法，请参考[官方文档](https://facebook.github.io/react/docs/top-level-api.html#react.children)。

# 6.PropTypes

组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

组件类的`PropTypes`属性，就是用来验证组件实例的属性是否符合要求（查看 [示例04](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/04/index.html)）。

```
var MyTitle = React.createClass({
propTypes:{
  title:React.PropTypes.string.isRequired
},

render:function(){
  return <h1>{this.props.title}</h1>
}

});
```

上面的`Mytitle`组件有一个`title`属性。`PropTypes` 告诉 React，这个 `title`属性是必须的，而且它的值必须是字符串。现在，我们设置 `title` 属性的值是一个数值。

```
var title = 123;
ReactDOM.render(<MyTitle title={title} />,
document.getElementById('container'));
```

这样一来，title属性就通不过验证了。控制台会显示一行错误信息。

```
react.js:20541 Warning: Failed prop type: Invalid prop `title` of type `number` supplied to `MyTitle`, expected `string`.
    in MyTitle
```

更多的PropTypes设置，可以查看[官方文档](http://facebook.github.io/react/docs/reusable-components.html)。    

此外，`getDefaultProps` 方法可以用来设置组件属性的默认值。

```
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

ReactDOM.render(
  <MyTitle />,
  document.body
);
```

上面代码会输出"Hello World"。

# 7.获取真实的DOM节点

组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性（查看 [示例05](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/05/index.html)）。

```
<script type="text/babel">
  var MyComponent = React.createClass({

    render:function(){
      return (
        <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="getText" onClick={this.handleClick} />
        </div>
        )
    },
    handleClick:function(){
      //查找ref=myTextInput的dom元素
      alert(this.refs.myTextInput.value);
    }
  });

  ReactDOM.render(<MyComponent />,
    document.getElementById('container'));
</script>
```

上面代码中，组件 `MyComponent` 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 `ref` 属性，然后 `this.refs.[refName]` 就会返回这个真实的 DOM 节点。

需要注意的是，由于 `this.refs.[refName]` 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 `Click` 事件的回调函数，确保了只有等到真实 DOM 发生 `Click` 事件之后，才会读取 `this.refs.[refName]` 属性。

React 组件支持很多事件，除了 `Click` 事件以外，还有 `KeyDown` 、`Copy`、`Scroll `等，完整的事件清单请查看[官方文档](http://facebook.github.io/react/docs/events.html#supported-events)。

# 8.this.state

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI （查看 [示例06](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/06/index.html) ）。

```
<script type="text/babel">
// 一个多行文本框和提交按钮
  var TweetBox = React.createClass({
    // 初始化状态
    getInitialState:function(){
      return {
        text:""
      }
    },
    render: function() {
      return (
        <div className="well clearfix">
          <textarea className="form-control" onChange={this.handleChange}></textarea>
          <br/>
          <button className="btn btn-primary pull-right" disabled={this.state.text.length === 0}>Tweet</button>
        </div>
      );
    },
    // 监听文本框内容变化，更新text
    handleChange: function(event) {
      this.setState({text:event.target.value});//自动重新渲染组建
    }
  });

  ReactDOM.render(
    <TweetBox />,
    document.getElementById("container")
  );
</script>
```

上面代码是一个 `TweetBox` 组件，包含一个多行文本框和一个按钮，我们想做的效果是：如果文本框内无内容，按钮是无法点击的。

`getInitialState` 方法用于定义初始状态，也就是一个对象，这个对象可以通过 `this.state `属性读取，如`disabled={this.state.text.length === 0}`。

当用户输入内容，我们用`onChange`来监听，并用`this.setState` 方法修改状态值。每次修改以后，框架会自动调用 `this.render` 方法，再次渲染组件。

由于 `this.props` 和 `this.state `都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，`this.props `表示那些一旦定义，就不再改变的特性，而 `this.state` 是会随着用户互动而产生变化的特性。

# 9.组件的生命周期

组件的生命周期分成三个状态：
- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM

React 为每个状态都提供了两种处理函数，`will` 函数在进入状态之前调用，`did `函数在进入状态之后调用，三种状态共计五种处理函数。

- componentWillMount()
- componentDidMount()
- componentWillUpdate(object nextProps, object nextState)
- componentDidUpdate(object prevProps, object prevState)
- componentWillUnmount()

此外，React 还提供两种特殊状态的处理函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

请看栗子（查看 [示例07](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/07/index.html)）：

    <script type="text/babel">
    var Hello = React.createClass({
      getInitialState: function () {
        return {
          opacity: 1.0
        };
      },

      componentDidMount: function () {
        this.timer = setInterval(function () {
          var opacity = this.state.opacity;
          opacity -= .05;
          if (opacity < 0.1) {
            opacity = 1.0;
          }
          this.setState({
            opacity: opacity
          });
        }.bind(this), 100);
      },

      render: function () {
        return (
          <div style={% raw %}{{opacity: this.state.opacity}}{% endraw %}>
            Hello {this.props.name}
          </div>
        );
      }
    });

    ReactDOM.render(
      <Hello name="world"/>,
      document.getElementById('container')
    );
    </script>


上面代码在`hello`组件加载以后，通过 `componentDidMount `方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。

另外，组件的`style`属性的设置方式也值得注意，不能写成

```
style="opacity:{this.state.opacity};"
```

而要写成

```
style={% raw %}{{opacity: this.state.opacity}}{% endraw %}
```

这是因为 React 组件样式是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。

# 10.Ajax

组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 `componentDidMount` 方法设置 Ajax 请求，等到请求成功，再用 `this.setState `方法重新渲染 UI (查看 [示例08](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/08/index.html))

```
<script src="http://code.jquery.com/jquery-2.2.2.min.js"></script>
<script type="text/babel">
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentWillMount: function() {
    // 发起ajax请求并设置状态
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username} s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('container')
);
</script>
```

上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库。

上面代码中，我们给`UserGist`组件传入`url`作为`source`属性，组件的`getInitialState`函数初始化`state`的`username`和`lastGistUrl`为空字符串，在即将生成`dom`并插入的监听函数`componentWillMount`中发起`ajax`请求，并根据返回的`json`重新设置`state`，这样`render`函数使用的就是最新的`state`了。

一个更复杂的示例（查看 [示例09](https://coding.net/u/lanqiao/p/reactDemo/git/blob/master/examples/09/index.html)）,查询github上最受欢迎的js仓库。

```
<script type="text/babel">
var RepoList = React.createClass({
  // 初始状态
  getInitialState: function() {
    return { loading: true, error: null, data: null};
  },

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({loading: false, data: value}),
      error => this.setState({loading: false, error: error}));
  },
  // 根据状态进行渲染
  render: function() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    }
    else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }
    else {
      var repos = this.state.data.items;
      var repoList = repos.map(function (repo) {
        return (
          <li>
            <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
          </li>
        );
      });
      return (
        <main>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </main>
      );
    }
  }
});
// 将json对象传递给组件
ReactDOM.render(
  <RepoList
    promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}
  />,
  document.getElementById('container')
);
</script>
```

上面代码从Github的API抓取数据，然后将`Promise`对象作为属性，传给`RepoList`组件。

如果Promise对象正在抓取数据（pending状态），组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。

# 11.总结

- 我们首先需要知道：使用`react`要引入`react.js`和`react-dom.js`，如果要使用`jsx`语法，还要引入`browser.js`
- 使用`jsx`语法，`script`标签的`type`属性应该定义为`text/babel`
- `ReactDOM.render`函数有两个参数，第一个参数是虚拟`dom`，第二个参数是插入`dom`的父级`dom`
- `React.createClass`函数用于创建组件，它接收一个组件描述对象，该对象有若干属性：
  - `render`,函数，返回虚拟dom，可以夹杂`html`语法和`js`语法
  - `propTypes`，对象，描述组件各属性的类型及较验规则
  - `getDefaultProps`，函数，返回一个对象，描述各属性的默认值
  - `getInitialState`，函数，返回状态对象
  - `componentWillMount`，函数，在mount之前被调用
  - `componentDidMount`，函数，在mount之后被调用
- `React.createClass`中任意地方都可以通过`this.props.propName`来获得实例化该组件时传入的属性
- `React.createClass`中状态监听函数和事件监听函数中都可以用`setState`函数刷新`state`状态，`react`会自动比对新状态下`dom`的差异并决定是否重新渲染。
- 获取真实的`DOM`节点，需要在节点上添加`ref`属性，指定一个名字，然后在`jsx`中使用`this.refs.refName`就可以获得这个节点。
- `this.props.children`是特殊的，它用于获得组件的所有子节点，遍历这个对象，我们使用：

```
React.Children.map(this.props.children,function(child){...});
```

- ajax请求要么在传入属性时就发生，直接将ajax结果作为熟悉传递给组件；要么就在`componentWillMount`或者`componentDidMount`函数中执行并将结果（或部分结果）设置到`state`中。



# 12.参考链接

1. [React's official site](http://facebook.github.io/react)
2. [React's official examples](https://github.com/facebook/react/tree/master/examples)
3. [React (Virtual) DOM Terminology](http://facebook.github.io/react/docs/glossary.html) by Sebastian Markbåge
4. [The React Quick Start Guide](http://www.jackcallister.com/2015/01/05/the-react-quick-start-guide.html), by Jack Callister
5. [Learning React.js: Getting Started and Concepts](https://scotch.io/tutorials/learning-react-getting-started-and-concepts), by Ken Wheeler
6. [Getting started with React](http://ryanclark.me/getting-started-with-react/), by Ryan Clark
7. [React JS Tutorial and Guide to the Gotchas](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/), by Justin Deal
8. [React Primer](https://github.com/BinaryMuse/react-primer), by Binary Muse
9. [jQuery versus React.js thinking](http://blog.zigomir.com/react.js/jquery/2015/01/11/jquery-versus-react-thinking.html), by zigomir