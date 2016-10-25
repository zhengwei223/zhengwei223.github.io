---

layout: post

title: 表单标签

category: JSP-Servlet教程

tags: JSP Servlet

description: 在使用SpringMVC的时候，表单标签可以直接访问request域中的对象。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

> **本章简介**

在使用SpringMVC的时候，我们可以使用Spring封装的一系列表单标签。这些标签可以直接访问`request`域中的对象。

使用表单标签之前，我们需要先在JSP中进行声明，即在JSP文件的顶部加入以下指令：

```
<!-- 引入Spring表单的标签库，并将标签库的前缀设置为：form -->
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
```

之后，就可以使用SpringMVC提供的各种表单标签了。



# 28.1 `form`标签 #

`form`标签主要有两个作用：

**①**绑定表单对象；

**②**支持所有的表单提交方式（`GET`、`POST`、`DELETE`、`PUT`等）。


## 28.1.1 绑定表单对象 ##

`form`标签可以将`request`域中的属性值，自动绑定到`form`对应的`JavaBean`对象中；默认会使用`request`域中，名为`command`、类型为`JavaBean`的属性值。

例如，先在`request`域中增加一个名为`command`、类型为`JavaBean`的属性，如下，

**JavaBean ：org.lanqiao.entity.Person.java**

```
package org.lanqiao.entity;
public class Person
{
	private String name;
	private int age;
	//setter、getter
}
```

**控制器：org.lanqiao.handler.FormDemo.java**

```
//package、import…
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	@RequestMapping(value="/testForm")
	public String testForm(Map<String,Person> map){
		Person per = new Person();
		per.setName("张三");
		per.setAge(23);
        //在request域中增加command属性（JavaBean类型的属性）
		map.put("command", per);
		return "forward:/views/springForm.jsp";
	}
}
```

**JSP页面：views/springForm.jsp**

```
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
…
<body>
	  <form:form action="" method="post">  
               姓名:<form:input path="name"/><br/> 
               年龄:<form:input path="age"/><br/>  
           <input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

部署项目、启动服务，执行[http://localhost:8888/SpringMVCDemo/FormDemo/testForm](http://localhost:8888/SpringMVCDemo/FormDemo/testForm)访问控制器，运行结果：

![](http://i.imgur.com/1utnzdV.png)

*图28-01*

通过浏览器，查看此时**springForm.jsp**的源代码，如图，

![](http://i.imgur.com/1pCUcw1.png)

*图28-02*

查看到的**springForm.jsp**源代码

```
<!-- 引入Spring表单的标签库，并将标签库的前缀设置为：form -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body> 
	  <form id="command" action="/SpringMVCDemo/FormDemo/testForm" 
method="post">  
          姓名:<input id="name" name="name" type="text" value="张三"/>
<br/> 
           年龄:<input id="age" name="age" type="text" value="23"/>
<br/>  
           <input type="submit" value="提交"/>
  	  </form>  
</body>
</html>
```

可以发现，SpringMVC提供的`form`标签（`<form:form…>`）会将`request`域中的`command`属性的`name`和`age`值，赋值给`form`表单中的相应字段（`path=”name”`和`path =”age”`的字段）；并且，当没有指定`form`标签的`id`值时，`form`标签会使用`request`域中的属性名（`command`）作为`form`的`id`值；此外，还会将`<form:input path=””/>`中`path`的属性值，作为`<input id=”” name=”” />`中`id`和`name`的值。


我们已经知道，`form`标签默认绑定的是`request`域中的`command`属性，但是当`form`对应的属性名不是`command`的时候，应该怎么办呢？对于这种情况，表单标签提供了一个`commandName`属性，我们可以通过它来指定`request`域中的哪个属性与`form`表单进行绑定；除了`commandName`属性外，指定`modelAttribute`属性也可以达到相同的效果。

现在，修改之前的代码，使存放在`request`域中的是`person`属性，而不是默认的`command`属性，如下


**①在`request`域中增加`person`属性**


**控制器：org.lanqiao.handler.FormDemo.java**


```
//package、import…
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	@RequestMapping(value="/testForm")
	public String testForm(Map<String,Person> map){
		Person per = new Person();
		per.setName("张三");
		per.setAge(23);
        //在request域中增加person属性，而不是form默认指定的command属性。
		map.put("person", per);
		return "forward:/views/springForm.jsp";
	}
}
```

**注：**因为`map.put()`会将数据保存在`request`域中，所以必须使用`forward`（请求转发）来跳转页面，而不能使用`redirect`（重定向），否则会丢失`request`域中的数据。


**②SpringMVC表单标签绑定`request`域中指定的属性**

通过`commandName`或`modelAttribute`属性，指定表单元素自动与`request`域中的`person`属性进行绑定，即将`person`中的`name`、`age`属性值绑定到表单元素`<form:input path=”name” …/>`、`<form:input path=”age” … />`各自的`value`中，具体如下，


**springForm.jsp**

```
…
<body>
	  <form:form action=" " method="post" commandName="person">  
            姓名:<form:input path="name"/><br/> 
            年龄:<form:input path="age"/><br/>  
                 <input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

