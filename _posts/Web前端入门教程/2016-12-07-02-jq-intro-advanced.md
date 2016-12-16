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

## jQuery支持动态效果

&emsp;&emsp;jQuery类库提供了几种给页面增加动画效果的技术。

&emsp;&emsp;我们在实验一里面只是提到了几个制作动画的简单方法。

&emsp;&emsp;有关这些方法的高级用法，请参考[jQuery中文网的API文档](http://www.jquery123.com/)。

 ![jq_adv_letter_game_11](/public/img/js/jq_adv_letter_game_11.gif)

## 面向对象的编程风格

&emsp;&emsp;

&emsp;&emsp;

# 实验二： 学习jQuery核心类库源码

## 2.1 jQuery全局方法

### 准备工作

&emsp;&emsp;新建文件夹“jq_source_nav”。

&emsp;&emsp;在文件夹内部新建名字是“js”的文件夹，一个名字是“index.html”的空白网页文件。

&emsp;&emsp;在“js”目录下放入“jquery-3.1.1.js”的jQuery类库文件，同时新建一个名字是“jQuerySourceTest.js”的文件。

&emsp;&emsp;在页面底部引入外部js文件，同时把网页标题定义成“学习jQuery类库源码”。

&emsp;&emsp;至此，你将会得到下面样子的一个文件夹：

 ![jq_adv_jq_source_nav_01](/public/img/js/jq_adv_jq_source_nav_01.gif) 

### 全局方法$.each

&emsp;&emsp;打开jQuery中文网，在搜索框里输入each，可以得到“jQuery.each”的搜索结果：

 ![jq_adv_jq_source_nav_01](/public/img/js/jq_adv_jq_source_nav_03.gif) 

&emsp;&emsp;这是一个既可以循环遍历数组，也可以循环遍历对象内部属性的jQuery全局函数。

&emsp;&emsp;根据文档最下方的实例，我们在“index.html”页面的内容区增加如下代码：

    <div id="one"></div>
    <div id="two"></div>
    <div id="three"></div>
    <div id="four"></div>
    <div id="five"></div>

&emsp;&emsp;在页面头部的“style”元素内增加如下代码：

	  div {
	    color: blue;
	  }
	  div#five {
	    color: red;
	  }

&emsp;&emsp;在控制台直接运行下面的代码：

	var arr = [ "one", "two", "three", "four", "five" ];
	var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
	 
	//遍历数组
	jQuery.each( arr, function( i, val ) {
	  //设定多个div的内部文字
	  $( "#" + val ).text( "Mine is " + val + "." );
	 
	/*
		当遍历到val值为"three"的时候这个表达式就会返回false
		在回调函数中返回false，就意味着each函数整体上结束遍历的过程	
	 */
	  return ( val !== "three" );
	});
	 
	jQuery.each( obj, function( i, val ) {
	  $( "#" + i ).append( document.createTextNode( " - " + val ) );
	});

&emsp;&emsp;控制台显示结果是这样的：

 ![jq_adv_jq_source_nav_04](/public/img/js/jq_adv_jq_source_nav_04.gif) 

### 全局函数$.trim

&emsp;&emsp;打开jQuery中文网，在搜索框里输入each，可以得到“jQuery.trim”的搜索结果：

 ![jq_adv_jq_source_nav_05](/public/img/js/jq_adv_jq_source_nav_05.gif) 

&emsp;&emsp;根据文档，$.trim会把字符串开头和结尾的连续空格、换行符、制表符统统去除。

&emsp;&emsp;我们在控制台做几个实验：

	//输入末尾没有任何特殊符号的字符串
	var s0 = "hello world";
	//输入开头和末尾含有换行符号的字符串
	var s1 = "\nhello world\n";
	//使用trim函数去除字符串开头和结尾部分的换行符
	var s2 = $.trim(s0);
	//在控制台测试几个字符串内容的等性
	s0 === s1
	s0 === s2
	//输入开头和末尾含有制表符号的字符串
	var s3 = "\thello world\t";
	//使用trim函数去除字符串开头和结尾部分的制表符
	var s4 = $.trim(s0);
	//在控制台测试几个字符串内容的等性
	s0 === s3
	s0 === s4

&emsp;&emsp;在控制台执行上述代码。有图有真相：

 ![jq_adv_jq_source_nav_06](/public/img/js/jq_adv_jq_source_nav_06.gif) 
	

### 自定义全局方法$.sum

&emsp;&emsp;jQuery类库的全局方法就是位于名称“jQuery”或者“$”可以直接调用的方法。

