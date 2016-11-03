---


layout: post


title: Spring整合MyBatis


category: Spring框架


tags: Spring框架


description: 本章将对Spring整合MyBatis做系统介绍。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE Spring框架


---

Spring整合MyBatis，主要是通过把MyBatis的`sqlsessionfactory`交给Spring来管理。以下是详细的整合步骤：

**(1) 准备工作**

**a.导入Spring整合MyBatis所需要的JAR包**

包括MyBatis的JAR、Spring相关的JAR、以及数据库相关的JAR，如下

<table>
   <tr>
      <td>mybatis-spring.jar</td>
      <td>spring-tx.jar</td>
      <td>spring-jdbc.jar</td>
      <td>spring-expression.jar</td>
   </tr>
   <tr>
      <td>spring-context-support.jar</td>
      <td>spring-core.jar</td>
      <td>spring-context.jar</td>
      <td>spring-beans.jar</td>
   </tr>
   <tr>
      <td>spring-aop.jar</td>
      <td>commons-logging.jar</td>
      <td>commons-dbcp.jar</td>
      <td>ojdbc6.jar</td>
   </tr>
   <tr>
      <td>spring-web.jar</td>
      <td>mybatis.jar</td>
      <td>log4j.jar</td>
      <td>commons-pool.jar</td>
   </tr>
</table>

**（以上JAR文件均省略了版本号）**

**b.准备实体类和数据表**

**实体类：Student.java**


```
public class Student 
{
	private int stuNo;
	private String stuName;
	private int stuAge;
	private String graName;
   //getter、setter
    	@Override
	public String toString()
	{
		return "学号:"+this.stuNo+"\t姓名:"+this.stuName
+"\t年龄:"+this.stuAge+"\t年级:"+this.graName;
	}
}
```


**数据表：student**

![](http://i.imgur.com/Vrgbp2j.png)

*图23-01*

**(2)创建MyBatis配置文件**

在`src`下创建MyBatis配置文件

**conf.xml**


```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

</configuration>
```

**(3)创建Spring配置文件**

在`src`下创建Spring配置文件

**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
	
	<!-- 加载数据库属性文件 -->
	<bean id="config" class="org.springframework.beans.
factory.config.PreferencesPlaceholderConfigurer">
		<property name="locations">
			<list>
				<value>classpath:db.properties</value>
			</list>
		</property>
	</bean>
	
	<!-- 配置数据库连接池(使用DBCP连接池) -->
	<bean id="dataSource" 
class="org.apache.commons.dbcp.BasicDataSource" 
destroy-method="close">
	<property name="driverClassName" value="${driver}"/>
			<property name="url" value="${url}"/>
			<property name="username" value="${username}"/>
			<property name="password" value="${password}"/>
			<property name="maxActive" value="10"/>
			<property name="maxIdle" value="5"/>
	</bean>	
		<!-- 将MyBatis使用的sqlsessionfactory,交给Spring来管理 -->
		<bean id="sqlSessionFactory" 
class="org.mybatis.spring.SqlSessionFactoryBean">
			<!--数据库连接池 -->
			<property name="dataSource" ref="dataSource"/>
			<!--加载mybatis的全局配置文件 -->
			<property name="configLocation" 
value="classpath:conf.xml"/>
		</bean>
</beans>
```


在Spring配置文件中，配置了DBCP连接池和MyBatis需要使用的`sqlsessionfactory`。


Spring配置文件中用到的`db.properties`：

```
driver=oracle.jdbc.OracleDriver
url=jdbc:oracle:thin:@127.0.0.1:1521:XE
username=system
password=sa
```

**(4)创建Mapper动态代理对象**

如果有了`Mapper`动态代理对象(如`studentMapper`)，就可以直接进行MyBatis操作了，例如`studentMapper.queryStudentByNo(31)`。


使用Spring整合MyBatis时，共有三种方法来创建`Mapper`动态代理对象：`DAO`层实现类继承`SqlSessionDaoSupport`、使用`MapperFactoryBean`、使用`mapper`扫描器。

**①`DAO`层实现类继承`SqlSessionDaoSupport`**


先编写MyBatis的SQL映射文件：


**studentMapper.xml**

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.lanqiao.dao.IStudentDao">
	 <!-- 根据学号，查询一个学生-->
 	<select id="queryStudentByNo" parameterType="int" 
resultType="org.lanqiao.entity.Student" > 
		select stuNo,stuName,stuAge,graName from student 
where stuNo=#{stuNo}
	</select> 
</mapper>
```

再将SQL映射文件加入MyBatis配置文件中：


**conf.xml**

```
…
<mappers>
	<mapper resource="org/lanqiao/mapper/studentMapper.xml" />
</mappers>
…
```

MyBatis是用来开发三层中的“DAO层”，因此需要建立`DAO`层接口及实现类。`DAO`层的接口就可以用来充当`Mapper`动态代理接口，如下：

`DAO`层接口（也是`Mapper`动态代理接口）：


**IStudentDao.java**


```
package org.lanqiao.dao;
import org.lanqiao.entity.Student;
public interface IStudentDao
{
	public abstract Student queryStudentByNo(int stuNo);
}
```

`DAO`层实现类：

**StudentDaoImpl.java**


```
package org.lanqiao.dao.impl;
import org.apache.ibatis.session.SqlSession;
import org.lanqiao.dao.IStudentDao;
import org.lanqiao.entity.Student;
import org.mybatis.spring.support.SqlSessionDaoSupport;
public class StudentDaoImpl extends SqlSessionDaoSupport
 implements IStudentDao
{
	
	@Override
	public Student queryStudentByNo(int stuNo)
	{
		SqlSession session = this.getSqlSession();
		IStudentDao studentMapper 
= session.getMapper(IStudentDao.class);
		Student student = studentMapper.queryStudentByNo(stuNo);
		return student;
	}
}
```

可以发现，`StudentDaoImpl`不仅实现了`IStudentDao`接口，还继承了`SqlSessionDaoSupport`类。这是因为`SqlSessionDaoSupport`类中包含了以下属性或方法，可以用来为`DAO`层的实现类（如`StudentDaoImpl`）提供`SqlSession`对象：


<table>
   <tr>
      <td>属性/方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>private SqlSession sqlSession; </td>
      <td>-</td>
   </tr>
   <tr>
      <td>public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory)</td>
      <td>设置SqlSessionFactory</td>
   </tr>
   <tr>
      <td>public SqlSession getSqlSession()</td>
      <td>获取SqlSession对象</td>
   </tr>