执行[http://localhost:8888/SpringMVCDemo/FormDemo/testForm](http://localhost:8888/SpringMVCDemo/FormDemo/testForm)，运行结果：

![](http://i.imgur.com/NSie6d3.png)

*图28-03*

查看此时页面的源代码，如下：

```
…
  <form id="person"  action=""  method="post">  
         姓名:<input id="name" name="name" type="text" value="张三"/><br/> 
         年龄:<input id="age" name="age" type="text" value="23"/><br/>  
           <input type="submit" value="提交"/>
  </form>  
…
```

不难发现，SpringMVC表单标签通过`commandName=”person”`，与`request`域中的`person`属性进行了绑定（通过`person`对象的属性名和表单元素的`path`值匹配绑定关系），并且`id`值也自动设为了`commandName`指定的`“person”`。


## 28.1.2 支持所有的表单提交方式 ##

**Jsp代码**

```
…
<form:form action="" method="delete" modelAttribute="student">  
       姓名:<form:input path="name"/><br/> 
       年龄:<form:input path="age"/><br/>  
           <input type="submit" value="提交"/>
</form:form>
…
```

以上代码，指定了`form`的提交方式是`delete`。渲染之后的HTML代码如下（假设`request`域中`student`的属性值为：`name=”zhangsan”`、`age=23`）：

```
…
<form id="student"  action=""  method="post">  
  	       <input type="hidden" name="_method" value="delete"/>  
      姓名:<input id="name" name="name" type="text" value="zhangsan"/>  
      年龄:<input id="age" name="age" type="text" value="23"/>  
            <input type="submit" value="提交"/>  
</form>
…
```

从生成的代码可以看出，SpringMVC的表单标签在处理除`GET`和`POST`之外的请求方式时，依旧是使用“POST+隐藏域”的方法进行处理；此外，依然需要配置`HiddenHttpMethodFilter`。
**详见25.2.3REST风格一节。**

`HiddenHttpMethodFilter`默认拦截的是`name=”_method”`的`hidden`元素；如果想把`“_method”`改成其他值，就可以通过SpringMVC表单标签的`methodParam`属性来指定，然后再显示的编写`hidden`元素。

如下，通过`methodParam`属性让`HiddenHttpMethodFilter`去拦截`name=” otherMethod”`的`hidden`元素（而不再去默认的拦截`name=”_method”`的`hidden`元素）：

**JSP代码**

```
…
<form:form action="" method="post" methodParam="otherMethod" 
modelAttribute="student">  
	     <input type="hidden" name="otherMethod" value="put"/>  
	姓名:<form:input path="name"/><br/> 
	年龄:<form:input path="age"/><br/>  
         <input type="submit" value="提交"/>
 </form:form> 
…
```

此外，还要把`methodParam`指定的值配置在`HiddenHttpMethodFilter`中，如下：中配置：

**web.xml**

```
…
<web-app …>
	<filter>
		<filter-name>HiddenHttpMethodFilter</filter-name>
		<filter-class>
org.springframework.web.filter.HiddenHttpMethodFilter
</filter-class>
<init-param>  
       <param-name>methodParam</param-name>  
       <param-value> otherMethod </param-value>  
</init-param>  
	</filter>

	<filter-mapping>
		<filter-name>HiddenHttpMethodFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
</web-app>
```

# 28.2 表单元素 #

除了`<form:form …>`以外，SpringMVC还提供了`<form:input path=”” .../>`、`<form:hidden path=””.../>`、`<form:checkbox path=””.../>`等标签。

其中`path`的属性值，会被渲染为 `<标签名 id=””  name=”” />`中`id`和`name`的值。例如，`<form:hidden path=”stuId” />`，渲染后的html代码为`<input type=”hidden” name=”stuId” id=”stuId”/>`。


## 28.2.1 `input`标签、`hidden`标签、`password`标签和`textarea`标签 ##

`<form:input path=””.../>`会被渲染为一个`type="text"`的普通Html `input`标签。好处就是，`<form:input.../>`能绑定表单数据，详见28.1.1绑定表单对象。

`<form:hidden path=””.../>`会被渲染为一个`type="hidden"`的普通Html `input`标签，`<form:password.../>`会被渲染为一个`type="password"`的普通HTML `input`标签，并能绑定表单数据。

同样的，`<form:textarea...>`标签会被渲染为普通HTML `textarea`标签，并能绑定表单数据，如下：


**demo.jsp**

```
…
	<form:form action="" method="" commandName="">  
	    	编号：<form:hidden path="" /><br/>
	    	用户名：<form:input path="" /><br/>
	    	密码：<form:password path="" /><br/>
	    	备注：<form:textarea path="" cols="10" rows="5" /><br/>
               <input type="submit" value="提交"/>
    	</form:form>   
…
```

## 28.2.2 `checkbox`标签和`checkboxes`标签 ##

**①`checkbox`标签**

`<form:checkbox .../>`会被渲染为一个`type=”checkbox”`的普通HTML `checkbox`标签，并且也能绑定表单数据。

我们知道，`checkbox`就是一个复选框，只有选中和不选中两种状态。在使用`<form:checkbox path=”” .../>`的时候，可以通过`path`的值来判断选中的状态。

**a.绑定`boolean`数据**


如果`checkbox`绑定的是一个`boolean`类型的数据，那么`checkbox`的状态跟该`boolean`数据的状态是一样的：`true`对应选中，`false`对应不选中。如下，

给JavaBean中增加`boolean`类型的性别`（sex）`属性：

**org.lanqiao.entity.Person.java**

```
package org.lanqiao.entity;
public class Person
{
	…
	private boolean sex ; 
	public boolean getSex()
	{
		return sex;
	}
	public void setSex(boolean sex)
	{
		this.sex = sex;
	}
     …
}
```

**控制器：org.lanqiao.handler.FormDemo.java**

```
//package、import…
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	…
	@RequestMapping(value="/testCheckboxWithBoolean")
	public String testCheckboxWithBoolean(Map<String,Person> map)
{
		Person per = new Person();
        //给Person对象加入boolean类型的属性
		per.setSex(true);
        //将Person对象加入request域
		map.put("person", per);
		return "forward:/views/checkbox.jsp";
	}
}
```

**views/checkbox.jsp**

```
…
<body>
	  <form:form action="" method="post" commandName="person">  
                 性别:<form:checkbox  path="sex"/><br/> 
           <input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

将`request`域中`person`的`sex`属性（`boolean`类型），通过`path`绑定到`checkbox`标签。当`sex`为`true`时，`checkbox`为选中状态；当`sex`为`false`时，`checkbox`为不选中状态。


执行[http://localhost:8888/SpringMVCDemo/FormDemo/testCheckbox](http://localhost:8888/SpringMVCDemo/FormDemo/testCheckbox)，运行结果：

![](http://i.imgur.com/8nxJyhG.png)

*图28-04*


**b.绑定集合/数组数据**

`<form:checkbox .../>`的选中状态，也可以绑定为数组、`List`或`Set`对象的值，本节以`List`对象为例进行讲解。

给JavaBean中增加`List`类型的爱好`（hobbies）`属性：

**org.lanqiao.entity.Person.java**

```
package org.lanqiao.entity;
import java.util.List;
public class Person
{
	…
	private List<String> hobbies ;
	public List<String> getHobbies()
	{
		return hobbies;
	}
	public void setHobbies(List<String> hobbies)
	{
		this.hobbies = hobbies;
	}
	…
}
```

**控制器：org.lanqiao.handler.FormDemo.java**

```
//package、import
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	…
	@RequestMapping(value="/testCheckboxWithList")
	public String testCheckboxWithList(Map<String,Person> map)
{
		Person per = new Person();
		List<String> hobbies = new ArrayList<String>();
		hobbies.add("football");
		hobbies.add("basketball");
//给Person对象加入List类型的属性
		per.setHobbies(hobbies);
        //将Person对象加入request域
		map.put("person", per);
		return "forward:/views/checkbox.jsp";
	}
}
```

**views/checkbox.jsp**

```
<form:form action="" method="post" commandName="person">  
        …
        爱好：<br/>
              足球:<form:checkbox  path="hobbies" value="football"/>、
篮球<form:checkbox  path="hobbies" value="basketball"/>、
乒乓球<form:checkbox  path="hobbies" value="pingpang"/>
           <input type="submit" value="提交"/>
  	  </form:form>  
```

将`request`域中`person`的`hobbies`属性(`List`类型)，通过`path`绑定到`checkbox`标签。当`checkbox`的`value`值存在于`hobbies`集合中时，此`value`对应的`checkbox`为选中状态；否则，当`checkbox`的`value`值不存在于`hobbies`集合中时，`checkbox`为不选中状态。

执行[http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxWithList](http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxWithList)，运行结果：

![](http://i.imgur.com/kiXMVye.png)

*图28-05*

因为足球与篮球`checkbox`的`value`值都存在于`hobbies`属性中，所以足球和篮球的复选框会被选中；而hobbies属性中没有乒乓球的`value`值“pingpang”，因此乒乓球的复选框不会被选中。

**c.绑定嵌套对象的`toString()`**

SpringMVC会用嵌套对象的`toString()`值，与当前`checkbox`的`value`值进行比较，如果二者一致则该`checkbox`为选中状态。如下，

**org.lanqiao.entity.Address.java**


```
package org.lanqiao.entity;
public class Address
{
	...
   	@Override
	public String toString()
	{
		return "beijing";
	}
}
```

将`Address`对象作为`Person`类的一个属性：

**org.lanqiao.entity.Person.java**

```
package org.lanqiao.entity;
import java.util.List;
public class Person
{
    //嵌套对象，并且address对象的toString()值固定是“beijing”
    private Address address ; 
	public Address getAddress()
	{
		return address;
	}
	public void setAddress(Address address)
	{
		this.address = address;
	}
}
```

**控制器：org.lanqiao.handler.FormDemo.java**

```
//package、import
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	…
	@RequestMapping(value="/testCheckboxWithObject")
	public String testCheckboxWithObject(Map<String,Person> map)
{
		Person per = new Person();
		Address address = new Address();
        //给Person对象加入Address类型的属性（嵌套对象）
		per.setAddress(address); //已知address对象的toString()值是”beijing”
        //将Person对象加入request域
		map.put("person", per);
		return "forward:/views/checkbox.jsp";
	}
}
```

**views/checkbox.jsp**

```
…
<body>
	  <form:form action="" method="post" commandName="person">  
         … 
        常用地址：
            北京<form:checkbox  path="address" value="beijing"/>、
