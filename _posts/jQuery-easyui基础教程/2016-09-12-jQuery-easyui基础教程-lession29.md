---
layout: post  
title: 数据表格    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 灵活掌握DataGrid的操作


# DataGrid

## DataGrid简介

  
DataGrid以表格形式展示数据，并提供了丰富的选择、排序、分组和编辑数据的功能支持。DataGrid的设计用于缩短开发时间，并且使开发人员不需要具备特定的知识。它是轻量级的且功能丰富。单元格合并、多列标题、冻结列和页脚只是其中的一小部分功能。效果如下图：

![image](http://i.imgur.com/EiUfd4H.png)


## 开发DataGrid程序

```
<table class="easyui-datagrid" style="width:152px;">   
    <thead>   
        <tr>   
            <th data-options="field:'code'" style="width:50px;">编码</th>   
            <th data-options="field:'name'" style="width:50px;">名称</th>   
            <th data-options="field:'price'" style="width:50px;">价格</th>   
        </tr>   
    </thead>   
    <tbody>   
        <tr>   
            <td>001</td><td>名称1</td><td>2323</td>   
        </tr>   
        <tr>   
            <td>002</td><td>名称2</td><td>4612</td>   
        </tr>   
    </tbody>   
</table>
```

**参考代码:[29/datagrid01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/29/datagrid01.html)**
 
效果如下图：

![image](http://i.imgur.com/Xao9XkF.png)

## 最佳实践：通过```<table>```标签创建DataGrid控件。在表格内使用```<th>```标签定义列。


## DataGrid常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>columns</td>
	  <td>array</td>
	  <td>DataGrid列配置对象，详见列属性说明中更多的细节。</td>
	  <td>undefined</td>
   </tr>
   <tr>
      <td>frozenColumns</td>
	  <td>array</td>
	  <td>同列属性，但是这些列将会被冻结在左侧。</td>
	  <td>undefined</td>
   </tr>
   <tr>
      <td>fitColumns</td>
	  <td>boolean</td>
	  <td>真正的自动展开/收缩列的大小，以适应网格的宽度，防止水平滚动。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>resizeHandle</td>
	  <td>string</td>
	  <td>调整列的位置，可用的值有：'left','right','both'。在使用'right'的时候用户可以通过拖动右侧边缘的列标题调整列，等等。</td>
	  <td>right</td>
   </tr>
   <tr>
      <td>autoRowHeight</td>
	  <td>boolean</td>
	  <td>定义设置行的高度，根据该行的内容。设置为false可以提高负载性能。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>toolbar</td>
	  <td>array,selector</td>
	  <td>顶部工具栏的DataGrid面板。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>striped</td>
	  <td>boolean</td>
	  <td>是否显示斑马线效果。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>method</td>
	  <td>string</td>
	  <td>该方法类型请求远程数据。</td>
	  <td>post</td>
   </tr>
   <tr>
      <td>nowrap</td>
	  <td>boolean</td>
	  <td>如果为true，则在同一行中显示数据。设置为true可以提高加载性能。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>idField</td>
	  <td>string</td>
	  <td>指明哪一个字段是标识字段。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>url</td>
	  <td>string</td>
	  <td>一个URL从远程站点请求数据。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>data</td>
	  <td>array,object</td>
	  <td>数据加载</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>loadMsg</td>
	  <td>string</td>
	  <td>在从远程站点加载数据的时候显示提示消息。</td>
	  <td>Processing, please wait …</td>
   </tr>
   <tr>
      <td>pagination</td>
	  <td>boolean</td>
	  <td>如果为true，则在DataGrid控件底部显示分页工具栏。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>rownumbers</td>
	  <td>boolean</td>
	  <td>如果为true，则显示一个行号列。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>singleSelect</td>
	  <td>boolean</td>
	  <td>如果为true，则只允许选择一行。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>ctrlSelect</td>
	  <td>boolean</td>
	  <td>在启用多行选择的时候允许使用Ctrl键+鼠标点击的方式进行多选操作。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>checkOnSelect</td>
	  <td>boolean</td>
	  <td>如果为true，当用户点击行的时候该复选框就会被选中或取消选中。<br/>如果为false，当用户仅在点击该复选框的时候才会呗选中或取消。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>selectOnCheck</td>
	  <td>boolean</td>
	  <td>如果为true，单击复选框将永远选择行。<br/>如果为false，选择行将不选中复选框。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>pagePosition</td>
	  <td>string</td>
	  <td>定义分页工具栏的位置。可用的值有：'top','bottom','both'。</td>
	  <td>bottom</td>
   </tr>
   <tr>
      <td>pageNumber</td>
	  <td>number</td>
	  <td>在设置分页属性的时候初始化页码。</td>
	  <td>1</td>
   </tr>
   <tr>
      <td>pageSize</td>
	  <td>number</td>
	  <td>在设置分页属性的时候初始化页面大小。</td>
	  <td>10</td>
   </tr>
   <tr>
      <td>pageList</td>
	  <td>array</td>
	  <td>在设置分页属性的时候 初始化页面大小选择列表。</td>
	  <td>[10,20,30,40,50]</td>
   </tr>
   <tr>
      <td>queryParams</td>
	  <td>object</td>
	  <td>在请求远程数据的时候发送额外的参数。 </td>
	  <td>{}</td>
   </tr>
   <tr>
      <td>sortName</td>
	  <td>string</td>
	  <td>定义哪些列可以进行排序。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>sortOrder</td>
	  <td>string</td>
	  <td>定义列的排序顺序，只能是'asc'或'desc'。</td>
	  <td>asc</td>
   </tr>
   <tr>
      <td>multiSort</td>
	  <td>boolean</td>
	  <td>定义是否允许多列排序。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>remoteSort</td>
	  <td>boolean</td>
	  <td>定义从服务器对数据进行排序。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>showHeader</td>
	  <td>boolean</td>
	  <td>定义是否显示行头。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>showFooter</td>
	  <td>boolean</td>
	  <td>定义是否显示行脚。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>scrollbarSize</td>
	  <td>number</td>
	  <td>滚动条的宽度(当滚动条是垂直的时候)或高度(当滚动条是水平的时候)。</td>
	  <td>18</td>
   </tr>
   <tr>
      <td>rownumberWidth</td>
	  <td>number</td>
	  <td>行号列宽度。</td>
	  <td>30</td>
   </tr>
   <tr>
      <td>editorHeight</td>
	  <td>number</td>
	  <td>编辑器默认高度。</td>
	  <td>24</td>
   </tr>
   <tr>
      <td>rowStyler</td>
	  <td>function</td>
	  <td>返回样式如'background:red'。</td>
	  <td></td>
   </tr>
   <tr>
      <td>loader</td>
	  <td>function</td>
	  <td>定义如何从远程服务器加载数据。返回false可以放弃本次请求动作。</td>
	  <td>json loader</td>
   </tr>
   <tr>
      <td>loadFilter</td>
	  <td>function</td>
	  <td>返回过滤数据显示。</td>
	  <td></td>
   </tr>
   <tr>
      <td>editors</td>
	  <td>object</td>
	  <td>定义在编辑行的时候使用的编辑器。</td>
	  <td>预定义编辑器</td>
   </tr>
   <tr>
      <td>view</td>
	  <td>object</td>
	  <td>定义DataGrid的视图。</td>
	  <td>默认视图</td>
   </tr>
</table>  


## 列属性  

DataGrid列是一个数组对象，该元素也是一个数组对象。元素数组里面的元素是一个配置对象，它用来定义每一个列字段。

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>title</td>
	  <td>string</td>
	  <td>列标题文本。</td>
	  <td></td>
   </tr>
   <tr>
      <td>field</td>
	  <td>string</td>
	  <td>列字段名称。</td>
	  <td></td>
   </tr>
   <tr>
      <td>width</td>
	  <td>number</td>
	  <td>列的宽度。如果没有定义，宽度将自动扩充以适应其内容。</td>
	  <td></td>
   </tr>
   <tr>
      <td>rowspan</td>
	  <td>number</td>
	  <td>指明将占用多少行单元格（合并行）。</td>
	  <td></td>
   </tr>
   <tr>
      <td>colspan</td>
	  <td>number</td>
	  <td>指明将占用多少列单元格（合并列）。</td>
	  <td></td>
   </tr>
   <tr>
      <td>align</td>
	  <td>string</td>
	  <td>指明如何对齐列数据。可以使用的值有：'left','right','center'。</td>
	  <td></td>
   </tr>
   <tr>
      <td>halign</td>
	  <td>string</td>
	  <td>指明如何对齐列标题。可以使用的值有：'left','right','center'。如果没有指定，则按照align属性进行对齐。</td>
	  <td></td>
   </tr>
   <tr>
      <td>sortable</td>
	  <td>boolean</td>
	  <td>如果为true，则允许列使用排序。</td>
	  <td></td>
   </tr>
   <tr>
      <td>order</td>
	  <td>string</td>
	  <td>默认排序数序，只能是'asc'或'desc'。</td>
	  <td></td>
   </tr>
   <tr>
      <td>resizable</td>
	  <td>boolean</td>
	  <td>如果为true，允许列改变大小。</td>
	  <td></td>
   </tr>
   <tr>
      <td>fixed</td>
	  <td>boolean</td>
	  <td>如果为true，在"fitColumns"设置为true的时候阻止其自适应宽度。</td>
	  <td></td>
   </tr>
   <tr>
      <td>hidden</td>
	  <td>boolean</td>
	  <td>如果为true，则隐藏列。</td>
	  <td></td>
   </tr>
   <tr>
      <td>checkbox</td>
	  <td>boolean</td>
	  <td>如果为true，则显示复选框。该复选框列固定宽度。</td>
	  <td></td>
   </tr>
   <tr>
      <td>formatter</td>
	  <td>function</td>
	  <td>单元格formatter(格式化器)函数。</td>
	  <td></td>
   </tr>
   <tr>
      <td>styler</td>
	  <td>function</td>
	  <td>单元格styler(样式)函数，返回如'background:red'这样的自定义单元格样式字符串。</td>
	  <td></td>
   </tr>
   <tr>
      <td>sorter</td>
	  <td>function</td>
	  <td>用来做本地排序的自定义字段排序函数。</td>
	  <td></td>
   </tr>
   <tr>
      <td>editor</td>
	  <td>string,object</td>
	  <td>指明编辑类型。</td>
	  <td></td>
   </tr>
</table>  


## Editor（编辑器）  

### Editor的属性：
- actions：编辑器可以执行的动作，同编辑器定义。
- target：目标编辑器的jQuery对象。
- field：字段名称。
- type：编辑器类型，比如：'text','combobox','datebox'等。

### Editor方法：

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>init</td> 
      <td>container, options</td> 
      <td>初始化编辑器并返回目标对象。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>target</td> 
      <td>如果有必要销毁编辑器。</td>
   </tr>
   <tr>
      <td>getValue</td> 
      <td>target</td> 
      <td>从编辑器中获取值。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>target , value</td> 
      <td>向编辑器中写入值。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>target , width</td> 
      <td>如果有必要调整编辑器的大小。</td>
   </tr>
</table> 


## DataGrid View  

该视图是一个对象，将告诉DataGrid如何渲染行。该对象必须定义下列函数：

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>render</td> 
      <td>target, container, frozen</td> 
      <td>数据加载时调用。</td>
   </tr>
   <tr>
      <td>renderFooter</td> 
      <td>target, container, frozen</td> 
      <td>这是一个选择函数来渲染行页脚。</td>
   </tr>
   <tr>
      <td>renderRow</td> 
      <td>target, fields, frozen, index, row</td> 
      <td>这是一个属性功能，将调用render函数。</td>
   </tr>
   <tr>
      <td>refreshRow</td> 
      <td>target, index</td> 
      <td>定义如何刷新指定的行。</td>
   </tr>
   <tr>
      <td>onBeforeRender</td> 
      <td>target, rows</td> 
      <td>在视图被呈现之前触发。</td>
   </tr>
   <tr>
      <td>onAfterRender</td> 
      <td>none</td> 
      <td>在视图被呈现之后触发。</td>
   </tr>
</table> 


案例一：  

代码如下：  

```
<h1>DataGrid</h1>
<table id="tt" class="easyui-datagrid" style="width:600px;height:250px"	>
	<thead>
		<tr>	
			<!-- field属性：对应json文件中的哪个字段 -->
			<th data-options="field:'itemid'" width="80">Item ID</th>
			<th data-options="field:'productid'" width="80">Product ID</th>
			<th data-options="field:'listprice'" width="80" align="right">List Price</th>
			<th data-options="field:'unitcost'" width="80" align="right">Unit Cost</th>
			<th data-options="field:'attr1'" width="150">Attribute</th>
			<th data-options="field:'status'" width="60" align="center">Stauts</th>
		</tr>
	</thead>
</table>

$(function(){
	$('#tt').datagrid({
		url:'../data/datagrid_data.json',//可以是给后台发送请求的url
		title:'Load Data',//标题
		iconCls:'icon-save',//标题左边的图标
		fitColumns:true,//固定列
		rownumbers:true,//显示行号
		pagination:true//并没有真正实现分页，需要结合代码实现
	});
});
```

**参考代码:[29/datagrid02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/29/datagrid02.html)**

效果如下图：

![image](http://i.imgur.com/sU22ASR.png)


## DataGrid常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">名称</th> 
      <th width="300px">参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回属性对象。</td>
   </tr>
   <tr>
      <td>getPager</td> 
      <td>none</td> 
      <td>返回页面对象。</td>
   </tr>
   <tr>
      <td>getPanel</td> 
      <td>none</td> 
      <td>返回面板对象。</td>
   </tr>
   <tr>
      <td>getColumnFields</td> 
      <td>frozen</td> 
      <td>返回列字段。如果设置了frozen属性为true，将返回固定列的字段名。</td>
   </tr>
   <tr>
      <td>getColumnOption</td> 
      <td>field</td> 
      <td>返回指定列属性。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>param</td> 
      <td>做调整和布局。</td>
   </tr>
   <tr>
      <td>load</td> 
      <td>param</td> 
      <td>加载和显示第一页的所有行。如果指定了'param'，它将取代'queryParams'属性。</td>
   </tr>
   <tr>
      <td>reload</td> 
      <td>param</td> 
      <td>重载行。等同于'load'方法，但是它将保持在当前页。</td>
   </tr>
   <tr>
      <td>reloadFooter</td> 
      <td>footer</td> 
      <td>重载页脚行。</td>
   </tr>
   <tr>
      <td>loading</td> 
      <td>none</td> 
      <td>显示载入状态。</td>
   </tr>
   <tr>
      <td>loaded</td> 
      <td>none</td> 
      <td>隐藏载入状态。</td>
   </tr>
   <tr>
      <td>fitColumns</td> 
      <td>none</td> 
      <td>使列自动展开/收缩到合适的DataGrid宽度。</td>
   </tr>
   <tr>
      <td>fixColumnSize</td> 
      <td>field</td> 
      <td>固定列大小。如果'field'参数未配置，所有列大小将都是固定的。 </td>
   </tr>
   <tr>
      <td>fixRowHeight</td> 
      <td>index</td> 
      <td>固定指定行高度。如果'index'参数未配置，所有行高度都是固定的。</td>
   </tr>
   <tr>
      <td>freezeRow</td> 
      <td>index</td> 
      <td>冻结指定行，当DataGrid表格向下滚动的时候始终保持被冻结的行显示在顶部。</td>
   </tr>
   <tr>
      <td>autoSizeColumn</td> 
      <td>field</td> 
      <td>自动调整列宽度以适应内容。</td>
   </tr>
   <tr>
      <td>loadData</td> 
      <td>data</td> 
      <td>加载本地数据，旧的行将被移除。</td>
   </tr>
   <tr>
      <td>getData</td> 
      <td>none</td> 
      <td>返回加载完毕后的数据。</td>
   </tr>
   <tr>
      <td>getRows</td> 
      <td>none</td> 
      <td>返回当前页的所有行。</td>
   </tr>
   <tr>
      <td>getFooterRows</td> 
      <td>none</td> 
      <td>返回页脚行。</td>
   </tr>
   <tr>
      <td>getRowIndex</td> 
      <td>row</td> 
      <td>返回指定行的索引号，该行的参数可以是一行记录或一个ID字段值。</td>
   </tr>
   <tr>
      <td>getChecked</td> 
      <td>none</td> 
      <td>在复选框被选中的时候返回所有行。</td>
   </tr>
   <tr>
      <td>getSelected</td> 
      <td>none</td> 
      <td>返回第一个被选中的行或如果没有选中的行则返回null。</td>
   </tr>
   <tr>
      <td>getSelections</td> 
      <td>none</td> 
      <td>返回所有被选中的行，当没有记录被选中的时候将返回一个空数组。</td>
   </tr>
   <tr>
      <td>clearSelections</td> 
      <td>none</td> 
      <td>清除所有选择的行。</td>
   </tr>
   <tr>
      <td>clearChecked</td> 
      <td>none</td> 
      <td>清除所有勾选的行。</td>
   </tr>
   <tr>
      <td>scrollTo</td> 
      <td>index</td> 
      <td>滚动到指定的行。</td>
   </tr>
   <tr>
      <td>gotoPage</td> 
      <td>param</td> 
      <td>跳转到指定页。</td>
   </tr>
   <tr>
      <td>highlightRow</td> 
      <td>index</td> 
      <td>高亮一行。</td>
   </tr>
   <tr>
      <td>selectAll</td> 
      <td>none</td> 
      <td>选择当前页中所有的行。</td>
   </tr>
   <tr>
      <td>unselectAll</td> 
      <td>none</td> 
      <td>取消选择所有当前页中所有的行。</td>
   </tr>
   <tr>
      <td>selectRow</td> 
      <td>index</td> 
      <td>选择一行，行索引从0开始。</td>
   </tr>
   <tr>
      <td>selectRecord</td> 
      <td>idValue</td> 
      <td>通过ID值参数选择一行。</td>
   </tr>
   <tr>
      <td>unselectRow</td> 
      <td>index</td> 
      <td>取消选择一行。</td>
   </tr>
   <tr>
      <td>checkAll</td> 
      <td>none</td> 
      <td>勾选当前页中的所有行。</td>
   </tr>
   <tr>
      <td>uncheckAll</td> 
      <td>none</td> 
      <td>取消勾选当前页中的所有行。</td>
   </tr>
   <tr>
      <td>checkRow</td> 
      <td>index</td> 
      <td>勾选一行，行索引从0开始。</td>
   </tr>
   <tr>
      <td>uncheckRow</td> 
      <td>index</td> 
      <td>取消勾选一行，行索引从0开始。</td>
   </tr>
   <tr>
      <td>beginEdit</td> 
      <td>index</td> 
      <td>开始编辑行。</td>
   </tr>
   <tr>
      <td>endEdit</td> 
      <td>index</td> 
      <td>结束编辑行。</td>
   </tr>
   <tr>
      <td>cancelEdit</td> 
      <td>index</td> 
      <td>取消编辑行。</td>
   </tr>
   <tr>
      <td>getEditors</td> 
      <td>index</td> 
      <td>获取指定行的编辑器。</td>
   </tr>
   <tr>
      <td>getEditor</td> 
      <td>options</td> 
      <td>获取指定编辑器。</td>
   </tr>
   <tr>
      <td>refreshRow</td> 
      <td>index</td> 
      <td>刷新行。</td>
   </tr>
   <tr>
      <td>validateRow</td> 
      <td>index</td> 
      <td>验证指定的行，当验证有效的时候返回true。</td>
   </tr>
   <tr>
      <td>updateRow</td> 
      <td>param</td> 
      <td>更新指定行。</td>
   </tr>
   <tr>
      <td>appendRow</td> 
      <td>row</td> 
      <td>追加一个新行。新行将被添加到最后的位置。</td>
   </tr>
   <tr>
      <td>insertRow</td> 
      <td>param</td> 
      <td>插入一个新行。</td>
   </tr>
   <tr>
      <td>deleteRow</td> 
      <td>index</td> 
      <td>删除行。</td>
   </tr>
   <tr>
      <td>getChanges</td> 
      <td>type</td> 
      <td>从上一次的提交获取改变的所有行。</td>
   </tr>
   <tr>
      <td>acceptChanges</td> 
      <td>none</td> 
      <td>提交所有从加载或者上一次调用acceptChanges函数后更改的数据。</td>
   </tr>
   <tr>
      <td>rejectChanges</td> 
      <td>none</td> 
      <td>回滚所有从创建或者上一次调用acceptChanges函数后更改的数据。</td>
   </tr>
   <tr>
      <td>mergeCells</td> 
      <td>options</td> 
      <td>合并单元格。</td>
   </tr>
   <tr>
      <td>showColumn</td> 
      <td>field</td> 
      <td>显示指定的列。</td>
   </tr>
   <tr>
      <td>hideColumn</td> 
      <td>field</td> 
      <td>隐藏指定的列。</td>
   </tr>
   <tr>
      <td>sort</td> 
      <td>param</td> 
      <td>排序datagrid表格。</td>
   </tr>
</table>  

## DataGrid常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onLoadSuccess</td><td>data</td><td>在数据加载成功的时候触发。</td>
   </tr>
   <tr>
      <td>onLoadError</td><td>none</td><td>在载入远程数据产生错误的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeLoad</td><td>param</td><td>在载入请求数据数据之前触发，如果返回false可终止载入数据操作。</td>
   </tr>
   <tr>
      <td>onClickRow</td><td>index, row</td><td>在用户点击一行的时候触发。</td>
   </tr>
   <tr>
      <td>onDblClickRow</td><td>index, row</td><td>在用户双击一行的时候触发。</td>
   </tr>
   <tr>
      <td>onClickCell</td><td>index, field, value</td><td>在用户点击一个单元格的时候触发。</td>
   </tr>
   <tr>
      <td>onDblClickCell</td><td>index, field, value/td><td>在用户双击一个单元格的时候触发。 </td>
   </tr>
   <tr>
      <td>onBeforeSortColumn</td><td>sort, order</td><td>在用户排序一个列之前触发，返回false可以取消排序。</td>
   </tr>
   <tr>
      <td>onSortColumn</td><td>sort, order</td><td>在用户排序一列的时候触发。</td>
   </tr>
   <tr>
      <td>onResizeColumn</td><td>field, width</td><td>在用户调整列大小的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeSelect</td><td>index, row</td><td>在用户选择一行之前触发，返回false则取消该动作。</td>
   </tr>
   <tr>
      <td>onSelect</td><td>index, row</td><td>在用户选择一行的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeUnselect</td><td>index, row</td><td>在用户取消选择一行之前触发，返回false则取消该动作。</td>
   </tr>
   <tr>
      <td>onUnselect</td><td>index, row</td><td>在用户取消选择一行的时候触发。</td>
   </tr>
   <tr>
      <td>onSelectAll</td><td>rows</td><td>在用户选择所有行的时候触发。</td>
   </tr>
   <tr>
      <td>onUnselectAll</td><td>rows</td><td>在用户取消选择所有行的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeCheck</td><td>index, row</td><td>在用户校验一行之前触发，返回false则取消该动作。</td>
   </tr>
   <tr>
      <td>onCheck</td><td>index, row</td><td>在用户勾选一行的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeUncheck</td><td>index, row</td><td>在用户取消校验一行之前触发，返回false则取消该动作。</td>
   </tr>
   <tr>
      <td>onUncheck</td><td>index, row</td><td>在用户取消勾选一行的时候触发。</td>
   </tr>
   <tr>
      <td>onCheckAll</td><td>rows</td><td>在用户勾选所有行的时候触发。</td>
   </tr>
   <tr>
      <td>onUncheckAll</td><td>rows</td><td>在用户取消勾选所有行的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeEdit</td><td>index, row</td><td>在用户开始编辑一行的时候触发。</td>
   </tr>
   <tr>
      <td>onBeginEdit</td><td>index, row</td><td>在一行进入编辑模式的时候触发。</td>
   </tr>
   <tr>
      <td>onEndEdit</td><td>index, row, changes</td><td>在完成编辑但编辑器还没有销毁之前触发。</td>
   </tr>
   <tr>
      <td>onAfterEdit</td><td>index, row, changes</td><td>在用户完成编辑一行的时候触发。</td>
   </tr>
   <tr>
      <td>onCancelEdit</td><td>index, row</td><td>在用户取消编辑一行的时候触发。</td>
   </tr>
   <tr>
      <td>onHeaderContextMenu</td><td>e, field</td><td>在鼠标右击DataGrid表格头的时候触发。</td>
   </tr>
   <tr>
      <td>onRowContextMenu</td><td>e, index, row</td><td>在鼠标右击一行记录的时候触发。</td>
   </tr>
</table> 


案例一：  

代码如下：  

```
<div style="margin-bottom:20px">
	<a href="#" onclick="getSelected()">GetSelected</a>
	<a href="#"	onclick="getSelections()">GetSelections</a>
</div>

function getSelected() {
	var row = $('#tt').datagrid('getSelected');
	if (row) {
		alert('Item ID:' + row.itemid + "\nPrice:" + row.listprice);
	}
}
function getSelections() {
	var ids = [];
	var rows = $('#tt').datagrid('getSelections');
	for ( var i = 0; i < rows.length; i++) {
		ids.push(rows[i].itemid);
	}
	alert(ids.join('\n'));
}
```

**参考代码:[29/datagrid02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/29/datagrid02.html)**


## 添加工具栏

```
<div id="tb" style="padding:3px;">
	<div style="margin-bottom:5px;">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:'true'" onclick="javascript:alert('Add')">Add</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cut',plain:'true'" onclick="javascript:alert('Cut')">Cut</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:'true'" onclick="javascript:alert('Save')">Save</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:'true'" onclick="javascript:alert('Edit')"></a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:'true'" onclick="javascript:alert('Remove')"></a>
	</div>	
	<div style="padding-left:5px;">
		<span>Item ID:</span>
		<input id="itemid" style="line-height:20px;border:1px solid #ccc">
		<span>Product ID:</span>
		<input id="productid" style="line-height:20px;border:1px solid #ccc">
		<br/><br/>
		Date From: <input class="easyui-datebox" style="width:80px">
		To: <input class="easyui-datetimebox" style="width:80px">
		Language: 
		<input class="easyui-combobox" style="width:100px" data-options="url:'../data/language_data.json',valueField:'id',textField:'text'">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">Search</a>
		<br/>
	</div>
</div>

$('#tt').datagrid({
	toolbar:'#tb',
	...
});
function doSearch(){
	var startDate = $('#startDate').datebox("getValue");
	var endDate = $('#endDate').datebox("getValue");
	var language = $('#language').datebox("getValue");
	alert($('#itemid').val()+','+$('#productid').val()+","+startDate+","+endDate+","+language);
}
```

**参考代码:[29/datagrid03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/29/datagrid03.html)**

效果如下图：

![image](http://i.imgur.com/rHWIhJn.png)


以上便是数据表格的基本操作。

