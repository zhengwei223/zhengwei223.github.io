---

layout: post


title: SpringAOP


category: Spring框架


tags: Spring框架


description: 本章将系统介绍SpringAOP。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE Spring框架

---

# 21.1 AOP原理 #

AOP（Aspect-OrientedProgramming，面向方面编程）是一种不同于OOP(Object-Oriented Programing，面向对象编程)的编程模式，它不是OOP的替代，而是对OOP的一种有益补充。

假设项目中有多个业务都包含了一些相同的代码，我们可以使用OOP的思想，将这些“相同的代码”封装到一个方法`aMethod()`之中，然后在不同的业务中调用该方法即可，如下图，

![](/public/img/spring-zq/21.1.png)

*图21-01*

但可以发现，在各个业务之中，仍然保留着对该方法的调用，即`xx.aMethod()`。如果业务代码发生改变，仍然需要维护`xx.aMethod()`在业务中的调用位置。

而从AOP的角度来看，我们可以把`aMethod()`看作是一种“横切逻辑”，称为“切面”，即指贯穿在各个业务之中、渗透到系统各处的代码。使用AOP就可以不用再在各个业务之中显示的调用`xx.aMethod()`，而是通过配置给各个业务标识一些“切入点（Pointcut）”，例如可以将`add()`方法标识为一个切入点。当以后某个业务执行到该“切入点”时，就会根据“通知（Advice）类型”自动去执行`aMethod()`这个“切面”，如下图，

![](/public/img/spring-zq/21.2.png)

*图21-02*

如果“通知类型”是“前置通知”，就会在每次执行`add()`方法前先执行`aMethod()`方法。这就好比将`add()`方法给增强了，如下，

![](/public/img/spring-zq/21.3.png)

*图21-03*

可见，使用AOP的方式可以在完全不修改业务代码的前提下，给业务增加新功能，即实现了业务逻辑和“横切逻辑”的彻底解耦合。


**以下是AOP的一些基本概念，**

<table>
   <tr>
      <td>概念</td>
      <td colspan="2">简介</td>
   </tr>
   <tr>
      <td>切面（Aspect）</td>
      <td colspan="2">一个横切功能的模块化，这个功能可能会横切多个对象（业务）。例如，aMethod()方法就是一个“切面”，它横切到了多个业务之中。</td>
   </tr>
   <tr>
      <td>切入点（Pointcut）</td>
      <td colspan="2">可以插入“横切逻辑（如aMethod()）”的方法。例如，“调用add()”就是一个切点。</td>
   </tr>
   <tr>
      <td rowspan="5">通知（Advice）</td>
      <td>前置通知（Before Advice）</td>
      <td>在切入点add()方法执行之前，插入的通知。</td>
   </tr>
   <tr>
      <td>后置通知（After Returning Advice）</td>
      <td>在切入点add()方法执行完毕之后，插入的通知。</td>
   </tr>
   <tr>
      <td>异常通知（After Throwing Advice）</td>
      <td>当切入点add()方法抛出异常时，插入的通知。</td>
   </tr>
   <tr>
      <td>最终通知（After FinallyAdvice）</td>
      <td>当切入点add()方法执行完毕时，插入的通知（不论是正常返回还是异常退出）。</td>
   </tr>
   <tr>
      <td>环绕通知（Around Advice）</td>
      <td>可以贯穿切入点add()方法执行的整个过程。</td>
   </tr>
</table>

# 21.2 AOP的应用 #

## 21.2.1 基于XML配置文件 ##

**常见通知类型如下：**

