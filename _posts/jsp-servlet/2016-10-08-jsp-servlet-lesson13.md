---

layout: post

title: AJAX

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍AJAX。Ajax是一种用于创建快速动态网页的技术，而且整合了JavaScript和XML等现有技术。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---

>**本章简介**

AJAX（Asynchronous Javascript And XML，异步JavaScript和XML），是一种用于创建快速动态网页的技术。从名字可以发现，Ajax并不是一种全新的技术，而是整合了JavaScript和XML等现有技术。

# 10.1 Ajax的作用 #

Ajax 通过在后台与服务器之间交换少量数据的方式，实现网页的异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的局部内容进行更新，例如：我们在网页中观看电影时，如果点击了左下角的“赞”图标，那么“赞”的数量会从5353增加到5354（即局部内容进行了更新），而当前网页并不会被刷新，如图，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/10.1.png)

*图10-01*

而传统的网页（不使用 AJAX）如果需要更新内容，就必须重新加载整个网页，试想如果点击一下“赞”网页就刷新、视频就得从头开始看，肯定是非常不方便的。

AJAX的应用非常广泛，再如当我们在百度搜索框输入内容时，搜索框会自动查询并显示列表，但搜索框以外的网页不会发生变化，如图，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/10.2.png)

*图10-02*

还有百度地图、微博等，都大量使用到了AJAX技术。

## 10.2 使用JavaScript实现Ajax ##

使用JavaScript来实现Ajax，主要是借助`XMLHttpRequest`对象向服务器发送请求，并获取返回结果。

## 10.2.1 `XMLHttpRequest`对象的常用方法 ##

**(1) open(methodName,URL,isAsync)**

与服务器连接建立。`methodName`指定请求的方法名；URL指定请求地址；`isAsync`是一个`boolean`值，代表是否采用异步方式（默认true；若无特殊需求，此值一般都填true）。

**(2) send(content)**

发送HTTP请求。`content`是可选项，用来指定请求参数，将请求参数作为请求体的一部分一起发送给服务器。通常只在POST方式下才使用`content`参数（`GET`请求方式不携带请求体）。

**(3) setRequestHeader(header,value)**

在HTTP请求头中设置key/value对：

**①**若为`GET`请求方式：则不用设置；

**②**若为`POST`方式，

**a.**当请求中包含文件上传元素时，设置为：

**XMLHttpRequest.setRequestHeader("Content-Type", "mulipart/form-data");**

**b.**当请求中不包含文件上传元素时，设置为：

**XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");**

## 10.2.2 `XMLHttpRequest`对象的常用属性 ##

#### (1)`readystate` ####

`readystate`表示`XMLHttpRequest` 对象发送的HTTP请求状态，共有以下五种状态：

<table>
   <tr>
      <td>状态值</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>0</td>
      <td>表示XMLHttpRequest 对象没有初始化</td>
   </tr>
   <tr>
      <td>1</td>
      <td>表示XMLHttpRequest 对象开始发送请求：已经执行了open()方法并完成了相关资源的准备。</td>
   </tr>
   <tr>
      <td>2</td>
      <td>表示XMLHttpRequest 对象已将请求发送完毕：已经执行了send()方法来发送请求，但是还没有收到响应。</td>
   </tr>
   <tr>
      <td>3</td>
      <td>表示XMLHttpRequest 对象开始读取响应信息：已经接收到HTTP响应的头部信息，但是还没有将响应体接收完毕。</td>
   </tr>
   <tr>
      <td>4</td>
      <td>表示XMLHttpRequest 对象将响应信息全部读取完毕</td>
   </tr>
</table>

#### (2) `status` ####

`status`表示HTTP响应中的状态码，各状态码的含义如下：

<table>
   <tr>
      <td>状态码</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>200</td>
      <td>服务器正常响应。</td>
   </tr>
   <tr>
      <td>400</td>
      <td>无法找到请求的资源。</td>
   </tr>
   <tr>
      <td>403</td>
      <td>没有访问权限。</td>
   </tr>
   <tr>
      <td>404</td>
      <td>访问的资源不存在。</td>
   </tr>
   <tr>
      <td>500</td>
      <td>服务器内部错误，很可能是服务器代码有错。</td>
   </tr>
</table>

可以发现，只有当状态码为200时才表示响应成功；否则，说明HTTP响应不正常。

#### (3) `onreadystatechange` ####

指定`XMLHttpRequest`对象的回调函数。每当`readyState`的属性值改变时，此回调函数就会被调用一次。

