---
layout: post
title: 别责怪框架：我使用 AngularJS 和 ReactJS 的经验
category: 前端那些事儿
tags: AngularJS ReactJS
author: 
keywords: lanqiao 蓝桥 培训 教程 前端 AngularJS ReactJS
description:
---

# 别责怪框架：我使用 AngularJS 和 ReactJS 的经验

> 本文转载自：[众成翻译](http://www.zcfy.cc)
> 译者：[十年踪迹](http://www.zcfy.cc/@akira)
> 链接：[http://www.zcfy.cc/article/327](http://www.zcfy.cc/article/327)
> 原文：[https://www.ckl.io/blog/dont-blame-the-framework-angularjs-and-reactjs/](https://www.ckl.io/blog/dont-blame-the-framework-angularjs-and-reactjs/)

在过去的几年里，网站进化成了复杂的网页应用。曾经的互联网只涉及到简单的商业信息展现，而如今，看看 Facebook、Slack、Spotify 以及 Netflix，互联网正在改变你的社交和生活方式。随着互联网的发展，前端开发这个行业达到了全新的高度，并得到了前所未有的重视。

就像大多数前端开发者那样，我们的技术栈曾经由 HTML 和 jQuery 构成。我们使用 AJAX 请求从后端获取数据，使用 JavaScript 渲染新的 UI 元素然后将它插入到 DOM 中去，用户交互通过事件绑定和回调函数来实现。不要误解我，我不反对上面那种方式，它们今天依然适合于大多数 Web 应用。

然而，当一个应用的复杂度大幅度增加，[一堆问题](https://reinteractive.net/posts/186-lessons-learnt-by-building-single-page-applications)开始出现得比预期的更频繁：你可能数据更新了，但漏掉了更新某一处展现，你通过 Ajax 获取和更新了内容，但没有绑定事件，还有另外一些问题，把这些全部列出来会是个很长的清单。这些问题让你的代码逐渐变得不可维护，尤其是在多人协作团队开发的项目中。这时候，你就需要使用前端框架来为你解决多人协作开发的种种问题了。

![write_code](https://p5.ssl.qhimg.com/d/inn/49516259/write_code.gif)

&lt;!--more--&gt;

## 1. React 福音

当我们的团队开始寻找一个合适的前端框架的时候，我们考虑了许多选择，最后留下两个选项 —— [Angular](https://angularjs.org/) 和 [React](https://facebook.github.io/react/)。

Angular 是目前为止最成熟的方案：它拥有一个庞大的社区，你可以为大部分应用场景找到合适的第三方模块。

React 也很有竞争力，它以 JavaScript 为中心的设计看起来很有前途，而且它性能很好。虽然它还是 Beta 版本，但是 “由Facebook团队开发的” 这一点给它的竞争力加分。

我们决定给 React 一个机会，选择了使用它。

最初使用 React 让人感觉棒极了，我们可以用 JavaScript 来做一切：展现一段 HTML，通过遍历数组渲染一个列表，优雅地改变一个变量的值，然后看着它通过 [props](https://facebook.github.io/react/docs/transferring-props.html) 传播到各处，更新要更新的内容到[可复用组件](https://facebook.github.io/react/docs/reusable-components.html)里，然后一切就绪了，没有一坨一坨的代码，只有真正的[停下来思考](https://facebook.github.io/react/docs/thinking-in-react.html)。React 解决了我们在团队开发中编写可维护代码的诉求。

![teamwork_1](https://p5.ssl.qhimg.com/d/inn/2aabee1d/teamwork_1.gif)

## 2. React + Flux = ♥

但沿着这条路走下去，我们发现并不是一切都很美好。我们遇到的第一个大挑战就曾让我们考虑是否应该放弃 React —— 我们陷入了回调迷宫。

由于 React 的单向数据流性质，如果子组件需要更新父组件的状态，父组件就要[传一个回调函数给它](https://facebook.github.io/react/tips/communicate-between-components.html)。这咋看起来没有什么大不了的，然而如果你的组件要更新 root 组件的状态，你就不得不将 “this.props.updateCallback” 沿着数据流一层一层传递下来。

尽管如此，我们喜欢 React，继续使用它完成我们的工作。通过努力，我们找到了 [Flux](https://facebook.github.io/flux/)，它是一种规范化单向数据流的架构思想。它由[四个主要元素](https://facebook.github.io/flux/docs/overview.html#structure-and-data-flow)构成。

*   Store: 负责存储数据和应用状态。
*   Action: 触发状态改变。
*   Dispatcher: 管理 action 并将它们导向对应的 store。
*   View: 展现 store 中的数据，派发 action - 这块是 React 中已有的。

采用 Flux，我们就不用将状态保存在 root 组件中，然后将 update 回调一层层传递给它的子组件。React 组件通过 store 直接获得数据，通过调用 action 来改变状态：这样简单、优雅，不会让你抓狂。Flux 补充了可预测的行为和一些标准到被 React 框架约束的代码中。


## 3. 狂野的 Angular 出场……

……它采用以 HTML 为中心的代码且[并不超有效](http://knowyourmeme.com/memes/its-super-effective)。

![pokemon_effective](https://p5.ssl.qhimg.com/d/inn/b280a723/pokemon_effective.jpg)

最近，我开始参与一个 Angular 项目。我加入的时候这个项目已经完成了很大一部分了，所以不得不用 Angular，没有回头路。作为一个忠实的 React 开发者，我吐槽 Angular。当我开始写第一行 Angular 代码的时候，我就真心诅咒它。这就是所谓的：[如果你爱 React，那你就恨 Angular](https://medium.com/%40jeffwhelpley/screw-you-angular-62b3889fd678#.oy3ij6ft3)。

我不能自欺欺人，在一开始，我写 Angular 代码一点也不开心。将框架定义的属性（或者，更恰当地说法是 directives）写入到 HTML 中的做法让我感觉很不爽。我得费很大劲才能实现很简单的功能，比如[改变 URL 的时候不重新加载 controller](https://github.com/angular/angular.js/issues/1699) 或者渲染基础模板。

当我在表单中遇到一个由于 _[ngIf](https://docs.angularjs.org/api/ng/directive/ngIf)_ directive 创建一个新的子域而导致的问题时，我处理起来还是很费劲。还有当我想要从一个准备发送给服务器的 JSON 中移除一些空白字段时，我发现 UI 中对应的数据也被一并移除了 —— 丫的双向绑定 ╮(╯▽╰)╭。还有当我想要使用 _[ngShow](https://docs.angularjs.org/api/ng/directive/ngShow)_ 和 _[ngHide](https://docs.angularjs.org/api/ng/directive/ngHide)_ 来显示一个 HTML 块同时隐藏另一个 HTML 块时，在一瞬间，两者同时显示了。我明白许多问题是我自己的问题，而我想要指出的是，Angular是不可预测的，使用它的时候会遇上各种各样的坑。

![struggle](https://p5.ssl.qhimg.com/d/inn/8e8d718a/struggle.gif)

当然，Angular 还是善于处理很多事情的。[内建的 HTTP 请求模块](https://docs.angularjs.org/api/ng/service/$http) 非常棒，对 promise 的支持也很好。另一个我无法吐槽的好东西是：[内建的表单控制器](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController)，它为 input 字段提供了默认的格式化、解析和校验，而且还提供了一个很好的插件用来展示错误信息。

使用 Angular 也能让开发团队与页面制作团队协同工作变得更简单。在我们团队，有专门的页面重构工程师负责写 HTML 和 CSS，Angular 能让我们的工作无缝对接：重构工程师负责 HTML 和一些额外的标签，我负责处理逻辑。如果我们使用的是 React，那么至少让重构工程师写组件会是一个挑战，要么得让他学会写基本的 JSX，要么我就只能自己将他写的 HTML 复制粘贴到 JSX 中。

还记得前面提到的 URL 替换和模板渲染问题吗？其实没关系，人们通常使用第三方的路由库([ui-router](https://github.com/angular-ui/ui-router))它们比标准的 ([ngRoute](https://docs.angularjs.org/api/ngRoute))要好用。最后，Angular 也没有我之前认为的那样糟糕。之前的大多数抱怨要么是因为我习惯了 React 思维，要么是我还不够专业。

![obama_not_bad](https://p5.ssl.qhimg.com/d/inn/c8cc886e/obama_not_bad.gif)

## 4. 总结: AngularJS 与 ReactJS

React 使用原生 JavaScript 函数让开发者可以创建一个有固定生命周期的、单向数据流的可复用组件。React 与 Flux 架构（或者受 Flux 启发而产生的其他架构，比如 Redux）相结合，能让团队长期维护一个项目变得更加容易，使用它不用担心解决一个 bug 会引入更多新 bug。但是，如果你的团队有专门写 HTML 和 CSS 的人，React 会带来额外的学习成本，因为它改变了传统的开发流程。而且 React 的效果还非常依赖你选择的组成你的应用的模块。

另一方面，Angular 专注于设计简单的双向数据绑定，当你改变 controller scope 中的内容，变化将会被自动地同步到UI（效果如同魔法般）。它自认为节省了配置的时间，开发者不用像传统开发模式那样考虑用各种设计模式组织代码然后从上百种可选的方案中选出一个核心模块。使用双向绑定为开发带来了便利，然而它也容易在长期维护的过程中由于修改部分代码而产生不可预期的 bug，尤其是那些在过去的几个月中没有再动过的代码。

那么，我从头开始创建 app 的首选方案是什么呢？

从长远而言，我个人倾向于选择 React，使用 [Redux](https://www.ckl.iohttp://redux.js.org/) 架构，使用 [Axios](https://github.com/mzabriskie/axios) 支持 promise-ready 的 HTTP 请求，以及使用 [react-router](https://github.com/reactjs/react-router) 处理路由。不过，这也取决于团队的经验：如果有专门写 HTML 和 CSS 的人，我肯定会选择 Angular。两个框架都各有利弊，从构建可维护项目的目的来考虑，最关键的还是如何让小伙伴们写出好代码。

![At the end, Angular was not as bad as I expected.](https://p5.ssl.qhimg.com/d/inn/01a348f8/At-the-end-Angular-was-not-as-bad-as-I-expected..gif)

> 版权声明
> 本译文仅用于学习、研究和交流目的，欢迎非商业转载。转载请注明出处、译者和众成翻译的完整链接。要获取包含以上信息的本文Markdown源文本，请点击这里。