---
layout: post
title: 利用数组实现顺序表（不严谨）
category: ref
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法 顺序表 ArrayList
description: 
author: 郑未
---
# 代码实现

	/**
	 * 
	 * @author zhengwei
	 *
	 */
	public class ArrayList implements IList {
		// 使用对象数组作为数据的实际持有者
		private Object[] data;
		private int size = 0;

		public ArrayList() {
			data = new Object[20];
		}

		public ArrayList(int capacity) {
			data = new Object[capacity];
		}

		/**
		 * 遍历搜索
		 */
		@Override
		public Object search(Object key) {

			for (int i = 0; i < data.length; i++) {
				if (key.equals(data[i]))
					return data[i];
			}
			return null;
		}

		@Override
		public int size() {
			return size;
		}

		@Override
		public boolean isEmpty() {
			return size == 0;
		}

		@Override
		public boolean contains(Object key) {
			return search(key) != null;
		}

		@Override
		public void add(Object e) {
			for (int i = 0; i < data.length; i++) {
				if (data[i] == null) {
					data[i] = e;
					size++;
					return;
				}
			}
		}

		@Override
		public void remove(Object key) {
			for (int i = 0; i < data.length; i++) {
				if (key.equals(data[i])) {
					data[i] = null;
					size--;
				}
			}
		}

		@Override
		public int indexOf(Object key) {
			for (int i = 0; i < data.length; i++) {
				if (key.equals(data[i]))
					return i;
			}
			return -1;
		}

		@Override
		public void add(Object e, int index) {
			if (data[index] == null) {
				data[index] = e;
			} else {// 如果指定下标处已经存在元素，怎么办？已经存在的元素是不能删除的
				Object tmp = data[index];
				data[index] = e;
				// 在这里我们假设数组没有存满
				// 将原元素放在数组中第一个null位置，如果没有这个元素将被丢弃
				for (int i = 0; i < data.length; i++) {
					if(data[i]==null){
						data[i]=tmp;
						return;
					}
				}
			}
		}

		@Override
		public void delete(int index) {
			data[index] = null;
			size--;
		}

		@Override
		public Object get(int index) {
			return data[index];
		}
	}

# 测试用例：

	import static org.assertj.core.api.Assertions.assertThat;

	import org.junit.Test;

	public class ArrayListTest {

		@Test
		public void testAdd() {
			IList list = new ArrayList();
			list.add("a");
			list.add("b");
			list.add("c");
			assertThat(list.contains("a")).isTrue();
			assertThat(list.indexOf("a")).isEqualTo(0);
			assertThat(list.get(1)).isEqualTo("b");
			list.add("d",1);
			assertThat(list.get(2)).isEqualTo("c");//adcb
			list.delete(2);
			assertThat(list.get(2)).isEqualTo("b");//ad_b  //这里将出现问题
			System.out.println(list);
		}

		@Test
		public void testAddComplexObject() {
			class Student {
				String name;
				int age;

				Student(String name, int age) {
					this.name = name;
					this.age = age;
				}
			}
			// ---为什么需要重写equals？？---
			ICollection collection = new ArrayList();
			collection.add(new Student("xiao3", 18));
			collection.add(new Student("xiao4", 18));
			collection.add(new Student("xiao5", 18));

			assertThat(collection.contains(new Student("xiao4", 20))).isTrue();
			System.out.println(collection);
		}

		@Test
		public void testAddComplexObject2() {
			class Student {
				String name;
				int age;

				Student(String name, int age) {
					this.name = name;
					this.age = age;
				}

				public boolean equals(Object other) {
					if (other == null)
						return false;
					if (!(other instanceof Student))
						return false;
					Student o = (Student) other;
					return this.name.equals(o.name);
				}

				public String toString() {
					return "{name=" + name + ",age=" + age + "}";
				}
			}
			// ---为什么需要重写equals？？---
			ICollection collection = new ArrayList();
			collection.add(new Student("xiao3", 18));
			collection.add(new Student("xiao4", 18));
			collection.add(new Student("xiao5", 18));

			assertThat(collection.contains(new Student("xiao4", 20))).isTrue();
			System.out.println(collection);
		}
	}

我们隐约感觉到这个实现版本有诸多问题，聪明的读者，你们能发现并解决吗？