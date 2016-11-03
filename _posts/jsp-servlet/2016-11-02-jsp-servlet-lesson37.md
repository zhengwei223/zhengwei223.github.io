---

layout: post


title: 新增内容5：监听器部分


category: JSP-Servlet教程


tags: JSP Servlet


description: 


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---


## 8.2.3 感知被HttpSession绑定的事件监听器 ##


**在`session`域中保存的对象，可能会经历四种状态：**

**①**将对象保存（绑定）到`session`域中；

**②**从`session`域中删除（解除绑定）该对象；

**③**对象随着`session`持久化到硬盘等存储设备中，即将对象和`session`一起从内存写入硬盘等存储设备（钝化）；

**④**对象随着`session`从存储设备中恢复到内存中（活化）。
	
Servlet API提供了`HttpSessionBindingListener和HttpSessionActivationListener这两个监听器（接口），专门用于监听`session`域中对象的这四种状态。


**(1) HttpSessionBindingListener接口**

HttpSessionBindingListener接口提供了`valueBound()`和`valueUnbound()`两个方法，分别用于监听`JavaBean`对象绑定到`HttpSession`对象中，以及从`HttpSession`对象中解绑`JavaBean`对象的两个事件。


**HttpSessionBindingListener接口的完整定义如下：**

```
package javax.servlet.http;
import java.util.EventListener;
public interface HttpSessionBindingListener extends EventListener 
{
public void valueBound(HttpSessionBindingEvent event);
public void valueUnbound(HttpSessionBindingEvent event);
}
```

如果一个类实现了HttpSessionBindingListener接口，那么

**①**当该类产生的对象被绑定到`HttpSession`对象中时，Web容器就会自动调用该对象的`valueBound()`方法；

**②**当该类产生的对象从`HttpSession`对象中解绑时，Web容器就会自动调用该对象的`valueUnbound()`方法。

此外，这两个方法都有一个共同的参数：`HttpSessionBindingEvent`类型的事件对象，我们可以通过这个参数来获取当前的`HttpSession`对象。


下面通过一个示例来演示**HttpSessionBindingListener**接口的使用：

**org.lanqiao.listener.BeanDemo.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;
public class BeanDemo implements HttpSessionBindingListener
{
	//BeanDemo对象被绑定到HttpSession对象中时，调用此方法
	@Override
	public void valueBound(HttpSessionBindingEvent event)
	{
		System.out.println("绑定：\nBeanDemo对象被增加
到了session域中\n"
+this+"\n"+event.getSession().getId());
	}
	//BeanDemo对象从HttpSession对象中解绑时，调用此方法
	@Override
	public void valueUnbound(HttpSessionBindingEvent event)
	{
		System.out.println("移除：\nBeanDemo对象从session域
中被移除\n"
+this+"\n"+event.getSession().getId());
	}
}
```

**httpSessionBindingListner.jsp**

```
…
<body>
	<%
		BeanDemo beanDemo = new BeanDemo();
		session.setAttribute("beanDemo", beanDemo);
	%>
</body>
…
```