#### (4) `responseText` ####

从服务器端返回的`string`格式的响应内容。

#### (5) `responseXML` ####

从服务器端返回的XML格式的数据，可以直接被当作`DOM`对象使用。

## 10.2.3 使用Ajax实现异步请求 ##

**使用JavaScript实现Ajax，分为`POST`或`GET`两种方式，但大体的步骤都相同，如下：**

**①**创建`XMLHttpRequest`对象，即创建一个异步调用对象

**②**设置并编写回调函数

**③**初始化`XMLHttpRequest`对象的参数值（若是`POST`方式，还需要设置“请求头”）

**④**发送HTTP请求

再在回调函数中编写：

**⑤**获取异步调用返回的数据

**⑥**使用JavaScript或Jquery等实现局部刷新

**示例：**

很多手机软件、网站都会要求我们绑定手机号码，并且一个手机号码只能绑定一个账号。因此，我们在绑定手机号码之前，程序会先检验此号码是否已经被绑定：若已经被绑定，则提示“此号码已经被绑定，请尝试其他号码”；否则提示“绑定成功”。 现在我们就用Ajax作为前端技术，来实现此功能。

**(1)采用POST方式**

**服务器端MobileServlet.java**

```
//省略import
public class MobileServlet extends HttpServlet 
{
	protected void doGet(…)…
{
		this.doPost(request, response);
	}
	protected void doPost(HttpServletRequest request,
                               HttpServletResponse response) 
throws ServletException, IOException 
{
	//设置发送到客户端响应的内容类型
response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		String mobile = request.getParameter("mobile");
		//假设已经存在号码为18888888888的电话
		if("18888888888".equals(mobile))
{
			out.print("true");
		}else{
			out.print("false");
		}
		out.close();
	}
}
```

**客户端index.jsp**

```
…
<head>
<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
<script type="text/javascript">
	function isExist() 
	{
		var $mobile = $("#mobile").val();
		if ($mobile == null || $mobile.length != 11) 
		{
			$("#tip").html("请输入正确的手机号码！");
		} else 
		{
			//1.创建XMLHttpRequest对象
(注意：xmlHttpRequest前没有var，所以是一个全局变量)
			xmlHttpRequest = new XMLHttpRequest();
			//2.设置回调函数(注意:回调函数的名字后面没有小括号"()")
			xmlHttpRequest.onreadystatechange = callBack;
			//3.初始化XMLHttpRequest对象的参数值及请求头
			var url = "MobileServlet";
			xmlHttpRequest.open("post", url, true);
            //POST方式需要设置“请求头”
			xmlHttpRequest.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded");
			//4.发送HTTP请求
			var data = "mobile=" + $mobile;
			xmlHttpRequest.send(data);
		}
	}
	//Ajax回调函数
	function callBack() 
	{
		if (xmlHttpRequest.readyState == 4 && 
xmlHttpRequest.status == 200) 
		{
			 //获取异步调用返回的数据
			var data = xmlHttpRequest.responseText;
			 //使用JavaScript或Jquery等实现局部刷新
			if ($.trim(data) == "true") 
			{
				$("#tip").html("此号码已经被绑定，请尝试其他号码!");
			} else {
				$("#tip").html("绑定成功!");
			}
		}
	}</script>
</head>
<body>
	<form action="">
		<input type="text" id="mobile" />
 <font color="red" id="tip"></font>
		<br /> 
<input type="button" value="绑定" onclick="isExist()" />
	</form>
</body>
…	
```

可以发现，服务器端是通过`PrintWriter`对象`out`，将结果以字符串的形式，传递给客户端；而客户端通过`XMLHttpRequest`对象的`responseText`属性，来获取该结果；此外，客户端中`responseText`属性的返回值是`string`类型，所以在服务器端也应该传递`String`类型的结果。

**运行结果：**

①输入已存在的号码18888888888：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/10.3.png)

*图10-03*

②输入暂不存在的号码：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/10.4.png)

*图10-04*

③输入错误格式的电话：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/10.5.png)

*图10-05*

**(2)采用GET方式**

如果将上例改为`GET`方式的Ajax，则只需要做四处更改，具体如下：

**①**将`XMLHttpRequest`对象的`open()`方法中的`method`参数值改为`”get”`；

**②**给`XMLHttpRequest`对象的`send()`方法中的`url`参数，加上需要传递的参数值（即把`url`的值，从"请求地址"改为"请求地址?参数名1=参数值1&参数名2=参数值2&..."）

