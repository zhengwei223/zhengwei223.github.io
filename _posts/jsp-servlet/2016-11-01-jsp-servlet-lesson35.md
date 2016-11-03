---

layout: post


title: 新增内容3：数据源与DbUtils类库


category: JSP-Servlet教程


tags: JSP Servlet


description: 


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

**②DBCP数据源**

DBCP(DataBase connection pool,数据库连接池)，是Apache组织提供的一个开源连接池。以下是使用DBCP的具体方法：

使用DBCP前，需要先在项目中导入以下JAR包：

<table>
   <tr>
      <td>commons-dbcp.jar</td>
      <td>commons-pool.jar</td>
      <td>ojdbc6.jar（oracle驱动包）</td>
   </tr>
</table>

其中，**commons-dbcp.jar**中包含了DBCP的2个核心类：`BasicDataSource`和`BasicDataSourceFactory`。我们可以根据这两个类，设计出两种不同的DBCP实现方式：基于`BasicDataSource`的手动编码方式，以及基于`BasicDataSourceFactory`的配置文件方式。

**a. 基于`BasicDataSource`的手动编码方式**

`BasicDataSource`是`DataSource`（数据源）接口的实现类，包含了设置数据源对象的具体方法，如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>… void setDriverClassName(String driverClassName)</td>
      <td>设置连接数据库的驱动名</td>
   </tr>
   <tr>
      <td>… void void setUrl(String url)</td>
      <td>设置连接数据库的URL</td>
   </tr>
   <tr>
      <td>… void setUsername(String username)</td>
      <td>设置数据库的用户名</td>
   </tr>
   <tr>
      <td>… void setPassword(String password)</td>
      <td>设置数据库的密码</td>
   </tr>
   <tr>
      <td>… void setInitialSize(int initialSize)</td>
      <td>设置初始化时，连接池中的连接数量</td>
   </tr>
   <tr>
      <td>… void setMaxActive(int maxActive)</td>
      <td>设置连接池中，处于活动状态的数据库连接的最大数量</td>
   </tr>
   <tr>
      <td>… void setMinIdle(int minIdle)</td>
      <td>设置连接池中，处于空闲状态的数据库连接的最小数量</td>
   </tr>
   <tr>
      <td>… Collection getConnection ()throws SQLException</td>
      <td>从连接池中获取一个数据库连接</td>
   </tr>
</table>

可以先通过`BasicDataSource`构造方法产生一个数据源对象，再手动给数据源对象设置属性值，最后返回该数据源对象，如下：


**org.lanqiao.dbutil.DBCPDemo.java**

```
// package、import
public class DBCPDemo {
    //获取DBCP数据源对象
public static DataSource getDataSourceWithDBCP(){
		BasicDataSource basicDataSource = new BasicDataSource() ;
		//配置数据源中的数据库信息
		    basicDataSource
.setDriverClassName("oracle.jdbc.OracleDriver");
		basicDataSource.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
		basicDataSource.setUsername("system");
		basicDataSource.setPassword("sa");
		//设置数据源中的连接池参数
		basicDataSource.setInitialSize(10);
		basicDataSource.setMaxActive(8);
		basicDataSource.setMinIdle(2);
		return basicDataSource ;
	 }
    //测试DBCP数据源
public static void main(String[] args) throws SQLException {
    //通过getDataSourceWithDBCP()方法，获取DBCP数据源对象
		DataSource ds = getDataSourceWithDBCP () ;
         //通过DBCP数据源对象，获取Connection对象
		Connection connection = ds.getConnection();
	     …
	}
…
```

以上，就是使用DBCP数据源获取连接对象（`connection`）的方法。有了连接对象`connection`以后，就可以通过`createStatement()`方法产生`Statement`对象（或者通过`prepareStatement()`方法产生`PreparedStatement`等），进而执行数据库访问。

**b. 基于`BasicDataSourceFactory`的配置文件方式**

`BasicDataSourceFactory`可以通过`createDataSource()`方法，从属性文件（Properties）中读取数据库配置信息，并获取数据库连接对象。`createDataSource()`方法的完整定义如下： 

```
public static DataSource createDataSource(Properties properties) 
throws Exception 
{
   …
}
```

**以下，是通过`BasicDataSourceFactory`方式获取DBCP数据源对象的具体代码：**

**<1>创建并编写配置文件**

**创建配置文件：**


在`src`上点击鼠标右键→ New→ File→ 输入dbcpconfig.properties→ Finish，如图：

