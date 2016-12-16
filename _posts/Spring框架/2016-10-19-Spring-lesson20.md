---

layout: post

title: 深入Spring IOC/DI

category: Spring框架

tags: Spring框架

description: 本章我们会深入的分析SpringIOC的原理和思想。SpringIOC可以帮我们完成对象的创建(new)，以及对象的赋值。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE Spring框架

---

>**本章简介**

我们已经知道，SpringIOC可以帮我们完成对象的创建`(new)`，以及给对象的属性赋值。本章我们会深入的分析SpringIOC的原理和思想。

在实际的项目开发中，我们需要尽量避免或降低对象之间的依赖关系（即降低耦合度），来提高代码的可重用性和可移植性。但通常情况，多个业务对象之间、业务对象与持久层对象等都存在着一定的依赖关系。如何才能最大化的降低对象之间的关系？这就是SpringIOC的设计初衷。

IOC是Inversion of Control(控制反转)的简称，它是程序设计中一种非常重要的思想。我们以往会使用`new`来创建对象，并通过`setter`方法设置对象与对象之间的依赖关系（例如有一个学生对象`student`和一个老师对象`teacher`，我们可以通过`student.setTeacher(teacher)`绑定老师和学生对象之间的关系），但这样做就会使得对象和类（或接口）、对象和对象之间产生强烈的耦合关系。而IOC就很好地解决了该问题，它将对象的创建及赋值都放到外部的IOC容器中进行，并通过IOC容器来管理各种对象之间的依赖关系。如果程序中要使用某一个对象，可以直接从IOC容器索取。从以上过程可以发现，IOC本质就是把对象的创建、赋值都放到了IOC容器中，并在IOC容器中进行对象之间依赖关系的绑定（注入），因此Spring中IOC又可以更具体的成为“依赖注入（DI）” 

# 22.1 IOC的发展 #

Spring IOC的发展，本质就是“解耦和”方式的发展。

**关于对象和类（或接口）之间的耦合关系，我们经历了以下三种的方式：**

**①**通过`new`创建。

**②**通过工厂模式获取不同的实例对象（需要自己写工厂）。

**③**通过IOC容器获取不同的实例对象（只需要配置）。

下面分别通过示例来解析。

我们先定义1个接口（课程），和两个实现类（JAVA课程和ORACLE课程），如下，

**ICourse.java**

```
package org.lanqiao.newinstance;
public interface ICourse
{
	public abstract void learn();
}
```

**JavaCourse.java**

```
package org.lanqiao.newinstance;
public class JavaCourse implements ICourse
{
	@Override
	public void learn()
	{
		System.out.println("学习JAVA课程");
	}
}
```

**OracleCourse.java**

```
package org.lanqiao.newinstance;
public class OracleCourse implements ICourse
{
	@Override
	public void learn()
	{
		System.out.println("学习Oracle课程");
	}
}
```

#### (1)通过new自己创建。 ####

学生Student要想学习Java课程，就得定义一个学习Java课程的方法，并在该方法里自己创建`JavaCourse`对象来调用学习JAVA的方法。如下，


**Student.java**

```
package org.lanqiao.newinstance;
public class Student
{
    //学习JAVA课程
	public void learnJavaCourse()
	{
        //自己创建JavaCourse对象
		ICourse course = new JavaCourse();
		course.learn();
	}
}
```

试想，如果现在Stuent想去学习Oracle课程，那么就必须再重写一个学习Oracle方法，并在方法里自己创建`OracleCourse`对象来调用学习Oracle的方法，如下


**Student.java**

```
package org.lanqiao.newinstance;
public class Student
{
	…
	//学习Oracle课程
	public void learnOracleCourse()
	{
		ICourse course = new OracleCourse();
		course.learn();
	}
}
```

可以发现，此种通过`new`创建对象的方式存在很大的缺点：

创建的对象和类强烈的耦合在了一起。如果需要Java课程对象，就必须执行`ICourse course = new JavaCourse()`；而如果需要Oracle课程对象，就必须执行`ICourse course = new OracleCourse()`。并且，这样做会使创建的对象到处分散，给后期维护造成很大困难。


如图，`Student`类中的方法，通过`new`的方式分别创建`JavaCourse`和`OracleCourse`两个对象，并负责这两个对象的整个生命周期。

![](/public/img/spring-zq/22.1.png)

*图22-01*

#### (2)通过工厂模式获取。 ####

为了避免创建的对象到处分散、对象和类强烈的耦合在一起、每一次使用新对象前都得先实例化`(new)`一次，我们可以将“创建对象”这一过程提取出来，由一个工厂`Factory`来统一创建，以后如果需要新的对象，就可以直接从工厂中索取。


**CourseFactory.java**

```
public class CourseFactory
{
	public static ICourse getCourse(String courseName)
	{
		if (courseName.equals("java"))
			return new JavaCourse();
		else
			return new OracleCourse();
	}
}
```

有了课程工厂之后，学生`Student`如果要学习JAVA课程，只需要给工厂的`getCourse()`方法传入”java”参数，就会得到一个`JavaCourse`对象；同理，如果要学习Oracle课程，只需要给工厂的`getCourse()`方法传入`”oracle”`参数，就会得到一个`OracleCourse`对象。如下，


**Student.java**

```
package org.lanqiao.factoryinstance;
public class Student
{
	// 学习JAVA或Oracle课程
	public void learnCourse()
	{
		ICourse course = CourseFactory.getCourse("java");
		course.learn();	
}
}
```

