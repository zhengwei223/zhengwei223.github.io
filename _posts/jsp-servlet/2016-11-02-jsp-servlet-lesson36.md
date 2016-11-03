---

layout: post


title: 新增内容4：JDBC相关


category: JSP-Servlet教程


tags: JSP Servlet


description: 


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

**(4)使用`CallableStatement`调用存储过程或存储函数**

除了使用SQL语句外，我们还可以通过存储过程或存储函数来访问数据库。在Java程序中，就可以通过`CallableStatement`对象来调用数据库中的存储过程或存储函数。

`CallableStatement`对象可以通过`Connection`对象创建，如下： 

`CallableStatement cstmt= connection.prepareCall("调用存储过程/存储函数");`

调用存储过程（无返回值）的格式如下：

**{ call 存储过程名(参数列表) }**

调用存储函数（有返回值）的格式如下：

**{ ? = call存储过程名(参数列表) }**

**其中，对于参数列表，需要注意两点：**

**①**参数的索引，是从1开始编号。

**②**具体的参数，既可以是输入参数（IN类型），也可以是输出参数（OUT类型）。输入参数使用`setXxx()`方法进行赋值；输出参数（或返回值参数）必须先使用`registerOutParameter()`方法设置参数类型，然后调用`execute()`执行存储过程或存储函数，最后再通过`getXxx()`获取结果值。

下面，通过“两个数相加”的示例，分别演示调用存储过程和存储函数的具体步骤：

**①调用存储过程（无返回值）**

**<1>创建存储过程**

先在Oracle中，创建存储过程`addTwoNum()`，如下，

```
create or replace procedure addTwoNum
(num1 in number,   --输入参数
num2 in number,   --输入参数
total out number  --输出参数
)
as
  begin 
      total := num1+num2;
  end ;
```

**<2>调用存储过程**

**jdbc.demo.JDBCOperateByCallableStatement.java**

```
//package、import
public class JDBCOperateByCallableStatement
{
	…
	static CallableStatement cstmt = null;
	public static void executeByCallableStatement()
	{
		try	
		{
			…
             //创建CallableStatement对象，并调用数据库中的存储过程addTwoNum()
			cstmt = connection.prepareCall("{call addTwoNum(?,?,?)}");
			//将第一个参数值设为10
			cstmt.setInt(1, 10);
			//将第二个参数值设为20
			cstmt.setInt(2, 20);
			//将第三个参数（输出参数）类型设置为int
			cstmt.registerOutParameter(3, Types.INTEGER);
			//执行存储过程
			cstmt.execute() ;
			//执行完毕后，获取第三个参数（输出参数）的值
			int result = cstmt.getInt(3); 
			System.out.println("相加结果是："+result);		
		}
		//省略catch、finally 
	}
}
```

**<3>测试**

**jdbc.test.TestJDBCOperateByCallableStatement.java**

```
//package、import
public class TestJDBCOperateByCallableStatement
{
	public static void main(String[] args)
	{
		JDBCOperateByCallableStatement.executeByCallableStatement();
	}
}
```

运行结果：