**③**删除设置`XMLHttpRequest`对象头信息的代码

**④**将`XMLHttpRequest`对象的`send(data)`方法中的`data`，改为`null`（即将`data`的值，转移到了`send()`方法的`url`参数中）。

可以发现，将`POST`方式改为`GET`方式后，把需要发送的参数从`send()`方法转移到`open`方法中的`url`参数中，并且不需要再设置头信息。

具体如代码下：

**服务器端MobileServlet.java**与`POST`方式完全相同

**客户端index_get.jsp**与`POST`方式的不同之处如下：

```
…
<head>
…
	function isExist() 
	{
          	var url = "MobileServlet";
			var data = "mobile=" + $mobile;
			xmlHttpRequest.open("get", url+"?"+data, true);
			//xmlHttpRequest.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded");
			xmlHttpRequest.send(null);		
	}
	…
	</script>
</head>
…	
```

读者可以结合`POST`方式`（index.jsp）`和`GET`方式`（index_get.jsp）`中的源代码，仔细对比。

# 10.3 使用JQuery实现Ajax #

除了使用JavaScript以外，我们还可以使用JQuery来实现Ajax，而且更加简洁、方便。JQuery方式的Ajax，主要是通过JQuery提供的`$.ajax()`、`$.get()`、`$.post()`、`load()`等方法来实现的。

## 10.3.1 `$.ajax()`方法 ##

**语法：**

```
	$.ajax({
		url:请求路径 ,
		type:请求方式 ,
		data:请求数据,
         … ,
		success:function(result, textStatus){ 
			请求成功后执行的函数体
		},
		error:function(xhr,errorMessage,e){
			请求失败后执行的函数体
		},
         dataType:预期服务器返回的数据类型
	});
```

基本格式是：所有参数写在`$.ajax({…})`中，不同参数之间用逗号隔开，每个参数以“参数名：参数值”的方式书写。

本质就是将JavaScript中`XMLHttpRequest`的属性和方法，以参数化的形式集中管理，详见下表：

<table>
   <tr>
      <td>参数</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>String url</td>
      <td>发送请求的地址，默认是当前页地址）</td>
   </tr>
   <tr>
      <td>String type</td>
      <td>请求方式（即POST或GET），默认为GET</td>
   </tr>
   <tr>
      <td>number timeout</td>
      <td>设置请求超时的时间（单位是毫秒）</td>
   </tr>
   <tr>
      <td>String data或Object data</td>
      <td>发送到服务器的数据。若是GET方式的请求，data值将以地址重写的方式附加在url后；若是POST方式，data值将作为请求体的一部分。</td>
   </tr>
   <tr>
      <td>String dataType</td>
      <td>预期服务器返回的数据类型，可用类型有XML、HTML、JSON、Text等。如果不指定，JQuery会自动根据HTTP中的MIME信息返回responseXML或responseText。</td>
   </tr>
   <tr>
      <td>function success(Object result,String textStatus)</td>
      <td>请求成功后调用的函数 result：可选项，由服务器返回的数据  textStatus：可选项，描述请求类型</td>
   </tr>
   <tr>
      <td>function error(XMLHttpRequest xhr,String errorMessage, Exception e)</td>
      <td>请求失败后调用的函数 xhr：可选项，XMLHttpRequest对象 errorMessage：可选项，错误信息 e：可选项，引发的异常对象</td>
   </tr>
</table>