即不论学生需要JavaCourse或OracleCourse对象，都可以从课程工厂CourseFactory这个中间仓库中获取。例如，上面代码中`course`代表一个JavaCourse对象；如果想把`course`变为Oracle对象，只需要将`getCourse (String courseName)`方法的参数值改为“oracle”即可。工厂模式的原理如图，

![](/public/img/spring-zq/22.2.png)


*图22-02*

这样做在一定程度降低了对象`（coure）`与类(`JavaCourse`或`OracleCourse`)之间的耦合度，并且将对象的创建进行了集中管理，便于以后的维护。但是这样做，对象的产生仍然依赖于工厂（即把实例化`new`的过程统一放在了工厂中进行），并且中间又多了一道工序。


#### (3)通过IOC容器获取。 ####

“通过`new`自己创建对象”依赖于具体的类，“过工厂模式获取对象”依赖于工厂，都存在着一定的依赖性。为了彻底的解决依赖性问题，我们不用`new`也不用工厂，而是把对象的创建放到Spring配置文件（applicatoinContext.xml）中进行。如果需要使用对象，只需要先在Spring中配置此对象（SpringIOC容器会帮助我们自动创建对象），然后直接从SpringIOC容器中获取即可。

例如，我们通过applicatoinContext.xml配置了两个课程对象（Java课程对象和Orace课程对象），并通过id值来区分。如下，

**applicatoinContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	…
	<bean id="javaCourse" class="org.lanqiao.iocinstance.JavaCourse">
	</bean>
	
	<bean id="oracleCourse" 
class="org.lanqiao.iocinstance.OracleCourse">
	</bean>
