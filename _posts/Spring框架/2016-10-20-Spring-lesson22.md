---

layout: post


title: Quartz


category: Spring框架


tags: Spring框架


description: 本章将系统介绍Quartz。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE Spring框架

---


# 24.1 Quartz框架 #

如果希望程序执行一个“计划任务”（或称为“任务调度”），就可以使用Quartz框架。例如在将来的某个时间去执行一段程序，或在某个时间段内循环的执行等。


Quartz框架是一个开源的企业级任务调度服务，它可以单独使用，也可以整合在JAVA应用中。Spring也专门为Quartz提供了相关的工具类，帮助我们便捷的配置计划任务。


## 24.1.1 Quartz框架基本概念 ##


使用Quartz框架之前，需要先下载Quartz的相关`JAR`包。可以在其官方网站进行下载[http://www.quartz-scheduler.org/downloads](http://www.quartz-scheduler.org/downloads)。本书是基于Quartz的2.2.2版本，下载的Quartz文件名是quartz-2.2.2-distribution.tar.gz。


要想实现任务调度，首先需要明确3个概念：任务、触发器、调度器。


#### (1)任务 ####

指在固定时间需要执行的工作内容。Quartz提供了`Job`接口，来帮助我们定义一个任务。该接口如下：


**Job.java**

```
package org.quartz;
public interface Job 
{
	public void execute(JobExecutionContext context) 
throws JobExecutionException;
}
```

其中`execute()`方法用于执行具体的任务，需要由Job的实现类去实现。JobExecutionContext对象可以获取调度对象的上下文信息，如任务名称等。

**`Job`接口有一个常用实现类：`JobDetail`。**


#### (2)触发器 ####

 “任务”会在什么时间执行呢？就需要依靠触发器来指定。Quartz提供了Trigger接口，用于定义执行“任务”的时间规则，例如每月的最后一天、每天早上8点、每周五下午6点……

**`Trigger`接口有两个实现类：`SimpleTrigger`和`CronTrigger`。**


#### (3)调度器 ####


有了“任务”和“触发器（即时间规则）”后，我们还需要“调度器”来将二者关联起来，从而实现“在规定的时间执行特定的任务”。Quartz提供了`Scheduler`类来实现调度器，我们可以将任务（`Job`）对象和触发器（`Trigger`）对象注册到调度器（`Scheduler`）中，由调度器来决定任务和触发器的对应关系，即`Scheduler`可以将`Trigger`绑定到一个`Job`上。换句话说，调度器决定了哪个触发器定时执行哪个任务。


## 24.1.2 Quartz框架入门程序 ##


**下面介绍使用Quartz框架的基本步骤：**


#### 1.导入Quartz的`Jar`包 ####

将之前下载的quartz-2.2.2-distribution.tar.gz解压，再把lib目录中的以下4个JAR和log4j.jar导入项目：

<table>
   <tr>
      <td>quartz-2.2.2.jar</td>
      <td>quartz-jobs-2.2.2.jar</td>
      <td>slf4j-api-1.7.7.jar</td>
   </tr>
   <tr>
      <td>slf4j-log4j12-1.7.7.jar</td>
      <td>log4j-1.2.17.jar</td>
      <td></td>
   </tr>
</table>

#### 2.创建业务 ####

创建普通的业务，本次采用一个模拟业务，如下，


**RemindService.java**

```
public class RemindService
{
	public void callClassMeeting(){
		System.out.println("需要被提醒的业务（如召开班会)");
	}
}
```

#### 3.创建计划任务 ####

创建需要执行的“计划任务”。需要实现Quartz框架提供的`Job`接口，如下，

**PlanJob.java**

```
import org.lanqiao.quartz.service.RemindService;
import org.quartz.*;
public class PlanJob implements Job
{
	private RemindService remindService;
	@Override
	public void execute(JobExecutionContext jobContext) 
throws JobExecutionException 
{
		remindService = new RemindService();
		remindService.callClassMeeting();
	}
}
```

在接口定义的`execute()`方法中，调用业务中的`callClassMeeting()`方法。


#### 4.通过任务、触发器和调度器，实现“计划任务” ####

使用Quartz API进行配置及调度操作，如下，


**TestJob.java**


```
package org.lanqiao.quartz.test;
import org.lanqiao.quartz.job.PlanJob;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

public class TestJob
{
	public void doRemind() 
throws SchedulerException, InterruptedException
	{
		// 创建一个任务
		JobDetail job = JobBuilder.newJob(PlanJob.class)
.withIdentity("RemindJob", "group1").build();
		// 创建一个TriggerBuilder对象,为创建触发器Trigger对象做准备
		TriggerBuilder<Trigger> triggerBuilder 
= TriggerBuilder.newTrigger();
		//为triggerBuilder创建唯一标识符：
设置该对象的名字为"trrigger1"，所在的组名是"group1"
		triggerBuilder = triggerBuilder
.withIdentity("trigger1", "group1");
		//设置触发器的开始执行时间:立即执行
		triggerBuilder.startNow();

		// 创建一个SimpleScheduleBuilder对象,
为创建触发器Trigger对象做准备
		SimpleScheduleBuilder scheduleBuilder 
= SimpleScheduleBuilder.simpleSchedule();
		//设置重复执行的间隔时间为1秒
		scheduleBuilder = scheduleBuilder
.withIntervalInMilliseconds(1000);
		//设置额外重复执行的次数。例如，设置为5，
表示一共要执行6次（正常执行1次+额外重复5次）
		scheduleBuilder.withRepeatCount(5);

		//根据TriggerBuilder对象和SimpleScheduleBuilder对象,
创建一个简单触发器SimpleTrigger对象
		SimpleTrigger simpleTrigger 
= triggerBuilder.withSchedule(scheduleBuilder).build();

		// 创建调度器工厂
		SchedulerFactory sfc = new StdSchedulerFactory();
		// 创建一个调度器
		Scheduler sched = sfc.getScheduler();
		// 在调度器中，注册任务和触发器
		sched.scheduleJob(job, simpleTrigger);

		//执行调度
		sched.start();
		// 关闭调度
		//sched.shutdown();
	}

	public static void main(String[] args)
	{
           // 省略异常处理
			TestJob testJob = new TestJob();
			testJob.doRemind();
	}
}
```


运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/spring-zq/24.1.png)

