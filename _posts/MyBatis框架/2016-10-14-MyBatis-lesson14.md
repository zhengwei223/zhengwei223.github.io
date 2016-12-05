---

layout: post

title: SQL映射文件深入

category: MyBatis框架

tags: MyBatis

description: 本章将系统介绍SQL映射文件深入。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE MyBatis

---

# 16.1 输入参数 #

## 16.1.1 输入参数为简单类型 ##

```
…
<mapper namespace="…">
	<select id=".."  parameterType=".."  	resultType="..">
		SQL语句，如select * from student where stuNo=#{stuNo}
	</select>
</mapper>
```

如上，`parameterType`用于指定输入参数的类型，并且可以通过`#{stuNo}`来获取到该参数值。

实际上，“#{参数}”就表示一个“占位符”，相当于`PreparedStatement`中的占位符“？”。如果输入参数是简单类型（即8个基本类型或`String`类型），那么“参数”的名字也是可以任意的（如`#{studentNo}`、`#{abc}`等”）。此外，“#{参数}”还可以防止SQL注入，并且会为传入`String`类型的参数值自动加上引号，例如，若在查询语句中传入一个`String`类型的值，如下，

**SQL映射文件：studentMapper.xml**

```
<!-- 根据姓名，查询学生 -->
 	<select id="queryStudentByName" parameterType="string" 
resultType="student"> 
		select * from student where stuName=#{stuName} 
	</select>
…
```

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
	…
//按照“约定”编写的查询方法
	public abstract Student queryStudentByName(String stuName);
}
```

**测试方法：TestMyBatis.java**

```
// 根据姓名查询一个学生
public static void testQueryByName() throws IOException
{
	…
	//使用Mapper动态代理方式查询
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
    // 执行查询，传入String类型的"张三"
	Student student = studentMapper.queryStudentByName("张三");
		…
}
```

在通过`queryStudentByName("张三")`将`String`类型的"张三"传入studentMapper.xml中的`#{stuName}`时，`< select >`元素中的SQL为：`select * from student where stuName= '张三 '`，即`#{stuName}`自动为字符串类型的值加上了引号。

但如果查询语句中传入一个`int`类型的值，则“#{参数}”不会为其加引号，如下

**SQL映射文件：studentMapper.xml**

```
…
<!--根据学号查询一个学生 -->
<mapper namespace="org.lanqiao.entity.studentMapper">
	<select id="getStudentByNo" parameterType="int"
		resultType="student">
		select * from student where stuNo=#{stuNo}
	</select>
</mapper>
```

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
	…
//按照“约定”编写的查询方法
	public abstract Student queryStudentByNo(int stuNo);
}
```

**测试方法：TestMyBatis.java**

```
    // 根据学号查询一个学生
	public static void testQueryByNo() throws IOException
	{
	   …
		IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
// 执行查询，传入int类型的32
		Student student = studentMapper.queryStudentByNo(32);	
		…
	}
```

在通过`queryStudentByNo(32)`将`int`类型的32传入**studentMapper.xml**中的`#{stuNo}`时，`< select >`元素中的SQL为：`select * from student where stuNo=32`，即#`{stuNo}`没有为非`String`类型的参数加上双引号。

除了“`#{参数}`”以外，还可以使用“`${value}`”来获取输入的参数值。`${value}`的作用就是输出变量的值。但在解析简单类型的参数值时，“`#{ value }`”中的参数名“`value`”是独一无二的，不能改成其他名字。并且这种方式不能防止SQL注意，有很大的安全隐患。“`${ value }`”主要用于动态排序（Order By）。因为“`${ value }`”仅仅是输出变量值，因此不会像#{参数}那样为字符串类型的值加上引号。例如，如果需要按照“学号”排序，如下：

**SQL映射文件：studentMapper.xml**

```
…
	<!-- 查询全部学生，并按学号升序排列 -->
<select id="queryAllStudentsOrderByStuNo"  parameterType="string"
resultType="student">
		select * from student order by ${value} asc
</select>
…
```

**测试方法：TestMyBatis.java**