</beans>
```

配置完后， SpringIOC容器就会替我们自动创建这两个对象（根据`class`值所代表的类型，创建相应的对象，并用id来标识该对象）。以后要使用这两个对象时，就可以通过`ApplicationContext`对象的`getBean()`方法，根据标识符id，直接从SpringIOC容器中获取，如下，


**Student.java**

```
package org.lanqiao.iocinstance;
//省略import
public class Student
{
	// 通过参数给getBean()方法传入不同的id值 来获取不同的课程对象
	public void learnCourse()
	{
		ApplicationContext context 
= new ClassPathXmlApplicationContext("applicatoinContext.xml");
		ICourse course =(ICourse)context.getBean("oracleCourse");
		course.learn();
	}
}
```

如果需要Oracle课程对象，只需要给`getBean()`方法中传入Oracle课程的id值`” oracleCourse”`，即可从SpringIOC容器中获取Oracle课程的对象。


可以发现，所谓的SpringIOC容器本质就是一个非常大的“工厂”，只是这个工厂不用我们自己维护，而是交给Spring去帮我们管理。我们需要做的，只是在Spring配置文件中进行对象的配置，然后就可以直接通过`getBean()`方法从SpringIOC容器中获取。


我们也可以从中体会到“控制反转”的思想：Student不再依靠自身的代码去创建具体的课程对象，而是把这一工作交给了“SpringIOC容器”，从而避免了课程对象和课程类之间的耦合关系。即对于“如何获取课程对象”这件事上，“控制权”发生了反转--从`Student`类转移到了“SpringIOC”容器，即所谓的“控制反转”。

# 22.2 依赖注入DI #

## 22.2.1 依赖注入简介 ##

从另一个角度来看，IOC(控制反转)也可以称为DI(依赖注入)。DI是指：将SpringIOC容器中的资源，注入到某些对象之中。例如以下示例：

* 有一个老师`Teacher`类，有姓名`name`和年龄`age`两个属性；

* 有一个课程`Course`类，有课程名`courseName`、课时数`courseHours`、老师`teacher`三个属性，和一个介绍课程的`showInfo()`方法；


* 以及测试`Test`类。

**Teacher.java**

```
package org.lanqiao.iocinstance;
public class Teacher
{
	private String name ;
	private int age ;
	//省略setter、getter
}
```

**Course.java**

```
package org.lanqiao.diinstance;
public class Course
{
	private String courseName; //课程名
	private int courseHours; //课时
	private Teacher teacher; //授课老师
	//省略setter、getter
	public void showInfo()
	{
		System.out.println("课程名："+courseName+"\t课时：
"+courseHours+"\t\t授课老师："+teacher.getName());
	}
}
```

`Teacher`类和`Course`类创建好以后，我们通过Sping配置文件，在SpringIOC中创建id为`“teacher”`和`“course”`的两个对象，并赋值，如下，


**applicatoinContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	<bean id="teacher" class="org.lanqiao.dicinstance.Teacher">
		<property name="name" value="颜群"></property>
		<property name="age" value="28"></property>
	</bean>
	<bean id="course" class="org.lanqiao.diinstance.Course">
		<property name="courseName" value="JAVA"></property>
		<property name="courseHours" value="100"></property>
		<property name="teacher" ref="teacher"></property>
	</bean>	
</beans>
```

其中`<property>`元素的`value`和`ref`属性的简介如下，

<table>
   <tr>
      <td>属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>value </td>
      <td>给name所表示的“简单类型”的属性赋值（如String、int）</td>
   </tr>
   <tr>
      <td>ref </td>
      <td>给name所表示的“自定义类型”的对象属性赋值（如Teacher类型的属性）。ref的值是另一个&lt;bean&gt;的id值，从而实现多个&lt;bean&gt;之间相互引用、相互依赖的关系。</td>
   </tr>
</table>


通过以上配置文件可以发现：对于`Course`对象来说，SpringIOC容器不仅通过`<property>`的`value`属性，给`String courseName`、`int courseHours`这些“简单类型”的属性赋了值；还可以通过`<property>`的`ref`属性，给`Teacher teacher`这种对象类型也赋了值。也就是说，对象的值都是通过SpringIOC容器给注入进去的，所以也被称为“依赖注入（DI）”。


换句话说，对象与对象之间的依赖关系（如`Course`对象和`Teacher`对象）、对象和类之间的依赖关系（如id为`”course”`的`Course`对象，和`Course`类）都是由SpringIOC容器注入的。


通过以上配置，SpringIOC容器就帮我们创建好类`Teahcer`对象和`Course`对象，并赋了值。我们接下来，只需要从SpringIOC中获取这些赋了值的对象，直接使用即可，如下，


测试类**Test.java**

```
package org.lanqiao.diinstance;
//import…
public class Test
{
	public static void main(String[] args)
	{
		ApplicationContext context 
= new ClassPathXmlApplicationContext("applicatoinContext.xml");
//直接从SpringIOC容器中,根据id值获取属性值已经赋值完毕的对象
		Course course =(Course)context.getBean("course");
		course.showInfo();
	}
}
```

执行Test.java，运行结果：

![](/public/img/spring-zq/22.3.png)


*图22-03*


## 22.2.2 三种方式的依赖注入 ##

Spring提供了多种方式的依赖注入，常见的有三种：setter设值注入、构造器注入、p命名空间注入。


#### (1) setter设置注入 ####

之前，我们是通过以下方式给对象中的属性赋值的，

```
<property name="属性名" value="属性值"></property>
或
<property name="属性名" ref="引用对象的id值"></property>
```

这种方式称为“`setter`设置注入”，本质是通过反射机制，调用了对象的`setter`方法，对属性进行的赋值操作。例如，


```
<bean id="course" class="org.lanqiao.diinstance.Course">
		<property name="courseName" value="JAVA"></property>
		<property name="teacher" ref="teacher"></property>
        …
</bean>	
```

给`Course`对象的属性赋值的过程是：在`Course`对象中寻找`setCourseName()`方法，如果存在，则再将`<property>`中的`value`的值“JAVA”传入到参数中，即调用了对象的`setter`方法进行赋值。如果我们手动将`Course`类中的`setCourseName()`方法改为`setCourseName2()`，Spring就会产生一个异常，如下，


**Course.java**

```
…
public class Course
{
    …
	public void setCourseName2(String courseName)
	{
		this.courseName = courseName;
	}
}
```

执行测试类**Test.java**，会抛出以下异常：

```
Caused by: org.springframework.beans.NotWritablePropertyException: Invalid property 'courseName' of bean class [org.lanqiao.diinstance.Course]: Bean property 'courseName' is not writable or has an invalid setter method. Did you mean 'courseName2'?
```

从我们修改后的`Course`类和异常提示可以知道，Spring根据

```
<bean id="course" class="org.lanqiao.diinstance.Course">
		<property name="courseName" value="JAVA"></property>
		<property name="courseHours" value="100"></property>
		<property name="teacher" ref="teacher"></property>
</bean>	
```

中的`name`值`”courseName”`去在`org.lanqiao.diinstance.Course`类里面寻找`setCourseName()`方法，结果没找到，所以抛出了异常。这也告诉我们，如果采用`value`（或`ref`）这种`setter`方式给属性赋值，就一定得有相应的`setter`方法。

#### (2)构造器注入 ####

我们还可以使用构造器（即构造方法），给对象中的属性赋值的。


顾名思义，“构造器注入”就是通过对象的构造方法对属性赋值，因此我们在使用“构造器注入”之前，必须先在类中创建相应的构造方法，如下分别在`Teacher`类和`Curse`类中创建了含参和无参的构造方法。


**说明：**

**如果手工编写了含参构造方法后，Java虚拟机就不再提供默认的无参构造方法。因此，我们又手工编写了一个无参构造方法，供以后使用。**

**Teacher.java**

```
package org.lanqiao.diinstance;
public class Teacher
{
	private String name;
	private int age;
	public Teacher()
	{
	}
	public Teacher(String name, int age)
	{
		this.name = name;
		this.age = age;
	}
    //省略setter、getter
 }
```

**Course.java**

```
package org.lanqiao.diinstance;
public class Course
{
	private String courseName;
	private int courseHours;
	private Teacher teacher;
	public Course()
	{
	}
	public Course(String courseName, int courseHours, Teacher teacher)
	{
		this.courseName = courseName;
		this.courseHours = courseHours;
		this.teacher = teacher;
	}
    //省略setter、getter及showInfo()方法
}
```

注意到，`Teacher`类的含参构造方法中，第0个参数是`name`属性，第1个参数是`age`属性，因此，我们可以通过“构造器注入”按参数顺序依次给`name`、`age`属性赋值，如下，


**applicationContext.xml**

```
	<bean id="teacher" class="org.lanqiao.diinstance.Teacher">
         <!—-给构造方法的第0个参数赋值-->
		<constructor-arg value="颜群"></constructor-arg>
         <!—-给构造方法的第1个参数赋值-->
		<constructor-arg value="28"></constructor-arg>
	</bean>
```

以上， `<constructor-arg>`顺序和构造方法中参数的顺序一致，即可保证第一个`<constructor-arg>`的`value`值赋值给构造方法的第一个参数，第二个`<constructor-arg>`的`value`值赋值给构造方法的第二个参数。

如果不能保证`<constructor-arg>`的顺序和构造方法中参数的顺序一致，则可以使用`index`或`name`属性指定，如下，

**①使用index来指定参数的位置索引**

**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher">
    <!—-通过index属性，指定给构造方法中的第1个参数赋值-->
	<constructor-arg value="28" index="1"></constructor-arg>
    <!—-通过index属性，指定给构造方法中的第0个参数赋值-->
	<constructor-arg value="颜群" index="0"></constructor-arg>
</bean>
```

**②使用name属性来指定参数的属性名**

**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher">
    <!—-通过name属性，指定给构造方法中的“age”参数赋值-->
	<constructor-arg value="28" name="age"></constructor-arg>
    <!—-通过name属性，指定给构造方法中的“name”参数赋值-->
	<constructor-arg value="颜群" name="name"></constructor-arg>
</bean>
```

现在，试想一下这个问题:

如果A类有`String str`和`int num`两个属性，并且只有以下两个构造方法，`public A(String str){…}`和`public A(int num) {…}`，该如何通过构造方法赋值呢？

如果写成下面这样：

```
<bean id="a" class="A">
	<constructor-arg value="123" ></constructor-arg>
</bean>
```

则Spring将无法知道”123”是`String`类型的还是`int`类型的（因为Spring会将所有“简单类型”的变量值，都写在`value`值的双引号中）。为了解决这个问题，可以使用`<constructor-arg>`标签的`name`或`type`属性解决，如下


**①**使用`name`属性来指定参数的属性名。
与上一个示例的使用方法相同


**②**使用`type`属性来指定参数值的类型。如下，

```
<bean id="a" class="A">
	<constructor-arg  value="123"  type="java.lang.String">
</constructor-arg>
</bean>
```

表示调用了`public A(String str){…}`构造方法；而如果改为`type="int"`，则就表示调用的是
`public A(int num) {…}`


因此，通过“构造器注入”给`Teacher`对象的属性赋值的完整写法如下：

**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher">
		<constructor-arg name="name"  value="颜群"  index="0" 
type="java.lang.String" >
</constructor-arg>