<table>
   <tr>
      <td>通知类型</td>
      <td>需要实现的接口</td>
      <td>接口中的方法</td>
      <td>执行时机</td>
   </tr>
   <tr>
      <td>前置通知</td>
      <td>org.springframework.aop.MethodBeforeAdvice</td>
      <td>before()</td>
      <td>目标方法执行前。</td>
   </tr>
   <tr>
      <td>后置通知</td>
      <td>org.springframework.aop.AfterReturningAdvice</td>
      <td>afterReturning()</td>
      <td>目标方法执行后。</td>
   </tr>
   <tr>
      <td>异常通知</td>
      <td>org.springframework.aop.ThrowsAdvice</td>
      <td>无</td>
      <td>目标方法发生异常时</td>
   </tr>
   <tr>
      <td>环绕通知</td>
      <td>org.aopalliance.intercept.MethodInterceptor</td>
      <td>invoke()</td>
      <td>拦截对目标方法调用，即调用目标方法的整个过程</td>
   </tr>
</table>

#### (1)后置通知 ####

我们现在以“使用SpringAOP实现日志输出”为例，采用“后置通知”的形式，讲解应用SpringAOP的基本步骤：

##### 1.导入相关jar包 #####

除了“搭建 Spring开发环境”一小节中使用的JAR包以外，还需要额外导入aopalliance.jar和aspectjweaver.jar。

##### 2.编写除了“日志输出”以外的其他代码 #####

编写业务逻辑层、数据访问层等代码，但将“日志输出”留给Spring AOP去处理。如下是学生信息的增删改查相关代码，


业务逻辑层接口**IStudentService.java**

```
public interface IStudentService
{
	//增加学生
	boolean addStudent(Student student);
	//删除学生
	boolean deleteStudentByNo(int stuNO);
	…
}
```

业务逻辑层实现类**StudentServiceImpl.java**


```
…

public class StudentServiceImpl implements IStudentService
{
IStudentDao stuDao;
	//为“setter方式的设置注入”提供的setter方法
	public void setStuDao(IStudentDao stuDao)
	{
		this.stuDao = stuDao;
	}

	@Override
	public boolean addStudent(Student student)
	{
		stuDao.addStudent(student);
        boolean true;
	}

	@Override
	public void deleteStudentByNo(int stuNO)
	{
		stuDao.deleteStudentByNo(stuNO);
        boolean true;
	}
}
```

省略数据库访问层（`DAO`）的相关代码。


我们知道，业务逻辑层的作用就是将多个功能进行“组装”（详见“三层架构”一章）。我们现在就可以使用SpringAOP的方式，将“日志输出”作为一个功能组装（织入）到业务逻辑层的`addStudent()`、`deleteStudentByNo()`方法中。

##### 3.编写后置通知（After Returning Advice）代码，用于实现“日志输出”功能 #####

后置通知：会在目标方法执行完毕后自动执行，后置通知写在`AfterReturningAdvice`（接口）的实现类中的`afterReturning()`方法中。

我们计划给业务逻辑层的增加、删除方法，加入“后置通知”，用来实现“日志输出”。如下：

**LoggerAfterReturning.java**

```
package org.lanqiao.aop;

import java.lang.reflect.Method;
import org.springframework.aop.AfterReturningAdvice;

public class LoggerAfterReturning implements AfterReturningAdvice
{
	@Override
	public void afterReturning(Object returnValue, Method method,
 Object[] args, Object target) throws Throwable
	{
		System.out.println("调用了"+target+"的"+method.getName()
+"()方法；返回值是："+returnValue+"；参数个数是"+args.length);
	}
}
```

**其中`afterReturning()`方法的参数含义如下表**

<table>
   <tr>
      <td>参数名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>method</td>
      <td>被代理的目标方法（如addStudent()和deleteStudentByNo()方法）</td>
   </tr>
   <tr>
      <td>returnValue</td>
      <td>目标方法的返回值</td>
   </tr>
   <tr>
      <td>args</td>
      <td>目标方法的参数</td>
   </tr>
   <tr>
      <td>target</td>
      <td>被代理的目标对象</td>
   </tr>
</table>


##### 4.配置AOP，将“日志输出”等功能织入业务逻辑层 #####

在applicationContext.xml的`Namespaces`标签中增加“aop”命名空间，如图，

![](/public/img/spring-zq/21.4.png)

*图21-04*

