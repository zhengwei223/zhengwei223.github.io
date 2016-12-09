---
layout: post
title: JavaEE全栈技术概念手册
category: lanqiaoEE
tags: 概念 路线图 roadmap
author: 郑未
keywords: lanqiao 蓝桥 全栈 JavaEE 教程
description: 本文档旨在向读者介绍JavaEE全栈技术的概貌，熟悉这些技术是做好项目的前提。 
importance: 1
---

本文档旨在向读者介绍JavaEE全栈技术的概貌，分别介绍以下内容：

![典型技全栈术模型](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack1.png)

# 客户层
客户层负责展现ui，用户交互，向web层发起请求（携带请求参数），Web层负责向客户层输出数据（整个html或者html片段，或者json，或者xml）。客户端主要有浏览器、**手机应用、其他移动设备、其他系统**。

## 浏览器
浏览器运行html，相关的技术有：html、css和js。Html由标签组成，用于描述页面上的元素及展现方式，可以选择h4或者h5，[参考文档](https://developer.mozilla.org/en-US/docs/Web/HTML)。Css用于描述页面元素的样式（如颜色、大小、边距、位置），也有新的版本，css3，[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS "css参考文档")。Js（[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)）是一种编程语言，之前主要运行在浏览器上，由浏览器提供js引擎负责对js进行解释和执行，主要负责提升页面的交互能力，可以让页面动起来（最典型的就是弹窗）。

Css 框架：原始的html基本上就是黑白+框，css可以美化html，但是对于编程人员来讲，多数不擅长美化工作，好在业界出现了像[Twitter Bootstrap](http://twitter.github.com/bootstrap/)这样优秀的css框架。它提供了便捷的布局方式（改进了div+css布局），所有页面元素的默认美化样式，ui组建的基本交互，还接受各种ui插件（ui、样式和交互）。
Js框架：同样，原始的js开发效率较低，为完成一个简单的交互需要写多行代码，js框架的作用就是提供更简单、更强大的API。首推[JQuery](http://www.jquery.com/)。

##  移动设备
安卓程序：有一套自己的ui及交互方式

ios程序：有一套自己的ui及交互方式

H5程序：有一套自己的ui及交互方式

## 其他系统
不确定是否有ui，不确定其技术。Web层只负责提供API，典型地返回json或者xml，对客户层的具体表现不知道。

# Web层

## JavaEE

受[JavaEE规范](https://jcp.org/aboutJava/communityprocess/final/jsr316/index.html)约束。编程要使用[JavaEE-API](https://docs.oracle.com/javaee/7/api/)。

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack2.png)

Web server：web层首先要有一个运行的server，接收来自客户端的请求，找到相关资源，并按客户端要求的媒体类型进行返回。它的工作围绕请求和响应展开。请求和响应都需要协议，现在的主流协议是http（还有别的协议如ftp）。http对url、请求报文、响应报文都做出了严格的规定。

Web server只负责基本的消息的收发，不负责具体业务的处理，因为业务是千变万化的。因此这里也体现了“分离”的编程思维。Web server可以不处理业务，但是能“安装”处理业务的程序，web server能根据请求找到这些程序并运行它，由程序直接返回结果，或者结果返回给server，server经过处理再返回给客户端。

因此，有时候我们也称web server为web容器(web container)——容纳handler(具体指JSP Servlet)的容器。

------

Java世界里面的web server主要有免费的tomcat和商业的weblogic、websphere等。[Tomcat](http://tomcat.apache.org/)是业界主流。

-----

既然web server已经有人实现了，现在的重点就是编程人员要实现也有处理程序，实现好了，“安装”到server即可。

为了能让server和业务程序完美地配合，[JavaEE规范](https://www.jcp.org/en/jsr/detail?id=316)同时规范了server标准（web container）和业务处理程序标准（Servlet-API），我们必须在规范下编写业务处理程序，否则server会“拒不运行”。

我们所熟知的Servlet-API有Servlet、Filter和Listener。Servlet负责业务处理，Filter负责拦截请求，做前置处理，Listener负责监听容器内发生的事件（如启动、关闭、新增app范围内属性，新增session范围内属性等）。

---

Servlet中，可以操作[HttpServletRequest](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletRequest.html)对象，这个对象由server封装并传输给Servlet的service方法，我们在service方法中实现业务时，可以直接使用它①来获得关于客户端请求的一切数据（url，参数，header，cookie，上传的文件）等等；还可以②在request中共享数据，以便于下一个处理者（可以是试图模板）进行后续处理。

Servlet中，可以操作[HttpServletResponse](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletResponse.html)对象，这个对象由server封装并传输给Servlet的service方法，我们在service方法中实现业务时，可以直接使用它①设置响应参数（如媒体类型、状态码等）②设置具体的响应内容③输出响应内容。

Servlet中还有很多可以操作的对象，此处不赘述，参考[JavaEE-API的http包](https://docs.oracle.com/javaee/7/api/javax/servlet/http/package-summary.html)。

## Web-MVC

MVC并不是JavaEE的标准，是一种编程思想，旨在划清视图逻辑和业务逻辑。在Servlet中可以直接生成html视图，但是这样就违背了mvc原则。按照mvc原则，Servlet不应该考虑视图怎么展现，它只提供数据即可。

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack3.png)


### Model是什么

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack4.png)

Model就是上图中的DTO，俗称数据传输对象，它贯穿于多个层。

不用框架也可以实现mvc，最典型的MVC就是JSP + servlet + javabean的模式。但有了框架更好。框架帮我们解决了很多问题，如数据绑定（含类型转换）、层次分割、标签、国际化支持等。

### Struts
Struts的第一代产品曾统领java世界的mvc框架，升级到第二代后仍是主流，但有没落的趋势。

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack5.png)

一个请求在Struts2框架中的处理大概分为以下几个步骤:

1. 客户端初始化一个指向Servlet容器（例如Tomcat）的请求

2. 这个请求经过一系列的过滤器（Filter）（这些过滤器中有一个叫做ActionContextCleanUp的可选过滤器，这个过滤器对于Struts2和其他框架的集成很有帮助，例如：SiteMesh Plugin） 

3. 接着FilterDispatcher（现已过时）被调用，FilterDispatcher询问ActionMapper来决定这个请是否需要调用某个Action 

4. 如果ActionMapper决定需要调用某个Action，FilterDispatcher把请求的处理交给ActionProxy 

5. ActionProxy通过Configuration Manager询问框架的配置文件，找到需要调用的Action类 

6. ActionProxy创建一个ActionInvocation的实例。

7. ActionInvocation实例使用命名模式来调用，在调用Action的过程前后，涉及到相关拦截器（Intercepter）的调用。 

8. 一旦Action执行完毕，ActionInvocation负责根据struts.xml中的配置找到对应的返回结果。返回结果通常是（但不总是，也可 能是另外的一个Action链）一个需要被表示的JSP或者FreeMarker的模版。在表示的过程中可以使用Struts2 框架中继承的标签。在这个过程中需要涉及到ActionMapper

在上述过程中所有的对象（Action，Results，Interceptors，等）都是通过ObjectFactory来创建的。

### SpringMVC
通常我们说的[spring](http://spring.io/)是[spring-framework](http://projects.spring.io/spring-framework/)，其实spring还有不少其他的项目。Spring-framework提供：

依赖注入、AOP面向切面编程、Spring Mvc web应用程序和RESTful web service框架、对持久层的支持等等。

这里我们先了解SpringMvc——Spring web mvc框架围绕**DispatcherServlet** 来工作，完成依据映射配置将请求分发到处理器（handler），解析视图、国际化与本地化、文件上传等工作。

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack6.png)


**Spring工作流程描述**
1. 用户向服务器发送请求，请求被Spring 前端控制Servelt DispatcherServlet捕获；
      
2. DispatcherServlet对请求URL进行解析，得到请求资源标识符（URI）。然后根据该URI，调用HandlerMapping获得该Handler配置的所有相关的对象（包括Handler对象以及Handler对象对应的拦截器），最后以HandlerExecutionChain对象的形式返回；
     
3. DispatcherServlet 根据获得的Handler，选择一个合适的HandlerAdapter。（附注：如果成功获得HandlerAdapter后，此时将开始执行拦截器的preHandler(...)方法）

4.  提取Request中的模型数据，填充Handler入参，开始执行Handler（Controller)。 在填充Handler的入参过程中，根据你的配置，Spring将帮你做一些额外的工作：

HttpMessageConveter： 将请求消息（如Json、xml等数据）转换成一个对象，将对象转换为指定的响应信息

数据转换：对请求消息进行数据转换。如String转换成Integer、Double等

数据根式化：对请求消息进行数据格式化。 如将字符串转换成格式化数字或格式化日期等

数据验证： 验证数据的有效性（长度、格式等），验证结果存储到BindingResult或Error中

5.  Handler执行完成后，向DispatcherServlet 返回一个ModelAndView对象；

6.  根据返回的ModelAndView，选择一个适合的ViewResolver（必须是已经注册到Spring容器中的ViewResolver)返回给DispatcherServlet ；

7. ViewResolver 结合Model和View，来渲染视图

8. 将渲染结果返回给客户端。

### 独特视角解读MVC
其实mvc框架的核心是改进Servlet，因为Servlet太low：

1. Servlet所有处理方法的参数都是容器给的，所以很难测试，必须先启动容器，很难用编程方式来进行测试（自己构造request等参数？好想法！）

2. 不好测试，可以忍！request里面全部是字符串键值对，通常我们都要将若干个键值对封装成一个对象（领域数据模型、dto、vo很多名字），这个过程很痛苦①判断是否为空②类型转换（对象的属性可不都是String，还有int呢），处理转换的异常（123怎么转成Date类型）③新建对象并初始化其属性。几乎每个业务都要做这些重复动作——不好忍。

基于以上两点，一个mvc框架必须定义自己的handler及映射方式，这个handler和servlet-api无关（官方说handler是pojo即普通java对象），这样好测试；必须通过某种方式在编写业务处理代码之前就做好数据绑定（简单来说就是把请求参数映射到数据模型对象上）并自动处理异常。

Struts和spring都提供了xml和注解方式来配置请求到handler的映射。但数据绑定有些不同，struts将数据绑定到handler类的属性上，spring将请求绑定到handler类的方法上。因为一个handler有多个业务方法，这些业务方法未必共享同样的数据（类的属性），所以根据方法来绑定数据更加灵活、直观。

----------

如果再要概括点：①和servlet-api解耦便于测试②数据绑定减少繁琐的编码

----------

3. 基于业务层不干涉视图层的要求，handler中不应该出现任何关于视图渲染的代码，通常的做法是handler方法返回一个逻辑字符串（视图名），而视图的具体特性放在配置文件中，mvc框架必须提供逻辑视图名到实际视图的映射。这样做的好处在于，替换视图（特别是视图模板）不用修改handler的代码。

视图模板不止有JSP，还有freemarker、velocity等很多模板语言，struts和spring都支持这三种模板。

4. 至于其他的，如数据验证、国际化、模板语言标签、el表达式等，都是附加值。

### 推荐SpringMVC
SpringMVC3.0 Restful的风格终于回归了MVC框架的简单本质，对比之下Struts2概念太复杂更新又太懒了。SpringMVC的优点：

- 让我们能非常简单的设计出干净的Web层和薄薄的Web层；

- 进行更简洁的Web层的开发；

- 天生与Spring框架集成（如IOC容器、AOP等）；

- 提供强大的约定大于配置的契约式编程支持；

- 能简单的进行Web层的单元测试；

- 支持灵活的URL到页面控制器的映射；

- 非常容易与其他视图技术集成，如Velocity、FreeMarker等等，因为模型数据不放在特定的API里，而是放在一个Model里（Map数据结构实现，因此很容易被其他框架使用）；

- 非常灵活的数据验证、格式化和数据绑定机制，能使用任何对象进行数据绑定，不必实现特定框架的API；

- 提供一套强大的JSP标签库，简化JSP开发；

- 支持灵活的本地化、主题等解析；

- 更加简单的异常处理；

- 对静态资源的支持；

- 支持Restful风格。

## 视图模板
Web网页视图要动态起来，都采用“模板”这种概念，即静态模板部分+动态数据填空部分。JSP就是典型的模板语言，俗称在HTML（模板）中写Java代码（动态），但是为了让JSP好维护、易阅读，通常不在JSP里面写Java代码，而是用el表达式、标签等形式来做动态数据填空。

类似的有freemarker、velocity，作用是类似的，当下比较流行freemarker：FreeMarker是一个用Java语言编写的模板引擎，它基于模板来生成文本输出。FreeMarker与Web容器无关，即在Web运行时，它并不知道Servlet或HTTP。它不仅可以用作表现层的实现技术，而且还可以用于生成HTML，XML，JSP等文本。SpringMVC中可以无缝集成Freemarker。其优点：

- 不能编写java代码，可以实现严格的mvc分离。

- 性能非常不错。

- 对jsp标签支持良好。

- 内置大量常用功能，使用非常方便。

- 宏定义（类似jsp标签）非常方便。

- 使用表达式语言。

### 注意

要注意任何模板其背后都有一个引擎负责将其转换为html或别的文本，JSP虽然像HTML，但是浏览器并不会解析它（特别是其el及自定义标签部分），因为JSP不符合HTML标准。

转换的时机在业务处理结束之后，mvc的视图解析器会调用对应的引擎生成文本，以io流形式写出，典型地，向浏览器发送html文本。

## Restful web service 和Ajax

### 概念

REST（REpresentation State Transfer）：表述性状态转移——不知道是什么鬼！

它基于无状态、客户端-服务端结构、可缓存的通信协议——HTTP全中，在几乎所有情况下，使用HTTP协议。

它是一种设计网络应用的架构风格和原则，不是具体的技术，也不是标准。

它是RPC（Remote Procedure Calls）和web service（SOAP, WSDL, ……）的轻量级替换。

REST web service要做到以下几点：

- 平台无关
- 语言无关——C#可以访问Java实现的service
- 基于http
- 可以很容易地在防火墙的情况下被使用

	-- 如Web服务，REST没有提供内置的安全功能，加密，会话管理，QoS保证等，同时也如Web服务，这些都可以在HTTP之上添加：

	--用户名/密码验证；

	--基于https对内容进行加密。

### 解读

REST只注重服务端，用于提供服务，并不管客户端在什么平台，用什么技术，更不管客户端怎么渲染视图，所以我们之前做的项目都不是REST（我们的项目自己渲染视图，显然限定了客户端必须是浏览器）。

REST基于HTTP，一个URL就是一个资源，这是JavaEE本身做到的，但是rest没有session，是设计的难点。

REST也不推荐用cookie，REST中的ST代表“状态转送”，一个良好的REST设计的操作（请求）是自包含的，每个请求附带着（传送）服务器完成该请求所需的全部信息（状态）。

### REST和AJAX

AJAX是非常受欢迎的web开发技术，使用js让页面更具有交互性。

在AJAX中，使用XMLHttpRequest对象来向server发起请求，js代码使用响应的文本来动态地修改当前页面。

AJAX应用被视为遵循REST概念，每个XMLHttpRequest视为一次REST请求，响应，通常是JSON，是最主流的REST响应格式。

### Rest的安全机制
- 判定用户是否已经登录：每次登录后,为用户生成一个唯一的随机token,客户端调用时,把token传过来(query params or header),服务器根据token找到对应的用户 

1. access token 没过期的话，直接认为用户已登录 

2. access token 过期，有 refresh token 的话，使用 refresh token 来换取 access_token，成功的话就算登录成功，否则清除保存的 token，认为用户没有登录 

3. 都没有的话，认为用户没有登录 

- 如何对每一次 api 请求进行验证：客户端调用需要验证的接口记得传token 

- 服务端与客户端通信时确保用户授权信息不被泄露：简单的方案就是采用https 

 
其实web网站的session也是基于token实现的,只是token是写在cookies里,由web框架自动管理。 

## Web的安全
### 合法性

Web资源的安全必须考虑，通常保护资源的手段为认证（authentication）与授权（authorization），即身份验证和权限判断。如果某资源设定为受保护，那么访问者必须是本系统的用户，需要用户名密码进行验证，验证通过后还要比对该用户拥有的权限和本资源所需的权限是否一致。

安全框架有：[Apache Shiro](http://shiro.apache.org/)和SpringSecurity。

### 传输的安全性

为保证数据在传输过程中的安全，需要对数据进行加密，此处需要了解[SSL](https://www.digicert.com/ssl.htm)和[HTTPS](https://en.wikipedia.org/wiki/HTTPS)。

# 业务层

业务层由于和业务相关，是属于项目核心部分，没有什么框架，但要注意两个问题①依赖②事务。

## 用spring完成di（dependency injection ）

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack7.png)

典型地，handler依赖service完成业务，service依赖dao完成数据持久化操作，用di来解除耦合是有必要的，这已经成为一种事实上的标准。

Spring通过ioc容器来实现di，配置方式有xml和注解两种方式

## 事务控制应该架设在服务层上

如题！为什么呢？因为一个业务可能调用多个crud数据库操作，如果在dao层，就可能出现同一个业务部分成功部分失败的情况，为了保证一个service方法内的操作同成功同失败，事务应该定义在service的方法级别。

事务的实现有编程式和声明式，编程式就是在代码中实现，声明式则是将AOP的环绕通知配置在切面（所有service的所有方面就组成了一个横向切面）上。

Spring提供了强大的声明式事务，可以通过xml和注解方式实现。

# 持久层

数据存储形式虽多（xml、其他文件、数据库），但开发中说的持久层往往特指数据库持久化技术。

## Jdbc

Jdbc是java给编程者提供的最基础的操作数据库的工具，但是太基础，无法接受数据对象作为sql参数，sql产出也不是对象或者对象集合（是类似二维数组的ResultSet）。

因此才会有那么多著名的orm框架，连JavaEE规范都出了JPA-API。

## [Hibernate](http://hibernate.org/orm/)

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack8.png)

Hibernate将实体对象与表的映射作为其基础配置，于其上设计了一个SQL引擎，对外公开了面向对象的持久化操作API，编程者调用这些API，会转入SQL引擎自动生成sql语句，底层仍然是调用jdbc来完成的。

## [iBatis](http://blog.mybatis.org/)

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack9.png)