```
// 查询全部学生，并按学号升序排序
public static void testQueryAllOrderByStuNo() throws IOException
{
	…
	// 指定sql语句对应的标识字符串：namespace+id
	String statement = "org.lanqiao.mapper.IStudentMapper" 
+ ".queryAllStudentsOrderByStuNo";
	// 执行查询，并且将查询结果按照传入的“stuNo”列排序
			List<Student> students 
= session.selectList(statement,"stuNo");
	 …
}
```

执行时的SQL语句为：**select * from student order by stuNo asc**，即可正常运行。

但如果使用“`#{参数}`”接收传入需要排序的列名，如下：

**studentMapper.xml**

```
…
	<!-- 查询全部学生，并按学号升序排列 -->
<select id=" queryAllStudentsOrderByStuNo" parameterType="string"
resultType="student">
		select * from student order by #{stuNo} asc
	</select>
…
```

执行时的SQL语句为：`select * from student order by 'stuNo ' asc`，即“`#{参数}`”方式给传入的`String`类型的列名加上了引号，导致了SQL语法的错误。因此，要想实现`orderby` 动态参数排序，必须使用“`${value}`”。

此外，两种方式都支持级联属性的获取。例如，若输入参数类型是一个实体类对象（如`Student`对象），则可以通过“#{对象名.属性名}”或“${对象名.属性名}”来获取属性值，如`#{student.stuNo}`、`${ student.stuNo }`。

**为了便于记忆，将两种方式的区别列以下表格，**

<table>
   <tr>
      <td></td>
      <td>#{参数}</td>
      <td>${参数}</td>
   </tr>
   <tr>
      <td>防止SQL注入</td>
      <td>支持</td>
      <td>不支持</td>
   </tr>
   <tr>
      <td>参数名（参数值是简单类型时）</td>
      <td>任意，如#{studentId}、#{abc等}</td>
      <td>必须是value，即${value}</td>
   </tr>
   <tr>
      <td>参数值</td>
      <td>会给String类型的参数值自动加引号</td>
      <td>将参数值原样输出，可以用来实现动态参数排序</td>
   </tr>
</table>

## 16.1.2 输入参数为实体类的对象 ##

Mybatis使用`ognl`来解析对象类型的属性值，例如，

**SQL映射文件：org/lanqiao/mapper/studentMapper.xml**

```
…
<!-- 根据实体类的属性，查询学生信息 -->
<select id="getStudentsByNameAndAge"  parameterType="student"
resultType="student">
	select * from student where stuName like '%${stuName}%'
 and stuAge = #{stuAge} 
</select>
…
```

**动态代理接口：org.lanqiao.mapper.IStudentMapper.java**

```
public interface IStudentMapper
{
	Student queryStudentsByNameAndAge(Student student);
	…
}
```

**测试方法：TestMyBatis.java**

```
public static void testQueryStudentsByNameAndAge()
 throws IOException
{
     …
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
	Student student = new Student();
	student.setStuName("张三");
	student.setStuAge(23);
	// 执行查询，输入一个实体对象类型的参数
	Student student 
= studentMapper.queryStudentsByNameAndAge(student);
…
}
```

以上，将`Student`对象传入到**studentMapper.xml**中，并通过`${stuName}`及`#{stuAge}`获取出该对象的`stuName`和`stuAge`属性值。如果studentMapper.xml中占位符的变量名与实体类的属性不一致，则就会引发异常，例如若把SQL配置文件中的`stuAge = #{stuAge}`写成了`stuAge = #{age}`，则就会引发以下异常：

```
org.apache.ibatis.reflection.ReflectionException: 
There is no getter for property named 'age' in 'class org.lanqiao.entity.Student'
```

因此，如果传入的参数是一个实体类对象，则在SQL配置文件中解析时，一定要确保`${}`或`#{}`中的参数名必须是实体类的属性名。

## 16.1.3 输入参数为嵌套对象 ##

在`Student`类中新增一个`Address`类型的属性，如下：

**Student.java**