		<constructor-arg  name="age"  value="28"  index="1" 
type="int">
</constructor-arg>
</bean>
```

除了给“简单类型”的属性赋值以外，“构造器注入”还可以通过`“ref”`给对象类型的属性赋值。给对象类型的属性赋值时，只需要把`value`换成`ref`即可，如下，

**applicatoinContext.xml**

```
<bean id="course" class="org.lanqiao.diinstance.Course">
		<constructor-arg value="JAVA"></constructor-arg>
		<constructor-arg value="680"></constructor-arg>
		<constructor-arg  ref="teacher"></constructor-arg>
</bean>
```

再次强调，使用“构造器注入“之前，一定要保证类中提供了相应的构造方法。


#### (3) p命名空间注入 ####

使用“p命名空间注入”方式之前，我们必须先在Spring配置文件applicationContext.xml
中，引入“p命名空间 ”，即 `xmlns:p="http://www.springframework.org/schema/p"`，如下，


**applicationContext.xml**

```
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans.xsd">
	<bean id="…" …>
</beans>
```

如果使用的Eclipse安装了Spring Tool Suite，就可以直接在Namespaces标签中选中“p命名空间”，如图，

![](/public/img/spring-zq/22.4.png)


*图22-04*

使用“p命名空间注入”的特点是，直接使用“p”给对象的属性赋值（而不用再使用“`name`”、“`value`”、“`type`”等属性），从而简化了配置代码，如下，


**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher" 
p:name="颜群" p:age="28">
</bean>

<bean id="course" class="org.lanqiao.diinstance.Course" 
	    p:courseName="JAVA" 
		p:courseHours="680" p:teacher-ref="teacher"> 
</bean>
```

即通过“p:属性名”给“简单类型”的属性赋值，通过“p:属性名-ref”给对象类型的属性赋值。


## 22.2.3 注入各种数据类型的属性 ##

Spring提供了不同的标签，来实现不同类型参数的注入。

#### (1) 使用“setter设置注入”方式，注入各种类型的属性 ####

##### ①注入“简单类型”的属性值 #####

除了使用之前的`value`属性以外，还可以使用`<value>`子元素，如下，


**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher">
		<!-- 使用子元素<value>注入 -->
		<property name="name">
			<value type="java.lang.String">颜群</value>	
		</property>

