---

layout: post

title: MyBatis配置文件深入

category: MyBatis框架

tags: MyBatis

description: 本章将介绍MyBatis配置文件。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE MyBatis

---

# 15.1 `properties`属性 #

我们之前是把数据库信息，直接写在MyBatis配置文件**conf.xml**中，如下，

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

为了方便的查阅和维护数据库信息，我们可以把数据库信息单独写在一个属性文件中，以后需要使用时再直接引用即可。例如，先在`src`下新建一个**properties**文件，如图，

![](/public/img/mybatis-zq/15.1.png)


*图15-01*

然后将数据库信息以`“key=value”`的形式，写在该属性文件中，如下，

**db.properties**

```
driver=oracle.jdbc.OracleDriver
url=jdbc:oracle:thin:@127.0.0.1:1521:XE
username=system
password=sa
```

最后，再在配置文件中，通过`<properties>`标签引入该属性文件，并以形如EL的方式引用属性值，如下，

**conf.xml**

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

# 15.2 settings全局参数配置 #

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
      <td>在全局范围内启用或禁用延迟加载。当禁用时，所有相关联的对象都将立即加载（热加载）。</td>
      <td>true（默认）、false</td>
   </tr>
   <tr>
      <td>aggressiveLazyLoading</td>
      <td>启用时，有延迟加载属性的对象，在被调用时将会完全加载所有属性（立即加载）。否则，每一个属性都将按需加载（即延迟加载）。</td>
      <td>true（默认）、false</td>
   </tr>
   <tr>
      <td>multipleResultSetsEnabled</td>
      <td>允许或禁止执行一条单独的SQL语句后返回多条结果（结果集）；需要驱动程序的支持</td>
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
      <td>允许或禁止使用嵌套的语句</td>
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

以下，是在MyBatis配置文件**conf.xml**中设置`settings`的示例代码：

**conf.xml**

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

# 15.3 为实体类自定义别名 #

之前在SQL映射文件中，如果`parameterType`或`resultType`为实体类的对象类型，我们可以通过全类名的形式指定的（即“包名+类名”）。此外，我们还可以在MyBatis配置文件**conf.xml**中为实体类设置别名，然后再在SQL映射文件中使用该别名。

例如，我们之前在第一个MyBatis示例中，SQL映射文件中的`resultType`属性值，就是通过全类名指定的，如下

**org/lanqiao/mapper/studentMapper.xml**

```
…
<select id="queryStudentByNo" parameterType="int"
		resultType="org.lanqiao.entity.Student">
		select * from student where stuNo=#{stuNo}
</select>
…
```

下面再通过定义别名的方式来指定`resultType`的值。

## 15.3.1 单个别名定义 ##

**(1)**在MyBatis配置文件中，为实体类定义别名

**conf.xml**

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

**(2)**在SQL映射文件中引用别名

**org/lanqiao/mapper/studentMapper.xml**

```
…
<select id="queryStudentByNo" parameterType="int"  resultType="student">
	select * from student where stuNo=#{stuNo}
</select>
…
```

## 15.3.2 批量定义别名 ##

如果用上面的方法，当要定义多个别名时，就必须配置多个`<typeAlias>`。我们还可以一次性的，定义一批别名。具体如下，

**(1)**在MyBatis配置文件中，给一个`package`中的所有实体类定义别名

**conf.xml**

```
<typeAliases>
		<package name="org.lanqiao.entity"/>
		<package name="其他包"/>
</typeAliases>
```

以上，就给`“org.lanqiao.entity”`包中的所有实体类都自动定义了别名，别名就是“不带包名的类名（不区分大小写）”。例如，以上就将 `org.lanqiao.entity.Student`类的别名定义为`Student`、`student`、`sTUdent`或`STUDENT`等。

**(2)**在SQL映射文件中引用别名

与“单个别名定义”中的方法相同，即直接使用`student`（或`Student`等）作为`resultType`的属性值。本书后面使用到的类型，都采用的是批量定义的别名。

除了我们自己定义的别名以外，MyBatis还对常见的Java数据类型都内置了别名，并且这些别名也都是不区分大小写的，如下，

