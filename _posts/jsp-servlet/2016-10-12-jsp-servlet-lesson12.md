---

layout: post

title: MyBatis入门

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将介绍MyBatis入门。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

>**本章简介**

MyBatis曾被称为iBatis。iBatis是apache的一个开源项目， 2010年由apache software foundation 迁移到了google code，并且改名为MyBatis。

MyBatis是一个支持普通SQL查询、存储过程和高级映射的优秀持久层框架。MyBatis消除了绝大部分的JDBC代码，简化了手工设置SQL参数，以及对结果集的检索进行了封装。MyBatis可以使用简单的XML或注解方式来配置映射，将POJO（普通的Java对象、实体类对象）映射成数据库中的记录。

本书是基于MyBatis3.x版本进行讲解，基于XML的形式。

# 12.1 开发第一个MyBatis程序 #

我们先通过一个简单例子，了解一下使用MyBatis的整体思路和开发流程。

**①** 获取MyBatis驱动包

可以在官网[http://blog.mybatis.org/](http://blog.mybatis.org/)或[https://github.com/mybatis/mybatis-3/releases](https://github.com/mybatis/mybatis-3/releases)中下载MyBatis的资源文件**mybatis-3.x.x.zip**，解压后可得到如下文件：

<table>
   <tr>
      <td>文件名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>mybatis-3.x.x.jar</td>
      <td>MyBatis的类库</td>
   </tr>
   <tr>
      <td>mybatis- 3.x.x -javadoc.jar</td>
      <td>MyBatis的API帮助文档</td>
   </tr>
   <tr>
      <td>mybatis- 3.x.x -sources.jar</td>
      <td>MyBatis的源代码</td>
   </tr>
   <tr>
      <td>mybatis- 3.x.x.pdf</td>
      <td>MyBatis的开发向导</td>
   </tr>
</table>

**②** 创建一个普通的Java项目（项目名MyBatisDemo），并在该项目的`src`目录下，创建一个`libs`目录(newFolder)并存放**mybatis-3.x.x.jar**和**ojdbc6.jar**（`oracle`驱动包），再将这两个`jar`包设置为构建目录（Build Path），如图，

![](http://i.imgur.com/PkRFtkH.png)

*图12-01*

**③** 创建（或使用之前已有的）“学生表”，各字段及类型如下：

<table>
   <tr>
      <td>字段名</td>
      <td>类型</td>
      <td>字段名</td>
      <td>类型</td>
   </tr>
   <tr>
      <td>stuNo</td>
      <td>number</td>
      <td>stuAge</td>
      <td>number</td>
   </tr>
   <tr>
      <td>stuName</td>
      <td>nvarchar2(50)</td>
      <td>graName</td>
      <td>nvarchar2(50)</td>
   </tr>
</table>

创建完毕后，加入一些数据，如图，

![](http://i.imgur.com/H3nAaTX.png)

*图12-02*

**④** 创建与学生表对应的实体类，如下，

**org.lanqiao.entity.Student.java**

```
package org.lanqiao.entity;
public class Student
{
	//学号
	private int stuNo;
	//姓名 
	private String stuName;
	//年龄
	private int stuAge;
	//年级名称
	private String graName;	
//省略无参、各种带参的构造方法
//省略setter、getter
 
	//为了方便的输出对象中的内容，重写toString()方法
	@Override
	public String toString()
	{
		return   "学号:"+this.stuNo+"\t姓名:"+this.stuName
+"\t年龄:"+this.stuAge+"\t年级:"+this.graName;
	}
}
```

**⑤** 创建学生表的SQL映射文件，

**org/lanqiao/entity/studentMapper.xml**

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.lanqiao.entity.studentMapper">
	<select id=" queryStudentByNo" parameterType="int"
		resultType="org.lanqiao.entity.Student">
		select * from student where stuNo=#{stuNo}
	</select>
</mapper>
```

说明：

1.在SQL映射文件中，SQL语句（如select * from ….）的最后没有分号“;”。

2.配置文件`conf.xml`以及映射文件`studentMapper.xml`中的头信息、约束等，不必我们自己手写，可以在之前**mybatis-3.x.x.zip**的解压的文件里找到**mybatis- 3.x.x.pdf**，此向导文件中就有MyBatis的配置及映射模板，我们只需要复制粘贴，然后修改相关属性值即可。

**⑥** 创建MyBatis的配置文件，如下，

**conf.xml**

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
             <!-- 配置数据库连接信息 -->
			<dataSource type="POOLED">
				<property name="driver" 
value="oracle.jdbc.OracleDriver" />
				<property name="url" 
value="jdbc:oracle:thin:@127.0.0.1:1521:XE" />
				<property name="username" value="system" />
				<property name="password" value="sa" />
			</dataSource>
		</environment>
	</environments>
	<!-- 在配置文件（conf.xml）中注册映射文件（studentMapper.xml） 文件 -->
	<mappers>
		<mapper resource="org/lanqiao/entity/studentMapper.xml" />
	</mappers>
</configuration>
```

**⑦** 编写测试类：执行SQL映射文件中定义的`select`语句

**org.lanqiao.test.TestMyBatis.java**

```
package org.lanqiao.test;
//省略import
public class TestMyBatis
{
	public static void main(String[] args) throws IOException
	{
		String resource = "conf.xml";
		// 加载mybatis 的配置文件
		Reader reader = Resources.getResourceAsReader(resource);
		// 创建sqlSession 的工厂
		SqlSessionFactory sessionFactory 
= new SqlSessionFactoryBuilder().build(reader);
		// 创建能够执行映射文件中sql的sqlSession对象
		SqlSession session = sessionFactory.openSession();
		// 指定sql语句对应的标识字符串：namespace+id
		String statement 
= "org.lanqiao.entity.studentMapper" + ". queryStudentByNo ";
		// 执行查询，返回一个学号为32的Student对象
		Student student = session.selectOne(statement, 32);
		System.out.println(student);
         session.close();
	}
}
```

测试类中，`statement`变量指向了SQL映射文件中id为`getStudentByNo`的`select`标签，
并通过`SqlSession`对象的`selectOne()`方法，将“32”传入该`select`标签中，最后`select`标签中的SQL语句以`#{stuNo}`的方式将“32”赋值给了`stuNo`。

执行测试类**TesMyBatis.java**，运行结果：

![](http://i.imgur.com/1j6KRHI.png)

*图12-03*

通过以上流程，可以发现MyBatis执行的总体思路是：

MyBatis应用程序根据XML配置文件（**conf.xml**）创建`SqlSessionFactory`，再由`SqlSessionFactory`创建一个`SqlSession`对象。`SqlSession`对象包含了执行SQL所需要的所有方法，可以直接运行映射的SQL语句，完成对数据的增删改查等操作。其中映射的SQL语句存放在一个SQL映射文件中（如**studentMapper.xml**），应用程序可以通过SQL映射文件中的`namespace+id`找到对应的SQL语句。

**其中，`SqlSession`对象的常用方法如下：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>int insert(String statement, Object parameter)</td>
      <td>执行数据库的“增加”操作。如果SQL语句中没有参数，可以使用重载方法int insert(String statement)。返回值表示实际增加了几条数据。</td>
   </tr>
   <tr>
      <td>int delete(String statement,Object parameter)</td>
      <td>执行数据库的“删除”操作。如果SQL语句中没有参数，可以使用重载方法int delete(String statement)。返回值表示实际删除了几条数据。</td>
   </tr>
   <tr>
      <td>int update(String tatement, Object parameter)</td>
      <td>执行数据库的“修改”操作。如果SQL语句中没有参数，可以使用重载方法  int delete(String statement)。返回值表示实际修改了几条数据。</td>
   </tr>
   <tr>
      <td>&lt;T&gt;T selectOne(String statement,Object parameter);</td>
      <td>执行数据库中的“查询单个结果集”操作。如果SQL语句中没有参数，可以使用重载方法&lt;T&gt; T selectOne(String statement)。返回值表示查询到的结果，返回值类型通过SQL映射文件中的resultType属性指定。</td>
   </tr>
   <tr>
      <td>&lt;E&gt; List&lt;E&gt; selectList(String statement, Object parameter);</td>
      <td>执行数据库中的“查询多个结果集”操作。如果SQL语句中没有参数，可以使用重载方法&lt;E&gt; List&lt;E&gt; selectList(String statement)。返回值表示查询到的结果，返回的集合元素类型通过SQL映射文件中的resultType属性指定。</td>
   </tr>
   <tr>
      <td>void commit()</td>
      <td>刷新批处理语句，并且提交数据库连接。需要注意的是，在执行增删改(insert()、delete()、update())命令后，必须执行commit()来提交，否则数据库表中的数据不会发生任何变化。</td>
   </tr>
</table>

方法中的参数：

`statement`：代表即将执行的SQL语句，该SQL语句是由SQL映射文件中的`namespace`和标签元素的id值指定。

`parameter`： SQL语句中的参数值。参数类型通过SQL映射文件中的`parameterType`属性指定，并通过“#{}”取得。如果参数是基本数据类型（或`String`类型），直接使用“#{参数名}”取得；如果参数是对象类型，则需要使用“#{对象的属性名}”来获取。

以上是一个MyBatis的入门示例，接下来，我们就详细的讲解MyBatis的具体使用。

# 12.2 MyBatis配置文件简介 #

以下是官方提供的MyBatis配置文件(**conf.xml**)模板：

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">
				<property name="driver" value="${driver}" />
				<property name="url" value="${url}" />
				<property name="username" value="${username}" />
				<property name="password" value="${password}" />
			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="org/mybatis/example/BlogMapper.xml" />
	</mappers>
</configuration>
```

其中主要的元素及属性含义如下：

**(1) 多环境配置**

`<environments default="development">`

**default**：指定默认`environment`的id值

**environments**：MyBatis允许配置多种不同的数据库环境，如开发环境、测试环境、工作环境等。因此在MyBatis中，我们可以使用相同的SQL映射来操作不同的数据库。但要注意，虽然允许配置多种不同的环境，但在使用时，`environments`只能选择唯一的一个环境，即通过`environments`元素的`default`属性来指定默认使用的`environment`的id值。这样可以方便开发者快速的在不同数据库环境之间切换。而每个数据库环境（`environment`元素），在程序中对应着一个`SqlSessionFactory`对象。

我们之前在测试类**TesMyBatis.java**中，通过配置文件（**conf.xml**）创建的`SqlSessionFactory`对象，就是根据数据库环境`environment`元素的内容产生的。具体代码如下：

```
	String resource = "conf.xml";
	// 加载mybatis 的配置文件
	Reader reader = Resources.getResourceAsReader(resource);
	// 创建sqlSession 的工厂
	SqlSessionFactory sessionFactory 
= new SqlSessionFactoryBuilder().build(reader);
```

以上，是根据`environments`元素中`default`属性指定的数据库环境而产生的`SqlSessionFactory`对象。我们也可以在Java代码中显示的指定数据库环境，如下：

```
SqlSessionFactory sessionFactory 
= new SqlSessionFactoryBuilder().build(reader,"development");
```

即通过`build()`方法的第二个参数，将数据库的环境指定为id值为`”development”`所代表的`environment`。

**(2) 具体环境配置**

`environments`的子元素，表示每一个具体的数据库环境。

`<environment id="development">`

id：数据库环境的id值

**(3) 事务管理器**

`<transactionManager type="JDBC" />`

`type`: 指定事务管理器类型。在MyBatis中有两种事务管理器类型，JDBC和MANAGED

<table>
   <tr>
      <td>类型</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>JDBC</td>
      <td>使用JDBC的提交和回滚来管理事务，即利用java.sql.Connection对象完成对事务的提交（commit()）、回滚（rollback()）、关闭（close()）等</td>
   </tr>
   <tr>
      <td>MANAGED</td>
      <td>MyBatis自身不会去管理事务，而是把事务交给容器托管（比如Spring、JBOSS、Weblogic容器）。默认情况会关闭连接，若不想关闭则需要如下配置：&lt;transactionManager type="MANAGED"&gt;   &lt;property name="closeConnection" value="false"/&gt;   &lt;/transactionManager&gt;</td>
   </tr>
</table>

**(4) 数据源**

`<dataSource type="POOLED">`

`type`: 指定数据源类型

**MyBatis中有三种数据源类型，UNPOOLED、 POOLED和JNDI：**

**①** UNPOOLED ：每次被请求时简单打开和关闭连接，需要配置的以下属性：

<table>
   <tr>
      <td>属性名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>driver</td>
      <td>JDBC驱动的Java全类名</td>
   </tr>
   <tr>
      <td>url</td>
      <td>数据库的JDBC URL地址</td>
   </tr>
   <tr>
      <td>username</td>
      <td>登录数据库的用户名</td>
   </tr>
   <tr>
      <td>password</td>
      <td>登录数据库的密码</td>
   </tr>
   <tr>
      <td>defaultTransactionIsolationLevel</td>
      <td>默认的连接事务隔离级别</td>
   </tr>
</table>

**②** POOLED：简单的数据库连接池类型，它使得数据库连接可被复用，不必在每次请求时都去创建一个物理的连接。

**③** JNDI ：从tomcat等容器中获取数据源

**(5) 映射文件**

```
<mappers>
	<mapper resource="org/mybatis/example/BlogMapper.xml" />
</mappers>
```

`mappers`：配置SQL映射文件。

`mapper`的`resource`属性：SQL映射文件（**XxxMapper.java**）的相对路径。

# 12.3 SQL映射文件简介 #

SQL映射文件（**XxxMapper.java**）的基础模板如下(以选择`select`为例)：

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${namespace }">
	<select id="{id}" parameterType="{ptype}"	resultType="${rtype}">
		SQL语句，例如：select * from student where stuNo=#{stuNo}
	</select>
</mapper>
```

映射文件中主要的元素及属性含义如下：

**(1)命名空间**

`<mapper namespace="${namespace }">`

给此映射文件设置一个命名空间。程序需要根据命名空间，来找到某一个具体的映射文件。

**(2)查询标签**

```
<select id="{id}" parameterType="{ptype}"	 resultType="${rtype}">
		SQL语句，例如：select * from student where stuNo=#{stuNo}
</select>
```

id ：唯一标识符。程序可以通过“命名空间+唯一的标识符”（即namespace+id）来定位此`select`标签中的SQL语句。

`parameterType`：传入“SQL语句”中的参数类型。例如，SQL语句中`“stuNo=#{stuNo}”`需要传入一个`int`型的`stuNo`，就可以将参数类型设置为`int`，即`parameterType="int"`。


`resultType`：SQL语句的返回类型。例如，`“select * from student …”`返回的是一个学生的全部信息，可以用学生对象来保存，所以返回类型可以是`Student`类型，即`resultType="org.lanqiao.entity.Student"`。

除了查询标签`<select>`以外，还有增加`<insert>`、修改`<update>`、删除`<delete>`等标签，我们会在后文讲解。

# 12.4 使用MyBatis实现CRUD #

CRUD是指`Create`、`Read`、`Update`和`Delete`，即我们常说的“增删改查”操作，也是每一个项目最基本的功能。

现在，我们在已有查询功能的基础上，实现一套完整的CRUD：

学生表、学生实体类`Student.java`、MyBatis配置文件`conf.xml`和之前完全一样。


**SQL映射文件：org/lanqiao/entity/studentMapper.xml**

```
…
<mapper namespace="org.lanqiao.entity.studentMapper">
	<!-- 增加一个学生 -->
	<insert id="addStudent" 
parameterType="org.lanqiao.entity.Student">
		insert into student(stuNo,stuName,stuAge,graName) 
values(#{stuNo},#{stuName},#{stuAge},#{graName})
	</insert>
	
	<!-- 根据学号，删除一个学生 -->
	<delete id="deleteStudentByNo" parameterType="int">
		delete from student where stuNo=#{stuNo}
	</delete>
	
	<!-- 根据学号，修改学生信息 -->
	<update id="updateStudentByNo" 
parameterType="org.lanqiao.entity.Student">
		update student set stuName=#{stuName},stuAge=#{stuAge},
graName=#{graName} where stuNo=#{stuNo}
	</update>
	
	 <!-- 根据学号，查询一个学生 -->
 	<select id=" queryStudentByNo " parameterType="int" 
resultType="org.lanqiao.entity.Student"> 
		select * from student where stuNo=#{stuNo} 
	</select> 
	
	<!-- 查询全部学生 -->
	<select id=" getAllStudents " 
resultType="org.lanqiao.entity.Student">
		select * from student
</select>
</mapper>
```

**测试类org.lanqiao.test.TestMyBatis.java**

```
package org.lanqiao.test;
//省略import
public class TestMyBatis
{

	// 增加一个学生
	public static void testAdd() throws IOException
	{
		…
        // 指定sql语句对应的标识字符串：namespace+id
		String statement = "org.lanqiao.entity.studentMapper"
 + ".addStudent";
		Student stu = new Student(7, "路人甲", 22, "一年级");
		session.insert(statement, stu);
		session.commit();
		session.close();
	}

	// 根据学号，删除一个学生
	public static void testDeleteByNo() throws IOException
	{
		…
		String statement = "org.lanqiao.entity.studentMapper"
 + ".deleteStudentByNo";
		session.delete(statement, 7);
		session.commit();
		session.close();	}

	// 根据学号，修改学生信息
	public static void testUpdate() throws IOException
	{
		…
		String statement = "org.lanqiao.entity.studentMapper"
 + ".updateStudentByNo";
		Student stu = new Student(7, "路人乙", 33, "二年级");
		session.update(statement, stu);
		session.commit();
		session.close();
	}

	// 根据学号查询一个学生
	public static void testQueryStudentByNo () throws IOException
	{
		…
				String statement = "org.lanqiao.entity.studentMapper" 
+ ".queryStudentByNo ";
		// 执行查询，返回一个学号为32的Student对象
		Student student = session.selectOne(statement, 32);
		System.out.println(student);
		session.close();
	}

	// 查询全部学生
	public static void testQueryAll() throws IOException
	{
		String statement = "org.lanqiao.entity.studentMapper" 
+ ".queryAllStudents";
		// 执行查询，返回一个学号为32的Student对象
		List<Student> students = session.selectList(statement);
		System.out.println(students);
		session.close();
	}

	public static void main(String[] args) throws IOException
	{
		testQueryStudentByNo ();//根据学号，查询一个学生
		testAdd();//增加一个学生
		testUpdate();//根据学号，修改一个学生
		testDeleteByNo();//根据学号，删除一个学生
		testQueryAll();//查询全部学生
	}
}
```

需要注意，在执行增`insert()`、删`delete()`、改`update()`操作后，必须再执行`commit()`方法进行数据库提交，否则不会对数据库表中的数据产生影响。

# 12.5 使用Mapper动态代理优化程序 #

有一条软件设计范式称为“约定优于配置”，就是说如果有一些值没被配置的话，那么程序就会使用默认值（即“约定”）。换句话说，如果能按照“约定”去开发程序，就不需要配置了。

我们之前开发的“MyBatisDemo”项目，在测试类（`TestMyBatis.java`）里，每执行一个数据库操作（增、删、改、查），都必须通过`statement`变量来指向SQL映射文件（studentMapper.xml）中某一个标签的id值（即通过`namespace+id`的方式指定，例如用`String statement = "org.lanqiao.entity.studentMapper" + ".addStudent"`来指定“增加”所需要的SQL语句）。可以发现，这种使用硬编码的方式来指定SQL语句，开发起来比较繁琐，因此我们可以使用“约定优于配置”来简化：使用“约定”来省略`statement`变量的配置。具体实现步骤如下：

**(1)** 在之前的“MyBatisDemo”项目上二次开发。其中，学生表、学生实体类`(Student.java)`都与之前的完全一样。

**(2)** 新建接口，在接口中定义操作数据库的方法，并给方法增加一些“约定”。其中，“约定”需要参照SQL配置文件（**studentMapper.xml**）中的各个标签（如`<select>`），如下：

```
<!-- 根据学号，查询一个学生 -->
<select id=" queryStudentByNo" parameterType="int" 
resultType="org.lanqiao.entity.Student"> 
	select * from student where stuNo=#{stuNo} 
</select>
```

**接口中方法的具体“约定”如下：**

**①** 方法名和SQL配置文件（**studentMapper.xml**）中相关方法的id值相同。例如，SQL配置文件中“查询一个学生”的`<select>`标签的id值是`“queryStudentByNo”`，那么在接口中“查询一个学生”的方法名就也必须是`queryStudentByNo ()`。

**②**方法的输入参数类型，和SQL配置文件中`“parameterType”`的类型相同。例如，SQL配置文件中“查询一个学生”的`“parameterType”`类型是`int`，则在接口中“查询一个学生”方法的输入参数类型就必须是`int`，即`getStudentByNo(int stuNo)`。特殊情况：如果SQL配置文件中不存在`“parameterType”`，则表示是一个无参方法。

**③** 方法的返回值类型，和SQL配置文件中`“resultType”`的类型相同。例如，SQL配置文件中“查询一个学生”的`“resultType”`类型是`“org.lanqiao.entity.Student”`，则在接口中“查询一个学生”方法的返回值类型就必须是`“org.lanqiao.entity.Student`（或简写为`Student`）”，即`Student getStudentByNo(int stuNo){ … }`。

**特殊情况：**

**a.**如果SQL配置文件中不存在`“resultType”`，则表示是方法的返回值为`void`。

**b.**如果方法的返回值是一个集合类型（例如，返回类型是`List<Student>`），但在SQL配置文件中的`“resultType”`却不能集合类型，而应该是集合中的元素类型（例如，配置文件中要使用`resultType="org.lanqiao.entity.Student"`来表示返回值类型`List<Student>`）。

可以发现，有了上述三条“约定”，MyBatis就能将接口中的方法和数据库标签（如`<select>`、`<insert>`等）一一对应起来，而不再需要使用`statement`变量来指定。

另外，我们之前在学习接口时已经知道“接口中方法必须是`public`、`abstract`”。

综上，按照以上三条“约定”，接口的定义如下，

**org.lanqiao.mapper.IStudentMapper.java**

```
package org.lanqiao.maper;
import java.util.List;
import org.lanqiao.entity.Student;
public interface IStudentMapper
{
	//按照“约定”编写的“根据学号，查询一个学生”的接口方法
	public abstract Student queryStudentByNo (int stuNo);
	//按照“约定”编写的“查询全部学生”的接口方法
	public abstract List<Student> queryAllStudents ();
	//按照“约定”编写的“增加一个学生”的接口方法
	public abstract void addStudent(Student student);
	//按照“约定”编写的“根据学号，删除一个学生”的接口方法
	public abstract void deleteStudentByNo(int stuNo);
	//按照“约定”编写的“根据学号，修改一个学生”的接口方法
	public abstract void updateStudentByNo(int stuNo);
}
```

**(3)** 修改的SQL映射文件**studentMapper.xml**：将`mapper`的`namespace`值修改为接口`IStudentMapper.java`的“包名+接口名”，如下，

**org/lanqiao/entity/studentMapper.xml**

```
…
<mapper namespace="org.lanqiao.mapper.IStudentMapper">
…
</mapper>
```

我们可以发现，MyBatis就是通过`namespace`的值来定位接口的路径，并用接口中编写方法的“约定”来将SQL映射文件中的各个数据库标签（如`<select>`、`<insert>`等）与接口中的方法一一对应的。有了接口方法和数据库标签的一一对应关系，也就可以直接通过接口中方法名来定位数据库标签，而不用再使用`statement`变量来定位数据库标签。

**(4)** 习惯上，我们在使用此种基于约定的“Mapper动态代理方式”实现MyBatis时，会把SQL配置文件和接口放在同一个包下。因此需要将项目中`studentMapper.xml`移动到接口所在包
`“org.lanqiao.mapper”`中。移动完后，注意要修改MyBatis配置文件(conf.xml)中的SQL配置文件路径，如下，

**conf.xml**

```
…
<configuration>
  …
	<mappers>
		<mapper resource="org/lanqiao/mapper/studentMapper.xml" />
	</mappers>
</configuration>
```

**(5)**在测试类中编写测试代码。

以上工作完成以后，我们就可以使用Mapper动态代理来完成MyBatis程序了。

采用Mapper动态代理方式，还需要借助于`SqlSession`接口中`getMapper()`方法，

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>&lt;T&gt;T getMapper(Class&lt;T&gt; type)</td>
      <td>传入一个接口类型，返回该接口的mapper代理对象。可以通过此mapper代理，来调用传入的那个接口中的所有方法。</td>
   </tr>
</table>

以“查询一个学生为例”，具体如下，

**org.lanqiao.test.TestMyBatis.java**

```
package org.lanqiao.test;
//省略import
public class TestMyBatis
{
…
	// 根据学号查询一个学生
	public static void testQueryByNoWothMapper() throws IOException
	{
		String resource = "conf.xml";
		Reader reader = Resources.getResourceAsReader(resource);
		SqlSessionFactory sessionFactory 
= new SqlSessionFactoryBuilder().build(reader);
		SqlSession session = sessionFactory.openSession();
// 传入IStudentMapper接口，返回该接口的mapper代理对象studentMapper
		IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
		//通过mapper代理对象studentMapper，来调用IStudentMapper接口中的方法
		Student student = studentMapper.getStudentByNo(31);
		
		System.out.println(student);
		session.close();
	}
	public static void main(String[] args) throws IOException
	{
		 testQueryByNoWothMapper();
		…
	}
}
```

执行测试类`TestMyBatis.java`，运行结果：

![](http://i.imgur.com/LwinHRH.png)

*图12-04*

可以发现，使用mapper代理的方法来开发MyBatis，开发者只需要按照一定的“约定”编写接口及接口中的方法，并且不用写接口的实现类，然后就可以直接通过接口中的方法来执行SQL配置文件中的SQL语句。在MyBatis官方文档中，也是推荐使用此种方式来开发程序。

# 12.6 练习题 #

1.简述开发MyBatis的基本步骤（使用Mapper动态代理方式）。（难度★★★）

2.根据SQL映射文件编写动态代理接口的“约定”是什么？（难度★★）

