![](http://i.imgur.com/J4lBIBg.png)



![](http://i.imgur.com/5cE9LSq.png)



**编写配置文件：dbcpconfig.properties**

```
driverClassName=oracle.jdbc.OracleDriver
url=jdbc:oracle:thin:@localhost:1521:XE
username=system
password=sa
initSize=10
maxActive=8
maxIdle=2
```

**<2>获取数据源对象**

```
// package、import
public class DBCPDemo {
	//获取DBCP数据源对象
	public  static DataSource getDataSourceWithDBCPByProperties () {
		DataSource basicDataSource = null ; 
		//创建一个配置文件对象props
		Properties props = new Properties();
		try{
		//将配置文件中的信息读取到输入流中
		InputStream input =new DBCPDemo().getClass().getClassLoader()
.getResourceAsStream("dbcpconfig.properties") ;
		//将配置文件中的信息，从输入流加载到props中
		props.load(input);
		//根据props中的配置信息，创建数据源对象
		 basicDataSource = BasicDataSourceFactory
.createDataSource(props) ;
		}catch(Exception e){
			e.printStackTrace();
		}
		return basicDataSource;
	}
	
	public static void main(String[] args) throws SQLException {
		DataSource ds1 = getDataSourceWithDBCPByProperties () ;
		Connection connection1 = ds1.getConnection();
		…
	}
}
```

**③C3P0数据源**

C3P0性能优越并易于扩展，是目前最流行、使用最广的数据源之一。著名的Hibernate、Spring等开源框架，使用的都是该数据源。C3P0实现了`DataSource`数据源接口，并提供了一个重要的实现类：`ComboPooledDataSource`，该类的常见方法如下表：

<table>
   <tr>
      <td>方法</td>
      <td>简称</td>
   </tr>
   <tr>
      <td>public ComboPooledDataSource()    public ComboPooledDataSource(String configName)</td>
      <td>构造方法，用于创建ComboPooledDataSource对象。</td>
   </tr>
   <tr>
      <td>public void setDriverClass(String driverClass )     throws PropertyVetoException
     throws PropertyVetoException</td>
      <td>设置连接数据库的驱动名</td>
   </tr>
   <tr>
      <td>public void setJdbcUrl( String jdbcUrl )</td>
      <td>设置连接数据库的URL</td>
   </tr>
   <tr>
      <td>public void setUser( String user )</td>
      <td>设置数据库的用户名</td>
   </tr>
   <tr>
      <td>public void setPassword( String password )</td>
      <td>设置数据库的密码</td>
   </tr>
   <tr>
      <td>public void setMaxPoolSize( int maxPoolSize )</td>
      <td>设置连接池的最大连接数目</td>
   </tr>
   <tr>
      <td>public void setMinPoolSize( int minPoolSize )</td>
      <td>设置连接池的最小连接数目</td>
   </tr>
   <tr>
      <td>public void setInitialPoolSize( int initialPoolSize )</td>
      <td>设置初始化时，连接池中的连接数量</td>
   </tr>
   <tr>
      <td>public Connection getConnection()    throws SQLException</td>
      <td>从连接池中获取一个数据库连接。该方法是由ComboPooledDataSource的父类AbstractPoolBackedDataSource提供。</td>
   </tr>
</table>

**可以发现，DBCP和C3P0的实现类都提供了3类方法：**

**(1)**设置数据库信息的方法；

**(2)**初始化连接池的方法()；

**(3)**获取连接对象的`getConnection()`方法。


与DBCP类似，在使用C3P0前，需要先导入以下JAR包：

<table>
   <tr>
      <td>c3p0-版本号.jar</td>
      <td>ojdbc版本号.jar</td>
   </tr>
   <tr>
      <td colspan="2">c3p0-oracle-thin-extras-版本号.jar  (如果不是oracle驱动，则无需此JAR)</td>
   </tr>
</table>

此外，C3P0也提供了手动编码及配置文件两种方式来获取数据源对象，具体如下:

**a.基于无参构造方法`ComboPooledDataSource()`的手动编码方式**

通过手动编码方式获取c3p0对象，依赖于无参构造方法`ComboPooledDataSource()`，如下：

**org.lanqiao.dbutil.C3P0Demo.java**

```
//package、import
public class C3P0Demo {
    //获取C3P0数据源对象
	public static DataSource getDataSourceWithC3p0 (){
		ComboPooledDataSource cpds = new ComboPooledDataSource();
		try{
			//设置数据库信息
			cpds.setDriverClass("oracle.jdbc.OracleDriver");
			cpds.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:XE");
			cpds.setUser("system");
			cpds.setPassword("sa");
			//设置连接池信息
			cpds.setInitialPoolSize(10);
			cpds.setMaxPoolSize(20);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return cpds;
	}
	
	public static void main(String[] args) throws SQLException {
		Connection connection = getDataSourceWithC3p0 ()
.getConnection();
		…
	}
}
```

**b.基于有参构造方法ComboPooledDataSource(String configName)的配置文件方式**

通过配置文件方式获取c3p0对象，依赖于有参构造方法`ComboPooledDataSource(String configName)`，如下：

**<1>创建并编写配置文件**

与DBCP不同，c3p0使用的是XML格式的配置文件，并且配置文件必须满足：

**①**存放于`src`根目录下；

**②**文件名是**c3p0-config.xml**。

在`src`下创建并编写一个**c3p0-config.xml**文件，如下：

**c3p0-config.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
      <!-- 默认配置 -->
	 <default-config>
	 	<property name="user">system</property>
		<property name="password">sa</property>
		<property name="driverClass">
oracle.jdbc.OracleDriver
</property>
		<property name="jdbcUrl">
jdbc:oracle:thin:@localhost:1521:XE
</property>
	 	<property name="checkoutTimeout">20000</property>
	 	<property name="initialPoolSize">10</property>
	 	<property name="maxIdleTime">15</property>
	 	<property name="maxPoolSize">20</property>
	 	<property name="minPoolSize">5</property>
	 </default-config>
 
     <!-- name为”lanqiao”的配置 -->
	 <named-config name="lanqiao">
	 	<property name="initialPoolSize">10</property>
	 	<property name="maxPoolSize">15</property>
	 	<property name="driverClass">
oracle.jdbc.OracleDriver</property>
	 	<property name="jdbcUrl">
jdbc:oracle:thin:@localhost:1521:XE
</property>
<!--此named-config中，没有配置user、password等信息，C3P0会自动寻找 default-config中的相应信息-->
	 </named-config>
 </c3p0-config>
```

可以发现，`<c3p0-config>`中包含了两套配置数据源信息： `<default-config>`和 `<named-config name="…">`。其中,`<default-config>`配置的是默认信息，而`<named-config name="…">`是自定义配置。一个`<c3p0-config>`中可以包含任意数量的`<named-config name="…">`，当包含一个或多个时，用户可以通过有参构造方法ComboPooledDataSource(String configName)中的参数configName来指定实际使用哪一个。此外，如果某些信息在`<named-config name="…">`中没有配置，那么c3p0就会自动使用`<default-config>`中的相应信息，例如user、password等。

**<2>获取数据源对象**

有参构造方法ComboPooledDataSource(String configName)会在**c3p0-config.xml**文件中的所有`<named-config name="…">`里，寻找name= configName的配置信息。

以下，通过ComboPooledDataSource("lanqiao")，指定**c3p0-config.xml**中`<named-config name="lanqiao">`的配置信息，并获取数据源对象。

**org.lanqiao.dbutil.C3P0Demo.java**

```
//package、import
public class C3P0Demo {
	//获取C3P0数据源对象
	public static DataSource getDataSourceWithC3p0ByXML (){
		ComboPooledDataSource cpds = 
new ComboPooledDataSource("lanqiao");
		return cpds ; 
	}
		
	public static void main(String[] args) throws SQLException {
		Connection connection = getDataSourceWithC3p0ByXML ()
.getConnection();
		…
	}
}
```

在实际开发中，经常会遇到DBCP或C3P0，因此可以将二者封装到一个工具类中，如下：


**org.lanqiao.dbutil. DataSourceUtil.java**

```
package org.lanqiao.dbutil;
import javax.sql.DataSource;
public class DataSourceUtil {
	//通过DBC手动编码方式，获取数据源对象
	public static DataSource getDataSourceWithDBCP() 
{   …   }
	//通过DBCP配置文件方式，获取数据源对象
	public static DataSource getDataSourceWithDBCPByProperties()
{   …   }
	//通过C3P0手动编码方式，获取数据源对象
	public static DataSource getDataSourceWithC3p0()
{   …   }
	//通过C3P0配置文件方式，获取数据源对象
	public static DataSource getDataSourceWithC3p0ByXML() 
{   …   }
}
```



# 7.2 commons-dbutils工具类库 #

在“三层架构”一章中，我们曾自己封装了`executeAddOrUpdateOrDelete()`和`executeQuery ()`等方法，并讨论过：对于“增删改”的通用方法`executeAddOrUpdateOrDelete(String sql ,Object[] os)`来说，只要传入sql参数和置换参数os，就能实现相应的增删改功能；但对于查询方法`executeQuery(String sql, Object[] os)`，为了能够“通用”，我们只能封装到结果集`ResultSet`，而不能继续封装成对象或集合等类型。在本小节，我们换一种方式，通过使用commons-dbutils类库可以发现：无论是“增删改”还是“查”都可以得到彻底的封装。


commons-dbutils 是 Apache 组织提供的一个JDBC工具类库，极大的简化了JDBC的代码量，并且不会影响程序的性能。

读者可以通过Apache官网下载commons-dbutils：

[http://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi](http://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi)

与下载其他类库一样，Binaries提供了可供使用类库及说明文件，Source提供了类库的源代码；并且Binaries和Source都提供了**.tar.gz**（Linux系统）和**.zip**（Windows系统）两种格式的压缩包供读者下载。

![](http://i.imgur.com/H5WvZ0c.png)

本节使用的是最新版commons-dbutils-1.6进行讲解。

**commons-dbutils**类库主要包含了两个类和一个接口，如下：

<table>
   <tr>
      <td>全名</td>
      <td>类或接口</td>
   </tr>
   <tr>
      <td>org.apache.commons.dbutils.DbUtils</td>
      <td>类</td>
   </tr>
   <tr>
      <td>org.apache.commons.dbutils.QueryRunner</td>
      <td>类</td>
   </tr>
   <tr>
      <td>org.apache.commons.dbutils.ResultSetHandler</td>
      <td>接口</td>
   </tr>
</table>

以下，是详细的说明。


## 7.2.1 `DbUtils`类 ##

DbUtils是一个工具类，提供了关闭连接、事务提交/回滚、注册JDBC驱动程序等常用方法。DbUtils类中的方法都是public static修饰的（除了构造方法），常用方法如下表：

<table>
   <tr>
      <td>方法(省略了public static)</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>①…void close(Connection conn)throws SQLException    ②…void close(ResultSet rs)throws SQLException    ③…void close(Statement stmt)throws SQLException</td>
      <td>关闭入参类型的连接（Connection、ResultSet或Statement），并在关闭时做相应的非空判断（如rs != null等）；此外，还会抛出方法执行期间所发生的异常。</td>
   </tr>
   <tr>
      <td>①…void closeQuietly(Connection  conn)    ②…void closeQuietly(Connection conn,Statement stmt,ResultSet rs)    ③…void closeQuietly(ResultSet rs)   ④…void closeQuietly(Statement stmt)</td>
      <td>关闭入参类型的连接，并在关闭时做相应的非空判断；此外，还会将异常信息隐藏起来，如左③的源码：

    … void closeQuietly(ResultSet rs)

    {

     try

    {

    // 调用上面的close()方法

    close(rs);   

    } catch (SQLException e)

    { 

    // 隐藏异常信息，不做任何处理

    }

     }</td>
   </tr>
   <tr>
      <td>①…void commitAndClose(Connection conn) throws SQLException    ②…void commitAndCloseQuietly(Connection conn)</td>
      <td>提交并关闭连接，并在关闭时做相应的非空判断；左①：会抛出方法执行期间所发生的异常。左②：会将异常信息隐藏起来。</td>
   </tr>
   <tr>
      <td>…boolean loadDriver(String driverClassName)</td>
      <td>根据传入的驱动名，加载并注册JDBC驱动程序。</td>
   </tr>
</table>

## 7.2.2 `QueryRunner`类 ##

`QueryRunner`类主要用于执行增删改差等SQL语句。特别的，如果执行的是查询SQL，还需要结合`ResultSetHandler`接口来处理结果集。`QueryRunner`类的常用方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>①public QueryRunner()  ②public QueryRunner(javax.sql.DataSource ds)</td>
      <td>构造方法，用于生成QueryRunner的实例对象。是否需要参数，取决于事务的管理方式：①当需要手动管理事务时，使用无参的构造方法；②当需要自动管理事务（每执行完一条SQL语句，都会自动执行一次commit()方法）时，使用DataSource作为参数的构造方法。</td>
   </tr>
   <tr>
      <td>public int update(参数列表)throws SQLException</td>
      <td>update()方法根据参数列表的不通，形成了很多重载的方法，常见有以下两种：①Connection conn, String sql, Object… params   ②Connection conn, String sql    各种重载的update()方法都是用于执行增加、修改或删除操作。其中，①中的可变参数params用来作为SQL语句的置换参数（替换SQL中的占位符？）；参数列表②中没有可变参数params，因此适用于没有占位符的SQL语句；</td>
   </tr>
   <tr>
      <td>public  &lt;T&gt; T query(参数列表)throws SQLException</td>
      <td>query()方法的参数列表有四种常见形式：
     ①Connection conn, String sql, ResultSetHandler&lt;T&gt; rsh, Object… params    ②Connection conn, String sql, ResultSetHandler&lt;T&gt; rsh
       ③String sql, ResultSetHandler&lt;T&gt; rsh,Object… params    ④String sql, ResultSetHandler&lt;T&gt; rsh    各种重载的query()方法都是用于执行查询操作。其中，③和④中没有Connection连接对象，此种情况下，可以从QueryRunner构造方法的DataSource参数中获得连接。query()方法需要结合ResultSetHandler接口来使用。</td>
   </tr>
</table>

## 7.2.3 `ResultSetHandler`接口及其实现类 ##

`ResultSetHandler`接口用于处理`ResultSet`结果集，它可以将结果集中的数据封装成单个对象、数组、List、Map等不同形式。 

**`ResultSetHandler`接口有很多不同的实现类，如下：**

![](http://i.imgur.com/r2lD68B.png)


本小节会对其中常用的10个实现类做详细讲解。

讲解时，需要先导入DbUtils包（**commons-dbutils-1.6.jar**），并使用我们之前编写过的两个类和一张表，如下：

**①数据源工具类DataSourceUtil**

**org.lanqiao.dbutil. DataSourceUtil.java**

```
package org.lanqiao.dbutil;
import javax.sql.DataSource;public class DataSourceUtil {
	//通过C3P0配置文件方式，获取数据源对象
	public static DataSource getDataSourceWithC3p0ByXML() 
{   …   }
…
}
```

**②实体类Student(JavaBean)**

**org.lanqiao.entity.Student.java**

```
package org.lanqiao.entity;
public class Student {
	private int stuNo;
	private String stuName;
	private int stuAge
    	//省略setter、getter
public Student() {
	}
    //构造方法
	public Student(int stuNo, String stuName, int stuAge) {
		this.stuNo = stuNo;
		this.stuName = stuName;
		this.stuAge = stuAge;
	}
	//重写toString()
	@Override
	public String toString() {
		return "学号:"+stuNo+",姓名:"+stuName+",年龄:"+stuAge;
	}
}
```

**③数据库中的student表**

表中的数据如下：

![](http://i.imgur.com/c05i0s8.png)

**接下来，结合`QueryRunner`类的`query()`方法，进行具体演示。**

**(1) `ArrayHandler`和`ArrayListHandler`**

**①**`ArrayHandler`类可以把结果集中的第一行数据封装成`Object[]`。例如，可以将student表中的第一行数据，封装成一个`Object[]`类型的`stu`对象，类似于`Object[] stu = new Object[]{15,”王五”,23}`，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
	public static void arrayHandlerTest(){
		//创建QueryRunner对象
QueryRunner runner = 	new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
             //使用query(String sql,ResultSetHandler<T> rsh)方法执行查询操作，并且传入ArrayHandler对象作为第二个参数
			Object[] studentObj = runner.query("select * from student",
 new ArrayHandler()) ;
			//将数组转为字符串，并输出
			System.out.println(Arrays.toString(studentObj));
		} catch (SQLException e) {
			e.printStackTrace();
		}
         catch (Exception e) {
			e.printStackTrace();
		}
	}
	//测试
	public static void main(String[] args) {
		arrayHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/6HuJZZc.png)

可以发现，`ArrayHandler`只能封装结果集中的第一行数据，如果想封装结果集中的全部数据，就需要使用`ArrayListHandler`。

**②**`ArrayHandler`类可以把结果集中每一行数据都封装成一个`Object[]`对象，然后再将所有的`Object[]`组装成一个`List`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
	public static void arrayListHandlerTest(){
		//创建QueryRunner对象
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//使用query(String sql,ResultSetHandler<T> rsh)方法执行查询
操作，并且传入ArrayHandler对象作为第二个参数
			List<Object[]> studentObjList = runner.query("select * 
from student", new ArrayListHandler()) ;
			//将数组转为字符串，并输出
			for(Object[] studentObj:studentObjList){
				System.out.println(Arrays.toString(studentObj));
			}
		} catch (…) {…}
	}
	//测试
	public static void main(String[] args) {
		arrayListHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/ItzjKRo.png)

**(2) BeanHandler&lt;T&gt; 、BeanListHandler&lt;T&gt;和BeanMapHandler&lt;K,V&gt;**


`ArrayHandler`和`ArrayListHandler`是将结果集中的数据封装成`Object[]`对象，而`BeanHandler<T>`、`BeanListHandler<T>`和`BeanMapHandler<K,V>`可以将结果集中的数据封装成JavaBean对象，并且通过泛型指定具体的JavaBean类型。

**①BeanHandler&lt;T&gt;**

`BeanHandler<T>`类可以把结果集中的第一行数据封装成JavaBean。例如，可以将student表中的第一行数据，封装成一个Student类型的`stu`对象，类似于`Student stu = new Student(15,”王五”,23)`，如下：


**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
	public static void beanHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//使用query(String sql,ResultSetHandler<T> rsh)方法执行查询
操作，传入BeanHandler对象作为第二个参数，并通过泛型指定封装
的JavaBean类型是Student
			Student stu = runner.query("select * from student", 
new BeanHandler<Student>(Student.class)) ;
			//默认调用Student的toString()方法进行输出
			System.out.println(stu);
		} catch (…) {…}
	}
	//测试
	public static void main(String[] args) {
         …
		beanHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/YhEgBIm.png)

可以发现，`BeanHandler<T>`只能封装结果集中的第一行数据，如果想封装结果集中的全部数据，就需要使用`BeanListHandler<T>`。


**②BeanListHandler&lt;T&gt;**

`BeanListHandler<T>`类可以把结果集中每一行数据都封装成一个JavaBean对象，然后再将所有的JavaBean对象组装成一个`List`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void beanListHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			List<Student> stus = runner.query("select * from student", 
new BeanListHandler<Student>(Student.class)) ;
			System.out.println(stus);
		} catch (…) {…}
	}
	//测试
	public static void main(String[] args) {
         …
		beanListHandlerTest();
	}
}
```

运行结果（只显示了部分结果）：

![](http://i.imgur.com/86lvOSZ.png)


**③BeanMapHandler&lt;T&gt;**

与`BeanListHandler<T>`类似，`BeanMapHandler<T>`也会把结果集中每一行数据都封装成一个JavaBean对象，但不同的是：`BeanMapHandler<T>`会将所有的JavaBean对象组装成一个`Map`对象，如下：


**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void beanMapHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
             //通过泛型指定Map的key类型是：BigDecimal;valuel类型是：Student。
再通过构造方法的第二个参数，指定用表中的“stuNo”列作为Map的key。
			Map<BigDecimal,Student> stusMap 
= runner.query("select * from student", 
new BeanMapHandler<BigDecimal,Student>
(Student.class,"stuNo")) ;
             //获取map中key值为15的学生
			Student stu = stusMap.get(new BigDecimal(15));
			System.out.println(stu);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
         …
		beanMapHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/hUGyx5C.png)

**说明：**

**问**：此程序中，`Map`的`key`值为什么是`BigDecimal`类型，而不是`Integer`?

**答**：本程序采用的是Oracle数据库，stuNo列在表中的类型是：NUMBER(3)。Oracle在处理NUMBER类型时比较特殊：如果发现存储的是整数（如果数字15），则会默认映射为`BigDecimal`类型，而不是Integer。


**(3) MapHandler、 MapListHandler和KeyedHandler**

**①MapHandler**

MapHandler可以将结果集中的第一条数据封装到`Map`对象中，并且`key`是字段名，`value`是字段值，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void mapHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中的第一条数据封装到Map对象中
			Map<String,Object> stuMap = runner.query(
"select * from student", new MapHandler()) ;
			System.out.println(stuMap);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
…
		mapHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/xgSjr2W.png)

**②MapListHandler**

MapListHandler可以将结果集中的每一条数据都封装到`Map`对象中，并且`key`是字段名，`value`是字段值；然后再将所有的`Map`对象组装成一个`List`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    public static void mapListHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中的每一条数据都封装到Map对象中
			List<Map<String,Object>> stusMap = runner.query(
"select * from student", new MapListHandler()) ;
			System.out.println(stusMap);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
…
		mapListHandlerTest();
	}
}
```

运行结果（只显示了部分结果）：

![](http://i.imgur.com/0iFMvDH.png)


**③KeyedHandler**

KeyedHandler可以将结果集中的每一条数据都封装到`Map`对象中，并且`key`是字段名，`value`是字段值；然后再将所有的`Map`对象组装成一个范围更大的`Map`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void keyedHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中的每一条数据都封装到Map对象中
			Map<String,Map<String,Object>> stusMap = runner.query(
"select * from student", 
new KeyedHandler<String>("stuName")) ;
			System.out.println(stusMap);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
…
		keyedHandlerTest();
	}
}
```