		<!-- 使用value属性注入 -->
		<property name="age" value="28"></property>
</bean>
```

两种注入参数值方式的区别如下：

<table>
   <tr>
      <td></td>
      <td>使用子元素&lt;value&gt;注入</td>
      <td>而使用value属性注入</td>
   </tr>
   <tr>
      <td>参数值位置</td>
      <td>写在首尾标签（&lt;value&gt;&lt;/value&gt;）的中间(不加双引号)</td>
      <td>写在value的属性值中（必须加双引号）</td>
   </tr>
   <tr>
      <td>type属性</td>
      <td>有（可选） 可以通过type属性指定数据类型</td>
      <td>无</td>
   </tr>
   <tr>
      <td>参数值包含特殊字符（&lt;， &）时的处理方法</td>
      <td>两种处理方法。   一、使用&lt;![CDATA[　　]]&gt;标记   二、使用XML预定义的实体引用</td>
      <td>一种处理方法。即使用XML预定义的实体引用</td>
   </tr>
</table>

其中，XML预定义的实体引用，如下表，

<table>
   <tr>
      <td>实体引用</td>
      <td>表示的符号</td>
   </tr>
   <tr>
      <td>&lt；</td>
      <td>&lt;</td>
   </tr>
   <tr>
      <td>&amp;</td>
      <td>&</td>
   </tr>
</table>

**使用示例如下，**

```
<bean id="student" class="org.lanqiao.entity.Student">
	<property name="stuName">
		<value><![CDATA[张&三]]></value>
</property>
</bean>
```

或


```
<bean id="student" class="org.lanqiao.entity.Student">
	<property name="stuName">
			<value>张&amp;三</value>
		</property>
</bean>
```

或


```
<bean id="student" class="org.lanqiao.entity.Student">
	<property name="stuName" value="张&amp;三"></property>
</bean>
```

均表示给`Student`对象的`stuName`属性赋值为“张&三”。


##### ②输入对象类型的属性值 #####

除了使用之前的`ref`属性以外，还可以使用`<ref>`子元素，如下，


**applicationContext.xml**


```
<bean id="course" class="org.lanqiao.diinstance.Course">
…
		<property name="teacher" >
			 <ref bean="teacher"/>
		</property>
</bean>
```

通过`<ref>`子元素的`bean`属性，来指定需要引用的`<bean>`的id值（即需要引用的对象）。


**特殊情况**：如果需要引用的对象仅仅只需要使用一次，则可以使用“内部Bean”的方式来引用（类似于JAVA中的“内部类”），如下

```
<bean id="course" class="org.lanqiao.diinstance.Course">
		…
		<property name="teacher" >
			<bean class="org.lanqiao.diinstance.Teacher">
				<property name="name" value="颜群"></property>
				<property name="age" value="28" ></property>
			</bean>
		</property>
</bean>
```


以上，就是使用“内部Bean”的方式，给`Course`对象注入了一个`Teacher`类型的属性。注意到“内部Bean”`Teacher`类所在的`<bean>`中并没有“id”属性，这是因为“内部Bean”只会被所属的“外部<Bean>”（本例是Course对象）使用，而不会被其他`<bean>`所引用，所以此处的“id”值可省。


##### ③注入集合类型的属性值 #####

对于集合或数组类型的属性，我们可以使用如下标签来注入属性值，

<table>
   <tr>
      <td>类型</td>
      <td>使用的标签</td>
   </tr>
   <tr>
      <td>List或数组</td>
      <td>外层用&lt;list&gt;；内层用&lt;value&gt;或&lt;ref&gt;</td>
   </tr>
   <tr>
      <td>Set</td>
      <td>外层用&lt;set&gt;；内层用&lt;value&gt;或&lt;ref&gt;</td>
   </tr>
   <tr>
      <td>Map</td>
      <td>外层用&lt;map&gt;；中间层用&lt;entry&gt;；内层中键用&lt;key&gt;&lt;value&gt;…&lt;/value&gt;&lt;/key&gt;，值用&lt;value&gt;…&lt;/value&gt;或&lt;ref&gt;…&lt;/ref&gt;</td>
   </tr>
   <tr>
      <td>Properties</td>
      <td>外层用&lt;props&gt;；内层中键写在&lt;prop key=”..”&gt;..&lt;/prop&gt;的key值中，值写在&lt;prop&gt;..&lt;/prop&gt;中间。Properties中的键和值通常都是字符串类型。</td>
   </tr>
</table>

具体示例如下，

**AllConnectionType.java**：包含各种集合类型的属性

```
package org.lanqiao.test;
//省略import
public class AllConnectionType
{
	private List<String> list;
	private String[] array;
	private Set<String> set;
	private Map<String, String> map;
	private Properties props;
//省略setter、getter	
//输出所有属性值
public void showInfo()
	{
		System.out.println("List属性：" + this.list);
		System.out.print("数组属性：");
		for (String arr : this.array)
		{
			System.out.print(arr+"\t");
		}	
		System.out.println("\nSet属性：" + this.set);
		System.out.println("Map属性：" + this.map);
		System.out.println("Properties属性：" + this.props);
	}
}
```

通过配置文件，注入全部的属性值，如下，


**applicationContext.xml**


```
<bean id="connType" class="org.lanqiao.test.AllConnectionType" >
		<!-- 注入List类型 -->
		<property name="list">
			<list>
				<!-- 定义List中的元素 -->
				<value>苹果</value>
				<value>橘子</value>
			</list>
		</property>

		<!-- 注入数组类型 -->
		<property name="array">
			<list>
				<!-- 定义数组中的元素 -->
				<value>苹果</value>
				<value>橘子</value>
			</list>
		</property>

		<!-- 注入Set类型 -->
		<property name="set">
			<list>
				<!-- 定义Set或数组中的元素 -->
				<value>苹果</value>
				<value>橘子</value>
			</list>
		</property>

		<!-- 注入Map类型 -->
		<property name="map">
			<map>
				<!-- 定义Map中的键值对 -->
				<entry>
					<key>
						<value>apple</value>
					</key>
					<value>苹果</value>
				</entry>