然后通过配置文件，将增加`addStudent()`、删除`deleteStudentByNo()`方法，与后置通知方法`afterReturning()`组装在一起，如下`<aop:config>`中的相关代码，


**applicationContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="…"
	xmlns:xsi="…"
	xmlns:p="…"
	xmlns:context="…"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation=
"http://www.springframework.org/schema/aop 
http://www.springframework.org/schema/aop/spring-aop-4.2.xsd
	…">
	<bean id="studentDao" 
class="org.lanqiao.dao.impl.StudentDaoImpl">
</bean>
	<bean id="studentService" 
class="org.lanqiao.service.impl.StudentServiceImpl">
		   <property  name="stuDao" ref="studentDao"></property>
	</bean>
	<bean id="loggerAfterReturning" 
class="org.lanqiao.aop.LoggerAfterReturning">
</bean>
	
	<aop:config>
	   <aop:pointcut id="pointcut" 
expression="execution(public boolean 
addStudent(org.lanqiao.entity.Student)) 
or execution
(public boolean deleteStudentByNo(int))" />
	   <aop:advisor pointcut-ref="pointcut" 
advice-ref="loggerAfterReturning" />
	</aop:config>
</beans>
```

以上通过配置文件，将业务逻辑层、数据库访问层、以及后置通知的实现类，都以`<bean>`的形式，加入了SpringIOC容器，并且通过`<aop:config>`将“后置通知”织入到了`addStudent()`、`deleteStudentByNo()`方法中。


**`<aop:config>`标签的相关子元素、属性含义如下：**

<table>
   <tr>
      <td>子元素/属性</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>&lt;aop:pointcut&gt;</td>
      <td>切入点。当执行到该“切入点”定义的方法（如public boolean addStudent(Student stu){...}）时，就会自动执行“通知”</td>
   </tr>
   <tr>
      <td>id</td>
      <td>切入点的唯一标示符</td>
   </tr>
   <tr>
      <td>expression</td>
      <td>切入点表达式。只要是符合该“表达式”的方法，都会被当作“切入点”，即定义了什么样的方法算是“切入点”。常见的表达式见后表。</td>
   </tr>
   <tr>
      <td>&lt;aop:advisor&gt;</td>
      <td>通知。</td>
   </tr>
   <tr>
      <td>pointcut-ref</td>
      <td>指定“通知”所关联的“切入点”</td>
   </tr>
   <tr>
      <td>advice-ref</td>
      <td>指定“通知”的具体实现类</td>
   </tr>
</table>

**表达式`expression`的常见示例如下：**


<table>
   <tr>
      <td>举例</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>public boolean addStudent(org.lanqiao.entity.Student))</td>
      <td>所有返回类型为boolean、参数类型为org.lanqiao.entity.Student的addStudent()方法。</td>
   </tr>
   <tr>
      <td>public boolean org.lanqiao.service.IStudentService.addStudent(org.lanqiao.entity.Student)</td>
      <td>org.lanqiao.service.IStudentService类（或接口）中的addStudent()方法，并且返回类型是boolean、参数类型是org.lanqiao.entity.Student</td>
   </tr>
   <tr>
      <td>public * addStudent(org.lanqiao.entity.Student)</td>
      <td>“*”代表任意返回类型</td>
   </tr>
   <tr>
      <td>public void *( org.lanqiao.entity.Student)</td>
      <td>“*”代表任意方法名</td>
   </tr>
   <tr>
      <td>public void addStudent(..)</td>
      <td>“..”代表任意参数列表</td>
   </tr>
   <tr>
      <td>* org.lanqiao.service.IStudentService.*.*(..)</td>
      <td>org.lanqiao.service.IStudentService包中，包含的所有方法（不包含子包中的方法）</td>
   </tr>
   <tr>
      <td>* org.lanqiao.service.IStudentService..*.*(..)</td>
      <td>org.lanqiao.service.IStudentService包中，包含的所有方法（包含子包中的方法）</td>
   </tr>
</table>


表达式必须写在`execution()`中，多个`execution()`可以用`or`连接起来。例如，配置文件中就将`addStudent()`和`deleteStudentByNo()`方法匹配为“切入点”，当程序执行这两个方法时，就会自动执行后置通知“loggerAfterReturning”。

##### 5.编写测试类 #####

**TestStudentDao.java**


```
public class TestStudentDao
{
public static void main(String[] args)
{
	ApplicationContext ctx = new 
ClassPathXmlApplicationContext("applicationContext.xml");
	IStudentService studentService 
= (IStudentService) ctx.getBean("studentService");

	Student student = new Student(7, "张三", 23);
//增加
	studentService.addStudent(student);
//删除
	studentService.deleteStudentByNo(7);
}
}
```

运行结果：

![](/public/img/spring-zq/21.5.png)

*图21-05*


以上就是使用SpringAOP的基本步骤。


“前置通知”与“后置通知”的方法基本相同，这里不再赘述。


#### (2)异常通知 ####

“异常通知”就是在目标方法抛出异常时，织入方法。

要使用“异常通知”，就必须实现org.springframework.aop.ThrowsAdvice接口，该接口的完整定义如下：

```
package org.springframework.aop;
public interface ThrowsAdvice extends AfterAdvice {
     //没有定义任何方法
}
```

可以发现，该接口中没有定义任何的方法，但特殊的是：该接口的实现类必须遵循如下形式的方法签名：

`void afterThrowing ( [Method method, Object[] arguments, Object target,] Throwable ex )`

即：**①**方法名必须是`afterThrowing`；

**②**方法的最后一个参数必须存在，可以是`Throwable`或其子类的类型；

**③**方法的前三个参数，要么都存在，要么一个也不存在。


**实现步骤及配置方法与“后置通知”相同，这里仅演示“异常通知”的实现类：**

**LoggerThrowsAdvice.java**

```
package org.lanqiao.aop;
import java.lang.reflect.Method;
import org.springframework.aop.ThrowsAdvice;
public class LoggerThrowsAdvice implements ThrowsAdvice
{
	public void afterThrowing(Method method, 
Object[] arguments, Object target, Throwable ex)
	{
		System.out.println(target+"对象的"+method.getName()
+"()方法发生了异常："+ex.getMessage()
+"\n方法参数的个数是:"+arguments.length);
	}
	/*
	或
	public void afterThrowing(Throwable ex)
	{
		System.out.println("发生了异常："+ex.getMessage());
	}
	*/
}
```

#### (3)环绕通知 ####


环绕通知在目标方法的前后都可以织入方法，是功能最强大的“通知”。Spring把目标方法的控制权全部交给了“环绕通知”。


在环绕通知中，可以获取或修改目标方法的参数、返回值，也可以对目标方法进行异常处理，甚至可以决定目标方法是否执行。


**环绕通知的实现类举例如下：**

**LoggerAround.java**


```
package org.lanqiao.aop;