运行结果（只显示了部分结果）：

![](http://i.imgur.com/sOzOr4C.png)


**(4)ColumnListHandler&lt;T&gt;**

`ColumnListHandler <T>`可以把结果集中某一列的值封装到`List`集合中，如下：


**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
…
public static void columnListHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中“stuName”一列的值封装到了List集合对象中：
			List<String> names = runner.query("select * from student", 
new ColumnListHandler<String>("stuName")) ;
			//默认调用Student的toString()方法进行输出
			System.out.println(names);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
        …
	   columnListHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/q8BSDtD.png)

**(5) ScalarHandler&lt;T&gt;**

如果执行的是单值查询，如`select count(*) from student`或`select name from student where id = 15`等结果为单值得查询，就需要使用`ScalarHandler<T>`类，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
…
    public static void scalarHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//单值查询：查询学生总人数
			BigDecimal count = runner.query("select count(*) 
from student", new ScalarHandler<BigDecimal>()) ;
			System.out.println(count);
			//单值查询：查询学号为15的学生姓名
			String stuName = runner.query("select stuName from student
 where stuNo = 15", new ScalarHandler<String>()) ;
			System.out.println(stuName);		
} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
  …
		scalarHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/S0E5WTp.png)

**以上就是ResultSetHandler接口的10个实现类的具体用法。为了方便读者对比记忆，现做以下总结：**