				<entry>
					<key>
						<value>orange</value>
					</key>
					<value>橘子</value>
				</entry>
			</map>
		</property>

		<!-- 注入Properties类型 -->
		<property name="props">
			<props>
				<!-- 定义Properties中的键值对 -->
				<prop key="apple">苹果</prop>
				<prop key="orange">橘子</prop>
			</props>
		</property>

	</bean>
```

如果集合的属性值包含对象类型，只需要把`<value>`改成`<ref bean=""/>`。


测试类**TestAllConnection.java**


```
…
public static void main(String[] args)
{
ApplicationContext context = 
new ClassPathXmlApplicationContext("applicatoinContext.xml");

AllConnectionType connType 
=(AllConnectionType)context.getBean("connType");
connType.showInfo();
}
```

执行测试类，运行结果：

![](/public/img/spring-zq/22.5.png)

*图22-05*


##### ④注入null和空字符串 #####

<table>
   <tr>
      <td>注入的值</td>
      <td>使用的标签</td>
   </tr>
   <tr>
      <td>空字符串(如String comment = “”)</td>
      <td>&lt;value&gt;&lt;/value&gt;，即在&lt;value&gt;标签中不写任何值</td>
   </tr>
   <tr>
      <td>null(如Teacher =null)</td>
      <td>&lt;null&gt;</td>
   </tr>
</table>

如下，表示给`Course`对象的`courseName`属性赋值为空字符串，给`teacher`属性赋值为`null`，


**applicationContext.xml**


```
<bean id="course" class="org.lanqiao.diinstance.Course">
	   <property name="courseName">
			<value></value>
		</property>
		
		<property name="teacher" ><null/></property>
</bean>
```

#### (2) 使用“构造器注入”方式，注入各种类型的属性 ####

与 “setter设置注入”方式类似，只需要把上述`<list>`、`<map>`、`< props >`等标签放入`<constructor-age>`和`</constructor-age>`中间即可。

# 22.3 自动装配 #

使用了IOC/DI以后，对象与对象之间的关系是通过配置文件(`ref`属性)组织在一起，而不再是通过硬编码的方式耦合在一起了。但这样做也有一定的弊端：需要额外编写大量的配置文件。为了简化配置，我们可以借用MyBatis中讲过的“约定优于配置”原则，即如果对象(`<Bean>`)的配置符合一定的“约定”，则可以省去相应的配置，也就是我们本章要讲的“自动装配”。
需要注意的是，“自动装配”只适用于对象类型（引用类型）的属性（即通过`ref`属性注入的`<Bean>`与`<Bean>`之间的关系），而不适用于简单类型（基本类型和String类型）。

例如，以下是我们之前通过“setter设值注入”方式，为课程`Course`对象注入了属性值，


**applicationContext.xml**

```
	<bean id="teacher" class="org.lanqiao.diinstance.Teacher" >
		…
	</bean>

