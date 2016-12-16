---

layout: post

title: 处理表单数据

category: SpringMVC框架

tags: SpringMVC

description: 本章将系统介绍处理表单数据。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE SpringMVC

---

# 29.1 类型转换 #

`form`表单提交的数据都是`String`类型，例如在Servlet中我们是通过`String filedName=request.getParameter(“…”)`方法来获取相应的字段值。如果需要的是`int`类型，在 Servlet中我们也必须进行类型转换，如`int age =Integer.parseInt(…)`。但是在SpringMVC中，我们并不需要关心类型的转换，例如：

```
@RequestMapping(value = "/requestWithREST/{id}",
 method = RequestMethod.POST)
public String requestWithRestAdd(@PathVariable("id") Integer id)
{
	System.out.println("增加时需要的id:" + id);
	return "success";
}
```

SpringMVC可以直接将`form`表单中的`id`字段值转为`Integer`类型，并传递给`requestWithRestAdd()`方法中的参数`id`。这是因为SpringMVC中存在着一些内置的类型转换器，可以自动实现大多数的类型转换。


除此以外，我们还可以根据需求来自定义类型转换器。例如，现在需要将`form`表单传来的字符串`“1-张三-23”`解析成学号为1、姓名为张三、年龄为23，并将这些值封装到一个学生对象之中，也就是说需要将字符串`“1-张三-23”`转换为`Student`对象类型。


**以下是具体的实现步骤：**


#### ①创建自定义类型转换器 ####

创建基于SpringMVC的自定义类型转换器，需要新建一个类，并实现SpringMVC提供的Converter接口，如下，

**自定义类型转换器，用于将字符串转换为Student类型 : StudentConverter.java**

```
…
import org.springframework.core.convert.converter.Converter;
public class StudentConverter 
implements Converter<String, Student>
{
	@Override
	public Student convert(String source)
	{
		//source值就是前端form传来的"1-张三-23"
		if (source != null)
		{
			//解析出source中的学号、姓名、年龄
			String[] vals = source.split("-");
			int stuNo = Integer.parseInt(vals[0]);
			String stuName = vals[1];
			int stuAge = Integer.parseInt(vals[2]);
           //将解析出的学号、姓名、年龄封装到Student对象之中
			Student student = new Student();
			student.setStuNo(stuNo); 
			student.setStuAge(stuAge);
			student.setStuName(stuName);
			return student;
		}
		return null;
	}
}
```

#### ②注册自定义类型转换器 ####

**springmvc.xml：将自定义的类型转换器注册到SpringMVC之中，共三步**

```
<beans …>
…
<!-- ①将自定义的类型转换器加入SpringIOC容器 -->
<bean id="studentConverter" 
class="org.lanqiao.converter.StudentConverter"></bean>
<!-- ②将自定义的类型转换器注册到 SpringMVC提供的
ConversionServiceFactoryBean中-->
<bean id="conversionService"		 
class="org.springframework.context
.support.ConversionServiceFactoryBean">
	   <property name="converters">
	    	<set>
		    	<ref bean="studentConverter"/>
		   </set>
	   </property>	
</bean>
<!--③ 将自定义的类型转换器所在的ConversionServiceFactoryBean，
注册到annotation-driven之中 -->
<mvc:annotation-driven
 conversion-service="conversionService">
</mvc:annotation-driven>
</beans>
```

至此就完成了自定义类型转化器的编写及配置工作。以下，对配置完成的类型转换器StudentConverter进行测试。

#### ③请求处理方法 ####

**FirstSpringDemo.java**

```
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
   …
@RequestMapping("/testConversionServiceConverer")
public String testConversionServiceConverer
(@RequestParam("studentInfo") Student student)
{
		System.out.println("学号:"+student.getStuNo()
+",姓名:"+student.getStuName()+",年龄:"
+student.getStuAge());
		return "success";
	}
}
```

#### ④测试 ####

**index.jsp**

```
<form action="FirstSpringDemo/testConversionServiceConverer">
	学生信息: <input type="text" name="studentInfo"/>
		    	<input type="submit" value="增加"/>
</form>
```

输入学生信息“1-张三-23”，如图，

![](/public/img/springmvc-zq/29.1.png)