*图24-01*

首先通过JobBuilder来创建Job对象，并指定任务是“PlanJob”类中的`execute()`方法、任务名称为“PlanJob”、任务组名为“group1”，再通过TriggerBuilder对象设置触发器对象的名字、所在组、以及触发器的开始执行时间。之后再使用SimpleScheduleBuilder对象设置调度的配置信息：重复执行的时间间隔、额外重复执行的次数。之后，再根据触发器Builder和调度Builder来创建一个简单触发器SimpleTrigger对象。最后通过调度器工厂获取一个调度器sched，用调度器sched的`scheduleJob()`方法将任务job和触发器simpleTrigger注册绑定在一起，最后使用调度器sched的`start()`方法执行调度（即“计划任务”），再通过`shutdown()`方法关闭调度。


`shutdown`方法具有两个重载的方法，具体如下：

<table>
   <tr>
      <td colspan="2">方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td colspan="2">void shutdown()</td>
      <td>立即无条件结束调度</td>
   </tr>
   <tr>
      <td rowspan="2">void shutdown(boolean)</td>
      <td>shutdown(false)</td>
      <td>等价于shutdown();</td>
   </tr>
   <tr>
      <td>shutdown(true)</td>
      <td>当前正在执行，或正在等待的任务完成后再结束。</td>
   </tr>
</table>

需要注意，调度器sched的`start()`方法，本质并不是立刻执行调度，而是去参照触发器Builder定义的执行时间。

例如，本例中触发器Builder定义的开始时间是：`triggerBuilder.startNow()`表示立即执行。除了`startNow()`以外，还可以使用`startAt()`方法定义触发器的开始执行时间、用`endAt()`方法定义触发器的结束时间。

其中`startAt()`和`endAt()`方法的参数是`Date`类型：如下


**TestJob.java**

```
…
public class TestJob
{
	public void doRemind() throws SchedulerException, 
InterruptedException, ParseException
	{
		…
		//triggerBuilder.startNow();
		SimpleDateFormat sdf 
= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		/*设置触发器的开始执行时间为:2017-04-04 09:14:22*/
		Date startDate = new Date();
		startDate = sdf.parse("2017-04-04 09:24:12");
		triggerBuilder.startAt(startDate);
		
		/*设置触发器的开始执行时间为:2017-04-04 09:24:15*/
		Date endDate = new Date();
		endDate = sdf.parse("2017-04-04 09:24:15");
		triggerBuilder.endAt(endDate);
		…
	}
}
```