```
public class Student
{
	…
	//地址
	private Address address ;
//省略getter、setter及构造方法
}
```

**Address.java**

```
…
public class Address
{
	private String schoolAddress;
	private String homeAddress;
//省略getter、setter及构造方法
}
```

我们可以在SQL配置文件中，通过`#{}`或`${}`来获取传入对象的所有嵌套属性，如下：

**SQL映射文件：studentMapper.xml**

```
…
<select id="queryStudentsIncludeCascadeProperties" 
parameterType="student"  resultType="address">
	select * from address where homeAddress 
like '%${address.homeAddress}%' 
or schoolAddress = #{address.schoolAddress} 
</select>
…
```

即传入一个`Student`对象，并获取该对象的`address`属性中的嵌套属性`homeAddress`和`schoolAddress`。

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
List<Address> queryStudentsIncludeCascadeProperties(Student  
 student);
   …
}
```

**测试方法：TestMyBatis.java**

```
//测试传入级联对象类型的属性值
public static void testQueryStudentsIncludeCascadeProperties()
 throws IOException
{
	…
	Address address = new Address();
	address.setHomeAddress("西安");
	address.setSchoolAddress("北京");
			
	Student student = new Student();
	student.setAddress(address);
			
	IStudentMapper studentMapper
 = session.getMapper(IStudentMapper.class);
	// 执行查询，输入一个实体类对象类型的参数
	List<Address> addresses =studentMapper
.queryStudentsIncludeCascadeProperties(student);
	…
}
```

通过`queryStudentsIncludeCascadeProperties()`传入一个`Student`对象，并且`Student`对象中包含了一个`Address`类型的属性，SQL配置文件中仍然可以使用`#{}`或`${}`来获取传入的`Student`对象的嵌套属性`address.homeAddress`和`address.schoolAddress`。

## 16.1.4 输入参数为HashMap对象 ##

还可以给SQL配置文件传入一个`HashMap`类型的参数，并通过`${key值}`或`#{ key值}`获取对应的`value`值，如下，

**SQL映射文件：studentMapper.xml**

```
…
<!--测试传入HashMap类型 -->
<select id=" queryStudentsWithHashMap " parameterType="HashMap" 
 resultType="student">
	select * from student where stuName like '%${stuName}%'
 and stuAge = #{stuAge} 
</select>
…
```

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
	Student queryStudentsWithHashMap(Map<String, Object> map);
}
```

**测试方法：TestMyBatis.java**

```
public static void testQueryStudentsWithHashMap() 
throws IOException
{
	…
	Map<String, Object> studentMap = new HashMap<String, Object>();
	studentMap.put("stuName", "张三");
	studentMap.put("stuAge", new Integer(23));
	IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
	// 执行查询，输入一个HashMap类型的参数
	Student student =studentMapper
.queryStudentsWithHashMap(studentMap);	
…
}
```

通过`queryStudentsWithHashMap()`传入一个`HaspMap`对象，再在SQL配置文件中通过`${}`或`#{}`获取`key`对应的`value`值。

# 16.2 输出参数 #

## 16.2.1 输出参数为简单类型或实体对象类型 ##

#### (1) 输出参数为简单类型 ####

在SQL配置文件中，使用`resultType`指定输出的参数类型。

以下指定输出类型为`int`：

**SQL映射文件：studentMapper.xml**

```
…
<!--测试输出简单类型 -->
<select id=" queryStudentsCount "   resultType="int">
		select count(*) from student 
</select>
…
```

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
	public abstract int queryStudentsCount();
    …
}
```

**测试方法：TestMyBatis.java**

```
public static void testQueryStudentCount()throws IOException
{
…
	IStudentMapper studentMapper 
 = session.getMapper(IStudentMapper.class);
	int count = studentMapper.queryStudentsCount();	
…
}
```

#### (2) 输出参数为实体对象类型 ####

与输出简单类型的步骤相似，详见“使用Mapper动态代理优化程序”一节。

#### (3) 输出参数为实体对象类型的集合 ####

与输出简单类型的步骤相似，详见“输入简单类型”一节中的`testQueryAllOrderByStuNo()`方法，及其相关的SQL配置文件和接口。

## 16.2.2 输出HashMap类型 ##

指定输出类型为HashMap，并给每个字段都起上别名，如下：

**SQL映射文件studentMapper.xml**

```
<select id="queryStudentOutByHashMap"   parameterType="int"
resultType="HashMap">
	select stuNo "no",stuName "name",stuAge "age" 