*图29-01*

点击“增加”后，可在控制台得到以下结果：

![](/public/img/springmvc-zq/29.2.png)

*图29-02*

通过自定义类型转换器`StudentConverter`，成功的将前端传来的字符串`“1-张三-23”`转为了请求处理方法参数中的`Student`类型。


# 29.2 格式化数据 #

有时候需要对于日期、数字等类型进行格式化操作，例如：规定日期的格式必须为yyyy-MM-dd。

**使用SpringMVC实现数据的格式化，只需要简单的两步操作：**

**①**在需要格式化的属性前加上格式化注解，如@DateTimeFormat；

**②**在springmvc.xml中加入`<mvc:annotation-driven></mvc:annotation-driven>`和SpringMVC提供的FormattingConversionServiceFactoryBean，如下：


**springmvc.xml**


```
<beans>
  …
<bean id="conversionService"
	    class="org.springframework.format.
support.FormattingConversionServiceFactoryBean">
</bean>
</beans>
```

**说明：**


通过类的名字可知，`FormattingConversionServiceFactoryBean`既提供了格式化需要的`“Formatting”`，又提供了类型转换需要的`“Conversion”`。因此，之前配置类型转换时使用的`ConversionServiceFactoryBean`，也可以使用`FormattingConversionServiceFactoryBean`来替代。也就是说，使用以下配置既可以实现自定义的类型转换，也可以实现格式化数据：

```
<bean id="conversionService"
	class="org.springframework.
format.support.FormattingConversionServiceFactoryBean">
		<property name="converters">
			<set>
				<ref bean="studentConverter"/>
			</set>
		</property>	
</bean>
```

例如，以下指定`Date`类型的`birthday`属性的输入格式必须为yyyy-MM-dd。

**Student.java**

```
public class Student 
{
	private int stuNo;
	private String stuName;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date birthday ;
//setter、getter
}
```

通过注解`@DateTimeFormat(pattern="yyyy-MM-dd")`指定`birthday`属性的输入格式必须为yyyy-MM-dd。以下是测试格式化的操作：

**请求处理方法：FirstSpringDemo.java**

```
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
    …
	@RequestMapping("/testDateTimeFormat")
	public String testDateTimeFormat(Student student){
		System.out.println("学号："+student.getStuNo()
+",姓名："+student.getStuName()+",生日"
+student.getBirthday());
		return "success";
	}
}
```

**请求页index.jsp**

```
<form action="FirstSpringDemo/testDateTimeFormat">
		姓名:<input type="text" name="stuName"/><br>
		年龄:<input type="text" name="stuAge"/><br>
		生日:<input type="text" name="birthday"/><br>
		<input type="submit" value="提交"/>
</form>
```

如果表单中输入的日期格式符合“yyyy-MM-dd”，如“2015-05-16”，如图，

![](/public/img/springmvc-zq/29.3.png)

*图29-03*

就会将日期赋值给`birthday`属性，并可以在控制台得到输出结果：

![](/public/img/springmvc-zq/29.4.png)

*图29-04*

而如果输入的日期格式不符合“yyyy-MM-dd”格式，如输入“2015年05月16日”，点击“提交”后JSP页面就会显示HTTP Status 400，如图，


![](/public/img/springmvc-zq/29.5.png)

*图29-05*

但控制台并没有任何异常信息的输出，很不利于开发人员排查错误。为此，我们可以给请求处理方法加入一个`BindingResult`类型的参数，此参数就包含了格式化数据失败时的异常信息，如下：

**FirstSpringDemo.java**

```
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
    …
	@RequestMapping("/testDateTimeFormat")
	public String testDateTimeFormat(Student student, 
BindingResult result)
	{
		…
        //如果有错误信息
		if (result.getErrorCount() > 0)
		{
            //循环遍历所有错误信息
			for (FieldError error : result.getFieldErrors())
			{
				System.out.println(error.getField() + ":"
 + error.getDefaultMessage());
			}
		}

		return "success";
	}
}
```

此时再输入不符合格式的日期“2015年05月16日”，就能既在JSP页面显示HTTP Status 400异常，又能在控制台得到具体的异常信息，如下：


**控制台输出：**