	<bean id="course" class="org.lanqiao.diinstance.Course">
		 … 
		 <property name="courseHours" value="680"></property>
		 <property name="teacher" ref="teacher"></property>
	</bean>	
```

具体就是通过`value`为“简单类型”赋值，通过`ref`为对象类型赋值。而如果事先遵循一定的“约定”，就可以省略id为“`course`”的`<bean>`中，使用`<property>`为对象类型(`Teacher`对象)赋值的过程。

## 22.3.1 根据属性名自动装配 ##

如下，


**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher" >
	…
</bean>

<bean id="course" class="org.lanqiao.diinstance.Course" 
autowire="byName" />
```

给`id="course"`的`<bean>`中，加上 `autowire="byName"`，就是为了告诉Spring这个`<bean>`符合一定的“约定”，可以自动为对象类型的属性（即`teacher`）赋值。之后，Spring就会自动在其他`<bean>`中，寻找id值与属性名“teacher”一致的`<bean>`。如果找到，就会将找到的`<bean>`注入到teacher属性之中，这就是根据“属性名”自动装配的约定。


除了按照“属性名”自动装配的约定以外，还有以下几种自动装配的方式，并且是通过`autowire`属性值来指定具体方式的。

<table>
   <tr>
      <td>autowire属性值</td>
      <td>自动装配方式</td>
   </tr>
   <tr>
      <td>no</td>
      <td>不使用自动装配。必须通过&lt;property&gt;的ref属性来指定对象之间的依赖关系。</td>
   </tr>
   <tr>
      <td>byName</td>
      <td>根据属性名自动装配。如果某一个&lt;bean&gt;的id值，与当前&lt;bean&gt;的某一个属性名相同，则自动注入；如果没有找到，则什么也不做。（本质是寻找属性名的setter方法）</td>
   </tr>
   <tr>
      <td>byType</td>
      <td>根据属性类型自动装配。如果某一个&lt;bean&gt;的类型，恰好与当前&lt;bean&gt;的某一个属性的类型相同，则主动注入；如果有多个 &lt;bean&gt;的类型都与当前&lt;bean&gt;的某一个属性的类型相同，则Spring将无法决定注入哪一个&lt;bean&gt;，就会抛出一个异常；如果没有找到，则什么也不做。</td>
   </tr>
   <tr>
      <td>constructor</td>
      <td>根据构造器自动装配。与byType类似，区别是它需要使用构造方法。如果Spring没有找到与构造方法参数列表一致的&lt;bean&gt;，则会抛出异常。</td>
   </tr>
</table>

## 22.3.2 根据属性类型自动装配 ##

**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher" >
	…
</bean>

<bean id="course" class="org.lanqiao.diinstance.Course" 
autowire="byType" />
```

autowire设置为“byType”以后，Spring就会在其他所有`<bean>`中，寻找与Course中的`teacher`属性类型相同的`<bean>`（即找`Teacher`类型的`<bean>`），找到之后就会自动注入给`teacher`属性。


## 22.3.3 根据构造器自动装配 ##

**applicationContext.xml**

```
<bean id="teacher" class="org.lanqiao.diinstance.Teacher" >
	…
</bean>

<bean id="course" class="org.lanqiao.diinstance.Course" 
autowire="constructor" />
```

使用构造器自动装配，必须在`Course`类中先提供相应的构造方法。比如，本例是想通过构造方法，给`Course`类中的`teacher`属性赋值，则就必须在`Course`类中提供以下构造方法，


**Course.java**

```
…
public class Course
{
    …
	private Teacher teacher;
	public Course(Teacher teacher)
	{
		this.teacher = teacher;
	}
…
}
```

**说明：**

1.如果配置文件中所有的`<bean>`都要使用自动装配，则除了在每一个`<bean>`中设置`autowire`属性以外，还可以设置一个全局的“`default-autowire`”，用于给所有的`<bean>`都注册一个默认的自动装配类型。设置方法是在配置文件里，`<beans>`的属性中加入“`default-autowire`”属性，如下，

```
<beans xmlns="…"
	 xmlns:xsi="…" 
    	xmlns:p="…"
	     xsi:schemaLocation="…"
	     default-autowire="byName">
         <bean …> …</bean>
          …
</beans>
```

表示给所有的`<bean>`都设置成了“根据属性名自动装配”。当然，设置全局的“`default-autowire`”以后，还可以在单独的`<bean>`中再次设置自己的“`autowire`”用来覆盖全局设置。


2．我们虽然可以通过自动装配，来减少Spring的配置编码。但是过多的自动装配，会降低程序的可读性。因此，对于大型的项目来说，并不鼓励使用自动装配。

**三种自动装配的可读性为：`byName`>`byType`>`constructor`**


# 22.4 基于注解形式IoC配置 #

之前，我们所有的Spring IoC配置都是基于XML形式的。除此以外，对于`DAO`层、`Service`层、`Controller`层中的类，还可通过注解的形式来实现Spring IoC。

## 22.4.1 使用注解定义bean ##

**StudentDaoImpl.java**

```
import org.springframework.stereotype.Component;
@Component("studentDao")
public class StudentDaoImpl implements IStudentDao
{
	@Override
	public void addStudent(Student student)
	{
		System.out.println("模拟增加学生操作...");
	}
}
```

以上通过`@Component`定义了一个名为`studentDao`的`Bean`，`@Component("studentDao")`的作用等价于XML形式的`<bean id="studentDao" class="org.lanqiao.dao.StudentDaoImpl" />`。


`@Component`可以作用在`DAO`层、`Service`层、`Controller`层等任一层的类中，范围较广。此外，还可以使用以下3个细化的注解：


<table>
   <tr>
      <td>注解</td>
      <td>范围</td>
   </tr>
   <tr>
      <td>@Repository</td>
      <td>用于标注DAO层的类</td>
   </tr>
   <tr>
      <td>@Service</td>
      <td>用于标注Service层的类</td>
   </tr>
   <tr>
      <td>@Controller</td>
      <td>用于标注Controller层的类（如某一个具体的Servlet）</td>
   </tr>
</table>

**为了使各类的用途更加清晰、层次分明，一般推荐使用细化的注解来标识具体的类。**


## 22.4.2 使用注解实现自动装配 ##

可以使用`@Autowired`注解实现多个`Bean`之间的自动装配，如下：


**StudentServiceImpl.java**

```
@Service("studentService")
public class StudentServiceImpl implements IStudentService
{
    //@Autowired标识的属性，默认会按“属性类型”自动装配
	@Autowired
	private IStudentDao studentDao ;
	
	public void setStudentDao(IStudentDao studentDao)
	{
		this.studentDao = studentDao;
	}