执行[http://localhost:8888/ListenerProject/httpSessionBindingListner.jsp](http://localhost:8888/ListenerProject/httpSessionBindingListner.jsp)，运行结果：

![](http://i.imgur.com/dkA71Fj.png)

刷新页面，运行结果：

![](http://i.imgur.com/SevzdFS.png)

从运行结果可以发现：第一次访问**httpSessionBindingListner.jsp**时，`BeanDemo`对象会被增加到`session`域中；刷新浏览器，另一个`BeanDemo`对象被增加到了`session`域中，与此同时，第一个`BeanDemo`对象从`session`域中被移除了，也就是说，第二个`BeanDemo`对象覆盖了第一个对象。此外，因为是同一次会话，因此sessionId都是相同的。


**(2) HttpSessionActivationListener接口**


如果要把`HttpSession`对象从内存转移到硬盘等存储设备（钝化），或者相反，从存储设备中恢复到内存中（活化），就需要使用HttpSessionActivationListener接口的`sessionWillPassivate()`和`sessionDidActivate()`方法。

需要注意，`HttpSession`对象的钝化（也称为持久化）过程是由Servlet容器完成的。在此过程中，为了确保`session`域内的所有共享数据不会丢失，Servlet容器不仅会持久化`HttpSession`对象，还会对该对象的所有可序列化的属性进行持久化。其中，可序列化的属性是指：属性所在的类实现了Serializable接口。


至于`HttpSession`对象的活化过程，通常是在客户端向Web服务发出Http请求时，相应的`HttpSession`对象会被激活。

**HttpSessionActivationListener接口的完整定义如下：**

```
package javax.servlet.http;
import java.util.EventListener;
public interface HttpSessionActivationListener extends EventListener 
{
    //钝化之前
public void sessionWillPassivate(HttpSessionEvent se);
//活化之后
    public void sessionDidActivate(HttpSessionEvent se);
}
```

当绑定到`HttpSession`对象中的对象即将随`HttpSession`对象被钝化之前，Web容器会调用`sessionWillPassivate()`方法，并传递一个HttpSessionEvent类型的事件对象作为参数；当绑定到`HttpSession`对象中的对象刚刚随`HttpSession`对象被活化之后，Web容器会调用`sessionDidActivate ()`方法，并传递一个HttpSessionEvent类型的事件对象作为参数。
	

**下面通过一个示例来演示HttpSessionActivationListener接口的使用：**

**①配置会话管理器**

在执行`session`的持久化（钝化）时，需要使用PersistentManager（会话管理器），它的作用是当某个Web应用被终止（或整个Web服务器被终止）时，会对被终止的Web应用的`HttpSession`对象进行持久化。PersistentManager需要在Tomcat的**context.xml**文件中配置`<Manager>`元素，如下：


**&lt;Tomcat安装目录&gt;/conf/context.xml**

```
<Context>
	<Manager className="org.apache.catalina.session.PersistentManager"
 maxIdleSwap="1" > 
		<Store className="org.apache.catalina.session.FileStore" 
directory="lanqiao" />
	</Manager>	
     <!-- 其他配置 … -->
</Context>
```

**Manager及其子元素的简介如下：**

<table>
   <tr>
      <td>元素/属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>Manager元素</td>
      <td>用于配置会话管理器.     className属性：指定负责创建、销毁、持久化Session对象的类。     maxIdleSwap属性：指定Session对象被钝化前的最大空闲时间（单位是秒）。如果超过这个时间，管理Session对象的类就会把Session对象持久化到存储设备中（硬盘等）。</td>
   </tr>
   <tr>
      <td>Store元素</td>
      <td>用于指定负责完成具体持久化任务的类。    directory属性：指定保存持久化文件的目录，可以使用相对目录或绝对目录。如果使用相对目录（如lanqiao），它是相对于以下目录：&lt;Tomcat安装目录&gt;\work\Catalina\localhost\项目名\lanqiao</td>
   </tr>
</table>


**②编写类，并实现HttpSessionActivationListener接口**


**org.lanqiao.listener.BeanDemo2.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;
public class BeanDemo2 implements HttpSessionActivationListener
{
	private String name ;
	private int age ; 
	//setter、geter
	//钝化之前
	@Override
	public void sessionWillPassivate(HttpSessionEvent se)
	{
		System.out.println("即将钝化之前：BeanDemo2对象即将随着HttpSession对象被钝化…");
	}
	//活化之后
	@Override
	public void sessionDidActivate(HttpSessionEvent se)
	{
		System.out.println("活化之后：BeanDemo2对象刚刚随着HttpSession对象被活化了…");
	}
}
```

**③编写JSP，实现钝化与活化**

**a.实现钝化：将对象增加到`HttpSession`对象中，并随着`HttpSession`对象一起钝化**

**write.jsp**

```
…
<body>
	<%
		BeanDemo2 beanDemo = new BeanDemo2();
		beanDemo.setName("张三");
		beanDemo.setAge(23);
		session.setAttribute("beanDemo", beanDemo) ;
	%>
</body>
…
```

启动服务，执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，JSP页面的运行结果：


![](http://i.imgur.com/tYvNV5j.png)


一段时间后（时间长短与会话管理器中`Manager`元素的`maxIdleSwap`属性有关），Console控制台会有如下显示：

![](http://i.imgur.com/z1tmq2L.png)

因此可以得知，`BeanDemo2`对象会随着`HttpSession`对象被钝化。根据会话管理器中`Store`元素的`directory`属性，可以找到钝化后的文件，如下：

![](http://i.imgur.com/Zg1t5lp.png)


**b.实现活化：钝化以后，将对象随`HttpSession`对象一起活化**

编写**read.jsp**，从`session`域中读取对象，如下：


**read.jsp**

```
…
<body>
	从session域中读取对象 <br/>
	姓名：${sessionScope.beanDemo.name } <br/>
	年龄：${sessionScope.beanDemo.age } <br/>
</body>
…
```

重启Tomcat服务，先执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，然后在Console控制台打印“即将钝化之前…”以前，迅速再执行[http://localhost:8888/ListenerProject/read.jsp](http://localhost:8888/ListenerProject/read.jsp)，可得如下结果：


![](http://i.imgur.com/jQu5H2D.png)

可以发现，在钝化之前可以从`session`域中读取对象的数据（内存中的`session`域中读取）。过一会儿，当控制台打印“即将钝化之前…”以后（说明此时`HttpSession`对象已经被钝化，被保存在了硬盘中），再次执行[http://localhost:8888/ListenerProject/read.jsp](http://localhost:8888/ListenerProject/read.jsp)，运行结果：

![](http://i.imgur.com/FQIAooq.png)

数据不显示的原因是：持久化（钝化）类没有实现Serializable接口。如果一个类没有实现Serializable接口，那么当Servlet容器持久化`HttpSession`对象时，是不会持久化该类的对象的。本例中，BeanDemo2类没有实现Serializable接口，因此BeanDemo2的对象不会随`HttpSession`一起被持久化，就会在`HttpSession`被持久化时丢失。

修改BeanDemo2类，让其实现Serializable接口，如下：


**org.lanqiao.listener.BeanDemo2.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;
public class BeanDemo2 implements HttpSessionActivationListener, Serializable
{
	…
}
```

重启服务，执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，等待Console控制台输出“即将钝化之前…”，如下：

![](http://i.imgur.com/LA7YzVt.png)


再执行**read.jsp**，得到**read.jsp**的运行结果：

![](http://i.imgur.com/1pQSnTa.png)


此时Console控制台的运行结果：

![](http://i.imgur.com/ekKPJ1O.png)

可以得知，BeanDemo2对象在随`HttpSession`对象被钝化以后，又会在程序访问`HttpSession`对象时随`HttpSession`对象一起被活化。此外，需要注意，JavaBean必须先实现Serializable接口，之后才能被持久化到硬盘上。


稍等片刻后，控制台会再次显示“即将钝化之前…”，如下：

![](http://i.imgur.com/SAthfNA.png)

读者应该知道再次显示的原因了吧？