---

layout: post


title: 新增内容2：下载


category: JSP-Servlet教程


tags: JSP Servlet


description: 


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---


**6.3 文件下载**

要实现文件的下载，不仅需要指定文件的路径，还需要在HTTP中设置两个响应消息头信息，如下：

//设置发送到浏览器的MIME类型。通知浏览器，以下载的方式打开文件

`Content-Type:  application/octet-stream`

//设置服务端的处理方式

`Content-Disposition:   attachment;filename=文件名（含后缀）`


其中，常见的`MIME`类型如下表：

<table>
   <tr>
      <td>文件类型</td>
      <td>Content-Type</td>
   </tr>
   <tr>
      <td>二进制文件（任何类型的文件）</td>
      <td>application/octet-stream</td>
   </tr>
   <tr>
      <td>Word</td>
      <td>application/msword </td>
   </tr>
   <tr>
      <td>Execl</td>
      <td>application/vnd.ms-excel</td>
   </tr>
   <tr>
      <td>PPT</td>
      <td>application/vnd.ms-powerpoint</td>
   </tr>
   <tr>
      <td>图片</td>
      <td>image/gif ， image/bmp，image/jpeg </td>
   </tr>
   <tr>
      <td>文本文件</td>
      <td>text/plain</td>
   </tr>
   <tr>
      <td>html网页</td>
      <td>text/html</td>
   </tr>
</table>


实现文件下载的思路：前端通过“下载”超链接，将请求提交到对应的Servlet；再由Servlet获取所下载文件的地址，并根据该地址创建文件的字节输入流，再通过该流读取下载文件的内容，最后将读取的内容通过输出流写到目标文件中。整个过程，都不需要依赖第三方组件。

**以下，通过一个案例来讲解文件下载的具体步骤：**

**①**通过前端发出“下载文件”的请求

**index.jsp**


```
…
<body>
	<a href="DownloadServlet?fileName=花朵.png">文件下载</a>
</body>
…
```

**②**后端接受请求、设置消息头字段，实现下载功能

假定需要下载的文件是**downloadResources**目录中的“花朵.png”文件，如下：

![](http://i.imgur.com/XWJqe1J.png)

*图34-01*

**org.lanqiao.servlet.DownloadServlet.java**

```
//package、import
public class DownloadServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request, 
HttpServletResponse response)
 throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException {
        //获取要下载的文件名
		String fileName = request.getParameter("fileName") ;
        //设置消息头（下载功能需要设置Content-Type和Content-Disposition）
		response.addHeader("Content-Type", 
"application/octet-stream");
		response.addHeader("Content-Disposition",
 "attachment;filename="+fileName);
         //获取服务器上，被下载文件（“花朵.png”）的输入流
		InputStream input = getServletContext()
.getResourceAsStream("/downloadResources/"+fileName);
		OutputStream out = response.getOutputStream() ;
		byte[] buffer = new byte[1024];
		int len = -1 ; 
        //通过IO流，实现下载文件（ “花朵.png” ）的功能
		while((len=input.read(buffer))!=-1){
			out.write(buffer,0,len);
		}
		out.close();
	}
}
```

部署项目、启动服务，执行[http://localhost:8888/DownloadProject/](http://localhost:8888/DownloadProject/)，单击“文件下载”，运行结果：
（IE、FireFox等浏览器，效果类似）

![](http://i.imgur.com/bbcyRdD.png)

*图34-02*

可以发现，虽然实现了下载功能，但是下载的文件名却出现了乱码（_.png）。为了解决乱码，首先要区分不同的浏览器：

**①**如果是IE浏览器，就需要使用URL编码：使用ServletAPI提供的`URLEncoder`类中的`encode()`方法。该方法可以将URL中的字符串，以指定的编码形式输出，如下：


**org.lanqiao.servlet.DownloadServlet.java**

```
…
String fileName = request.getParameter("fileName") ;
response.addHeader("Content-Type", "application/octet-stream");
//IE
response.addHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode(fileName,"utf-8") );
…
```

重新下载，运行结果：

![](http://i.imgur.com/AmIzxyQ.png)

*图34-03*

**②**如果是FireFox浏览器，就需要给文件名加上前缀“=?UTF-8?B?”、后缀“?=”，然后通过String构造方法以及**org.apache.tomcat.util.codec.binary.Base64.encodeBase64()**进行转码，如下：


**org.lanqiao.servlet.DownloadServlet.java**

```
…
String fileName = request.getParameter("fileName") ;
response.addHeader("Content-Type", "application/octet-stream");
//FireFox    
response.addHeader("Content-Disposition", "attachment;filename="
+"=?UTF-8?B?" 
+ (new String(Base64
.encodeBase64(fileName.getBytes("UTF-8")))) 
+ "?="   );
	…
```

重新下载，运行结果：

![](http://i.imgur.com/CFGTyu6.png)

*图34-04*

并且，我们可以通过请求头信息中的“USR-AGENT”来辨别下载时刻所使用的浏览器。完整的文件下载Servlet代码如下：

**org.lanqiao.servlet.DownloadServlet.java**

```
//package、部分import… 
import org.apache.tomcat.util.codec.binary.Base64;
public class DownloadServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		String fileName = request.getParameter("fileName");
		response.addHeader("Content-Type",
 "application/octet-stream");
         //通过请求头信息中的USER-AGENT属性，辨别下载时所采用的浏览器
		String agent = request.getHeader("USER-AGENT");
		if (agent != null && agent.toLowerCase().indexOf("firefox") > 0)
		{
			// 使用FireFox浏览器下载
			response.addHeader("Content-Disposition", 
"attachment;filename="
 + "=?UTF-8?B?"
					     + (new String(Base64
.encodeBase64(fileName.getBytes("UTF-8")))) 
 + "?=");
		}
		else
		{
			// 使用IE等其他浏览器下载
			response.addHeader("Content-Disposition", 
"attachment;filename="
                                 + URLEncoder.encode(fileName, "utf-8"));
		}

		InputStream input = getServletContext()
.getResourceAsStream("/downloadResources/" + fileName);
		OutputStream out = response.getOutputStream();
		byte[] buffer = new byte[1024];
		int len = -1;
		while ((len = input.read(buffer)) != -1)
		{
			out.write(buffer, 0, len);
		}
		out.close();
	}
}
```

**说明：**

**问**：下载功能，都是服务端的响应行为。能否通过**response.setContentType("text/html; charset=UTF-8")**来设置响应时的下载文件名编码？


**答**：不能。因为文件名是通过“头信息”发给浏览器的，而`response.setContentType()`是处理“消息体”编码的。