除了表中介绍的以外，还有`cache`、`async`、`beforeSend`、`complete`、`contentType`等其他参数，读者可以访问[http://www.w3school.com.cn/jquery/ajax_ajax.asp](http://www.w3school.com.cn/jquery/ajax_ajax.asp)进行学习 。

现在用jQuery提供的`$.ajax()`方法，来实现“检测手机号码是否已绑定”的客户端函数（服务器端及客户端其他代码，与之前的完全一致）：


**客户端jQuery_ajax.jsp**

```
	<script type="text/javascript">
	function isExist() 
	{
		var $mobile = $("#mobile").val();
		if ($mobile == null || $mobile.length != 11) 
		{
			$("#tip").html("请输入正确的手机号码！");
		} else 
		{
			$.ajax({
				url:"MobileServlet",
				type:"get" ,
				data:"mobile=" + $mobile,
				success:function(result)
{ 
					if ($.trim(result) == "true") 
					{
						$("#tip").html("此号码已经被绑定，请尝试其他号码!");
					} else {
						$("#tip").html("绑定成功!");
					}
				 },
				 error:function(){
					$("#tip").html("检测失败!");
				 }
			});
		}
	}
</script>
```

运行结果与之前的完全相同。

## 10.3.2 `$.get()`方法 ##

`$.get(…)`方法指定以GET方式发送请求，与`$.ajax({…})`方法在语法上的区别是：①参数值必须按照一定的顺序书写；②省略了参数名、`type`参数、以及`error()`函数；③`$.ajax({…})`的各个参数是用大括号{}括起来的，而`$.get(…)`没有大括号。

**语法（各参数顺序不可变）：**

```
	$.get(
请求路径 ,
		请求数据,
        	function(result, textStatus,xhr)
{ 
			请求成功后执行的函数体
		},
        预期服务器返回的数据类型
	);
```

即，等价于:

```
	$.ajax({
		url:请求路径 ,
		data:请求数据,
        	type: "GET" ,
		success:function(result, textStatus)
{ 
			请求成功后执行的函数体
		},
		error:function(xhr,errorMessage,e)
{
			请求失败后执行的函数体
		},
        dataType:预期服务器返回的数据类型
	});
```

## 10.3.3 `$.post()`方法 ##

`$.get()`方法指定以`POST`方式发送请求，也是将参数值按照一定的顺序书写。

**语法（各参数顺序不可变）：**

```
	$.post(
请求路径 ,
		请求数据,
        	function(result, textStatus,xhr)
{ 
			请求成功后执行的函数体
		},
        预期服务器返回的数据类型
	);
```

即语法上，只是将方法名`$.get()`变为了`$.post()`，其他语法完全一致。

## 10.3.4 `$(selector).load ()`方法 ##

`$(selector).load ()`方法是在`$.get()`（或`$.post()`）方法的基础上进一步优化，不但会发送请求，还会将响应的数据放入指定的元素。其中`$(selector)`是指jQuery选择器指定的元素。


**语法：**

```
	$(selector).load(
请求路径 ,
		请求数据,
        	function(result, textStatus,xhr)
{ 
			请求成功后执行的函数体
		},
        预期服务器返回的数据类型
	);
```

因为`load()`方法会直接将响应结果放入指定元素，所以通常可以省略`load()`中的`function()`函数。

我们再用`load()`方法，实现一下“检测手机号码是否已绑定”：

**服务器端jQuery_load.jsp**

**MobileLoadServlet.java**

```
//省略import
public class MobileLoadServlet extends HttpServlet 
{
	protected void doGet(…)…
{
		this.doPost(request, response);
	}
	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException 
{
		//设置发送到客户端的响应的内容类型
		response.setContentType("text/html;charset=UTF-8"); 
		PrintWriter out = response.getWriter();
		String mobile = request.getParameter("mobile");
		//假设已经存在号码为18888888888的电话
		if("18888888888".equals(mobile))
{
			out.print("此号码已经被绑定，请尝试其他号码!");
		}else
{
			out.print("绑定成功!");
		}
		out.close();
	}
}
```

仔细观察，客户端用`load()`方法时，服务器端直接将结果字符串返回。

**客户端jQuery_load.jsp**

```
…
<script type="text/javascript">
	function isExist() 
	{
		var $mobile = $("#mobile").val();
		if ($mobile == null || $mobile.length != 11) 
		{
			$("#tip").html("请输入正确的手机号码！");
		} else 
		{
			$("#tip").load(
				"MobileLoadServlet",
				"mobile=" + $mobile
			);
		}
	}
</script>
…
<body>
	<body>
		<form action="">
			<input type="text" id="mobile" /> 
<font color="red" id="tip"></font>
			<br />
 <input type="button" value="绑定" onclick="isExist()" />
		</form>
</body>
```

运行结果仍然与之前的完全一样。

# 10. 4  JSON #

JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。在使用Ajax时，我们经常会使用JSON来传递数据。本小节，将重点学习JSON对象、JSON数组以及如何在Ajax中传递JSON数据。

## 10.4.1 JSON简介 ##

#### ① JSON对象 ####

**a.定义JSON对象**

**语法：**

`var JSON对象名 = {key:value ,  key:value , … , key:value};`

在JavaScript中，JSON对象是用大括号括起来，包含了多组属性。每个属性名和属性值之间用冒号隔开，多个属性之间用逗号隔开，并且属性名必须是字符串，如下：

```
var student = {"name":"张三","age":23};
var stu = {"name":"张三"};
```

**b.使用JSON对象**

可以通过“JSON对象名.key”获取对应的`value`值，如下：

**json.jsp**

```
…
var student = {"name":"张三","age":23};
var name = student.name;
var age = student.age ;
alert("姓名："+name+",年龄："+age	);
…
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/10.6.png)

*图10-06*

#### ② JSON数组 ####

**a.定义JSON数组**

**语法：**

 var JSON数组名 = [JSON对象, JSON对象,…, JSON对象] ;

在JavaScript中，JSON数组是用中括号括起来，包含了多个JSON对象，多个对象之间用逗号隔开，如下：

```
var students = [{"name":"张三","age":23},
{"name":"李四","age":24}];
```

**b.使用JSON数组**

可以通过“JSON对象名[索引].key”获取对应的`value`值，如下：

```
…
		var students = [{"name":"张三","age":23},
		                   {"name":"李四","age":24}];
		alert(students[1].name+","+students[1].age);
…
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/10.7.png)