<table>
   <tr>
      <td>别名</td>
      <td>映射的类型</td>
      <td>别名</td>
      <td>映射的类型</td>
   </tr>
   <tr>
      <td>_byte</td>
      <td>byte</td>
      <td>_double</td>
      <td>double</td>
   </tr>
   <tr>
      <td>_long</td>
      <td>long</td>
      <td>_float</td>
      <td>float</td>
   </tr>
   <tr>
      <td>_short</td>
      <td>short</td>
      <td>_boolean</td>
      <td>boolean</td>
   </tr>
   <tr>
      <td>_int</td>
      <td>int</td>
      <td>string</td>
      <td>String</td>
   </tr>
   <tr>
      <td>_integer</td>
      <td>int</td>
      <td>byte</td>
      <td>Byte</td>
   </tr>
   <tr>
      <td>long</td>
      <td>Long</td>
      <td>short</td>
      <td>Short</td>
   </tr>
   <tr>
      <td>int</td>
      <td>Integer</td>
      <td>double</td>
      <td>Double</td>
   </tr>
   <tr>
      <td>integer</td>
      <td>Integer</td>
      <td>float</td>
      <td>Float</td>
   </tr>
   <tr>
      <td>boolean</td>
      <td>Boolean</td>
      <td>date</td>
      <td>Date</td>
   </tr>
   <tr>
      <td>decimal</td>
      <td>BigDecimal</td>
      <td>bigdecimal</td>
      <td>BigDecimal</td>
   </tr>
   <tr>
      <td>object</td>
      <td>Object</td>
      <td>map</td>
      <td>Map</td>
   </tr>
   <tr>
      <td>hashmap</td>
      <td>HashMap</td>
      <td>list</td>
      <td>List</td>
   </tr>
   <tr>
      <td>arraylist</td>
      <td>ArrayList</td>
      <td>collection</td>
      <td>Collection</td>
   </tr>
   <tr>
      <td>iterator</td>
      <td>Iterator</td>
      <td></td>
      <td></td>
   </tr>
</table>

# 15.4 typeHandlers类型处理器 #

类型处理器用于**java**类型和**jdbc**类型之间的映射。例如，之前在SQL映射文件中有如下配置，

**org/lanqiao/mapper/studentMapper.xml**

```
…
<select id="queryStudentByNo" parameterType="int" resultType="student">
			select * from student where stuNo=#{stuNo}
</select>
…
```

MyBatis内置了一些常用类型处理器，可以将`parameterType`中传入的类型，自动转为JDBC需要的类型。例如，当给SQL映射文件传入一个`int`型的数字31时，`…where stuNo=#{stuNo}`就会变为`…where stuNo=31`；而如果SQL语句是`…where stuName=#{stuName}`，当传入一个`String`类型的“张三”时，则就会变为`…where stuName='张三'`，即自动为`String`类型加上了引号。

## 15.4.1 内置的类型处理器 ##

Mybatis内置的类型处理器如下，

<table>
   <tr>
      <td>类型处理器</td>
      <td>Java类型</td>
      <td>JDBC类型</td>
   </tr>
   <tr>
      <td>BooleanTypeHandler </td>
      <td>Boolean，boolean </td>
      <td>任何兼容的布尔值</td>
   </tr>
   <tr>
      <td>ByteTypeHandler </td>
      <td>Byte，byte </td>
      <td>任何兼容的数字或字节类型</td>
   </tr>
   <tr>
      <td>ShortTypeHandler </td>
      <td>Short，short </td>
      <td>任何兼容的数字或短整型</td>
   </tr>
   <tr>
      <td>IntegerTypeHandler </td>
      <td>Integer，int </td>
      <td>任何兼容的数字和整型</td>
   </tr>
   <tr>
      <td>LongTypeHandler </td>
      <td>Long，long </td>
      <td>任何兼容的数字或长整型</td>
   </tr>
   <tr>
      <td>FloatTypeHandler </td>
      <td>Float，float </td>
      <td>任何兼容的数字或单精度浮点型</td>
   </tr>
   <tr>
      <td>DoubleTypeHandler </td>
      <td>Double，double </td>
      <td>任何兼容的数字或双精度浮点型</td>
   </tr>
   <tr>
      <td>BigDecimalTypeHandler</td>
      <td>BigDecimal </td>
      <td>任何兼容的数字或十进制小数类型</td>
   </tr>
   <tr>
      <td>StringTypeHandler </td>
      <td>String </td>
      <td>CHAR和VARCHAR类型</td>
   </tr>
   <tr>
      <td>ClobTypeHandler </td>
      <td>String </td>
      <td>CLOB和LONGVARCHAR类型</td>
   </tr>
   <tr>
      <td>NStringTypeHandler </td>
      <td>String </td>
      <td>NVARCHAR和NCHAR类型</td>
   </tr>
   <tr>
      <td>NClobTypeHandler </td>
      <td>String </td>
      <td>NCLOB类型</td>
   </tr>
   <tr>
      <td>ByteArrayTypeHandler </td>
      <td>byte[] </td>
      <td>任何兼容的字节流类型</td>
   </tr>
   <tr>
      <td>BlobTypeHandler </td>
      <td>byte[] </td>
      <td>BLOB和LONGVARBINARY类型</td>
   </tr>
   <tr>
      <td>DateTypeHandler </td>
      <td>Date（java.util）</td>
      <td>TIMESTAMP类型</td>
   </tr>
   <tr>
      <td>DateOnlyTypeHandler </td>
      <td>Date（java.util）</td>
      <td>DATE类型</td>
   </tr>
   <tr>
      <td>TimeOnlyTypeHandler </td>
      <td>Date（java.util）</td>
      <td>TIME类型</td>
   </tr>
   <tr>
      <td>SqlTimestampTypeHandler </td>
      <td>Timestamp（java.sql）</td>
      <td>TIMESTAMP类型</td>
   </tr>
   <tr>
      <td>SqlDateTypeHandler </td>
      <td>Date（java.sql）</td>
      <td>DATE类型</td>
   </tr>
   <tr>
      <td>SqlTimeTypeHandler </td>
      <td>Time（java.sql）</td>
      <td>TIME类型</td>
   </tr>
   <tr>
      <td>ObjectTypeHandler </td>
      <td>任意</td>
      <td>其他或未指定类型</td>
   </tr>
   <tr>
      <td>EnumTypeHandler </td>
      <td>Enumeration类型</td>
      <td>VARCHAR。任何兼容的字符串类型，作为代码存储（而不是索引）。</td>
   </tr>
