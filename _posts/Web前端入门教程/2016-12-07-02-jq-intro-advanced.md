---
layout: post
title: JavaScript类库JQuery高级
category: Web前端入门教程
tags: Web前端
description: 本章的主要介绍如何用JavaScript语言类库JQuery的高级用法
author: 曹小虎
keywords: lanqiao 蓝桥 全栈 教程 Web前端
---

# 实验一：用jQuery制作动画

目的：
1. 掌握jQuery的动画相关操作
2. 用jQuery制作简单的进度条

## 1.1 掌握动画API

### 准备工作

&emsp;&emsp;新建文件夹“jq_letter_game”。

&emsp;&emsp;在文件夹内部新建名字是“img”和“js”的文件夹，一个名字是“index.html”的空白网页文件。

&emsp;&emsp;在“img”目录下放入26个英文字母的图片。

&emsp;&emsp;在“js”目录下放入“jquery-3.1.1.js”的jQuery类库文件，同时新建一个“gameCore.js”文件。

&emsp;&emsp;在页面底部引入外部js文件，同时把网页标题定义成“字母游戏”。

&emsp;&emsp;至此，你将会得到下面样子的一个文件夹：

 ![jq_adv_letter_game_01](/public/img/js/jq_adv_letter_game_01.gif) 

### show和hide

&emsp;&emsp;在“index.html”页面内容区增加下面的内容：

	<div class="screen1">
	</div>
	
	<button id="testShowHide">测试显示和隐藏</button>

	<h1 class="status"></h1>

&emsp;&emsp;在头部的内部样式内容区增加如下CSS代码：

	body{
		margin:0;
		background:url(game.jpg) no-repeat;
		background-size:cover;
		font-family: "幼圆";
		background:#E8F0F0;
		overflow:hidden;
	}
	
	.screen1{
		width:100%;
		height:100%;
		background:url(./img/gamebg.jpg) no-repeat;
		background-size:cover;
		margin:0 auto; padding:0;
		position:relative;overflow:hidden;
	}
	
	.status {
		color : red;
		margin-top : 0px;
	}

&emsp;&emsp;在“gameCore.js”文件里面定义如下代码：

    //Game类型对象的构造函数
    function Game(){
		//用来保存26个字母
    	this.letters = {};
    }
    
	//Game类型对象构造函数的prototype属性
    Game.prototype = {
		/* 制作屏幕背景 */
		createScreen : function(){
			var height=$(window).height();
			var width1=$(window).width();
			$(".screen1").css({
				width:width1,
				height:$(window).height()-100,overflow:"hidden"
			})
		},
		/* 初始化游戏对象，初始化屏幕、按钮 */
		initGame : function(){
			//获取Game对象
			var game = this;
			
			game.createScreen();
			
			$("#testShowHide").click(function(e){

				game.hideShowLetter();
			});
		},
		hideShowLetter : function(){
		//获取Game对象
		var game = this ;
			
		$(".screen1").html('');
		$(".status").html("现在正在测试显示和隐藏");
		//解除绑定以前所有的keyup事件
		$(document).unbind('keyup');		
		$(document).keyup(function(e){
			var keyCode = e.which;
			var charLetter=String.fromCharCode(keyCode);
			
			var time=new Date().getTime();
			
			var ele=$("<div data-time="+time+"></div>").css({
						width:"100px",height:"100px",
						display :'inline-block',
						background:"url(img/"+charLetter+".png) center no-repeat",
						backgroundSize:"contain",
						lineHeight:"60px",
						fontSize:"30px",
						color:"#fff",
						textAlign:"center",
						position:"relative"
					}).click(function(e){
						var $this = $(this);
						/*
						$(this).toggle();
						*/
						if($this.is(':visible')){  //如果当前对象可见
                            //隐藏
							$this.hide(2000,function(){
								//隐藏好之后再把它显示出来
								$this.show(2000);
							});  
						}						
					}).appendTo(".screen1");
		})
	}	
	};

&emsp;&emsp;在网页文件下方*jQuery的ready事件的等价写法*的匿名函数里面写入下面代码：

		var g = new Game();
		g.initGame();

&emsp;&emsp;刷新页面以后，可以看到：

 ![jq_adv_letter_game_02](/public/img/js/jq_adv_letter_game_02.gif) 

### fadeIn和fadeOut

&emsp;&emsp;在“index.html”页面内容区“testShowHide”按钮下面增加一个新按钮：

	<button id="testFadeInOut">测试淡入和淡出</button>