```
birthday:Failed to convert property value of type [java.lang.String] to required type [java.util.Date] for property 'birthday'; nested exception is org.springframework.core.convert.ConversionFailedException: Failed to convert from type [java.lang.String] to type [@javax.validation.constraints.Past @org.springframework.format.annotation.DateTimeFormat java.util.Date] for value '2015年05月16日'; 
nested exception is java.lang.IllegalArgumentException: 
Unable to parse '2015年05月16日'
```

除了用于格式化日期的注解`@DateTimeFormat`以外，SpringMVC还提供了用于格式化数字的注解`@NumberFormat`，例如，可以使用`@NumberFormat`指定以下`int`类型的属性`count`的输入格式为“#,###”（其中#代表数字）

```
public class ClassName
{
@NumberFormat(pattern="#,###")
	private int count;
    //setter、getter
}
```

通过`form`表单中的`input`字段来映射`count`属性时，合法输入：如1,234；不合法的输入：如12,34。


# 29.3 数据校验 #

除了使用JS、正则表达式以外，还可以使用JSR 303-Bean Validation（简称JSR 303）来实现数据的校验。例如：用户名不能为空，email必须是一个合法地址，某个日期时间必须在当前时间之前等众多校验，都可以使用JSR 303-Bean Validation非常方便的实现。

JSR 303通过在实体类的属性上标注类@NotNull、@Max等注解指定校验规则，并通过与注解相对应的验证接口（JSR303内置提供）对属性值进行验证。

JSR 303提供的标准注解如下：

<table>
   <tr>
      <td>注解</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>@Null</td>
      <td>被注释的元素必须为 null。</td>
   </tr>
   <tr>
      <td>@NotNull</td>
      <td>被注释的元素必须不为 null。</td>
   </tr>
   <tr>
      <td>@AssertTrue</td>
      <td>被注释的元素必须为 true。</td>
   </tr>
   <tr>
      <td>@AssertFalse</td>
      <td>被注释的元素必须为 false。</td>
   </tr>
   <tr>
      <td>@Min(value)</td>
      <td>被注释的元素必须是一个数字，其值必须大于或等于value。</td>
   </tr>
   <tr>
      <td>@Max(value)</td>
      <td>被注释的元素必须是一个数字，其值必须小于或等于value。</td>
   </tr>
   <tr>
      <td>@DecimalMin(value)</td>
      <td>被注释的元素必须是一个数字，其值必须大于或等于value。</td>
   </tr>
   <tr>
      <td>@DecimalMax(value)</td>
      <td>被注释的元素必须是一个数字，其值必须小于或等于value。</td>
   </tr>
   <tr>
      <td>@Size(max, min)</td>
      <td>被注释的元素的取值范围必须是介于min和max之间。</td>
   </tr>
   <tr>
      <td>@Digits (integer, fraction)</td>
      <td>被注释的元素必须是一个数字，其值必须在可接受的范围内。</td>
   </tr>
   <tr>
      <td>@Past</td>
      <td>被注释的元素必须是一个过去的日期。</td>
   </tr>
   <tr>
      <td>@Future</td>
      <td>被注释的元素必须是一个将来的日期。</td>
   </tr>
   <tr>
      <td>@Pattern(value)</td>
      <td>被注释的元素必须符合指定的正则表达式。</td>
   </tr>
</table>

Hibernate Validator 是JSR 303的扩展。Hibernate Validator 提供了 JSR 303中所有内置的注解，以及自身扩展的4个注解，如下：

<table>
   <tr>
      <td>注解</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>@Email</td>
      <td>被注释的元素值必须是合法的电子邮箱地址。</td>
   </tr>
   <tr>
      <td>@Length</td>
      <td>被注释的字符串的长度必须在指定的范围内。</td>
   </tr>
   <tr>
      <td>@NotEmpty</td>
      <td>被注释的字符串的必须非空。</td>
   </tr>
   <tr>
      <td>@Range</td>
      <td>被注释的元素必须在合适的范围内。</td>
   </tr>
</table>

以下是使用Spring整合Hibernate Validator实现数据校验的步骤：

**①导入JAR包：**

**Spring整合Hibernate Validator共需要导入以下5个JAR包：**