</table>

## 15.4.1 自定义类型处理器 ##

除了MyBatis内置的处理器以外，我们还可以自定义类型处理器，来实现特定的**java**类型与**jdbc**类型之间的映射。

先给学生实体类`Student.java`中增加一个表示性别的属性`（boolean stuSex）`，并给学生表增加一个性别字段`(number stuSex)`。由于属性`stuSex`是`boolean`类型，而字段`stuSex`是数字`number`类型，因此我们需要实现一个类型处理器，用来实现**java**中`boolean`类型和数据库中`number`类型之间的映射和转换。

为了实现类型转换，现在约定：

学生实体类中的`stuSex`属性：true表示男，false表示女

学生表中的`stuSex`字段：   1表示男，0表示女。

**开发并使用自定义类型处理器的具体步骤如下：**

#### (1)创建自定义类型处理器 ####

使用MyBatis开发自定义类型处理器，需要实现`TypeHandler`接口（或继承`BaseTypeHandler`抽象类）。

TypeHandler是开发自定义类型转换器必须实现的接口，但为了便于开发，MyBatis还提供了BaseTypeHandler抽象类。BaseTypeHandler底层实现了TypeHandler接口，并对接口中的方法做了简单处理以方便我们使用，所以我们可以直接继承BaseTypeHandler抽象类。如下，自定义的类型处理器BooleanAndIntConverter，用于将java中Boolean类型与jdbc中NUMBER类型之间的相互转换：

**org.lanqiao.converter.BooleanAndIntConverter.java**

```
public class BooleanAndIntConverter extends BaseTypeHandler<Boolean>
{
	/**
	 * java类型(booean)-->JDBC类型(NUMBER)
	 * 
	 * @param ps:
	 *            当前的PreparedStatement对象
	 * @param i
	 *            :当前参数的位置
	 * @param parameter:
	 *            当前参数值
	 */
	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, Boolean parameter, JdbcType jdbcType)
			throws SQLException
	{
		/*
		 * 如果Java类型的parameter==true，则在数据库中存储jdbc类型的数字1；
		 * 如果Java类型的parameter==false，则在数据库中存储jdbc类型的数字0；
		 */
		if (parameter)
		{
			ps.setInt(i, 1);
		}
		else
		{
			ps.setInt(i, 0);
		}
	}

	/**
	 *  JDBC类型(NUMBER)-->java类型(booean)
	 */
	@Override
	public Boolean getNullableResult(ResultSet rs, String columnName) throws SQLException
	{
		/*
		 *  通过字段名获取值
		 */
		int sexNum = rs.getInt(columnName);
		/*
		 * 如果数据库中的jdbc变量sexNum == 1，则返回java类型的true； 如果数据库中的jdbc变量sexNum ==
		 * 0，则返回java类型的false；
		 */
		if (sexNum == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 *  JDBC类型(NUMBER)-->java类型(booean)
	 */
	@Override
	public Boolean getNullableResult(ResultSet rs, int columnIndex) throws SQLException
	{
		/*
		 *  通过字段的索引获取值
		 */
		int sexNum = rs.getInt(columnIndex);
		if (sexNum == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 *  JDBC类型(NUMBER)-->java类型(booean)
	 */
	@Override
	public Boolean getNullableResult(CallableStatement cs, int columnIndex) throws SQLException
	{
		/*
		 *  通过调用存储过程获取值
		 */
		int sexNum = cs.getInt(columnIndex);
		if (sexNum == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}
```