from student  where stuNo = #{stuNo}
</select>
```

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
	HashMap<String,Object> queryStudentOutByHashMap(int stuNo);
    …
}
```

之后，就可以通过Mapper动态代理对象，据字段的别名获来取查询结果，如下，

**测试方法：TestMyBatis.java**

```
//测试输出HashMap类型
public static void queryStudentOutByHashMap() throws IOException
{
	…
	IStudentMapper studentMapper
                        = session.getMapper(IStudentMapper.class);
	//查询学号为31的学生，并将查询结果保存在HashMap之中
	HashMap<String, Object> studentMap 
= studentMapper.queryStudentOutByHashMap(31);
    //据字段的别名获来取查询结果 
	System.out.println("学号:"+studentMap.get("no")
+"\t姓名:"+studentMap.get("name")
+"\t年龄："+studentMap.get("age"));
	…
}
```

运行结果：

![](http://i.imgur.com/lOIwlBv.png)

*图16-01*

## 16.2.3 使用resultMap指定输出类型及映射关系 ##

我们先来看一个返回实体类型的例子：根据学号查询一个学生

**SQL映射文件：studentMapper**

```
…
<mapper namespace="org.lanqiao.entity.studentMapper">
	<select id="getStudentByNo" parameterType="int"
		resultType="student">
		select stuNo,stuName,stuAge,graName 
from student where stuNo=#{stuNo}	
</select>
</mapper>
```

其中SQL语句使用的字段名必须和`resultType`指定的实体类中的属性名一致，例如`stuNo`、`stuName`等必须既是数据表的字段名、又同时是`Student`类的属性名，否则就会产生异常。

为了解决这种由于字段名与属性名不一致而引发的问题，我们可以使用以下两种方法(先将数据表中的字段依次改名为：no,name,age,gname，而实体类中的属性仍然使用`stuNo`,`stuName`,`stuAge`,`graName`)：

**(1)在SQL语句中定义别名**

用别名来表示实体类的属性名，即：`select` 字段名 "属性名(字段名的别名)"  from 数据表，如下

```
select no "stuNo",name "stuName" ,age "stuAge", gName "graName" from student
```

**(2)使用`<resultMap>`元素指定字段和属性的对应关系**

将之前的resultType改为resultMap，并配置`resultMap`元素内容，如下：

**SQL映射文件：studentMapper**

```
…
	<!-- 根据学号，查询一个学生-->
 	<select id="queryStudentByNo" parameterType="int" 
resultMap ="studentResultMap"> 
 	    select no, name, age, gName from student	
where no=#{stuNo}
	</select>  
	<!-- 配置resultMap，用来指定字段和属性的对应关系-->
	<resultMap type="student" id="studentResultMap">
        <!—数据表主键no对应于属性stuNo -->
		<id  column="no" property="stuNo"/>
        <!--字段name对应于属性stuName -->
		<result  column="name" property="stuName"/>
		<result  column="age" property="stuAge"/>
		<result  column="gName" property="graName"/>
	</resultMap>
```

在`<select>`元素中用`resultMap`的属性值匹配`<resultMap>`元素的id值；然后在`<resultMap>`元素中用`type`指定相应`<select>`元素的返回值；并通过`<result>`子元素的`column`指定字段名、`property`指定与字段名相对应的属性名，从而将字段名和属性名一一对应起来。`<result>`元素用来指定普通字段，`<id>`元素用来指定主键字段。

为了和其他章节的示例保持一致，我们在讲完本节后将数据表的字段恢复成了`stuNo`、`stuName`、`stuAge`、`graName`。

# 16.3 动态SQL #

MyBatis提供了`<if>`、`<where>`、`<foreach>`等标签来实现SQL语句的动态拼接。

## 16.3.1 <if>标签 ##

我们可以将SQL映射文件写成以下形式：

**SQL映射文件：studentMapper.java**

```
		<select id="testQueryStudentByNoWithOGNL" 
parameterType="student" resultType="student"> 
		      select stuNo,stuName,stuAge,graName
 from student where 1=1
		<if	 test="graName != null and graName !='' ">
			  and graName like '%${graName}%'  
		</if>
		<if	 test="stuAge != null and stuAge !='' ">
		   	  and stuAge = #{stuAge}
		</if>
	 </select>
```

以上表示，只有当传入的`Student`对象的`graName`属性不为空时，才会拼接SQL语句：`and graName like '%${graName}%'`，而如果`graName`属性为空就不会再拼接；`stuAge`属性同理。

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
List<Student> testQueryStudentByNoWithOGNL(Student stu);
…
}
```

**测试方法：TestMyBatis.java**

```
	public static void testQueryStudentByNoWithOGNL() 