*图10-07*

## 10.4.2 AJAX使用JSON传递数据 ##

使用jQuery实现AJAX时，客户端可以使用`$.getJSON()`向服务器端发送JSON格式的数据，服务器端也可以向客户端返回JSON格式的数据。

**语法：**

```
	$.getJSON (
请求路径 ,
		 JSON格式的请求数据,
        	function(result, textStatus,xhr)
{ 
			请求成功后执行的函数体
		}
	);
```

示例：**客户端：json.jsp**

```
…
<script type="text/javascript">
	function isExist() 
	{
		var $mobile = $("#mobile").val();
		if ($mobile == null || $mobile.length != 11) 
		{
			$("#tip").html("请输入正确的手机号码！");
		} else 
		{
		    $.getJSON('MobileJSONServlet',
{mobileNum: $mobile},
function(result)
{
				           	$("#tip").html(result.msg);
			              });
			}
		}
    …
</head>
<body>
	<form action="">
		<input type="text" id="mobile" /> 
<font color="red" id="tip"></font><br />
		<input type="button" value="绑定" onclick="isExist()" />
	</form>
</body>
…
```

**服务器端：MobileJSONServlet.java**

```
//import…
public class MobileJSONServlet extends HttpServlet
{
	protected void doGet(…) throws ServletException, IOException
	{
		this.doPost(request, response);
	}

	protected void doPost(…) throws ServletException, IOException
	{
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		String mobile = request.getParameter("mobileNum");
		// 假设已经存在号码为18888888888的电话
		if ("18888888888".equals(mobile))
		{
		//返回JSON格式的数据： {"msg":"此号码已经被绑定，请尝试其他号码!"}
			out.print("{\"msg\":\"此号码已经被绑定，
请尝试其他号码!\"}");
		}
		else
		{
			//返回JSON格式的数据：  {"msg":"绑定成功！"}
			out.print("{\"msg\":\"绑定成功！\"}");
		}
		out.close();
	}

}
```

	客户端使用$.getJSON向服务器端MobileJSONServlet发送JSON数据{mobileNum: $mobile}，服务器端接收到mobileNum的值后再以JSON对象的格式返回给客户端，如{"msg":"绑定成功！"}。最后，客户端再解析服务器端返回的JSON值，如result.msg。

上述的服务器端代码MobileJSONServlet中，是通过字符串拼接的形式向客户端返回了JSON形式的结果，如{"msg":"绑定成功！"}。除此之外，我们还可以在服务器端中使用`JSONObject`类来产生JSON对象，并返回给客户端，如下：

**客户端：json.jsp**

```
…
<script type="text/javascript">
	function jsonObjectTest() 
	{
		var stuName = $("#stuName").val();
		var stuAge = $("#stuAge").val();
		$.getJSON('JSONObjectServlet',
{name:stuName,age:stuAge},
function(result)
{
				       var student =  eval(result.stu);  
				       alert(student.name+","+student.age);
			         }
);
	}
	</script>
</head>
<body>
	<form action="">
	姓名：<input type="text" name="stuName" id="stuName"><br/>
	年龄：<input type="text" name="stuAge" id="stuAge"><br/>
<input type="button" value="绑定" 
onclick="jsonObjectTest()" />
	</form>
</body>
…
```

**服务器端**：在使用JSONObject之前，需要给项目导入以下JAR文件：

<table>
   <tr>
      <td>commons-beanutils.jar</td>
      <td>commons-collections-3.2.1.jar</td>
      <td>commons-lang-2.6.jar</td>
   </tr>
   <tr>
      <td>commons-logging-1.1.1.jar</td>
      <td>ezmorph-1.0.6.jar</td>
      <td>json-lib-2.3-jdk15.jar</td>
   </tr>