&emsp;&emsp;在jQuery类库加载到页面以后，我们也可以给类库增加自定义的全局方法。

&emsp;&emsp;在“./js/jQuerySourceNav.js”文件里面加入以下代码：

    (function($) {
		$.sum = function(array) {
    	var total = 0;//定义一个表示总和的变量
		$.each(array, function(index, value) {//调用jQuery类库名称是each的全局函数
			value = $.trim(value);//调用jQuery类库名称是trim的全局函数
			 /*
				使用JS标准库函数把字符串转化为浮点数
				“||”运算符的意思就是：如果parseFloat转换过程失败，就给当前值赋予默认值0
			 */
			value = parseFloat(value) || 0;
			total += value;
		});
			return total;
      };
    }(jQuery));//定义一个立即执行的匿名函数，传入参数是jQuery

&emsp;&emsp;打开页面控制台，在里面查看新增全局函数：

	$.sum //函数名

&emsp;&emsp;定义一个数字数组,调用这个全局函数：

	var arr = [57,89,61,55,33,29.1,97.4,-8];
	var result = $.sum(arr);

&emsp;&emsp;在控制台上完成操作：

 ![jq_adv_jq_source_nav_02](/public/img/js/jq_adv_jq_source_nav_02.gif) 

### 自定义命名空间

&emsp;&emsp;现在我们已经在 jQuery 命名空间中创建了一个新的全局函数，但这样写有可能会污染命名空间，例如当其他插件也使用 sum 命名时就会出现冲突，为了避免冲突的发生，我们可以使用命名空间来隔离函数，即将函数封装到一个对象中。

&emsp;&emsp;用下面代码替换之前“./js/jQuerySourceNav.js”文件里的sum函数定义：
    
    (function($) {
      $.lanqiao = {//在jQuery上新增名称为“lanqiao”的对象作为命名空间
    		sum: function(array) {
      			var total = 0;
      			$.each(array, function(index, value) {
    				value = $.trim(value);
    				value = parseFloat(value) || 0;
    				total += value;
      			});
      		return total;
    		},
      }//lanqiao命名空间结束
    }(jQuery));

&emsp;&emsp;定义一个数字数组,在控制台上调用这个全局函数：

	var arr = [57,89,61,55,33,29.1,97.4,-8];
	var result = $.lanqiao.sum(arr);

&emsp;&emsp;下面是控制台操作的全部过程以及输出结果：

 ![jq_adv_jq_source_nav_07](/public/img/js/jq_adv_jq_source_nav_07.gif) 

## 2.2 自定jq义插件

&emsp;&emsp;为什么要定义jQuery插件？

&emsp;&emsp;一个词就足以表达：那就是“重用”！

&emsp;&emsp;通过扩展jQuery类库，你将会创造一个可以在多个页面上反复使用的Web组件：有关HTML、CSS和JS的代码会被一起封装在组件内部。

&emsp;&emsp;这样做顺带的一个好处是，插件内外可以使用相同的变量名。换就话说就是，组件内部的变量名和方法名不会对全局作用域造成干扰。

 ![jquey_plugin_logo](/public/img/js/jquey_plugin_logo.png) 

### 在$.fn新增方法

&emsp;&emsp;在页面内容区上增加两个h1标签。

	<h1></h1>
	<h1></h1>

&emsp;&emsp;在控制台查看jQuery方法选中的对象的“\__proto__”属性，然后把它用“===”运算符和“$.fn”做对比。

 ![jq_adv_jq_source_nav_08](/public/img/js/jq_adv_jq_source_nav_08.gif)

&emsp;&emsp;最后发现：“$.fn”跟所有jQuery对象的“\__proto__”属性是一回事。

&emsp;&emsp;由于所有jQuery对象都有一个共同的“__proto__”属性，因而在“$.fn”上定义新方法，就相当于在过去、现在、未来的所有jQuery对象上定义新方法。

&emsp;&emsp;又由于“$”符号是jQuery的别名，因而，这么做就相当于在“jQuery.fn”上定义新方法。

&emsp;&emsp;接下来，打开“./js/jQuerySourceNav.js”，在其中加入下面的代码：

	//立即执行一个匿名函数
    (function($){
    	$.fn.helloWorld = function(){
       		console.log('Hello jQuery Plugin World!');
    	}
    })(jQuery);//在执行的时候传入jQuery

&emsp;&emsp;刷新界面以后，在控制台测试这个新插件是否正常连接：

 ![jq_adv_jq_source_nav_09](/public/img/js/jq_adv_jq_source_nav_09.gif)

