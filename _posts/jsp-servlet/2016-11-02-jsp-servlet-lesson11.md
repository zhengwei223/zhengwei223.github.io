---

layout: post


title: 自定义标签


category: JSP-Servlet教程


tags: JSP Servlet


description: 除了JSTL标签库以外，JSP还支持用户开发自己的标签（自定义标签）。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---


# 11.1 自定义标签 #

除了JSTL标签库以外，JSP还支持用户开发自己的标签（自定义标签）。用于开发自定义标签的类和接口都位于**javax.servlet.jsp.tagext**包中，这些类和接口的继承及实现关系如图：


![](http://i.imgur.com/OwiHRaH.png)

*图11-01*

# 11.2 自定义标签开发步骤 #

开发一个自定义标签需要经过

**a.**编写标签处理类、

**b.**编写标签库描述符、

**c.**导入并使用标签等三个步骤，

具体如下：

#### ①编写标签处理类 ####

编写标签处理类有两种方式：传统方式和简单方式。

传统方式（JSP1.1规范）：需要实现**javax.servlet.jsp.tagext.Tag**接口

简单方式（JSP2.0规范）：需要实现**javax.servlet.jsp.SimpleTag**接口

如果JSP在编译阶段发现自定义标签，传统方式将会调用标签处理类的`doStartTag()`方法，简单方式将会调用标签处理类的`doTag()`方法。

#### ②编写标签库描述符 ####

JSP在编译时，可以通过标签库描述符文件（Tag Library Descriptor，TLD）找到对应的标签处理类。一个标签处理类必须先在TLD文件中注册，之后才能被JSP容器识别并调用。一个TLD文件中可以注册多个标签处理类，多个标签处理类就形成了一个自定义标签库。可以发现，标签处理类和TLD文件之间的关系，类似于Servlet和**web.xml**文件之间的关系。TLD文件实质是一个XML文件，如下：

**WEB-INF\myTag.tld**

```
<?xml version="1.0" encoding="UTF-8"?>
<!-- 自定义标签库的头文件 -->
<taglib xmlns="http://java.sun.com/xml/ns/j2ee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee 
http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
    version="2.0">
  <!-- 标签库的相关信息 -->
  <description>标签库的描述信息</description>
  <display-name>标签库名</display-name>
  <!-- 标签库的版本号 -->
  <tlib-version>1.0</tlib-version>
  <short-name>标签库的简称</short-name>
  <uri>标签库的uri</uri>
  
  <!-- 自定义标签的相关信息 -->
  <tag>
    <description>标签的描述信息</description>
    <name>标签名</name>
    <tag-class>自定义标签处理类</tag-class>
    <body-content>标签体的类型</body-content>
  </tag>
</taglib>
```

其中，`<body-content>`的元素值共有4个，简介如下：

<table>
   <tr>
      <td>元素值</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>empty</td>
      <td>表示在使用自定义标签时，不能设置标签体。</td>
   </tr>
   <tr>
      <td>JSP</td>
      <td>表示标签体可以是任意的JSP元素。JSP必须大写。</td>
   </tr>
   <tr>
      <td>scriptless</td>
      <td>表示标签体可以包含除scriptlet以外的任意JSP元素。</td>
   </tr>
   <tr>
      <td>tagdependent</td>
      <td>表示JSP容器对标签体的内容不进行任何解析处理。例如，标签体中的&lt;…&gt;、&lt;%...%&gt;、${…}等，都会被当作普通的字符文本。</td>
   </tr>
</table>

TLD文件编写完毕后，需要放在**WEB-INF**或其子目录下（**WEB-INF\lib**和**WEB-INF\classes**除外）。

**说明：**

**问：**TLD文件的头文件、`<tag>`等标签较多，是否都必须记忆呢？

**答：**在使用JSTL时，我们曾导入过JSTL标签库`<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>`。在Elipse中，按着ctrl键，并同时单击该uri的超链接，就能打开JSTL标签库的源代码**c.tld**。我们自己在开发TLD文件时，就可以参照**c.tld**源码。



#### ③导入并使用标签 ####

在使用自定义标签以前，需要先用taglib指定导入的TLD文件，如下，

`<%@ taglib uri="…" prefix="…" %>`

其中的属性含义如下：

<table>
   <tr>
      <td>属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>url</td>
      <td>指定引用的是哪一个TLD文件，必须和要引入TLD文件的&lt;uri&gt;值一致。相当于数据表的id值。</td>
   </tr>
   <tr>
      <td>prefix</td>
      <td>自定义标签的使用前缀。例如，如果设置JSTL的prefix=”c”，那么在使用时，就可以通过&lt;c: …/&gt;的方式使用JSTL。</td>
   </tr>
</table>

在JSP中导入TLD文件后，就可以使用自定义标签了。

**自定义标签的使用方法有以下几种：**

**<1>空标签**

空标签是指不包含标签体的标签，语法格式如下：

```
<prefix: tagname/>
或
<prefix: tagname></prefix: tagname>
```

其中，prefix表示标签的前缀；tagname表示标签名，标签名必须和TLD文件中`<name>`定义的标签名一致。


**<2>带标签体的标签**

语法格式如下：

`<prefix: tagname>标签体</prefix: tagname>`

	其中，标签体可以是JSP的页面元素（普通文本、scriptlet、EL表达式等）。


**<3>带属性的标签**


属性是对标签元素的补充说明，一般定义在开始标签中，语法格式如下：

```
<prefix: tagname  属性名1="属性值1"    属性名2="属性值2"  … >
[标签体]
</prefix: tagname>
```

	空标签和带标签体的标签都可以含有属性，并且一个标签中可以定义多个属性。


**<4>嵌套标签**

嵌套标签是指：在一个标签中嵌套另一个标签，并且可以多重嵌套；外层标签称为父标签，内层标签称为子标签；语法格式如下：

```
<prefix: tagname1  … >
          <prefix: tagname2  … >
[标签体]
</prefix: tagname2>
</prefix: tagname1>
```

# 11.3 传统标签 #

## 11.3.1 Tag接口 ##

Tag是所有传统标签的父接口，该接口的源代码如下：


**javax.servlet.jsp.tagext.Tag.java**

```
//package、import
public interface Tag extends JspTag {
    public static final int SKIP_BODY = 0;
    public static final int EVAL_BODY_INCLUDE = 1;
    public static final int SKIP_PAGE = 5;
    public static final int EVAL_PAGE = 6;
    void setPageContext(PageContext pc);
    void setParent(Tag t);
    Tag getParent();
    int doStartTag() throws JspException;
    int doEndTag() throws JspException;
    void release();
}
```

接口中，属性及方法的含义如下：

<table>
   <tr>
      <td>属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>SKIP_BODY</td>
      <td>doStartTag()方法的返回值，表示标签体不会被执行</td>
   </tr>
   <tr>
      <td>EVAL_BODY_INCLUDE</td>
      <td>doStartTag()方法的返回值，表示标签体会被执行</td>
   </tr>
   <tr>
      <td>SKIP_PAGE</td>
      <td>doStartTag()方法的返回值，表示标签后面的JSP页面内容不被执行</td>
   </tr>
   <tr>
      <td>EVAL_PAGE</td>
      <td>doStartTag()方法的返回值，表示标签后面的JSP页面内容继续执行</td>
   </tr>
</table>



<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>void setPageContext(PageContext pc)</td>
      <td>JSP容器在实例化标签处理类后，会调用setPageContext()方法将JSP的内置对象PageContext对象传递给标签处理类。此后，标签处理类就可以通过pageContext对象与JSP页面进行通信</td>
   </tr>
   <tr>
      <td>void setParent(Tag t)</td>
      <td>JSP调用完setPageContext()方法后，就会调用setParent()方法将当前标签的父标签处理类对象，传递给当前标签处理类；如果当前标签没有父标签，则参数t为null</td>
   </tr>
   <tr>
      <td>Tag getParent()</td>
      <td>获取当前标签的父标签处理类对象</td>
   </tr>
   <tr>
      <td>int doStartTag() throws JspException</td>
      <td>当JSP容器解析到自定义标签的开始标签时，会自动调用doStartTag()方法。该方法的返回值是EVAL_BODY_INCLUDE和SKIP_BODY两个常量。如果使用的是Tag的子接口BodyTag，返回值还可以是BodyTag.EVAL_BODY_BUFFERED。</td>
   </tr>
   <tr>
      <td>int doEndTag() throws JspException</td>
      <td>当JSP容器解析到自定义标签的结束标签时，会自动调用doEndTag()方法。该方法的返回值是EVAL_PAGE和SKIP_PAGE两个常量。</td>
   </tr>
   <tr>
      <td>void release()</td>
      <td>在标签处理类对象被当作垃圾回收之前，JSP容器会调用release()方法，用于释放标签处理类对象所占用的资源。</td>
   </tr>
</table>


通过以上简介可知，当JSP容器将JSP文件(.jsp)翻译成Servlet(.java)时，如果遇到JSP标签，就会创建标签处理类的实例对象，然后依次调用该对象的`setPageContext()`、`setParent()`、`doStartTag()`、`doEndTag()`和`release()`方法。


## 11.3.2 IterationTag接口 ##

如果需要对标签体的内容进行重复处理，就可以使用IterationTag接口，该接口的定义如下：

**javax.servlet.jsp.tagext.IterationTag.java**

```
//package、import
public interface IterationTag extends Tag {
    public static final int EVAL_BODY_AGAIN = 2;
    int doAfterBody() throws JspException;
}
```

可以发现，IterationTag接口继承自Tag接口，并且在Tag的基础上新增了一个EVAL_BODY_AGAIN常量和一个`doAfterBody()`方法，二者的含义如下：

<table>
   <tr>
      <td>常量/方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>EVAL_BODY_AGAIN常量</td>
      <td>doAfterBody()的一个返回值，表示JSP容器会把标签体的内容重复执行一次。</td>
   </tr>
   <tr>
      <td>int  doAfterBody()方法</td>
      <td>JSP容器在每次执行完标签体后，就会自动调用doAfterBody()方法。该方法的返回值是SKIP_BODY和EVEL_BODY_AGAIN。SKIP_BODY：表示JSP容器会去执行代表结束标签doEndTag()方法；EVEL_BODY_AGAIN:表示JSP容器会去重复执行标签体。</td>
   </tr>
</table>


**以下，是一个使用IterationTag接口实现重复执行标签体的具体步骤。**


#### ①编写标签处理类 ####


JSP容器提供了一个`TagSupport`类，该类实现了IterationTag接口。因此，我们在编写自定义标签处理类时，可以直接继承`TagSupport`类，如下：

**org.lanqiao.tag.MyIterator.java**

```
//package、import
public class MyIterator extends TagSupport
{
	//定义 num变量，用于设置循环次数
	private int num  ;
	//num的setter、getter方法	
		@Override
	public int doStartTag() throws JspException
	{
		return Tag.EVAL_BODY_INCLUDE ; //执行一次标签体
	}
	@Override
	public int doAfterBody() throws JspException
	{
		num-- ;
		//如果没执行完指定的循环次数，则重复执行一次标签体;否则，跳过标签体
		return num>0 ? EVAL_BODY_AGAIN:SKIP_BODY;
	}
}
```

在MyIterator类中，可以通过`setNum()`设置循环次数，然后通过`doStartTag()`方法执行一次标签体，最后再通过`doAfterBody()`方法控制标签体的循环次数。


#### ②在TLD文件中注册标签处理类 ####

**在WEB-INF/myTag.tld**中，注册标签处理类MyIterator，如下：

**WEB-INF/myTag.tld**

```
<?xml version="1.0" encoding="UTF-8"?>
<taglib xmlns="http://java.sun.com/xml/ns/j2ee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee 
http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
    version="2.0">
  <!-- 自定义标签库的相关信息 -->
  <description>我的自定义传统标签库</description>
  <display-name>myTagLibriry</display-name>
  <tlib-version>1.0</tlib-version>
  <short-name>myTagLib</short-name>
  <uri>http://www.lanqiao.org</uri>
  
  <!-- 自定义标签的相关信息 -->
  <tag>
    <description>自定义迭代器标签</description>
    <name>myIterator</name>
    <tag-class>org.lanqiao.tag.MyIterator</tag-class>
    <body-content>JSP</body-content>
    <attribute>
    	<!-- 设置MyIterator的num属性为必填项 -->
    	<name>num</name>
    	<required>true</required>
    </attribute>
  </tag>
</taglib>
```

以上代码中，我们在`myTagLib`标签库中定义了一个`myIterator`标签。


#### ③编写JSP页面 ####

现在，就来使用之前已经创建并注册过的`myIterator`标签，如下，


**myIterator.jsp**

```
<!-- 导入自定义标签库 -->
<%@ taglib uri="http://www.lanqiao.org"  prefix="lanqiao"%>
…
<html>
…
<body>
	    <lanqiao:myIterator num="3">
	    		    蓝桥软件学院<br/>
	    </lanqiao:myIterator>
</body>
</html>
```

部署项目，启动服务，在浏览器中执行http://localhost:8888/JspTagProject/myIterator.jsp，运行结果：

![](http://i.imgur.com/2dR2kuM.png)

*图11-02*

以上，就是使用传统方式开发自定义标签的基本步骤。


## 11.3.3 BodyTag接口 ##

除了上面的“基本步骤”外，我们还可以在标签体的内容被显示之前进行一些处理，例如，可以先将英文字母全部转为小写字母之后再显示。要想实现这样的功能，就可以使用BodyTag接口，BodyTag的源代码如下：


```
//packag、import
public interface BodyTag extends IterationTag {
    @SuppressWarnings("dep-ann")
    public static final int EVAL_BODY_TAG = 2;
    public static final int EVAL_BODY_BUFFERED = 2;
    void setBodyContent(BodyContent b);
    void doInitBody() throws JspException;
}
```

可以发现，BodyTag接口继承自IterationTag接口，并且在IterationTag的基础上新增了两个常量和两个静态方法，具体的含义如下：

<table>
   <tr>
      <td>常量/方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>EVAL_BODY_TAG</td>
      <td>从JSP 1.2开始，不再推荐使用此常量。可以使用BodyTag.EVAL_BODY_BUFFERED或IterationTag.EVAL_BODY_AGAIN替代此常量。</td>
   </tr>
   <tr>
      <td>EVAL_BODY_BUFFERED</td>
      <td>doStartTag()的第三个返回值，其余两个是在传统方式的上级接口Tag中定义的SKIP_BODY和EVAL_BODY_INCLUDE。当返回EVAL_BODY_BUFFERED时，JSP容器就会创建一个javax.servlet.jsp.tagext.BodyContent对象，并调用setBodyContent()方法。</td>
   </tr>
   <tr>
      <td>BodyContent bodyContent</td>
      <td>当前标签的标签体，被当作缓冲区使用。真正的缓冲区实际是BodyContent对象中的数组变量char[] cb。</td>
   </tr>
   <tr>
      <td>void setBodyContent(BodyContent b)</td>
      <td>当doStartTag()返回EVAL_BODY_BUFFERED时，JSP容器就会调用此方法将标签体的内容传递给bodyContent属性。</td>
   </tr>
   <tr>
      <td>void doInitBody() throws JspException</td>
      <td>当JSP容器执行完setBodyContent()以后，就会调用doInitBody()方法来进行一些初始化工作，为执行标签体做准备。</td>
   </tr>
</table>

**其中，`BodyContent`的完整定义如下：**

```
public abstract class BodyContent extends JspWriter 
{…}
```

`BodyContent`是一个抽象类，它的子类`BodyContentImpl`的部分源代码如下：


```
public class BodyContentImpl extends BodyContent {
    //缓冲变量
private char[] cb;
…
  @Override
    public void write(char[] cbuf, …) throws IOException {…}
 …

}
```

可以发现，在BodyContentImpl中定义了一个用于存储数据的缓冲变量cb。当调用`BodyContent`对象的`write()`方法写数据时，数据将被写入到缓冲变量cb中。


综上，JSP容器使用`BodyContent`对象处理标签体的大致流程是：当标签处理类对象的`doStartTag()`方法返回EVAL_BODY_BUFFERED时，JSP容器就会创建一个`BodyContent`对象，然后调用该对象的`write()`方法将标签体的内容写入`BodyContent`对象的缓冲变量cb中。之后，开发者只需要访问`BodyContent`的缓冲变量cb，就能够对标签体的内容进行处理。`BodyContent`类中还定义了以下方法，用于访问缓冲变量cb中的内容： 


<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public abstract String getString()</td>
      <td>返回BodyContent对象在缓冲变量中保存的数据</td>
   </tr>
   <tr>
      <td>public abstract Reader getReader()</td>
      <td>返回Reader对象，用于读取缓冲变量中的数据</td>
   </tr>
   <tr>
      <td>public abstract void writeOut(Writer out) throws IOException</td>
      <td>将BodyContent对象保存在缓冲变量中的数据，写入到指定的输出流。</td>
   </tr>
   <tr>
      <td>public void clearBody()</td>
      <td>清空BodyContent对象在缓冲变量中保存的数据</td>
   </tr>
   <tr>
      <td>public JspWriter getEnclosingWriter()</td>
      <td>返回JspWriter对象。当JSP容器创建BodyContent对象后，PageContext对象中的out属性就不再指向JSP隐式对象，而是指向新创建的BodyContent对象；同时，在BodyContent对象中会用一个JspWriter类型的成员变量enclosingWriter记住原来的隐式对象，getEnclosingWriter()就是返回原来的隐式对象。</td>
   </tr>
</table>

JSP容器在执行标签处理类时，除了会用到`BodyContent`类以外，还会涉及很多的方法或属性，具体流程如下：

![](http://i.imgur.com/CKoOoIl.png)

*图11-03*

其中，`release()`方法只有在标签处理类对象被当作垃圾回收前，才被调用。传统方式的标签处理类是单例的，只会被创建和销毁一次。


**以下，通过编写&lt;lanqiao:toLowerCase&gt;演示自定义标签的使用步骤**

#### ①编写标签处理类 ####

编写`ToLowerCase`类并继承BodyTagSupport，使之成为一个标签处理类，如下：

**org.lanqiao.tagbody.ToLowerCase.java**

```
//package、import
public class ToLowerCase extends BodyTagSupport
{
    /*
	 	父类BodyTagSupport的doStartTag()方法默认返回EVAL_BODY_BUFFERED。
	当返回EVAL_BODY_BUFFERED时，JSP容器就会将标签体的内容通过
setBodyContent()方法设置到父类的BodyContent对象（缓冲区对象）。之后就可以
在BodyContent对象中获取需要的数据
	 */
	//当JSP容器解析到自定义标签的结束标签时，会自动调用doEndTag()方法
	@Override
	public int doEndTag() throws JspException
	{
		//获取缓冲区中的数据
		String content = getBodyContent().getString();
		//将数据转为小写
		content = content.toLowerCase() ;
		
		try
		{
			bodyContent.getEnclosingWriter().write(content);
			//或 pageContext.getOut().write(content);
		}
		catch (…){…}
		return super.doEndTag();
	}
}
```

JSP容器在调用`doStartTag()`方法时，会将标签体的内容赋值到缓冲区`BodyContent`对象中，之后就可以在`doEndTag()`方法中通过`getBodyContent().getString()`获取`BodyContent`中的缓冲区数据，之后再将缓冲区数据转为小写并输出。


#### ②注册标签处理类 ####

在**myTag.tld**中注册标签处理类，如下：


**WEB-INF\myTag.tld**

```
<taglib …>
  …
   <tag>
     <name>toLowerCase</name>
     <tag-class>org.lanqiao.tagbody.ToLowerCase</tag-class>
     <body-content>JSP</body-content>
   </tag>

</taglib>
```

#### ③编写JSP页面，使用自定义标签 ####


**myToLowerCase.jsp**

```
<!-- 导入自定义标签库 -->
<%@ taglib uri="http://www.lanqiao.org"  prefix="lanqiao"%>
…
<html>
…
<body>
	<lanqiao:toLowerCase>
			HELLO LANQIAO<br/>
	</lanqiao:toLowerCase>
</body>
</html>
```

运行结果：

![](http://i.imgur.com/hFm3Odr.png)

*图11-04*

可以发现，`<lanqiao:toLowerCase>`成功的将HELLO LANQIAO转为了小写。


# 11.4 简单标签 #

由于传统标签使用繁琐，因此，从JSP2.0开始产生了一个新的标签：简单标签。简单标签的上级接口是SimpleTag。


简单标签接口SimpleTag与传统标签接口Tag的最大区别是：SimpleTag接口中只定义了一个用于处理标签逻辑的`doTag()`方法，该方法就替代了Tag接口中的`doStartTag()`、`doEndTag()`和`doAfterBody()`等方法。`doTag()`方法会在JSP容器执行自定义标签时被调用，并且只会被调用一次。

## 11.4.1 SimpleTag接口 ##

**SimpleTag接口中的方法简介如下：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void doTag()  throws JspException,IOException</td>
      <td>用于完成所有的逻辑操作：输出、迭代、修改标签体等。除了定义中的2个异常外，此方法还会抛出SkipPageException异常。若抛出SkipPageException，就等效于传统标签doEndTag()方法返回SKIP_PAGE常量，即通知JSP容器不再执行JSP页面中位于结束标签以后的内容。</td>
   </tr>
   <tr>
      <td>public void setParent( JspTag parent )</td>
      <td>用于将当前标签的父标签处理类对象传递给当前标签处理类。如果当前标签没有父标签，JSP容器会忽略执行此方法。</td>
   </tr>
   <tr>
      <td>public JspTag getParent()</td>
      <td>返回当前标签的父标签处理类对象。如果没有，则返回null。</td>
   </tr>
   <tr>
      <td>public void setJspContext( JspContext pc )</td>
      <td>用于将JSP内置对象pageContext对象传递给标签处理类。之后，标签处理类就可以通过pageContext对象与JSP页面进行交互。JspContext是PageContext的父类。</td>
   </tr>
   <tr>
      <td>public void setJspBody( JspFragment jspBody )</td>
      <td>用于把标签体的JspFragment对象传递给标签处理类对象。</td>
   </tr>
</table>


**简单方式标签处理类的执行流程如下：**

![](http://i.imgur.com/0p8j0vP.png)

*图11-05*

JSP容器会在每次处理JSP页面中的简单标签时，创建一个独立的标签处理类对象，而不会像传统标签那样对标签处理类对象进行缓存，因此简单标签是线程安全的。


## 11.4.2 `JspFragment`类 ##

`JspFragment`类的源代码如下：


**javax.servlet.jsp.tagext.JspFragment.java**

```
//package、import
public abstract class JspFragment {
        public abstract void invoke( Writer out )
                          throws JspException, IOException;
        public abstract JspContext getJspContext();
}
```

`JspFragment`对象表示JSP页面中的一个JSP片段，但该片段中不能包含scriptlet（JSP脚本元素）。JSP容器在处理简单标签的标签体时，会把标签体内容用一个`JspFragment`对象表示，并调用标签处理类对象的`setJspBody()`方法将`JspFragment`对象传递给标签处理类对象。之后，我们就可以调用`JspFragment`对象的方法来决定是否循环、输出标签体等操作。`JspFragment`中定义的方法简介如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>void invoke(Writer out)</td>
      <td>用于将标签体的内容写入到输出流out对象中。如果参数out的值为null，JSP容器会将标签内容写入到JspContext.getOut()方法返回的输出流对象中。如果doTag()方法调用一次invoke()，则会执行一次标签体；如果调用多次invoke()，就会执行多次标签体。</td>
   </tr>
   <tr>
      <td>JspContext getJspContext()</td>
      <td>用于返回代表页面的JspContext对象</td>
   </tr>
</table>

值得注意的是，`JspFragment`没有提供像`BodyContent`那样的缓冲区，也没有定义`getString()`之类的方法获取标签体的内容。如果要对标签体的内容进行修改，只需要在`invoke()`方法中传入一个输出流对象，然后把标签体的执行结果输出到该输出流对象中，再从输出流中获取数据、修改并显示。


## 11.4.3 `SimpleTagSupport`类 ##

`SimpleTagSupport`的定义如下：

**javax.servlet.jsp.tagext.SimpleTagSupport.java**

```
public class SimpleTagSupport implements SimpleTag 
{…}
```

可以发现，`SimpleTagSupport`实现了SimpleTag接口。其中重要的方法及属性简介如下：

<table>
   <tr>
      <td>属性/方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>jspContext属性</td>
      <td>用于保存JSP容器传入的JspContext对象</td>
   </tr>
   <tr>
      <td>jspBody属性</td>
      <td>用于保存JSP容器传入的JspFragment对象</td>
   </tr>
   <tr>
      <td>protected JspContext getJspContext()方法</td>
      <td>用于返回代表调用页面的JspContext对象</td>
   </tr>
   <tr>
      <td>protected JspFragment getJspBody()方法</td>
      <td>用于返回代表标签体的JspFragment对象</td>
   </tr>
</table>

以下，通过一个示例来演示使用简单标签的具体步骤（实现循环功能，与之前传统标签方式开发的`<lanqiao:myIterator>`功能相同）：

#### ①编写标签处理类 ####

编写`MySimpleIterator`类，并继承`SimpleTagSupport`类，如下：

**org.lanqiao.tag.MySimpleIterator.java**

```
//package、import
public class MySimpleIterator extends SimpleTagSupport
{
	private int num ;
    //省略num的setter、getter方法
	//对标签进行逻辑处理
	@Override
	public void doTag() throws JspException, IOException
	{
		//获取标签体
		JspFragment jFragment =super.getJspBody();
		//控制标签体的循环次数
		for(int i=0;i<num;i++){
			jFragment.invoke(null);
		}
		super.doTag();
	}
}
```

#### ②在TLD文件中注册标签处理类 ####

模仿传统方式的**myTag.tld**，编写注册简单标签的TLD文件**mySimpleTag.tld**，如下，


**WEB-INF\mySimpleTag.tld**

```
<?xml version="1.0" encoding="UTF-8"?>
<taglib xmlns="http://java.sun.com/xml/ns/j2ee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee 
http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
    version="2.0">
  <!-- 自定义简单标签库的相关信息 -->
  <description>我的自定义简单标签库</description>
  <display-name>mySimpleTagLibriry</display-name>
  <tlib-version>1.0</tlib-version>
  <short-name>mySimpleTagLib</short-name>
  <uri>lanqiao.org</uri>
  
  <tag>
    <description>自定义迭代器简单标签</description>
    <name>mySimpleIterator</name>
    <tag-class>org.lanqiao.tag.MySimpleIterator</tag-class>
    <!-- 指定标签体为scriptless:除了JSP脚本元素以外的JSP元素 -->
    <body-content>scriptless</body-content>
    <attribute>
    	    <name>num</name>
        	<required>true</required>
    </attribute>
  </tag>
  
</taglib>
```

需要注意的是，简单标签的`<body-content>`元素值只能是scriptless(默认)、empty和tagdependent。


#### ③编写JSP页面 ####

导入自定义简单标签并使用，如下：

**mySimpleIterator.jsp**

```
<%@ taglib uri="lanqiao.org" prefix="lq" %>
…
<html>
…
<body>
	<lq:mySimpleIterator num="3">
		hello lanqiao<br/>
	</lq:mySimpleIterator>
</body>
</html>
```

执行[http://localhost:8888/JspTagProject/mySimpleIterator.jsp](http://localhost:8888/JspTagProject/mySimpleIterator.jsp)，运行结果：

![](http://i.imgur.com/XoAKs1C.png)

*图11-06*


## 11.4.4 标签体内容的执行条件 ##

有时候，我们要判断标签体是否需要执行。例如，如果登录成功，则执行某个标签体；否则就不执行。对于传统标签，可以通过`doEndTag()`的返回值来判断。而对于简单标签，就可以使用`doTag()`方法：如果登录成功，则显示欢迎信息；如果登录失败，`doTag()`会抛出SkipPageException异常，用于通知JSP容器不再执行标签体的内容。

以下，通过一个示例来演示此登录验证的具体步骤：


#### ①编写标签处理类 ####
	
通过`doTag()`方法接收`session`域中的`username`属性值，如果属性值不为空就执行标签体的内容，如下：

**org.lanqiao.tag.Login.java**

```
//package、import
public class Login extends SimpleTagSupport
{
	@Override
	public void doTag() throws JspException, IOException
	{
		PageContext pageContext = 
	(PageContext)super.getJspContext();
		HttpSession session = pageContext.getSession() ;
		//获取session中的username属性
		String name = (String)session.getAttribute("username") ;
		//如果name不为空，则执行标签体的内容
		if(name !=null){
			this.getJspBody().invoke(null);
		}
	}
}
```

#### ②在TLD文件中注册标签处理类 ####

**WEB-INF\mySimpleTag.tld**

```
…
  <uri>lanqiao.org</uri>
  …
  <tag>
  	<name>login</name>
  	<tag-class>org.lanqiao.tag.Login</tag-class>
  	<!-- 简单标签不能包含JSP脚本元素，因此不能设置成JSP -->
  	<body-content>scriptless</body-content>
  </tag>
…
```

#### ③编写JSP页面，导入并使用自定义标签 ####

**index.jsp**

```
<%@ taglib uri="lanqiao.org"  prefix="lq"%>
…
<html>
…
<body>
		<lq:login>
			${username },已登陆 <br/>
		</lq:login>
		网站内容
</body>
</html>
```

`<lq:login>`标签会根据`session`域中是否有`username`属性来判断标签体的内容是否执行。

#### ④编写Servlet，接收用户的访问请求 ####


将用户请求中的`uname`属性设置到`session`域的`username`对象中，如下，


**org.lanqiao.tag.loginServlet.java**

```
//package、import
public class loginServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request, 
HttpServletResponse response) throws ServletException, IOException {
		String uname = request.getParameter("uname") ;
		if(uname !=null){
			request.getSession().setAttribute("username",uname);
		}
		request.getRequestDispatcher("index.jsp")
.forward(request, response);
	
	}

	protected void doPost(…) throws … {
		this.doGet(request, response);
	}
}
```

#### ⑤通过URL访问Servlet，测试用户的访问请求 ####


如果访问的URL中带有`uname`参数，如[http://localhost:8888/JspTagProject/loginServlet?uname=zhangsan](http://localhost:8888/JspTagProject/loginServlet?uname=zhangsan)，运行结果：

![](http://i.imgur.com/Tnl3phn.png)

*图11-07*

如果访问的URL中不带`uname`参数，如[http://localhost:8888/JspTagProject/loginServlet](http://localhost:8888/JspTagProject/loginServlet)，运行结果：

![](http://i.imgur.com/wvq9sJP.png)

*图11-08*

可以发现，如果访问请求中带有`uname`属性，则Servlet会接收`uname`属性值，并将其放入`session`域中的`username`对象中，之后，标签处理类的`doTag()`方法再根据`session`域中是否有`username`对象来判断标签体是否执行。