</table>

以下就在SpringIOC容器中，为`DAO`层注入`sqlSessionFactory`对象：


**applicationContext.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
        …
	<bean id="sqlSessionFactory" 
class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource"/>
		<property name="configLocation" 
value="classpath:conf.xml"/>
	</bean>

	<!-- 配置DAO层:为StudentDaoImpl注入SqlSessionFactory对象 -->
	<bean id="studentDao" 
class="org.lanqiao.dao.impl.StudentDaoImpl">
		<property name="sqlSessionFactory" 
ref="sqlSessionFactory">
</property>
	</bean>
</beans>
```


至此就完成了第一种方式的整合，

测试类**Test.java**


```
//import…
public class Test
{
	public static void main(String[] args)
	{
		ApplicationContext context 
= new ClassPathXmlApplicationContext("applicationContext.xml");
		IStudentDao studentDao 
= (IStudentDao)context.getBean("studentDao");
		Student student = studentDao.queryStudentByNo(31);
		System.out.println(student);
	}
}
```

执行测试类，运行结果：

![](http://i.imgur.com/Rru9zCQ.png)


*图23-02*


**说明：**

MyBatis和Spring整合以后，MyBatis的配置文件**conf.xml**主要用来指定SQL映射文件的路径。除了先创建**conf.xml**，再将**conf.xml**的路径配置到`SqlSessionFactoryBean`的`configLocation`属性（如`property name="configLocation" value="classpath:conf.xml"/>`）以外，还可以使用`SqlSessionFactoryBean`的`mapperLocations`属性来省略**conf.xml**的创建。也就是说，在没有MyBatis配置文件**conf.xml**的情况下，可以直接在Spring配置文件**applicationContext.xml**中使用以下配置来指定SQL映射文件的路径，


```
<bean id="sqlSessionFactory" 
class="org.mybatis.spring.SqlSessionFactoryBean">
			<!--数据库连接池 -->
			<property name="dataSource" ref="dataSource"/>
			<!-- 无需指定MyBatis配置文件conf.xml的路径 -->
			<!-- 自动扫描mapping.xml文件 -->
			<property name="mapperLocations" 
