---

layout: post

title: 关联查询

category: MyBatis框架

tags: MyBatis

description: 使用MyBatis可以方便的实现一对一、一对多、多对多等的关联查询。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE MyBatis

---

# 17.1 一对一查询 #

一个学生对应于一个学生证，反过来一个学生证也只能对应于一个学生。所以学生和学生证的关系是“一对一”。

之前已经存在学生表，现在再创建一个学生证表：

**学生证表studentCard**

![](http://i.imgur.com/s4BULDq.png)

*图17-01*

并且在学生表中增加一个表示学生证的外键，用于将学生表和学生证表关联起来，如下：

![](http://i.imgur.com/udaXFl3.png)

*图17-02*

## 17.1.1 使用扩展类实现一对一查询 ##

此种方式的本质，就是将学生和学生证的所有属性放到一个类中，然后通过SQL内连接语句查询。为了同时拥有学生和学生证两个类的属性，我们可以创建一个学生的扩展类（即继承于学生的类）：


**StudentAndCardBusiness.java**

```
public class StudentAndCardBusiness extends Student
{
		//学生证号
		private int cardId;
		//学生证的相关信息
		private String cardInfo;
		//setter、getter
}
```

该扩展类中拥有学生证的属性（`cardId`、`cardInfo`），而且又继承于学生类，所以同时拥有学生和学生证的所有属性。因此，可以将学生表和学生证表的关联查询结果，直接映射到扩展类`StudentAndCardBusiness`，如下：

SQL映射文件：

**studentMapper.xml**

```
<select id="queryStudentAndCardBusinessByStuNo" 
parameterType="int" resultType="StudentAndCardBusiness"> 
		select s*,c.* from student s 
		         inner join studentCard c  on  s.cardId = c.cardId
		         where s.stuNo = #{stuNO} 
</select>
```

动态代理接口：

**IStudentMapper.java**

```
	public interface IStudentMapper
{
  …
StudentAndCardBusiness queryStudentAndCardBusinessByStuNo(int 
stuNo);
}
```

测试方法：

**TestMyBatis.java**

```
public static void queryStudentAndCardBusinessByStuNo() 
throws IOException
	{
	    …
		SqlSession session = sessionFactory.openSession();
		IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
		StudentAndCardBusiness studentAndCard 
= studentMapper.queryStudentAndCardBusinessByStuNo(32);
		…
	}
```

以上就可以通过内连接的SQL语句，将`stuNo`为32的学生以及该学生的学生证信息，全部查询出来并保存到`StudentAndCardBusiness`对象中。即通过扩展类`StudentAndCardBusiness`，实现了学生以及学生证的一对一关联查询。

## 17.1.2 使用resultMap实现一对一查询 ##

要实现学生和学生证之间的一对一查询，还可以将学生和学生证分别放于不同的类中。如果要通过学生中信息查询到相关的学生证中的信息（例如根据学生的学号属性，查询该学生的学生证信息），就需要在学生类中增加一个学生证类型的属性，如下：

学生类：

**Student.java**

```
public class Student
{
	private int stuNo;
	private String stuName;
	private int stuAge;
	//学生证
	private StudentCard card ;
    …
	//setter、getter
}
```

学生证类：

**StudentCard.java**

```
public class StudentCard
{
	//学生证号
	private int cardId;
	//学生证的相关信息
	private String cardInfo;
	//getter、setter
}
```

因为学生证作为学生类的一个成员存在，所以可以使用学生类来保存学生和学生证的所有信息。

再通过SQL映射文件中的`resultMap`属性，将查询结果映射到学生类的所有属性中（包括学生证属性）:

SQL映射文件：

**studentMapper.xml**

```
<!-- 用resultMap，实现学生表和学生证表的一对一查询 -->
<select id="queryStudentAndCardByStuNoWithResultMap" 
parameterType="int" resultMap="student_card_map"> 
		select s.*,c.* from student s 
		         inner join studentCard c
		         on  s.cardId = c.cardId
		         where s.stuNo = #{stuNO} 
	</select> 
	
	<resultMap type="org.lanqiao.entity.Student" 
id="student_card_map">
		<id property="stuNo" column="stuNo"/>
		<result property="stuName" column="stuName"/>
		<result property="stuAge" column="stuAge"/>
		<association property="card" javaType="studentCard">
			<id property="cardId" column="cardId"/>
			<result property="cardInfo" column="cardInfo"/>
		</association>
</resultMap>	
```

通过`<resultMap>`元素将学生表的字段与类中简单类型的属性绑定起来，并通过`<association>`将学生类中的学生证成员`card`中的各个属性与字段绑定起来。其中，对于简单类型的属性来说，`<id>`映射主键列，`<result>`映射其他列；而对于非简单类型的属性（`card`属性），需要用`<association>`来映射，并用javaType来指定该属性的类型。

动态代理接口：

**IStudentMapper.java**

```
public interface IStudentMapper
{
	…
    Student queryStudentAndCardByStuNoWithResultMap(int stuNo);
}
```

测试方法：

**TestMyBatis.java**

```
public static void queryStudentAndCardByStuNoWithResultMap()
 throws IOException
{
	…
	SqlSession session = sessionFactory.openSession();
	IStudentMapper studentMapper = session.getMapper(IStudentMapper.class);
		
	Student student = studentMapper
.queryStudentAndCardByStuNoWithResultMap(32);
	…
}
```

以上，就是使用`<resultMap>`中的`association`实现一对一关联查询。


# 17.2 一对多查询 #

一个班级有多个学生，因此班级和学生之间的关系是“一对多”。

我们先创建一个“班级”的实体类和数据表，并插入测试数据，如下：

**StudentClass.java**

```
public class StudentClass
{
	private int classId ; 
	private String className;
	//setter、getter
}
```

**班级表studentClass：**

![](http://i.imgur.com/I773Og1.png)

*图17-03*

为了在“类”中体现班级与学生之间的“一对多”关系，需要在班级类中增加`List`类型的学生属性，如下

**StudentClass.java**

```
public class StudentClass
{
	private int classId ; 
	private String className;
private List<Student> students ;
	//setter、getter
}
```

为了在“表”中体现班级与学生之间的“一对多”关系，需要在学生表中增加表示班级的外键(ClassId)，如下：

![](http://i.imgur.com/uWP7r0j.png)

*图17-04*

以上的准备工作完成以后，我们就来具体的实现班级与学生的一对多查询：

SQL映射文件：

**studentMapper.xml**

```
<select id="queryClassAndStudnetsByClassId" 
parameterType="int" resultMap="classAndStudentMap"> 
		select s.*,sc.* from student s
				inner join studentClass sc
				on s.classid=sc.classid
				where sc.classid = #{classId}

</select> 
	
<resultMap type="studentClass" id="classAndStudentMap">
		<id property="classId" column="classId" />
		<result property="className" column="className" />
		<collection property="students" ofType="student">
			<id property="stuNo" column="stuNo" />
			<result property="stuName" column="stuName" />
			<result property="stuAge" column="stuAge" />
		</collection>
</resultMap>
```

通过`<select>`执行一对一的查询SQL，并将查询结果通过`<resultMap>`映射到`StudentClass`类中的各个属性中：普通类型通过`<id>`、`<result>`映射，`List`类型的属性`students`通过`<collection>`映射，并通过`ofType`指定`List`中元素的类型。即`List`类型的属性，需要通过`<resultMap>`中的`<collection>`元素来映射到数据表中的各个列。

动态代理接口：

**IStudentMapper.java**

```
public interface IStudentMapper
{
   …
StudentClass queryClassAndStudnetsByClassId(int classId);
}
```

测试方法：

**TestMyBatis.java**

```
public static void queryClassAndStudnetsByClassId() 
throws IOException
{
	…
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
	StudentClass stuclass 
= studentMapper.queryClassAndStudnetsByClassId(1);
		…
}
```

以上就可以查询编号为1的班级的所有信息，以及该班级中所有学生的信息。

# 17.3 多对一查询与多对多查询 #

## 17.3.1 多对一查询 ##

一个班级和多个学生之间的关系是“一对多”，反过来看，多个学生和一个班级之间的关系就是“多对一”。因此，一对多和多对一的本质是一样的，只是参照的对象不同。

## 17.3.2 多对多查询 ##

一个学生可以选择多门课程，即一个学生和多门课程之间的关系是“一对多”；反过来看，一个门课程也可以被多个学生所选，即一门课程和多个学生之间的关系也是“一对多”。因此，多个学生和多门课程之间的关系是“多对多”。

通过以上分析可知，“多对多”的本质就是组合了两个“一对多”。

**小结：关联查询主要是在`<resultMap>`元素中，用`<association>`配置一对一、用`<collection>`配置一对多。**

# 17.4 延迟加载 #

## 17.4.1 日志输出 ##

现在先给MyBatis加入日志输出功能，用于观察MyBatis执行时的SQL语句，便于我们以后更好的理解延迟加载。

MyBatis可以集成多种日志输出的功能，现在以log4j为例讲解日志输出功能的基本步骤。


#### (1)加入log4j驱动包 ####

将log4j的驱动包**log4j-1.2.15.jar**加入项目的构建目录（Build Path）。

#### (2)指定日志输出 ####

在配置文件的`<settings>`元素中，指定用log4j来实现MyBatis的日志输出功能，如下：

**conf.xml**

```
…
<configuration>
	<properties resource="db.properties" />
		<settings>
             …
		     <setting name="logImpl" value="LOG4J"/>  
	</settings>
…
</configuration>
```

如果不进行此项设置，MyBatis就会按照SLF4J →Apache Commons Logging →Log4j 2 →    Log4j →JDK logging的顺序进行查找，查找项目中是否集成了相应的日志功能，如果都没找到就会禁用日志功能。

#### (3)配置日志输出文件 ####

最后，在`src`下新建一个**log4j.properties**文件，用于配置日志输出的级别、格式等，如下

**log4j.properties.java**

```
log4j.rootLogger=DEBUG, stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
```

一般来讲，在开发、调试程序期间，建议把日志级别设置为DEBUG。

至此，我们就给MyBatis加入了日志功能，以后再执行MyBatis时，就可以在控制台看到MyBatis执行时的SQL语句。例如，运行之前编写的`queryClassAndStudnetsByClassId ()`，可以在控制台看到：

![](http://i.imgur.com/3cnOKoF.jpg)

*图17-05*

## 17.4.2 延迟加载详解 ##

在关联查询时，经常会使用到延迟加载。

**下面以“一对多”为例，讲解延迟加载的意义：**

在使用“一对多”查询时，很多时候我们只需要“一”的一方，而并不需要立即将“多”的一方查询出来。例如，班级是“一”，学生是“多”，有时候我们只需要查询出班级中的信息，而并没必要立即查询出班级中的所有学生。也就是说，最好能够将查询“多”的操作进行延迟，即首次查询只查询主要信息（例如“一”的一方），关联信息（例如“多”的一方）等需要时再加载，以减少不必要的数据库查询开销，从而提升了程序的效率，这就称为“延迟加载”。

同理，在“一对一”、“多对一”、“多对多”等关联查询时，也可以使用延迟加载来提高效率。

在MyBatis中使用延迟加载前，必须先将MyBatis配置文件中的延迟加载开关打开，具体是在`<setting>`元素中加入以下配置：

MyBatis配置文件：

**conf.xml**

```
<configuration>
    <properties resource="db.properties" />
<settings>
	    <!-- 将延迟加载设置为：true （可省，因为默认值就是true）-->
	    <setting name="lazyLoadingEnabled" value="true"/>
	    <!-- 将立即加载设置为：false -->
	    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
…
</configuration>
```

#### (1)一对一延迟加载 ####

学生和学生证之间是“一对一”的关系，现在通过延迟加载来实现：学生表一对一关联查询学生证表，要求默认只查学生表，学生证表只有当需要时再查询，即按需查询学生证表。

SQL映射文件1：

**studentMapper.xml**

```
<select id="queryStudentLazyLoadCard" 
resultMap="studentAndCardLazyLoadMap">
		select * from student 
</select>
	
<resultMap type="org.lanqiao.entity.Student" 
id="studentAndCardLazyLoadMap">
	<id property="stuNo" column="stuNo"/>
	<result property="stuName" column="stuName"/>
	<association property="card" 
javaType="org.lanqiao.entity.StudentCard"
    <!—通过namespace+id指定延迟加载执行的SQL语句 -->
 select="org.lanqiao.mapper.IStudentCardMapper.queryCardById" 
column="cardId"/>
</resultMap>
```

SQL映射文件2：

**studentCardMapper.xml**

```
<mapper namespace="org.lanqiao.mapper.IStudentCardMapper">
	 <!-- 根据学生证编号，查询学生证信息 -->
 	<select id="queryCardById" parameterType="int" 
resultType="student"> 
		select * from studentCard where cardId=#{cardId}
</select>
```

先通过主查询`“select * from student”`查询学生信息，然后通过一对一映射元素`<association>`关联查询学生证表，并通过`select`属性指定延迟加载的SQL语句`“select * from studentCard where cardId=#{cardId}”`。也就是说，在一对一查询中，是通过`<association>`的`select`属性指定延迟加载的。

因为本程序新增了**studentCardMapper.xml**映射文件，所以需要修改MyBatis配置文件：

**conf.xml**

```
…
<mappers>
<mapper resource="org/lanqiao/mapper/studentMapper.xml" />
<mapper resource="org/lanqiao/mapper/studentCardMapper.xml" />
</mappers>
…
```

动态代理接口1：

**IStudentMapper.java**

```
public interface IStudentMapper
{
    …
	public abstract List<Student> queryStudentLazyLoadCard();
}
```

动态代理接口2：

**IStudentCardMapper.java**

```
public interface IStudentCardMapper
{
	public abstract List<Student>  queryCardById();
}
```

测试方法：

**TestMyBatis.java**

```
public static void queryStudentLazyLoadCard() throws IOException
{
	…
	SqlSession session = sessionFactory.openSession();
	IStudentMapper studentMapper
 = session.getMapper(IStudentMapper.class);
	List<Student>  students 
= studentMapper.queryStudentLazyLoadCard();
	for(Student student:students)
	{
		StudentCard card = student.getCard();
	}
	session.close();
}
```

执行测试方法，观察控制台的日志：

![](http://i.imgur.com/ylIaXds.jpg)

*图17-06*

从输出结果可知，当程序执行到`studentMapper.queryStudentLazyLoadCard()`（即查询学生信息的方法）时，MyBatis只发出了查询学生的SQL语句`“select * from student”`；但当程序执行到`student.getCard()`（即查询学生对象关联的学生证信息）时，才会发出查询学生证的SQL语句`“select * from studentCard where cardId=?”`。这就是使用了延迟加载的效果：首次查询时，只查询目前需要的信息，其他信息等到需要时再去查询。

#### (2)一对多延迟加载 ####

一对多延迟加载的配置方法与一对一基本相同，不同的是将`<association>`换成了`<collection>`元素，即一对多延迟加载是在`<collection>`元素中配置`select`属性。读者可以自行尝试。

# 17.5 练习题 #

1.“一对一查询”有几种实现方式？

2.如何实现“一对多查询”？

3.如何实现延迟加载？

4.MyBatis中如何加入日志输入功能？