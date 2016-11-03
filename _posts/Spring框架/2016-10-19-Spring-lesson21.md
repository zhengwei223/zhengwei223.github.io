---

layout: post


title: 拆分配置文件


category: Spring框架


tags: Spring框架


description: 本章将系统介绍拆分配置文件。学习拆分配置文件，可以减少并发性的冲突。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE Spring框架

---

# 21.1 拆分思路 #

我们之前是将所有的配置内容，都放在了一个applicationContext.xml之中，这样会造成配置内容的可读性、可维护性变差。而且，如果多个开发人员同时使用同一个配置文件，将很容易引起并发性的冲突。因此，我们通常需要把applicationContext.xml分解成多个比较细粒度的配置文件，每个配置文件只配置某一个模块。


通常有两种分解的思路：


**(1)借用“三层架构”的分层模式：**

`DAO`、`Service`、`controller`(或`action`、`servlet`)，以及公用配置（如数据源、事务）各写在一个单独的配置文件中。

**(2)将每一个模块功能，单独写在一个配置文件之中。**


例如将“学生管理”模块和“部门管理模块”各写在一个配置文件之中。其次，再将公用配置（如数据源、事务）单独写在一个配置文件中。


# 21.2 Spring配置文件的路径 #

在讲解配置文件的拆分方法之前，我们有必要先来了解一下Spring配置文件的路径。

我们通常是用Spring来开发Web项目。而在Web项目中，一般需要在Web服务启动时，就自动启动Spring容器，然后让Spring容器来为其他框架提供服务。但是在Web项目中，无法像普通应用那样在`main()`方法里，通过创建`ApplicationContext`对象来启动Spring容器；而是需要通过在web.xml中配置一个监听器`Listener`，使得在Web容器初始化时，自动启动Spring容器。


Spring就提供了这样一个`Listener`：**`org.springframework.web.context.ContextLoaderListener`**。


此`Listener`在`spring-web-x.x.x.RELEASE.jar`包下，因此我们使用Spring开发Web项目时，至少需要在WEB-INF的`lib`目录里导入以下6个包：


<table>
   <tr>
      <td>spring-aop-4.xx.RELEASE.jar</td>
      <td>spring-context-4.xx.RELEASE.jar</td>
      <td>spring-beans-4.xx.RELEASE.jar</td>
   </tr>
   <tr>
      <td>spring-core-4.xx.RELEASE.jar</td>
      <td>spring-expression-4.xx.RELEASE.jar</td>
      <td>commons-logging-1.1.3.jar</td>
   </tr>
</table>


`Listener`的具体配置如下，


**web.xml**


```
  <!-- 指定Spring配置文件(如applicationContext.xml)的位置 -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>
classpath:applicationContext.xml
</param-value>
	</context-param>
	<!-- 通过ContextLoaderListener，初始化Spring容器 -->
	<listener>
		<listener-class>
org.springframework.web.context.ContextLoaderListener
</listener-class>
	</listener>
```

其中参数名`contextConfigLocation`对应的参数值（`<param-value>`）用来指定Spring配置文件的路径。如果配置文件的路径是 “/WEB-INF/applicationContext.xml”则可省略此`<context-param>`的配置，即“/WEB-INF/applicationContext.xml”是Spring配置文件的默认“约定”路径；否则，就必须通过`contextConfigLocation`参数名来指定具体路径。其中`classpath`代表资源路径（例如项目的`src`目录）。


有了以上配置之后，当启动服务器(如Tomcat)时，就会自动的初始化Spring容器了。


# 21.3 配置文件拆分后的整合方法 #

现在，我们已经知道，可以在web.xml里，通过contextConfigLocation的<param-value>来指定Spring配置文件的路径。

因此，如果我们将Spring配置文件拆分成了多个，我们就可以通过以下方法来将它们组装在一起：将拆分后的配置文件全部写在`<param-value>`中，并用英文逗号分隔开。如下，


**web.xml**

```
  <!-- 指定Spring配置文件(如applicationContext.xml)的位置 -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>
			classpath:applicationContext.xml,
			classpath:applicationContext-controller.xml,
			classpath:applicationContext-service.xml,
			classpath:applicationContext-dao.xml,
		</param-value>
	</context-param>
	<!-- 通过ContextLoaderListener，初始化Spring容器 -->
	<listener>
		<listener-class>
org.springframework.web.context.ContextLoaderListener
</listener-class>
	</listener>
```

还可以使用“*”来模糊匹配，如下，

**web.xml**


```
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>
			classpath:applicationContext.xml,
			classpath:applicationContext-*.xml,
		</param-value>
	</context-param>
…
```

除此以外，我们还可以直接在Spring配置文件中，通过`import`元素导入其他配置文件，从而将若干个配置文件整合到一起，如下，


**applicationContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="… "
	xmlns:xsi="…" 
xmlns:p="…"
	xsi:schemaLocation="…">
	<import resource="applicationContext-controller.xml"/>
	<import resource="applicationContext-service.xml"/>
	<import resource="applicationContext-dao.xml"/>
	<bean… 
    …
</beans>
```

# 21.4 练习题 #

1.拆分配置文件的优点是什么？

2.拆分配置文件时，是以什么为原则进行拆分？

3.拆分配置文件的步骤是什么？
