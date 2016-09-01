---
layout: post
title: 数据类型转换
category: Java8编程语言
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 数据类型转换
description: 
author: 付天有
importance: 4
order: 6
---

# 第6章 数据类型转换

## 6.1 类型转换和强制类型转换

如果您已经具备了编程经验，就会知道将某种类型的值赋给另外一种类型的变量是很常见的。如果这两种类型是兼容的，那么Java会自动进行类型转换。例如，总是可以将int类型的值赋给long类型的变量。然而，并不是所有类型都是兼容的，从而也不是所有类型转换 默认都是允许的。例如，没有定义从double类型到byte类型的自动转换。幸运的是，在两种 不兼容的类型之间，仍然可以进行转换。为此，必须使用强制类型转换(cast),在不兼容的类 型之间执行显式转换。下面分析自动类型转换和强制类型转换这两种情况。

### 6.1.1 Java的自动类型转换
当将某种类型的数据赋给另外一种类型的变量时，如果满足如下两个条件，就会发生自动类型转换：

- 两种类型是兼容的。

- 目标类型大于源类型。

当满足这两个条件时，会发生扩宽转换(widening conversion)。例如，要保存所有有效的 byte值，int类型总是足够的，所以不需要显式的强制转换语句。

对于扩宽转换，数值类型(包括整型和浮点型)是相互兼容的。然而，不存在从数值类型 到char或boolean类型的自动转换。此外，char和boolean相互之间也不是兼容的。

在前面提到过，当将字面整数常量保存到byte、short、long或char类型的变量中时，Java 也会执行自动类型转换。

### 6.1.2 强制转换不兼容的类型

尽管自动类型转换很有帮助，但是它们不能完全满足全部需要。例如，如果希望将int类型的值赋给byte变量，会发生什么情况呢？不会自动执行转换，因为byte比int更小。这种转换有时被称为缩小转换(narrowing conversion),因为是显式地使数值变得更小以适应目标类型。

为了实现两种不兼容类型之间的转换，必须使用强制类型转换。强制类型转换只不过是 一种显式类型转换，它的一般形式如下所示：

	(target-type) value
其中，target-type指定了期望将特定值转换成哪种类型。例如，下面的代码片段将int类型的值强制转换为byte类型。如果整数的值超出了byte类型的范围，结果将以byte类型的范围为模(用整数除以byte范围后的余数)减少。

	int a; 
	byte b;
	b = (byte) a;

当将浮点值赋给整数类型时会发生另一种不同类型的转换：截尾(truncation)。您知道， 整数没有小数部分。因此，当将浮点值赋给整数类型时，小数部分会丢失。例如，如果将数 值1.23赋给一个整数，结果值为1，0.23将被截去。当然，如果整数部分的数值太大，以至 于无法保存到目标整数类型中，那么数值将以目标类型的范围为模减少。

下面的程序演示了一些需要进行强制类型转换的转换：

**[程序清单 6.1.2]**

	public class Conversion {
		public static void main(String args[]) {
			byte b;
			int i = 257;
			double d = 323.142;
	
			System.out.println("Conversion of int to byte.");
			b = (byte) i;
	
			System.out.println("i and b " + i + " " + b);
	
			System.out.println("Conversion of double to int.");
			i = (int) d;
	
			System.out.println("d and i " + d + " " + i);
	
			System.out.println("Conversion of double to byte.");
	
			b = (byte) d;
			System.out.println("d and b " + d + " " + b);
		}
	}

**[运行结果]**

	Conversion of int to byte.
	i and b 257 1
	Conversion of double to int.
	d and i 323.142 323
	Conversion of double to byte.
	d and b 323.142 67

下面对每个转换进行分析。当数值257被强制转换为byte变量时，结果是257除以 256(byte类型的范围)的余数，也就是1。当将d转换成int类型时，小数部分丢失了。当将d 转换成byte类型时，小数部分也丢失了，并且值以256为模减少，结果为67。

## 6.2 表达式中的自动类型提升

除了赋值外，还有另外一个地方也可能会发生某些类型转换：在表达式中。为了分析其 中的原因，考虑下面的情况。在表达式中，中间值要求的精度有时会超出操作数的范围。例如，检查下面的表达式：

	byte a = 40; 
	byte b = 50; 
	byte c = 100; 
	int d=a*b/c;

中间部分`a*b`的结果很容易超出byte操作数的范围。为了解决这类问题，当对表达式求值时，Java自动将每个byte、short或char操作数提升为int类型。这意味着使用int类型而 不是byte类型执行子表达式`a*b`。因此，尽管a和b都被指定为byte类型，中间表达式(50*40) 的结果2000是合法的。

尽管自动类型提升很有用，但是它们会导致难以理解的编译时错误。例如，下面的代码看起来是正确的，但是会导致问题：

	byte b = 50;
	
	b = b * 2; //错误！不能把int赋值给byte

上面的代码试图将`50*2`一个完全有效的byte值保存在一个byte变量中。但是，当计算表达式的值时，操作数被自动提升为int类型，所以结果也被提升为int类型。因此，现在表达式的结果是int类型，如果不使用强制类型转换，就不能将结果赋给那个byte变量。尽管对于这个特定情况来说，所赋予的值仍然满足目标类型，但是仍然需要进行强制类型转换。

如果能理解溢出产生的后果，就应当使用显式的强制类型转换，如下所示：

	byte b = 50; 
	b = (byte)(b * 2);

这样就可以得到正确的值100。
#### 类型提升规则
Java定义了几个应用于表达式的类型提升规则，首先，正如刚才所描述的，所有byte、short和char类型的值都被提升为int类型。然后，如果有一个操作数是long类型，就将整个表达式提升为long类型：如果有一个操作数是float类型，就将整个表达式提升为 float类型；如果任何一个操作数为double类型，结果将为double类型。

下面的程序演示了为了使第二个参数与每个二元运算符相匹配，如何提升表达式中的每个值：

**[程序清单 6.2]**

	public class Promote {
		public static void main(String[] args) {
			byte b = 42; 
			char c = 'a'; 
			short s = 1024; 
			int i = 50000; 
			float f = 5.67f; 
			double d = .1234;
			double result = (f * b) + (i / c) - (d * s); 
			System.out.println((f * b) + " + " + (i / c) + " - " + (d * s));
			System.out.println("result = " + result);
		}
	}

**[运行结果]**

	238.14 + 515 - 126.3616
	result = 626.7784146484375

下面进一步分析程序中如下这行代码中的类型提升:

	double result = (f * b) + (i / c) - (d * s);

在第一个子表达式`f*b`中，b被提升为float类型，并且该子表达式的结果也是float类型。 接下来在子表达式i/c中，c被提升为int类型，并且结果也是int类型。然后在`d*s`中，s的值被提升为double类型，并且该子表达式的类型为double。最后考虑三个中间值的类型一-float、int和double。float加上int的结果是float。之后，作为结果的float减去最后的double， 会被提升为double,这就是表达式最终结果的类型。