<table>
   <tr>
      <td>ResultSetHandler接口的实现类</td>
      <td>简介</td>
      <td>共同点</td>
   </tr>
   <tr>
      <td>ArrayHandler</td>
      <td>将第一行数据封装成Object[]</td>
      <td rowspan="3">封装结果集中的第一行数据，适用于只有一条查询结果的SQL，如：select * from student where id = 15</td>
   </tr>
   <tr>
      <td>BeanHandler&lt;T&gt;</td>
      <td>将第一行数据封装成JavaBean</td>
   </tr>
   <tr>
      <td>BeanMapHandler</td>
      <td>将第一条数据封装成Map&lt;列名类型,列值类型&gt;</td>
   </tr>
   <tr>
      <td>ArrayListHandler</td>
      <td>将所有数据封装成List&lt;Object[]&gt;</td>
      <td rowspan="6">封装结果集中的全部数据，适用于有多条查询结果的SQL，如：select * from student</td>
   </tr>
   <tr>
      <td>ColumnListHandler&lt;T&gt;</td>
      <td>将某一列的所有数据，封装成List&lt;某一列的类型&gt;</td>
   </tr>
   <tr>
      <td>MapListHandler</td>
      <td>将所有数据封装成List&lt;Map&lt;列名类型,列值类型&gt;&gt;</td>
   </tr>
   <tr>
      <td>KeyedHandler&lt;K&gt;</td>
      <td>将所有数据封装成Map&lt;某一列的Java类型,Map&lt;列名类型,列值类型&gt;&gt;</td>
   </tr>
   <tr>
      <td>BeanListHandler&lt;T&gt;</td>
      <td>将所有数据封装成List&lt;JavaBean&gt;</td>
   </tr>
   <tr>
      <td>BeanMapHandler&lt;K, V&gt;</td>
      <td>将所有数据封装成Map&lt;某一列的Java类型,JavaBean&gt;</td>
   </tr>
   <tr>
      <td>ScalarHandler&lt;T&gt;</td>
      <td>获取单值</td>
      <td>单值查询</td>
   </tr>
