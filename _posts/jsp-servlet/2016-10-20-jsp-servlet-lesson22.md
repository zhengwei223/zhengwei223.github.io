---

layout: post


title: Quartz


category: JSP-Servlet教程


tags: JSP Servlet


description: 本章将系统介绍Quartz。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---


# 22.1 Quartz框架 #

如果希望程序执行一个“计划任务”，即任务调度，例如在将来的某个时间去执行一段程序、或在某个时间点循环的执行，就可以使用Quartz框架。


Quartz框架是一个开源的企业级任务调度服务，它可以单独使用，也可以整合进JAVA应用中。Quartz框架提供了强大的任务调度机制，使用起来也非常简单。Spring也专门为Quartz提供了相关的工具类，帮助我们便捷地配置计划任务。


## 22.1.1 Quartz框架基本概念 ##

使用Quartz框架之前，需要先下载Quartz的相关`JAR`包。可以在其官方网站进行下载[http://www.quartz-scheduler.org/downloads](http://www.quartz-scheduler.org/downloads)。本书是基于Quartz的2.2.2版本，下载的Quartz文件名是quartz-2.2.2-distribution.tar.gz。


要想实现任务调度，首先需要明确3个概念：任务、触发器、调度器。


**(1)任务**

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

其中`execute()`方法用来执行具体的任务，交给该接口的实现类去实现此方法。`JobExecutionContext`对象可以获取调度对象的上下文信息，如任务名称等。

**`Job`接口有一个常用实现类：`JobDetail`。**


** (2)触发器**

“任务”要在什么时间执行呢？就是需要依靠触发器来指定特定的时间。Quartz提供了`Trigger`接口，用来定义时间规则，例如每月的最后一天、每天早上8点、每周五下午6点……

**`Trigger`接口有两个实现类：`SimpleTrigger`和`CronTrigger`。**


**(3)调度器**


有了“任务”和“触发器（即时间规则）”后，我们还需要“调度器”来将二者关联起来，从而实现“在规定的时间执行特定的任务”。Quartz提供了`Scheduler`类来实现调度器，我们可以将任务（`Job`）对象和触发器（`Trigger`）对象注册到调度器（`Scheduler`）中，由调度器来决定任务和触发器的对应关系，即`Scheduler`可以将`Trigger`绑定到一个`Job`上。换句话说，调度器决定了哪个触发器定时执行哪个任务。


## 22.1.2 Quartz框架入门程序 ##


下面介绍使用Quartz框架的基本步骤：


1.导入Quartz的`Jar`包

将之前下载的quartz-2.2.2-distribution.tar.gz解压，再把解压后的lib目录中的以下4个JAR文件导入项目：

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

**2.创建业务**

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

**3.创建计划任务**

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


**4.通过调度器和触发器，实现“计划任务”**

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
表示一共要执行6此（正常执行1次+额外重复5次）
		scheduleBuilder.withRepeatCount(5);

		//根据TriggerBuilder对象和SimpleScheduleBuilder对象,
创建一个简单触发器SimpleTrigger对象
		SimpleTrigger simpleTrigger 
= triggerBuilder.withSchedule(scheduleBuilder).build();

		// 创建调度器工厂
		SchedulerFactory sfc = new StdSchedulerFactory();
		// 创建一个调度器
		Scheduler sched = sfc.getScheduler();
		// 注册任务和触发器
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

![](http://i.imgur.com/35qBhOy.png)

*图21-01*

首先通过`JobBuilder`来创建`Job`对象，并指定任务是“`PlanJob`”类中的`execute()`方法、任务名称为“PlanJob”、任务所在组名为“group1”。再通过`TriggerBuilder`对象设置触发器Builder的名字、所在组、以及触发器的开始执行时间。之后再使用`SimpleScheduleBuilder`对象设置调度的配置信息：重复执行的时间间隔、额外重复执行的次数。之后，再根据触发器Builder和调度Builder来创建一个简单触发器`SimpleTrigger`对象。最后通过调度器工厂获取一个调度器sched，用调度器sched的`scheduleJob()`方法将任务job和触发器simpleTrigger注册绑定在一起，最后使用调度器sched的`start()`方法执行调度（即“计划任务”），再通过`shutdown()`方法关闭调度。


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

## 22.1.3 JobExecutionContext ##