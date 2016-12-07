---
layout: post

title: SVN项目检出部署到eclipse一般步骤V1.0

category: lanqiaoEE

tags: 文档说明

description:SVN项目检出部署到eclipse步骤说明

author:丁彦涛

keywords:  SVN  部署     eclipse

---

#eclipse部署svn项目源码说明

##从SVN检出项目到Eclipse

*说明：此文档以检出lemon项目为例做详细说明。* 

1.**从SVN检出项目**

首先确认你的eclipse已经集成了svn插件！

工具栏中Window-->Show View-->Other 显示如下图：

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn001.png)
 
然后点击【OK】按钮

2.**找到"SVN资源库"窗口，点击下方的图标的右侧标志，添加SVN资源库，点击Finish完成**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn002.png)

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn003.png)

3.**svn资源库会自动添加到如下位置**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn004.png)

4.**选中资源库中位置右键-->检出为**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn005.png)

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn006.png)

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn007.png)

5.**删除项目但不要删除本地文件**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn008.png)

6.**“File”-->”Import“以Maven项目的形式重新导入到开发环境**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn009.png)

7.**Browse-->项目所在地-->确定**
 
![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn010.png)

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn011.png)

8.**右键lemon（大项目）-->Run As-->Maven  clean    右键lemon（大项目）-->Run As-->Maven  insatll**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn012.png)

9.**右键lemon-web-->Properties-->Project Facets**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn013.png)

进行如下设置，进行操作前先确定你的eclipse中已经配置了tomcat,选中如下内容:

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn014.png)

点击操作后会出现如下弹框：请进行如下设置，最后点击OK-->OK

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn015.png)

10.**右键lemon-web-->Properties-->Deployment Assembly-->Add**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn016.png)

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn017.png)

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn018.png)

11.**重复第10步骤**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn019.png)

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn020.png)

你会发现所有的依赖已经添加完成，删除/src/test/目录，点击OK

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn021.png)

12.**重复第8步骤**

13.**把lemon-web部署到tomcat-->Finish**

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn022.png)

<font color="red">注意：</font>设置你的tomcat如下内容：保存

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn023.png)

启动tomcat：

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn024.png)

如果Consle中没有错误，恭喜你部署成功！

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn025.png)

测试lemon-web的地址:

http://localhost:8080/lemon-web/

![典型技全栈术模型](E:\lanqiaoEE\蓝桥通用文档\SVN项目检出部署到eclipse一般步骤V1.0\svn/svn026.png)

恭喜，从svn检出源码并部署到本地成功！