</table>

## 7.2.4 增删改操作 ##


现在，我们再对`QueryRunner`类中，用于增删改的`update()`方法做以演示，如下：

**org.lanqiao.dbutil.UpdateDemo.java**

```
package org.lanqiao.dbutil;
import java.sql.SQLException;
import org.apache.commons.dbutils.QueryRunner;
public class UpdateDemo {
	//增加
	public static void insertTest() {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
        //增加的SQL语句
		String insertSql = "insert into student(stuNo,stuName,stuAge)
 values(?,?,?)";
         //SQL语句中的置换参数
		Object[] params = {35,"赵六",66};
		try {
             //增删改的通用方法update()
			int count = runner.update(insertSql,params) ;
			System.out.println("成功增加"+count+"条数据");
		} catch (…) {…}
	}
	
	//删除
	public static void deleteTest() {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		String deleteSql = "delete from student where stuNo = 35";
		try {
			int count = runner.update(deleteSql) ;
			System.out.println("成功删除"+count+"条数据");
		} catch (…) {…}
	}
	
	//修改
	public static void updateTest() {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		String updateSql = "update student set stuName = ?  ,stuAge = ?
 where stuNo = ?";
		Object[] params = {"孙琪",27,35};
		try {
			int count = runner.update(updateSql,params) ;
			System.out.println("成功修改"+count+"条数据");
		} catch (…) {…}
	}

	// 测试   
	public static void main(String[] args) {
		insertTest();
		updateTest();
		deleteTest();
	}
}
```