import java.lang.reflect.Method;
import java.util.Arrays;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

// 通过MethodInterceptor接口实现环绕通知
public class LoggerAround implements MethodInterceptor
{
	public Object invoke(MethodInvocation invoke)
	{
		// 获取被代理对象
		Object target = invoke.getThis();
		// 获取被代理方法
		Method method = invoke.getMethod();
		// 获取方法参数
		Object[] args = invoke.getArguments();
		System.out.println("调用 " + target + " 的 " 
+ method.getName() + "()方法。方法的入参是：" 
+ Arrays.toString(args));
		Object result = null;
		try
		{
			// 调用目标方法，获取目标方法返回值
			result = invoke.proceed();
			System.out.println("调用 " + target + " 的 " 
+ method.getName() + "()方法。方法的返回值是：" 
+ result);
		}
		catch (Throwable e)
		{
			System.out.println(method.getName() + " 方法发生异常：" 
+ e);
		}
		return result;
	}
}
```

环绕通知必须实现`MethodInterceptor`接口中的`invoke()`方法，其参数`invoke`包含了目标方法及目标对象的所有内容，通过`invoke.proceed()`可以调用目标方法，从而实现对目标方法的完全控制。


## 21.2.2 基于注解 ##

除了使用配置XML方式实现AOP以外，Spring还支持以注解的方式定义“通知”，从而实现AOP。

#### (1)使用注解实现“前置/后置通知” ####


我们现在用注解的方式来实现“基于SpringAOP的日志输出”，步骤如下：

**1.导入相关JAR包**

与XML方式需要的JAR相同

**说明：**


若使用的Spring是3.2之前的版本，则在使用注解时还需要导入**spring-asm-x.x.x.RELEASE.jar**。


**2.使用注解定义“通知”**

本例采用“前置通知”和“后置通知”进行演示，“通知”类的代码如下：


**LoggerBeforeAndAfterReturning.java**


```
package org.lanqiao.aop.annotation;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
@Aspect
public class LoggerBeforeAndAfterReturning
{
	@Before("execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student)) ")
	public void before() {
		System.out.println("方法执行前...");
	}
	