东莞<form:checkbox  path="address" value="dongguan"/>、
           <input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

将`request`域中`person`的`address`属性(`Address`类型的嵌套对象)，通过`path`绑定到`checkbox`标签。当`checkbox`的`value`值与`address`对象的`toString()`值一致时，此`value`对应的`checkbox`为选中状态。

执行[http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxWithObject](http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxWithObject)，运行结果：

![](http://i.imgur.com/AchnYDK.png)

*图28-06*

因为`address`对象的`toString()`值是”beijing”，与北京复选框的`value`值一致，所以北京复选框会被选中。

**②`checkboxes`标签**

一个`checkbox`标签只能生成一个对应的复选框，而一个`checkboxes`标签可以根据其绑定的数据生成多个复选框。
	
`<form:checkboxes .../>`绑定的数据可以是数组、`List`或`Set`对象。使用时，必须指定两个属性: `path`和`items`。其中，`Items`表示所有要显示的`checkbox`项（包含选中和不选中），指定的是`request`域中的集合对象；`path`表示选中状态的`checkbox`项，指定的是`form`表单所绑定对象的属性。

**控制器：org.lanqiao.handler.FormDemo**

```
//package、import
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	…
	@RequestMapping(value="/testCheckboxesWithList")
	public String testCheckboxesWithList(Map<String,Object> map){
		Person per = new Person();
		List<String> hobbies = new ArrayList<String>();
		hobbies.add("football");
		hobbies.add("basketball");
		per.setHobbies(hobbies);
        //在request域中增加person对象，包含了football和basketball两项，用于表示选中的checkbox
		map.put("person", per);
		
		List<String> allHobbiesList = new ArrayList<String>();
		allHobbiesList.add("football");
		allHobbiesList.add("basketball");
		allHobbiesList.add("pingpang");
          //在request域中增加allhobbiesList对象，包含了football、basketball和pingpang三项，用于表示所有的checkbox项（选中及不选中两种状态）
		map.put("allHobbiesList",allHobbiesList);
		
		return "forward:/views/checkboxes.jsp";
	}
}
```

**views/checkboxes.jsp**

```
…
<body>
	  <form:form action="" method="post" commandName="person">  
	  		兴趣：<br/>
	  		<form:checkboxes path="hobbies" items="${allHobbiesList}"/> 
            <input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

在**checkboxes.jsp**中，`items`绑定了所有的复选框（football、basketball和pingpang三项），而`path`只绑定了选中状态的复选框（football和basketball两项）。

	
执行[http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxesWithList](http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxesWithList)，运行结果如图：

![](http://i.imgur.com/TMVSaRw.jpg)

*图28-07*

查看此时网页的源代码，如下：

![](http://i.imgur.com/1F4ouhZ.png)

*图28-08*


**源代码：**

```
…
<body>
	  <form …>  
	  	兴趣：<br/>
	  	<span>
<input id="hobbies1" name="hobbies" 
type="checkbox" value="football" checked="checked"/>
<label for="hobbies1">football</label>
</span>
        …
        <input type="submit" value="提交"/>
  	  </form>  
</body>
…
```
从源代码中可以发现，`<form:checkboxes … />`生成了很多`checkbox`标签以及对应的`lable`标签，并且`label`显示的值与`checkbox`的`value`值相同。以上是`<form:checkboxes .../>`绑定`List`对象的示例，`<form:checkboxes .../>`绑定数组或`Set`对象的用法与之相同。


如果想让`label`显示的值与`checkbox`的`value`值不同，就需要用`items`绑定一个`Map`对象（不能再绑定数组、`List`或`Set`对象）。`Map`的`key`指定`checkbox`的`value`值，`Map`的`value`指定`label`显示的值，如下：


**控制器：org.lanqiao.handler.FormDemo**

```
//package、import
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	…
	@RequestMapping(value="/testCheckboxesWithMap")
	public String testCheckboxesWithMap(Map<String,Object> map){
		Person per = new Person();
		List<String> hobbies = new ArrayList<String>();
		hobbies.add("football");
		hobbies.add("basketball");
		per.setHobbies(hobbies);
		map.put("person", per);
		
		Map<String,String> allHobbiesMap = new HashMap<String,String>();
		allHobbiesMap.put("football","足球");
		allHobbiesMap.put("basketball","篮球");
		allHobbiesMap.put("pingpang","乒乓球");
		map.put("allHobbiesMap",allHobbiesMap);
		
		return "forward:/views/checkboxes.jsp";
	}
}
```

**views/checkboxes.jsp**

```
…
<body>
	  <form:form action="" method="post" commandName="person">  
	  		兴趣：<br/>
	  		<form:checkboxes path="hobbies" items="${allHobbiesMap}"/> 
            <input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