</table>

**JSONObjectServlet.java**

```
…
import net.sf.json.JSONObject;
public class JSONObjectServlet extends HttpServlet {
	protected void doGet(…) throws ServletException, IOException
  {
		this.doPost(request, response);
}
	protected void doPost(…) throws ServletException, IOException
 {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();

		String name =  request.getParameter("name");
		int age =Integer.parseInt( request.getParameter("age"));
		Student student = new Student();
		student.setName(name);
		student.setAge(age);
		
		JSONObject json = new JSONObject();
		//将student对象放入json对象中
		json.put("stu", student); //类似于{"stu":student}
		out.print(json);
	}
}
```


客户端通过`$.getJSON()`向服务器端JSONObjectServlet发送请求，并传递JSON格式的数据`{name:stuName,age:stuAge}`。服务器端将客户端的数据接收后封装到`Student`对象之中，之后再将`Student`对象加入到`JSONObject`对象之中，并把`JSONObject`对象返回给客户端。最后，客户端通过回调函数的参数`result`接收到`JSONObject`对象，并通过`eval(result.stu)`将`JSONObject`对象之中的`stu`转义成JSON字符串格式，再用`student.name`等拿到需要使用的值。

# 10. 5 练习题 #

一、选择题

1.（    ）是操作AJAX的核心对象。

A．XMLHttpRequest			B．status

C．statusText					D．responseText

2.XMLHttpRequest对象的onreadystatechange属性的含义是（    ）。

A．表示XMLHttpRequest对象的状态

B．服务器返回的HTTP协议状态码

C．指定当XMLHttpRequest对象状态改变时会调用哪个JavaScript函数进行处理

D．服务器响应的文本内容

二、简答题

1.什么是AJAX？请描述AJAX的技术原理和好处。

2.哪些情况需要使用到AJAX? 

3.用JS实现AJAX，需要使用到了哪个对象？该对象有哪些常用属性和方法？

4.请描述JQuery中load()方法的三个回调函数参数分别代表什么含义。

三、编程题

1. 使用JQuery方式的AJAX继续优化“部门管理系统”。

2.实现“考试计时并自动提交试卷”功能：用户进入考试页面后开始倒计时，时间结束后自动提交试卷，如图。

 ![](/public/img/jsp-yq/exercises/13/10.8.png)

3.实现“自动保存草稿”功能：编辑文本时，每隔3分钟自动保存一次草稿。

4.检测用户名是否已存在：用户输完用户名时，自动检测用户名是否存在，若存在则给出提示。

5.使用JSP+Ajax+Servlet实现登陆功能。

6.实现“带进度条的文件上传”功能，如图。

 ![](/public/img/jsp-yq/exercises/13/10.9.png)

7.实现“自动匹配关键词”功能：在搜索框中输入部分文字时，下拉框会自动进行关键词匹配，如图。其中，关键词是在info表中的title和desc字段里进行匹配。

 ![](/public/img/jsp-yq/exercises/13/10.10.png)

8.实现“无刷新分页”功能，要求在翻页时页面无刷新，如图。

 ![](/public/img/jsp-yq/exercises/13/10.11.png)

9.实现“消息气泡”功能：如果有新增未读消息，则在页面右下角自动弹出，如图。

 ![](/public/img/jsp-yq/exercises/13/10.12.png)

10.实现“实时天气预报”功能：每隔10分钟从数据库中查询一次最新的天气情况，并通过JSP显示给用户。

11.实现“发送聊天记录”功能：输入聊天内容，点击“发送”后聊天内容显示在聊天列表中，如图。

 ![](/public/img/jsp-yq/exercises/13/10.13.png)
 ![](/public/img/jsp-yq/exercises/13/10.14.png)

12.实现“级联下拉列表”功能，即相邻的两个下拉列表是父子关系，当改变父下拉列表的值时，子下拉列表的值会随之改变。要求①实现省份、城市、区县之间的级联列表，②省份等数据存放在XML文件之中，如图。

 ![](/public/img/jsp-yq/exercises/13/10.15.png)

13.从一张区域表中读取数据，通过ajax以树形的形式展现在前台页面里。鼠标点“所有区域”时，显示所有的片区；点击某一片区时，显示该片区下的省市；点击省时，显示该省下的所有市……，如图所示。

 ![](/public/img/jsp-yq/exercises/13/10.16.jpg)
 ![](/public/img/jsp-yq/exercises/13/10.17.jpg)