	@AfterReturning("execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student)) ")
	public void afterReturning() {
		System.out.println("方法执行后...");
	}
}
```


**即在类的定义前加上“@Aspect”，然后在方法前加上“通知”，“通知”的类型如下：**


<table>
   <tr>
      <td>通知类型</td>
      <td>注解</td>
   </tr>
   <tr>
      <td>前置通知</td>
      <td>@Before</td>
   </tr>
   <tr>
      <td>后置通知</td>
      <td>@AfterReturning</td>
   </tr>
   <tr>
      <td>最终通知</td>
      <td>@After</td>
   </tr>
   <tr>
      <td>异常通知</td>
      <td>@AfterThrowing</td>
   </tr>
   <tr>
      <td>环绕通知</td>
      <td>@Around</td>
   </tr>
</table>


其中“最终通知”是在目标方法执行之后执行的通知，并且无论目标方法是否发生了异常，都会执行“后置通知”。


注解后面的小括号是表达式语言，用于指定织入的目标方法。表达式语言的书写规范和XML方式中的完全相同。


**3.编写Spring配置文件**

需要执行三步操作：


**①**在配置文件的`Namespaces`标签中增加“aop”命名空间（详见XML方式）

**②**启用对注解的支持

只需要加入以下一条语句：

`<aop:aspectj-autoproxy></aop:aspectj-autoproxy>`


**③**将“通知”类加入SpringIOC容器。



**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="…"
	xmlns:xsi="…"
	xmlns:p="…"
	xmlns:context="…"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation=
"http://www.springframework.org/schema/aop 
http://www.springframework.org/schema/aop/spring-aop-4.2.xsd
	…">
	…
    <!-- 启用对注解的支持 -->
	<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
    <!-- 将“通知”类加入SpringIOC容器 -->
	<bean class="org.lanqiao.aop.annotation
.LoggerBeforeAndAfterReturning">
</bean>
</beans>
```


以上就是使用注解实现了“前置/后置通知”，但“通知”的内容只是一句简单的输出语句，如`System.out.println("方法执行后...")`。如果想要像“XML方式”那样得到目标对象及方法的相关信息，就需要使用JoinPoint类型的参数。

**`JoinPoint`:称为“连接点”，是一个接口；该接口包含的常用方法如下表**：


<table>
   <tr>
      <td>方法名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>getTarget()</td>
      <td>获取目标对象</td>
   </tr>
   <tr>
      <td>getSignature()</td>
      <td>获取目标方法的Signature对象，可以通过该对象的getName()方法获取到目标方法的名称。</td>
   </tr>
   <tr>
      <td>jp.getArgs()</td>
      <td>获取目标方法的参数列表</td>
   </tr>
</table>


此外，对于后置通知，可以用`pointcut`属性指定`execution`表达式；用`returning`属性指定存储目标方法返回值的变量，再将该变量放入后置通知方法的参数列表中，如下：