运行结果：

![](http://i.imgur.com/16U5Tcz.png)

## 7.2.5 手动处理事务 ##

**(1) ThreadLocal&lt;T&gt;**

在学习事务处理之前，我们有必要先了解一下`ThreadLocal<T>`类。
	
ThreadLocal可以为变量在每个线程中都创建了一个副本，每个线程可以访问自己内部的副本变量。因此，ThreadLocal被称为线程本地变量（或线程本地存储）。
	
先看下面一个例子：

```
public class ConnectionManager {
	  private static Connection conn = null;
	     public static Connection getConnection() throws …{
	        if(conn == null){
	            conn = DriverManager.getConnection(...);
	        }
	        return conn;
	    }
	     
	    public static void closeConnection() throws …{
	        if(conn!=null)
	            conn.close();
	    }
}
```

这段代码在单线程中使用没有任何问题；但如果是在多线程中使用，就存在线程安全问题，例如：

**①**因为conn是静态全局变量（用于共享），那么就有可能在一个线程使用conn操作数据库时，另外一个线程也同时在调用`closeConnection()`关闭链接；

**②**如果多个线程同时进入if语句，那么在`getConnection()`方法中就会多次创建`conn`对象。对于这样的线程问题，读者可能会想到用“线程同步”来解决：将conn变量、`getConnection()`和`closeConnection()`进行同步处理。对于本例，“线程同步”虽然可以解决问题，但却会造成极大的性能影响：当一个线程在使用conn访问数据库时，其他线程只能等待。

我们仔细来分析这个问题：本例的线程安全问题，实质是因为conn变量、`getConnection()`和`closeConnection()`都是共享的static变量（或方法）而造成的，那么此三者如果不是共享的static呢？实际上，一个线程只需要维护自己的conn变量，而不需要关心其他线程是否对各自的conn进行了修改。因此，不是staitc也可以，如下：

```
public class ConnectionManager {
	// 没有static修饰
	private Connection conn = null;
	// 没有static修饰
	public Connection getConnection() throws SQLException {
		if (conn == null) {
			conn = DriverManager.getConnection("...");
		}
		return conn;
	}
	// 没有static修饰
	public void closeConnection() throws SQLException {
		if (conn != null)
			conn.close();
	}
}
class Dao{
    public void insert() throws SQLException {
      	//将connectionManager和conn定义为局部变量
        ConnectionManager connectionManager = new ConnectionManager();
        Connection conn = connectionManager.getConnection();
        //使用conn访问数据库...
        connectionManager.closeConnection();
    }
}
```

以上，将conn及相关方法的static修饰符去掉，然后在每个使用conn的方法中（如`insert()`）都创建局部变量。这样一来，因为每次都是在方法内部创建的连接，那么线程之间自然不存在线程安全问题。但是，由于在方法中需要频繁地开启和关闭数据库连接，就会导致服务器压力非常大，并且严重影响程序执行性能。

如何既不影响性能，也能避免线程安全问题？使用`ThreadLocal<T>`！`ThreadLocal<T>`在每个线程中对该变量会创建一个副本；即每个线程内部都会有一个该变量的副本，该副本在线程内部任何地方都可以共享使用，但不同线程的副本之间互不影响。

**`ThreadLocal<T>`类中有以下几个方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public T get()</td>
      <td>获取ThreadLocal在当前线程中保存的变量副本</td>
   </tr>
   <tr>
      <td>public void set(T value)</td>
      <td>设置当前线程中变量的副本</td>
   </tr>
   <tr>
      <td>public void remove()</td>
      <td>移除当前线程中变量的副本</td>
   </tr>
   <tr>
      <td>protected T initialValue()</td>
      <td>延迟加载的方法，一般在使用时重写该方法。</td>
   </tr>
</table>


`ThreadLocal<T>`类的具体使用，我们会在“手动处理事务”中进行演示。

**(2)手动处理事务**

前面讲过，**如果使用`QueryRunner`类的无参构造，我们就需要手动管理事务；如果使用有参构造`QueryRunner(DataSource ds)`，DbUtils就会替我们自动管理事务。**之前演示的增删改查，使用的都是有参构造，即自动管理事务；以下，就来讲解如何使用无参构造来实现手动的事务管理。

通过模拟一个“银行转账”的事务，演示具体的步骤：

**①创建银行账户表**

创建银行账户表account，并增加两条数据，如下：

![](http://i.imgur.com/vuItZpg.png)


**②创建实体类**

创建与account表对应的实体类**Account.java**，如下：


**org.lanqiao.entity.Account.java**

```
package org.lanqiao.entity;
public class Account {
	private int id ;
	private String name; 
	private double balance ;
//setter、getter
}
```

**③创建JDBC工具类**

创建JDBCUtil类，用于提供创建连接、开启事务、提交事务、关闭连接等方法。我们知道，一个事务对应一个Connection，但一个事务可能涉及多个DAO操作。如果DAO操作中的Connection是从连接池获取，那么多个DAO操作就会用到多个Connection，这样是无法完成一个事务的（一个事务用到了多个Connection）。因此，需要使用`ThreadLocal<T>`类。

我们可以生成一个`Connection`对象，然后放在ThreadLocal中，那么这个线程中的任何对象都可以共享这个`Connection`对象，最后在线程结束后删除这个连接。这样就保证了一个事务一个连接。如下：

**org.lanqiao.dbutil.JDBCUtil.java**

```
//package、import
public class JDBCUtil {
	// 定义ThreadLocal对象，用于存放Connection对象
	private static ThreadLocal<Connection> threadLocal 
= new ThreadLocal<Connection>();
	// 定义数据源对象
	private static DataSource ds = new ComboPooledDataSource();

	// 获取c3p0数据源对象(从c3p0-config.xml中读取默认的数据库配置)
	public static DataSource getDataSource() {
		return ds;
	}

	// 从c3p0连接池中，获取Connection连接对象
	public static Connection getConnection() {
		Connection conn = threadLocal.get();
		try {
			if (conn == null) {
				conn = ds.getConnection();
			}
			threadLocal.set(conn);
		} catch (…) {…}
		return conn;
	}

	// 开启事务
	public static void beginTransaction() {
		Connection conn = getConnection();
		try {
			// 手动开始事务
			conn.setAutoCommit(false);
		} catch (…) {…}
	}

	// 提交事务
	public static void commitTransaction() {
		Connection conn = threadLocal.get();
		try {
			if (conn != null) {
				// 提交事务
				conn.commit();
			}
		} catch (…) {…}
	}

	// 回滚事务
	public static void rollbackTransaction() {
		Connection conn = threadLocal.get();
		try {
			if (conn != null) {
				// 回滚事务
				conn.rollback();
			}
		} catch (…) {…}
	}
     // 关闭连接
	public static void close() {
		Connection conn = threadLocal.get();
		try {
			if (conn != null) {
				conn.close();
			}

		} catch (…) {…}
finally {
			// 从集合中移除当前绑定的连接
			threadLocal.remove();
			conn = null;
		}
	}
}
```

**④创建DAO层**

创建用于模拟用户查询、转入、转出等数据库操作的DAO层，如下：

**接口：**

**org.lanqiao.dao.IAccountDao.java**

```
import org.lanqiao.entity.Account;
public interface IAccountDao {
    //根据姓名，查询账户
	public abstract Account queryAccountByName(String name)
 throws SQLException;
    //修改账户（增加余额、减少余额）
public abstract void updateAccount(Account account) 
throws SQLException;
}
```

**实现类：**

**org.lanqiao.dao.impl.AccountDaoImpl.java**

```
//package、import
public class AccountDaoImpl implements IAccountDao{
	@Override
	public Account queryAccountByName(String name)throws SQLException {
		QueryRunner runner = new QueryRunner();
		Connection conn = JDBCUtil.getConnection();
		String querySql = "select * from account where name = ?" ;
		Object[] params = {name} ;
		Account account = null ; 
		account = runner.query(conn, querySql,
new BeanHandler<Account>(Account.class),params);
		return account;
	}

	@Override
	public void updateAccount(Account account) throws SQLException {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		Connection conn = JDBCUtil.getConnection() ;
		String updateSql = "update account set balance = ? where name = ?" ;
		Object[] params = { account.getBalance(), account.getName() };
		runner.update(conn, updateSql, params);
	}
}
```

**⑤创建Service层**

模拟转账业务操作，如下：

**接口：org.lanqiao.service.IAccountService.java**

```
public interface IAccountService {
	public abstract void transfer(String fromAccountName,
String toAccountName,double transferMoney);
}
```

**实现类：org.lanqiao.service.impl.AccountServiceImpl.java**

```
//package、import
public class AccountServiceImpl implements IAccountService {
	public void transfer(String fromAccountName, String toAccountName,
 double transferMoney) {
		try {
			// 开启事务
			JDBCUtil.beginTransaction();
			IAccountDao accountDao = new AccountDaoImpl();
			// 付款方
			Account fromAccount = accountDao
.queryAccountByName(fromAccountName);
			// 收款方
			Account toAccount = accountDao
.queryAccountByName(toAccountName);
			// 转账
			if (transferMoney < fromAccount.getBalance()) {
				// 付款方的余额减少
				double fromBalance = fromAccount.getBalance() 
- transferMoney;
				fromAccount.setBalance(fromBalance);
				// 收款方的余额增加
				double toBalance = toAccount.getBalance() + transferMoney;
				toAccount.setBalance(toBalance);
				// 更新账户
				accountDao.updateAccount(fromAccount);
				accountDao.updateAccount(toAccount);
				System.out.println("转账成功");
				// 提交事务
				JDBCUtil.commitTransaction();
				System.out.println("提交成功");
			} else {
				System.out.println("余额不足，转账失败！");
			}
		} catch (SQLException e) {
			System.out.println("提交失败！回滚...");
			// 回滚事务
			JDBCUtil.rollbackTransaction();
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 关闭事务
			JDBCUtil.close();
		}
	}
}
```

**⑥测试**

编写`main()`方法，测试转账业务，如下

**org.lanqiao.test.TestAccountTransfer.java**

```
//package、import
public class TestAccountTransfer {
	public static void main(String[] args) {
		IAccountService accountService = new AccountServiceImpl();
         //张三给李四转账1000.0元
		accountService.transfer("张三", "李四", 1000.0);
	}
}
```

测试之前，accout表的数据如下：

![](http://i.imgur.com/gmjTGxO.png)

执行`main()`方法进行测试，运行结果：

![](http://i.imgur.com/ORkwuHA.png)

此时，account表的数据如下：

![](http://i.imgur.com/NpnfhOV.png)

可以看出，转账功能已经成功实现了。