## 24.1.3 JobExecutionContext ##


可以通过`Job`接口的`execute()`方法中的参数`JobExecutionContext`对象，来获取调度需要的各种信息。如下，

**PlanJob.java**

```
…
public class PlanJob implements Job
{
…
	@Override
	public void execute(JobExecutionContext jobContext) 
throws JobExecutionException 
{
		System.out.println("触发器的key值（触发器组名+触发器名）：" 
+ jobContext.getTrigger().getKey() 
+ "\t任务的key值（任务组名+任务名）："	
+ jobContext.getJobDetail().getKey());
        …
}
}
```

通过`JobExecutionContext`对象获取触发器的名字、所在组名，以及任务的名字、所在组名。运行结果如图，

![](http://lemon.lanqiao.org:8082/teaching/img/spring-zq/24.2.png)


*图24-02*

此外，还可以通过getJobDetail对象获取一个JobDataMap对象。JobDataMap对象可以用来增加并获取数据。例如，可以使用JobDataMap对象来传递学生的集合对象，如下，


先在测试类中向JobDataMap对象增加数据。


**TestJob.java**


```
…
public class TestJob
{
	public void doRemind() 
throws SchedulerException, InterruptedException
	{
		// 创建一个任务
		JobDetail job = JobBuilder.newJob(PlanJob.class)
.withIdentity("PlanJob", "group1").build();
		
		JobDataMap dataMap = job.getJobDataMap();
		List<String> students = new ArrayList<String>();
		students.add("张三");
		students.add("李四");
		//将学生信息增加到JobDataMap对象中
		dataMap.put("students",students);
		…
	}
}
```

再在任务类中，通过`JobDataMap`对象获取之前放入的数据：


**PlanJob.java**

```
…
public class PlanJob implements Job
{
	private RemindService remindService;
	@Override
	public void execute(JobExecutionContext jobContext) 
throws JobExecutionException
	{
	    …
		JobDataMap dataMap = jobContext.getJobDetail()
.getJobDataMap();
		//获取学生信息
		List students = (List)dataMap.get("students");
		System.out.println(students);
		…
	}
}
```

## 24.1.4 SechduleBuilder ##

在1.x版本的Quartz中，触发器分为`SimpleTrigger`、`CronTrigger`等。但是在2.x版本，这些具体的`Trigger`类都被废弃了，取而代之的是`TriggerBuilder`中的`withSchedule()`方法。该方法需要传入一个`SechduleBuilder`对象作为参数，通过该对象来实现触发器的逻辑。本书使用的Quartz2.2版本中的`ScheduleBuilder`有以下三种:

<table>
   <tr>
      <td>ScheduleBuilder类型</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>SimpleScheduleBuilder</td>
      <td>指定触发的间隔时间和执行次数；</td>
   </tr>
   <tr>
      <td>CronScheduleBuilder</td>
      <td>通过一个Cron表达式，来指定具体的触发规则。例如“每周五18:00”、“每天6:00”等。</td>
   </tr>
   <tr>
      <td>CalendarIntervalScheduleBuilder</td>
      <td>对CronScheduleBuilder的补充。能指定每隔一段时间触发一次。</td>
   </tr>
</table>

我们之前已经使用过`scheduleBuilder`来指定间隔时间和执行次数。现在来讲解`CronScheduleBuilder`的使用。


`CronScheduleBuilder`需要通过`Cron`表达式来定义准确的执行时间。例如，`“0 0 14-18 ? * MON-FRI”`就是一个`Cron`表达式，表示“每周一至周五的14:00~18:00”。


`Cron`表达式有6或7个时间元素组成（第七个可选），元素之间用空格分隔。从左往右，7个元素的含义如下：


<table>
   <tr>
      <td>位置</td>
      <td>元素含义</td>
      <td>取值范围</td>
      <td>可包含的特殊字符</td>
   </tr>
   <tr>
      <td>第1个</td>
      <td>秒</td>
      <td>0~59</td>
      <td>,   -   *   /</td>
   </tr>
   <tr>
      <td>第2个</td>
      <td>分钟</td>
      <td>0~59</td>
      <td>,   -   *   /</td>
   </tr>
   <tr>
      <td>第3个</td>
      <td>小时</td>
      <td>0~23</td>
      <td>,   -   *   /</td>
   </tr>
   <tr>
      <td>第4个</td>
      <td>月份中的第几天</td>
      <td>1~31</td>
      <td>,   -   *   /   ?   L</td>
   </tr>
   <tr>
      <td>第5个</td>
      <td>月份</td>
      <td>1~12或JAN~DEC</td>
      <td>,   -   *   /</td>
   </tr>
   <tr>
      <td>第6个</td>
      <td>星期中的第几天（即星期几）</td>
      <td>1~7或SUN~SAT（1代表星期天、2代表星期一、…、7代表星期六）</td>
      <td>,   -   *   /   ?   L   #</td>
   </tr>
   <tr>
      <td>第7个</td>
      <td>年份</td>
      <td>1970~2099</td>
      <td>,   -   *   /</td>
   </tr>
</table>


其中，特殊字符的含义如下：

<table>
   <tr>
      <td>特殊字符</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>,</td>
      <td>表示列出枚举值。例如，在“分钟”元素使用“5,20”，表示在“第5分钟、第20分钟”各触发一次。</td>
   </tr>
   <tr>
      <td>-</td>
      <td>表示范围，例如，在“分钟”元素使用“5-20”，表示“从第5分钟到第20分钟”内的每分钟都触发一次。</td>
   </tr>
   <tr>
      <td>*</td>
      <td>表示匹配该元素的所有值。例如，在“分钟”元素使用“*”，表示每分钟都会触发一次。</td>
   </tr>
   <tr>
      <td>/</td>
      <td>如“A/B”：表示A时刻开始触发，然后每隔B时间都触发一次。例如，在“分钟”元素使用“5/20”，表示第5分钟触发一次，然后每个20分钟（如第25分钟、第45分钟等）都分别触发一次。</td>
   </tr>
   <tr>
      <td>?</td>
      <td>只能用于“月份中的第几天”和“星期几”两个元素，表示不指定值。当这两个元素其中之一被指定了值之后，为了避免冲突，需要将另外一个元素的值设置为“？”</td>
   </tr>
   <tr>
      <td>L</td>
      <td>“Last”的简称，表示最后。只能用于“月份中的第几天”和“星期几”两个元素。需要注意的是，在西方国家，“星期”的最后一天是“星期六SAT（或用数字7表示）”。例如，“0 0 8 ? * L”表示“每个月的每周六8:00”。并且，当用于“星期几”时，“L”前面可以加一个数字（假定数字是n），表示“月份中的最后一个星期n”，例如“0 0 0 ? * 1L”中“1L”表示“当月的最后一个星期天”（1指星期天）。</td>
   </tr>
   <tr>
      <td>#</td>
      <td>只能用于 “星期几”一个元素，表示当月的第几个星期几。例如，“4#2”表示当月第2个星期三（4指星期三，2指第2个）</td>
   </tr>
</table>

`Cron`表达式示例：

<table>
   <tr>
      <td>Cron表达式</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>0 0 10,14,16 * * ?</td>
      <td>每天的10点、14点、16点</td>
   </tr>
   <tr>
      <td>0 0/30 9-17 * * ?</td>
      <td>朝九晚五内的每半个小时</td>
   </tr>
   <tr>
      <td>0 0 12 ? * WED</td>
      <td>每个星期三的12点</td>
   </tr>
   <tr>
      <td>0 0 12 * * ?</td>
      <td>每天中午12点</td>
   </tr>
   <tr>
      <td>0 15 10 ? * *</td>
      <td>每天上午10:15 </td>
   </tr>
   <tr>
      <td>0 15 10 * * ?</td>
      <td>每天上午10:15 </td>
   </tr>
   <tr>
      <td>0 15 10 * * ? *</td>
      <td>每天上午10:15 </td>
   </tr>
   <tr>
      <td>0 15 10 * * ? 2015</td>
      <td>2015年的每天10:15 </td>
   </tr>
   <tr>
      <td>0 * 14 * * ?</td>
      <td>每天14:00至14:59期间的每1分钟</td>
   </tr>
   <tr>
      <td>0 0/5 14 * * ?</td>
      <td>每天14:00至14:55期间的每5分钟</td>
   </tr>
   <tr>
      <td>0 0/5 14,18 * * ?</td>
      <td>每天14:00至18:55期间，和18:00至18:55期间的每5分钟</td>
   </tr>
   <tr>
      <td>0 0-5 14 * * ?</td>
      <td>每天14:00至14:05期间的每1分钟</td>
   </tr>
   <tr>
      <td>0 10,44 14 ? 3 WED</td>
      <td>每年三月的所有星期三的14:10和14:44</td>
   </tr>
   <tr>
      <td>0 15 10 ? * MON-FRI</td>
      <td>周一至周五的10:15</td>
   </tr>
   <tr>
      <td>0 15 10 15 * ?</td>
      <td>每月15日10:15</td>
   </tr>
   <tr>
      <td>0 15 10 L * ?</td>
      <td>每月最后一日的10:15 </td>
   </tr>
   <tr>
      <td>0 15 10 ? * 6L</td>
      <td>每月的最后一个星期五10:15</td>
   </tr>
   <tr>
      <td>0 15 10 ? * 6L 2002-2005</td>
      <td>2002年至2005年间，每月的最后一个星期五10:15</td>
   </tr>
   <tr>
      <td>0 15 10 ? * 6#3</td>
      <td>每月的第三个星期五10:15</td>
   </tr>
</table>


使用`CronScheduleBuilder`实现“计划任务”的步骤与使用`SimpleScheduleBuilder`方式基本相同。 不同部分的代码如下：


**TestJobWithCronExpression.java**


```
…
public class TestJobWithCronExpression
{
	public void doRemind() throws SchedulerException, 
InterruptedException, ParseException
	{
…
		triggerBuilder = triggerBuilder
.withIdentity("trigger1", "group1");
		
		// 创建一个CronScheduleBuilder对象,
并通过Cron表达式指定执行时间是：每分钟的第5秒
		CronScheduleBuilder scheduleBuilder 
= CronScheduleBuilder.cronSchedule("5 * * * * ?");
		
		// 根据TriggerBuilder对象和SimpleScheduleBuilder对象,
创建一个简单触发器SimpleTrigger对象
		CronTrigger cronTrigger
= triggerBuilder.withSchedule(scheduleBuilder)
.build();

		// 创建调度器工厂
		SchedulerFactory sfc = new StdSchedulerFactory();
		// 创建一个调度器
		Scheduler sched = sfc.getScheduler();	
		// 执行调度
		sched.start();
		// 注册任务和触发器
		sched.scheduleJob(job, cronTrigger);
		// 关闭调度
		//sched.shutdown();
	}
   …
}
```

通过`CronScheduleBuilder.cronSchedule("5 * * * * ?")`创建一个`CronScheduleBuilder`对象，并将`Cron`表达式`“5 * * * * ?”`作为方法的参数，用来指定执行的时间为“每分钟的第5秒”。最后再将`CronScheduleBuilder`对象放入`TriggerBuilder`对象的`withSchedule()`方法中。


# 24.2 在Spring中集成Quartz #


Spring提供了对Quartz的支持，它对Quartz的核心类进行了封装，使开发人员可以更便捷的实现“计划任务”。在Spring中使用Quartz的步骤如下：


**(1)导入JAR文件**

除了`quartz-2.2.2-distribution.tar.gz`中相关的JAR以外，还需要导入以下两个JAR文件：**spring-context-support-4.2.5.RELEASE.jar**、**spring-tx-4.2.5.RELEASE.jar**


**(2)在Spring IOC容器中注册调度工厂**

**applicationContext.xml**


```
<beans …>
    <!-- 注册调度工厂 -->
	<bean id="schedulerFactoryBean" class="org.springframework.
scheduling.quartz.SchedulerFactoryBean" />
</beans>
```

**(3)将任务的全部信息封装到一个实体类中**

**ScheduleJob.java**


```
public class ScheduleJob
{
	// 任务编号
	private String jobId;
	// 任务名称
	private String jobName;
	// 任务分组
	private String jobGroup;
	// 任务状态 0禁用 1启用 2删除
	private String jobStatus;
	// 任务运行时间表达式
	private String cronExpression;
	// 任务描述
	private String desc;
    //setter、getter
}
```

**(4)创建计划任务**


**PlanJobForSpring.java**


```
//import…
public class PlanJobForSpring implements Job 
{
	private RemindService remindService;
public void execute(JobExecutionContext context) 
throws JobExecutionException {
        System.out.println("任务成功运行");
        ScheduleJob scheduleJob = (ScheduleJob)context. getMergedJobDataMap().get("scheduleJob");
        System.out.println("任务名称 = [" 
+ scheduleJob.getJobName() + "]");
        remindService = new RemindService();
		remindService.callClassMeeting();
		System.out.println();
    }
}
```

**(5)创建业务**

模拟业务：**RemindService.java**

```
public class RemindService
{
	public void callClassMeeting(){
		System.out.println("需要被提醒的业务（如召开班会)");
	}
}
```

**(6)在SpringIOC中配置任务信息、jobDetail、jobDataAsMap、触发器、调度工厂等**

**applicationContext.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans.xsd">
	
	<!-- 配置任务的信息 -->
	<bean id="scheduleJobEntity" 
class="org.lanqiao.spring.job.ScheduleJob">
    	<property name="jobId" value="1001"></property>
    	<property name="jobName" value="任务1"></property>
    	<property name="jobGroup" value="任务组A"></property>
    	<property name="jobStatus" value="1"></property>
    	<property name="cronExpression" value="0/5 * * * * ?">
</property>
    	<property name="desc" value="任务描述信息..."></property>
    </bean>

    <!-- 配置jobDetail -->
<bean id="jobDetail" class="org.springframework.scheduling.
quartz.JobDetailFactoryBean">
    	<!-- 配置计划任务 -->
        <property name="jobClass" 
value="org.lanqiao.quartz.spring.job.PlanJobForSpring">
</property>
        <!-- 配置jobDataAsMap -->
        <property name="jobDataAsMap">  
            <map>  
                <entry key="scheduleJob">
                	<ref bean="scheduleJobEntity"/>
                </entry>  
            </map>  
        </property>            
    </bean>
	 <!-- 配置CornTrigger类型的触发器 -->
     <bean id="cornTrigger" 
class="org.springframework.scheduling.
quartz.CronTriggerFactoryBean">
	       <property name="jobDetail" ref="jobDetail"/>
	       <!-- 配置Cron表达式 ，表达式是在id为"scheduleJobEntity"中
的cronExpression属性中设置的-->
	       <property name="cronExpression" 
value="#{scheduleJobEntity.cronExpression}"/>
    </bean> 
	
    <!-- 配置调度工厂 -->
	<bean id="schedulerFactoryBean" 
class="org.springframework.scheduling.
quartz.SchedulerFactoryBean" >
		<!-- 配置触发器 -->
		  <property name="triggers">
			<list>
	            <ref bean="cornTrigger"/>
	        </list>
	      </property>
	</bean>
</beans>
```


**(7)测试计划任务**

**TestJobWithSpring.java**


```
//import…
public class TestJobWithSpring
{
	public static void main(String[] args) throws Exception
	{
		ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
		Scheduler scheduler 
= (Scheduler) ctx.getBean("schedulerFactoryBean");
		//计划任务在100秒内有效	
		scheduler.start();
		Thread.sleep(100000);
		scheduler.shutdown();
	}
}
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/spring-zq/24.3.png)

*图24-03*


以上是在Spring中使用了`CornTrigger`类型的触发器，如果要使用`SimpleTriggerBean`类型的触发器，可做如下配置：


**applicationContext.xml**


```
<beans …>
    …
<!-- 定义simpleTrigger触发器 -->
<bean id="simpleTrigger" 
class="org.springframework.scheduling.
quartz.SimpleTriggerFactoryBean">
        <property name="jobDetail" ref="jobDetail"></property>
        <property name="repeatCount">
            <value>8</value>
        </property>
        <property name="repeatInterval">
            <value>1000</value>
        </property>
        <property name="startDelay">
            <value>4</value>
        </property>
    </bean> 
    <!-- 配置调度工厂 -->
	<bean id="schedulerFactoryBean" 
class="org.springframework.scheduling.
quartz.SchedulerFactoryBean" >
		<!-- 配置触发器 -->
		  <property name="triggers">
			<list>
	            <ref bean="simpleTrigger"/>
	        </list>
	      </property>
	</bean>
</beans>
```

# 24.3 练习题 #

1使用Spring整合Quartz的步骤是什么？


2 如何使用Cron表达式表示“每年9月19日中午12:25”？