修改之前的“通知”类**LoggerBeforeAndAfterReturning.java**


```
package org.lanqiao.aop.annotation;
…
import org.aspectj.lang.JoinPoint;
@Aspect
public class LoggerBeforeAndAfterReturning
{
	…
	@AfterReturning( pointcut="execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student)) ,
returning="returningValue")
	public void afterReturning(JoinPoint jp,Object returningValue)
 {
		System.out.println("对象:"+jp.getTarget()
+",方法名："+jp.getSignature().getName()
+"()\n参数列表："+Arrays.toString(jp.getArgs())
+",返回值："+returningValue);
		System.out.println("方法执行后...");
	}
}
```

执行符合`execution` 表达式的`addStudent()`方法，运行结果：

![](/public/img/spring-zq/21.6.png)


*图21-06*


#### (2)使用注解实现 “异常通知” ####

**当目标方法发生异常时自动执行的“通知”，就称为“异常通知”。“异常通知”的示例代码如下，**


**LoggerWhenException.java**


```
…
@Aspect
public class LoggerWhenException
{
	@AfterThrowing( pointcut="execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student)) ", 
throwing = "e")
public void afterThrowing(JoinPoint jp, NullPointerException e) {
		System.out.println(jp.getSignature().getName() 
+ " ()方法发生了异常：" + e);
	}
}
```

异常通知的方法通过`@AfterThrowing`注解标识，并通过`throwing`属性指定了异常变量名，再将该变量名放入异常通知方法的参数列表中。需要注意的是，参数中指定异常的类型是`NullPointerException`，就表名此异常通知只会在发生`NullPointerException`类型的异常时自动执行；如果目标方法产生了其他类型的异常，是不会触发此异常通知的。


我们再将此异常通知类加入SpringIOC容器，如下，


**applicationContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	…
  <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
<bean class="org.lanqiao.aop.annotation.LoggerWhenException">
</bean>
</beans>
```

并将`execution`表达式所指定的`addStudent()`方法进行修改，让该方法产生一个`NullPointerException`异常，如下，


**StudentServiceImpl.java**


```
package org.lanqiao.service.impl;
…
public class StudentServiceImpl implements IStudentService
{
	private IStudentDao stuDao;
	…
	@Override
	public boolean addStudent(Student student)
	{
        //测试NullPointerException所增加的语句
		stuDao= null;
		stuDao.addNewStudent(student);
		return true;
	}
}
```

再执行`addStudent()`，运行结果：

![](/public/img/spring-zq/21.7.png)

*图21-07*


#### (3)使用注解实现 “环绕通知” ####

示例代码如下：


**LoggerAround.java**


```
@Aspect
public class LoggerAround
{
	@Around("execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student)) ")
	public Object aroundLogger(ProceedingJoinPoint jp) 
throws Throwable
	{
		try
		{
			Object result = jp.proceed();
			System.out.println("对象：" + jp.getTarget()
                   + ",方法名 " + jp.getSignature().getName() 
+"()，参数列表："+ Arrays.toString(jp.getArgs()) 
+"()，返回值：" + result);
			return result;
		}
		catch (Throwable e)
		{
			System.out.println(jp.getSignature().getName() 
+ "方法发生异常：" + e);
			throw e;
		}
	}
}
```


环绕通知的方法通过`@ Around`注解标识。`ProceedingJoinPoint`是`JoinPoint`的子接口，它的`procceed()`方法可以调用真正的目标方法。


#### (4)使用注解实现 “最终通知” ####

注解方式还可以实现“最终通知”，使用`@after`标识。特点是无论目标方法是否发生异常，都会执行最终通知，类似于异常机制中finally的作用。

最终通知的示例代码如下：

**LoggerAfter.java**

```
@Aspect
public class LoggerAfter {
	@After("execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student)) ")
	public void afterLogger(JoinPoint jp) {
		System.out.println(jp.getSignature().getName() 
+ " 方法执行完毕");
	}
}
```

## 21.2.3 基于Schema配置 ##

#### (1)使用Schema配置实现 “前置/后置通知” ####


要想实现SpingAOP，除了“基于XML配置文件”和“基于注解”的方式外，还可以采用“基于Schema配置”的方式。

此方式主要是利用了Spring配置文件中的aop命名空间，如下，


**applicationContext.xml**

```
<beans 
…
xmlns:aop="http://www.springframework.org/schema/aop"
xsi:schemaLocation="http://www.springframework.org/schema/aop
 http://www.springframework.org/schema/aop/spring-aop-4.2.xsd