&emsp;&emsp;断点停留的地方，请大家把鼠标移动到关键词“this”上方，留意debug工具给你提示的内容是什么。

### 用each函数遍历jQuery对象

&emsp;&emsp;在上一章节我们已经了解到，jQuery对象有一个类似数组的内部结构。

&emsp;&emsp;由于把一个标签名传给jQuery就可能选中页面上所有的同类元素，那么，在自定义的jQuery插件内部不可避免地就要遍历这个类似数组的jQuery对象。

	//立即执行一个匿名函数
    (function($){
    $.fn.helloWorld = function(objOption){
    
    	this.each(function(){
			//把当前dom对象传入jQuery方法
    		var $el = $(this);
    		//修改颜色
    	   	$el.css('color', 'gold');
    		//输入内部文本
    		$el.html( 'Hello jQuery  Plugin World');
    		//让元素淡出一次、并且再次淡入
    		$el.fadeOut(3000,function(){
    			$el.fadeIn(3000);
    		})
    
    	});
    };
    })(jQuery);//在执行的时候传入jQuery

&emsp;&emsp;刷新界面以后，在控制台测试这个新插件能否按照预期修改页面上的5个div：

 ![jq_adv_jq_source_nav_10](/public/img/js/jq_adv_jq_source_nav_10.gif)

&emsp;&emsp;请留意你的浏览器是否出现同样效果。

### 传入配置参数

&emsp;&emsp;我们需要借助于从外界传入一个js对象来修改helloWorld插件的行为。

&emsp;&emsp;代码如下：

	//立即执行一个匿名函数
    (function($){
		//传入一个包含自定义配置的js对象
		$.fn.helloWorld = function(objOption){
    
    	this.each(function(){
			//把当前dom对象传入jQuery函数
    		var $el = $(this);
			//用$.extend全局方法合并默认配置和自定义配置
			//相同名字的默认的配置属性会被从外部传入的自定义配置属性覆盖
			var options = $.extend({
				//默认颜色
				'color':'gold' , 
				//默认文字
				'text':'Hello jQuery  Plugin World!',
				//默认点击效果：先淡出、后淡入 
				'click' :  function(e){
					$el.fadeOut(3000,function(){
					$el.fadeIn(3000);
					})
				}
			} ,objOption);
			
			//从最新配置的js对象里面获取内容
			//修改字体颜色
			$el.css('color', options.color);
			//修改文本内容
			if(options.text){
				$el.html(options.text);
			}
			//调用点击事件函数
			if(options.click){
				if($.isFunction(options.click)){
					//绑定点击事件
					$el.click(function(e){
					options.click.call(this,e);
				});
			}
		}
			//返回jQuery对象自身
			//方便链式调用
			return this;
    	});
    };
    })(jQuery);//在执行的时候传入jQuery

&emsp;&emsp;刷页面面之后，你就可以测试从外部传入配置属性了。

&emsp;&emsp;请在控制台输入下面的代码,测试效果：

	//不自定义任何属性
	$('div').helloWorld();
	//自定义文字内容
	$('div').helloWorld({
		'text' :'测试我的以第一jQuery插件'
	});
	//自定义字体颜色
	$('div').helloWorld({
		'text' :'测试我的以第一jQuery插件' , 
		'color' : 'blue'
	});
	//自定义点击事件
	$('div').helloWorld({
		'text' :'测试我的以第一jQuery插件' , 
		'color' : 'blue',
 		'click' : function(){ console.log('onclick is invoked...'); }
	});

&emsp;&emsp;请用其他方法选中页面元素，测试插件能否按照预期工作。

### 提取文件

&emsp;&emsp;最后一步就是把我们的这个插件提取到单独一个js文件里面。

&emsp;&emsp;需要使用插件的时候，你只要在页面里面引入这个js文件就可以了。

 ![jq_adv_jq_source_nav_11](/public/img/js/jq_adv_jq_source_nav_11.gif)

&emsp;&emsp;至此，一个jQuery插件制作完成。大家可以去喝点什么，庆祝一下这个重要时刻了！

&emsp;&emsp;

&emsp;&emsp;

# 实验二的解读

## IIFE

## jQuery类库内情

&emsp;&emsp;要知道，在JavaScript还接里面，“$”符号很受追捧

关于JS语言字符串的换行符、制表符还有其他,大家可以参考[w3School JavaScript 特殊字符](http://www.w3school.com.cn/js/js_special_characters.asp)

&emsp;&emsp;

&emsp;&emsp;