throws IOException
	{
		…
		IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
		Student stu = new Student();
		stu.setGraName("就业班");
		stu.setStuAge(23);

		List<Student> students 
= studentMapper.testQueryStudentByNoWithOGNL(stu);
		…
	}
```

通过`testQueryStudentByNoWithOGNL()`方法，向SQL映射文件传入一个`Student`对象，SQL映射文件就会在`<if>`等标签中解析出该对象中的属性值。例如`<if>`标签中的`graName`、`stuAge`就是`Student`对象的属性。

## 16.3.2 &lt;where&gt;标签 ##

上例中的SQL配置文件，可以使用`<where>`标签改成以下的等价写法：

**SQL映射文件：studentMapper.java**

```
<select id="testQueryStudentByNoWithOGNL"
parameterType="student" resultType="student"> 
		select stuNo,stuName,stuAge,graName from student   
		<where>
			<if	 test="graName != null and graName !='' ">
				and graName like '%${graName}%'  
			</if>
			<if	 test="stuAge != null and stuAge !='' ">
				and stuAge = #{stuAge}
			</if>
		</where>
</select>
```

即使用`<where>`标签来替代SQL中的`where`关键字，并且`<where>`标签可以根据情况自动帮我们处理`<if>`开头的“and”关键字。

## 16.3.3 &lt;foreach&gt;标签 ##

我们已经知道，SQL映射文件是通过`parameterType`来指定输入的参数类型。如果输入参数是简单类型或一般对象类型（除集合数组外），可以直接指定，如`parameterType=”int”`、 `parameterType=”student”`等；但如果输入参数是集合或数组类型，就需要使用`<foreach>`标签来完成输入参数的处理。

例如，要想实现以下SQL：

```
select * from student  where stuNo in(第一个学号, 第二个学号, 第三个学号)
```

就必须将包含学号的数组或集合，传入SQL并替代“第一个学号, 第二个学号, 第三个学号”等占位符。

#### (1)将集合或数组以对象属性的形式传入 ####

可以定义一个集合（或数组）类型的属性，然后将该集合属性传入到SQL映射文件中。例如，新建一个年级`Grade`类，该类包含一个`List`集合类型的属性`stuNos`，存放着该年级中所有学生的学号，如下：

**Grade.java**

```
public class Grade
{
	//年级中所有学生的学号
	private List<Integer> stuNos ;
//setter、getter
}
```

将`Grade`对象中`List`类型的属性`stuNos`传入到SQL映射文件中：

**SQL映射文件：studentMapper.xm**

```
<!--注意grade是org.lanqiao.entity.Grade的别名 -->
<select id="queryStudentWithForeach"  parameterType="grade" 
resultType="student">
		  select * from student  
	<where>
		<if test="stuNos !=null and stuNos.size>0 " >
               <!--使用foreach标签，迭代取出Grade对象中stuNos集合属性中的每一个元素 -->
				<foreach collection="stuNos" open="  stuNo in(" 
