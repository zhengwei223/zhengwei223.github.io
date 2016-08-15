---
layout: post  
title: 拖放的购物车    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  
---


##### HTML代码：

```
<ul class="products" style="background-color: red;">
	<li>
		<a id="a" href="#" class="item"> 
			<img src="images/shirt1.png" />
			<div>
				<p>Balloon</p>
				<p>Price:$250</p>
			</div> 
		</a>
	</li>
	<li>
		<a id="b" href="#" class="item"> 
			<img src="images/shirt2.png" />
			<div>
				<p>EPTISON</p>
				<p>Price:$150</p>
			</div> 
		</a>
	</li>
	<li>
		<a id="c" href="#" class="item"> 
			<img src="images/shirt3.png" />
			<div>
				<p>Feeling</p>
				<p>Price:$5600</p>
			</div> 
		</a>
	</li>
	<li style="clear: both;">
		<a id="d" href="#" class="item">
			<img src="images/shirt4.png" />
			<div>
				<p>ENJEOLON</p>
				<p>Price:$320</p>
			</div> 
		</a>
	</li>
	<li>
		<a id="e" href="#" class="item"> 
			<img src="images/shirt5.png" />
			<div>
				<p>JP</p>
				<p>Price:$255</p>
			</div> 
		</a>
	</li>
	<li>
		<a id="f" href="#" class="item"> 
			<img src="images/shirt6.png" />
			<div>
				<p>WOOG2016</p>
				<p>Price:$13000</p>
			</div> 
		</a>
	</li>
</ul>

<div class="cart">
	<h1>Shopping Cart</h1>
	<table id="cartcontent" style="width:400px;height:auto;">
		<thead>
			<tr>
				<th field="name" width=110>Name</th>
				<th field="quantity" width=90>Quantity</th>
				<th field="price" width=90>Price</th>
				<th field="totalPrice">Total Price</th>
			</tr>
		</thead>
		<tbody>
			
		</tbody>
	</table>
	<p class="total">Total: $<label id="total">0</label></p>
	<h2>Drop here to add to cart</h2>
</div>
```  


##### JS代码：

```
$(function() {
	$('.item').draggable({
		revert:true,
		cursor:"move",
		proxy : 'clone'
		
	});
	$('.cart').droppable({ 
		onDrop:function(e,source){
			var name = $(source).find('p:eq(0)').html();
			var price = parseFloat(($(source).find('p:eq(1)').html()).split('$')[1]);
			addToCart(name,price);
		} 
	}); 
	
});
function addToCart(name,price){
	var $tbody = $(".cart #cartcontent tbody");
	var $trs = $tbody.children("tr");
	for(var index = 0; index < $trs.size(); index++){
		$tr = $($trs.get(index));
		$nameTd = $($tr.children("td")[0]);
		if($nameTd.html() == name){
			$quantityTd = $($tr.children("td")[1]);
			$priceTd = $($tr.children("td")[2]);
			$totalPriceTd = $($tr.children("td")[3]);
			$quantityTd.html(parseInt($quantityTd.html())+1);
			$priceTd.html(price);
			$totalPriceTd.html(price*parseInt($quantityTd.html()));
			setTotal();				
			return;
		}
	}
	$tbody.append("<tr><td>"+name+"</td><td>1</td><td>"+price+"</td><td>"+price+"</td></tr>");
	setTotal();		
}
function setTotal(){
	var total = 0;
	var $trs = $(".cart #cartcontent tbody tr");
	for(var index = 0; index < $trs.size(); index++){
		$tr = $($trs.get(index));
		$totalPriceTd = $($tr.children("td")[3]);
		total += parseFloat($totalPriceTd.html());
	}	
	$("#total").html(total);
}
```

效果如下：

![image](http://i.imgur.com/MhtZo9n.png)

![image](http://i.imgur.com/kxRxEYB.png)

![image03](http://i.imgur.com/yj8J5EW.png)

综上所述，便是可拖放购物车的实现。