&emsp;&emsp;在“gameCore.js”文件的“Game.prototype”对象里面增加一个新属性：

	fadeInOutLetter : function(){
		//获取Game对象
		var game = this ;
		
		$(".screen1").html('');
		$(".status").html("现在正在测试淡入和淡出");
		
		$(document).unbind('keyup');
		$(document).keyup(function(e){
			var keyCode = e.which;
			var charLetter=String.fromCharCode(keyCode);
			
			var time=new Date().getTime();
			
			var ele=$("<div data-time="+time+"></div>").css({
						width:"100px",height:"100px",
						display :'inline-block',
						background:"url(img/"+charLetter+".png) center no-repeat",
						backgroundSize:"contain",
						lineHeight:"60px",
						fontSize:"30px",
						color:"#fff",
						textAlign:"center",
						position:"relative"
					}).click(function(e){
						var $this = $(this);
						/*
						$(this).fadeToggle();
						*/
						if($this.is(':visible')){  
							$this.fadeOut(2000,function(){
								$this.fadeIn(2000);
							});  
						}
						
					}).appendTo(".screen1");
			
		})
	}

&emsp;&emsp;在“gameCore.js”文件里面修改“Game.prototype.initGame”函数里面增加新代码：

			$("#testFadeInOut").click(function(e){

				game.fadeInOutLetter();
			})

&emsp;&emsp;刷新页面以后，你将会看到：

 ![jq_adv_letter_game_03](/public/img/js/jq_adv_letter_game_03.gif) 

### slideUp和slideDown

&emsp;&emsp;在“index.html”页面内容区“testShowHide”按钮下面增加一个新按钮：

	<button id="testSlideUpDown">测试上滑和下滑</button>

&emsp;&emsp;在“gameCore.js”文件的“Game.prototype”对象里面增加一个新属性：

	slideUpDownLetter : function(){
		//获取Game对象
		var game = this ;
		
		$(".screen1").html('');
		$(".status").html("现在正在测试上滑和下滑");
		
		$(document).unbind('keyup');
		$(document).keyup(function(e){
			var keyCode = e.which;
			var charLetter=String.fromCharCode(keyCode);
			
			var time=new Date().getTime();
			
			var ele=$("<div data-time="+time+"></div>").css({
						width:"100px",height:"100px",
						display :'block',
						background:"url(img/"+charLetter+".png) center no-repeat",
						backgroundSize:"contain",
						lineHeight:"60px",
						fontSize:"30px",
						color:"#fff",
						textAlign:"center",
						position:"relative"
					}).click(function(e){
						var $this = $(this);
						/*
						$(this).toggleSlide();
						*/
						if($this.is(':visible')){  
						    var $demoDiv = $("div[data-time=slide-demo-"+time+"]");
							$this.slideUp(2000,function(){
								$this.slideDown(2000);
							});  
						}
						
					}).appendTo(".screen1");
			
			})
	}


&emsp;&emsp;在“gameCore.js”文件里面修改“Game.prototype.initGame”函数里面增加新代码：

			$("#testSlideUpDown").click(function(e){

				game.slideUpDownLetter();
			});

&emsp;&emsp;刷新页面以后，你将会看到：

 ![jq_adv_letter_game_04](/public/img/js/jq_adv_letter_game_04.gif) 

### animate

&emsp;&emsp;在“index.html”页面内容区“testShowHide”按钮下面增加一个新按钮：

	<button id="testAnimate">测试动画</button>

&emsp;&emsp;在“gameCore.js”文件的“Game.prototype”对象里面增加一个新属性：

	animateLetter : function(){
		//获取Game对象
		var game = this ;
		
		$(".screen1").html('');
		$(".status").html("现在正在测试测试动画");
		
		$(document).unbind('keyup');
		//生成16个字母的数组
		$(document).keyup(function(e){
			var keyCode = e.which;
			var charLetter=String.fromCharCode(keyCode);	

			var top1=-Math.round(Math.random()*100);
			do{
				var left1=Math.round(Math.random()*740);
				//把“left1”的值设定在这个范围内
			}while(game.check(left1));
			
			var time=new Date().getTime();
			var ele=$("<div data-time="+time+"></div>").css({
						width:"100px",height:"100px",
						background:"url(img/"+charLetter+".png) center no-repeat",
						backgroundSize:"contain",
						lineHeight:"60px",
						fontSize:"30px",
						color:"#fff",
						textAlign:"center",
						position:"absolute",
						left:left1,
						top:top1
					}).appendTo(".screen1")
					.animate(
							{
							  top:$(window).height()
							},
							6000,
							"linear",
							function(){
									//动画结束以后把这个元素从页面移除
									ele.remove();
					});
			game.letters[charLetter]={start:left1-60,end:left1+60,keycode:keyCode,el:ele};	  
		});	   
	},	
	check:function(left){
      var flag=false;
      $.each(this.objletter,function(index,value){
            if(left > value.start&&left < value.end){
              flag=true
            }
      });
      return flag;
	}