![](http://i.imgur.com/M2C5nh1.png)


**②调用存储函数（有返回值）**

**<1>创建存储函数**

先在Oracle中，创建存储函数`addTwoNumAndReturn()`，如下，

```
create or replace function addTwoNumAndReturn
( num1 in number,   --输入参数
num2 in number     --输入参数
)
 return number       --返回值类型
as
  total number ;
  begin 
      total := num1+num2;
      return total ;   --返回值
  end ;
```


**<2>调用存储函数**

**jdbc.demo.JDBCOperateByCallableStatement.java**

```
//package、import
public class JDBCOperateByCallableStatement
{
	…
	static CallableStatement cstmt = null;
	public static void executeByCallableStatementWithResult()
		{
			try	
			{
				…
   //创建CallableStatement对象，并调用数据库中的存储函数addTwoNumAndReturn()
				cstmt = connection.prepareCall(
"{? = call addTwoNumAndReturn(?,?)}");
				//将第一个参数(返回值)类型设置为int
				cstmt.registerOutParameter(1, Types.INTEGER);
				//将第二个参数值设为10
				cstmt.setInt(2, 10);
				//将第三个参数值设为20
				cstmt.setInt(3, 20);
				//执行存储函数
				cstmt.execute() ;
				//执行完毕后，获取第三个参数的值(返回值)
				int result = cstmt.getInt(1); 
				System.out.println("相加结果是："+result);
			}
			//省略catch、finally	}
}
```

**<3>测试**

**jdbc.test.TestJDBCOperateByCallableStatement.java**

```
//package、import
public class TestJDBCOperateByCallableStatement
{
	public static void main(String[] args)
	{
		JDBCOperateByCallableStatement
. executeByCallableStatementWithResult ();
	}
}
```

运行结果：

![](http://i.imgur.com/iVTyxVA.png)



**(5)处理CLOB/BLOB数据**

实际开发中，经常会处理一些大文本数据（CLOB）或二进制数据（BLOB）。要想在数据库中读写CLOB及BLOB，就必须使用PreparedStatement和IO流。


**①读写CLOB数据**

CLOB用于存放大文本数据。以下是将一篇小说（E:\\ 幻城.txt）存入CLOB类型字段的具体步骤：

**<1>创建myNovel表，并设置CLOB类型的字段novel，如下：**

```
create table myNovel
(
       id number primary key,
       novel clob
)
```

**<2>将小说写入 myNovel表的novel字段（CLOB类型）**

先将小说转为字符输入流，然后通过`PreparedStatement`的`setCharacterStream ()`方法写入数据库，如下，


**jdbc.clob.WriteAndReadNovel.java**

```
//package、import
public class WriteAndReadNovel
{
	..
	static PreparedStatement pstmt = null;
	//将小说写入数据库
	public static void writeNovelToClob()
	{
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			String sql = "insert into myNovel(id,novel) values(?,?)" ;
			//处理clob/blob，必须使用PreparedStatement对象
			pstmt = connection.prepareStatement(sql) ;
			pstmt.setInt(1, 1);//id=1
			
			//将小说转为字符输入流,并设置编码格式为中文GBK格式
			File file = new File("E:\\幻城.txt");
			Reader reader = new InputStreamReader(
new FileInputStream(file),"GBK");
			
			//将字符输入流写入myNovel表
			pstmt.setCharacterStream(2, reader,(int)file.length());
			int result = pstmt.executeUpdate();
			if(result >0){
				System.out.println("小说写入成功！");
			}else{
				System.out.println("小说写入失败！");
			}
		}
		//catch、finally
	}
	public static void main(String[] args)
	{
		 writeNovelToClob();	
	}
}
```

执行程序，运行结果：

![](http://i.imgur.com/PZYy3hM.png)

此时的myNovel表（CLOB类型的数据，无法直接观察）：

![](http://i.imgur.com/UM1bT7U.png)


**<3>读取数据库中的小说**

通过`ResultSet`的`getCharacterStream ()`方法读取小说，然后通过IO流写入硬盘（src根目录），如下，

**jdbc.blob. WriteAndReadNovel.java**

```
//package、import
public class WriteAndReadNovel
{
	…
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
		//从数据库读取小说，并放入src目录
		public static void readImgToBlob()
		{
			try
			{
				Class.forName(DRIVER);
				connection = DriverManager.getConnection(
URL, USERNAME, PASSWORD);
				String sql = "select * from myNovel where id = ?" ;
				pstmt = connection.prepareStatement(sql) ;
				pstmt.setInt(1, 1);//id=1
				rs =  pstmt.executeQuery() ;
				if(rs.next()){
					//将小说从数据库中 读取出为Reader类型
					Reader reader =  rs.getCharacterStream("novel") ;
					
					//通过IO流，将小说写到项目中（硬盘)
					//将小说的输出路径设置为src（相对路径），小说名为myNovel.txt
					Writer writer = new FileWriter("src/幻城.txt");
					char[] temp = new char[200];
					int len = -1;
					while( (len=reader.read(temp) )!=-1){
						writer.write(temp,0,len);
					}
					writer.close();
					reader.close();
					System.out.println("小说读取成功！");
				}
			}
			//catch、finally
		}
	public static void main(String[] args)
	{
		readImgToBlob();
	}
}
```

执行程序，运行结果：

![](http://i.imgur.com/ii8kdm8.png)

刷新项目，可以在`src`下看到读取出的小说，如图:

![](http://i.imgur.com/QjYFVct.png)


**说明：**

**MySQL数据库中没有CLOB类型，在MySQL用TEXT类型存储大文本数据。**


**②读写BLOB数据**

BLOB用于存放图片、电影等二进制数据。以下是将图片（**E:\\ lanqiao.png**）存入BLOB类型字段的具体步骤：

**<1>创建myPicture表，并设置BLOB类型的字段img，如下：**

```
create table myPicture
(
	id number(4) primary key,
	img blob
)
```


**<2>将图片写入 myPicture表的img字段（BLOB类型）**

先将图片转为输入流，然后通过`ResultSet`的`setBinaryStream()`方法写入数据库，如下，

**jdbc.blob.WriteAndReadImg.java**

```
//package、import
public class WriteAndReadImg
{
	…
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
	//将图片写入数据库
	public static void writeImgToBlob()
	{
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(
URL, USERNAME, PASSWORD);
			String sql = "insert into myPicture(id,img) values(?,?)" ;
             //处理clob/blob，必须使用PreparedStatement对象
			pstmt = connection.prepareStatement(sql) ;
			pstmt.setInt(1, 1);//id=1
			
			//将图片转为输入流
			File file = new File("E:\\lanqiao.png");
			InputStream in = new FileInputStream(file);
			//将输入流写入myPicture表
			pstmt.setBinaryStream(2, in,(int)file.length());
			int result = pstmt.executeUpdate();
			if(result >0){
				System.out.println("图片写入成功！");
			}else{
				System.out.println("图片写入失败！");
			}
		}
		//catch、finally
	}
	
	public static void main(String[] args)
	{
		writeImgToBlob();
	}
}
```

执行程序，运行结果：

![](http://i.imgur.com/Peq2Gto.png)

此时的myPicture表（BLOB类型的数据，无法直接观察）：


![](http://i.imgur.com/w9Hk19m.png)


**<3>读取数据库中的图片**


通过`ResultSet`的`getBinaryStream()`方法读取图片，然后通过IO流写入硬盘（`src`根目录），如下，

**jdbc.blob.WriteAndReadImg.java**


```
//package、import
public class WriteAndReadImg
{
	…
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
	…
	//从数据库读取图片
	public static void readImgToBlob()
	{
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			String sql = "select * from myPicture where id = ?" ;
			pstmt = connection.prepareStatement(sql) ;
			pstmt.setInt(1, 1);//id=1
			rs =  pstmt.executeQuery() ;
			if(rs.next()){
				//将图片从数据库中 读取出为InputStream类型
				InputStream imgIn =  rs.getBinaryStream("img") ;
				//通过IO流，将图片写到项目中（硬盘)
				InputStream in = new BufferedInputStream(imgIn) ;
				//将图片的输出路径设置为src（相对路径），图片名为myPic.png
				OutputStream imgOut =new FileOutputStream("src//myPic.png"); 
				OutputStream out = new BufferedOutputStream(imgOut) ;
				int len = -1;
				while( (len=in.read() )!=-1){
					out.write(len);
				}
				imgOut.close();
				out.close();
				imgIn.close();
				in.close();
				System.out.println("图片读取成功！");
			}			
		}
		//catch、finally
	}
	
	public static void main(String[] args)
	{
		readImgToBlob();
	}
}
```

执行程序，运行结果：

![](http://i.imgur.com/wQqiGQa.png)

刷新项目，可以在`src`下看到读取出的图片，如图:

![](http://i.imgur.com/3icU1T2.png)


# 3.2 元数据 #

**元数据（MetaData），是指用来描述数据的数据。具体来讲，数据库、数据表、字段等的定义信息，就是元数据。**例如：数据库连接信息、字段名、字段类型、主键信息、SQL参数信息等，都是元数据。

元数据可以分为三类：数据库元数据（`DataBaseMetaData`）、参数元数据（`ParameterMetaData`）、结果集元数据（`ResultSetMetaData`）。


## 3.2.1 数据库元数据 ##

**数据库元数据（DatabaseMetaData）主要用于：获取数据库及主键的相关信息。**


数据库元数据的完整定义如下：


`public interface DatabaseMetaData extends Wrapper {…}`


`DataBaseMetaData`对象可以通过`java.sql.Connection`对象获取。`DataBaseMetaData`接口的常见方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>String getDatabaseProductName() throws SQLException</td>
      <td>获取数据库名</td>
   </tr>
   <tr>
      <td>String getDatabaseProductVersion() throws SQLException</td>
      <td>获取数据库版本信息</td>
   </tr>
   <tr>
      <td>String getDriverName() throws SQLException </td>
      <td>获取驱动名</td>
   </tr>
   <tr>
      <td>String getURL() throws SQLException</td>
      <td>获取URL</td>
   </tr>
   <tr>
      <td>String getUserName() throws SQLException</td>
      <td>获取用户名</td>
   </tr>
   <tr>
      <td>ResultSet getPrimaryKeys(String catalog, String schema, String table)     throws SQLException;</td>
      <td>获取指定表的主键信息。参数：catalog:类别信息，通常设为null；schema:①如果是oracle数据库：大写的用户名；②如果是其它数据库：数据库名。也可以设为null。  table:指定大写的表名。 
     返回值是一个ResultSet，该结果集包含以下信息：1表类别              2表模式          3表名称              4列名称             5主键中的序列号（值1表示主键中的第一列，值2表示主键中的第二列，...）           6主键的名称</td>
   </tr>
</table>


`DataBaseMetaData`部分方法演示：

**jdbc.metadata.MetaDataDemo.java**

```
//package、import
public class MetaDataDemo
{
	…
    static ResultSet rs = null;
	public static void dataBaseMetaDataDemo(){
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL 
,USERNAME, PASSWORD);
             //获取数据库元数据DataBaseMetaData对象
			DatabaseMetaData dbMetaData = connection.getMetaData() ;
			String dbName = dbMetaData.getDatabaseProductName() ;
			System.out.println("数据库名:"+dbName);
			String dbVersion = 	dbMetaData
.getDatabaseProductVersion() ;
			System.out.println("数据库版本信息："+dbVersion);
			String driverName = dbMetaData.getDriverName() ;
			System.out.println("驱动名："+driverName);
			String urlInfo = dbMetaData.getURL() ;
			System.out.println("url:"+urlInfo);
			String uname = dbMetaData.getUserName() ;
			System.out.println("用户名："+uname);
			//获取主键信息，以ResultSet形式保存。
			rs =  dbMetaData.getPrimaryKeys(null, 
dbMetaData.getUserName(), "student") ;
			while(rs.next()){
				//主键信息中，3代表：表名称
				Object tableName = rs.getObject(3) ;
				System.out.println("主键所在的表名是："+tableName);
				//主键信息中，4代表：列名称
				Object primaryKeyName = rs.getObject(4) ;
				System.out.println("主键的列名："+primaryKeyName);
			}
		}
		//省略catch()、finally
	}
	public static void main(String[] args)
	{
		dataBaseMetaDataDemo();
	}
}
```

运行结果：

![](http://i.imgur.com/eIX0MIV.png)


## 3.2.2 参数元数据 ##


参数元数据（ParameterMetaData）主要用于：获取SQL语句中占位符的相关信息。

参数元数据的完整定义如下：

`public interface ParameterMetaData extends Wrapper {…}`

`ParameterMetaData`对象可以通过`java.sql.PreparedStatement`对象获取。


**ParameterMetaData接口的常见方法如下：**


<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>int getParameterCount() throws SQLException;</td>
      <td>获取SQL语句中，参数占位符的个数</td>
   </tr>
   <tr>
      <td>String getParameterTypeName(int param)  throws SQLException;</td>
      <td>获取第param个参数的类型名</td>
   </tr>
</table>

**注意：**

很多数据库对`ParameterMetaData`的支持不是很完善。例如，使用`ParameterMetaData`前:


**①**Oralce目前必须使用**ojdbc7.jar**作为驱动包；

**②**MySql必须在url中附加参数配置：
`jdbc:mysql://localhost:3306/数据库名?generateSimpleParameterMetadata=true`


**ParameterMetaData部分方法演示：**

**jdbc.metadata.MetaDataDemo.java**

```
//package、import
public class MetaDataDemo
{
	…
final static String URL = "jdbc:oracle:thin:@localhost:1521:XE";
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
	public static void parameterMetaDataDemo(){
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(
URL, USERNAME, PASSWORD);
			    String sql ="select * from student where stuName = ?   
 and stuAge = ? " ;
			pstmt = connection.prepareStatement(sql) ;
             //创建ParameterMetaData对象
			ParameterMetaData pMetaData = pstmt.getParameterMetaData() ;
			//获取SQL中，占位符?的个数
			int paramCount = pMetaData.getParameterCount();
			System.out.println("SQL中，占位符参数的个数是："+paramCount);
			//获取SQL中，各个占位符?参数的类型
			for(int i=1;i<=paramCount ;i++){
				String typeName = pMetaData.getParameterTypeName(i) ;
				System.out.println("第"+i+"个占位符参数的类型是:"+typeName);
			}
		}
		//catch、finally
	}
	public static void main(String[] args)
	{
		parameterMetaDataDemo();
	}
}
```

运行结果：

![](http://i.imgur.com/sJE4EnT.png)


## 3.2.3 结果集元数据 ##

结果集元数据（ResultSetMetaData）主要用于：获取SQL语句中占位符的相关信息。

**结果集元数据的完整定义如下：**

`public interface ResultSetMetaData extends Wrapper {…}`

`ResultSetMetaData`对象可以通过`java.sql.ResultSet`对象获取。ResultSetMetaData接口的常见方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>int getColumnCount() throws SQLException;</td>
      <td>获取结果集中，包含列的数量</td>
   </tr>
   <tr>
      <td>String getColumnName(int column) throws SQLException;</td>
      <td>获取结果集中，第column列的名称</td>
   </tr>
   <tr>
      <td>String getColumnTypeName(int column) throws SQLException;</td>
      <td>获取结果集中，第column列的类型</td>
   </tr>
</table>


**`ResultSetMetaData`部分方法演示：**


**jdbc.metadata.MetaDataDemo.java**

```
//package、import
public class MetaDataDemo
{
    …
	static ResultSet rs = null;
	public static void resultSetMetaDataDemo(){
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL, 
USERNAME, PASSWORD);
			rs = connection.createStatement().executeQuery(
"select * from student") ;
			//获取结果集元数据ResultSetMetaData对象
			ResultSetMetaData rsMetaData = rs.getMetaData() ;
			//获取结果集中包含列的数量
			int count = rsMetaData.getColumnCount() ;
			//获取每列的类型、名称
			for(int i=1;i<=count;i++){
				String columnTypeName = rsMetaData.getColumnTypeName(i) ;
				String columnName = rsMetaData.getColumnName(i) ;
				System.out.println("第"+i+"列的类型是："+columnTypeName
+",名称是:"+columnName);
			}
			System.out.println();
			//显示整个student表的数据
			while(rs.next()){//获取每一行
				//获取每一列
				for(int i=1;i<=count;i++){
					System.out.print(rs.getObject(i)+"\t");
				}
				System.out.println();
			}
		}
		//catch、finally
	}
	public static void main(String[] args)
	{
         …
		resultSetMetaDataDemo();
	}
```

运行结果：

![](http://i.imgur.com/HQzFNaD.png)

运行时，数据库中stuent表的数据如下：

![](http://i.imgur.com/46eCb7D.png)