…>
…
</beans>
```

此方式可以将一个普通JavaBean中的方法标识为“通知方法”。例如，现在有一个普通的JavaBean，如下，


**LoggerBeforeAndAfterReturning.java**

```
package org.lanqiao.aop.schema;
…
public class LoggerBeforeAndAfterReturning
{
	public void before()
	{
		System.out.println("方法执行前...");
	}

	public void afterReturning(JoinPoint jp
, Object returningValue)
	{
		System.out.println("对象:" + jp.getTarget() + ",方法名："
 + jp.getSignature().getName() + "()\n参数列表："
				  + Arrays.toString(jp.getArgs()) + ",返回值：" 
+ returningValue);
		System.out.println("方法执行后...");
	}
}
```

我们可以通过aop命名空间（xmlns）中的元素，将此JavaBean中的`before()`方法定义为“前置通知”，将`afterReturning()`方法定义为“后置通知”，并指定切入点，如下，


**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	…
	<!-- 声明通知方法所在的Bean -->
	<bean id="loggerBeforeAndAfterReturning"  
class="org.lanqiao.aop
.schema.LoggerBeforeAndAfterReturning">
</bean>
	<!-- 配置切面 -->
	<aop:config>
		<!-- 定义切入点 -->
		<aop:pointcut id="pointcut" 
expression="execution(public boolean org.lanqiao
.service.IStudentService
.addStudent(org.lanqiao.entity.Student))" />
		<!-- 引用包含通知方法的Bean -->
		<aop:aspect ref="loggerBeforeAndAfterReturning">
			<!-- 将before()方法定义为前置通知并引用pointcut切入点 -->
			<aop:before method="before" pointcut-ref="pointcut">
</aop:before>
			<!--将afterReturning()方法定义为后置通知
并引用pointcut切入点 -->
			<!-- 通过returning属性指定为名为result的参数注入返回值 -->
			<aop:after-returning method="afterReturning" 
pointcut-ref="pointcut" returning="returningValue"/>
		</aop:aspect>
	</aop:config>
</beans>
```


即只需要将`LoggerBeforeAndAfterReturning`这个普通的JavaBean放入SpringIOC容器，然后通过`<aop:aspect>`的`ref`属性将该JavaBean声明为“通知”，再通过`<aop:before>`标签将该JavaBean的`before()`方法标识为“前置通知”，并织入`pointcut-ref`值所指向的切入点。`<aop:after>`用来设置“后置通知”，其中的`returning`属性用来指定返回值的变量名，可以将该变量名作为方法的参数名来接收返回值。

#### (2)使用Schema配置实现 “异常通知” ####

**LoggerWhenException.java**


```
public class LoggerWhenException
{	
	public void whenException(JoinPoint jp,NullPointerException e)
	{
		System.out.println(jp.getSignature().getName()
+"()方法发生了异常："+e);
	}
}
```


**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	…
	<!-- 声明通知方法所在的Bean -->
	<bean id="loggerWhenException" 
class="org.lanqiao.aop.schema.LoggerWhenException">
</bean>
	<!-- 配置切面 -->
	<aop:config>
		<!-- 定义切入点 -->
		<aop:pointcut id="pointcut" 