value="classpath:org/lanqiao/mapper/*.xml">
</property>
		</bean>
```


**②使用`MapperFactoryBean`**

在“①`DAO`层实现类继承`SqlSessionDaoSupport`”的基础上，使用`MapperFactoryBean`可以省略`DAO`层实现类（如**StudentDaoImpl.java**）的创建和编写。

具体如下，
在`mybatis-spring-1.2.3.jar`中，存在一个`MapperFactoryBean`类，可以通过给此类配置`mapperInterface`和`sqlSessionFactory`属性，来产生`mapperInterface`属性所指定接口的`Mapper`动态代理对象。如下，

Spring配置文件：**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans  …>
	<bean id="sqlSessionFactory"  
class="org.mybatis.spring.SqlSessionFactoryBean" >
			…
	</bean>
	
	<bean id="studentDao"
 class="org.mybatis.spring.mapper.MapperFactoryBean">
		<property name="mapperInterface" 
value="org.lanqiao.dao.IStudentDao">
</property>	
		<property name="sqlSessionFactory" 
ref="sqlSessionFactory">
</property>
	</bean>
</beans>
```


即给`mapperInterface`属性配置了动态代理的接口(即`DAO`层接口`IStudentDao`)，给`sqlSessionFactory`属性配置了`SqlSessionFactory`对象。此时，`MapperFactoryBean` 就会产生一个`IStudentDao`接口对应的动态代理对象，也就无需再去创建`DAO`实现类了。

也就是说，有了以上配置以后，就可以删除掉之前编写的`DAO`实现类**StudentDaoImpl.java**。

**③使用mapper扫描器**

此种方式，实际上是对“②使用`MapperFactoryBean`”方式的优化。使用`MapperFactoryBean`需要在Spring配置文件中，给每一个`DAO`对象都配置一个`MapperFactoryBean`，如

```
…
<bean id="studentDao"
 class="org.mybatis.spring.mapper.MapperFactoryBean">
		…
</bean>
…
```

可见，如果有多个`DAO`对象，就需要多次配置`MapperFactoryBean`，这样就会使得Spring配置文件变多，带来一定的编码量。

对于这一点，`mybatis-spring-1.2.3.jar`提供了一个`MapperScannerConfigurer`类，用来帮我们将`basePackage`属性所指定的包中的`DAO`接口，根据SQL映射文件，一次性全部生成各`DAO`层接口对应的`Mapper`动态代理对象，如下，


Spring配置文件：**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans …>
	<bean id="sqlSessionFactory" 
class="org.mybatis.spring.SqlSessionFactoryBean">
		…
	</bean>
<!-- 通过Mapper扫描器MapperScannerConfigurer，批量将 
basePackage指定包中的DAO接口全部生成Mapper动态代理对象 -->
	<bean class="org.mybatis.spring.mapper.
MapperScannerConfigurer">
		<property name="basePackage" 
value="org.lanqiao.dao">
</property>
		<property name="sqlSessionFactoryBeanName" 
value="sqlSessionFactory">
</property>
	</bean>	 
</beans>
```

通过`basePackage`属性指定`DAO`接口所在包，并批量将其生成为`Mapper`动态代理对象，并且`Mapper`动态代理对象在Spring中的id值就是该`DAO`接口（**IStudentDao.java**）的文件名（如`id=” IStudentDao” `）。如果需要在`basePackage`中指定多个包，则可以在多个包之间用逗号隔开，如下，


```
<property name="basePackage" 
value="org.lanqiao.mapper,其他包">
</property>
```

测试类**Test.java**

```
//import…
public class Test
{
	public static void main(String[] args)
	{
		ApplicationContext context 
= new ClassPathXmlApplicationContext("applicationContext.xml");
       //DAO接口的动态代理对象在SpringIOC中的id值，就是接口的文件名
		IStudentDao studentDao 
= (IStudentDao)context.getBean("IStudentDao");
		Student student = studentDao.queryStudentByNo(31);
		System.out.println(student);
	}
}
```

执行测试类，运行结果：

![](http://i.imgur.com/CD6Tw37.jpg)

*图23-03*

可见，使用mapper扫描器的方式进行Spring与MyBatis的整合时，就不用再使用`<bean id="studentDao"…>`这样显示的方式在SpringIOC中显示的配置`DAO`层了。