	@Override
	public void addStudent(Student student)
	{
		studentDao.addStudent(student);
	}
}
```

通过`@Service`标识了一个业务`Bean`，并且使用`@Autowired`为`studentDao`属性自动装配。`@Autowired`默认采用按“属性类型”自动装配，可以通过`@Qualifier`设置为按“属性名”自动装配，如下：


**StudentServiceImpl.java**


```
@Service("studentService")
public class StudentServiceImpl implements IStudentService
{
     //指定@Autowired标识的属性，按“属性名”自动装配
	@Autowired
	@Qualifier("studentDao")
	private IStudentDao studentDao ;
	…
}
```

`@Autowired`除了可以对属性标识以外，还可以对`setter`方法进行标识，作用与对属性标识是相同的，如下：


**StudentServiceImpl.java**


```
@Service("studentService")
public class StudentServiceImpl implements IStudentService
{
	private IStudentDao studentDao ;
	@Autowired
	public void setStudentDao(IStudentDao studentDao)
	{
		this.studentDao = studentDao;
	}
   …
}
```

## 22.4.3 扫描注解定义的Bean ##

使用`@Controller`、`@Service`、`@Repository`、`@Component`等标识完类`(Bean)`以后，还需要将这些类所在的包通过component-scan扫描后才能加载到Spring IoC容器之中，如下：


**applicationContext.xml**


```
<beans…>
<context:component-scan base-package="org.lanqiao.dao,
org.lanqiao.service">
</context:component-scan>
</beans>
```

通过`base-package`属性指定需要扫描的基准包是`org.lanqiao.dao`和`org.lanqiao.service`，之后Spring就会扫描这两个包中的所有类（含子包中的类），将其中用`@Service`等标识的类加入到SpringIoC容器之中。此处在定义扫描包时用到了`context`，所以在使用前需要导入`context`命名空间，如下：

![](/public/img/spring-zq/22.6.png)


*图22-06*


## 22.4.2 使用注解实现事务 ##

我们还可以使用`@Transactional`注解在Spring中配置声明式事务。使用前，需要再额外导入以下JAR包：

<table>
   <tr>
      <td>spring-tx-4.2.5.RELEASE.jar</td>
      <td>ojdbc6.jar</td>
      <td>commons-dbcp-1.4.jar</td>
   </tr>
   <tr>
      <td>commons-pool-1.6.jar</td>
      <td>spring-jdbc-4.2.5.RELEASE.jar</td>
      <td>aopalliance.jar</td>
   </tr>
</table>

并在Spring配置文件中配置数据源、事务管理类，以及添加对注解配置事务的支持，如下，


**applicationContext.xml**

```
<beans…>
    …
	<!-- 配置数据源 -->
	<bean id="dataSource" 
class="org.apache.commons.dbcp.BasicDataSource" 
destroy-method="close">
			<property name="driverClassName" 
value="oracle.jdbc.OracleDriver"/>
			<property name="url" 
value="jdbc:oracle:thin:@127.0.0.1:1521:XE"/>
			<property name="username" value="system"/>
			<property name="password" value="sa"/>
			<property name="maxActive" value="10"/>
			<property name="maxIdle" value="5"/>
	</bean>	
	<!-- 配置事务管理类 -->
	<bean id="txManager" 
class="org.springframework.jdbc.datasource
.DataSourceTransactionManager">
		  <property name="dataSource" ref="dataSource" />
	</bean>
	<!-- 增加对注解配置事务的支持 -->
	<tx:annotation-driven transaction-manager="txManager" />
</beans>
```

经过以上配置后，就可以在程序中使用`@Transactional`来配置事务了，如下，


**StudentServiceImpl.java**

```
//import…
@Service("studentService")
public class StudentServiceImpl implements IStudentService
{
	…
	@Transactional(readOnly=false,
propagation=Propagation.REQUIRES_NEW)
	@Override
	public void addStudent(Student student)
	{
		studentDao.addStudent(student);
	}
}
```

在业务方法上标识`@Transactional`注解，就为该方法增加了事务处理。`@Transactional`的常用属性的介绍如下，

<table>
   <tr>
      <td>属性</td>
      <td>类型</td>
      <td>说明</td>
   </tr>
   <tr>
      <td>propagation</td>
      <td>枚举型：Propagation</td>
      <td>（可选）事务传播行为。例如：propagation=Propagation.REQUIRES_NEW</td>
   </tr>
   <tr>
      <td>readOnly</td>
      <td>布尔型</td>
      <td>是否为只读型事务。例如：readOnly=false</td>
   </tr>
   <tr>
      <td>isolation</td>
      <td>枚举型：isolation</td>
      <td>（可选）事务隔离级别。例如：isolation=Isolation.READ_COMMITTED</td>
   </tr>
   <tr>
      <td>timeout</td>
      <td>int型（单位：秒） </td>
      <td>事务超时时间。例如：timeout=20</td>
   </tr>
   <tr>
      <td>rollbackFor</td>
      <td>一组Class类的实例，必须继承自Throwable</td>
      <td>一组异常类，遇到时必须进行回滚。例如：rollbackFor={SQLException.class,ArithmeticException.class}</td>
   </tr>
   <tr>
      <td>rollbackForClassName</td>
      <td>一组Class类的名称，必须继承自Throwable</td>
      <td>一组异常类名，遇到时必须进行回滚。例如：rollbackForClassName={"SQLException","ArithmeticException"}</td>
   </tr>
   <tr>
      <td>noRollbackFor</td>
      <td>一组Class类的实例，必须继承自Throwable</td>
      <td>一组异常类，遇到时必须不回滚</td>
   </tr>
   <tr>
      <td>noRollbackForClassName</td>
      <td>一组Class类的名称，必须继承自Throwable</td>
      <td>一组异常类名，遇到时必须不回滚</td>
   </tr>
</table>


# 22.5 练习题 #

**一、选择题**


1  在IOC容器的配置文件中，通过定义（    ）元素对应于在应用程序中创建对象。（选择一项）

A．`bean`	

B．`beans`	

C．`id`	

D．`class`

2  IOC容器有三种注入方式，它们分别是（    ）。（选择两项）

A．构造器注入	

B．`Setter`注入

C．p命名空间注入	
	
D．方法注入

**二、简答题**

1 Spring自动装配功能有几种模式？ 
 
2什么是IOC和DI？请简述IOC容器产生对象的基本原理。

3请描述Spring自动装配中byName模式和byType模式的区别。

4基于注解形式，与基于XML形式的IoC配置的优缺点各是什么？















