---

layout: post

title: SpringMVC整合JSON

category: SpringMVC框架

tags: SpringMVC

description: 本章将系统介绍JSON的整合步骤。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE SpringMVC

---


**使用SpringMVC整合JSON的步骤非常简单：**

**①导入`JAR`包**

需要导入以下3个`JAR`包：

<table>
   <tr>
      <td>jackson-annotations-2.1.5.jar</td>
      <td>jackson-core-2.1.5.jar</td>
      <td>jackson-databind-2.1.5.jar</td>
   </tr>
</table>

**②编写请求处理方法，并返回数组或集合类型**

**请求处理类：SecondSpringDemo.java**

```
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
	@ResponseBody
	@RequestMapping("/testJson")
	public List<Student> testJson()
	{
        //模拟从DAO层中查询学生集合
		Student stu1 = new Student("张三",23);
		Student stu2 = new Student("李四",24);
		Student stu3 = new Student("王五",25);
		List<Student> stuents = new ArrayList<Student>();
		stuents.add(stu1);
		stuents.add(stu2);
		stuents.add(stu3);
		
		return stuents;
	}
}
```

注意，要想使返回的集合或数组在前端以JSON的形式被接收，就必须在请求处理方法前加入`@ResponseBody`注解。

**③测试**

使用AJAX发送请求，并把响应结果以JSON的形式进行处理，如下：

**index.jsp**

```
<head>
	<!-- 引入jQuery库 -->
	<script type="text/javascript"src="js/jquery-1.12.3.js">
</script>
	<script type="text/javascript">
		$(document).ready(function() {
		    $("#testJson").click(function(){
				var url = "SecondSpringDemo/testJson";
				var args = {};
				$.post(url, args, function(result){
					for(var i = 0; i < result.length; i++){
                       //以JSON的形式处理响应结果
						var stuName = result[i].stuName;
						var stuAge = result[i].stuAge;
						alert("姓名" + stuName + ",年龄" + stuAge);
					}
				});
			});
		 });
	</script>
		…
</head>
<body>
	<input type="button" value="testJson" id="testJson"/>
</body>
```

执行**index.jsp**中的testJson按钮，运行结果如下：

![](http://lemon.lanqiao.org:8082/teaching/img/springmvc-zq/31.1.png)

*图31-01*

![](http://lemon.lanqiao.org:8082/teaching/img/springmvc-zq/31.2.png)

*图31-02*

![](http://lemon.lanqiao.org:8082/teaching/img/springmvc-zq/31.3.png)

*图31-03*

也可以在`firebug`中看到AJAX的响应结果确实是JSON格式的数据，如图：

![](http://lemon.lanqiao.org:8082/teaching/img/springmvc-zq/31.4.png)

*图31-04*


可以发现，SpringMVC能通过`@ResponseBody`将返回的数组或集合转为JSON格式的数据供前端处理。




