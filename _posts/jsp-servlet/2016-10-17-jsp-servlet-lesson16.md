---

layout: post

title: 查询缓存

category: JSP-Servlet教程

tags: JSP Servlet

description: 查询缓存可以大大的提高查询效率。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

>**本章简介**

查询缓存，就是在内存或外存上建立一个存储空间，用来保存上次查询结果，下次再进行同样的查询时，就可以直接从内存或外存中读取，而不用再从数据库中查找，可以大大的提高查询效率。

# 16.1 一级缓存 #

MyBatis中常用的查询缓存分为一级缓存和二级缓存。

一级缓存的范围是一个`SqlSession`，在同一个`SqlSession`中多次执行相同的查询SQL语句时，第一次执行完毕会就将数据库的查询结果写到缓存（内存）中，以后如果再次执行该查询时就会直接从缓存中读取查询结果。但是，如果执行了增删改时需要使用的`commit()`方法，则`SqlSession`一级缓存就会被清理（清理表示将缓存中的数据全部写入数据库，从而使缓存变空），下次再次查询时（无论是否第一次查询），都会重新从数据库里查询，并将查询结果写入`SqlSession`，如图，

![](http://i.imgur.com/GXJblMj.gif)

*图16-01*

当一个`SqlSession`关闭后，该`SqlSession`中的一级缓存也就随之销毁。Mybatis默认开启一级缓存。

现在执行两次相同的查询操作，如下：

测试方法：**TestMyBatis.java**

```
public static void queryStudentByNoTwice() throws IOException
{
	…
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
	//第一次查询学号为32的学生
	Student student1 = studentMapper.queryStudentByNo(32);
	//第二次查询学号为32的学生，直接从缓存中获取
	Student student2 = studentMapper.queryStudentByNo(32);
	session.close();
}
```

执行时的日志：

![](http://i.imgur.com/7ng1QXT.png)

*图16-02*

可以发现，虽然测试方法中查询了两次学号为32的学生，但只发送了一次查询SQL，即第二次没有通过SQL查询数据库，而是直接从缓存中获取的查询结果。

现在，我们在两次查询中间添加一次增删改操作，并调用`commit()`方法，用来清理一级缓存，如下：

测试方法：**TestMyBatis.java**

```
public static void queryStudentByNoTwiceWithUpdate() throws IOException
{
	…
	SqlSession session = sessionFactory.openSession();
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
	//第一次查询学号为32的学生
	Student student1 = studentMapper.queryStudentByNo(32);
	//执行一次修改操作，并调用commit()方法，一级缓存被清理
	Student stu = new Student();
	stu.setStuNo(32);
	…
	studentMapper.updateStudentByNo(stu);
	session.commit();
	//第二次查询学号为32的学生，重新发送查询SQL
	Student student2 = studentMapper.queryStudentByNo(32);
	session.close();
}
```

虽然两次查询仍然都是查询学号为32的学生，但因为两次查询中间增加了修改需要的`commit()`方法，导致一级缓存被清理了，所以两次查询操作各自都发送了查询SQL，执行时的日志如下：

![](http://i.imgur.com/PSEz3Yw.jpg)

*图16-03*

# 16.2 二级缓存 #

Mybatis一级缓存的范围是同一个`SqlSession`内；而二级缓存则是可以被多个`SqlSession`共享的，范围是同一个`namespace`下SQL映射文件生成的动态代理`mapper`对象，例如我们使用的`studentMapper`对象。与一级缓存相同，当执行增删改时的`commit()`方法时，二级缓存也会被清理。

值得注意的是，如果两个不同的SQL映射文件有相同的`namespace`值，那么这两个`namespace`的SQL映射文件共用同一个`mapper`对象，如图，

![](http://i.imgur.com/h2uaLOI.gif)

*图16-04*

二级缓存中，只要是使用`namespace`相同的`mapper`对象，就只会在第一次查询时访问数据库并将结果写入二级缓存，以后再次查询时就可以直接从二级缓存中获取。

# 16.2.1 使用二级缓存 #

**(1)开启二级缓存**

MyBatis没有默认开启二级缓存，使用时需要在`setting`全局参数中开启，如下：

**conf.xml**

```
<configuration>
	<!-- 引用db.properties配置文件 -->
	<properties resource="db.properties" />
	<settings>
…
		<setting name="cacheEnabled" value="true"/>
	</settings>
    …
</configuration>
```

此外，还要在SQL映射文件中添加一行：  `<cache />` ，表示给此SQL映射文件的`mapper`动态代理对象开启二级缓存，如下：

**studentMapper.xml**

```
<mapper namespace="org.lanqiao.mapper.IStudentMapper">
	<cache />
	…
</mapper>
```

**(2)实现序列化**

二级缓存需要给实体类实现`java.io.Serializable`接口，以实现序列化和反序列化操作。注意，如果实体类有父类、或实体类的某个属性成员也是实体类对象类型的，则也都需要实现`java.io.Serializable`接口，如下，

**Student.java**

```
package org.lanqiao.entity;
import java.io.Serializable;
public class Student implements Serializable
{
	//学号
	private int stuNo;
	//姓名 
	private String stuName;
	//年龄
	private int stuAge;
	…
	//学生证
	private StudentCard card ;
	//setter、getter
}
```

`Student`类中的实体类属性成员`card`所属的实体类，也需要实现序列化接口：

**StudentCard.java**

```
package org.lanqiao.entity;
import java.io.Serializable;
public class StudentCard  implements Serializable
{
	//学生证号
	private int cardId;
	//学生证的相关信息
	private String cardInfo;
	//setter、getter
}
```

**(3)测试二级缓存**

前面讲了，二级缓存的范围是相同`namespace`生成的`mapper`对象下的所有`SqlSession`对象，现在我们进行以下测试：

省略SQL映射文件及动态代理接口。

**TestMyBatis.java**

```
public static void queryStudentByNoWithSecondCache() throws IOException
{
	…
	//创建第一个SqlSession对象
	SqlSession session1 = sessionFactory.openSession();
	IStudentMapper studentMapper1 = session1.getMapper(IStudentMapper.class);
	//第一次查询学号为32的学生
	Student student1 = studentMapper1.queryStudentByNo(32);
	session1.close();
	//创建第二个SqlSession对象
	SqlSession session2 = sessionFactory.openSession();
	IStudentMapper studentMapper2
 = session2.getMapper(IStudentMapper.class);
	//第二次查询学号为32的学生
	Student student2 = studentMapper2.queryStudentByNo(32);
	session2.close();
}
```

运行时的日志：

![](http://i.imgur.com/z2MYGeR.png)

*图16-05*

通过日志可以发现，虽然两次查询是通过不同的`SqlSession`对象执行的，但这些`SqlSession`对象都是由同一个`namespace`的`mapper`对象生成的，因此这两个`SqlSession`可以共享二级缓存，即只需要在第一次向数据库发送SQL语句并将查询结果写入二级缓存，而第二次就可以直接从二级缓存中获取。

日志中的“0.0”和“0.5”表示缓存的命中率：第一次查询时，缓存中没有数据，所以命中率为0.0；第二次查询相同数据时，可以从缓存中查询到，所以命中率为0.5(一共查了两次，只有第二次命中，所以命中率为50%，即0.5)。

## 16.2.2 禁用二级缓存 ##

还可以给某一个具体的SQL标签设置成禁用二级缓存，如下：

SQL映射文件：**studentMapper.xml**

```
<select id="queryStudentByNo" parameterType="int" 
resultType="student" useCache="false"> 
	select stuNo,stuName,stuAge,graName from student 
where stuNo=#{stuNo}
</select>
```

再次执行测试方法`queryStudentByNoWithSecondCache()`时，日志如下：

![](http://i.imgur.com/hYXyuLk.png)

*图16-06*

可以发现，给`<select>`标签设置了`useCache="false"`，就可以禁用二级缓存，即发送了两次SQL语句。默认情况下，`useCache="true"`表示开启二级缓存。

## 16.2.2 清理二级缓存 ##

如果执行增删改的`commit()`方法，二级缓存也会随之被清理。例如，我们先将之前的`useCache`改回true，表示使用二级缓存，再进行如下测试：

测试方法：**TestMyBatis.java**

```
public static void queryStudentByNoWithSecondCacheAndUpdate() throws IOException
{
	…
    //使用第一个SqlSession执行查询
	SqlSession session1 = sessionFactory.openSession();
	IStudentMapper studentMapper1 
= session1.getMapper(IStudentMapper.class);
	Student student1 = studentMapper1.queryStudentByNo(32);
	session1.close();
	//执行更新方法，并调用commit()清理缓存
	SqlSession session_update = sessionFactory.openSession();
	IStudentMapper studentMapper 
= session_update.getMapper(IStudentMapper.class);
	Student stu = new Student();
	stu.setStuNo(32);
	…
	studentMapper.updateStudentByNo(stu);
	session_update.commit();
	//使用第二个SqlSession执行查询
	SqlSession session2 = sessionFactory.openSession();
	IStudentMapper studentMapper2
 = session2.getMapper(IStudentMapper.class);
	Student student2 = studentMapper2.queryStudentByNo(32);
	session2.close();
}
```

执行测试方法时的日志：

![](http://i.imgur.com/Uwsh2oI.png)

*图16-07*

从日志可以得知，因为在两次查询中间执行了`commit()`方法，二级缓存被清理，因此向数据库发送了两条查询SQL。

我们现在分析一下`commit()`清理缓存的原因：因为对数据库进行增删改操作，如果不及时清理缓存，就会丢失数据的实时性，可能导致数据的脏读。

例如，假设存在一条数据“姓名：张三，年龄：23岁，年级：初级”，第一次从数据库查询到此数据时，会将查询结果放入缓存，而如果再进行修改操作，假设修改为“姓名：张三，年龄：24岁，年级：中级”，此时，之前存放在缓存中的数据就已经与数据库中修改后的数据不一致，因此如果再从缓存中读数据就会导致脏读的发生。因此每次执行增删改操作并调用`commit()`方法时，就会及时的清理缓存，保证数据的实时性。

如果有特殊情况，想让执行`commit()`方法时并不清理缓存，可以在增删改的SQL标签里设置`flushCache="false"`，如下：

**studentMapper.xml**

```
<update id="updateStudentByNo"
 parameterType="student" flushCache="false">
	update student set stuName=#{stuName},stuAge=#{stuAge},
graName=#{graName}  where stuNo=#{stuNo}
</update>
```

`flushCache="false"`表示执行`commit()`时不会清理缓存。默认情况，`flushCache="true"`。

设置`flushCache="false"`后，再次执行之前的测试方法`queryStudentByNoWithSecondCacheAndUpdate()`，得到日志如下：

![](http://i.imgur.com/OfzESdz.png)

*图16-08*

虽然两次查询之间存在`commit()`方法，但因为使用`flushCache`属性禁止清理缓存，所以仍然只向数据库发送了一次SQL，第二次是直接从缓存中获取的数据。两次查询缓存的命中率分别为0.0和0.5。

# 16.3 整合第三方提供的二级缓存 #

MyBatis还可以整合Ehcache、OSCache、MEMcache等由第三方厂商提供的二级缓存。本书以使用较多的Ehcache进行讲解。

MyBatis提供了用于整合二级缓存的接口Cache以及默认的实现类`PerpetualCache.`，如图：

![](http://i.imgur.com/KDVDEQj.png)

*图16-09*

MyBatis整合Ehcache的具体步骤如下：

**(1)导入Ehcache相关JAR文件**

MyBatis整合Ehcache需要导入以下三个JAR文件：

<table>
   <tr>
      <td>Ehcache-core-2.6.8.jar</td>
      <td>mybatis-Ehcache-1.0.3.jar</td>
      <td>slf4j-api-1.7.5.jar</td>
   </tr>
</table>

**(2)创建并编写Ehcache配置文件**

在`src`下创建Ehcache配置文件Ehcache.xml，并进行以下配置：

**Ehcache.xml**

```
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
	<diskStore path="F:\Ehcache"/>
	<defaultCache
		maxElementsInMemory="1000"
		maxElementsOnDisk="1000000"
		eternal="false"
		overflowToDisk="false"
		timeToIdleSeconds="100"
		timeToLiveSeconds="100"
		diskExpiryThreadIntervalSeconds="120"
		memoryStoreEvictionPolicy="LRU">
	</defaultCache>
</ehcache>
```

Ehcache配置文件中的各元素/属性介绍如下：

<table>
   <tr>
      <td>元素/属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>maxElementsInMemory</td>
      <td>将缓存保存在内存中时，缓存中存放对象的最大数目</td>
   </tr>
   <tr>
      <td>maxElementsOnDisk</td>
      <td>将缓存保存在硬盘中时，缓存中存放对象的最大数目。</td>
   </tr>
   <tr>
      <td>eternal</td>
      <td>缓存中存放的对象，是否永远都不过期</td>
   </tr>
   <tr>
      <td>overflowToDisk</td>
      <td>当内存中存放的缓存数目超过最大值时，是否将多余的缓存对象缓存到硬盘上。</td>
   </tr>
   <tr>
      <td>timeToIdleSeconds</td>
      <td>当缓存在Ehcache中的数据前后两次访问的时间超过timeToIdleSeconds的属性值时，缓存的数据就会删除</td>
   </tr>
   <tr>
      <td>timeToLiveSeconds</td>
      <td>保存在缓存中的对象的生命周期</td>
   </tr>
   <tr>
      <td>diskExpiryThreadIntervalSeconds</td>
      <td>硬盘缓存的清理线程运行时间间隔，默认是120秒。每隔120秒，相应的线程会进行一次Ehcache缓存数据的清理工作。</td>
   </tr>
   <tr>
      <td>memoryStoreEvictionPolicy</td>
      <td>当内存中缓存对象达到最大数，如果有新的对象加入缓存时，移除已有缓存对象的策略。默认是LRU（最近最少使用），可选的还有LFU（最不常使用）和FIFO（先进先出）</td>
   </tr>
   <tr>
      <td>&lt;diskStore&gt;中的path属性</td>
      <td>当overflowToDisk为true，并且内存中存放的缓存数目超过maxElementsInMemory的值时，将多余的缓存对象存放在硬盘上的文件路径。</td>
   </tr>
</table>

**(3) 开启Ehcache**

前面提到过，在MyBatis中整合第三方的二级缓存，需要实现MyBatis提供的`Cache`接口。而Ehcache的JAR文件中，就有该接口的实现类，如图：

![](http://i.imgur.com/KlvgmSm.png)

*图16-10*

修改studentMapper.xml中的二级缓存配置，如下：

**studentMapper.xml**

```
<mapper namespace="org.lanqiao.mapper.IStudentMapper">
	<!-- 
		<cache/>
	 -->
	<cache type="org.mybatis.caches.ehcache.EhcacheCache">
		<property name="timeToIdleSeconds" value="3600"/>
		<property name="timeToLiveSeconds" value="3600"/>
		<!--同ehcache参数maxElementsInMemory -->
		<property name="maxEntriesLocalHeap" value="1000"/>
		<!--同ehcache参数maxElementsOnDisk -->
		<property name="maxEntriesLocalDisk" value="10000000"/>
		<property name="memoryStoreEvictionPolicy" value="LRU"/>
	</cache>
    …
</mapper>
```

可以发现，我们还可以在具体的SQL映射文件中配置EHCache的参数，用来覆盖ehcache.xml中的配置。

**(4) 测试Ehcache**

再次执行重复查询同一对象的方法`queryStudentByNoWithSecondCache()`，得到如下日志：

![](http://i.imgur.com/caiNymj.png)

*图16-11*

可知，两次相同的查询操作只发送了一条SQL语句，即Ehcache二级缓存确实得到了使用。


# 16.4 练习题 #

1.MyBatis中支持几级缓存？

2.如何使用MyBatis的二级缓存？

3.MyBatis如何整合ehcache?









