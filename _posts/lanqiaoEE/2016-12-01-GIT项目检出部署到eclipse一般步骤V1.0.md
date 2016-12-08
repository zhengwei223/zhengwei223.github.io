---
layout: post

title: GIT项目检出部署到eclipse一般步骤V1.0

category: lanqiaoEE

tags: 文档说明

description: GIT项目检出部署到eclipse一般步骤说明

author: 丁彦涛

keywords: GIT 部署

---

# eclipse部署git项目源码说明

## 从git检出项目到Eclipse

*说明：此文档以检出lemon项目为例做详细说明。*

1. **从SVN检出项目**

  当然首先确认您的eclipse已经集成了git插件！   
  
  工具栏中Window-->Show View-->Other 显示如下图： 
  
 ![典型技全栈术模型](/public/img/technology/git/1.png) 
 
 选中如下图标，然后点击【OK】按钮！
  
 ![典型技全栈术模型](/public/img/technology/git/2.png)
 
2. **找到"Git资源库"窗口，按照如下步骤添加Git资源库。**

 ![典型技全栈术模型](/public/img/technology/git/3.png)
   
 ![典型技全栈术模型](/public/img/technology/git/4.png) 
 
 ![典型技全栈术模型](/public/img/technology/git/5.png) 
 
 ![典型技全栈术模型](/public/img/technology/git/6.png) 
 
   点击Finsh完成！等待片刻git工具会自动将git上的源码clone至你设定好的（本地）位置！
   
 ![典型技全栈术模型](/public/img/technology/git/7.png) 
 
3. **查询git资源库会发现已经自动添加到如下位置。**

 ![典型技全栈术模型](/public/img/technology/git/8.png) 

4. **“File”-->”Import“```以Maven项目```的形式从本地源码位置重新导入到开发环境。**
  
  按照下图步骤操作：
  
 ![典型技全栈术模型](/public/img/technology/git/9.png) 
 
5. **Browse-->项目所在地-->确定**

 ![典型技全栈术模型](/public/img/technology/git/10.png) 
 
 全部选中以后点击【finish】按钮
 
6. **右键lemon（大项目）-->Run As-->Maven  clean 右键lemon（大项目）-->Run As-->Maven  insatll**
  
 ![典型技全栈术模型](/public/img/technology/git/11.png) 
 
7. **右键lemon-web-->Properties-->Project Facets**

 ![典型技全栈术模型](/public/img/technology/git/12.png)

 进行如下设置，进行操作前先确定你的eclipse中已经配置了tomcat,选中如下内容：
   
 ![典型技全栈术模型](/public/img/technology/git/13.png)
 
 点击操作后会出现如下弹框：请进行如下设置，最后点击OK-->OK
 
 ![典型技全栈术模型](/public/img/technology/git/14.png) 
 
8. **右键lemon-web-->Properties-->Deployment Assembly-->Add**

   按照下图操作：
   
 ![典型技全栈术模型](/public/img/technology/git/15.png)
 
 ![典型技全栈术模型](/public/img/technology/git/16.png)
 
 ![典型技全栈术模型](/public/img/technology/git/17.png)
9. **重复第8步骤**

 ![典型技全栈术模型](/public/img/technology/git/18.png)
 
 ![典型技全栈术模型](/public/img/technology/git/19.png)
 
 你会发现所有的依赖已经添加完成，删除/src/test/目录，点击  OK

 ![典型技全栈术模型](/public/img/technology/git/20.png)
 
10. ** 把lemon-web部署到tomcat-->Finish**

 ![典型技全栈术模型](/public/img/technology/git/21.png)

  <font color=red >注意：</font>设置你的tomcat如下内容然后保存：
  
 ![典型技全栈术模型](/public/img/technology/git/22.png)
 
 启动tomcat：
 
 ![典型技全栈术模型](/public/img/technology/git/23.png)
 
 如果Consle中没有错误，恭喜你部署成功！
 
 ![典型技全栈术模型](/public/img/technology/git/24.png)
 
 测试lemon-web:
 
 [http://localhost:8080/lemon-web/](http://localhost:8080/lemon-web/)
 
 ![典型技全栈术模型](/public/img/technology/git/25.png)
  
  恭喜，从git检出源码并部署到本地成功！
 
   
   
 
      

 