expression="execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student))" 
/>
		<!-- 引用包含通知方法的Bean -->
		<aop:aspect ref="loggerWhenException">
			<!-- 将afterThrowing()方法定义为异常抛出通知，
并引用pointcut切入点 -->
			<!-- 通过throwing属性指定保存异常的变量名，
可以将该变量名作为方法的参数名来处理异常-->
			<aop:after-throwing method="afterThrowing"
				pointcut-ref="pointcut" throwing="e" />
		</aop:aspect>
	</aop:config>
</beans>
```

#### (3)使用Schema配置实现 “环绕通知” ####


**LoggerAround.java**


```
public class LoggerAround {
	public Object around(ProceedingJoinPoint jp) throws Throwable {
		try {
			Object result = jp.proceed();
			System.out.println("对象名： " + jp.getTarget() 
+ " ，方法名：" + jp.getSignature().getName()
					+ "()，参数列表：" + Arrays.toString(jp.getArgs())
+"返回值：" + result);
			return result;
		} catch (Throwable e) {
			System.out.println(jp.getSignature().getName() 
+ " 方法发生异常：" + e);
			throw e;
		}
	}
}
```

**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	…
	<!-- 声明通知方法所在的Bean -->
	<bean id="loggerAround" 
class="org.lanqiao.aop.schema.LoggerAround">
</bean>
	<!-- 配置切面 -->
	<aop:config>
		<!-- 定义切入点 -->
		<aop:pointcut id="pointcut" 
expression="execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student))"
 />
		<!-- 引用包含通知方法的Bean -->
		<aop:aspect ref="loggerAround">
			<!-- 将aroundLogger()方法定义为环绕通知,
并引用pointcut切入点 -->
			<aop:around method="around" pointcut-ref="pointcut"/>
		</aop:aspect>
	</aop:config>
</beans>
```

#### (4)使用Schema配置实现 “最终通知” ####


**LoggerAfter.java**


```
public class LoggerAfter {
	public void after (JoinPoint jp) {
		System.out.println(jp.getSignature().getName() 
+ " 方法执行完毕");
	}
}
```


**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	…
		<!-- 声明通知方法所在的Bean -->
	<bean id="loggerAfter" class="org.lanqiao.aop.schema
.LoggerAfter">
</bean>
	<!-- 配置切面 -->
	<aop:config>
		<!-- 定义切入点 -->
		<aop:pointcut id="pointcut" 
expression="execution(public boolean 
org.lanqiao.service.IStudentService
.addStudent(org.lanqiao.entity.Student))"
 />
		<!-- 引用包含通知方法的Bean -->
		<aop:aspect ref="loggerAfter">
			<!-- 将after()方法定义为最终通知，并引用pointcut切入点 -->
			<aop:after method="after" pointcut-ref="pointcut"/>
		</aop:aspect>
	</aop:config>
</beans>
```


# 21.3 练习题 #

**一、选择题**

1.下列关于AOP核心概念的描述中，不正确的是（    ）。（选择一项）

A．切面（Aspect）是横切关注点的另一种表达方式

B．在Spring中，连接点（Joinpoint）可以是方法，也可以是其他特定的点

C．切入点（Pointcut）通常是一个表达式，有专门的语法，用于指明在哪里嵌入横切逻辑

D．通知（Advice）是在切面的某个特定的连接点上执行的动作

2.对下面切入点表达式的描述，正确的是（    ）。（选择一项）

**`execution(* com.bd.service..*.*(..))`**

A．选择在`com.bd.service`包中定义的所有方法

B．选择名字以`service`开始的所有方法

C．选择在`com.bd.service`包及其子包中定义的所有方法

D．选择`service`接口定义的所有方法


**二、简答题**

1.什么是AOP？AOP对OOP做了哪些补充？分别有什么作用？

2.基于XML、注解、Schema配置形式的Spring AOP的优缺点各是什么？

3.AOP中的通知有哪些类型？请描述各类型通知的区别。

4.使用Spring进行声明式事务管理，请描述配置文件中各个`bean`之间的关系。