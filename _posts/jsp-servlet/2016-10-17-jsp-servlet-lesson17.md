---

layout: post

title: 逆向工程

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍逆向工程。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

在MyBatis的开发过程中，数据库表、实体类、SQL映射文件以及动态代理接口四者之间有着非常密切的关系。

一般的开发流程是：先设计并创建数据库表（如学生表），再根据数据库表创建对应的实体类（如**Student.java**），之后再编写SQL映射文件（如**studentMapper.xml**），最后再根据SQL映射文件编写动态代理接口（如**IStudentMapper.java**）。

除此之外，我们还可以只设计并创建数据库表，然后利用MyBatis提供的工具来自动生成其他三个（实体类、SQL映射文件和动态代理接口），以下是具体的步骤：

# 17.1 准备工作 #

准备数据库：学生表(student)、学生证表(studentCard)、班级表(studentClass)，如图

![](http://i.imgur.com/kY4IvVF.png)

*图17-01*
学生表(student)

![](http://i.imgur.com/himo2Ud.png)

*图17-02*
学生证表(studentCard)

![](http://i.imgur.com/weSYl00.jpg)

*图17-03*
班级表(studentClass)

创建JAVA项目：**MyBatis_Generator**


# 17.2 下载工具 #

要想根据数据表生成实体类及SQL映射文件，必须先下载MyBatis官方提供的工具：mybatis-generator-core-1.3.2-bundle.zip。下载解压后，可以得到以下目录：

![](http://i.imgur.com/DMBaKBL.png)

*图17-04*


将`lib`目录中的mybatis-generator-core-1.3.2.jar，以及数据库驱动ojdbc.jar和MyBatis所依赖的mybatis-3.3.1.jar加入项目的构建目录(Build Path)，如图，

![](http://i.imgur.com/ef2SFan.png)

*图17-05*

读者还可以打开docs中的index.html来详细学习自动生成的相关知识。

# 17.3 创建并编写配置文件 #

在`src`下创建并编写配置文件，如下，

**generator.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
  PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
  "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
	<context id="DB2Tables" targetRuntime="MyBatis3">
		<commentGenerator>
			<!--
				suppressAllComments属性值：
					true:自动生成实体类、SQL映射文件时没有注释
					true:自动生成实体类、SQL映射文件，并附有注释
			  -->
			<property name="suppressAllComments" value="true" />
		</commentGenerator>

		<!-- 数据库连接信息 -->
		<jdbcConnection driverClass="oracle.jdbc.OracleDriver"
			connectionURL="jdbc:oracle:thin:@127.0.0.1:1521:XE" 
userId="system" 	password="sa">
		</jdbcConnection>

		<!-- 
			forceBigDecimals属性值： 
				true:把数据表中的DECIMAL和NUMERIC类型，
解析为JAVA代码中的java.math.BigDecimal类型 
				false(默认):把数据表中的DECIMAL和NUMERIC类型，
解析为解析为JAVA代码中的Integer类型 
		-->
		<javaTypeResolver>
			<property name="forceBigDecimals" value="false" />
		</javaTypeResolver>

		<!-- 
			targetProject属性值:实体类的生成位置  
			targetPackage属性值：实体类所在包的路径
		-->
		<javaModelGenerator targetPackage="org.lanqiao.entity"
	                            targetProject=".\src">
			<!-- trimStrings属性值：
				true：对数据库的查询结果进行trim操作
				false(默认)：不进行trim操作
			  -->
			<property name="trimStrings" value="true" />
		</javaModelGenerator>

		<!-- 
			targetProject属性值:SQL映射文件的生成位置  
			targetPackage属性值：SQL映射文件所在包的路径
		-->
		<sqlMapGenerator targetPackage="org.lanqiao.mapper" 
targetProject=".\src">
		</sqlMapGenerator>

		<!-- 生成动态代理的接口  -->
		<javaClientGenerator type="XMLMAPPER"	targetPackage="org.lanqiao.mapper" targetProject=".\src">
		</javaClientGenerator>

		<!-- 指定数据库表  -->
		<table tableName="Student">	</table>
		<table tableName="studentCard">	</table>
		<table tableName="studentClass"> </table>
	</context>
</generatorConfiguration>
```

生成工具mybatis-generator-core-1.3.2.jar可以根据以上的配置细节，来生成实体类、SQL映射文件以及动态代理接口。

# 17.4 编写生成代码 #

有了自动生成需要的配置文件generator.xml，就可以编写自动生成的相关代码，如下：

**MyBatis_Generator.java**

```
…
import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.internal.DefaultShellCallback;
public class MyBatis_Generator
{
	public static void main(String[] args) throws Exception
	{
		File f = new File("src/generator.xml");
		List<String> warnings = new ArrayList<String>();
		ConfigurationParser cp 
= new ConfigurationParser(warnings);
		Configuration config = cp.parseConfiguration(f);
		DefaultShellCallback callBack = new DefaultShellCallback(true);
		MyBatisGenerator generator = new MyBatisGenerator(config, callBack, warnings);
		generator.generate(null);
	}
}
```

执行MyBatis_Generator.java之前的项目截图:

![](http://i.imgur.com/p7DQx0k.png)

*图17-06*

执行MyBatis_Generator.java并刷新项目，可得到以下项目截图:

![](http://i.imgur.com/qMxZEnx.png)

*图17-07*

即只需要导入相关JAR文件，并编写generator.xml配置文件以及生成代码MyBatis_Generator.java，就可以根据数据表生成实体类、SQL映射文件以及动态代理接口。`org.lanqiao.entity`包中的`“XxxExample.java”`是一些操作的示例代码。