执行[http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxesWithList](http://localhost:8888/SpringMVCDemo/FormDemo/testCheckboxesWithList)，运行结果如图：

![](http://i.imgur.com/NSxsO8c.png)

*图28-09*

查看此时网页的源代码，如下：

```
…
<body>
	<form …>  
	  	兴趣：<br/>
	  	<span>
<input id="hobbies1" name="hobbies" type="checkbox" 
value="basketball"  checked="checked"/>
<label for="hobbies1">篮球</label>
</span>
…
         <input type="submit" value="提交"/>
  	  </form>  
</body>
</html>
```

可以发现，`checkbox`的`value`值就是`Map`对象的`key`值（如“basketball”），而`label`标签显示的值就是`Map`对象的`value`值（如“篮球”）。

## 28.2.3 `radiobutton`标签和`radiobuttons`标签 ##

**①`radiobutton`标签**

`<form:radiobutton…/>`标签会被渲染为一个`type=”radio”`的普通HTML `input`标签，并且也可以绑定`request`域的数据。

```
<body>
	  <form:form action="" method="post" commandName="person">  
         	国籍:  
               <form:radiobutton path="country" value="China"/>中国  
               <form:radiobutton path="country" value="other"/>外国  
		<input type="submit" value="提交"/>
  	  </form:form>  
</body>
```

以上，`<form:radiobutton…/>`标签就绑定了`request`域中`person`对象的`country`属性，当`country`属性为“China”的时候，上面国籍为“中国”的那一行就会被选中；当`country`属性为“other”的时候，下面国籍为“外国”的那一行就会被选中。


**②`radiobuttons`标签**

`<form:radiobuttons…/>`与`<form:radiobutton…/>`的区别如同`<form:checkbox…/>`与`<form:checkboxes…/>`的区别。

使用`<form:radiobuttons…/>`的时候将生成多个单选按钮。并且，`<form:radiobuttons…/>`也有两个必须指定的属性：`path`和`items`。`Items`表示所有要显示的`radiobutton`项（包含选中和不选中），指定的是`request`域中的集合对象；`path`表示选中状态的`radiobutton`项，指定的是`form`表单所绑定对象的属性。与`<form:checkboxes…/>`中`items`和`path`的含义非常类似，并且`items`和`path`属性都可以是数组、`List`/`Set`或者是`Map`对象。

**JavaBean：org.lanqiao.entity.Person.java**

```
package org.lanqiao.entity;
import java.util.List;
public class Person
{
    …
	//最爱的球类(1:足球；2篮球；3兵乓球)
	private int favoriteBall ;
	//getter、setter
}
```

**控制器：org.lanqiao.handler.FormDemo.java**

```
//package、import
@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	…
	@RequestMapping(value="/testRadiobuttonsWithMap")
	public String testRadiobuttonsWithMap(Map<String,Object> map){
		Person per = new Person();
		//最爱的球类设置为1（足球）
		per.setFavoriteBall(1);
		map.put("person", per);

		Map<Integer,String> allBallMap = new HashMap<Integer,String>();
		//Map对象的key表示radionbutton的key；Map对象的value表示与之对应label显示的值
		allBallMap.put(1,"足球");
		allBallMap.put(2,"篮球");
		allBallMap.put(3,"乒乓球");
		map.put("allBallMap",allBallMap);
		
		return "forward:/views/radiobuttons.jsp";
	}
}
```

**views/radiobuttons.jsp**

```
…
<body>
	  <form:form action="" method="post" commandName="person">  
         	最喜欢的球类:  <br/>
         		 <form:radiobuttons path="favoriteBall" 
items="${allBallMap}" delimiter="、"/>  
		<input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

以上， `request`域中，`Map`对象`allBallMap`表示所有的`radionbutton`（选中和不选中），`person`的`favoriteBall`属性表示选中状态的`radiobutton`。

执行[http://localhost:8888/SpringMVCDemo/FormDemo/ testRadiobuttonsWithMap](http://localhost:8888/SpringMVCDemo/FormDemo/ testRadiobuttonsWithMap)，运行结果如图：

![](http://i.imgur.com/ybk2Aiy.png)

*图28-10*

从运行结果可以发现，各个`radiobutton`之间是通过“、”间隔的，而间隔符是通过`<form:radiobuttons…/>`标签中的`delimiter`属性指定的。


## 28.2.4 `select`标签 ##

`<form:select …/>`标签会被渲染为一个普通的HTML `select`标签，，并且也可以绑定request域的数据。`<form:select …/>`与`<form:radiobuttons…/>`标签的使用方法非常相似，如下是以`<form:select …/>`的形式选择最喜欢的球类：

**控制器：org.lanqiao.handler.FormDemo.java**

```
//package、import

@Controller
@RequestMapping(value = "/FormDemo")
public class FormDemo
{
	…
	@RequestMapping(value="/testSelectWithMap")
	public String testSelectWithMap(Map<String,Object> map){
		Person per = new Person();
		//最爱的球类设置为1（足球）
		per.setFavoriteBall(1);
		map.put("person", per);
		
		Map<Integer,String> allBallMap = new HashMap<Integer,String>();
		//Map对象的key表示可选项option的value；Map对象的value表示与之对应的显示值		 
allBallMap.put(1,"足球");
		allBallMap.put(2,"篮球");
		allBallMap.put(3,"乒乓球");
		map.put("allBallMap",allBallMap);
		
		return "forward:/views/select.jsp";
	}
}
```

**views/select.jsp**

```
…
<body>
	  <form:form action="" method="post" commandName="person">  
         	最喜欢的球类:  
         		<form:select path="favoriteBall" items="${allBallMap}"/>  
		<input type="submit" value="提交"/>
  	  </form:form>  
</body>
…
```

其中`path`和`items`属性，与`<form:radiobuttons…/>`中对应属性的含义相同。


执行[http://localhost:8888/SpringMVCDemo/FormDemo/testSelectWithMap](http://localhost:8888/SpringMVCDemo/FormDemo/testSelectWithMap)，运行结果：


![](http://i.imgur.com/kRzFDqn.png)

*图28-11*

## 28.2.5 `option`标签和`options`标签 ##