close=")" item="stuNo" separator=",">
					#{stuNo}
				</foreach>
			</if>
	</where>
</select>
```

通过`parameterType`传入`Grade`对象，该对象包含了集合类型的属性`stuNos`（假定`stuNos`集合属性包含31,32,33三个元素）。之后通过`<foreach>`处理`stuNos`集合中的数据，拼接出完整的SQL语句：`select * from student where  stuNo in (31,32,33)`。

**以此SQL映射文件为例，具体的拼接过程如下：**

**①**首先是主体的SQL语句：`select * from student` 

**②**然后通过`<where>`标签拼接`where`关键字：select * from student  where

**③**之后，如果传入的`Grade`对象不为空，就会进行`<foreach>`中的SQL拼接：

a.先拼接`open`属性中的SQL：
`select * from student  where  stuNo in(`

b.再循环拼接`collection`属性所代表集合：用`item`的属性值代表每一次遍历时的别名，并在`<foreach>`下用#{别名}来接收每一次的迭代值，再将每一次迭代值之间用`separator`的属性值隔开，如下：

`select * from student  where  stuNo in( 31,32,33`

c.最后再拼接`close`中的结尾符“)”：
 `select * from student  where  stuNo in(31,32,33)`

**`<foreach>`元素中各属性含义如下：**

<table>
   <tr>
      <td>属性</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>collection</td>
      <td>需要遍历的集合类型的属性名</td>
   </tr>
   <tr>
      <td>item</td>
      <td>集合中每一个元素进行迭代时的别名</td>
   </tr>
   <tr>
      <td>index</td>
      <td>指定一个名字，用于表示在迭代过程中，每次迭代到的位置</td>
   </tr>
   <tr>
      <td>open</td>
      <td>循环遍历前附加的SQL语句</td>
   </tr>
   <tr>
      <td>separator</td>
      <td>在每次进行迭代之间，以什么符号作为分隔符</td>
   </tr>
   <tr>
      <td>close</td>
      <td>循环遍历后附加的SQL语句</td>
   </tr>
</table>

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
List<Student> queryStudentWithForeach(Grade grade);
…
}
```

**测试方法：TestMyBatis.java**

```
public static void queryStudentWithForeach() throws IOException
{
	…
		IStudentMapper studentMapper
 = session.getMapper(IStudentMapper.class);
		
		List<Integer> stuNos = new ArrayList<Integer>();
		stuNos.add(31);
		stuNos.add(32);
		stuNos.add(33);
		
		Grade grade = new Grade();
		grade.setStuNos(stuNos);
		//传入grade对象，该对象包含了List集合类型的属性stuNos
		List<Student> students
 = studentMapper.queryStudentWithForeach(grade);
		…
}
```

至此，就从数据库里查出了学号为31、32、33三位学生的信息，并封装到了`studnets`集合对象里。

#### (2)传入`List`类型的集合 ####

此种方式与“将集合或数组以对象属性的形式传入”的方法基本相同，只是需要将`parameterType`指定为`List`，并且必须用 `“list”`名字来接收传来的`List`集合，如下：

**SQL映射文件：studentMapper.xml**

```
<select id="queryStudentWithForeachAndList" 
parameterType="java.util.List" resultType="student">
		select * from student  
	<where>
		<if test="list !=null and list.size>0" >
			<foreach collection="list" open="  
stuNo in(" close=")" item="stuNo" separator=",">
					#{stuNo}
			</foreach>
		</if>
	</where>
</select>
```

**动态代理接口：IStudentMapper.java**

```
public interface IStudentMapper
{
List<Student> queryStudentWithForeachAndList(List<Integer>
 stuNos);
  …
}
```

**测试方法：TestMyBatis.java**

```
public static void queryStudentWithForeachAndList() 
throws IOException
{
	    …
		IStudentMapper studentMapper 
= session.getMapper(IStudentMapper.class);
		List<Integer> stuNos = new ArrayList<Integer>();
		stuNos.add(31);
		stuNos.add(32);
		stuNos.add(33);
		
		List<Student> students = studentMapper
.queryStudentWithForeachAndList(stuNos);
…
}
```

#### (3)传入简单类型的数组 ####

传入数组与传入`List`集合的方法基本相同，只是需要将`parameterType`指定为数组类型，并且必须用 `“array”`名字来接收传来的数组，以传入`int[]`数组为例：

**SQL映射文件：studentMapper.xml**

```
<select id="queryStudentWithForeachAndArray" 
parameterType="int[]" resultType="student">
		select * from student  
		<where>
			<if test="array !=null and array.length>0" >
				<foreach collection="array" open="  stuNo in("
 close=")" item="stuNo" separator=",">
					#{stuNo}
				</foreach>
			</if>
		</where>
</select>
```

动态代理接口与测试方法略。

#### (4)传入对象数组 ####

传入对象数组与“传入简单类型数组”的方法基本相同，只是需要将`parameterType`的值固定写成“`Object[]`”，并且可以通过OGNL获取迭代对象的属性，如`#{student.stuNo}`。以传入`Student[]`数组为例：

**SQL映射文件：studentMapper.xml**

```
<select id="queryStudentWithForeachAndObjectArray" 
parameterType="Object[]" resultType="student">
		select * from student  
	<where>
		<if test="array !=null and array.length>0" >
			<foreach collection="array" open="  stuNo in(" 
close=")" item="student" separator=",">
				#{student.stuNo}
			</foreach>
		</if>
	</where>
</select>
```

动态代理接口与测试方法略。

## 16.3.4 SQL片段 ##

为了达到复用的目的，我们可以通过“方法”将重复的JAVA代码提取出来，通过“存储过程”将重复的SQL语句提取出来；同样的，我们也可以使用“SQL片段”，来将SQL映射文件中的重复代码提取出来。

例如以下SQL映射文件：


```
<select id="testQueryStudentByNoWithOGNL" 
parameterType="student" resultType="student"> 
		select stuNo,stuName,stuAge,graName from student   
	<where>
		<if	test="graName != null and graName !='' ">
			and graName like '%${graName}%'  
		</if>
		<if	test="stuAge != null and stuAge !='' ">
			and stuAge = #{stuAge}
		</if>
	</where>
</select>
```

我们可以将`<where>`中的`if`判断提取出来，然后在需要使用的地方使用`<include>`导入即可，如下：

```
<!-- 提取的SQL片段 -->
<sql id="queryWithGranameAndAge">
	<if	test="graName != null and graName !='' ">
		and graName like '%${graName}%'  
	</if>
	<if	test="stuAge != null and stuAge !='' ">
		and stuAge = #{stuAge}
	</if>
</sql>
	
<select id="testQueryStudentByNoWithOGNL" 
parameterType="student"  resultType="student"> 
		select stuNo,stuName,stuAge,graName from student   
	<where>
        <!—导入SQL片段 -->
		<include refid="queryWithGranameAndAge"/>
	</where>
</select>
```

即使用`<sql>`将代码提取出来，然后在需要使用的地方用`<include>`导入。其中`<include>`元素的`refid`属性指向需要导入`<sql>`标签的id值。


**说明：**
如果`<include>`导入的是其它SQL映射文件中的SQL片段，则需要在引用时加上`namespace`，如：`<include refid="namespace值.sql片段的id值”/>`。

# 16.4 练习题 #

1.SQL映射文件中，如果`parameterType`的值是实体类对象，`<select>`等标签中的SQL语句如何使用对象的属性值？

2.SQL映射文件中，如果`parameterType`的值是`HashMap`，`<select>`等标签中的SQL语句如何使用对象的属性值？

3.SQL映射文件中，如果`resultType`的值是`HashMap`，`<select>`标签中的SQL语句如何编写？测试方法中如何获取`<select>`查询到的字段的值?

4.SQL映射文件中，如果`<select>`的查询结果是一个实体类对象类型。但实体类的属性名和数据表的字段名不一致，如何处理？

5.简述`<foreach>`常见属性的含义。




 