iBatis最大的特点是，sql得编程人员自己写，框架帮你做连接的管理，提供操作命名sql（其实不是简单的命名sql，可以理解为配置了一个完整的Statement）的API，并可用java对象作为参数，将java对象作为返回值。

简单地说，外在来看，iBatis解决了参数映射和结果映射的问题。

可见iBatis是一个对jdbc轻量封装的框架。

## MyBatis and MyBatis-Spring

![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack10.png)


![](http://lemon.lanqiao.org:8082/teaching/img/roadmap/fullstack11.png)

MyBatis3有重大的突破，可以将Mapping File中的一个操作映射到一个方法，而整个Mapping File就和一个接口对应。神奇的是，我们并不需要实现这个接口，我们只需做好映射，框架会自动帮助我们实现（底层用代理模式），因此持久层的客户（如服务层）依赖Mapper Interface即可。

## 数据库连接池: Druid
连接池的基本原理是批量初始化数据库连接并管理这些连接，当app不需要连接的时候，是回收而不是关闭，这样就提高了连接的利用率，减少了反复向数据库申请连接的高额开销。

常用连接池实现有：[DBCP](https://commons.apache.org/proper/commons-dbcp/)、[C3P0](http://www.mchange.com/projects/c3p0/)以及阿里的[druid](https://github.com/alibaba/druid)。


# 资源层

资源层主要指应用程序之外的资源，如服务器和数据库。

## 关系型数据库

Oracle，MySQL。

## NOSQL数据库:

使用Nosql的大部分为对性能要求较高的应用。普通应用不需要使用Nosql数据库。如，MongoDb、redis等。

## 操作系统

开发随意。部署环境通常是Linux。

# 核心支撑层及工具

这些东西不在哪一层上，可能每一层都要用，如日志组件、io工具包等。

## Spring IOC及AOP

必备。

### Cache

普通应用不使用缓存，小型缓存使用[Ehcache](http://ehcache.org/)，大型缓存使用[Memcached](http://memcached.org/)或[Redis](http://redis.io/)。

### Schedule： [Quartz](http://quartz-scheduler.org/)

### General：[Apache Commons Lang](http://commons.apache.org/lang/)，[Apache Commons IO](http://commons.apache.org/io/)，[Guava](http://code.google.com/p/guava-libraries/)。

### XML： DOM4J、jdom。

### [JSON](http://www.json.org/)： 

GSon虽然系出名门而且接口优雅，但[Jackson](http://jackson.codehaus.org/)的功能更加丰富到匪夷所思，而且比GSon快很多。

### Logging: 

[Slf4j](http://www.slf4j.org/) + Logback。

用[Log4jdbc](http://code.google.com/p/log4jdbc/)在开发时查看实际执行的SQL。

### Unit Test： [JUnit](http://www.junit.org/)。


# 开发环境

首选eclipse。

用[Maven](http://maven.apache.org/)，在项目构建脚本不复杂的时候的首选，gradle也可以.

Git或者svn做版本控制

[Sonar](http://www.sonarsource.org/)做代码质量检查。