&emsp;&emsp;在“gameCore.js”文件里面修改“Game.prototype.initGame”函数里面增加新代码：

			$("#testAnimate").click(function(e){

				game.animateLetter();
			});

&emsp;&emsp;刷新页面以后，你将会看到：

 ![jq_adv_letter_game_06](/public/img/js/jq_adv_letter_game_06.gif)

&emsp;&emsp;大家可以自行打开Chrome浏览器的DevTools，检查在动画图片的在页面上的移动变化。


## 1.2 制作简单的进度条

### 准备工作

&emsp;&emsp;新建文件夹“jq_progress_bar”。

&emsp;&emsp;在文件夹内部新建名字是“js”的文件夹，一个名字是“index.html”的空白网页文件。

&emsp;&emsp;在“js”目录下放入“jquery-3.1.1.js”的jQuery类库文件，同时新建一个“progressBar.js”文件。

&emsp;&emsp;在页面底部引入外部js文件，同时把网页标题定义成“自定义进度条”。

&emsp;&emsp;打开“index.html”文件，在修改body元素的开始标签为：

    <body style="font-family:Arial;">

&emsp;&emsp;至此，你将会得到下面样子的一个文件夹：

 ![jq_adv_letter_game_07](/public/img/js/jq_adv_letter_game_07.gif)

### 自定义进度条

&emsp;&emsp;在页面内容区加入如下HTML代码：

      请选择进度百分比：
      <select id="percent4pb">
       <option value="10">10</option>
       <option value="20">20</option>
       <option value="30">30</option>
       <option value="40">40</option>
       <option value="50">50</option>
       <option value="60">60</option>
       <option value="70">70</option>
       <option value="80">80</option>
       <option value="90">90</option>
      </select>
      <br/>
		<!-- 使用按钮启动进度条动画 -->
      <input type="button" id="myButton" value="启动进度条动画" />
      <br/>
      <br/>
		<!-- 自定义进度条的容器 -->
      <div id="outter" style="background-color:#eeeeee;height:20px;width:500px;padding:5px;">
    	<div id="inner" style="background-color:red;height:19px;width:0px;color:white;text-align:center;"></div>
      </div>

&emsp;&emsp;在“./js/progressBar.js”文件里面创建如下函数：

    function bindClick4Button(){
    	$("#myButton").click(function(e){
    		var percent = $("#percent4pb").val();
    		animateCustomProgressBar(percent);
    	});
    }

    function animateCustomProgressBar(percent){
		$("#inner").animate({
			'width' : (500 * percent)/100// 修改对象的width属性
		},
		3000 // 定义动画的运行时长3000毫秒
		);
    }

&emsp;&emsp;在网页文件下方*jQuery的ready事件的等价写法*的匿名函数里面追加下面代码：

    bindClick4Button();

&emsp;&emsp;刷新页面，你将会看到：

 ![jq_adv_letter_game_08](/public/img/js/jq_adv_letter_game_08.gif)

### 在进度条上显示百分比

&emsp;&emsp;在“./js/progressBar.js”文件里面的animateCustomProgressBar函数内追加下面的代码：

	//对一个普通的js对象运行动画
	$({counter : 1}).animate({ 
		counter : percent // 修改对象的counter属性
	}, 
	{
		duration : 3000,//与上一个动画的时长匹配
		step : function(){//单步回调函数
			$("#inner").text(Math.floor(this.counter) + '%');
		}
	});

&emsp;&emsp;然后刷新页面，你将会看到：

 ![jq_adv_letter_game_09](/public/img/js/jq_adv_letter_game_09.gif)

### 使用开源的jQuery UI进度条插件

&emsp;&emsp;知名的开源类库jQuery UI里面有一款专业而且强大的进度条组件。大家可以从[菜鸟教程 jQuery UI Progressbar 实例](http://www.runoob.com/jqueryui/example-progressbar.html)直接查看使用方法。

&emsp;&emsp;下图仅仅演示了这个进度条组件的最简单用法：

 ![jq_adv_letter_game_10](/public/img/js/jq_adv_letter_game_10.gif)

&emsp;&emsp;想要了解有关这款进度条插件的更多信息，请直接查询[jQuery UI 中文网 ProgressBar](http://www.css88.com/jquery-ui-api/progressbar/)页面。

&emsp;&emsp;

&emsp;&emsp;

# 实验一的解读

&emsp;&emsp;

&emsp;&emsp;

# 实验二： 了解jQuery核心类库的其他特性

&emsp;&emsp;

&emsp;&emsp;

# 实验二的解读

&emsp;&emsp;

&emsp;&emsp;