#### (2)配置自定义类型处理器 ####

自定义类型处理器BooleanAndIntConverter开发完毕后，还需要将它注册到配置文件中，如下：

**MyBatis配置文件conf.xml**

```
<configuration>
	…
	<typeAliases> … </typeAliases>

	<!-- 配置自定义类型处理器，并指定是用于java中Boolean类型与jdbc中INTEGER类型之间的转换 -->
	 <typeHandlers>  
       <typeHandler handler="org.lanqiao.converter
.BooleanAndIntConverter" 
javaType="java.lang.Boolean" jdbcType="INTEGER"/>  
    </typeHandlers> 

	<environments default="development">
		…
	</environments>
	…
</configuration>
```

#### (3)使用自定义类型处理器 ####

程序运行之前，数据库中`student`表的数据如下：

![](/public/img/mybatis-zq/15.2.png)

*图15-02*

学生类`Student`的属性如下：

**Student.java**

```
public class Student{
	//学号
	private int stuNo;
	//姓名 
	private String stuName;
	//性别： true：男，false:女
	private boolean stuSex ;
    //setter、getter
}
```

现在，使用自定义的类型处理器BooleanAndIntConverter来实现`Student`的`boolean`类型的`stuSex`属性，与`student`表中`NUMBER`类型的`stuSex`字段之间的类型转换处理。

**①查询时，使用自定义类型处理器（jdbc类型的`NUMBER`→ java类型的`Boolean`）**

**SQL映射文件：studentMapper.xml**

```
<select id="queryStudentByStuNoWithConverter" 
parameterType="int" resultMap="studentResult">  
       select * from student where stuNo=#{stuNo}  
 </select> 
 
<resultMap id="studentResult" type="org.lanqiao.entity.Student">  
    <id property="stuNo" column="stuNo"/>
	<result property="stuName" column="stuName"/>
<result property="stuSex"  column="stuSex"
javaType="java.lang.Boolean" jdbcType="INTEGER"/>  
</resultMap>  
```

使用resultMap中`result`元素的 `javaType`和`jdbcType`属性，指定当从数据库中查询到INTEGER类型（JDBC类型）的`stuSex`字段值时，就会将查询结果自动转为`Boolean`类型（JAVA类型）的值（如果从数据库中查询到1，就转为true；如果查到0，就转为false）。

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
   …
	Student queryStudentByStuNoWithConverter(int stuNo);
}
```

**测试方法：TestMyBatis.java**

```
public static void testQueryStudentByStuNoWithConverter() throws IOException
{
	 …
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
	Student student 
= studentMapper.queryStudentByStuNoWithConverter(34);
	System.out.println(student.getStuNo()","
+student.getStuName()+","+student.getStuSex());
	session.close();
}
```

执行测试方法，运行结果：

![](/public/img/mybatis-zq/15.3.png)

*图15-03*

**②增/删/改时，使用自定义类型处理器（java类型的`Boolean`→ jdbc类型的`NUMBER`）**

**SQL映射文件：studentMapper.xml**

```
<insert id="addStudentWithConverter" 
parameterType="org.lanqiao.entity.Student" >  
   insert into student(stuNo,stuName,stuSex) values(#{stuNo},#{stuName}
,#{stuSex, javaType=java.lang.Boolean, jdbcType=INTEGER}) 
</insert>
```

通过`#{stuSex, javaType=java.lang.Boolean, jdbcType=INTEGER}`指定：当执行增加操作时，MyBatis就会把JAVA中Boolean类型的stuSex值转为JDBC中INTEGER类型的值并存储到数据库中。

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
    …
	public abstract void addStudentWithConverter(Student student);
}
```

**测试方法：TestMyBatis.java**

```
public static void testAddStudentWithConverter() throws IOException
{
	…
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
	Student student = new Student();
	student.setStuNo(38);
	student.setStuName("王二小");
	student.setStuSex(true);//男
	studentMapper.addStudentWithConverter(student);
	session.commit();
	session.close();
}
```

执行测试方法，就会在数据库中新增一条“王二小”的记录，如下：

![](/public/img/mybatis-zq/15.4.png)

*图15-04*

即实现了从JAVA类型的boolean值true，到JDBC类型的INTEGER值1的类型转换处理。

# 15.5 练习题 #

1.将数据库信息写在properties文件后，如何在MyBatis主配置文件中引用？（难度★）

2.如何批量为实体类定义别名？（难度★★）

3.使用MyBatis替换JDBC，优化第八章练习题中的“部门管理系统”。（难度★★★★）