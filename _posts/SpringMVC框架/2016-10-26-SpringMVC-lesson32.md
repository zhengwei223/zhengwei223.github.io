---

layout: post

title: SSM整合

category: SpringMVC框架

tags: SpringMVC

description: 本章将系统SSM整合（Spring+SpringMVC+MyBatis）。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE SpringMVC

---


在“Spring整合MyBatis”一章的基础上，按以下步骤整合：

#### ①准备工作 ####

**a、新增以下文件(控制器类和业务逻辑层)**

以“根据学号，查询学生信息”为例，相关代码如下，

**控制器StudentHandler.java**

```
package org.lanqiao.handler;
//import…
@Controller
public class StudentHandler
{
	private IStudentService studentService  ; 
	public IStudentService getStudentService()
	{
		return studentService;
	}
	public void setStudentService(IStudentService studentService)
	{
		this.studentService = studentService;
	}
    //根据学号，查询学生信息
	@RequestMapping("/queryStudent/{stuNo}")
	public ModelAndView queryStudentByNo(@PathVariable("stuNo")
Integer stuNo){
		
		Student student = studentService.queryStudentByNo(stuNo);
		ModelAndView mv = new ModelAndView("success");
		mv.addObject(student);
		return mv;	
}
}
```

**业务逻辑层接口IStudentService.java**

```
package org.lanqiao.service;
import org.lanqiao.entity.Student;
public interface IStudentService
{
	public abstract Student queryStudentByNo(int stuNo);
}
```

**业务逻辑层实现类StudentServiceImpl.java**

```
package org.lanqiao.service.impl;
//import…
public class StudentServiceImpl implements IStudentService
{
	private IStudentDao studentDao ;
	public IStudentDao getStudentDao()
	{
		return studentDao;
	}

	public void setStudentDao(IStudentDao studentDao)
	{
		this.studentDao = studentDao;
	}

	@Override
	public Student queryStudentByNo(int stuNo)
	{
		Student student = studentDao.queryStudentByNo(stuNo);
		return student;
	}
}
```

**b、额外加入以下`JAR`文件**

<table>
   <tr>
      <td>classmate-1.0.0.jar</td>
      <td>commons-fileupload-1.3.1.jar</td>
      <td>commons-io-2.4.jar</td>
   </tr>
   <tr>
      <td>javax.el-2.2.4.jar</td>
      <td>hibernate-validator-5.1.3.Final.jar</td>
      <td>hibernate-validator-cdi-5.1.3.Final.jar</td>
   </tr>
   <tr>
      <td>javax.el-api-2.2.4.jar</td>
      <td>validation-api-1.1.0.Final.jar</td>
      <td>jboss-logging-3.1.3.GA.jar</td>
   </tr>
   <tr>
      <td>jstl.jar</td>
      <td>spring-webmvc-4.2.5.RELEASE.jar</td>
      <td>standard.jar</td>
   </tr>
   <tr>
      <td colspan="3">hibernate-validator-annotation-processor-5.1.3.Final.jar</td>
   </tr>
</table>

#### ②在web.xml集成spring和springMVC ####

为了能在Web应用中使用Spring和SpringMVC，需要在**web.xml**中做如下配置：

**web.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app …>
 <display-name>SSMDemo</display-name>
  <welcome-file-list>
    <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>
  
  <!-- 集成Spring -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>classpath:applicationContext.xml</param-value>
	</context-param>

	<listener>
		<listener-class>
org.springframework.web.context.ContextLoaderListener
</listener-class>
	</listener>
	
	 <!-- 集成SpringMVC -->
	<servlet>
		<servlet-name>springDispatcherServlet</servlet-name>
		<servlet-class>
org.springframework.web.servlet.DispatcherServlet
</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springmvc.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>springDispatcherServlet</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
	
</web-app>
```

#### ③创建并编写springMVC配置文件 ####

在SpringMVC配置文件中配置扫描包、视图解析器和控制器Handler，如下

**springmvc.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	<!-- 配置需要扫描的包 ，即配置使用了SpringMVC注解的包。例如，StudentHandler类使用了SpringMVC提供的@RequestMapping注解，则就需要把StudentHandler类的所在包org.lanqiao.handler 加入扫描-->
	<context:component-scan base-package="org.lanqiao.handler">
	</context:component-scan>

	<!-- 配置试图解析器：把请求处理类的返回值，加工成最终的视图路径-->
	<bean class="org.springframework.web.servlet.view
.InternalResourceViewResolver">
		<property name="prefix" value="/views/"></property>
		<property name="suffix" value=".jsp"></property>
	</bean>
	
	<!-- 给控制器Handler注入业务逻辑层对象 -->
	<bean id="StudentHandler" class="org.lanqiao.handler
.StudentHandler" >
		<property name="studentService" ref="studentService">
</property>
	</bean>
	
</beans>
```

SpringMVC主要是实现了控制器的功能，而在三层架构中控制器主要是用来调用业务逻辑层，因此需要在springMVC配置文件中给控制器Handler注入业务逻辑层对象。

#### ④配置Spring配置文件 ####

在Spring配置文件中，配置数据库连接池、`sqlSessionFactory`、`dao`、`service`，如下

**applicationContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	<!-- 加载数据库属性文件 -->
	<bean id="config"
		class="org.springframework.beans.factory
.config.PreferencesPlaceholderConfigurer">
		<property name="locations">
			<list>
				<value>classpath:db.properties</value>
			</list>
		</property>
	</bean>

	<!-- 配置数据库连接池(使用DBCP连接池) -->
	<bean id="dataSource" class="org.apache.commons.dbcp
.BasicDataSource"
		destroy-method="close">
		<property name="driverClassName" value="${driver}" />
		<property name="url" value="${url}" />
		<property name="username" value="${username}" />
		<property name="password" value="${password}" />
		<property name="maxActive" value="10" />
		<property name="maxIdle" value="5" />
	</bean>

	<!-- 将MyBatis使用的sqlsessionfactory,交给Spring来管理 -->
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
		<!--数据库连接池 -->
		<property name="dataSource" ref="dataSource" />
		<!--加载mybatis的全局配置文件 -->
		<property name="configLocation" value="classpath:conf.xml" />
	</bean>


	<!-- 配置DAO层:为StudentDaoImpl注入SqlSessionFactory对象 -->
	<bean id="studentDao" class="org.lanqiao.dao.impl.StudentDaoImpl">
		<property name="sqlSessionFactory" ref="sqlSessionFactory">
		</property>
	</bean>

	<bean id="studentService" class="org.lanqiao.service.impl.StudentServiceImpl">
		<property name="studentDao" ref="studentDao"></property>
	</bean>
</beans>
```

#### ⑤测试 ####

最后，通过前段JSP页面进行测试，如下

**index.jsp**

```
…
<a href="queryStudent/31">queryStudent</a><br/>
…
```

**views/success.jsp**

```
…
${student.stuNo}、${student.stuName}、
${student.stuAge}、${student.graName}
…
```

单击**index.jsp**中的超链接，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/springmvc-zq/34.1.png)

*图34-01*