---

layout: post

title: Spring入门

category: Spring框架

tags: Spring框架

description: 本章将系统介绍Spring。从简单性、可测试性和松耦合的角度而言，任何Java应用都可以从Spring中受益。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE Spring框架

---

>本章简介

Spring是于2003 年兴起的一个轻量级的Java 开源框架，是由Rod Johnson 在其2002年的著作《Expert One-On-One J2EE Development and Design》中阐述的部分理念和原型衍生而来。它是为了解决企业应用开发的复杂性而创建的。从简单性、可测试性和松耦合的角度而言，任何Java应用都可以从Spring中受益。Spring有两个核心，分别是控制反转（IOC）和面向切面（AOP）。简单来说，Spring是一个分层的JavaSE/EEfull-stack(一站式) 轻量级开源框架。

# 18.1 搭建 Spring开发环境 #

**(1)获取资源文件**

我们可以从Spring的官网[http://spring.io](http://spring.io)中找到Spring的完全资源包（本书所用的是spring-framework-4.2.5.RELEASE-dist.zip，下载地址[http://repo.spring.io/release/org/springframework/spring/](http://repo.spring.io/release/org/springframework/spring/)），将其解压，其中的`libs`目录就存放了spring框架所依赖的`jar`包，具体如下：

<table>
   <tr>
      <td>序号</td>
      <td>文件名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>1</td>
      <td>spring-aop-4.xx.RELEASE.jar</td>
      <td>使用Spring的AOP特性时所需的类库</td>
   </tr>
   <tr>
      <td>2</td>
      <td>spring-beans-4.xx.RELEASE.jar</td>
      <td>包含访问配置文件、创建和管理bean以及进行IoC/DI操作相关的所有类</td>
   </tr>
   <tr>
      <td>3</td>
      <td>spring-context-4.xx.RELEASE.jar</td>
      <td>为Spring核心提供了大量扩展。例如，可以找到使用Spring ApplicationContext特性时所需的全部类，JDNI所需的全部类，以及校验Validation方面等相关类</td>
   </tr>
   <tr>
      <td>4</td>
      <td>spring-core-4.xx.RELEASE.jar</td>
      <td>Spring框架基本的核心类库，Spring其它组件要都要使用到这个包里的类</td>
   </tr>
   <tr>
      <td>5</td>
      <td>spring-expression-4.xx.RELEASE.jar</td>
      <td>Spring表达式语言需要的类库</td>
   </tr>
</table>

除此之外，为了支持Spring处理日志，我们还需要`commons-logging-x.x.x.jar`。

以上6个`jar`包，就是我们使用Spring时需要导入的包。

**(2)搭建Spring项目结构**

**①**为了更方便的使用Eclipse开发Spring，我们需要给Eclipse安装Spring Tool Suite，安装方法参见附录1。

**②**创建一个JAVA项目（项目名“SpringDemo”）；在项目中，新建一个`libs`目录并放入以上6个`jar`包，再将`jar`包设置为构建路径，如图，

![](http://i.imgur.com/by0rgWg.png)

*图18-01*

**③**在`src`目录下创建Spring的配置文件：鼠标右键src →new →other →选择Spring Bean Configuration File →起名为applicationContext.xml →Finish 

# 18.2 开发第一个Spring IOC程序 #

Spring的一个核心机制就是控制反转（IOC），下面我们就来开发一个基于SpringIOC的程序。

**(1)开发Spring程序**

**①**创建一个学生实体类

**Student.java**

```
package org.lanqiao.entity;
public class Student
{
	private int stuNo ; 
	private String stuName ; 
	private int stuAge;
	//省略setter、getter
}
```

**②**通过Spring配置文件（**applicationContext.xml**）给实体类对象的属性赋值，并将该对象放入Spring IOC容器

**applicationContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans.xsd">
	<bean id="student" class="org.lanqiao.entity.Student">
		<property name="stuNo" value="1"></property>
		<property name="stuName" value="张三"></property>
		<property name="stuAge" value="23"></property>
	</bean>
</beans>
```

可以发现，主要是通过`<bean>`标签完成了对象的赋值，`<bean>`标签中最基本属性、子元素的含义如下：

为了便于理解，我们在Spring中引入一个新的词“简单类型”，本书中使用“简单类型”代指“基本数据类型和String类型”。

<table>
   <tr>
      <td>属性/子元素</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>id</td>
      <td>唯一标识符，用来代表唯一的bean。</td>
   </tr>
   <tr>
      <td>class</td>
      <td>对象的类型（包名＋类名）</td>
   </tr>
   <tr>
      <td>property</td>
      <td>对象的一个属性</td>
   </tr>
   <tr>
      <td>property中的name</td>
      <td>属性名</td>
   </tr>
   <tr>
      <td>property中的value</td>
      <td>属性值（用于给“简单类型”赋值；不能给自定义类型的对象赋值，例如，如果Student类中包含一个Teacher类型的对象属性，则就不能再通过value来赋值，而要使用ref）</td>
   </tr>
</table>

以上applicationContext.xml中的配置，就是将一个`Student`对象的`stuNo`属性赋值为“1”，将`stuName`属性赋值为“张三”，将`stuAge`属性赋值为“23”，并将该对象的id标识为`“student”`（用于区分其他对象）。赋值完成后，该对象就会自动被加入Spring的IOC容器之中(IOC容器会在后面讲解)。

**③**从Spring的IOC容器之中获取对象，并在测试类中使用，如下，

**TestStudent.java**

```
package org.lanqiao.test;

import org.lanqiao.entity.Student;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class TestStudent
{
	public static void main(String[] args)
	{
         //1.创建Spring的IOC容器对象
		ApplicationContext context 
= new ClassPathXmlApplicationContext("applicatoinContext.xml");
		//2.从IOC容器中获取Bean实例(id为"student"的Student对象)
Student stu =(Student)context.getBean("student");
		System.out.println(stu.getStuNo()+"\t"+stu.getStuName()
+"\t"+stu.getStuAge());
	}
}
```

运行结果：

![](http://i.imgur.com/NqGTeNj.png)

*图18-02*

目前可以发现，

**①**我们不需要使用`new`来创建`Student`对象，而是通过`getBean()`方法直接从SpringIOC容器中获取；

**②**对象的赋值，也是SpringIOC容器帮我们完成的。


# 18.3 练习题 #

1.如何搭建Spring环境？

2.开发一个SpringIOC程序的基本步骤是什么？