<table>
   <tr>
      <td>hibernate-validator-5.0.0.CR2.jar</td>
      <td>classmate-0.8.0.jar</td>
      <td>jboss-logging-3.1.1.GA.jar</td>
   </tr>
   <tr>
      <td>validation-api-1.1.0.CR1.jar</td>
      <td colspan="2">hibernate-validator-annotation-processor-5.0.0.CR2.jar</td>
   </tr>
</table>


**②加入&lt;mvc:annotation-driven/&gt;**

Spring提供了一个`LocalValidatorFactoryBean`类，这个类既实现了Spring的校验接口，也实现了JSR303的校验接口。因此，Spring整合Hibernate Validator时，需要在Spring容器中定义了一个`LocalValidatorFactoryBean`。方便的是，`<mvc:annotation-driven/>`就会自动给Spring容器装配一个`LocalValidatorFactoryBean`，因此只需要在**springmvc.xml**中配置上`<mvc:annotation-driven/>`即可。


**③使用JSR303或Hibernate Validator校验注解，标识实体类的属性：**

本次使用JSR303提供的@Past注解，以及Hibernate Validator提供的@Email注解进行输入校验，如下：

**Student.java**

```
public class Student 
{
	…
	@Past
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date birthday ;
	@Email
	private String email;    
//setter、getter
}
```

规定birthday必须在当天之前、email必须符合邮箱格式。


**④在请求处理方法对应的实体类参数前，增加`@Valid`注解**


SpringMVC会对标有`@Valid`注解的实体类参数进行校验，并且可以通过`BindingResult`类型的参数来存储校验失败时的信息，如下：

**请求处理类：FirstSpringDemo.java**


```
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/testValid")
	public String testValid(@Valid Student student, 
BindingResult result)
	{
		if (result.getErrorCount() > 0)
		{
			//循环遍历所有错误信息
			for (FieldError error : result.getFieldErrors())
			{
				System.out.println(error.getField() + ":" 
+ error.getDefaultMessage());
			}
		}
		return "success";
	}
   …
}
```

**⑤测试**


**index.jsp**

```
<form action="FirstSpringDemo/testValid">
		用户名:<input type="text" name="stuName"/><br>
		生日:<input type="text" name="birthday"/><br>
		邮箱:<input type="text" name="email"/><br>
		<input type="submit" value="提交"/>
</form>
```

如果输入的数据不符合要求，如下：

![](/public/img/springmvc-zq/29.6.png)

*图29-06*

点击提交后，就会在控制台得到校验失败的信息（错误信息是JSR303/Hibernate Validator框架提供的，无需开发人员编写）：

![](/public/img/springmvc-zq/29.7.png)

*图29-07*


如果希望校验失败后，跳转到错误提示页面（**error.jsp**），可以通过以下方式实现：

**请求处理类：FirstSpringDemo.java**

```
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/testValid")
	public String testValid(@Valid Student student, 
BindingResult result, Map<String, Object> map)
	{
		if (result.getErrorCount() > 0)
		{
			//将错误信息通过map放入request作用域之中
			 map.put ("errors",result.getFieldErrors());
            return "error";
		}
		return "success";
	}
   …
}
```

**错误提示页：error.jsp**

```
<c:forEach items="${errors }" var="error">
	${error.getDefaultMessage() }、
</c:forEach>
```

再次在**index.jsp**中输入错误的信息（生日2021-11-11，邮箱yanqun），点击“提交”后得到以下**error.jsp**页面：

![](/public/img/springmvc-zq/29.8.png)

*图29-08*

**说明：**

需要注意的是：在请求处理方法的参数中，实体类参数和存储错误信息的`BindingResult`参数必须书写在一起，它们之间不能掺杂任何其它参数。

例如，可以写成：

```
public String testValid(@Valid Student student, BindingResult result, Map<String, Object> map)
```

但不能写成：

```
public String testValid(@Valid Student student, Map<String, Object> map, BindingResult result)
```

# 29.4 练习题 #

1.使用SpringMVC实现类型转换的基本步骤是什么？

2.SpringMVC提供了哪个类来支持数据格式化及数据校验？

3.使用SpringMVC实现数据校验的基本步骤是什么？



