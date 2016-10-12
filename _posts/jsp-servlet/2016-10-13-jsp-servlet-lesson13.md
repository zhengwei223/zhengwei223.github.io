---

layout: post

title: MyBatis配置文件深入

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将介绍MyBatis配置文件。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

# 13.1 properties属性 #

我们之前是把数据库信息，直接写在MyBatis配置文件conf.xml中，如下，

```
…
<dataSource type="POOLED">
		<property name="driver" value="oracle.jdbc.OracleDriver" />
		<property name="url" 
value="jdbc:oracle:thin:@127.0.0.1:1521:XE" />
		<property name="username" value="system" />
		<property name="password" value="sa" />
</dataSource>
…
```

为了方便的查阅和维护数据库信息，我们可以把数据库信息单独写在一个属性文件中，以后需要使用时再直接引用即可。例如，先在`src`下新建一个properties文件，如图，

![](http://i.imgur.com/H0GVrOe.png)


*图13-01*

然后将数据库信息以`“key=value”`的形式，写在该属性文件中，如下，

db.properties

```
driver=oracle.jdbc.OracleDriver
url=jdbc:oracle:thin:@127.0.0.1:1521:XE
username=system
password=sa
```

最后，再在配置文件中，通过`<properties>`标签引入该属性文件，并以形如EL的方式引用属性值，如下，

conf.xml

```
…
<configuration>
    <!-- 引用db.properties配置文件 -->
	<properties resource="db.properties"/>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
			<!-- 配置数据库连接信息 -->
			<dataSource type="POOLED">
                 <!-- value属性值：引用db.properties配置文件中配置的值 -->
				<property name="driver" value="${driver}" />
				<property name="url" value="${url}" />
				<property name="username" value="${username}" />
				<property name="password" value="${password}" />
			</dataSource>
		</environment>
	</environments>
	…
</configuration>
```

# 13.2 settings全局参数配置 #

`<configuration>`标签下有一个`<settings>`子标签，可以用来设置mybatis框架的运行参数，比如设置二级缓存、延迟加载等。修改这些配置，会影响到MyBatis整体的运行行为，因此需要谨慎操作。常见的配置参数介绍如下表，

<table>
   <tr>
      <td>参数</td>
      <td>简介</td>
      <td>有效值</td>
   </tr>
   <tr>
      <td>cacheEnabled</td>
      <td>在全局范围内，启用或禁用缓存</td>
      <td>true（默认）、false</td>
   </tr>
   <tr>
      <td>lazyLoadingEnabled</td>
      <td>在全局范围内启用或禁用延迟加载。当禁用时，所有相关联的对象都将即使加载（热加载）。</td>
      <td>true（默认）、false</td>
   </tr>
   <tr>
      <td>aggressiveLazyLoading</td>
      <td>启用时，有延迟加载属性的对象，在被调用时将会完全加载所有属性（立即加载）。否则，每一个属性都将按需加载（即延迟加载）。</td>
      <td>true（默认）、false</td>
   </tr>
   <tr>
      <td>multipleResultSetsEnabled</td>
      <td>允许（或禁止）从一个单独的语句中返回多种结果集（需要驱动程序的支持）</td>
      <td>true（默认）、false</td>
   </tr>
   <tr>
      <td>autoMappingBehavior</td>
      <td>指定数据表字段和对象属性的映射方式。  NONE：禁止自动映射，只允许手工配置的映射。   PARTIAL：只会自动映射简单的、没有嵌套的结果。   FULL：自动映射任何结果（包含嵌套等）。</td>
      <td>NONE、PARTIAL（默认）、FULL</td>
   </tr>
   <tr>
      <td>defaultExecutorType</td>
      <td>指定默认的执行器。  SIMPLE：普通的执行器。  REUSE：可以重复使用prepared statements语句。  BATCH：可以重复执行语句和批量更新。 </td>
      <td>SIMPLE（默认）、REUSE、BATCH</td>
   </tr>
   <tr>
      <td>defaultStatementTimeout</td>
      <td>设置驱动器等待数据库回应的最长时间</td>
      <td>以秒为单位的，任意正整数。无默认值</td>
   </tr>
   <tr>
      <td>safeRowBoundsEnabled</td>
      <td>允许（或禁止）使用嵌套的语句</td>
      <td>true、false（默认）</td>
   </tr>
   <tr>
      <td>mapUnderscoreToCamelCase</td>
      <td>当在数据表中遇到有下划线的字段时，自动映射到相应驼峰式形式的Java属性名。例如，会自动将数据表中的stu_no字段，映射到POJO类的stuNo属性。</td>
      <td>true、false（默认）</td>
   </tr>
   <tr>
      <td>lazyLoadTriggerMethods</td>
      <td>指定触发延迟加载的对象的方法</td>
      <td>equals、clone、hashCode、toString</td>
   </tr>
</table>

以下，是在MyBatis配置文件conf.xml中设置`settings`的示例代码：

conf.xml

```
…
<configuration>
	<properties resource="db.properties"/>
	<settings>
		<setting name="cacheEnabled" value="true"/>
		<setting name="defaultStatementTimeout" value="25"/>
		<setting name="mapUnderscoreToCamelCase" value="false"/>
		<setting name="localCacheScope" value="SESSION"/>
		<setting name="lazyLoadTriggerMethods" 
value="equals,clone,hashCode,toString"/>
         …
	</settings>
	…
</configuration>
```

# 13.3 为实体类自定义别名 #

之前在SQL映射文件中，如果`parameterType`或`resultType`为实体类的对象类型，我们可以通过全类名的形式指定的（即“包名+类名”）。此外，我们还可以在MyBatis配置文件conf.xml中为实体类设置别名，然后再在SQL映射文件中使用该别名。

例如，我们之前在第一个MyBatis示例中，SQL映射文件中的`resultType`属性值，就是通过全类名指定的，如下

org/lanqiao/mapper/studentMapper.xml

```
…
<select id="queryStudentByNo" parameterType="int"
		resultType="org.lanqiao.entity.Student">
		select * from student where stuNo=#{stuNo}
</select>
…
```

下面再通过定义别名的方式来指定`resultType`的值。

## 13.3.1 单个别名定义 ##

(1)在MyBatis配置文件中，为实体类定义别名

conf.xml

```
<configuration>
    	<properties resource="db.properties"/>
	<settings>… </settings>
	
    <!--为实体类，定义别名 -->
	<typeAliases>
		<typeAlias type="org.lanqiao.entity.Student" alias="student"/>
        	<typeAlias type="类型A" alias="别名a"/>
        <typeAlias type="类型B" alias="别名b"/>
          …
	</typeAliases>
	…
</configuration>
```

以上，就给“`org.lanqiao.entity.Student`”类型定义了别名“`student`（不分区大小写）”。以后任何“`org.lanqiao.entity.Student`”出现的地方，都可以用“`student`、`Student`、`sTUdent`、或`STUDENT`等”来替代。

 (2) 在SQL映射文件中引用别名

org/lanqiao/mapper/studentMapper.xml

```
…
<select id="queryStudentByNo" parameterType="int"  resultType="student">
	select * from student where stuNo=#{stuNo}
</select>
…
```

## 13.3.2 批量定义别名 ##

