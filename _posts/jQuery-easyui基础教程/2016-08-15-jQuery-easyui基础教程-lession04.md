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
<div id="cc" class="easyui-layout" style="margin:-10px;width:1368px;height:636px;">
	<div id="east" data-options="region:'east',hideCollapsedContent:false,iconCls:'icon-sum',title:'购物车'" style="width:422px;">
		<div title="购物车" class="cart" data-options="iconCls:'icon-save'" style="padding:10px;">
			<h1>Shopping Cart</h1>
			<table id="cartcontent">
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
			<p class="total">
				Total: ￥<label id="total">0</label>
			</p>
			<h2>Drop here to add to cart</h2>
		</div>
	</div>
	<div data-options="region:'center'" style="padding:5px;background:#eee;">
		<ul class="products">
			<li>
				<a id="a" href="#" class="item"> 
					<img src="../images/shirt1.png" />
					<div>
						<p>Balloon</p>
						<p>Price:￥250</p>
					</div> 
				</a>
			</li>
			<li>
				<a id="b" href="#" class="item"> 
					<img src="../images/shirt2.png" />
					<div>
						<p>EPTISON</p>
						<p>Price:￥150</p>
					</div> 
				</a>
			</li>
			<li>
				<a id="c" href="#" class="item"> 
					<img src="../images/shirt3.png" />
					<div>
						<p>Feeling</p>
						<p>Price:￥5600</p>
					</div> 
				</a>
			</li>
			<li style="clear: both;">
				<a id="d" href="#" class="item"> 
					<img src="../images/shirt4.png" />
					<div>
						<p>ENJEOLON</p>
						<p>Price:￥320</p>
					</div> 
				</a>
			</li>
			<li>
				<a id="e" href="#" class="item"> 
					<img src="../images/shirt5.png" />
					<div>
						<p>JP</p>
						<p>Price:￥255</p>
					</div> 
				</a>
			</li>
			<li>
				<a id="f" href="#" class="item"> 
					<img src="../images/shirt6.png" />
					<div>
						<p>WOOG2016</p>
						<p>Price:￥13000</p>
					</div> 
				</a>
			</li>
		</ul>
	</div>
</div>  
```  


##### JS代码：

```
$(function() {
	/**
	 * 设置每个商品都可以拖动
	 */
	$('.item').draggable({
		revert : true,
		cursor : "move",
		proxy : 'clone'

	});
	/**
	 * 设置购物车接受到商品后将商品添加到购物车中
	 */
	$('.cart').droppable(
			{
				onDrop : function(e, source) {
					//得到商品的名称和价格
					var name = $(source).find('p:eq(0)').html();
					var price = parseFloat(($(source).find('p:eq(1)')
							.html()).split('￥')[1]);
					//在购物车中显示商品信息		
					addToCart(name, price);
				}
			});

});
/**
 * 在购物车中显示商品信息
 */
function addToCart(name, price) {
	var $tbody = $(".cart #cartcontent tbody");
	var $trs = $tbody.children("tr");
	//判断购物车中原来有没有该商品信息，如果有则修改数量，否则添加新纪录
	for ( var index = 0; index < $trs.size(); index++) {
		$tr = $($trs.get(index));
		$nameTd = $($tr.children("td")[0]);
		if ($nameTd.html() == name) {
			//购物车中原来有该商品
			//得到数量
			$quantityTd = $($tr.children("td")[1]);
			//得到该商品的总价
			$totalPriceTd = $($tr.children("td")[3]);
			//修改数量
			$quantityTd.html(parseInt($quantityTd.html()) + 1);
			//修改该商品的总价
			$totalPriceTd.html(price * parseInt($quantityTd.html()));
			//修改购物车的总价
			setTotal();
			return;
		}
	}
	//购物车中原来没有该商品
	$tbody.append("<tr><td>" + name + "</td><td>1</td><td>" + price
			+ "</td><td>" + price + "</td></tr>");
	//修改购物车的总价		
	setTotal();
}
/**
 * 修改购物车的总价
 */
function setTotal() {
	var total = 0;
	var $trs = $(".cart #cartcontent tbody tr");
	//得到每一行的总价相加，得到总金额
	for ( var index = 0; index < $trs.size(); index++) {
		$tr = $($trs.get(index));
		$totalPriceTd = $($tr.children("td")[3]);
		total += parseFloat($totalPriceTd.html());
	}
	//设置总金额
	$("#total").html(total);
}
```

效果如下：
 
![image](http://i.imgur.com/UQMPBrs.png)

![image](http://i.imgur.com/1OYyl82.png)

![image](http://i.imgur.com/ZjevSBg.png)

**参考代码:[04/cart.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/04/cart.html)**

综上所述，便是可拖放购物车的实现。

